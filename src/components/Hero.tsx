import { useEffect, useRef, useState } from "react";
import { Flock, samplePoints } from "../lib/flock";
import { PointsGL } from "../lib/points-gl";
import { SCRIPTS, type Script } from "../lib/scripts";
import { BIRD_PATH, BIRD_VIEWBOX } from "../lib/bird";
import Bird from "./Bird";

type PillState = "idle" | "listening" | "working" | "miss";
type Phase = "idle" | "listening" | "flush" | "working" | "shown";

type Word = {
  text: string;
  keep: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  rot: number;
  vr: number;
  a: number;
  s: number;
  at: number;
  state: "hidden" | "fly" | "fall" | "suck" | "gone";
};

type Card = { app: string; text: string; key: number };

const DISPLAY = '"Inter Tight Variable", system-ui, sans-serif';
const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<HTMLCanvasElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const api = useRef<{ press: () => void; release: () => void } | null>(null);
  const soundRef = useRef(true);

  const [pill, setPill] = useState<PillState>("idle");
  const [touch, setTouch] = useState(false);
  const [sound, setSound] = useState(true);
  const [card, setCard] = useState<Card | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTouch(matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    soundRef.current = sound;
  }, [sound]);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const glCanvas = glRef.current!;
    const wordCanvas = wordsRef.current!;
    const wctx = wordCanvas.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 1;
    let h = 1;
    let dpr = 1;
    const small = innerWidth < 720;
    const N = small ? 1500 : 3200;
    const flock = new Flock(N);
    let gl: PointsGL | null = null;
    try {
      gl = new PointsGL(glCanvas, N, flock.seed);
    } catch {
      gl = null;
    }

    const sounds = {
      start: new Audio("/sounds/start.wav"),
      done: new Audio("/sounds/done.wav"),
    };
    const play = (a: HTMLAudioElement) => {
      if (!soundRef.current) return;
      a.currentTime = 0;
      a.volume = 0.6;
      a.play().catch(() => {});
    };

    let shape: "bird" | "headline" | null = "bird";
    let script: Script = SCRIPTS[0];
    let scriptIndex = 0;
    let words: Word[] = [];
    let phase: Phase = "idle";
    let phaseAt = 0;
    let pressAt = 0;
    let spawned = 0;
    let nextSpawn = 0;
    const now = () => performance.now() / 1000;

    const birdPoints = () => {
      const size = Math.min(w * 0.6, h * 0.46);
      const s = size / BIRD_VIEWBOX;
      return samplePoints(w, h, Math.floor(N * 0.88), (ctx) => {
        ctx.translate(w / 2 - (BIRD_VIEWBOX * s) / 2, h * 0.56 - (BIRD_VIEWBOX * s) / 2);
        ctx.scale(s, s);
        ctx.fill(new Path2D(BIRD_PATH));
      });
    };

    const headlinePoints = (lines: string[]) =>
      samplePoints(w, h, Math.floor(N * 0.9), (ctx) => {
        let fs = Math.min(240, (h * 0.3) / lines.length);
        const font = (size: number) => `800 ${size}px ${DISPLAY}`;
        ctx.font = font(fs);
        ctx.letterSpacing = `${-fs * 0.045}px`;
        const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
        fs = Math.min(fs, (fs * w * 0.82) / widest);
        ctx.font = font(fs);
        ctx.letterSpacing = `${-fs * 0.045}px`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const lh = fs * 0.92;
        const top = h * 0.5 - ((lines.length - 1) * lh) / 2;
        lines.forEach((l, i) => ctx.fillText(l, w / 2, top + i * lh));
      });

    const applyShape = () => {
      if (shape === "bird") flock.setShape(birdPoints());
      if (shape === "headline") flock.setShape(headlinePoints(script.headline));
    };

    const updateSink = () => {
      const r = pillRef.current?.getBoundingClientRect();
      const wr = wrap.getBoundingClientRect();
      if (r) {
        flock.sink.x = r.left - wr.left + r.width / 2;
        flock.sink.y = r.top - wr.top + r.height / 2;
      }
    };

    const wordFont = () => `500 ${small ? 15 : 21}px ${MONO}`;

    const layoutWords = (sc: Script): Word[] => {
      wctx.font = wordFont();
      const tokens = sc.said.split(" ").map((t) => ({ text: t.replace(/^~/, ""), keep: !t.startsWith("~") }));
      const space = wctx.measureText(" ").width;
      const maxW = w * 0.84;
      const lines: { text: string; keep: boolean; width: number }[][] = [[]];
      let lineW = 0;
      for (const tok of tokens) {
        const width = wctx.measureText(tok.text).width;
        if (lineW > 0 && lineW + space + width > maxW) {
          lines.push([]);
          lineW = 0;
        }
        lines[lines.length - 1].push({ ...tok, width });
        lineW += (lineW > 0 ? space : 0) + width;
      }
      const lh = (small ? 15 : 21) * 1.7;
      const y0 = h * 0.72 - ((lines.length - 1) * lh) / 2;
      const out: Word[] = [];
      lines.forEach((line, li) => {
        const total = line.reduce((acc, t) => acc + t.width, 0) + space * (line.length - 1);
        let x = w / 2 - total / 2;
        for (const t of line) {
          out.push({
            text: t.text,
            keep: t.keep,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            tx: x + t.width / 2,
            ty: y0 + li * lh,
            rot: 0,
            vr: 0,
            a: 0,
            s: 1,
            at: 0,
            state: "hidden",
          });
          x += t.width + space;
        }
      });
      return out;
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(2, devicePixelRatio || 1);
      for (const c of [glCanvas, wordCanvas]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      flock.resize(w, h);
      updateSink();
      applyShape();
      if (words.length) {
        const fresh = layoutWords(script);
        words.forEach((wd, i) => {
          wd.tx = fresh[i].tx;
          wd.ty = fresh[i].ty;
        });
      }
    };

    const press = () => {
      if (phase === "listening" || phase === "flush") return;
      const t = now();
      updateSink();
      script = SCRIPTS[scriptIndex % SCRIPTS.length];
      words = layoutWords(script);
      spawned = 0;
      nextSpawn = t + 0.12;
      pressAt = t;
      phase = "listening";
      phaseAt = t;
      flock.setMode("inhale", t);
      setCard(null);
      setPill("listening");
      play(sounds.start);
    };

    const release = () => {
      if (phase !== "listening") return;
      const t = now();
      if (t - pressAt < 0.35 && spawned < 2) {
        phase = "idle";
        words = [];
        shape = null;
        flock.setMode("flock", t);
        setPill("miss");
        setTimeout(() => setPill((p) => (p === "miss" ? "idle" : p)), 1600);
        return;
      }
      phase = "flush";
      phaseAt = t;
    };

    api.current = { press, release };

    // Words: spoken tokens fly in; fillers fall like feathers; the rest go into the pill.
    const stepWords = (t: number, dt: number) => {
      wctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wctx.clearRect(0, 0, w, h);
      wctx.font = wordFont();
      wctx.textAlign = "center";
      wctx.textBaseline = "middle";
      words.forEach((wd, i) => {
        if (wd.state === "hidden" || wd.state === "gone") return;
        if (wd.state === "fly") {
          wd.vx = (wd.vx + (wd.tx - wd.x) * 0.06 * dt) * Math.pow(0.8, dt);
          wd.vy = (wd.vy + (wd.ty - wd.y) * 0.06 * dt) * Math.pow(0.8, dt);
          wd.rot *= Math.pow(0.85, dt);
          wd.a = Math.min(1, wd.a + 0.06 * dt);
        } else if (wd.state === "fall") {
          wd.vy += 0.32 * dt;
          wd.vx += Math.sin(t * 3 + i) * 0.06 * dt;
          wd.rot += wd.vr * dt;
          wd.a = Math.max(0, wd.a - 0.012 * dt);
          if (wd.y > h + 60 || wd.a <= 0) wd.state = "gone";
        } else if (wd.state === "suck" && t > wd.at) {
          const dx = flock.sink.x - wd.x;
          const dy = flock.sink.y - wd.y;
          wd.vx = (wd.vx + dx * 0.05 * dt) * Math.pow(0.82, dt);
          wd.vy = (wd.vy + dy * 0.05 * dt) * Math.pow(0.82, dt);
          wd.s = Math.max(0.05, Math.min(1, Math.hypot(dx, dy) / 160));
          if (Math.hypot(dx, dy) < 10) wd.state = "gone";
        }
        wd.x += wd.vx * dt;
        wd.y += wd.vy * dt;
        wctx.save();
        wctx.translate(wd.x, wd.y);
        wctx.rotate(wd.rot);
        wctx.scale(wd.s, wd.s);
        wctx.globalAlpha = wd.a;
        const dropped = wd.state === "fall";
        wctx.fillStyle = dropped ? "rgba(168,162,158,0.75)" : "rgba(250,246,238,0.94)";
        wctx.fillText(wd.text, 0, 0);
        if (dropped) {
          const m = wctx.measureText(wd.text).width;
          wctx.fillRect(-m / 2 - 2, 0, m + 4, 1.5);
        }
        wctx.restore();
      });
    };

    const spawnWord = (wd: Word) => {
      const side = Math.floor(Math.random() * 3);
      wd.x = side === 0 ? -80 : side === 1 ? w + 80 : Math.random() * w;
      wd.y = side === 2 ? h + 40 : h * (0.45 + Math.random() * 0.5);
      wd.vx = 0;
      wd.vy = 0;
      wd.rot = (Math.random() - 0.5) * 0.8;
      wd.state = "fly";
    };

    const stepSequence = (t: number) => {
      if ((phase === "listening" || phase === "flush") && spawned < words.length && t >= nextSpawn) {
        spawnWord(words[spawned]);
        spawned++;
        nextSpawn = t + (phase === "flush" ? 0.04 : 0.19 + Math.random() * 0.08);
      }
      if (phase === "flush" && spawned >= words.length && t - phaseAt > 0.15) {
        phase = "working";
        phaseAt = t;
        setPill("working");
        let k = 0;
        words.forEach((wd) => {
          if (!wd.keep) {
            wd.state = "fall";
            wd.vx = (Math.random() - 0.5) * 3;
            wd.vy = -2 - Math.random() * 2;
            wd.vr = (Math.random() - 0.5) * 0.06;
          } else {
            wd.state = "suck";
            wd.at = t + 0.45 + k++ * 0.035;
          }
        });
      }
      if (phase === "working" && t - phaseAt > 1.05) {
        phase = "shown";
        phaseAt = t;
        shape = "headline";
        applyShape();
        flock.setMode("burst", t);
        play(sounds.done);
        setPill("idle");
        setCard({ app: script.app, text: script.meant, key: t });
        setCount((c) => c + 1);
        scriptIndex++;
      }
      if (phase === "shown" && t - phaseAt > 7.5) {
        phase = "idle";
        shape = null;
        flock.setMode("flock", t);
      }
    };

    const level = (t: number) => {
      const speaking = phase === "listening" && spawned < words.length;
      const base = speaking
        ? 0.3 + 0.7 * Math.abs(Math.sin(t * 8.7)) * (0.55 + 0.45 * Math.sin(t * 2.3))
        : phase === "listening"
          ? 0.1 + 0.05 * Math.sin(t * 5)
          : 0;
      flock.level += (base - flock.level) * 0.2;
      barsRef.current.forEach((b, i) => {
        if (!b) return;
        const center = 1 - Math.abs(i - 5) / 7;
        const v = Math.max(0.12, base * center * (0.6 + 0.4 * Math.sin(t * 19 + i * 1.9)));
        b.style.transform = `scaleY(${v.toFixed(3)})`;
      });
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const frame = (ms: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min(3, (ms - last) / 16.667) * (reduced ? 0.5 : 1);
      last = ms;
      const t = ms / 1000;
      stepSequence(t);
      flock.step(t, dt);
      gl?.draw(flock.px, flock.py, flock.depth, flock.alpha, w, h, dpr);
      stepWords(t, dt);
      level(t);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      last = performance.now();
    });
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
    const isTyping = (el: EventTarget | null) =>
      el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
    const inView = () => {
      const r = wrap.getBoundingClientRect();
      return r.bottom > innerHeight * 0.4 && r.top < innerHeight * 0.6;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const hot = e.code === "ControlRight" || (e.code === "Space" && inView());
      if (!hot || isTyping(e.target)) return;
      e.preventDefault();
      if (!e.repeat) press();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ControlRight" || e.code === "Space") release();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if ((e.target as HTMLElement).closest("a,button:not([data-pill])")) return;
      press();
    };
    const onUp = () => release();

    (async () => {
      try {
        await Promise.all([
          document.fonts.load(`800 100px ${DISPLAY}`),
          document.fonts.load(`500 20px ${MONO}`),
        ]);
      } catch {}
      resize();
      flock.scatter();
      flock.setMode("form", now());
      ro.observe(wrap);
      raf = requestAnimationFrame(frame);
      setTimeout(() => {
        if (shape === "bird" && phase === "idle") {
          shape = null;
          flock.setMode("flock", now());
        }
      }, 3400);
    })();

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp);
    addEventListener("pointercancel", onUp);
    addEventListener("keydown", onKeyDown);
    addEventListener("keyup", onKeyUp);
    addEventListener("blur", onUp);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerdown", onDown);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointercancel", onUp);
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keyup", onKeyUp);
      removeEventListener("blur", onUp);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative h-svh min-h-[640px] w-full select-none overflow-hidden"
      style={{ WebkitUserSelect: "none" }}
    >
      <canvas ref={glRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <canvas ref={wordsRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 top-[13%] px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500">
          Chirp 2 · voice to text for Windows · free &amp; open source
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(34px,5.2vw,68px)] font-semibold leading-[0.98] tracking-[-0.045em] text-stone-50">
          Hold a key. Talk. Let go.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-stone-400 md:text-base">
          What you meant appears at your cursor, in any app. Speech is recognized on your PC.
        </p>
      </div>

      {card && <PastedCard key={card.key} app={card.app} text={card.text} />}

      <div className="absolute inset-x-0 bottom-[7%] flex flex-col items-center gap-3">
        <Pill
          ref={pillRef}
          state={pill}
          touch={touch}
          barsRef={barsRef}
          onPress={() => api.current?.press()}
          onRelease={() => api.current?.release()}
        />
        <p className="pointer-events-none h-4 font-mono text-[11px] tracking-wide text-stone-500">
          {pill === "listening"
            ? "listening… let go when you're done"
            : count === 0
              ? touch
                ? "try it: press and hold the pill"
                : "try it · or hold space · move the mouse to scare the flock"
              : count < SCRIPTS.length
                ? `${count}/${SCRIPTS.length} · again`
                : "that's the demo. the real thing is faster."}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setSound((s) => !s)}
        className="absolute bottom-5 right-5 rounded-full px-3 py-1.5 font-mono text-[11px] text-stone-500 transition-colors duration-200 ease-out hover:text-stone-200"
        aria-pressed={sound}
      >
        sound {sound ? "on" : "off"}
      </button>
    </div>
  );
}

