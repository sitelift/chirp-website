"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { ListeningCanvas } from "./listening-canvas";
import { HotkeyTrio } from "./hotkey-trio";
import { TypingText } from "./typing-text";

// "What it does" — three-beat cascade on the open dark canvas.
// No card-surface frame, no captions, no per-frame labels. The
// visuals carry the value prop: press the hotkey → speak loosely
// (raw transcript with fillers, lowercase, spoken punctuation as
// words) → paste clean text (proper case, real punctuation,
// numbers normalized, fillers gone). The transformation between
// frame 2's raw stream and frame 3's polished sentence IS the
// product.
//
// Both typewriters share a 9000ms cycle. Frame 2 types 300–3300ms,
// frame 3 starts at 3700ms (small breath after raw text settles)
// and types over 2000ms, both hold to cycle end. Mounted at scene
// mount so they stay in lockstep.

const RAW =
  "send john the doc by friday at three pm period question mark do you have his email address";
const CLEAN =
  "Send John the doc by Friday at 3 PM. Do you have his email address?";

const CYCLE_MS = 9000;

export function WhatItDoesScene() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:py-44 lg:py-48">
      <motion.div
        {...staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-stretch md:flex-row md:items-center md:justify-between md:gap-6"
      >
        {/* Frame 1 — the hotkey trio */}
        <motion.div
          {...staggerChild}
          className="flex min-h-[180px] flex-1 items-center justify-center"
        >
          <HotkeyTrio />
        </motion.div>

        {/* Connector — thin hairline that bridges frames on desktop. */}
        <Connector />

        {/* Frame 2 — listening overlay + raw transcript streaming */}
        <motion.div
          {...staggerChild}
          className="flex min-h-[180px] flex-1 flex-col items-center justify-center gap-8"
        >
          <ListeningCanvas />
          <p
            className="font-mono text-[13px] leading-[1.7] text-white/35"
            style={{
              maxWidth: "32ch",
              minHeight: "5.5em",
              textAlign: "center",
            }}
          >
            <TypingText
              text={RAW}
              cycleMs={CYCLE_MS}
              startMs={300}
              typeMs={3000}
            />
          </p>
        </motion.div>

        <Connector />

        {/* Frame 3 — polished output */}
        <motion.div
          {...staggerChild}
          className="flex min-h-[180px] flex-1 items-center justify-center"
        >
          <p
            className="font-display text-[16px] font-medium leading-[1.55] text-white"
            style={{
              maxWidth: "32ch",
              minHeight: "5.5em",
              textAlign: "center",
              letterSpacing: "-0.005em",
            }}
          >
            <TypingText
              text={CLEAN}
              cycleMs={CYCLE_MS}
              startMs={3700}
              typeMs={2000}
            />
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Hairline connector between frames. Hidden on mobile (frames stack
// vertically), shown as a short horizontal line on desktop. Subtle
// amber pulse implies flow without screaming for attention.
function Connector() {
  return (
    <div
      aria-hidden
      className="hidden md:block md:h-px md:w-12 md:shrink-0 md:bg-gradient-to-r md:from-white/5 md:via-white/15 md:to-white/5"
    />
  );
}
