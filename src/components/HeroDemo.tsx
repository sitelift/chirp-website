import { useEffect, useRef, useState } from "react";
import Window from "./app/Window";
import { Ink, type InkKind } from "./app/Ink";
import Spoken from "./Spoken";

// One reply, said out loud: a filler and a change of mind, struck in amber,
// and the clean version landing in the chat. "~" marks words Chirp drops.
const ASK = { who: "Sanne Visser", initials: "SV", tint: "#e9b8a6", text: "is the launch still on tuesday?" };
const SAID = "~um, no, it moved to ~thursday, ~no ~wait, wednesday at three";
const MEANT = "No, it moved to Wednesday at 3.";
const WORDS = SAID.split(" ").length;

type Msg = { who: string; initials: string; tint: string; text: string };
const ME = { who: "Pieter de Bruijn", initials: "PB", tint: "#f0b723" };

export default function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([ASK]);
  const [ink, setInk] = useState<InkKind>("tick");
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<0 | 1>(0);
  const [cardOn, setCardOn] = useState(false);
  const [typed, setTyped] = useState<number | null>(null);

  useEffect(() => {
    let timers: number[] = [];
    let running = false;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const play = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setMsgs([ASK]);
      setTyped(null);
      setShown(0);
      setPhase(0);
      setCardOn(false);
      setInk("tick");
      let t = 1000;
      at(t, () => {
        setInk("listening");
        setCardOn(true);
      });
      for (let k = 1; k <= WORDS; k++) at(t + 200 + k * 260, () => setShown(k));
      t += 200 + WORDS * 260 + 700;
      at(t, () => {
        setInk("working");
        setPhase(1);
      });
      t += 2600;
      at(t, () => {
        setInk("tick");
        setTyped(Date.now());
      });
      t += MEANT.length * 22 + 1200;
      at(t, () => {
        setTyped(null);
        setMsgs([ASK, { ...ME, text: MEANT }]);
      });
      t += 3800;
      at(t, () => setCardOn(false));
      at(t + 1200, play);
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
      { threshold: 0.35 },
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
      className="flex flex-col items-center overflow-hidden rounded-[28px] px-4 pt-6 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] md:px-10 md:pt-10"
      style={{ background: "linear-gradient(180deg, #edf0ef 0%, #f4ecda 60%, #f6d78f 100%)" }}
      aria-hidden
    >
      <Window title="# launch · Sitelift · Slack" className="w-full max-w-[640px]">
        <div className="flex flex-col gap-4 px-5 pb-5 pt-2 md:px-6">
          {msgs.map((m, i) => (
            <div key={i} className="flex gap-3" style={{ animation: "ink-content 240ms var(--ease) both" }}>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] text-[11px] font-semibold text-ink/80"
                style={{ background: m.tint }}
              >
                {m.initials}
              </span>
              <div className="min-w-0 font-[family-name:var(--font-ui)] text-[15px] leading-[1.45]">
                <p className="font-semibold text-ink">{m.who}</p>
                <p className="text-[#3d3c39]">{m.text}</p>
              </div>
            </div>
          ))}
          <div className="rounded-[12px] bg-[#f6f5f1] px-4 py-3 font-[family-name:var(--font-ui)] text-[15px] leading-[1.45] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
            <span className="text-ink">
              {typed !== null && <Typed key={typed} text={MEANT} />}
              <span className="caret ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[3px] bg-ink" />
              {typed === null && <span className="text-faint">Message #launch</span>}
            </span>
          </div>
        </div>
      </Window>

      {/* What you actually said */}
      <div
        className="mt-6 w-full max-w-[640px] rounded-[20px] bg-[#1a1917] px-6 py-5 transition-[opacity,transform] duration-300 md:px-8 md:py-6"
        style={{ opacity: cardOn ? 1 : 0, transform: cardOn ? "none" : "translateY(8px)", transitionTimingFunction: "var(--ease)" }}
      >
        <p className="font-[family-name:var(--font-ui)] text-[13px] text-[#a3a29e]">What you said</p>
        <Spoken
          said={SAID}
          shown={shown}
          phase={phase}
          className="mt-2 min-h-[2.5em] font-serif text-[22px] leading-[1.35] text-white md:text-[28px]"
        />
      </div>

      {/* The pill, where it lives: just above the taskbar */}
      <div className="mt-6 flex h-9 items-end justify-center">
        <Ink kind={ink} />
      </div>
      <Taskbar />
    </div>
  );
}

function Taskbar() {
  return (
    <div className="-mx-4 mt-4 flex h-12 w-[calc(100%+2rem)] items-center justify-center gap-4 bg-white/75 text-[#4a4945] backdrop-blur-md md:-mx-10 md:w-[calc(100%+5rem)]">
      <svg viewBox="0 0 16 16" className="h-[18px] w-[18px] text-[#2a6fdb]" fill="currentColor">
        <path d="M0 2.2 6.5 1.3v6.2H0zM7.3 1.2 16 0v7.5H7.3zM0 8.3h6.5v6.3L0 13.7zM7.3 8.3H16V16l-8.7-1.2z" />
      </svg>
      {/* File Explorer, a browser, and the chat app being typed into */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17" />
      </svg>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-[8px] bg-black/[0.06]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-8l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
        </svg>
        <span className="absolute -bottom-0.5 h-[3px] w-3 rounded-full bg-[#2a6fdb]" />
      </span>
    </div>
  );
}

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 22);
    return () => clearInterval(id);
  }, [text]);
  return <>{text.slice(0, n)}</>;
}
