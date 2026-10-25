import { useEffect, useRef } from "react";
import Bird from "../Bird";
import { IconCheck } from "./icons";

// The app's ink pill (sitelift/Chirp src/surface/Pill.tsx): the resting tick,
// the hover pill with the bird, and the dictation pills, as one object.

export type InkKind = "tick" | "hover" | "listening" | "handsfree" | "working" | "message";

const WORKING_OPACITY = [0.25, 0.25, 0.25, 0.45, 0.7, 1, 0.7, 0.45, 0.25, 0.25, 0.25];

/** 11 amber bars, 3 + level x 15 px. Without a mic, they follow a speech-like envelope. */
function Bars({ speaking }: { speaking: boolean }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const speakingRef = useRef(speaking);
  speakingRef.current = speaking;
  useEffect(() => {
    let raf = 0;
    const levels = new Array(11).fill(0);
    const frame = (ms: number) => {
      raf = requestAnimationFrame(frame);
      const t = ms / 1000;
      const env = speakingRef.current
        ? 0.25 + 0.75 * Math.abs(Math.sin(t * 7.3)) * (0.5 + 0.5 * Math.sin(t * 1.9 + 1))
        : 0.04;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const center = 1 - Math.abs(i - 5) / 6;
        const target = env * center * (0.55 + 0.45 * Math.sin(t * 17 + i * 2.1));
        // 80 ms smoothing, like the app.
        levels[i] += (Math.max(0, target) - levels[i]) * 0.2;
        el.style.height = `${Math.round(3 + Math.min(1, levels[i]) * 15)}px`;
      });
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span className="flex items-center gap-[3px]" aria-hidden>
      {Array.from({ length: 11 }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="h-[3px] w-[3px] shrink-0 rounded-[2px] bg-amber"
          style={{ opacity: i === 0 || i === 10 ? 0.5 : 1 }}
        />
      ))}
    </span>
  );
}

function Dots() {
  return (
    <span className="flex items-center gap-[3px]" aria-hidden>
      {WORKING_OPACITY.map((_, i) => (
        <span
          key={i}
          className="sweep h-[3px] w-[3px] shrink-0 rounded-[2px] bg-amber"
          style={{ animationDelay: `${(i - 5) * (900 / 11) - 900}ms` }}
        />
      ))}
    </span>
  );
}

export function Ink({
  kind,
  speaking = true,
  text,
  check,
  scale = 1,
}: {
  kind: InkKind;
  speaking?: boolean;
  text?: string;
  check?: boolean;
  scale?: number;
}) {
  const dataKind = kind === "tick" || kind === "hover" ? kind : "pill";
  const width = kind === "listening" || kind === "working" ? 132 : undefined;
  return (
    <div style={{ transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: "50% 100%" }}>
      <div
        className="ink"
        data-kind={dataKind}
        style={{
          width,
          boxShadow: kind === "handsfree" ? "0 6px 20px #00000059, 0 0 0 2px #f0b723, 0 0 0 6px #f0b72338" : undefined,
        }}
      >
        <Bird
          className="bird absolute left-1/2 top-1/2 -ml-2.5 -mt-2.5 h-5 w-5 text-amber"
          data-on={kind === "hover" ? "" : undefined}
        />
        {kind === "listening" && (
          <div className="ink-content flex h-[36px] w-[132px] items-center justify-center">
            <Bars speaking={speaking} />
          </div>
        )}
        {kind === "handsfree" && (
          <div className="ink-content flex h-[36px] items-center gap-[12px] pl-[18px] pr-[6px]">
            <Bars speaking={speaking} />
            <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[12px] bg-[#FFFFFF1F]">
              <span className="h-[8px] w-[8px] rounded-[2px] bg-white" />
            </span>
          </div>
        )}
        {kind === "working" && (
          <div className="ink-content flex h-[36px] w-[132px] items-center justify-center">
            <Dots />
          </div>
        )}
        {kind === "message" && (
          <div className="ink-content flex h-[36px] items-center gap-[6px] whitespace-nowrap pl-[13px] pr-[16px] font-[family-name:var(--font-ui-display)] text-[13px] font-semibold text-white">
            {check && <IconCheck size={14} style={{ color: "#F0B723", strokeWidth: 2.6 }} />}
            {text}
          </div>
        )}
      </div>
    </div>
  );
}
