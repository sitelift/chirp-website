"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";
import { CleanupDemo } from "@/components/cleanup-demo";
import { OverlayDemo } from "@/components/overlay-demo";
import { SettingsDemo } from "@/components/settings-demo";

/* ------------------------------------------------------------------ */
/*  Section 1 — Core Experience                                        */
/* ------------------------------------------------------------------ */

function CoreExperienceSection() {
  return (
    <section className="bg-white px-6 py-16 md:py-24 overflow-hidden border-t border-chirp-stone-200">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center">
        <motion.div {...reveal} className="max-w-[800px] text-center mb-16">
          <span className="mb-6 inline-flex h-8 items-center rounded-full px-4 font-mono text-xs font-semibold tracking-wide text-chirp-stone-600 bg-chirp-stone-100">
            Hold to talk, release to type
          </span>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-chirp-stone-900 md:text-5xl">
            Perfect dictation. <br/> Wherever your cursor is.
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-xl leading-relaxed text-chirp-stone-600">
            A single hotkey replaces your keyboard. Dictate emails, reports, and messages directly into any app. A beautiful, minimal overlay lets you know it&apos;s listening, then gets instantly out of your way.
          </p>
        </motion.div>

        <motion.div {...reveal} className="w-full">
          <OverlayDemo />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Smart Cleanup                                          */
/* ------------------------------------------------------------------ */

function SmartCleanupSection() {
  return (
    <section className="bg-chirp-stone-50 px-6 py-16 md:py-24 border-t border-chirp-stone-200 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-16 lg:flex-row lg:justify-between">
        
        <motion.div {...reveal} className="max-w-[480px]">
          <span className="mb-6 inline-flex h-8 items-center rounded-full px-4 font-mono text-xs font-semibold tracking-wide text-chirp-stone-600 bg-white border border-chirp-stone-200 shadow-sm">
            Zero rewrite guarantee
          </span>
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            From rambling to ready.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-chirp-stone-600">
            Speak naturally. Chirp removes the <em className="text-chirp-stone-900 font-semibold text-lg not-italic">umms</em> and <em className="text-chirp-stone-900 font-semibold text-lg not-italic">ahhs</em>, fixes your grammar, and applies your preferred tone—Message, Email, Formal, or Casual.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-start gap-4 rounded-lg bg-white p-5 border border-chirp-stone-200 shadow-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chirp-amber-100 text-chirp-amber-600 font-bold text-xs mt-0.5">✓</span>
              <div>
                <h4 className="font-bold text-chirp-stone-900">Self-correcting</h4>
                <p className="text-sm text-chirp-stone-600 mt-1">Say &quot;wait, change that to Friday&quot; and watch the magic happen. Only the correction stays.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full lg:w-auto">
          <CleanupDemo />
        </div>
        
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Productivity Tools                                     */
/* ------------------------------------------------------------------ */

function ProductivityToolsSection() {
  return (
    <section className="bg-white px-6 py-16 md:py-24 border-t border-chirp-stone-200 overflow-hidden">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center">
        <motion.div {...reveal} className="max-w-[800px] text-center mb-16">
          <span className="mb-6 inline-flex h-8 items-center rounded-full px-4 font-mono text-xs font-semibold tracking-wide text-chirp-stone-600 bg-chirp-stone-100">
            Dictionary & Snippets
          </span>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-chirp-stone-900 md:text-5xl">
            Your personal toolkit.
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-xl leading-relaxed text-chirp-stone-600">
            Tailor Chirp to your profession. Teach it your industry jargon so it always spells things right. Use simple voice commands to instantly drop in entire email templates or drag-and-drop a meeting recording to get a full transcript.
          </p>
        </motion.div>

        <SettingsDemo />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Privacy First                                          */
/* ------------------------------------------------------------------ */

function PrivacyFirstSection() {
  return (
    <section className="bg-chirp-stone-50 px-6 py-20 md:py-24 border-t border-chirp-stone-200 overflow-hidden">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center">
        <motion.div {...reveal} className="max-w-[800px] text-center mb-16">
          <span className="mb-6 inline-flex h-8 items-center rounded-full px-4 font-mono text-xs font-semibold tracking-wide text-chirp-stone-600 bg-white border border-chirp-stone-200 shadow-sm">
            100% Local Processing
          </span>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-chirp-stone-900 md:text-5xl">
            Total peace of mind.
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-xl leading-relaxed text-chirp-stone-600">
            Your conversations stay on your computer. With no accounts, no subscriptions, and no telemetry, Chirp is perfect for handling sensitive client data and confidential documents offline.
          </p>
        </motion.div>

        <motion.div {...reveal} className="w-full max-w-[900px] bg-white rounded-xl p-8 md:p-12 border border-chirp-stone-200 flex flex-col items-center shadow-surface">
          <div className="grid w-full gap-8 md:grid-cols-3">
             <div className="flex flex-col text-center items-center">
               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chirp-stone-50 shadow-sm border border-chirp-stone-100">
                 <svg className="w-6 h-6 text-chirp-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
               </div>
               <h4 className="font-bold text-chirp-stone-900">Zero Data Collection</h4>
               <p className="text-sm text-chirp-stone-600 mt-2">Audio buffers never leave your machine.</p>
             </div>
             <div className="flex flex-col text-center items-center">
               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chirp-amber-50 shadow-sm border border-chirp-amber-100">
                 <svg className="w-6 h-6 text-chirp-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
               </div>
               <h4 className="font-bold text-chirp-stone-900">Instant Speed</h4>
               <p className="text-sm text-chirp-stone-600 mt-2">Zero network latency. It types exactly as fast as you speak.</p>
             </div>
             <div className="flex flex-col text-center items-center">
               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chirp-stone-50 shadow-sm border border-chirp-stone-100">
                 <svg className="w-6 h-6 text-chirp-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                 </svg>
               </div>
               <h4 className="font-bold text-chirp-stone-900">Works Offline</h4>
               <p className="text-sm text-chirp-stone-600 mt-2">No internet required. Use it on an airplane or safely remote.</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4.5 — Personas Grid                                        */
/* ------------------------------------------------------------------ */

function PersonasSection() {
  const personas = [
    {
      title: "For Executives",
      role: "Emailing & Strategy",
      desc: "Draft long emails, memos, and strategy documents instantly without looking at the keyboard.",
    },
    {
      title: "For Writers",
      role: "Drafting & Brainstorming",
      desc: "Get your thoughts on paper as fast as you can speak them. Let Chirp handle the formatting and punctuation.",
    },
    {
      title: "For Developers",
      role: "Documentation & Comments",
      desc: "Write complex PR descriptions and inline documentation without breaking your coding flow across IDEs.",
    },
    {
      title: "For Professionals",
      role: "Confidential Dictation",
      desc: "Perfect for legal, medical, and financial use cases where client data cannot legally leave the machine.",
    },
  ];

  return (
    <section className="bg-white px-6 py-20 md:py-24 border-t border-chirp-stone-200 overflow-hidden">
      <div className="mx-auto max-w-[1120px]">
        <motion.div {...reveal} className="mb-16 max-w-[600px]">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-chirp-stone-900 md:text-5xl">
            Built for people who <br /> type for a living.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.title}
              {...reveal}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-xl bg-chirp-stone-50 p-8 border border-chirp-stone-200"
            >
              <span className="mb-6 inline-flex h-10 items-center rounded-full px-4 font-mono text-xs font-semibold tracking-wide text-chirp-stone-600 bg-white border border-chirp-stone-200 w-fit shadow-sm">
                {persona.role}
              </span>
              <h3 className="font-display text-xl font-bold text-chirp-stone-900 mb-4">
                {persona.title}
              </h3>
              <p className="text-base leading-relaxed text-chirp-stone-600">
                {persona.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4.8 — Comparison Deck                                      */
/* ------------------------------------------------------------------ */

function ComparisonSection() {
  const comparison = [
    { feature: "Privacy", chirp: "100% Local Device", cloud: "Sent to Server", builtin: "Sent to Server (usually)" },
    { feature: "Speed", chirp: "Instant", cloud: "Depends on WiFi", builtin: "Depends on WiFi" },
    { feature: "Formatting", chirp: "AI-Powered", cloud: "Good", builtin: "Rules-based (Messy)" },
    { feature: "Cost", chirp: "Free", cloud: "$15-$30 / mo", builtin: "Free" },
  ];

  return (
    <section className="bg-chirp-stone-900 px-6 py-20 md:py-24 overflow-hidden border-t border-chirp-stone-700">
      <div className="mx-auto max-w-[1000px]">
        <motion.div {...reveal} className="mb-16 text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Why Chirp?
          </h2>
        </motion.div>

        <div className="overflow-hidden rounded-2xl bg-chirp-stone-800 border border-chirp-stone-700">
          <table className="w-full text-left font-body text-sm text-chirp-stone-300">
            <thead className="bg-chirp-stone-900/50">
              <tr>
                <th className="p-6 font-medium text-chirp-stone-400 font-mono tracking-wider text-xs">FEATURE</th>
                <th className="p-6 font-display font-medium text-lg text-white">Chirp</th>
                <th className="p-6 font-display font-medium text-lg text-chirp-stone-400">Cloud SaaS</th>
                <th className="p-6 font-display font-medium text-lg text-chirp-stone-400">OS Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chirp-stone-700/50">
              {comparison.map((row) => (
                <tr key={row.feature}>
                  <td className="p-6 font-medium text-white">{row.feature}</td>
                  <td className="p-6 text-chirp-amber-400 font-medium">✓ {row.chirp}</td>
                  <td className="p-6 text-chirp-stone-500">{row.cloud}</td>
                  <td className="p-6 text-chirp-stone-500">{row.builtin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Close / CTA                                            */
/* ------------------------------------------------------------------ */

function CloseSection() {
  return (
    <section className="bg-chirp-stone-50 px-6 py-24 md:py-32 overflow-hidden border-t border-chirp-stone-200">
      <motion.div
        {...staggerContainer}
        className="mx-auto flex flex-col items-center text-center max-w-[800px]"
      >
        <motion.div {...staggerChild}>
          <BirdMark size={64} className="opacity-80 grayscale" />
        </motion.div>

        <motion.h2
          {...staggerChild}
          className="mt-12 font-display text-5xl font-extrabold tracking-tight text-chirp-stone-900 md:text-7xl"
        >
          Speak freely.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-6 text-xl text-chirp-stone-500"
        >
          Free. Private. Yours.
        </motion.p>

        <motion.div {...staggerChild} className="mt-12">
          <Link
            href="/download"
            className="inline-flex h-14 items-center rounded-full bg-chirp-amber-500 px-10 font-display text-lg font-bold text-white transition-all hover:bg-chirp-amber-600"
          >
            Download for Mac & Windows
          </Link>
        </motion.div>

        <motion.p
          {...staggerChild}
          className="mt-4 font-mono text-sm text-chirp-stone-400"
        >
          {PRODUCT.version} · {PRODUCT.os}
        </motion.p>

        <div className="mx-auto mt-16 max-w-[200px] border-t border-chirp-stone-200" />

        <motion.div
          {...staggerChild}
          className="mt-8 flex items-center gap-6"
        >
          <a
            href={PRODUCT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-chirp-stone-500 transition-colors hover:text-chirp-stone-900"
          >
            GitHub
          </a>
          <Link
            href="/faq"
            className="text-sm font-semibold text-chirp-stone-500 transition-colors hover:text-chirp-stone-900"
          >
            FAQ
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-semibold text-chirp-stone-500 transition-colors hover:text-chirp-stone-900"
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
      <CoreExperienceSection />
      <SmartCleanupSection />
      <ProductivityToolsSection />
      <PrivacyFirstSection />
      <PersonasSection />
      <ComparisonSection />
      <CloseSection />
    </>
  );
}
