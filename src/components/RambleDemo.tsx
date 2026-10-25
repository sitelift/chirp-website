import { useEffect, useRef, useState } from "react";
import { Ink } from "./app/Ink";
import Spoken from "./Spoken";

// Chapter 2: a real ramble from Chirp's test set, three changes of mind long.
const SAID_TEXT =
  "~so I was thinking we ship on ~Monday, ~no ~wait, ~Tuesday, ~actually ~let's ~say Wednesday, to be safe, because the certificate thing isn't sorted yet. ~I ~mean, there's no rush";
const SAID = SAID_TEXT.split(" ");
const MEANT = "I was thinking we ship on Wednesday to be safe, because the certificate thing isn't sorted yet. There's no rush.";

export default function RambleDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timers: number[] = [];
    let running = false;
    const play = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setShown(0);
      setPhase(0);
      SAID.forEach((_, i) => timers.push(window.setTimeout(() => setShown(i + 1), 500 + i * 190)));
      const end = 500 + SAID.length * 190;
      timers.push(window.setTimeout(() => setPhase(1), end + 400));
      timers.push(window.setTimeout(() => setPhase(2), end + 2000));
      timers.push(window.setTimeout(() => setPhase(3), end + 2700));
      timers.push(window.setTimeout(play, end + 7600));
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
    <div ref={ref} className="absolute inset-0 flex flex-col justify-center gap-4 p-6 md:p-10" aria-hidden>
      <div className="rounded-[18px] bg-[#1a1917] p-6 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)]">
        <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said, to Joris on Slack</p>
        <Spoken
          said={SAID_TEXT}
          shown={shown}
          phase={phase === 0 ? 0 : phase === 1 ? 1 : 2}
          className="mt-2 min-h-[7em] font-serif text-[21px] leading-[1.45] text-white md:text-[23px]"
        />
        <div className="mt-4 flex justify-center">
          <Ink kind={phase === 0 ? "listening" : phase < 3 ? "working" : "tick"} speaking={shown < SAID.length} />
        </div>
      </div>
      <div
        className="window px-6 py-5 transition-[opacity,transform] duration-300"
        style={{ opacity: phase > 2 ? 1 : 0, transform: phase > 2 ? "none" : "translateY(8px)", transitionTimingFunction: "var(--ease)" }}
      >
        <p className="font-[family-name:var(--font-ui)] text-[13px] text-muted">What Joris got</p>
        <p className="mt-1.5 font-[family-name:var(--font-ui)] text-[16px] leading-[1.5] text-ink">{MEANT}</p>
      </div>
    </div>
  );
}
