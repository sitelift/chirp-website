"use client";

import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { BrandPlaceholder } from "./brand-placeholder";

// Privacy scene — Fey-style editorial. One headline alone on a sea
// of dark canvas, an atmospheric centerpiece below it, and three
// giant `0` stat blocks anchoring the bottom. No card chrome
// wrapping the whole thing, no cute icons — the message lands
// because it has room to breathe.
//
// Reference patterns from Fey home + pricing:
//   - Single sentence headline period-terminated, alone on canvas
//     ("Make better investments." / "What it costs.")
//   - Massive vertical breathing room between sections
//   - Atmospheric photograph or 3D rendered scene as the visual,
//     never a boxy "demo container"
//   - Stats and supporting copy sit small underneath the dominant
//     visual, never compete with it.
//
// The atmospheric centerpiece uses <BrandPlaceholder> for now;
// the slot is `privacy-vault` and gets a real bitmap in the
// daytime image-gen pass (see BRAND_IMAGE_SLOTS.md).

export function PrivacyScene() {
  return (
    <section
      id="privacy"
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 py-32 md:py-44 lg:py-56"
    >
      {/* Single white halo bloom centered on the canvas — barely
          there, just enough to lift the section off pitch black. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Headline. Period-terminated, alone on a sea of canvas.
          Halo bloom sits behind it. */}
      <motion.h2
        {...reveal}
        className="halo-hero relative z-10 mx-auto max-w-[18ch] text-center font-display font-semibold leading-[0.96] tracking-tight text-white"
        style={{
          fontSize: "clamp(40px, 6.4vw, 84px)",
          letterSpacing: "-0.025em",
        }}
      >
        Your voice never leaves your laptop.
      </motion.h2>

      {/* Atmospheric centerpiece. Wide editorial frame. */}
      <motion.div
        {...reveal}
        className="relative z-10 mt-20 w-full max-w-[760px] md:mt-28"
      >
        <BrandPlaceholder
          name="privacy-vault"
          aspectRatio="16 / 10"
          caption="Padlock embossed with BirdMark · cinematic dark"
        />
      </motion.div>

      {/* Stats row — three giant `0`s. Hairline-separated, no
          card chrome, generous padding so each stat owns its
          column. */}
      <motion.div
        {...staggerContainer}
        className="relative z-10 mt-24 grid w-full max-w-[920px] grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-0 md:mt-32"
      >
        <PrivacyStat
          value="0"
          label="servers"
          detail="Audio is processed by an on-device speech model. There is no remote transcription queue."
        />
        <PrivacyStat
          value="0"
          label="network calls"
          detail="After download, dictation works fully offline. No telemetry, no analytics."
          divider
        />
        <PrivacyStat
          value="0"
          label="bytes transmitted"
          detail="Your transcripts are written straight to your clipboard, then to the app you're already using."
          divider
        />
      </motion.div>

      {/* Quiet footnote line — mono caps, white/30. */}
      <motion.p
        {...reveal}
        className="relative z-10 mt-20 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/35"
      >
        Local-first · Offline · No account
      </motion.p>
    </section>
  );
}

interface PrivacyStatProps {
  value: string;
  label: string;
  detail: string;
  /** When true, render a vertical hairline on the left edge to
   *  separate from the previous column on desktop. */
  divider?: boolean;
}

function PrivacyStat({ value, label, detail, divider }: PrivacyStatProps) {
  return (
    <motion.div
      {...staggerChild}
      className={`relative flex flex-col items-center px-4 text-center sm:px-8 ${
        divider ? "sm:border-l sm:border-white/10" : ""
      }`}
    >
      <span
        className="block font-display font-semibold leading-none text-white"
        style={{
          fontFeatureSettings: '"tnum"',
          letterSpacing: "-0.04em",
          fontSize: "clamp(96px, 12vw, 160px)",
        }}
      >
        {value}
      </span>
      <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
        {label}
      </span>
      <p className="mt-5 max-w-[26ch] font-body text-[14px] leading-[1.65] text-white/55 md:text-[15px]">
        {detail}
      </p>
    </motion.div>
  );
}
