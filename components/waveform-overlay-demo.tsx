"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirdMark } from "@/components/bird-mark";

type Phase = "idle" | "listening" | "processing" | "done";

export function WaveformOverlayDemo() {
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
      await new Promise((r) => setTimeout(r, 2000));
      
      // Loop
      cycle();
    };
    
    cycle();
  }, []);

  const isActive = phase !== "idle";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="relative w-full max-w-[480px] h-[320px] rounded-xl border border-chirp-stone-700 bg-chirp-stone-800 shadow-hero flex items-center justify-center overflow-hidden"
    >
      {/* Decorative background glow for the dark container */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #F59E0B 0%, transparent 60%)"
        }}
      />
      
      {/* Abstract screen content lines to show it's "typing" in the background */}
      <div className="absolute top-8 left-8 right-8 flex flex-col gap-4 opacity-10">
        <div className="h-4 w-3/4 rounded bg-white" />
        <div className="h-4 w-full rounded bg-white" />
        <div className="h-4 w-5/6 rounded bg-white" />
        <div className="h-4 w-1/2 rounded bg-white" />
      </div>

      <div className="relative z-20 flex justify-center w-full">
        {/* The Premium Morphing Pill */}
        <motion.div
          animate={{
            height: isActive ? 44 : 36,
            paddingLeft: isActive ? 16 : 10,
            paddingRight: isActive ? 16 : 10,
            gap: isActive ? 12 : 8,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center rounded-full border border-chirp-stone-200 bg-white shadow-overlay"
        >
          <BirdMark 
            size={isActive ? 20 : 16} 
            className={`transition-colors duration-300 ${isActive ? "text-chirp-amber-400" : "text-chirp-stone-400"}`} 
          />
          
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
                    <span className="font-mono text-xs font-semibold tracking-wide text-chirp-stone-600">Listening...</span>
                    <div className="flex items-center gap-[2px] h-3">
                      {[3, 8, 12, 6, 10].map((h, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: [h, Math.max(3, h - 4), h] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          className="w-[3px] rounded-full bg-chirp-amber-400 origin-center"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {phase === "processing" && (
                  <span className="font-mono text-xs font-semibold tracking-wide text-chirp-stone-600 flex items-center gap-2">
                    <span className="animate-spin text-chirp-stone-400">✧</span> Processing
                  </span>
                )}
                {phase === "done" && (
                  <span className="font-mono text-xs font-semibold tracking-wide text-chirp-success flex items-center gap-2">
                    ✓ Copied to clipboard
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
