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
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-elevated border border-chirp-stone-200">
        
        {/* Tab Bar */}
        <div className="flex items-center gap-6 border-b border-black/[0.06] bg-chirp-stone-50/50 px-6 pt-4">
          <button
            onClick={() => setActiveTab("before")}
            className={`pb-4 text-sm font-display font-bold transition-colors border-b-2 ${
              activeTab === "before"
                ? "text-chirp-stone-900 border-chirp-amber-500"
                : "text-chirp-stone-400 border-transparent hover:text-chirp-stone-600"
            }`}
          >
            What you said
          </button>
          <button
            onClick={() => setActiveTab("after")}
            className={`pb-4 text-sm font-display font-bold transition-colors border-b-2 ${
              activeTab === "after"
                ? "text-chirp-stone-900 border-chirp-amber-500"
                : "text-chirp-stone-400 border-transparent hover:text-chirp-stone-600"
            }`}
          >
            What Chirp typed
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
                <div className="font-mono text-[15px] text-chirp-stone-700 leading-[1.8]">
                  so <span className="bg-chirp-amber-100 text-chirp-amber-700 rounded px-1">um</span>{" "}
                  <span className="bg-chirp-amber-100 text-chirp-amber-700 rounded px-1">basically</span>{" "}
                  I was thinking that we should <span className="bg-chirp-amber-100 text-chirp-amber-700 rounded px-1">like</span>{" "}
                  probably move the meeting to <span className="bg-chirp-amber-100 text-chirp-amber-700 rounded px-1">uh</span>{" "}
                  Thursday if that works
                </div>
                <div className="mt-4 text-xs text-chirp-stone-400 font-mono self-end">
                  Filler words highlighted
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
        Powered by Qwen 2.5 1.5B · runs locally · ~1 GB model
      </div>
    </div>
  );
}
