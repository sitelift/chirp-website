"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { BirdMark } from "./bird-mark";

type PillPhase = "idle" | "listening" | "processing" | "done";
type DemoPhase = "idle" | "hotkey" | "listen_type" | "process_highlight" | "process_clean" | "done" | "pause";

const RAW_TEXT = "Um, yeah so I think we should like, probably move the standup to Thursday mornings instead of Wednesdays, if that works for everyone. That way, uh, the team on the west coast can join without it being like, super early for them.";
const CLEAN_TEXT = "I think we should move the standup to Thursday mornings instead of Wednesdays. That way, the team on the west coast can join without it being too early.";

// Deterministic waveform heights (16 bars, 4 keyframes each)
const waveformKeyframes = [
  [3, 18, 8, 14], [3, 12, 20, 6], [3, 22, 10, 18], [3, 8, 16, 22],
  [3, 16, 6, 12], [3, 20, 14, 8], [3, 10, 22, 16], [3, 14, 8, 20],
  [3, 18, 12, 6], [3, 6, 18, 14], [3, 22, 8, 10], [3, 12, 16, 22],
  [3, 8, 20, 12], [3, 16, 10, 18], [3, 20, 6, 14], [3, 14, 22, 8],
];

const springEasing = [0.16, 1, 0.3, 1] as const;

