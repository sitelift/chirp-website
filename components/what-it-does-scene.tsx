"use client";

import { useEffect, useRef, useState } from "react";
import { HotkeyTrio } from "./hotkey-trio";
import { ListeningCanvas } from "./listening-canvas";
import { TextTransformer, type TransformToken } from "./text-transformer";

// "What it does" — single-beat sequential cascade. One thing on the
// screen at a time, large. Auto-advances on a fixed timeline that
// loops while the section is in view; pauses when scrolled away.
//
// Three beats:
//   1. PRESS    — giant Ctrl+Shift+Space kbd trio with amber halo
//   2. LISTEN   — large overlay pill listening + raw transcript
//                 typing in beneath it, mono, white/45
//   3. CLEAN    — the SAME raw text from beat 2 transforming in
//                 place: fillers shrink and disappear, spoken
//                 punctuation morphs to symbols, lowercase
//                 capitalizes, "three pm" becomes "3 PM". Each
//                 change briefly glows amber on landing, then
//                 settles to white as the polished sentence holds.
//
// Beats 2 and 3 share the same on-screen layout — the pill fades out
// at the boundary while the text persists, so the transformation
// reads as continuous from the same dictation.

// Raw transcript: lowercase, fillers ("um"), spoken punctuation
// rendered as words ("period", "question mark"), spelled-out time
// ("three pm"). Mirrors what Parakeet actually outputs without
// cleanup applied.
const TOKENS: TransformToken[] = [
  { raw: "um ",       clean: "",         type: "delete",  delay: 0.0 },
  { raw: "send ",     clean: "Send ",    type: "replace", delay: 0.15, highlight: true },
  { raw: "john ",     clean: "John ",    type: "replace", delay: 0.32, highlight: true },
  { raw: "the doc ",  clean: "the doc ", type: "keep",    delay: 0 },
  { raw: "by ",       clean: "by ",      type: "keep",    delay: 0 },
  { raw: "friday ",   clean: "Friday ",  type: "replace", delay: 0.32, highlight: true },
  { raw: "at ",       clean: "at ",      type: "keep",    delay: 0 },
  { raw: "three pm",  clean: "3 PM",     type: "replace", delay: 0.50, highlight: true },
  { raw: " period",   clean: ".",        type: "replace", delay: 0.62, highlight: true },
];

// Phase timeline (ms). Sum = full cycle length.
const PHASES = [
  { name: "press",     duration: 2200 }, // beat 1
  { name: "listen",    duration: 4200 }, // beat 2: pill + typing
  { name: "settle",    duration: 700 },  // pill fades, raw text holds
  { name: "transform", duration: 2400 }, // beat 3 begins: morph
  { name: "highlight", duration: 1100 }, // amber holds on changes
  { name: "fade",      duration: 700 },  // amber → white
  { name: "rest",      duration: 1500 }, // clean text holds
] as const;

type PhaseName = typeof PHASES[number]["name"];
const TOTAL = PHASES.reduce((s, p) => s + p.duration, 0);

// Cumulative end time of each phase, for progress-bar math.
const PHASE_END: Record<PhaseName, number> = (() => {
  let cursor = 0;
  const out = {} as Record<PhaseName, number>;
  for (const p of PHASES) {
    cursor += p.duration;
    out[p.name] = cursor;
  }
  return out;
})();

function getPhase(t: number) {
  let cursor = 0;
  for (const p of PHASES) {
    if (t < cursor + p.duration) {
      return { name: p.name, t: t - cursor, duration: p.duration };
    }
    cursor += p.duration;
  }
  const last = PHASES[PHASES.length - 1];
  return { name: last.name, t: last.duration, duration: last.duration };
}

// Beat boundaries for the three progress bars. Beat 1 = "press".
// Beat 2 = "listen" + "settle". Beat 3 = the rest.
const BEAT_2_START = PHASE_END.press;
const BEAT_3_START = PHASE_END.settle;

