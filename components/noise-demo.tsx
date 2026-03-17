"use client";

import { motion } from "framer-motion";

export function NoiseDemo() {
  // Generate pseudo-random deterministic heights for the noise bars
  const noiseBars = Array.from({ length: 24 }).map((_, i) => ({
    h: [
      Math.abs(Math.sin(i * 1.3) * 20) + 4,
      Math.abs(Math.sin(i * 2.1) * 30) + 10,
      Math.abs(Math.sin(i * 3.7) * 10) + 2,
    ],
    duration: Math.abs(Math.sin(i * 4.2)) * 0.5 + 0.3
  }));

  // Generate smoother heights for the clean bars
  const cleanBars = Array.from({ length: 16 }).map((_, i) => {
    const sin = Math.sin((i / 16) * Math.PI) * 20 + 4;
    return {
      h: [sin * 0.6, sin * 1.2, sin * 0.8],
      duration: 1.2
    };
  });

  return (
    <div className="w-full max-w-[400px] mx-auto rounded-2xl bg-white shadow-surface p-8 flex flex-col items-center gap-6 relative overflow-hidden">
      
      {/* Background warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-chirp-amber-50/30 opacity-50" />
      
      {/* Input (Noise) */}
      <div className="w-full relative z-10 flex flex-col">
        <div className="text-[11px] font-mono text-chirp-stone-400 font-semibold tracking-widest uppercase mb-3 text-center">
          Input Audio (Microphone)
        </div>
        <div className="flex items-center justify-center gap-[3px] h-12">
          {noiseBars.map((bar, i) => (
            <motion.div
              key={`noise-${i}`}
              className="w-[3px] rounded-full bg-chirp-stone-300"
              animate={{ height: bar.h }}
              transition={{ repeat: Infinity, duration: bar.duration, ease: "linear", repeatType: "mirror" }}
            />
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-chirp-stone-200 to-transparent relative z-10 flex items-center justify-center">
        <div className="bg-white px-3 font-mono text-[10px] uppercase text-chirp-amber-500 font-bold border border-chirp-amber-200 rounded-full">
          Noise Suppressed
        </div>
      </div>

      {/* Output (Clean) */}
      <div className="w-full relative z-10 flex flex-col">
        <div className="text-[11px] font-mono text-chirp-stone-400 font-semibold tracking-widest uppercase mb-3 text-center">
          Cleaned Audio (To Model)
        </div>
        <div className="flex items-center justify-center gap-[3px] h-12">
          {cleanBars.map((bar, i) => (
            <motion.div
              key={`clean-${i}`}
              className="w-[3px] rounded-full bg-chirp-amber-500"
              animate={{ height: bar.h }}
              transition={{ repeat: Infinity, duration: bar.duration, ease: "easeInOut", repeatType: "mirror", delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
