import { useEffect, useRef, useState } from "react";
import Window from "./app/Window";
import { Ink, type InkKind } from "./app/Ink";
import Murmuration from "./Murmuration";
import Spoken from "./Spoken";

// A Slack thread answered by voice. "~" marks words Chirp drops.
const THREAD = [
  {
    ask: { who: "Sanne Visser", initials: "SV", tint: "#e9b8a6", text: "is the launch still on tuesday?" },
    said: "~um ~so no, we moved it to ~thursday, ~no ~wait, wednesday at three, because joris has the dentist",
    meant: "No, we moved it to Wednesday at 3, because Joris has the dentist.",
  },
  {
    ask: { who: "Joris Bakker", initials: "JB", tint: "#b8cdd1", text: "the dentist is real. can someone test my hotkey fix?" },
    said: "~yeah ~so I'll test it on my machine ~like right after lunch ~new ~line and sure joris",
    meant: "I'll test it on my machine right after lunch.\nAnd sure, Joris.",
  },
  {
    ask: { who: "Sanne Visser", initials: "SV", tint: "#e9b8a6", text: "while you're here, what was the Hendriks invoice?" },
    said: "it's twenty four hundred and fifty euros, ~uh, that's thirty five hours at seventy, ~um, sending it today",
    meant: "It's €2,450, that's 35 hours at €70. Sending it today.",
  },
];

type Msg = { who: string; initials: string; tint: string; text: string; me?: boolean };
const ME = { who: "Pieter de Bruijn", initials: "PB", tint: "#f0b723" };

export default function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [ink, setInk] = useState<InkKind>("tick");
  const [spoken, setSpoken] = useState<{ said: string; shown: number; phase: 0 | 1 | 2; on: boolean; key: number } | null>(null);
  const [typed, setTyped] = useState<{ text: string; key: number } | null>(null);

  useEffect(() => {
    let timers: number[] = [];
    let running = false;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const play = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setMsgs([]);
      setTyped(null);
      setSpoken(null);
      setInk("tick");
      let t = 400;
      THREAD.forEach((step, i) => {
        const words = step.said.split(" ");
        at(t, () => setMsgs((m) => [...m, step.ask]));
        t += 1300;
        at(t, () => {
          setInk("listening");
          setSpoken({ said: step.said, shown: 0, phase: 0, on: true, key: i });
        });
        words.forEach((_, k) => at(t + 250 + k * 210, () => setSpoken((s) => (s ? { ...s, shown: k + 1 } : s))));
        t += 250 + words.length * 210 + 450;
        at(t, () => {
          setInk("working");
          setSpoken((s) => (s ? { ...s, phase: 1 } : s));
        });
        t += 1200;
        at(t, () => setSpoken((s) => (s ? { ...s, phase: 2 } : s)));
        t += 700;
        at(t, () => {
          setInk("tick");
          setTyped({ text: step.meant, key: i });
        });
        t += 600 + step.meant.length * 9 + 1500;
        at(t, () => {
          setSpoken((s) => (s ? { ...s, on: false } : s));
          setTyped(null);
          setMsgs((m) => [...m, { ...ME, text: step.meant, me: true }]);
        });
        t += 900;
      });
      at(t + 2600, play);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          play();
        } else if (!e.isIntersecting && running) {
          running = false;
          timers.forEach(clearTimeout);
          timers = [];
        }
      },
      { threshold: 0.3 },
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
      className="relative h-[600px] overflow-hidden rounded-[24px] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_40px_80px_-40px_rgba(60,40,0,0.45)] md:h-[640px]"
      style={{ background: "linear-gradient(180deg, #e9eef0 0%, #f3ead6 58%, #f6d58a 100%)" }}
      aria-hidden
    >
      {/* The wallpaper: a murmuration over a dawn sky */}
      <Murmuration count={420} centerY={0.8} spread={0.75} />

      <div className="absolute inset-x-5 top-6 md:inset-x-[14%] md:top-10">
        <Window title="# launch · Sitelift · Slack">
          <div className="flex h-[280px] flex-col px-5 pb-5 md:h-[290px] md:px-6">
            <div className="flex flex-1 flex-col justify-end gap-4 overflow-hidden py-4">
              {msgs.map((m, i) => (
                <div key={i} className="flex gap-3" style={{ animation: "ink-content 240ms var(--ease) both" }}>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] text-[11px] font-semibold text-ink/80"
                    style={{ background: m.tint }}
                  >
                    {m.initials}
                  </span>
                  <div className="min-w-0 font-[family-name:var(--font-ui)] text-[14px] leading-[1.45]">
                    <p className="font-semibold text-ink">{m.who}</p>
                    <p className="whitespace-pre-line text-[#3d3c39]">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-[12px] bg-[#f6f5f1] px-4 py-3 font-[family-name:var(--font-ui)] text-[14px] leading-[1.45] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
              <span className="whitespace-pre-line text-ink">
                {typed && <Typed key={typed.key} text={typed.text} />}
                <span className="caret ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[3px] bg-ink" />
                {!typed && <span className="text-faint">Message #launch</span>}
              </span>
            </div>
          </div>
        </Window>
      </div>

      {/* What you actually said */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[112px] flex justify-center px-5">
      <div
        className="w-full max-w-[440px] rounded-[18px] bg-[#1a1917] px-5 pb-5 pt-4 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] transition-[opacity,transform] duration-300"
        style={{
          opacity: spoken?.on ? 1 : 0,
          transform: spoken?.on ? "none" : "translateY(10px)",
          transitionTimingFunction: "var(--ease)",
        }}
      >
        <p className="font-[family-name:var(--font-ui)] text-[12px] text-[#a3a29e]">What you said</p>
        {spoken && (
          <Spoken
            key={spoken.key}
            said={spoken.said}
            shown={spoken.shown}
            phase={spoken.phase}
            className="mt-2 font-serif text-[20px] leading-[1.4] text-white"
          />
        )}
      </div>
      </div>

      {/* The pill, where it lives: just above the taskbar */}
      <div className="absolute inset-x-0 bottom-[60px] flex h-9 items-end justify-center">
        <Ink kind={ink} />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-center gap-2 bg-white/75 backdrop-blur-md">
        <svg viewBox="0 0 16 16" className="h-[18px] w-[18px] text-[#2a6fdb]" fill="currentColor">
          <path d="M0 2.2 6.5 1.3v6.2H0zM7.3 1.2 16 0v7.5H7.3zM0 8.3h6.5v6.3L0 13.7zM7.3 8.3H16V16l-8.7-1.2z" />
        </svg>
        {["#e9b8a6", "#4a154b", "#c9c3e6", "#f0d78a"].map((c) => (
          <span key={c} className="h-6 w-6 rounded-[6px]" style={{ background: c, opacity: c === "#4a154b" ? 0.85 : 1 }} />
        ))}
      </div>
    </div>
  );
}

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 2)), 18);
    return () => clearInterval(id);
  }, [text]);
  return <>{text.slice(0, n)}</>;
}
