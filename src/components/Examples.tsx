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
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setPhase(0);
    const timers = [window.setTimeout(() => setPhase(1), 1200), window.setTimeout(() => setPhase(2), 3800)];
    if (auto) timers.push(window.setTimeout(() => setIndex((i) => (i + 1) % CASES.length), 11000));
    return () => timers.forEach(clearTimeout);
  }, [index, auto, visible]);

  const c = CASES[index];

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Examples">
        {CASES.map((x, i) => (
          <button
            key={x.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => {
              setAuto(false);
              setIndex(i);
            }}
            className="h-9 rounded-full px-4 text-[15px] transition-colors duration-200 ease-out"
            style={i === index ? { background: "#292929", color: "#fff" } : { background: "#ebe6d9", color: "#292929" }}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-5" role="tabpanel">
        <div className="rounded-[20px] bg-[#1a1917] p-7 md:p-9">
          <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
          <Spoken key={index} said={c.said} phase={phase > 0 ? 1 : 0} className="mt-3 font-serif text-[21px] leading-[1.45] text-white md:text-[23px]" />
        </div>
        <Window title={c.app}>
          <div className="min-h-[250px] px-7 pb-8 pt-3 md:px-9">
            <p
              key={index}
              className="whitespace-pre-line font-[family-name:var(--font-ui)] [overflow-wrap:anywhere] text-[17px] leading-[1.55] text-ink transition-[opacity,transform] duration-300"
              style={{ opacity: phase > 1 ? 1 : 0, transform: phase > 1 ? "none" : "translateY(6px)", transitionTimingFunction: "var(--ease)" }}
            >
              <Rich text={c.meant} />
            </p>
          </div>
        </Window>
      </div>
    </div>
  );
}
