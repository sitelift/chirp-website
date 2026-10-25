import { useEffect, useRef, useState } from "react";
import { Ink, type InkKind } from "./app/Ink";
import Window from "./app/Window";
import Spoken from "./Spoken";

// Steps 2 and 3 tell one story: a ramble to Joris, then that same message
// landing in his DM. Both render finished, replay when scrolled into view and
// finish instantly when scrolled away, so nothing is ever left blank.
const SAID =
  "~so I was thinking we ship on ~Monday, ~no ~wait, ~Tuesday, ~actually ~let's ~say Wednesday, to be safe, because the certificate thing isn't sorted yet";
const WORDS = SAID.split(" ").length;
export const MEANT = "I was thinking we ship on Wednesday to be safe, because the certificate thing isn't sorted yet.";

function useReplay(play: () => () => void, finish: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let stop: (() => void) | null = null;
    let start = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !stop && !start) {
          start = window.setTimeout(() => {
            start = 0;
            stop = play();
          }, 700);
        } else if (!e.isIntersecting) {
          clearTimeout(start);
          start = 0;
          stop?.();
          stop = null;
          finish();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      clearTimeout(start);
      stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

export function TalkDemo() {
  const [shown, setShown] = useState(WORDS);
  const [phase, setPhase] = useState<0 | 1>(1);
  const [ink, setInk] = useState<InkKind>("tick");
  const ref = useReplay(
    () => {
      const timers: number[] = [];
      const run = () => {
        timers.forEach(clearTimeout);
        setShown(0);
        setPhase(0);
        setInk("listening");
        for (let i = 1; i <= WORDS; i++) timers.push(window.setTimeout(() => setShown(i), i * 150));
        const end = WORDS * 150 + 400;
        timers.push(window.setTimeout(() => (setPhase(1), setInk("working")), end));
        timers.push(window.setTimeout(() => setInk("tick"), end + 1400));
        timers.push(window.setTimeout(run, end + 7000));
      };
      run();
      return () => timers.forEach(clearTimeout);
    },
    () => (setShown(WORDS), setPhase(1), setInk("tick")),
  );

  return (
    <div ref={ref} className="rounded-[20px] bg-[#1a1917] p-7 md:p-9" aria-hidden>
      <div className="flex h-9 items-center justify-between gap-3">
        <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said, to Joris</p>
        <Ink kind={ink} speaking={shown < WORDS} />
      </div>
      <Spoken said={SAID} shown={shown} phase={phase} className="mt-5 font-serif text-[21px] leading-[1.45] text-white md:text-[25px]" />
    </div>
  );
}

export function LetGoDemo() {
  const [typed, setTyped] = useState(MEANT.length);
  const ref = useReplay(
    () => {
      const timers: number[] = [];
      const run = () => {
        timers.forEach(clearTimeout);
        setTyped(0);
        for (let c = 1; c <= MEANT.length; c++) timers.push(window.setTimeout(() => setTyped(c), 300 + c * 14));
        timers.push(window.setTimeout(run, 300 + MEANT.length * 14 + 6000));
      };
      run();
      return () => timers.forEach(clearTimeout);
    },
    () => setTyped(MEANT.length),
  );

  return (
    <div ref={ref} aria-hidden>
      <Window title="Joris Bakker · Slack">
        <div className="flex flex-col gap-4 px-6 pb-6 pt-1 md:px-7">
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#b8cdd1] text-[11px] font-semibold text-ink/80">JB</span>
            <div className="min-w-0 font-[family-name:var(--font-ui)] text-[15px] leading-[1.45]">
              <p className="font-semibold text-ink">Joris Bakker</p>
              <p className="text-[#3d3c39]">so when are we shipping?</p>
            </div>
          </div>
          <div className="rounded-[12px] bg-[#f6f5f1] px-4 py-3 font-[family-name:var(--font-ui)] text-[16px] leading-[1.5] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
            <span className="text-ink">
              {MEANT.slice(0, typed)}
              <span className="caret ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[3px] bg-ink" />
              <span className="invisible">{MEANT.slice(typed)}</span>
            </span>
          </div>
          <p className="font-[family-name:var(--font-ui)] text-[12px] text-muted">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-amber align-middle" />
            AI cleanup on, with your own key. Without a key, Chirp pastes your words as spoken, punctuated.
          </p>
        </div>
      </Window>
    </div>
  );
}
