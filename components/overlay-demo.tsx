"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirdMark } from "@/components/bird-mark";

type Phase = "idle" | "listening" | "processing" | "done";

export function OverlayDemo() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    // Cycle through states to demonstrate the morphing pill
    const cycle = async () => {
      // 1. Idle (Passive)
      setPhase("idle");
      await new Promise((r) => setTimeout(r, 2000));
      
      // 2. Listening
      setPhase("listening");
      await new Promise((r) => setTimeout(r, 2500));
      
      // 3. Processing
      setPhase("processing");
      await new Promise((r) => setTimeout(r, 1500));
      
      // 4. Done
      setPhase("done");
      await new Promise((r) => setTimeout(r, 1000));
      
      // Loop
      cycle();
    };
    
    cycle();
  }, []);

  const isActive = phase !== "idle";

  return (
    <div className="relative mx-auto mt-16 w-full max-w-[800px] h-[320px] overflow-hidden rounded-[24px] border border-chirp-stone-200 bg-chirp-stone-50 shadow-inner flex flex-col items-center justify-center">
      
      {/* Abstract Desktop Wallpaper/Environment */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, #f59e0b 0%, transparent 60%)"
      }} />

      {/* The Morphing Pill */}
      <div className="absolute inset-x-0 bottom-40 z-20 flex justify-center">
        <motion.div
          animate={{
            height: isActive ? 44 : 36, // h-11 vs h-9
            paddingLeft: isActive ? 16 : 10, // px-4 vs px-2.5
            paddingRight: isActive ? 16 : 10,
            gap: isActive ? 12 : 8, // gap-3 vs gap-2
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center rounded-full border border-chirp-stone-200 bg-white shadow-overlay"
        >
          <BirdMark size={isActive ? 24 : 18} className={isActive ? "text-chirp-amber-500" : "text-chirp-stone-400"} />
          
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                key={phase}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center overflow-hidden whitespace-nowrap"
              >
                {phase === "listening" && (
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[12px] font-medium text-chirp-stone-600">Listening...</span>
                    <div className="flex items-center gap-[2px] h-3">
                      {[3, 8, 12, 6, 10].map((h, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: [h, Math.max(3, h - 4), h] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          className="w-[3px] rounded-full bg-chirp-amber-500 origin-center"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {phase === "processing" && (
                  <span className="font-mono text-[12px] font-medium text-chirp-stone-600 flex items-center gap-2">
                    <span className="animate-spin text-chirp-stone-400">✧</span> Processing
                  </span>
                )}
                {phase === "done" && (
                  <span className="font-mono text-[12px] font-medium text-chirp-success flex items-center gap-2">
                    ✓ Copied to clipboard
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Explainer Text */}
      <div className="absolute bottom-6 text-center w-full">
        <p className="font-mono text-[11px] uppercase tracking-wider text-chirp-stone-400 font-semibold">
          {isActive ? "Active State" : "Passive State"}
        </p>
      </div>

    </div>
  );
}