export function WhatItDoesScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [now, setNow] = useState(0);

  // Pause when out of viewport so the cycle isn't burning frames in
  // the background.
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation tick. 30ms = ~33fps, smooth enough for typewriter +
  // crossfade without burning CPU.
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const interval = setInterval(() => {
      setNow((performance.now() - start) % TOTAL);
    }, 30);
    return () => clearInterval(interval);
  }, [active]);

  const phase = getPhase(now);

  // ── Decide what's on stage ─────────────────────────────────────
  const showKeyboard = phase.name === "press";
  const showPillText = !showKeyboard;

  // Pill visibility within the pill+text scene.
  const pillOpacity =
    phase.name === "listen"
      ? 1
      : phase.name === "settle"
        ? 1 - phase.t / phase.duration
        : 0;

  // Text show-state.
  let textState: "raw" | "typing" | "transforming" | "highlighted" | "clean" =
    "raw";
  let textProgress = 0;
  let highlightOpacity = 1;
  let textColor = "rgba(255,255,255,0.45)";

  if (phase.name === "listen") {
    textState = "typing";
    // Type over first 2900ms of the listen phase, hold the rest.
    textProgress = clamp01(phase.t / 2900);
    textColor = "rgba(255,255,255,0.45)";
  } else if (phase.name === "settle") {
    textState = "raw";
    textColor = "rgba(255,255,255,0.45)";
  } else if (phase.name === "transform") {
    textState = "transforming";
    textProgress = phase.t / phase.duration;
    // Color drifts from white/45 to white/100 across the morph so the
    // polished tokens land at full brightness even before the amber
    // highlight phase kicks in.
    const c = 0.45 + 0.55 * textProgress;
    textColor = `rgba(255,255,255,${c})`;
  } else if (phase.name === "highlight") {
    textState = "highlighted";
    highlightOpacity = 1;
    textColor = "rgba(255,255,255,1)";
  } else if (phase.name === "fade") {
    textState = "highlighted";
    highlightOpacity = 1 - phase.t / phase.duration;
    textColor = "rgba(255,255,255,1)";
  } else if (phase.name === "rest") {
    textState = "clean";
    textColor = "rgba(255,255,255,1)";
  }

  // ── Progress bar fills ─────────────────────────────────────────
  const beat1Fill = clamp01(now / BEAT_2_START);
  const beat2Fill = clamp01(
    (now - BEAT_2_START) / (BEAT_3_START - BEAT_2_START),
  );
  const beat3Fill = clamp01((now - BEAT_3_START) / (TOTAL - BEAT_3_START));

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Stage — content sits centered within a fixed-height area so
          beats don't shift the section's overall vertical rhythm. */}
      <div className="relative flex h-[60vh] w-full max-w-[1080px] items-center justify-center">
        {/* Beat 1: keyboard. Scaled responsively — the trio's natural
            width is ~270px so on mobile we need to stay below the
            375px viewport. Internals stay token-locked. */}
        <div
          className="absolute scale-[1.4] transition-opacity duration-[600ms] ease-out sm:scale-[1.8] md:scale-[2.4] lg:scale-[2.8]"
          style={{
            opacity: showKeyboard ? 1 : 0,
            pointerEvents: showKeyboard ? "auto" : "none",
          }}
        >
          <HotkeyTrio />
        </div>

        {/* Beats 2-3: pill + text on the same stage. */}
        <div
          className="absolute flex w-full flex-col items-center gap-14 transition-opacity duration-[600ms] ease-out md:gap-20"
          style={{
            opacity: showPillText ? 1 : 0,
            pointerEvents: showPillText ? "auto" : "none",
          }}
        >
          <div
            className="scale-[1.4] sm:scale-[1.7] md:scale-[2.2] lg:scale-[2.6]"
            style={{
              opacity: pillOpacity,
              transition: "opacity 500ms ease-out",
            }}
          >
            <ListeningCanvas />
          </div>

          <p
            className="text-center font-mono leading-[1.45] tracking-tight"
            style={{
              fontSize: "clamp(20px, 2.6vw, 36px)",
              maxWidth: "26ch",
              color: textColor,
              transition: "color 200ms linear",
            }}
          >
            <TextTransformer
              tokens={TOKENS}
              showState={textState}
              progress={textProgress}
              highlightOpacity={highlightOpacity}
            />
          </p>
        </div>
      </div>

      {/* Progress bars — three thin amber-fillable lines at the bottom.
          The active beat's bar fills literally over its own duration,
          so the bar is both progress + position indicator. */}
      <div className="absolute bottom-12 flex items-center gap-4 md:bottom-16">
        <ProgressBar fill={beat1Fill} />
        <ProgressBar fill={beat2Fill} />
        <ProgressBar fill={beat3Fill} />
      </div>
    </section>
  );
}

function ProgressBar({ fill }: { fill: number }) {
  return (
    <div className="relative h-[2px] w-12 overflow-hidden rounded-full bg-white/12">
      <div
        className="absolute inset-y-0 left-0 bg-chirp-amber-400"
        style={{
          width: `${fill * 100}%`,
          transition: "width 60ms linear",
        }}
      />
    </div>
  );
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}
