import { useEffect, useRef, useState } from "react";
import Window from "./app/Window";
import Spoken from "./Spoken";

// Real dictations from Chirp's test set, each with the app it was going into.
// "~" marks words Chirp drops: fillers and the abandoned half of a correction.
const CASES = [
  {
    label: "Emails",
    app: "Re: Freelance front-end developer · Gmail",
    said: "hey Daan, ~um, thanks for sending your portfolio, I really liked the Bloem and Co project, ~uh, would you be up for a call next week, ~like Tuesday or Wednesday afternoon, cheers Pieter",
    meant:
      "Hey Daan,\n\nThanks for sending your portfolio, I really liked the Bloem & Co project.\n\nWould you be up for a call next week, Tuesday or Wednesday afternoon?\n\nCheers,\nPieter",
  },
  {
    label: "Lists",
    app: "Chirp v2 roadmap · Notion",
    said: "things to do this week, number one, finish the bench harness, number two, ~uh, port the hotkey hook, number three, ~um, write the system prompt",
    meant: "Things to do this week:\n\n1. Finish the bench harness\n2. Port the hotkey hook\n3. Write the system prompt",
  },
  {
    label: "Terminal",
    app: "PowerShell · Windows Terminal",
    said: "~uh, ~okay, git commit dash M quote fix hotkey resync after unlock end quote",
    meant: '`git commit -m "fix hotkey resync after unlock"`',
  },
];

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 ? (
          <code key={i} className="rounded-[5px] bg-black/[0.06] px-1 py-px font-mono text-[0.88em]">
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function Examples() {
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [index, setIndex] = useState(0);
  // Finished by default: phase 2 shows the struck input and the pasted result.
  const [phase, setPhase] = useState(2);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const play = (i: number) => {
    clear();
    setIndex(i);
    setPhase(0);
    timers.current.push(window.setTimeout(() => setPhase(1), 700));
    timers.current.push(window.setTimeout(() => setPhase(2), 2100));
  };

  useEffect(() => {
    // Leaving the view always finishes the example, so it can't freeze blank.
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) {
        clear();
        setPhase(2);
      }
    });
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  const c = CASES[index];

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Examples">
        {CASES.map((x, i) => (
          <button
            key={x.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => play(i)}
            className="h-10 rounded-full px-4 text-[15px] transition-colors duration-200 ease-out"
            style={i === index ? { background: "#292929", color: "#fff" } : { background: "#fff", color: "#292929", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.12)" }}
          >
            {x.label}
          </button>
        ))}
        <button type="button" onClick={() => play(index)} className="ml-auto h-10 px-2 text-[15px] text-muted underline decoration-black/25 underline-offset-4 hover:text-ink">
          Replay
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 [&>*]:min-w-0" role="tabpanel">
        <div className="rounded-[20px] bg-[#1a1917] p-6 md:p-7">
          <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
          <Spoken key={index} said={c.said} phase={phase > 0 ? 1 : 0} className="mt-3 font-serif text-[19px] leading-[1.45] text-white md:text-[21px]" />
        </div>
        <Window title={c.app}>
          <div className="min-h-[220px] px-6 pb-6 pt-1">
            <p
              className="whitespace-pre-line font-[family-name:var(--font-ui)] [overflow-wrap:anywhere] text-[16px] leading-[1.55] text-ink transition-opacity duration-300"
              style={{ opacity: phase > 1 ? 1 : 0 }}
            >
              <Rich text={c.meant} />
            </p>
          </div>
        </Window>
      </div>
    </div>
  );
}
