import { useEffect, useRef, useState } from "react";
import Window from "./app/Window";
import Spoken from "./Spoken";

// Real dictations from Chirp's test set, each with the app it was going into.
// "~" marks words Chirp drops: fillers and the abandoned half of a correction.
const CASES = [
  {
    label: "Emails",
    app: "Re: Freelance developer · Gmail",
    said: "hey Daan, ~um, thanks for the portfolio, I loved the Bloem and Co project, ~uh, free for a call tuesday afternoon? cheers Pieter",
    meant: "Hey Daan,\n\nThanks for the portfolio, I loved the Bloem & Co project. Free for a call Tuesday afternoon?\n\nCheers,\nPieter",
  },
  {
    label: "Lists",
    app: "This week · Notion",
    said: "this week, number one, finish the bench harness, number two, ~uh, port the hotkey hook, number three, ~um, write the prompt",
    meant: "This week:\n\n1. Finish the bench harness\n2. Port the hotkey hook\n3. Write the prompt",
  },
  {
    label: "Terminal",
    app: "PowerShell · Windows Terminal",
    said: "~uh, ~okay, git commit dash M quote fix hotkey resync end quote",
    meant: 'git commit -m "fix hotkey resync"',
    terminal: true,
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
  // The result window always shows the finished text; only the strikes replay.
  const [phase, setPhase] = useState(1);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const play = (i: number) => {
    clear();
    setIndex(i);
    setPhase(0);
    timers.current.push(window.setTimeout(() => setPhase(1), 450));
  };

  useEffect(() => {
    // Leaving the view always finishes the example, so it can't freeze blank.
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) {
        clear();
        setPhase(1);
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
        <button type="button" onClick={() => play(index)} className="h-10 px-2 text-[15px] text-muted underline decoration-black/25 underline-offset-4 hover:text-ink">
          Replay
        </button>
      </div>
      <p className="mt-4 flex items-center gap-1.5 font-[family-name:var(--font-ui)] text-[14px] text-ink/75">
        <span className="h-2 w-2 rounded-full bg-amber" />
        AI cleanup on · your own key. Without a key, Chirp pastes your words as spoken, punctuated.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 [&>*]:min-w-0" role="tabpanel">
        <div className="min-h-[210px] rounded-[20px] bg-[#1a1917] p-6 md:min-h-[260px] md:p-7">
          <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
          <Spoken key={index} said={c.said} phase={phase ? 1 : 0} className="mt-3 font-serif text-[21px] leading-[1.4] text-white md:text-[24px]" />
        </div>
        <Window title={c.app}>
          {"terminal" in c ? (
            <div className="mx-3 mb-3 h-[199px] rounded-[10px] bg-[#0c0c0c] px-4 py-3 font-mono text-[14px] leading-[1.6] text-[#e8e6e1]">
              <p className="text-[#9a9890]">PS C:\code\chirp&gt;</p>
              <p className="[overflow-wrap:anywhere] ">
                {c.meant}
                <span className="caret ml-0.5 inline-block h-[1em] w-[8px] translate-y-[2px] bg-[#e8e6e1]" />
              </p>
            </div>
          ) : (
            <div className="h-[202px] px-6 pb-6 pt-1">
              <p
                className="whitespace-pre-line font-[family-name:var(--font-ui)] [overflow-wrap:anywhere] text-[16px] leading-[1.55] text-ink"
              >
                <Rich text={c.meant} />
              </p>
            </div>
          )}
        </Window>
      </div>
    </div>
  );
}
