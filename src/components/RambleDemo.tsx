import { useEffect, useRef, useState } from "react";
import { Ink } from "./app/Ink";
import Spoken from "./Spoken";

// Step 2: a real ramble from Chirp's test set, three changes of mind long.
const SAID =
  "~so I was thinking we ship on ~Monday, ~no ~wait, ~Tuesday, ~actually ~let's ~say Wednesday, to be safe, because the certificate thing isn't sorted yet. ~I ~mean, there's no rush";
const WORDS = SAID.split(" ").length;
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
      for (let i = 1; i <= WORDS; i++) timers.push(window.setTimeout(() => setShown(i), 600 + i * 200));
      const end = 600 + WORDS * 200;
      timers.push(window.setTimeout(() => setPhase(1), end + 600));
      timers.push(window.setTimeout(() => setPhase(2), end + 3400));
      timers.push(window.setTimeout(play, end + 9000));
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
    <div ref={ref} className="flex flex-col gap-5" aria-hidden>
      <div className="rounded-[20px] bg-[#1a1917] p-7 md:p-9">
        <div className="flex items-center justify-between">
          <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
          <Ink kind={phase === 0 ? "listening" : phase === 1 ? "working" : "tick"} speaking={shown < WORDS} />
        </div>
        <Spoken said={SAID} shown={shown} phase={phase ? 1 : 0} className="mt-4 min-h-[6.2em] font-serif text-[21px] leading-[1.45] text-white md:text-[24px]" />
      </div>
      <div
        className="window px-7 py-6 transition-[opacity,transform] duration-300 md:px-9"
        style={{ opacity: phase > 1 ? 1 : 0, transform: phase > 1 ? "none" : "translateY(8px)", transitionTimingFunction: "var(--ease)" }}
      >
        <p className="font-[family-name:var(--font-ui)] text-[13px] text-muted">What Joris got on Slack</p>
        <p className="mt-2 font-[family-name:var(--font-ui)] text-[17px] leading-[1.55] text-ink">{MEANT}</p>
      </div>
    </div>
  );
}
