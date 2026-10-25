import { useEffect, useRef, useState } from "react";
import { Ink, type InkKind } from "./app/Ink";

// Chapter 1: the resting tick above the taskbar. Hold Right Ctrl and it listens;
// tap Left Ctrl + Win and it latches hands-free.
type Frame = { ink: InkKind; keys: string; down: boolean; caption: string };

const LOOP: [number, Frame][] = [
  [0, { ink: "tick", keys: "Right Ctrl", down: false, caption: "Resting above your taskbar" }],
  [1400, { ink: "listening", keys: "Right Ctrl", down: true, caption: "Hold to talk" }],
  [3900, { ink: "working", keys: "Right Ctrl", down: false, caption: "Let go" }],
  [4600, { ink: "tick", keys: "Right Ctrl", down: false, caption: "Pasted" }],
  [6000, { ink: "handsfree", keys: "Left Ctrl + Win", down: true, caption: "Or tap once for hands-free" }],
  [6300, { ink: "handsfree", keys: "Left Ctrl + Win", down: false, caption: "Or tap once for hands-free" }],
  [9200, { ink: "working", keys: "Left Ctrl + Win", down: true, caption: "Tap again to finish" }],
  [9500, { ink: "working", keys: "Left Ctrl + Win", down: false, caption: "Tap again to finish" }],
  [10100, { ink: "tick", keys: "Left Ctrl + Win", down: false, caption: "Pasted" }],
];
const LENGTH = 11600;

export default function HoldDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [f, setF] = useState<Frame>(LOOP[0][1]);

  useEffect(() => {
    let timers: number[] = [];
    let running = false;
    const play = () => {
      timers.forEach(clearTimeout);
      timers = LOOP.map(([ms, frame]) => window.setTimeout(() => setF(frame), ms));
      timers.push(window.setTimeout(play, LENGTH));
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        play();
      } else if (!e.isIntersecting && running) {
        running = false;
        timers.forEach(clearTimeout);
      }
    });
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col" aria-hidden>
      <div className="flex flex-1 items-center justify-center">
        <span
          className="inline-flex h-14 items-center rounded-[12px] bg-white px-5 font-[family-name:var(--font-ui)] text-[18px] text-ink transition-[transform,box-shadow] duration-150 ease-out"
          style={{
            transform: f.down ? "translateY(3px)" : "none",
            boxShadow: f.down ? "0 0 0 1px rgba(0,0,0,.12), 0 1px 0 rgba(0,0,0,.12)" : "0 0 0 1px rgba(0,0,0,.12), 0 4px 0 rgba(0,0,0,.14)",
          }}
        >
          {f.keys}
        </span>
      </div>
      <p className="pb-4 text-center font-[family-name:var(--font-ui)] text-[13px] text-ink/70">{f.caption}</p>
      <div className="flex h-10 items-end justify-center">
        <Ink kind={f.ink} />
      </div>
      {/* The taskbar */}
      <div className="mt-3 flex h-12 items-center justify-center gap-2 bg-white/70 backdrop-blur-sm">
        <svg viewBox="0 0 16 16" className="h-5 w-5 text-[#2b6cb0]" fill="currentColor">
          <path d="M0 2.2 6.5 1.3v6.2H0zM7.3 1.2 16 0v7.5H7.3zM0 8.3h6.5v6.3L0 13.7zM7.3 8.3H16V16l-8.7-1.2z" />
        </svg>
        {["#e9b8a6", "#b8cdd1", "#c9c3e6", "#f0d78a"].map((c) => (
          <span key={c} className="h-6 w-6 rounded-[6px]" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}
