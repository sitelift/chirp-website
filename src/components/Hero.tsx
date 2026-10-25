import { useEffect, useRef, useState } from "react";
import { FLOCK, SHAPE, SINK, Flock, samplePoints, shuffled } from "../lib/flock";
import { PointsGL } from "../lib/points-gl";
import { SCRIPTS } from "../lib/scripts";
import { BIRD_PATH, BIRD_VIEWBOX } from "../lib/bird";
import Bird from "./Bird";

type PillState = "idle" | "listening" | "working";

const DISPLAY = '"Inter Tight Variable", system-ui, sans-serif';

// The hero plays itself: a dictation spelled out by the flock in the sky,
// fillers flying off, the real words pouring into the cursor as clean text.
export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<HTMLCanvasElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [pill, setPill] = useState<PillState>("idle");
  const [keyDown, setKeyDown] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [typed, setTyped] = useState<{ text: string; key: number } | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = glRef.current!;
    const small = innerWidth < 720;
    const N = small ? 1800 : 3600;
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
      let fs = Math.min(112, h * 0.11, w * 0.11);
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
        if (lines.length <= maxLines) break;
      }
      ctx.font = font(fs);
      ctx.letterSpacing = `${-fs * 0.03}px`;
      const space = ctx.measureText(" ").width;
      const lh = fs * 1.02;
      const top = h * 0.3 - ((lines.length - 1) * lh) / 2;
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
      const size = Math.min(w * 0.5, h * 0.42);
      const s = size / BIRD_VIEWBOX;
      const pts = samplePoints(w, h, Math.floor(N * 0.75), (ctx) => {
        ctx.translate(w / 2 - (BIRD_VIEWBOX * s) / 2, h * 0.3 - (BIRD_VIEWBOX * s) / 2);
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
        setKeyDown(true);
        setPill("listening");
        speaking = true;
        flock.dimTarget = 0.25;

        const { words, fs, font } = layoutWords(sc.said);
        const pool = freeBirds();
        const budget = Math.min(pool.length, Math.floor(N * 0.8));
        const totalW = words.reduce((acc, wd) => acc + wd.width, 0);
        let cursor = 0;
        const groups: { keep: boolean; ids: number[] }[] = [];
        words.forEach((wd, k) => {
          const count = Math.floor((budget * wd.width) / totalW);
          const pts = sampleWord(wd.text, wd.x, wd.y, fs, font, count);
          const ids: number[] = [];
          for (let j = 0; j < pts.length / 2 && cursor < pool.length; j++) {
            const i = pool[cursor++];
            flock.sx[i] = pts[j * 2];
            flock.sy[i] = pts[j * 2 + 1];
            flock.schedule(i, SHAPE, clock + 0.15 + k * 0.3 + Math.random() * 0.3);
            ids.push(i);
          }
          groups.push({ keep: wd.keep, ids });
        });

        const rel = clock + 0.15 + words.length * 0.3 + 0.7;
        at(rel, () => {
          setKeyDown(false);
          setPill("working");
          speaking = false;
        });
        at(rel + 0.4, () => {
          for (const g of groups) if (!g.keep) for (const i of g.ids) flock.toneTarget[i] = 1;
        });
        at(rel + 1.1, () => {
          for (const g of groups)
            if (!g.keep) for (const i of g.ids) flock.schedule(i, FLOCK, clock + Math.random() * 0.35, true);
        });
        at(rel + 1.6, () => {
          updateSink();
          let k = 0;
          for (const g of groups) {
            if (!g.keep) continue;
            for (const i of g.ids) flock.schedule(i, SINK, clock + k * 0.08 + Math.random() * 0.35);
            k++;
          }
        });
        at(rel + 2.5, () => {
          setTyped({ text: sc.meant, key: clock });
          setPill("idle");
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

    const level = (t: number) => {
      const base = speaking ? 0.3 + 0.7 * Math.abs(Math.sin(t * 8.7)) * (0.55 + 0.45 * Math.sin(t * 2.3)) : 0;
      barsRef.current.forEach((b, i) => {
        if (!b) return;
        const center = 1 - Math.abs(i - 5) / 7;
        const v = Math.max(0.15, base * center * (0.6 + 0.4 * Math.sin(t * 19 + i * 1.9)));
        b.style.transform = `scaleY(${v.toFixed(3)})`;
      });
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
      level(clock);
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
    <div ref={wrapRef} className="relative h-svh min-h-[640px] w-full overflow-hidden">
      <h1 className="sr-only">Chirp: hold a key, talk, and what you meant is typed at your cursor, in any app.</h1>
      <canvas ref={glRef} className="absolute inset-0 h-full w-full" aria-hidden />

      <div className="absolute inset-x-0 top-[60%] flex justify-center px-5" aria-hidden>
        <div className="w-full max-w-[620px] rounded-[24px] border border-white/[0.08] bg-[#131210]/80 p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md">
          <div
            className="flex min-h-[68px] items-center rounded-[16px] bg-white/[0.035] px-5 py-4 text-[18px] leading-snug transition-[opacity,transform] duration-300 ease-out md:text-[20px]"
            style={{ opacity: sent ? 0 : 1, transform: sent ? "translateY(-8px)" : "none" }}
          >
            <span className="whitespace-pre-line text-stone-50">
              {typed && <Typed key={typed.key} text={typed.text} />}
              <span ref={caretRef} className="caret ml-px inline-block h-[1.15em] w-[2px] translate-y-[4px] bg-[#F0B723]" />
              {!typed && <span className="text-stone-500">{placeholder}</span>}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[7%] flex items-center justify-center gap-4" aria-hidden>
        <kbd
          className="rounded-[10px] border px-3 py-2 font-mono text-[13px] transition-all duration-150 ease-out"
          style={{
            borderColor: keyDown ? "rgba(240,183,35,0.7)" : "rgba(255,255,255,0.14)",
            color: keyDown ? "#F0B723" : "#d6d3d1",
            background: keyDown ? "rgba(240,183,35,0.08)" : "rgba(255,255,255,0.04)",
            transform: keyDown ? "translateY(2px)" : "none",
            boxShadow: keyDown ? "inset 0 1px 0 rgba(0,0,0,0.4)" : "inset 0 -3px 0 rgba(255,255,255,0.07)",
          }}
        >
          Right Ctrl
        </kbd>
        <Pill state={pill} barsRef={barsRef} />
      </div>
    </div>
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

function Pill({ state, barsRef }: { state: PillState; barsRef: React.MutableRefObject<(HTMLSpanElement | null)[]> }) {
  return (
    <div
      className="pill flex h-[46px] items-center justify-center rounded-full bg-[#1A1917] ring-1 ring-white/10"
      style={{
        width: state === "listening" ? 132 : state === "working" ? 96 : 64,
        boxShadow:
          state === "listening" ? "0 0 0 2px rgba(240,183,35,0.55), 0 20px 60px -10px rgba(240,183,35,0.35)" : undefined,
      }}
    >
      {state === "idle" && <Bird className="fade-in h-[18px] w-[18px] text-[#F0B723]" />}
      {state === "listening" && (
        <span className="flex h-6 items-center gap-[3px]">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              className="h-6 w-[3px] origin-center rounded-full bg-[#F0B723]"
            />
          ))}
        </span>
      )}
      {state === "working" && (
        <span className="sweep flex items-center gap-[5px]">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="h-[4px] w-[4px] rounded-full bg-stone-500" style={{ animationDelay: `${i * 70}ms` }} />
          ))}
        </span>
      )}
    </div>
  );
}
