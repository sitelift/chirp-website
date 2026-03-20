"use client";

import { motion } from "framer-motion";
import { Mic, Zap, Sparkles, Clipboard } from "lucide-react";

const flowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ArchitectureDemo() {
  return (
    <div className="w-full max-w-[400px] flex flex-col items-center mx-auto my-8">
      {/* Node 1: Microphone */}
      <motion.div 
        variants={flowVariants}
        className="w-full rounded-xl p-4 bg-white shadow-surface flex items-center gap-4 relative z-10"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chirp-stone-50 border border-chirp-stone-100">
          <Mic className="w-5 h-5 text-chirp-stone-700" />
        </div>
        <div className="font-display font-bold text-lg text-chirp-stone-900">Your Microphone</div>
      </motion.div>

      {/* Connection 1 */}
      <div className="relative h-16 w-full flex flex-col items-center justify-center -my-1">
        <div className="absolute inset-0 flex justify-center w-full">
          <div className="w-px h-full bg-chirp-stone-200 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-chirp-amber-400 to-transparent opacity-70"
              animate={{ y: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </div>
        <div className="relative z-10 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-chirp-stone-400 uppercase tracking-widest rounded-full shadow-[0_0_0_4px_white]">
          audio stream (never saved)
        </div>
      </div>

      {/* Node 2: Speech Model */}
      <motion.div 
        variants={flowVariants}
        className="w-full rounded-xl p-5 bg-white shadow-surface flex flex-col relative z-10"
      >
        <div className="flex items-center gap-3 font-display font-bold text-lg text-chirp-stone-900 mb-2">
          <Zap className="w-5 h-5 text-chirp-stone-500" />
          Speech Model
        </div>
        <div className="font-mono text-sm text-chirp-stone-500 bg-chirp-stone-50 px-2.5 py-1 rounded inline-flex w-fit mb-2">
          Speech Recognition
        </div>
        <div className="text-sm text-chirp-stone-600">
          runs on your CPU
        </div>
      </motion.div>

      {/* Connection 2 */}
      <div className="relative h-16 w-full flex flex-col items-center justify-center -my-1">
        <div className="absolute inset-0 flex justify-center w-full">
          <div className="w-px h-full bg-chirp-stone-200 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-chirp-amber-400 to-transparent opacity-70"
              animate={{ y: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.6 }}
            />
          </div>
        </div>
        <div className="relative z-10 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-chirp-stone-400 uppercase tracking-widest rounded-full shadow-[0_0_0_4px_white]">
          raw transcript
        </div>
      </div>

      {/* Node 3: Cleanup Model */}
      <motion.div 
        variants={flowVariants}
        className="w-full rounded-xl p-5 bg-chirp-amber-50 shadow-surface border border-chirp-amber-200/40 flex flex-col relative z-10"
      >
        <div className="flex items-center gap-3 font-display font-bold text-lg text-chirp-amber-900 mb-2">
          <Sparkles className="w-5 h-5 text-chirp-amber-600" />
          Cleanup Model
        </div>
        <div className="font-mono text-sm text-chirp-amber-800 bg-chirp-amber-100/50 px-2.5 py-1 rounded inline-flex w-fit mb-2 border border-chirp-amber-200/50">
          Text Cleanup
        </div>
        <div className="text-sm text-chirp-amber-800">
          runs on your CPU
        </div>
      </motion.div>

      {/* Connection 3 */}
      <div className="relative h-16 w-full flex flex-col items-center justify-center -my-1">
        <div className="absolute inset-0 flex justify-center w-full">
          <div className="w-px h-full bg-chirp-stone-200 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-chirp-amber-400 to-transparent opacity-70"
              animate={{ y: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1.2 }}
            />
          </div>
        </div>
        <div className="relative z-10 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-chirp-stone-400 uppercase tracking-widest rounded-full shadow-[0_0_0_4px_white]">
          clean text
        </div>
      </div>

      {/* Node 4: Your App */}
      <motion.div 
        variants={flowVariants}
        className="w-full rounded-xl p-4 bg-white shadow-surface flex items-center gap-4 relative z-10"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chirp-stone-50 border border-chirp-stone-100">
          <Clipboard className="w-5 h-5 text-chirp-stone-700" />
        </div>
        <div className="flex flex-col">
          <div className="font-display font-bold text-lg text-chirp-stone-900">Your App</div>
          <div className="text-sm text-chirp-stone-500">pasted at cursor</div>
        </div>
      </motion.div>
    </div>
  );
}
