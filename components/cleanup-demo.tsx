"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CleanupDemo() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  // Auto-switch tabs every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((current) => (current === "before" ? "after" : "before"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[640px] mt-12">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-elevated border border-chirp-stone-200">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-chirp-amber-400/5 blur-3xl pointer-events-none" />
        
        {/* Tab Bar */}
        <div className="flex items-center gap-6 border-b border-black/[0.04] bg-chirp-stone-50/40 px-6 pt-5">
          <button
            onClick={() => setActiveTab("before")}
            className={`pb-4 text-sm font-display font-bold transition-all relative ${
              activeTab === "before"
                ? "text-chirp-stone-900"
                : "text-chirp-stone-400 hover:text-chirp-stone-600"
            }`}
          >
            What you said
            {activeTab === "before" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-chirp-amber-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("after")}
            className={`pb-4 text-sm font-display font-bold transition-all relative ${
              activeTab === "after"
                ? "text-chirp-stone-900"
                : "text-chirp-stone-400 hover:text-chirp-stone-600"
            }`}
          >
            What Chirp typed
            {activeTab === "after" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-chirp-amber-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            {activeTab === "before" ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-between p-8"
              >
                <div className="font-mono text-[16px] text-chirp-stone-700 leading-[1.8]">
                  so <span className="inline-block bg-chirp-amber-100/60 text-chirp-amber-700 rounded-md px-1.5 py-0.5 border border-chirp-amber-200/50">um</span>{" "}
                  <span className="inline-block bg-chirp-amber-100/60 text-chirp-amber-700 rounded-md px-1.5 py-0.5 border border-chirp-amber-200/50">basically</span>{" "}
                  I was thinking that we should <span className="inline-block bg-chirp-amber-100/60 text-chirp-amber-700 rounded-md px-1.5 py-0.5 border border-chirp-amber-200/50">like</span>{" "}
                  probably move the meeting to <span className="inline-block bg-chirp-amber-100/60 text-chirp-amber-700 rounded-md px-1.5 py-0.5 border border-chirp-amber-200/50">uh</span>{" "}
                  Thursday if that works
                </div>
                <div className="mt-6 flex items-center gap-2 text-[10px] text-chirp-stone-400 font-bold uppercase tracking-widest self-end">
                  <div className="h-1.5 w-1.5 rounded-full bg-chirp-amber-400 animate-pulse" />
                  Filler words detected
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-center p-8"
              >
                <div className="font-body text-[17px] text-chirp-stone-900 leading-[1.8]">
                  I was thinking we should probably move the meeting to Thursday, if that works.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-6 font-mono text-xs text-chirp-stone-400 text-center tracking-wide">
        Runs entirely on your device · no internet needed
      </div>
    </div>
  );
}
