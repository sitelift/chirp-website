"use client";

import { motion } from "framer-motion";
import { Mic, Zap, Clipboard } from "lucide-react";

const flowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ArchitectureDemo() {
  return (
    <div className="w-full max-w-[800px] flex flex-col items-center mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-7 w-full items-center gap-4">
        
        {/* Node 1: Microphone */}
        <motion.div 
          variants={flowVariants}
          className="md:col-span-2 rounded-2xl p-6 bg-white shadow-lifted flex flex-col items-center gap-4 border border-chirp-stone-100"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chirp-stone-50 border border-chirp-stone-100 shadow-subtle">
            <Mic className="w-6 h-6 text-chirp-stone-700" />
          </div>
          <div className="text-center">
            <div className="font-display font-bold text-base text-chirp-stone-900">Microphone</div>
            <div className="text-[11px] font-mono text-chirp-stone-400 uppercase tracking-tighter mt-1">Analog Input</div>
          </div>
        </motion.div>

        {/* Connection 1 */}
        <div className="md:col-span-1 h-12 md:h-px w-px md:w-full flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full md:h-[2px] w-[2px] md:w-full bg-chirp-stone-200 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-chirp-amber-400 to-transparent opacity-70"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
          </div>
        </div>

        {/* Node 2: Local AI Engine */}
        <motion.div 
          variants={flowVariants}
          className="md:col-span-4 rounded-3xl p-5 md:p-8 bg-chirp-amber-50/50 shadow-elevated border border-chirp-amber-200/30 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Zap className="w-24 h-24 text-chirp-amber-500" />
          </div>

          <div className="flex items-center gap-3 font-display font-bold text-xl text-chirp-stone-900 mb-4 md:mb-6">
            <div className="h-8 w-8 rounded-lg bg-chirp-amber-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Local AI Engine
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <div className="p-4 rounded-2xl bg-white/80 border border-chirp-amber-200/20 shadow-subtle">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-chirp-amber-500" />
                <span className="font-mono text-[10px] font-bold text-chirp-amber-800 uppercase tracking-wider">Speech Logic</span>
              </div>
              <p className="text-xs text-chirp-stone-600 leading-relaxed font-medium">Whisper-based processing directly on your CPU.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-chirp-amber-200/20 shadow-subtle">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-chirp-amber-500" />
                <span className="font-mono text-[10px] font-bold text-chirp-amber-800 uppercase tracking-wider">Cleanup Agent</span>
              </div>
              <p className="text-xs text-chirp-stone-600 leading-relaxed font-medium">Context-aware grammar and filler removal.</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-chirp-amber-200/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-chirp-stone-500 font-bold uppercase tracking-widest">Active Processing</span>
            </div>
            <span className="text-[10px] font-mono text-chirp-amber-700 bg-chirp-amber-100 px-2 py-0.5 rounded-full border border-chirp-amber-200/40 font-bold">Encrypted Memory</span>
          </div>
        </motion.div>

      </div>

      {/* Output Connection */}
      <div className="my-4 h-16 w-[2px] bg-chirp-stone-200 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-chirp-amber-400 to-transparent opacity-70"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>

      {/* Node 3: Your App */}
      <motion.div 
        variants={flowVariants}
        className="w-full max-w-[400px] rounded-2xl p-5 bg-white shadow-lifted border border-chirp-stone-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chirp-stone-50 border border-chirp-stone-100">
            <Clipboard className="w-5 h-5 text-chirp-stone-700" />
          </div>
          <div className="flex flex-col">
            <div className="font-display font-bold text-base text-chirp-stone-900">Your App</div>
            <div className="text-[11px] font-mono text-chirp-stone-400 uppercase tracking-tighter">Pasted at cursor</div>
          </div>
        </div>
        <div className="h-8 px-3 rounded-lg bg-chirp-stone-50 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-[10px] font-mono font-bold text-chirp-stone-600 uppercase">Secure</span>
        </div>
      </motion.div>
    </div>
  );
}
