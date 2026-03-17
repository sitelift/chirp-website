"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FillerSpan = { text: string; filler: boolean };

const rawParts: FillerSpan[] = [
  { text: "So ", filler: false },
  { text: "um ", filler: true },
  { text: "I was thinking that ", filler: false },
  { text: "like ", filler: true },
  { text: "maybe we should ", filler: false },
  { text: "you know ", filler: true },
  { text: "move the standup to thursdays because ", filler: false },
  { text: "uh ", filler: true },
  { text: "most of the team is ", filler: false },
  { text: "like ", filler: true },
  { text: "busy on monday mornings and ", filler: false },
  { text: "I mean ", filler: true },
  { text: "it just makes more sense ", filler: false },
  { text: "right", filler: false },
];

const cleanText =
  "I was thinking we should move the standup to Thursdays. Most of the team is busy on Monday mornings, so it would make more sense.";

const tabs = ["What you said", "What Chirp typed"] as const;

export function CleanupDemo() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const switchTab = useCallback(() => {
    setActiveTab((prev) => (prev === 0 ? 1 : 0));
  }, []);

  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(switchTab, 4000);
    return () => clearInterval(interval);
  }, [userInteracted, switchTab]);

  const handleTabClick = (index: 0 | 1) => {
    setActiveTab(index);
    setUserInteracted(true);
  };

  return (
    <motion.div {...reveal} className="mx-auto mt-12 w-full max-w-[640px]">
      <div className="overflow-hidden rounded-2xl bg-white shadow-elevated">
        {/* Tab bar */}
        <div className="flex border-b border-black/[0.06]">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => handleTabClick(i as 0 | 1)}
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium transition-colors",
                activeTab === i
                  ? "border-b-2 border-chirp-amber-500 text-chirp-stone-900"
                  : "text-chirp-stone-400 hover:text-chirp-stone-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="relative min-h-[160px] p-6">
          <AnimatePresence mode="wait">
            {activeTab === 0 ? (
              <motion.div
                key="raw"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm leading-relaxed text-chirp-stone-700"
              >
                {rawParts.map((part, i) =>
                  part.filler ? (
                    <span
                      key={i}
                      className="rounded bg-chirp-amber-100 px-1 text-chirp-amber-700"
                    >
                      {part.text}
                    </span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                key="clean"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="font-body text-base leading-relaxed text-chirp-stone-900"
              >
                {cleanText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
