"use client";

import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { BrandPlaceholder } from "./brand-placeholder";

// Privacy scene — Fey-style editorial. Single asymmetric layout
// rather than a centered headline + KPI strip:
//
//   [ atmospheric brand visual ]      [ left-aligned headline ]
//                                     [ supporting paragraph ]
//                                     [ three quiet hairline rows ]
//
// Reworked from a centered "0 / 0 / 0" stat-counter row (which
// read as dashboard KPI strip rather than premium editorial) into
// a stacked, restrained list of guarantee lines that breathe at
// body-copy size. Amber is gone from this scene entirely; it's
// the privacy moment, not a brand moment.

const PRIVACY_LINES = [
  {
    label: "Servers",
    detail:
      "Audio runs through a speech model on your device. There is no remote transcription queue.",
  },
  {
    label: "Network",
    detail:
      "After download, dictation works offline indefinitely. No telemetry, no analytics, no callbacks.",
  },
  {
    label: "Storage",
    detail:
      "Transcripts go straight to your clipboard. Nothing is written to disk you didn't ask for.",
  },
];

export function PrivacyScene() {
  return (
    <section
      id="privacy"
      className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden px-6 py-32 md:py-44 lg:py-52"
    >
      {/* Quiet white halo — barely there. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.035) 0%, transparent 60%)",
        }}
      />

      <motion.div
        {...staggerContainer}
        className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24"
      >
        {/* Atmospheric centerpiece — left side on desktop. */}
        <motion.div {...staggerChild} className="relative w-full">
          <BrandPlaceholder
            name="privacy-vault"
            aspectRatio="4 / 5"
            caption="Padlock embossed with BirdMark · cinematic dark"
          />
        </motion.div>

        {/* Editorial column — right side on desktop, full width on
            mobile (stacks below the visual). */}
        <div className="flex flex-col">
          <motion.h2
            {...staggerChild}
            className="halo-hero relative max-w-[14ch] font-display font-semibold leading-[0.96] tracking-tight text-white"
            style={{
              fontSize: "clamp(40px, 5.6vw, 78px)",
              letterSpacing: "-0.03em",
            }}
          >
            Your voice never leaves your laptop.
          </motion.h2>

          <motion.p
            {...staggerChild}
            className="mt-7 max-w-[44ch] font-body text-[15px] leading-[1.75] text-white/60 md:text-[16.5px]"
          >
            Chirp listens, transcribes, polishes, and pastes — every
            step on the device you&apos;re holding. Audio never enters
            a remote queue, because there isn&apos;t one.
          </motion.p>

          {/* Three quiet guarantee lines, hairline-divided. No giant
              counter numbers. */}
          <motion.dl
            {...staggerContainer}
            className="mt-12 flex flex-col"
          >
            {PRIVACY_LINES.map((line) => (
              <motion.div
                key={line.label}
                {...staggerChild}
                className="grid grid-cols-[100px_1fr] items-baseline gap-6 border-t border-white/[0.08] py-5 last:border-b last:border-white/[0.08]"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {line.label}
                </dt>
                <dd className="font-body text-[14px] leading-[1.65] text-white/65 md:text-[15px]">
                  {line.detail}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}
