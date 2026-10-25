import { useEffect, useRef, useState } from "react";
import { Ink, type InkKind } from "./app/Ink";

const STEPS = [
  { title: "Hold Right Ctrl", body: "In any app, wherever your cursor is. Rather not hold a key? Tap Left Ctrl + Win to go hands-free." },
  { title: "Talk", body: "Ramble, pause, change your mind halfway through. Talk the way you'd talk to a person." },
  { title: "Let go", body: "Your words land at the cursor, cleaned up and formatted. Usually within a second." },
];

const SAID = "um so can we move the review to thursday afternoon".split(" ");
const MEANT = "Can we move the review to Thursday afternoon?";

type Frame = { step: number; key: boolean; ink: InkKind; spoken: number; typed: boolean };

const START: Frame = { step: 0, key: false, ink: "tick", spoken: 0, typed: false };

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [f, setF] = useState<Frame>(START);

  useEffect(() => {
    let timers: number[] = [];
    let running = false;
    const at = (ms: number, patch: Partial<Frame>) =>
      timers.push(window.setTimeout(() => setF((p) => ({ ...p, ...patch })), ms));
    const loop = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setF(START);
      at(700, { key: true, ink: "listening" });
      at(1300, { step: 1 });
      SAID.forEach((_, i) => at(1500 + i * 230, { spoken: i + 1 }));
      const release = 1500 + SAID.length * 230 + 500;
      at(release, { step: 2, key: false, ink: "working" });
      at(release + 650, { ink: "tick", typed: true });
      timers.push(window.setTimeout(loop, release + 4200));
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        loop();
      } else if (!e.isIntersecting && running) {
        running = false;
        timers.forEach(clearTimeout);
        timers = [];
      }
    });
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
      <ol className="space-y-9">
        {STEPS.map((s, i) => (
          <li key={s.title} className="transition-opacity duration-300 ease-out" style={{ opacity: f.step === i ? 1 : 0.35 }}>
            <p className="font-display text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.04em] text-stone-50">
              <span className="mr-3 text-amber">{i + 1}</span>
              {s.title}
            </p>
            <p className="mt-2 max-w-md text-[17px] leading-relaxed text-stone-400">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="relative flex aspect-[5/4] flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#100f0d] p-6 md:p-8" aria-hidden>
        {/* The app you're typing in */}
        <div className="rounded-[18px] bg-[#1a1917] p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2 px-3 pb-2 pt-1.5 text-[13px] text-stone-500">
            <span className="h-2 w-2 rounded-full bg-stone-600" />
            Teams · Design review
          </div>
          <div className="min-h-[56px] rounded-[12px] bg-white/[0.04] px-4 py-3.5 text-[17px] text-stone-50">
            {f.typed ? <TypeOut text={MEANT} /> : null}
            <span className="caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-amber" />
            {!f.typed && <span className="text-stone-500">Type a message</span>}
          </div>
        </div>

        {/* What you're saying */}
        <div className="flex flex-1 items-center justify-center px-4 text-center">
          <p className="font-mono text-[15px] leading-relaxed text-stone-500 md:text-[17px]">
            {f.spoken > 0 && !f.typed && <>“{SAID.slice(0, f.spoken).join(" ")}”</>}
          </p>
        </div>

        {/* Keyboard and the pill above the taskbar */}
        <div className="flex items-end justify-between">
          <span
            className="cap transition-transform duration-150 ease-out"
            style={{
              height: 34,
              padding: "0 12px",
              fontSize: 13,
              transform: f.key ? "translateY(2px)" : "none",
              boxShadow: f.key ? "inset 0 0 0 1px #f0b723" : undefined,
              color: f.key ? "#f0b723" : undefined,
            }}
          >
            Right Ctrl
          </span>
          <div className="absolute inset-x-0 bottom-8 flex justify-center">
            <Ink kind={f.ink} />
          </div>
          <span />
        </div>
      </div>
    </div>
  );
}

function TypeOut({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => Math.min(text.length, v + 3)), 16);
    return () => clearInterval(id);
  }, [text]);
  return <>{text.slice(0, n)}</>;
}
