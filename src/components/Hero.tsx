import { useEffect, useRef, useState } from "react";
import { FLOCK, SHAPE, SINK, Flock, samplePoints, shuffled } from "../lib/flock";
import { PointsGL } from "../lib/points-gl";
import { SCRIPTS } from "../lib/scripts";
import { BIRD_PATH, BIRD_VIEWBOX } from "../lib/bird";
import { Ink } from "./app/Ink";
import { SITE } from "../lib/site";

type PillState = "tick" | "listening" | "working";
type SkyWord = { text: string; x: number; y: number; keep: boolean; state: "hidden" | "shown" | "struck" | "gone" };
type Sky = { words: SkyWord[]; fs: number; key: number };

const DISPLAY = '"Inter Tight Variable", system-ui, sans-serif';

// The hero plays itself: a dictation spelled out by the flock in the sky,
// fillers flying off, the real words pouring into the cursor as clean text.
export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<HTMLCanvasElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  const [pill, setPill] = useState<PillState>("tick");
  const [placeholder, setPlaceholder] = useState("");
  const [typed, setTyped] = useState<{ text: string; key: number } | null>(null);
  const [sent, setSent] = useState(false);
  const [sky, setSky] = useState<Sky | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = glRef.current!;
    const small = innerWidth < 720;
    const N = small ? 1000 : 2000;
    const flock = new Flock(N);
    let gl: PointsGL | null = null;
    try {
      gl = new PointsGL(canvas, N, flock.seed);
    } catch {
      gl = null;
    }

    let w = 1;
    let h = 1;
    let dpr = 1;
    let clock = 0;
    let speaking = false;
    const events: { at: number; fn: () => void }[] = [];
    const at = (time: number, fn: () => void) => events.push({ at: time, fn });

    const updateSink = () => {
      const c = caretRef.current?.getBoundingClientRect();
      const r = wrap.getBoundingClientRect();
      if (c) {
        flock.sink.x = c.left - r.left + c.width / 2;
        flock.sink.y = c.top - r.top + c.height / 2;
      }
    };

    const freeBirds = () => {
      const out: number[] = [];
      for (let i = 0; i < N; i++) if (flock.state[i] === FLOCK && flock.next[i] === 255) out.push(i);
      return shuffled(out);
    };

    // Lay the spoken words out across the sky.
    const layoutWords = (said: string) => {
      const tokens = said.split(" ").map((t) => ({ text: t.replace(/^~/, ""), keep: !t.startsWith("~") }));
      const ctx = document.createElement("canvas").getContext("2d")!;
      const maxLines = small ? 4 : 3;
      const font = (size: number) => `700 ${size}px ${DISPLAY}`;
      let fs = Math.min(58, h * 0.066, w * 0.075);
      let lines: { text: string; keep: boolean; width: number }[][] = [];
      for (; fs > 24; fs *= 0.92) {
        ctx.font = font(fs);
        ctx.letterSpacing = `${-fs * 0.03}px`;
        const space = ctx.measureText(" ").width;
        lines = [[]];
        let lw = 0;
        for (const tok of tokens) {
          const tw = ctx.measureText(tok.text).width;
          if (lw > 0 && lw + space + tw > w * 0.86) {
            lines.push([]);
            lw = 0;
          }
          lines[lines.length - 1].push({ ...tok, width: tw });
          lw += (lw > 0 ? space : 0) + tw;
        }
        if (lines.length <= maxLines && lines.length * fs * 1.02 <= h * 0.17) break;
      }
      ctx.font = font(fs);
      ctx.letterSpacing = `${-fs * 0.03}px`;
      const space = ctx.measureText(" ").width;
      const lh = fs * 1.02;
      const top = h * 0.535 - ((lines.length - 1) * lh) / 2;
      const words: { text: string; keep: boolean; x: number; y: number; width: number }[] = [];
      lines.forEach((line, li) => {
        const total = line.reduce((acc, t) => acc + t.width, 0) + space * (line.length - 1);
        let x = w / 2 - total / 2;
        for (const t of line) {
          words.push({ ...t, x, y: top + li * lh });
          x += t.width + space;
        }
      });
      return { words, fs, font: font(fs) };
    };

    const sampleWord = (text: string, x: number, y: number, fs: number, f: string, count: number) => {
      const pad = fs * 0.2;
      const bw = Math.ceil(fs * 0.75 * text.length + pad * 2);
      const bh = Math.ceil(fs * 1.5);
      const pts = samplePoints(bw, bh, count, (ctx) => {
        ctx.font = f;
        ctx.letterSpacing = `${-fs * 0.03}px`;
        ctx.textBaseline = "middle";
        ctx.fillText(text, pad, bh / 2);
      });
      for (let i = 0; i < pts.length; i += 2) {
        pts[i] += x - pad;
        pts[i + 1] += y - bh / 2;
      }
      return pts;
    };

    const birdMark = (t0: number, hold: number) => {
      const size = Math.min(w * 0.26, h * 0.2);
      const s = size / BIRD_VIEWBOX;
      const pts = samplePoints(w, h, Math.floor(N * 0.7), (ctx) => {
        ctx.translate(w / 2 - (BIRD_VIEWBOX * s) / 2, h * 0.53 - (BIRD_VIEWBOX * s) / 2);
        ctx.scale(s, s);
        ctx.fill(new Path2D(BIRD_PATH));
      });
      const pool = freeBirds();
      const used: number[] = [];
      for (let j = 0; j < pts.length / 2 && j < pool.length; j++) {
        const i = pool[j];
        flock.sx[i] = pts[j * 2];
        flock.sy[i] = pts[j * 2 + 1];
        flock.schedule(i, SHAPE, t0 + Math.random() * 0.7);
        used.push(i);
      }
      at(t0 + hold, () => {
        for (const i of used) flock.schedule(i, FLOCK, clock + Math.random() * 0.6, true);
      });
    };

    const runScript = (index: number, t0: number) => {
      const sc = SCRIPTS[index];
      at(t0, () => {
        setPlaceholder(sc.placeholder);
        setTyped(null);
        setSent(false);
      });

      at(t0 + 0.8, () => {
        setPill("listening");
        speaking = true;
        flock.dimTarget = 0.25;

        const { words, fs, font } = layoutWords(sc.said);
        const pool = freeBirds();
        const budget = Math.min(pool.length, Math.floor(N * 0.85));
        const totalW = words.reduce((acc, wd) => acc + wd.width, 0);
        let cursor = 0;
        const groups: { keep: boolean; ids: number[] }[] = [];
        const setWord = (k: number, state: SkyWord["state"]) =>
          setSky((p) => (p ? { ...p, words: p.words.map((wd, j) => (j === k ? { ...wd, state } : wd)) } : p));
        setSky({ words: words.map((wd) => ({ text: wd.text, x: wd.x, y: wd.y, keep: wd.keep, state: "hidden" })), fs, key: clock });
        words.forEach((wd, k) => {
          const count = Math.floor((budget * wd.width) / totalW);
          const pts = sampleWord(wd.text, wd.x, wd.y, fs, font, count);
          const ids: number[] = [];
          const start = clock + 0.15 + k * 0.3;
          for (let j = 0; j < pts.length / 2 && cursor < pool.length; j++) {
            const i = pool[cursor++];
            flock.sx[i] = pts[j * 2];
            flock.sy[i] = pts[j * 2 + 1];
            flock.schedule(i, SHAPE, start + Math.random() * 0.3);
            ids.push(i);
          }
          groups.push({ keep: wd.keep, ids });
          // Once the birds have landed, the crisp word takes over and they dim behind it.
          at(start + 1.4, () => {
            setWord(k, "shown");
            for (const i of ids) flock.shapeA[i] = 0.22;
          });
        });

        const rel = clock + 0.15 + words.length * 0.3 + 1.7;
        at(rel, () => {
          setPill("working");
          speaking = false;
        });
        at(rel + 0.4, () => {
          groups.forEach((g, k) => {
            if (g.keep) return;
            setWord(k, "struck");
            for (const i of g.ids) flock.toneTarget[i] = 1;
          });
        });
        at(rel + 1.1, () => {
          groups.forEach((g, k) => {
            if (g.keep) return;
            setWord(k, "gone");
            for (const i of g.ids) flock.schedule(i, FLOCK, clock + Math.random() * 0.35, true);
          });
        });
        at(rel + 1.6, () => {
          updateSink();
          let k = 0;
          groups.forEach((g, gi) => {
            if (!g.keep) return;
            setWord(gi, "gone");
            for (const i of g.ids) {
              flock.shapeA[i] = 0.95;
              flock.schedule(i, SINK, clock + k * 0.08 + Math.random() * 0.35);
            }
            k++;
          });
        });
        at(rel + 2.5, () => {
          setTyped({ text: sc.meant, key: clock });
          setSky(null);
          setPill("tick");
          flock.dimTarget = 1;
        });
        at(rel + 6.2, () => setSent(true));
        at(rel + 6.8, () => {
          if (index === SCRIPTS.length - 1) {
            setPlaceholder("");
            setTyped(null);
            birdMark(clock + 0.2, 4);
            runScript(0, clock + 5.2);
          } else {
            runScript(index + 1, clock);
          }
        });
      });
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(2, devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      flock.resize(w, h);
      updateSink();
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const frame = (ms: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(3, (ms - last) / 16.667);
      last = ms;
      if (!visible) return;
      clock += dt / 60;
      events.sort((a, b) => a.at - b.at);
      while (events.length && events[0].at <= clock) events.shift()!.fn();
      flock.step(clock, dt);
      gl?.draw(flock, w, h, dpr, clock);
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(wrap);
    const ro = new ResizeObserver(resize);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = wrap.getBoundingClientRect();
      flock.hawk.x = e.clientX - r.left;
      flock.hawk.y = e.clientY - r.top;
      flock.hawk.on = true;
    };
    const onLeave = () => (flock.hawk.on = false);

    (async () => {
      try {
        await document.fonts.load(`700 100px ${DISPLAY}`);
      } catch {}
      resize();
      ro.observe(wrap);
      flock.scatter();
      birdMark(0.1, 3.2);
      runScript(0, 3.6);
      raf = requestAnimationFrame(frame);
    })();

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-svh min-h-[680px] w-full overflow-hidden">
      <canvas ref={glRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {sky && (
        <div key={sky.key} className="pointer-events-none absolute inset-0" aria-hidden>
          {sky.words.map((wd, i) => (
            <span
              key={i}
              className="absolute whitespace-pre font-display font-bold leading-none"
              style={{
                left: wd.x,
                top: wd.y,
                fontSize: sky.fs,
                letterSpacing: `${-sky.fs * 0.03}px`,
                color: wd.state === "struck" || (wd.state === "gone" && !wd.keep) ? "#57534e" : "#d6d3d1",
                textDecoration: wd.state === "struck" || (wd.state === "gone" && !wd.keep) ? "line-through" : "none",
                textDecorationThickness: Math.max(2, sky.fs * 0.06),
                opacity: wd.state === "shown" || wd.state === "struck" ? 1 : 0,
                transform: `translateY(-50%) translateY(${wd.state === "gone" ? (wd.keep ? 10 : -10) : 0}px)`,
                transition: "opacity 320ms linear, color 240ms linear, transform 330ms var(--ease)",
              }}
            >
              {wd.text}
            </span>
          ))}
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-[10%] px-6 text-center">
        <h1 className="font-display text-[clamp(40px,5.6vw,80px)] font-semibold leading-[0.98] tracking-[-0.05em] text-stone-50">
          Talk instead of typing.
        </h1>
        <p className="mx-auto mt-4 max-w-[34rem] text-balance text-[17px] leading-relaxed text-stone-400 md:text-[19px]">
          Hold a key, say it, let go. Chirp types what you meant, in any app on your PC.
        </p>
        <div className="pointer-events-auto mt-7 flex items-center justify-center gap-5">
          <a
            href={SITE.download}
            className="flex items-center gap-2.5 rounded-full bg-stone-50 px-5 py-2.5 text-[15px] font-medium text-stone-950 transition-colors duration-200 ease-out hover:bg-white"
          >
            <WindowsLogo />
            Download for Windows
          </a>
          <a href={SITE.github} className="text-[15px] text-stone-400 transition-colors duration-200 ease-out hover:text-stone-100">
            Free and open source
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[67%] flex justify-center px-5" aria-hidden>
        <div className="w-full max-w-[560px] rounded-[22px] border border-white/[0.08] bg-[#131210]/80 p-1.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md">
          <div
            className="flex min-h-[60px] items-center rounded-[16px] bg-white/[0.035] px-5 py-3.5 text-[17px] leading-snug transition-[opacity,transform] duration-300 ease-out md:text-[18px]"
            style={{ opacity: sent ? 0 : 1, transform: sent ? "translateY(-8px)" : "none" }}
          >
            <span className="whitespace-pre-line text-stone-50">
              {typed && <Typed key={typed.key} text={typed.text} />}
              <span ref={caretRef} className="caret ml-px inline-block h-[1.15em] w-[2px] translate-y-[4px] bg-amber" />
              {!typed && <span className="text-stone-500">{placeholder}</span>}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[6%] flex h-10 items-end justify-center" aria-hidden>
        <Ink kind={pill} />
      </div>
    </div>
  );
}

function WindowsLogo() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path d="M0 2.2 6.5 1.3v6.2H0zM7.3 1.2 16 0v7.5H7.3zM0 8.3h6.5v6.3L0 13.7zM7.3 8.3H16V16l-8.7-1.2z" />
    </svg>
  );
}

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 2)), 16);
    return () => clearInterval(id);
  }, [text]);
  return <>{text.slice(0, n)}</>;
}