function OverlayPill({ phase }: { phase: PillPhase }) {
  const isActive = phase === "listening" || phase === "processing" || phase === "done";

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
        transition={{ duration: 0.3, ease: springEasing }}
        className="flex items-center rounded-full bg-white/95 backdrop-blur-xl border border-chirp-amber-200/50"
      >
        {/* Increased margin-right on BirdMark as requested */}
        <BirdMark
          size={isActive ? 20 : 16}
          className={`transition-colors duration-300 mr-2 ${isActive ? "text-chirp-amber-400" : "text-chirp-stone-400"}`}
        />

        <AnimatePresence mode="popLayout">
          {phase === "listening" && (
            <motion.div
              layout
              key="waveform"
              initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(4px)", y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-[1.5px] h-4 overflow-hidden"
            >
              {waveformKeyframes.map((heights, i) => (
                <motion.div
                  key={i}
                  className="w-[2.5px] rounded-full bg-chirp-amber-400 origin-center"
                  animate={{ height: heights }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: i * 0.04 }}
                />
              ))}
            </motion.div>
          )}

          {phase === "processing" && (
            <motion.div
              layout
              key="spinner"
              initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(4px)", y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <div className="h-3.5 w-3.5 rounded-full border-[1.5px] border-chirp-amber-200/40 border-t-chirp-amber-500 animate-spin" />
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              layout
              key="done"
              initial={{ opacity: 0, filter: "blur(4px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(4px)", y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="font-mono text-[11px] font-medium tracking-wide text-chirp-stone-600 flex items-center gap-2 whitespace-nowrap">
                30 words
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function WorkflowDemo() {
  const [demoPhase, setDemoPhase] = useState<DemoPhase>("idle");
  const [typedChars, setTypedChars] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 }); // Only trigger once it becomes 50% visible

  useEffect(() => {
    if (!isInView) return;

    const sequence = [
      { phase: "idle" as DemoPhase, duration: 3400 },
      { phase: "hotkey" as DemoPhase, duration: 2125 },
      { phase: "listen_type" as DemoPhase, duration: 9350 },
      { phase: "process_highlight" as DemoPhase, duration: 4250 },
      { phase: "process_clean" as DemoPhase, duration: 2125 },
      { phase: "done" as DemoPhase, duration: 5100 },
      { phase: "pause" as DemoPhase, duration: 5100 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let charInterval: ReturnType<typeof setInterval>;
    let stepIndex = 0;

    function runStep() {
      const step = sequence[stepIndex % sequence.length];
      setDemoPhase(step.phase);

      if (step.phase === "listen_type") {
        setTypedChars(0);
        let charCount = 0;
        charInterval = setInterval(() => {
          charCount++;
          setTypedChars(charCount);
          if (charCount >= RAW_TEXT.length) {
            clearInterval(charInterval);
          }
        }, step.duration / RAW_TEXT.length);
      }

      if (step.phase === "pause" || step.phase === "idle") {
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
  }, [isInView]);

  let pillPhase: PillPhase = "idle";
  if (demoPhase === "listen_type") pillPhase = "listening";
  if (demoPhase === "process_highlight" || demoPhase === "process_clean") pillPhase = "processing";
  if (demoPhase === "done") pillPhase = "done";

  const showOverlay = pillPhase !== "idle";
  const showRawText = demoPhase === "listen_type" || demoPhase === "process_highlight";
  const showCleanText = demoPhase === "process_clean" || demoPhase === "done" || demoPhase === "pause";

  const renderRawText = () => {
    const textToShow = RAW_TEXT.slice(0, typedChars);
    
    if (demoPhase !== "process_highlight") {
      return textToShow;
    }

    return (
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="transition-all duration-500">
        <span className="relative inline-block">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
            className="absolute inset-0 bg-red-100 rounded-md -rotate-1 scale-105 -z-10" 
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">Um</span>
        </span>
        {", "}
        <span className="relative inline-block">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="absolute inset-0 bg-red-100 rounded-md rotate-1 scale-105 -z-10" 
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">yeah so</span>
        </span>
        {" I think we should "}
        <span className="relative inline-block">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="absolute inset-0 bg-red-100 rounded-md -rotate-1 scale-105 -z-10" 
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">like,</span>
        </span>
        {" probably move the standup to Thursday mornings instead of Wednesdays, if that works for everyone. That way, "}
        <span className="relative inline-block">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="absolute inset-0 bg-red-100 rounded-md rotate-1 scale-105 -z-10" 
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">uh,</span>
        </span>
        {" the team on the west coast can join without it being "}
        <span className="relative inline-block">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="absolute inset-0 bg-red-100 rounded-md -rotate-1 scale-105 -z-10" 
          />
          <span className="text-red-500 line-through decoration-red-300 decoration-2">like, super</span>
        </span>
        {" early for them."}
      </motion.span>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <div className="relative">
        {/* Mock app window - Clean light theme */}
        <div ref={containerRef} className="relative rounded-2xl border border-chirp-stone-200/80 bg-white shadow-lifted overflow-hidden">
          
          {/* Title bar */}
          <div className="relative flex items-center justify-center px-4 py-3 bg-gradient-to-b from-chirp-stone-50/80 to-chirp-stone-50 border-b border-chirp-stone-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="absolute left-4 flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-chirp-stone-300 shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-chirp-stone-300 shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-chirp-stone-300 shadow-inner" />
            </div>
            <span className="text-xs font-body font-medium text-chirp-stone-500 tracking-wide">New Message</span>
          </div>

          {/* Email Headers */}
          <div className="px-6 md:px-10 py-4 border-b border-chirp-stone-100 bg-white/50 flex flex-col gap-3">
            <div className="flex items-center text-[13px] md:text-sm">
              <span className="font-medium text-chirp-stone-400 w-16">To:</span>
              <span className="font-medium text-chirp-stone-800 bg-chirp-stone-100 px-2.5 py-0.5 rounded-[4px]">Team</span>
            </div>
            <div className="flex items-center text-[13px] md:text-sm">
              <span className="font-medium text-chirp-stone-400 w-16">Subject:</span>
              <span className="font-bold text-chirp-stone-800">Moving Thursday's standup</span>
            </div>
          </div>

          {/* Text area */}
          <div className="relative p-8 md:p-14 min-h-[280px] md:min-h-[360px] bg-white">
            <div className="font-body text-[18px] md:text-[24px] leading-[1.8] md:leading-[1.8] text-chirp-stone-800 relative z-10">
              <div className="grid grid-cols-1 grid-rows-1">
                <AnimatePresence>
                  {showRawText && (
                    <motion.div 
                      key="rawText"
                      className="col-start-1 row-start-1"
                      initial={{ opacity: 0, filter: "blur(4px)" }} 
                      animate={{ opacity: 1, filter: "blur(0px)" }} 
                      exit={{ opacity: 0, filter: "blur(8px)", scale: 0.99 }} 
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {renderRawText()}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear", repeatType: "reverse" }}
                        className="inline-block w-[3px] h-[22px] md:h-[26px] bg-chirp-stone-800 ml-[2px] rounded-sm align-text-bottom"
                      />
                    </motion.div>
                  )}
                  
                  {showCleanText && (
                    <motion.div 
                      key="cleanText"
                      className="col-start-1 row-start-1"
                      initial={{ opacity: 0, filter: "blur(8px)", scale: 1.01, y: 2 }} 
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {CLEAN_TEXT}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear", repeatType: "reverse" }}
                        className="inline-block w-[3px] h-[22px] md:h-[26px] bg-chirp-stone-800 ml-[2px] rounded-sm align-text-bottom"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Center Overlays ("On top of the thing" / true bottom) */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-20">
              <AnimatePresence mode="wait">
                {/* Tactical Premium Keycaps */}
                {demoPhase === "hotkey" && (
                  <motion.div
                    key="keycaps"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3, ease: springEasing }}
                    className="flex flex-col items-center gap-3 drop-shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      {["Ctrl", "Shift", "Space"].map((key) => (
                        <span
                          key={key}
                          className="px-3 py-1.5 rounded-[8px] bg-white border border-chirp-stone-200/80 text-chirp-stone-700 text-[11px] font-mono font-bold shadow-[0_2px_0_rgba(0,0,0,0.05),_0_8px_16px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Chirp overlay pill */}
                {showOverlay && (
                  <motion.div 
                    key="overlayPill"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
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
