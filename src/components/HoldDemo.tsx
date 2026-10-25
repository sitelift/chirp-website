import { useEffect, useRef, useState } from "react";
import { Ink, type InkKind } from "./app/Ink";

// Step 1: hold Right Ctrl and the resting tick above the taskbar starts listening.
type Frame = { ink: InkKind; down: boolean };

const LOOP: [number, Frame][] = [
  [0, { ink: "tick", down: false }],
  [1200, { ink: "listening", down: true }],
  [4000, { ink: "working", down: false }],
  [4700, { ink: "tick", down: false }],
];
const LENGTH = 6400;

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
    <div ref={ref} className="flex h-full flex-col items-center justify-end" aria-hidden>
      <span
        className="inline-flex h-16 items-center rounded-[14px] bg-white px-7 font-[family-name:var(--font-ui)] text-[22px] text-ink transition-[transform,box-shadow] duration-150 ease-out"
        style={{
          transform: f.down ? "translateY(4px)" : "none",
          boxShadow: f.down ? "0 0 0 1px rgba(0,0,0,.12), 0 1px 0 rgba(0,0,0,.12)" : "0 0 0 1px rgba(0,0,0,.12), 0 5px 0 rgba(0,0,0,.14)",
        }}
      >
        Right Ctrl
      </span>
      <div className="mt-12 flex h-9 items-end justify-center">
        <Ink kind={f.ink} />
      </div>
      <div className="mt-4 h-12 w-full bg-white/75" />
    </div>
  );
}
