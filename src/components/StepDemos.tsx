import { useEffect, useRef, useState } from "react";
import { Ink, type InkKind } from "./app/Ink";
import Window from "./app/Window";
import Spoken from "./Spoken";

// Hold → Talk → Let go as one connected demo: one stage, the three steps
// lighting up beside it. It plays once as it scrolls in, then rests finished
// (Replay plays it again), so nothing finished ever gets wiped by itself.
const SAID = "~so ~um, we ship on ~tuesday, ~no ~wait, wednesday, because the certificate isn't sorted yet";
const WORDS = SAID.split(" ").length;
const MEANT = "We ship on Wednesday, because the certificate isn't sorted yet.";

const STEPS = [
  { n: 1, title: "Hold", body: "Right Ctrl, in any app. Or pick your own key.", said: "~um, ~you ~just hold ~the ~key" },
  { n: 2, title: "Talk", body: "Ramble, pause, change your mind. Chirp keeps the last version.", said: "~just, ~like, ~you ~know, talk" },
  { n: 3, title: "Let go", body: "The clean version lands at your cursor, in whatever app you were typing in.", said: "~and ~then ~you ~just let ~it go" },
];

type State = { step: number; key: boolean; ink: InkKind; shown: number; phase: 0 | 1; typed: number };
const FINISHED: State = { step: 0, key: false, ink: "message", shown: WORDS, phase: 1, typed: MEANT.length };
const START: State = { step: 0, key: false, ink: "tick", shown: 0, phase: 0, typed: 0 };

export default function StepsDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [s, setS] = useState<State>(FINISHED);

  const play = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const at = (ms: number, patch: Partial<State>) => timers.current.push(window.setTimeout(() => setS((p) => ({ ...p, ...patch })), ms));
    setS(START);
    at(500, { step: 1, key: true, ink: "listening" });
    at(1500, { step: 2 });
    for (let i = 1; i <= WORDS; i++) at(1500 + i * 150, { shown: i });
    const release = 1500 + WORDS * 150 + 400;
    at(release, { step: 3, key: false, ink: "working", phase: 1 });
    const paste = release + 1300;
    at(paste, { ink: "message" });
    for (let c = 1; c <= MEANT.length; c += 2) at(paste + c * 8, { typed: Math.min(MEANT.length, c + 1) });
    at(paste + MEANT.length * 8 + 1200, { step: 0 });
  };

  useEffect(() => {
    let played = false;
    // Reset just before it scrolls into view, play once it's well in.
    const before = new IntersectionObserver(([e]) => !played && e.isIntersecting && setS(START), { rootMargin: "0px 0px 25% 0px" });
    const inView = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !played) {
          played = true;
          play();
        } else if (!e.isIntersecting && played) {
          timers.current.forEach(clearTimeout);
          setS(FINISHED);
        }
      },
      { threshold: 0.45 },
    );
    before.observe(ref.current!);
    inView.observe(ref.current!);
    return () => {
      before.disconnect();
      inView.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 [&>*]:min-w-0">
      <ol className="space-y-7">
        {STEPS.map((x) => (
          <li key={x.n} className="transition-opacity duration-300" style={{ opacity: s.step === 0 || s.step === x.n ? 1 : 0.35 }}>
            <p className="w-fit cursor-default font-serif text-[26px]" data-said={x.said} data-said-pos="right">
              <span className="text-[#8f6400]">{x.n}</span> · {x.title}
            </p>
            <p className="t-lead mt-2 max-w-[26rem]">{x.body}</p>
          </li>
        ))}
        <li>
          <button type="button" onClick={play} className="text-[15px] text-muted underline decoration-black/25 underline-offset-4 hover:text-ink">
            Replay
          </button>
        </li>
      </ol>

      <div className="flex flex-col gap-3 rounded-[28px] bg-white p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.07)] md:gap-4 md:p-6" aria-hidden>
        <Window title="Joris Bakker · Slack" className="!shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-3 px-5 pb-5 pt-1">
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#b8cdd1] text-[11px] font-semibold text-ink/80">JB</span>
              <div className="min-w-0 font-[family-name:var(--font-ui)] text-[15px] leading-[1.45]">
                <p className="font-semibold text-ink">Joris Bakker</p>
                <p className="text-[#3d3c39]">so when are we shipping?</p>
              </div>
            </div>
            <div className="rounded-[12px] bg-[#f6f5f1] px-4 py-3 font-[family-name:var(--font-ui)] text-[15px] leading-[1.5] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
              <span className="text-ink">
                {MEANT.slice(0, s.typed)}
                <span className="caret ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[3px] bg-ink" />
                <span className="invisible">{MEANT.slice(s.typed)}</span>
              </span>
            </div>
          </div>
        </Window>

        <div className="rounded-[20px] bg-[#1a1917] p-5 md:p-6">
          <div className="flex h-9 items-center justify-between gap-3">
            <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
            <Ink kind={s.ink} speaking={s.shown < WORDS} text="Pasted" check />
          </div>
          <Spoken said={SAID} shown={s.shown} phase={s.phase} className="mt-3 font-serif text-[20px] leading-[1.4] text-white md:text-[23px]" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <span
            className="inline-flex h-11 items-center rounded-[10px] bg-white px-4 font-[family-name:var(--font-ui)] text-[16px] text-ink transition-[transform,box-shadow] duration-150 ease-out"
            style={{
              transform: s.key ? "translateY(3px)" : "none",
              boxShadow: s.key ? "0 0 0 1px rgba(0,0,0,.14), 0 1px 0 rgba(0,0,0,.12)" : "0 0 0 1px rgba(0,0,0,.14), 0 4px 0 rgba(0,0,0,.14)",
              color: s.key ? "#8f6400" : undefined,
            }}
          >
            Right Ctrl
          </span>
          <p className="flex items-center gap-1.5 font-[family-name:var(--font-ui)] text-[13px] text-ink/70">
            <span className="h-2 w-2 rounded-full bg-amber" />
            AI cleanup on · your own key
          </p>
        </div>
      </div>
    </div>
  );
}
