"use client";

import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";

// Power Tools — three feature cards on the open dark canvas, each
// previewing a real shipped-app pattern (vocabulary entries,
// snippet expansion, Smart Cleanup segmented control). No marketing
// fluff, no decorative icons, no fake screenshots — the cards ARE
// the app's vocabulary, rendered at marketing scale.
//
// Layout: centered halo headline, brief subhead, three card-surface
// columns with hover-lift. Cards breathe — clamp their width and
// spread them across a 1180px container.

const VOCABULARY_ENTRIES = [
  { spoken: "Anthropic", written: "Anthropic" },
  { spoken: "Claude", written: "Claude" },
  { spoken: "Tauri", written: "Tauri" },
  { spoken: "Sherpa Onyx", written: "sherpa-onnx" },
  { spoken: "Pieter", written: "Pieter" },
];

export function PowerToolsScene() {
  return (
    <section
      id="power-tools"
      className="relative overflow-hidden px-6 py-32 md:py-44 lg:py-52"
    >
      {/* Section halo bloom — subtle, anchors the scene without
          competing with the cards. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.035) 0%, transparent 60%)",
        }}
      />

      <motion.div
        {...staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center"
      >
        <motion.h2
          {...staggerChild}
          className="halo-hero relative mx-auto max-w-[16ch] text-center font-display font-semibold leading-[0.96] tracking-tight text-white"
          style={{
            fontSize: "clamp(36px, 5.4vw, 72px)",
            letterSpacing: "-0.025em",
          }}
        >
          Tuned for how you talk.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-6 max-w-[44ch] text-center font-body text-base leading-relaxed text-white/55 md:text-[17px]"
        >
          Custom vocabulary, voice snippets, and on-device cleanup —
          three places Chirp adapts to the words you actually use.
        </motion.p>

        <motion.div
          {...staggerContainer}
          className="mt-20 grid w-full grid-cols-1 gap-6 md:mt-24 md:grid-cols-3 md:gap-7"
        >
          <motion.div {...staggerChild}>
            <FeatureCard
              title="Vocabulary"
              body="Teach Chirp the proper nouns and technical terms you actually use. The model bakes them into its alphabet so they land right the first time."
              preview={<VocabularyPreview />}
            />
          </motion.div>
          <motion.div {...staggerChild}>
            <FeatureCard
              title="Snippets"
              body="Bind a short voice trigger to a chunk of text. Say two words, get a paragraph — sign-offs, addresses, boilerplate."
              preview={<SnippetPreview />}
            />
          </motion.div>
          <motion.div {...staggerChild}>
            <FeatureCard
              title="Smart Cleanup"
              body="Filler words, run-ons, spoken punctuation — polished on-device by a local language model. Off, Local, or your own cloud key."
              preview={<CleanupPreview />}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface FeatureCardProps {
  title: string;
  body: string;
  preview: React.ReactNode;
}

function FeatureCard({ title, body, preview }: FeatureCardProps) {
  return (
    <article className="card-surface card-surface-hover group flex h-full flex-col overflow-hidden">
      {/* Top: stylized preview frame, fixed aspect for visual rhythm. */}
      <div className="relative h-[200px] overflow-hidden border-b border-white/[0.06] bg-[#0A0A0C]">
        {/* Inner dotted bg + soft amber halo behind the preview. */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(240,183,35,0.10) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          {preview}
        </div>
      </div>

      {/* Body: title + description. */}
      <div className="flex flex-1 flex-col gap-3 px-6 py-7">
        <h3 className="font-display text-[20px] font-semibold tracking-tight text-white">
          {title}
        </h3>
        <p className="font-body text-[14px] leading-relaxed text-white/55 md:text-[14.5px]">
          {body}
        </p>
      </div>
    </article>
  );
}

// ── Feature previews — all built from real app vocabulary ─────

function VocabularyPreview() {
  return (
    <div className="w-full max-w-[280px] space-y-1.5">
      {VOCABULARY_ENTRIES.slice(0, 4).map((entry, i) => (
        <div
          key={entry.spoken}
          className="flex items-center justify-between gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] tracking-tight"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <span className="text-white/45">{entry.spoken}</span>
          <span className="text-white/15">→</span>
          <span className="truncate text-white/85">{entry.written}</span>
        </div>
      ))}
    </div>
  );
}

function SnippetPreview() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-3">
      <div className="flex items-center justify-between rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em]">
        <span className="text-white/45">trigger</span>
        <span className="text-white/85">sign off</span>
      </div>
      <div className="flex justify-center text-white/20">
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
      <div className="rounded-md border border-white/[0.06] bg-white/[0.015] px-3 py-2.5 font-body text-[12.5px] leading-[1.55] text-white/85">
        Best,
        <br />
        Pieter
      </div>
    </div>
  );
}

function CleanupPreview() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-3">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] p-0.5">
        <Pill label="Off" />
        <Pill label="Local" active />
        <Pill label="Cloud" />
      </div>
      <div className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/55">
        <span>Tone</span>
        <span className="flex items-center gap-2 text-white/85">
          <span className="h-1.5 w-1.5 rounded-full bg-chirp-amber-400 shadow-[0_0_8px_rgba(240,183,35,0.55)]" />
          Message
        </span>
      </div>
    </div>
  );
}

function Pill({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 font-display text-[12px] ${
        active ? "bg-white/[0.10] text-white" : "text-white/45"
      }`}
    >
      {label}
    </span>
  );
}
