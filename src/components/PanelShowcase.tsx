import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Bird from "./Bird";
import { IconAdd, IconBack, IconCopy, IconNext, IconPause, IconRecent, IconSettings, IconSnippets, IconWords } from "./app/icons";

// The app's surface, replayed: the tick becomes the hover pill, the panel
// grows out of it (330 ms), and screens push like paper, edge to edge.

const WORDS = ["Sitelift", "Pieter de Bruijn", "Parakeet", "Keizersgracht", "Tauri", "sherpa-onnx"];
const SNIPPETS = [
  { trigger: "my address", expansion: "12 Keizersgracht, Amsterdam" },
  { trigger: "sig", expansion: "Best, Pieter" },
  { trigger: "standup", expansion: "Yesterday: / Today: / Blockers:" },
  { trigger: "zoom link", expansion: "https://zoom.us/j/4815162342" },
];

type View = "home" | "words" | "snippets";
type Stage = "tick" | "hover" | "open" | "closing";

export default function PanelShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const sheets = useRef<Record<View, HTMLDivElement | null>>({ home: null, words: null, snippets: null });
  const [stage, setStage] = useState<Stage>("tick");
  const [view, setView] = useState<View>("home");
  const [hl, setHl] = useState<string | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = sheets.current[view];
    if (el) setHeight(el.offsetHeight);
  }, [view, stage]);

  useEffect(() => {
    let timers: number[] = [];
    let running = false;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const loop = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setStage("tick");
      setView("home");
      setHl(null);
      at(700, () => setStage("hover"));
      at(1300, () => setStage("open"));
      at(2600, () => setHl("words"));
      at(3000, () => {
        setHl(null);
        setView("words");
      });
      at(5800, () => setView("home"));
      at(6600, () => setHl("snippets"));
      at(7000, () => {
        setHl(null);
        setView("snippets");
      });
      at(9800, () => setView("home"));
      at(10800, () => setStage("closing"));
      at(11100, () => setStage("tick"));
      at(12000, loop);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          loop();
        } else if (!e.isIntersecting && running) {
          running = false;
          timers.forEach(clearTimeout);
          timers = [];
        }
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const open = stage === "open";
  const pillish = stage === "hover" || stage === "closing";
  const width = open ? 320 : pillish ? 56 : 28;
  const h = open ? height : pillish ? 36 : 5;
  const pos = (v: View) => (v === "home" ? (view === "home" ? 0 : -100) : view === v ? 0 : 100);

  return (
    <div ref={ref} className="relative flex h-[560px] items-end justify-center pb-10" aria-hidden>
      <div className="origin-bottom lg:scale-[1.3]">
      <div
        className="relative overflow-hidden"
        style={{
          width,
          height: h,
          borderRadius: stage === "tick" ? 3 : 18,
          background: "#1a1917",
          opacity: stage === "tick" ? 0.7 : 1,
          boxShadow: open
            ? "inset 0 0 0 1px #ffffff1a, 0 12px 32px #00000080"
            : stage === "tick"
              ? "0 0 0 1px #ffffff24"
              : "0 6px 20px #00000073, 0 0 0 1px #ffffff1f",
          transition: open
            ? "width 330ms var(--ease), height 330ms var(--ease), border-radius 330ms var(--ease)"
            : stage === "closing"
              ? "width 300ms var(--ease-close), height 300ms var(--ease-close), opacity 120ms linear"
              : "width 160ms var(--ease), height 160ms var(--ease), border-radius 160ms var(--ease), opacity 120ms linear",
        }}
      >
        {/* The bird on the hover pill */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Bird className="bird h-5 w-5 text-amber" data-on={stage === "hover" ? "" : undefined} />
        </div>

        {/* Sheets of paper */}
        <div
          className="absolute left-0 top-0 h-full w-[320px]"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "none" : "translateY(8px)",
            transition: open ? "opacity 242ms linear 60ms, transform 242ms var(--ease) 60ms" : "opacity 70ms linear",
          }}
        >
          <Sheet x={pos("home")} refFn={(el) => (sheets.current.home = el)}>
            <div className="last">
              <b>Can we move the review to Thursday afternoon? Tuesday is packed.</b>
              <span>
                <span>2 minutes ago</span>
                <IconCopy size={14} />
              </span>
            </div>
            <Row icon={<IconRecent />} label="Recent" />
            <Row icon={<IconWords />} label="Words" value={WORDS.length} hl={hl === "words"} />
            <Row icon={<IconSnippets />} label="Snippets" value={SNIPPETS.length} hl={hl === "snippets"} />
            <div className="divider">
              <i />
            </div>
            <div className="flex h-10 items-center justify-between text-[13px]">
              <span className="flex items-center gap-2.5 px-3">
                <IconPause className="text-[var(--t2)]" />
                Pause
              </span>
              <span className="flex items-center gap-2.5 px-3">
                <IconSettings className="text-[var(--t2)]" />
                Settings
              </span>
            </div>
          </Sheet>

          <Sheet x={pos("words")} detail refFn={(el) => (sheets.current.words = el)}>
            <Head title="Words" />
            <div className="field justify-between">
              Add a name or word
              <IconAdd size={16} className="text-[var(--t2)]" />
            </div>
            {WORDS.map((w) => (
              <div key={w} className="row !h-9">
                {w}
              </div>
            ))}
            <div className="hint">Chirp spells these exactly as written.</div>
          </Sheet>

          <Sheet x={pos("snippets")} detail refFn={(el) => (sheets.current.snippets = el)}>
            <Head title="Snippets" />
            <div className="field !h-auto flex-col !items-stretch !px-0">
              <span className="px-3 py-2.5">When I say</span>
              <i className="mx-3 block h-px bg-[var(--divider)]" />
              <span className="px-3 py-2.5">Type this</span>
            </div>
            {SNIPPETS.map((s) => (
              <div key={s.trigger} className="row !h-[50px] flex-col !items-start !justify-center">
                <span>{s.trigger}</span>
                <small className="max-w-full truncate text-[12px] text-[var(--t3)]">{s.expansion}</small>
              </div>
            ))}
            <div className="hint">Say the phrase and Chirp types the rest.</div>
          </Sheet>
        </div>
      </div>
      </div>
    </div>
  );
}

function Sheet({ x, detail, refFn, children }: { x: number; detail?: boolean; refFn: (el: HTMLDivElement | null) => void; children: ReactNode }) {
  return (
    <div
      ref={refFn}
      className="panel absolute left-0 top-0 !shadow-none"
      style={{
        transform: `translateX(${x}%)`,
        transition: "transform 330ms var(--ease)",
        boxShadow: detail && x < 100 ? "-12px 0 20px -12px #00000080" : undefined,
      }}
    >
      {children}
    </div>
  );
}

function Row({ icon, label, value, hl }: { icon: ReactNode; label: string; value?: number; hl?: boolean }) {
  return (
    <div className={`row ${hl ? "hl" : ""}`} style={{ transition: "background-color 100ms" }}>
      <span className="lead">
        {icon}
        {label}
      </span>
      <span className="val">
        {value !== undefined && <span>{value}</span>}
        <IconNext className="text-[var(--chev)]" />
      </span>
    </div>
  );
}

function Head({ title }: { title: string }) {
  return (
    <div className="head">
      <span className="back">
        <IconBack />
      </span>
      <span className="title">{title}</span>
    </div>
  );
}