function PastedCard({ app, text }: { app: string; text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 2)), 14);
    return () => clearInterval(id);
  }, [text]);
  return (
    <div className="card-in pointer-events-none absolute inset-x-0 top-[64%] flex justify-center px-6">
      <div className="w-full max-w-[540px] rounded-[18px] border border-white/[0.08] bg-[#141311]/85 p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="flex items-center justify-between px-3 pt-1.5 pb-2 font-mono text-[11px] text-stone-500">
          <span>{app}</span>
          <span className="text-amber-300/80">pasted</span>
        </div>
        <div className="whitespace-pre-line rounded-[12px] bg-white/[0.03] px-4 py-3.5 text-[15px] leading-relaxed text-stone-100 md:text-[17px]">
          {text.slice(0, n)}
          <span className="caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-amber-300" />
        </div>
      </div>
    </div>
  );
}

type PillProps = {
  state: PillState;
  touch: boolean;
  barsRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  onPress: () => void;
  onRelease: () => void;
  ref: React.Ref<HTMLButtonElement>;
};

function Pill({ state, touch, barsRef, onPress, onRelease, ref }: PillProps) {
  const wide = state === "idle" || state === "miss";
  return (
    <button
      ref={ref}
      type="button"
      data-pill
      aria-label="Hold to try a dictation"
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        onPress();
      }}
      onPointerUp={onRelease}
      onPointerCancel={onRelease}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.repeat) onPress();
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") onRelease();
      }}
      className="pill relative flex h-[50px] touch-none items-center justify-center rounded-full bg-[#1A1917] text-stone-200 ring-1 ring-white/10 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0908]"
      style={{
        width: wide ? (state === "miss" ? 220 : touch ? 236 : 286) : state === "listening" ? 132 : 92,
        boxShadow:
          state === "listening" ? "0 0 0 2px rgba(240,183,35,0.55), 0 20px 60px -10px rgba(240,183,35,0.35)" : undefined,
      }}
    >
      {state === "idle" && (
        <span className="fade-in flex items-center gap-2.5 whitespace-nowrap px-4 text-[14px]">
          <Bird className="h-[18px] w-[18px] text-[#F0B723]" />
          {touch ? (
            <span>Press and hold to talk</span>
          ) : (
            <>
              <span className="text-stone-400">Hold</span>
              <kbd className="rounded-[7px] border border-white/15 bg-white/[0.06] px-2 py-[3px] font-mono text-[12px] text-stone-100 shadow-[inset_0_-2px_0_rgba(255,255,255,0.06)]">
                Right Ctrl
              </kbd>
              <span className="text-stone-400">to talk</span>
            </>
          )}
        </span>
      )}
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
      {state === "miss" && <span className="fade-in text-[14px] text-stone-300">Didn't catch that</span>}
    </button>
  );
}
