import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconAdd, IconBack } from "./app/icons";

// The app's own panels in its light theme (sitelift/Chirp docs/v2/design/SPEC.md):
// card radius 18 with 6 px padding, rows 12, 13 px Segoe UI.

function usePlaying(ref: React.RefObject<HTMLElement | null>, play: () => () => void) {
  useEffect(() => {
    let stop: (() => void) | null = null;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !stop) stop = play();
      else if (!e.isIntersecting && stop) {
        stop();
        stop = null;
      }
    });
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[18px] bg-white p-[6px] font-[family-name:var(--font-ui)] text-[13px] leading-[18px] text-[#1a1a1a] shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_8px_24px_-12px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

function Head({ title }: { title: string }) {
  return (
    <div className="flex h-10 items-center gap-1">
      <span className="ml-1 flex h-8 w-8 items-center justify-center rounded-[8px]">
        <IconBack />
      </span>
      <span className="font-[family-name:var(--font-ui-display)] text-[15px] font-semibold">{title}</span>
    </div>
  );
}

const WORDS = ["Keizersgracht", "Sitelift", "Pieter de Bruijn"];

export function WordsPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [struck, setStruck] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          window.setTimeout(() => setStruck(true), 500);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex w-full max-w-[420px] flex-col gap-4">
      <Panel className="w-full">
        <Head title="Words" />
        <div className="mb-1.5 mt-0.5 flex h-10 items-center justify-between rounded-[12px] px-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]">
          <span className="text-[#8a8a8a]">Add a name or word</span>
          <IconAdd size={16} className="text-[#6b6b6b]" />
        </div>
        {WORDS.map((w, i) => (
          <div key={w} className={`flex h-10 items-center rounded-[12px] px-3 ${i === 0 ? "bg-[#fbf4e2] text-[#8f6400]" : ""}`}>
            {w}
          </div>
        ))}
      </Panel>

      {/* The proof: the same sentence without and with the saved spelling */}
      <div className="rounded-[20px] bg-white px-6 py-6 font-[family-name:var(--font-ui)] shadow-[0_0_0_1px_rgba(0,0,0,0.08)] md:px-7">
        <p className="text-[13px] text-muted">Without Words</p>
        <p className="mt-1 text-[20px] leading-snug text-muted md:text-[21px]">
          Meet me at 12{" "}
          <span className="relative inline-block">
            Kaiser's Gracht
            <span
              className="absolute -inset-x-0.5 top-[55%] h-[3px] rounded-full bg-amber transition-transform duration-[380ms]"
              style={{ transform: `translateY(-50%) scaleX(${struck ? 1 : 0})`, transformOrigin: "left", transitionTimingFunction: "var(--ease)" }}
            />
          </span>
          .
        </p>
        <p className="mt-4 text-[13px] text-muted">With Words</p>
        <p className="mt-1 text-[20px] leading-snug text-ink md:text-[21px]">
          Meet me at 12 <span className="rounded-[6px] bg-[#fbf4e2] px-1 text-[#8f6400]">Keizersgracht</span>.
        </p>
      </div>
    </div>
  );
}

const PROVIDERS = [
  { id: "Off", model: "No cleanup", note: "Your dictation stays on this PC." },
  { id: "Anthropic", model: "Claude Haiku 5.5", note: "Your dictation is sent to Anthropic to be cleaned up." },
  { id: "OpenAI", model: "GPT-6 Luna", note: "Your dictation is sent to OpenAI to be cleaned up." },
];

export function AiPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(1);

  usePlaying(ref, () => {
    const id = window.setInterval(() => setI((v) => (v + 1) % PROVIDERS.length), 2600);
    return () => clearInterval(id);
  });

  const p = PROVIDERS[i];
  return (
    <div ref={ref}>
      <Panel className="w-full max-w-[360px] p-5">
        <p className="font-[family-name:var(--font-ui-display)] text-[15px] font-semibold">AI cleanup</p>
        <p className="mt-1 text-[#6b6b6b]">Removes filler words, fixes punctuation and formats text for the app you're in.</p>
        <div className="mt-4 flex items-center justify-between">
          <span>Provider</span>
          <span className="relative flex rounded-[8px] bg-[#efefef] p-[2px]">
            <span
              className="absolute bottom-[2px] top-[2px] w-[78px] rounded-[6px] bg-white shadow-[0_1px_2px_#0000001f,0_0_0_1px_#00000010] transition-transform duration-[240ms]"
              style={{ transform: `translateX(${i * 78}px)`, transitionTimingFunction: "var(--ease)" }}
            />
            {PROVIDERS.map((x) => (
              <span key={x.id} className="relative z-10 flex h-7 w-[78px] items-center justify-center text-[12px]">
                {x.id}
              </span>
            ))}
          </span>
        </div>
        <p className="mt-1.5 text-right text-[12px] text-[#8a8a8a]">{p.model}</p>
        <div className="mt-3 h-10 transition-opacity duration-[260ms]" style={{ opacity: i ? 1 : 0 }}>
          <div className="flex gap-2">
            <span className="flex h-10 min-w-0 flex-1 items-center justify-between gap-2 rounded-[12px] px-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]">
              <span className="truncate font-mono text-[12px]">{i === 2 ? "sk-••••••••••7f2c" : "sk-ant-••••••••••abcd"}</span>
              <span className="text-[12px] text-[#2fa84f]">Connected</span>
            </span>
            <span className="flex h-10 items-center rounded-[12px] px-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]">Remove</span>
          </div>
        </div>
        <p className="mt-3 text-[12px] text-[#8a8a8a]">{p.note}</p>
      </Panel>
    </div>
  );
}
