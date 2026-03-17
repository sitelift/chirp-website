"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { AmberWarmth } from "@/components/amber-warmth";
import { BirdMark } from "@/components/bird-mark";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CleanupDemo } from "@/components/cleanup-demo";
import { FeatureRow } from "@/components/feature-row";
import { KeyBadge } from "@/components/key-badge";
import { Waveform } from "@/components/waveform";

/* ------------------------------------------------------------------ */
/*  Section 2 — Privacy Argument                                       */
/* ------------------------------------------------------------------ */

function PrivacySection() {
  return (
    <section className="bg-chirp-stone-50 px-6 py-32">
      <div className="mx-auto grid max-w-[1120px] items-center gap-16 md:grid-cols-2">
        {/* Left column */}
        <motion.div {...reveal}>
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Your voice never leaves this machine.
          </h2>
          <div className="mt-6 max-w-[480px] space-y-4 text-[17px] leading-[1.75] text-chirp-stone-600">
            <p>
              Chirp runs two AI models directly on your hardware. Your audio is
              processed in real time and never written to disk, streamed to a
              server, or shared with anyone.
            </p>
            <p>
              There is no cloud component. No API key. No account. The app makes
              zero network requests during operation — not even to check for
              updates.
            </p>
            <p>
              Your transcriptions stay in a local database that only you can
              access. Delete it anytime — we&apos;ll never know it existed.
            </p>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="flex justify-center">
          <ArchitectureDiagram />
        </div>
      </div>

      {/* Bottom tagline */}
      <motion.p
        {...reveal}
        className="mt-16 text-center font-mono text-xs uppercase tracking-wide text-chirp-stone-400"
      >
        Zero servers · Zero telemetry · Zero network calls · MIT licensed
      </motion.p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Cleanup Demo                                           */
/* ------------------------------------------------------------------ */

function CleanupSection() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <AmberWarmth className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-[640px] text-center">
        <motion.h2
          {...reveal}
          className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl"
        >
          From rambling to ready.
        </motion.h2>
        <motion.p
          {...reveal}
          className="mx-auto mt-6 max-w-[500px] text-lg leading-relaxed text-chirp-stone-500"
        >
          Chirp&apos;s local AI cleans up your speech in real time — removing
          filler words, fixing grammar, adding punctuation. All on your device.
        </motion.p>

        <CleanupDemo />

        <motion.p
          {...reveal}
          className="mt-6 font-mono text-xs text-chirp-stone-400"
        >
          Powered by Qwen 2.5 1.5B · runs locally · ~1 GB model
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Features                                               */
/* ------------------------------------------------------------------ */

function DictionaryVisual() {
  const words = [
    { word: "Anthropic" },
    { word: "Kubernetes" },
    { word: "HIPAA" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-surface">
      <div className="space-y-3">
        {words.map((item) => (
          <div
            key={item.word}
            className="flex items-center gap-3 text-sm text-chirp-stone-700"
          >
            <span className="text-chirp-amber-500">✓</span>
            <span className="font-mono">{item.word}</span>
          </div>
        ))}
      </div>
      <div className="my-4 border-b border-black/[0.06]" />
      <div className="space-y-1">
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded bg-chirp-stone-100 px-2 py-0.5 font-mono text-xs text-chirp-stone-500">
            /sig
          </span>
          <span className="text-chirp-stone-400">→</span>
          <span className="text-chirp-stone-600">
            &ldquo;Best regards, Alex&rdquo;
          </span>
        </div>
      </div>
    </div>
  );
}

function HistoryVisual() {
  const entries = [
    {
      text: "I was thinking we should move the standup to Thurs...",
      time: "2 min ago",
    },
    {
      text: "Can you send me the updated design files for the...",
      time: "15 min ago",
    },
    {
      text: "The deployment went smoothly, no issues on produ...",
      time: "1 hr ago",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-surface">
      <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-wide text-chirp-stone-400">
        Today
      </span>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.time} className="flex items-start justify-between gap-4">
            <p className="truncate text-sm text-chirp-stone-700">
              {entry.text}
            </p>
            <span className="shrink-0 font-mono text-xs text-chirp-stone-400">
              {entry.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-chirp-stone-50 px-6 py-32">
      <div className="mx-auto max-w-[1120px] space-y-32">
        {/* Feature 1 — Global Hotkey */}
        <FeatureRow
          visual={<KeyBadge />}
          title="Works in every app."
          body="One hotkey from anywhere — your browser, your editor, your email. Chirp transcribes and pastes right at your cursor."
          caption="Default: Ctrl+Shift+Space · fully customizable"
        />

        {/* Feature 2 — Noise Suppression */}
        <FeatureRow
          reverse
          visual={<Waveform />}
          title="Hear you, not your surroundings."
          body="Chirp filters background noise before transcription. Keyboard clatter, AC hum, the coffee shop — filtered out."
        />

        {/* Feature 3 — Dictionary & Snippets */}
        <FeatureRow
          visual={<DictionaryVisual />}
          title="Your words. Your terms."
          body="Add names, jargon, and technical terms to your dictionary. Save frequently used phrases as snippets and trigger them instantly."
        />

        {/* Feature 4 — History */}
        <FeatureRow
          reverse
          visual={<HistoryVisual />}
          title="Everything you've said. Nothing we've heard."
          body="Your transcription history lives on your device. Search, copy, review — then delete it if you want. We'll never know it existed."
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Close / CTA                                            */
/* ------------------------------------------------------------------ */

function CloseSection() {
  return (
    <section className="relative overflow-hidden px-6 py-40">
      <AmberWarmth className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        {...staggerContainer}
        className="relative mx-auto flex flex-col items-center text-center"
      >
        <motion.div {...staggerChild}>
          <BirdMark size={80} color="rgba(245,158,11,0.15)" />
        </motion.div>

        <motion.h2
          {...staggerChild}
          className="mt-8 font-display text-4xl font-extrabold tracking-tight text-chirp-stone-900 md:text-[56px]"
        >
          Try Chirp.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-4 font-body text-xl font-medium text-chirp-stone-500"
        >
          Free. Private. Yours.
        </motion.p>

        <motion.div {...staggerChild} className="relative mt-10">
          <AmberWarmth
            tight
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <Link
            href="/download"
            className="relative inline-flex h-12 items-center rounded-full bg-chirp-amber-500 px-8 font-display font-bold text-white shadow-amber transition-all hover:bg-chirp-amber-600 hover:shadow-amber-hover"
          >
            Download for Windows
          </Link>
        </motion.div>

        <motion.p
          {...staggerChild}
          className="mt-3 font-mono text-xs text-chirp-stone-400"
        >
          {PRODUCT.version} · {PRODUCT.os}
        </motion.p>

        <div className="mx-auto mt-16 max-w-[200px] border-t border-black/[0.06]" />

        <motion.div
          {...staggerChild}
          className="mt-8 flex items-center gap-6"
        >
          <a
            href={PRODUCT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-chirp-stone-500 transition-colors hover:text-chirp-stone-900"
          >
            GitHub
          </a>
          <Link
            href="/faq"
            className="text-sm text-chirp-stone-500 transition-colors hover:text-chirp-stone-900"
          >
            FAQ
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-chirp-stone-500 transition-colors hover:text-chirp-stone-900"
          >
            Privacy
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Combined Export                                                     */
/* ------------------------------------------------------------------ */

export function HomeSections() {
  return (
    <>
      <PrivacySection />
      <CleanupSection />
      <FeaturesSection />
      <CloseSection />
    </>
  );
}
