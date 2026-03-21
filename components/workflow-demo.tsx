"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirdMark } from "./bird-mark";

type Phase = "idle" | "hotkey" | "listening" | "processing" | "done" | "typing" | "pause";

const TYPED_TEXT = "I think we should move the standup to Thursday mornings, that way everyone on the west coast can join without it being too early.";

// Deterministic waveform heights (16 bars, 4 keyframes each)
const waveformKeyframes = [
  [3, 18, 8, 14], [3, 12, 20, 6], [3, 22, 10, 18], [3, 8, 16, 22],
  [3, 16, 6, 12], [3, 20, 14, 8], [3, 10, 22, 16], [3, 14, 8, 20],
  [3, 18, 12, 6], [3, 6, 18, 14], [3, 22, 8, 10], [3, 12, 16, 22],
  [3, 8, 20, 12], [3, 16, 10, 18], [3, 20, 6, 14], [3, 14, 22, 8],
];

const springEasing = [0.16, 1, 0.3, 1] as const;

function OverlayPill({ phase }: { phase: Phase }) {
  const isActive = phase === "listening" || phase === "processing" || phase === "done";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <motion.div
        animate={{
          height: isActive ? 44 : 36,
          paddingLeft: isActive ? 16 : 10,
          paddingRight: isActive ? 16 : 10,
          gap: isActive ? 12 : 8,
          boxShadow: isActive
            ? "0 2px 16px rgba(245,158,11,0.08), 0 0 0 3px rgba(245,158,11,0.05)"
            : "0 1px 4px rgba(0,0,0,0.05)",
        }}
        transition={{ duration: 0.3, ease: springEasing }}
        className="flex items-center rounded-full bg-white/90 backdrop-blur-xl border border-chirp-amber-200/30"
      >
        <BirdMark
          size={isActive ? 24 : 18}
          color={isActive ? "#F59E0B" : "#A8A29E"}
        />

        <AnimatePresence mode="wait">
          {phase === "listening" && (
            <motion.div
              key="waveform"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-[1.5px] h-4 overflow-hidden"
            >
              {waveformKeyframes.map((heights, i) => (
                <motion.div
                  key={i}
                  className="w-[2px] rounded-full bg-chirp-amber-400"
                  animate={{ height: heights }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut",
                    delay: i * 0.04,
                  }}
                />
              ))}
            </motion.div>
          )}

          {phase === "processing" && (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="h-3.5 w-3.5 rounded-full border-[1.5px] border-chirp-amber-200/40 border-t-chirp-amber-500 animate-spin" />
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-[11px] font-body font-medium text-chirp-stone-600 whitespace-nowrap">
                24 words
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function WorkflowDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    const sequence = [
      { phase: "idle" as Phase, duration: 1500 },
      { phase: "hotkey" as Phase, duration: 600 },
      { phase: "listening" as Phase, duration: 2500 },
      { phase: "processing" as Phase, duration: 1000 },
      { phase: "done" as Phase, duration: 800 },
      { phase: "typing" as Phase, duration: 3000 },
      { phase: "pause" as Phase, duration: 2500 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let charInterval: ReturnType<typeof setInterval>;
    let stepIndex = 0;

    function runStep() {
      const step = sequence[stepIndex % sequence.length];
      setPhase(step.phase);

      if (step.phase === "typing") {
        setTypedChars(0);
        let charCount = 0;
        charInterval = setInterval(() => {
          charCount++;
          setTypedChars(charCount);
          if (charCount >= TYPED_TEXT.length) {
            clearInterval(charInterval);
          }
        }, step.duration / TYPED_TEXT.length);
      }

      if (step.phase === "pause") {
        setTypedChars(0);
      }

      timeoutId = setTimeout(() => {
        stepIndex++;
        if (stepIndex >= sequence.length) {
          stepIndex = 0;
        }
        runStep();
      }, step.duration);
    }

    runStep();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(charInterval);
    };
  }, []);

  const showOverlay = phase === "listening" || phase === "processing" || phase === "done";
  const showText = phase === "typing" || phase === "pause";

  return (
    <div className="mx-auto w-full max-w-[800px]">
      <div className="relative">
        {/* Mock app window */}
        <div className="rounded-2xl border border-chirp-stone-200 bg-white shadow-elevated overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-chirp-stone-50 border-b border-chirp-stone-100">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-chirp-stone-200" />
              <div className="w-3 h-3 rounded-full bg-chirp-stone-200" />
              <div className="w-3 h-3 rounded-full bg-chirp-stone-200" />
            </div>
            <span className="ml-2 text-xs font-mono text-chirp-stone-400">notes.txt</span>
          </div>

          {/* Text area */}
          <div className="p-6 md:p-8 min-h-[160px] md:min-h-[200px]">
            <div className="font-body text-[16px] md:text-[17px] leading-[1.8] text-chirp-stone-800">
              {showText && TYPED_TEXT.slice(0, typedChars)}
              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear", repeatType: "reverse" }}
                className="inline-block w-[2px] h-[18px] bg-chirp-stone-800 ml-[1px] align-text-bottom"
              />
            </div>
          </div>
        </div>

        {/* Hotkey badge */}
        <AnimatePresence>
          {phase === "hotkey" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              {["Ctrl", "Shift", "Space"].map((key) => (
                <span
                  key={key}
                  className="px-2.5 py-1 rounded-lg bg-chirp-stone-800 text-white text-xs font-mono font-bold shadow-lg"
                >
                  {key}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chirp overlay pill */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <AnimatePresence>
            {showOverlay && <OverlayPill phase={phase} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
