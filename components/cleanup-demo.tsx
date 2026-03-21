"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CleanupDemo() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  return (
    <div className="mx-auto w-full max-w-[800px]">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-elevated">

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-chirp-amber-400/5 blur-3xl pointer-events-none" />

        {/* Tab Bar */}
        <div className="flex items-center gap-8 border-b border-black/[0.04] bg-chirp-stone-50/40 px-8 pt-6">
          <button
            onClick={() => setActiveTab("before")}
            className={`pb-5 text-base font-display font-bold transition-all relative ${
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
            className={`pb-5 text-base font-display font-bold transition-all relative ${
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
        <div className="relative min-h-[240px] md:min-h-[280px]">
          <AnimatePresence mode="wait">
            {activeTab === "before" ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-between p-8 md:p-10"
              >
                <div className="font-mono text-[17px] md:text-[19px] text-chirp-stone-700 leading-[1.9]">
                  So I was thinking that we should
                  probably move the meeting to <span className="inline-block bg-chirp-amber-100/60 text-chirp-amber-700 rounded-md px-1.5 py-0.5 border border-chirp-amber-200/50">uh</span>{" "}
                  Thursday if that works for everyone and <span className="inline-block bg-chirp-amber-100/60 text-chirp-amber-700 rounded-md px-1.5 py-0.5 border border-chirp-amber-200/50">like</span>{" "}
                  I can send out the updated invite
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
                className="absolute inset-0 flex flex-col justify-start p-8 md:p-10"
              >
                <div className="font-body text-[18px] md:text-[20px] text-chirp-stone-900 leading-[1.9]">
                  I was thinking we should move the meeting to Thursday, if that works for everyone. I can send out the updated invite.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
