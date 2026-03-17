"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

const boxes = [
  {
    emoji: "🎤",
    title: "Your Microphone",
    sub: null,
    note: null,
    highlight: false,
  },
  {
    emoji: "🧠",
    title: "Speech Model",
    sub: "Parakeet TDT 0.6B",
    note: "runs on your CPU",
    highlight: false,
  },
  {
    emoji: "✨",
    title: "Cleanup Model",
    sub: "Qwen 2.5 1.5B",
    note: "runs on your CPU",
    highlight: true,
  },
  {
    emoji: "📋",
    title: "Your App",
    sub: null,
    note: "pasted at cursor",
    highlight: false,
  },
];

const connectorLabels = [
  "audio stream (never saved)",
  "raw transcript",
  "clean text",
];

function ConnectorLine() {
  return (
    <div className="flex flex-col items-center">
      <div className="connector-flow h-[40px] w-[1px]" />
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <motion.div {...reveal} className="flex flex-col items-center gap-0">
      {boxes.map((box, i) => (
        <div key={box.title} className="flex flex-col items-center">
          {i > 0 && (
            <>
              <ConnectorLine />
              <span className="mb-2 font-mono text-xs text-chirp-stone-400">
                {connectorLabels[i - 1]}
              </span>
            </>
          )}
          <div
            className={`w-[260px] rounded-xl p-4 text-center shadow-surface ${
              box.highlight
                ? "border border-chirp-amber-200/40 bg-chirp-amber-50"
                : "bg-white"
            }`}
          >
            <div className="text-sm text-chirp-stone-900">
              <span className="mr-1.5">{box.emoji}</span>
              <span className="font-medium">{box.title}</span>
            </div>
            {box.sub && (
              <div className="mt-1 font-mono text-xs text-chirp-stone-500">
                {box.sub}
              </div>
            )}
            {box.note && (
              <div className="mt-0.5 font-mono text-xs text-chirp-stone-400">
                {box.note}
              </div>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
