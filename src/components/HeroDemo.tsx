import { useEffect, useRef, useState } from "react";
import Window from "./app/Window";
import { Ink, type InkKind } from "./app/Ink";
import Spoken from "./Spoken";

// The whole promise in one frame. The clean reply is always there (it never
// gets erased); the input side replays what you said, the fillers get struck,
// and the reply flashes as it's pasted. On phones the result comes first.
const SAID = "~um, no, it moved to ~thursday, ~no ~wait, wednesday at three";
const MEANT = "No, it moved to Wednesday at 3.";
const WORDS = SAID.split(" ").length;

export default function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [ink, setInk] = useState<InkKind>("message");
  const [shown, setShown] = useState(WORDS);
  const [phase, setPhase] = useState<0 | 1>(1);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const play = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setShown(0);
      setPhase(0);
      setInk("listening");
      for (let k = 1; k <= WORDS; k++) at(k * 130, () => setShown(k));
      let t = WORDS * 130 + 300;
      at(t, () => {
        setInk("working");
        setPhase(1);
      });
      t += 1300;
      at(t, () => {
        setInk("message");
        setFlash(true);
      });
      at(t + 900, () => setFlash(false));
      at(t + 7000, play);
    };
    const finish = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setInk("message");
      setShown(WORDS);
      setPhase(1);
      setFlash(false);
    };
    let on = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !on) {
          on = true;
          at(1200, play);
        } else if (!e.isIntersecting && on) {
          on = false;
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
      className="grid items-stretch gap-3 rounded-[28px] p-3 md:grid-cols-2 md:gap-5 md:p-8 [&>*]:min-w-0"
      style={{ background: "linear-gradient(180deg, #f7f0de 0%, #f4e8cc 60%, #f6d78f 100%)" }}
      aria-hidden
    >
      {/* What you actually said (second on phones, first on desktop) */}
      <div className="order-2 flex flex-col rounded-[20px] bg-[#1a1917] p-5 md:order-1 md:p-7">
        <div className="flex h-9 items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
          <Ink kind={ink} text="Pasted" check />
        </div>
        <Spoken said={SAID} shown={shown} phase={phase} className="mt-3 font-serif text-[20px] leading-[1.35] text-white md:mt-6 md:text-[27px]" />
      </div>

      {/* Where it landed */}
      <Window title="# launch · Slack" className="order-1 md:order-2">
        <div className="flex flex-col gap-3 px-5 pb-5 pt-1 md:gap-4 md:px-6">
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#e9b8a6] text-[11px] font-semibold text-ink/80">SV</span>
            <div className="min-w-0 font-[family-name:var(--font-ui)] text-[15px] leading-[1.45]">
              <p className="font-semibold text-ink">Sanne Visser</p>
              <p className="text-[#3d3c39]">is the launch still on tuesday?</p>
            </div>
          </div>
          <div
            className="rounded-[12px] px-4 py-3 font-[family-name:var(--font-ui)] text-[15px] leading-[1.45] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-colors duration-500"
            style={{ background: flash ? "#fbeec4" : "#f6f5f1" }}
          >
            <span className="text-ink">
              {MEANT}
              <span className="caret ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[3px] bg-ink" />
            </span>
          </div>
          <p className="flex items-center gap-1.5 font-[family-name:var(--font-ui)] text-[13px] text-ink/70">
            <span className="h-2 w-2 rounded-full bg-amber" />
            AI cleanup on · your own key
          </p>
        </div>
      </Window>
    </div>
  );
}
