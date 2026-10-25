import { useEffect, useRef, useState } from "react";
import Window from "./app/Window";
import { Ink, type InkKind } from "./app/Ink";
import Spoken from "./Spoken";

// The whole promise in one frame: what you said on the left, struck in amber,
// and the clean reply pasted at the cursor on the right. It renders finished
// (so the first paint already shows the payoff), then replays in ~3 seconds.
const SAID = "~um, no, it moved to ~thursday, ~no ~wait, wednesday at three";
const MEANT = "No, it moved to Wednesday at 3.";
const WORDS = SAID.split(" ").length;

export default function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [ink, setInk] = useState<InkKind>("tick");
  const [shown, setShown] = useState(WORDS);
  const [phase, setPhase] = useState<0 | 1>(1);
  const [typed, setTyped] = useState(MEANT.length);

  useEffect(() => {
    let timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const finish = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setInk("tick");
      setShown(WORDS);
      setPhase(1);
      setTyped(MEANT.length);
    };
    const play = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setShown(0);
      setPhase(0);
      setTyped(0);
      setInk("listening");
      for (let k = 1; k <= WORDS; k++) at(k * 130, () => setShown(k));
      let t = WORDS * 130 + 300;
      at(t, () => {
        setInk("working");
        setPhase(1);
      });
      t += 1300;
      at(t, () => setInk("tick"));
      for (let c = 1; c <= MEANT.length; c++) at(t + c * 16, () => setTyped(c));
      at(t + MEANT.length * 16 + 6000, play);
    };

    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          at(1600, play);
        } else if (!e.isIntersecting && started) {
          started = false;
          finish();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="grid items-stretch gap-4 rounded-[28px] p-4 md:grid-cols-2 md:gap-5 md:p-8 [&>*]:min-w-0"
      style={{ background: "linear-gradient(180deg, #edf0ef 0%, #f4ecda 60%, #f6d78f 100%)" }}
      aria-hidden
    >
      {/* What you actually said */}
      <div className="flex flex-col rounded-[20px] bg-[#1a1917] p-6 md:p-7">
        <div className="flex h-9 items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
          <Ink kind={ink} />
        </div>
        <Spoken said={SAID} shown={shown} phase={phase} className="mt-4 font-serif text-[22px] leading-[1.35] text-white md:mt-6 md:text-[27px]" />
      </div>

      {/* Where it landed */}
      <Window title="# launch · Slack">
        <div className="flex flex-col gap-4 px-5 pb-5 pt-1 md:px-6">
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#e9b8a6] text-[11px] font-semibold text-ink/80">SV</span>
            <div className="min-w-0 font-[family-name:var(--font-ui)] text-[15px] leading-[1.45]">
              <p className="font-semibold text-ink">Sanne Visser</p>
              <p className="text-[#3d3c39]">is the launch still on tuesday?</p>
            </div>
          </div>
          <div className="rounded-[12px] bg-[#f6f5f1] px-4 py-3 font-[family-name:var(--font-ui)] text-[15px] leading-[1.45] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
            <span className="text-ink">
              {MEANT.slice(0, typed)}
              <span className="caret ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[3px] bg-ink" />
            </span>
          </div>
          <p className="font-[family-name:var(--font-ui)] text-[12px] text-muted">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-amber align-middle" />
            AI cleanup on, with your own key
          </p>
        </div>
      </Window>
    </div>
  );
}
