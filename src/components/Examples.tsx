import { useEffect, useRef, useState } from "react";
import Window from "./app/Window";
import Spoken from "./Spoken";

// Real dictations from Chirp's test set, each with the app it was going into.
// "~" marks words Chirp drops: fillers and the abandoned half of a correction.
const CASES = [
  {
    label: "Changing your mind",
    app: "Chat · Mila de Jong · Microsoft Teams",
    said: "can you book the room for ~um, ~six ~people, ~scratch ~that, eight people, Sanne and Thijs are joining too, for Thursday afternoon, ~like from two to ~uh, ~four, ~no, three thirty",
    meant: "Can you book the room for eight people for Thursday afternoon, from 2:00 to 3:30? Sanne and Thijs are joining too.",
  },
  {
    label: "Emails",
    app: "Re: Freelance front-end developer · Gmail",
    said: "hey Daan, ~um, thanks for sending your portfolio, I really liked the Bloem and Co project, ~uh, we're looking for someone for about three days a week starting in January, would you be up for a call next week, maybe Tuesday or Wednesday afternoon, cheers Pieter",
    meant:
      "Hey Daan,\n\nThanks for sending your portfolio, I really liked the Bloem & Co project. We're looking for someone for about three days a week starting in January.\n\nWould you be up for a call next week, maybe Tuesday or Wednesday afternoon?\n\nCheers,\nPieter",
  },
  {
    label: "Lists",
    app: "Chirp v2 roadmap · Notion",
    said: "things to do this week, number one, finish the bench harness, number two, ~uh, port the hotkey hook, number three, write the system prompt, number four, ~um, record the real corpus",
    meant: "Things to do this week:\n\n1. Finish the bench harness\n2. Port the hotkey hook\n3. Write the system prompt\n4. Record the real corpus",
  },
  {
    label: "Prompts",
    app: "commands.rs · Chirp · Cursor",
    said: "refactor the stop recording function in commands dot R S so that ~uh, the transcription and the cleanup steps are timed separately, and log each duration with the tracing crate, ~um, don't change the public signature",
    meant:
      "Refactor the `stop_recording` function in `commands.rs` so that the transcription and cleanup steps are timed separately, and log each duration with the `tracing` crate. Don't change the public signature.",
  },
  {
    label: "Numbers",
    app: "Mila de Jong (DM) · Slack",
    said: "the invoice for Hendriks is twenty four hundred and fifty euros excluding VAT, ~uh, that's thirty five hours at seventy euros, can you double check that before I send it",
    meant: "The invoice for Hendriks is €2,450 excluding VAT, that's 35 hours at €70. Can you double-check that before I send it?",
  },
  {
    label: "Terminal",
    app: "PowerShell · Windows Terminal",
    said: "git commit dash M quote fix hotkey resync after unlock end quote",
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
    const timers = [window.setTimeout(() => setPhase(1), 900), window.setTimeout(() => setPhase(2), 2300)];
    if (auto) timers.push(window.setTimeout(() => setIndex((i) => (i + 1) % CASES.length), 8000));
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
            style={i === index ? { background: "#292929", color: "#fff" } : { background: "#f5f5f0", color: "#292929" }}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-5" role="tabpanel">
        <div className="rounded-[18px] bg-[#1a1917] p-6 md:p-7">
          <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
          <Spoken key={index} said={c.said} phase={phase as 0 | 1 | 2} className="mt-3 font-serif text-[20px] leading-[1.45] text-white md:text-[22px]" />
        </div>
        <Window title={c.app}>
          <div className="min-h-[300px] px-6 pb-7 pt-3 md:px-8">
            <p
              key={index}
              className="whitespace-pre-line font-[family-name:var(--font-ui)] text-[17px] leading-[1.55] text-ink transition-[opacity,transform] duration-300"
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
