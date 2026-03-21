"use client";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { BirdMark } from "./bird-mark";
import { cn } from "@/lib/utils";

type PillPhase = "idle" | "listening" | "processing" | "done";
type DemoPhase =
  | "idle"
  | "hotkey"
  | "listen_type"
  | "process_highlight"
  | "process_clean"
  | "done"
  | "pause";

const RAW_TEXT =
  "Um, yeah so I think we should like, probably move the standup to Thursday mornings instead of Wednesdays, if that works for everyone. That way, uh, the team on the west coast can join without it being like, super early for them.";
const CLEAN_TEXT =
  "I think we should move the standup to Thursday mornings instead of Wednesdays. That way, the team on the west coast can join without it being too early.";

const waveformKeyframes = [
  [3, 18, 8, 14],
  [3, 12, 20, 6],
  [3, 22, 10, 18],
  [3, 8, 16, 22],
  [3, 16, 6, 12],
  [3, 20, 14, 8],
  [3, 10, 22, 16],
  [3, 14, 8, 20],
  [3, 18, 12, 6],
  [3, 6, 18, 14],
  [3, 22, 8, 10],
  [3, 12, 16, 22],
  [3, 8, 20, 12],
  [3, 16, 10, 18],
  [3, 20, 6, 14],
  [3, 14, 22, 8],
];

const springEasing = [0.16, 1, 0.3, 1] as const;

export type WorkflowDemoPlacement = "hero" | "inline";

export type WorkflowDemoProps = {
  placement?: WorkflowDemoPlacement;
  className?: string;
};

