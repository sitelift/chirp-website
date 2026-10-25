import { useEffect, useRef, useState } from "react";

// Real dictations from Chirp's test set, each in the app it was going into.
// "~" marks words Chirp drops: fillers, the abandoned half of a correction.
const CASES = [
  {
    label: "Corrections",
    app: "Microsoft Teams",
    said: "can you book the room for, ~um, ~six ~people, ~scratch ~that, eight people, Sanne and Thijs are joining too, for Thursday afternoon, ~like from two to, ~uh, ~four, ~no, three thirty",
    meant: "Can you book the room for eight people for Thursday afternoon, from 2:00 to 3:30? Sanne and Thijs are joining too.",
  },
  {
    label: "Email",
    app: "Gmail",
    said: "hey Daan, ~um, thanks for sending your portfolio, I really liked the Bloem and Co project, ~uh, we're looking for someone for about three days a week starting in January, would you be up for a call next week, maybe Tuesday or Wednesday afternoon, cheers Pieter",
    meant: "Hey Daan,\n\nThanks for sending your portfolio, I really liked the Bloem & Co project. We're looking for someone for about three days a week starting in January.\n\nWould you be up for a call next week, maybe Tuesday or Wednesday afternoon?\n\nCheers,\nPieter",
  },
  {
    label: "Lists",
    app: "Notion",
    said: "things to do this week, number one, finish the bench harness, number two, ~uh, port the hotkey hook, number three, write the system prompt, number four, ~um, record the real corpus",
    meant: "Things to do this week:\n\n1. Finish the bench harness\n2. Port the hotkey hook\n3. Write the system prompt\n4. Record the real corpus",
  },
  {
    label: "AI prompts",
    app: "Cursor",
    said: "refactor the stop recording function in commands dot R S so that, ~uh, the transcription and the cleanup steps are timed separately, and log each duration with the tracing crate, ~um, don't change the public signature",
    meant: "Refactor the `stop_recording` function in `commands.rs` so that the transcription and cleanup steps are timed separately, and log each duration with the `tracing` crate. Don't change the public signature.",
  },
  {
    label: "Numbers",
    app: "Slack",
    said: "the invoice for Hendriks is twenty four hundred and fifty euros excluding VAT, ~uh, that's thirty five hours at seventy euros, can you double check that before I send it",
    meant: "The invoice for Hendriks is €2,450 excluding VAT, that's 35 hours at €70. Can you double-check that before I send it?",
  },
  {
    label: "Terminal",
    app: "Windows Terminal",
    said: "git commit dash M quote fix hotkey resync after unlock end quote",
    meant: "`git commit -m \"fix hotkey resync after unlock\"`",
  },
];

/** Backticked spans render as code, the way they land in an editor. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 ? (
          <code key={i} className="rounded-[6px] bg-stone-200/80 px-1.5 py-0.5 font-mono text-[0.82em] text-stone-900">
            {part}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function Meant() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  // Each case: show what was said, strike the fillers, then reveal what Chirp typed.
  useEffect(() => {
    if (!visible) return;
    setPhase(0);
    const timers = [
      window.setTimeout(() => setPhase(1), 900),
      window.setTimeout(() => setPhase(2), 1600),
    ];
    if (auto) timers.push(window.setTimeout(() => setIndex((i) => (i + 1) % CASES.length), 6000));
    return () => timers.forEach(clearTimeout);
  }, [index, auto, visible]);

  const c = CASES[index];
  const tokens = c.said.split(" ");

  return (
    <div ref={ref} className="mt-14">
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
            className="rounded-full px-4 py-2 text-[15px] transition-colors duration-200 ease-out"
            style={{
              background: i === index ? "#fafaf9" : "rgba(255,255,255,0.06)",
              color: i === index ? "#0c0a09" : "#a8a29e",
            }}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-6" role="tabpanel">
        <div className="flex min-h-[340px] flex-col rounded-[28px] border border-white/[0.07] p-8 md:p-10">
          <p className="text-[15px] font-medium text-stone-500">You say</p>
          <p key={index} className="mt-5 font-mono text-[clamp(15px,1.45vw,19px)] leading-[1.6] text-stone-300">
            {tokens.map((t, i) => {
              const drop = t.startsWith("~");
              const word = t.replace(/^~/, "");
              return (
                <span key={i}>
                  <span
                    className="transition-[color,opacity] duration-300 ease-out"
                    style={
                      drop && phase > 0
                        ? { color: "#57534e", textDecoration: "line-through", textDecorationThickness: 2, opacity: phase > 1 ? 0.6 : 1 }
                        : undefined
                    }
                  >
                    {word}
                  </span>{" "}
                </span>
              );
            })}
          </p>
        </div>
        <div className="flex min-h-[340px] flex-col rounded-[28px] bg-stone-50 p-8 md:p-10">
          <p className="flex items-center justify-between text-[15px] font-medium text-stone-500">
            <span>Chirp types</span>
            <span className="rounded-full bg-stone-200/70 px-2.5 py-1 text-[13px] text-stone-600">in {c.app}</span>
          </p>
          <p
            key={index}
            className="mt-5 whitespace-pre-line text-[clamp(19px,1.9vw,25px)] font-medium leading-[1.35] tracking-[-0.02em] text-stone-950 transition-[opacity,transform] duration-300"
            style={{
              opacity: phase > 1 ? 1 : 0,
              transform: phase > 1 ? "none" : "translateY(8px)",
              transitionTimingFunction: "var(--ease)",
            }}
          >
            <Rich text={c.meant} />
          </p>
        </div>
      </div>
    </div>
  );
}
