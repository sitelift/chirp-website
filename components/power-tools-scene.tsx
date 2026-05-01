"use client";

import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";

// Power Tools — three editorial rows on the open dark canvas.
// Reworked from the previous three-equal-card grid (which read as
// stock-SaaS feature map) into a stacked editorial sequence: each
// row alternates a small live UI fragment with a display title +
// breathing body copy. Hairline dividers separate the rows.
//
// The fragments use the actual app's shipped patterns (vocab rows,
// snippet trigger→expansion, Smart Cleanup segmented control), but
// rendered without card chrome — they sit on the open canvas the
// way Fey's product moments do, not behind dotted-bg+halo
// containers.

const VOCABULARY_ENTRIES = [
  { spoken: "Anthropic", written: "Anthropic" },
  { spoken: "Claude", written: "Claude" },
  { spoken: "Tauri", written: "Tauri" },
  { spoken: "Sherpa Onyx", written: "sherpa-onnx" },
];

export function PowerToolsScene() {
  return (
    <section
      id="power-tools"
      className="relative overflow-hidden px-6 py-32 md:py-44 lg:py-52"
    >
      <motion.div
        {...staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-[1080px] flex-col"
      >
        {/* Section opener — single line, alone, lots of room. */}
        <motion.h2
          {...staggerChild}
          className="halo-hero relative max-w-[18ch] font-display font-semibold leading-[0.96] tracking-tight text-white/90"
          style={{
            fontSize: "clamp(36px, 5.4vw, 72px)",
            letterSpacing: "-0.025em",
          }}
        >
          Tuned for how you talk.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-7 max-w-[52ch] font-body text-base leading-[1.7] text-white/55 md:text-[17px]"
        >
          Three places Chirp adapts to the words you actually use.
          None of it leaves your machine.
        </motion.p>

        {/* Editorial row stack. */}
        <motion.div
          {...staggerContainer}
          className="mt-24 flex flex-col"
        >
          <FeatureRow
            title="Vocabulary"
            body="Teach Chirp the proper nouns and technical terms that show up in your writing. The model bakes them into its alphabet, so they land right the first time — no autocorrect tax, no copy-paste, no second pass."
            preview={<VocabularyPreview />}
            previewSide="right"
          />
          <FeatureRow
            title="Snippets"
            body="Bind a short voice trigger to a chunk of text. Say two words, get a paragraph — sign-offs, addresses, boilerplate, a stock email opener. Chirp expands the trigger inline at the cursor."
            preview={<SnippetPreview />}
            previewSide="left"
          />
          <FeatureRow
            title="Smart Cleanup"
            body="Filler words, run-ons, spoken punctuation, time-of-day spelled out — polished on-device by a local language model. Off, Local, or your own cloud key. Audio never leaves the laptop either way."
            preview={<CleanupPreview />}
            previewSide="right"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

interface FeatureRowProps {
  title: string;
  body: string;
  preview: React.ReactNode;
  /** Which side the live UI fragment sits on at desktop. Mobile
   *  always stacks the preview above the copy. */
  previewSide: "left" | "right";
}

function FeatureRow({ title, body, preview, previewSide }: FeatureRowProps) {
  const flexDirection =
    previewSide === "left"
      ? "md:flex-row"
      : "md:flex-row-reverse";

  return (
    <motion.div
      {...reveal}
      className={`flex flex-col gap-12 border-t border-white/[0.08] py-20 first:border-t-0 first:pt-0 md:items-center md:gap-16 lg:py-24 ${flexDirection}`}
    >
      {/* Live fragment. */}
      <div className="flex w-full items-center justify-center md:flex-1">
        {preview}
      </div>

      {/* Copy. */}
      <div className="w-full md:flex-1">
        <h3
          className="font-display font-semibold leading-[1.05] tracking-tight text-white"
          style={{
            fontSize: "clamp(28px, 3.4vw, 44px)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>
        <p className="mt-5 max-w-[44ch] font-body text-[15px] leading-[1.75] text-white/60 md:text-[16px]">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

// ── Live fragments — built from the actual app's vocabulary,
//    rendered without card chrome. They sit on the open canvas. ──

function VocabularyPreview() {
  return (
    <div className="w-full max-w-[360px] space-y-2">
      {VOCABULARY_ENTRIES.map((entry) => (
        <div
          key={entry.spoken}
          className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-2 font-mono text-[12px] tracking-tight last:border-b-0"
        >
          <span className="text-white/40">{entry.spoken}</span>
          <span className="text-white/15">→</span>
          <span className="text-white/85">{entry.written}</span>
        </div>
      ))}
    </div>
  );
}

function SnippetPreview() {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-3">
      <div className="flex items-center justify-between border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em]">
        <span className="text-white/40">trigger</span>
        <span className="text-white/85">sign off</span>
      </div>
      <div className="flex justify-center text-white/15">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1.5v11M2 8l5 4 5-4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="border border-white/[0.06] bg-white/[0.015] px-4 py-3 font-body text-[13px] leading-[1.6] text-white/85">
        Best,
        <br />
        Pieter
      </div>
    </div>
  );
}

function CleanupPreview() {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-4">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] p-0.5">
        <Pill label="Off" />
        <Pill label="Local" active />
        <Pill label="Cloud" />
      </div>
      <div className="flex items-center justify-between border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em]">
        <span className="text-white/40">tone</span>
        <span className="text-white/85">Message</span>
      </div>
    </div>
  );
}

function Pill({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`rounded-full px-3.5 py-1 font-display text-[12px] ${
        active ? "bg-white/[0.10] text-white" : "text-white/40"
      }`}
    >
      {label}
    </span>
  );
}