function OverlayPill({ phase }: { phase: PillPhase }) {
  const isActive =
    phase === "listening" || phase === "processing" || phase === "done";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-center justify-center pointer-events-none drop-shadow-2xl"
    >
      <motion.div
        animate={{
          height: isActive ? 48 : 40,
          paddingLeft: isActive ? 18 : 12,
          paddingRight: isActive ? 18 : 12,
          gap: isActive ? 14 : 10,
          boxShadow: isActive
            ? "0 4px 24px rgba(245,158,11,0.12), 0 0 0 1px rgba(245,158,11,0.1) inset, 0 8px 32px rgba(0,0,0,0.06)"
            : "0 4px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03) inset",
        }}
        transition={{ duration: 0.25, ease: springEasing }}
        className="flex items-center rounded-full border border-chirp-amber-200/50 bg-white/95 backdrop-blur-xl"
      >
        <BirdMark
          size={isActive ? 22 : 18}
          className={cn(
            "mr-2 transition-colors duration-200",
            isActive ? "text-chirp-amber-400" : "text-chirp-stone-400"
          )}
        />

        <AnimatePresence mode="popLayout">
          {phase === "listening" && (
            <motion.div
              key="waveform"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex h-4 items-center gap-[1.5px] overflow-hidden"
            >
              {waveformKeyframes.map((heights, i) => (
                <motion.div
                  key={i}
                  className="w-[2.5px] origin-center rounded-full bg-chirp-amber-400"
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-chirp-amber-200/40 border-t-chirp-amber-500" />
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span className="flex items-center gap-2 whitespace-nowrap font-mono text-[11px] font-medium tracking-wide text-chirp-stone-600">
                30 words
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function StaticDemoWindow() {
  return (
    <div className="relative max-w-full min-w-0 w-full overflow-hidden rounded-2xl border border-chirp-stone-200/80 bg-white shadow-lifted">
      <div className="relative flex items-center justify-center border-b border-chirp-stone-100 bg-chirp-stone-100 px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="absolute left-4 flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-chirp-stone-300 shadow-inner" />
          <div className="h-3 w-3 rounded-full bg-chirp-stone-300 shadow-inner" />
          <div className="h-3 w-3 rounded-full bg-chirp-stone-300 shadow-inner" />
        </div>
        <span className="text-xs font-medium tracking-wide text-chirp-stone-500">
          New Message
        </span>
      </div>
      <div className="flex flex-col gap-3 border-b border-chirp-stone-100 bg-white/50 px-4 py-3 sm:px-6 md:px-10">
        <div className="flex items-center text-[12px] sm:text-[13px] md:text-sm">
          <span className="w-14 shrink-0 font-medium text-chirp-stone-400">
            To:
          </span>
          <span className="rounded px-2 py-0.5 font-medium text-chirp-stone-800 bg-chirp-stone-100">
            Team
          </span>
        </div>
        <div className="flex items-start text-[12px] sm:text-[13px] md:text-sm">
          <span className="w-14 shrink-0 font-medium text-chirp-stone-400">
            Subject:
          </span>
          <span className="min-w-0 font-bold text-chirp-stone-800 break-words">
            Moving Thursday&apos;s standup
          </span>
        </div>
      </div>
      <div className="min-h-[200px] bg-white p-4 sm:p-6 md:min-h-[280px] md:p-10">
        <p className="text-base leading-relaxed text-chirp-stone-800 md:text-xl md:leading-[1.75]">
          {CLEAN_TEXT}
        </p>
      </div>
    </div>
  );
}

export function WorkflowDemo({
  placement = "hero",
  className,
}: WorkflowDemoProps) {
  const reduceMotion = useReducedMotion();
  const [demoPhase, setDemoPhase] = useState<DemoPhase>("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [heroPlaybackReady, setHeroPlaybackReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useLayoutEffect(() => {
    if (placement !== "hero" || reduceMotion) return;
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setHeroPlaybackReady(true);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [placement, reduceMotion]);

  const playbackEnabled =
    !reduceMotion &&
    (placement === "hero" ? heroPlaybackReady : isInView);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playbackEnabled) return;

    const sequence = [
      { phase: "idle" as DemoPhase, duration: 1200 },
      { phase: "hotkey" as DemoPhase, duration: 2000 },
      { phase: "listen_type" as DemoPhase, duration: 9350 },
      { phase: "process_highlight" as DemoPhase, duration: 4250 },
      { phase: "process_clean" as DemoPhase, duration: 2125 },
      { phase: "done" as DemoPhase, duration: 5100 },
      { phase: "pause" as DemoPhase, duration: 5100 },
    ];

    let stepIndex = 0;

    const clearCharInterval = () => {
      if (charIntervalRef.current) {
        clearInterval(charIntervalRef.current);
        charIntervalRef.current = null;
      }
    };

    const clearTimers = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      clearCharInterval();
    };

    function runStep() {
      clearCharInterval();
      const step = sequence[stepIndex % sequence.length];
      setDemoPhase(step.phase);

      if (step.phase === "listen_type") {
        setTypedChars(0);
        let charCount = 0;
        charIntervalRef.current = setInterval(() => {
          charCount++;
          setTypedChars(charCount);
          if (charCount >= RAW_TEXT.length) {
            clearCharInterval();
          }
        }, step.duration / RAW_TEXT.length);
      }

      if (step.phase === "pause" || step.phase === "idle") {
        setTypedChars(0);
      }

      timeoutRef.current = setTimeout(() => {
        stepIndex++;
        if (stepIndex >= sequence.length) {
          stepIndex = 0;
        }
        runStep();
      }, step.duration);
    }

    runStep();

    return () => {
      clearTimers();
    };
  }, [playbackEnabled]);

  if (reduceMotion) {
    return (
      <div className={cn("mx-auto w-full min-w-0 max-w-6xl", className)}>
        <StaticDemoWindow />
      </div>
    );
  }

  let pillPhase: PillPhase = "idle";
  if (demoPhase === "listen_type") pillPhase = "listening";
  if (demoPhase === "process_highlight" || demoPhase === "process_clean")
    pillPhase = "processing";
  if (demoPhase === "done") pillPhase = "done";

  const showOverlay = pillPhase !== "idle";
  const showRawText =
    demoPhase === "listen_type" || demoPhase === "process_highlight";
  const showCleanText =
    demoPhase === "process_clean" ||
    demoPhase === "done" ||
    demoPhase === "pause";

  const renderRawText = () => {
    const textToShow = RAW_TEXT.slice(0, typedChars);

    if (demoPhase !== "process_highlight") {
      return textToShow;
    }

    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="transition-all duration-500"
      >
        <span className="relative inline-block">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 -z-10 scale-105 rounded-md bg-red-100 -rotate-1"
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">
            Um
          </span>
        </span>
        {", "}
        <span className="relative inline-block">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute inset-0 -z-10 scale-105 rounded-md bg-red-100 rotate-1"
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">
            yeah so
          </span>
        </span>
        {" I think we should "}
        <span className="relative inline-block">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 -z-10 scale-105 rounded-md bg-red-100 -rotate-1"
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">
            like,
          </span>
        </span>
        {
          " probably move the standup to Thursday mornings instead of Wednesdays, if that works for everyone. That way, "
        }
        <span className="relative inline-block">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 -z-10 scale-105 rounded-md bg-red-100 rotate-1"
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">
            uh,
          </span>
        </span>
        {" the team on the west coast can join without it being "}
        <span className="relative inline-block">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute inset-0 -z-10 scale-105 rounded-md bg-red-100 -rotate-1"
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">
            like, super
          </span>
        </span>
        {" early for them."}
      </motion.span>
    );
  };

  return (
    <div className={cn("mx-auto w-full min-w-0 max-w-6xl", className)}>
      <div className="relative min-w-0">
        <div
          ref={containerRef}
          className="relative max-w-full min-w-0 overflow-hidden rounded-2xl border border-chirp-stone-200/80 bg-white shadow-lifted"
        >
          <div className="relative flex items-center justify-center border-b border-chirp-stone-100 bg-chirp-stone-100 px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="absolute left-4 flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-chirp-stone-300 shadow-inner" />
              <div className="h-3 w-3 rounded-full bg-chirp-stone-300 shadow-inner" />
              <div className="h-3 w-3 rounded-full bg-chirp-stone-300 shadow-inner" />
            </div>
            <span className="text-xs font-medium tracking-wide text-chirp-stone-500">
              New Message
            </span>
          </div>

          <div className="flex flex-col gap-3 border-b border-chirp-stone-100 bg-white/50 px-4 py-3 sm:px-6 md:px-10">
            <div className="flex items-center text-[12px] sm:text-[13px] md:text-sm">
              <span className="w-14 shrink-0 font-medium text-chirp-stone-400">
                To:
              </span>
              <span className="rounded-[4px] bg-chirp-stone-100 px-2 py-0.5 font-medium text-chirp-stone-800">
                Team
              </span>
            </div>
            <div className="flex items-start text-[12px] sm:text-[13px] md:text-sm">
              <span className="w-14 shrink-0 font-medium text-chirp-stone-400">
                Subject:
              </span>
              <span className="min-w-0 font-bold break-words text-chirp-stone-800">
                Moving Thursday&apos;s standup
              </span>
            </div>
          </div>

          <div className="relative min-h-[240px] bg-white p-4 sm:p-6 md:min-h-[380px] md:p-12 lg:min-h-[420px]">
            <div className="relative z-10 font-body text-base leading-[1.75] text-chirp-stone-800 sm:text-lg md:text-xl md:leading-[1.8]">
              <div className="grid grid-cols-1 grid-rows-1">
                <AnimatePresence>
                  {showRawText && (
                    <motion.div
                      key="rawText"
                      className="col-start-1 row-start-1"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {renderRawText()}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                          repeatType: "reverse",
                        }}
                        className="ml-[2px] inline-block h-[1.1em] w-[3px] translate-y-[0.1em] rounded-sm bg-chirp-stone-800 align-baseline"
                      />
                    </motion.div>
                  )}

                  {showCleanText && (
                    <motion.div
                      key="cleanText"
                      className="col-start-1 row-start-1"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {CLEAN_TEXT}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                          repeatType: "reverse",
                        }}
                        className="ml-[2px] inline-block h-[1.1em] w-[3px] translate-y-[0.1em] rounded-sm bg-chirp-stone-800 align-baseline"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center sm:bottom-6 md:bottom-8">
              <AnimatePresence mode="wait">
                {demoPhase === "hotkey" && (
                  <motion.div
                    key="keycaps"
                    initial={{ opacity: 0, scale: 0.94, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -8 }}
                    transition={{ duration: 0.25, ease: springEasing }}
                    className="flex flex-col items-center gap-3 drop-shadow-xl"
                  >
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                      {["Ctrl", "Shift", "Space"].map((key) => (
                        <span
                          key={key}
                          className="rounded-lg border border-chirp-stone-200/80 bg-white px-2.5 py-1.5 font-mono text-[10px] font-bold text-chirp-stone-700 shadow-[0_2px_0_rgba(0,0,0,0.05),0_8px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:px-3 sm:text-[11px]"
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {showOverlay && (
                  <motion.div
                    key="overlayPill"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <OverlayPill phase={pillPhase} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
