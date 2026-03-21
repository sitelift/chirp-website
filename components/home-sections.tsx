"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";
import { CleanupDemo } from "@/components/cleanup-demo";
import { FeatureRow } from "./feature-row";
import { ArchitectureDemo } from "./architecture-demo";
import { IntegrationGrid } from "./integration-grid";
import { FeatureCard } from "./feature-card";
import {
  ShieldCheck,
  Heart,
  CreditCard,
  HelpCircle,
  Sparkles,
  Eraser,
  Type,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Founder's Note · WHY — right after hero                            */
/* ------------------------------------------------------------------ */

function FounderNoteSection() {
  return (
    <section className="bg-white px-6 py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[720px]">
        <motion.div {...reveal} className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          <img
            src="/pieter.jpg"
            alt="Pieter de Bruijn"
            className="w-16 h-16 rounded-2xl object-cover border border-chirp-stone-200 shadow-subtle bg-chirp-stone-100 flex-shrink-0"
          />
          <div>
            <blockquote className="font-body text-xl md:text-2xl font-medium leading-[1.7] text-chirp-stone-700">
              &quot;I built Chirp because every voice-to-text tool I tried was either cloud-only, subscription-gated, or both. Your voice shouldn&apos;t require a monthly fee.&quot;
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span className="font-display font-bold text-chirp-stone-900">Pieter de Bruijn</span>
              <span className="text-chirp-stone-300">/</span>
              <span className="text-chirp-stone-500 text-sm font-medium">Creator of Chirp</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Privacy · HOW — local processing explained                         */
/* ------------------------------------------------------------------ */

function PrivacySection() {
  return (
    <section className="bg-white px-6 py-16 md:py-24 lg:py-28 overflow-hidden relative border-t border-chirp-stone-100">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-chirp-amber-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-chirp-amber-400/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full mb-12">
          <span className="pill-label pill-label-light">How It Works</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl lg:text-6xl">
            Your voice never leaves<br className="hidden md:block" /> your machine.
          </h2>
          <p className="mt-5 text-xl leading-[1.6] text-chirp-stone-500 max-w-[640px] mx-auto">
            Most voice-to-text tools route your audio through a remote server. Chirp processes everything on your CPU. Your voice stays on your machine.
          </p>
        </motion.div>

        <div className="w-full flex justify-center">
          <motion.div {...reveal}>
            <ArchitectureDemo />
          </motion.div>
        </div>

        <motion.div {...reveal} className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-4 font-mono text-xs text-chirp-stone-400 tracking-[0.2em] uppercase text-center">
          <span>Zero servers</span>
          <span className="text-chirp-stone-200">/</span>
          <span>Zero telemetry</span>
          <span className="text-chirp-stone-200">/</span>
          <span>Zero network calls</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Free Forever · HOW — no cost explained                             */
/* ------------------------------------------------------------------ */

function FreeForeverSection() {
  return (
    <section className="px-6 py-16 md:py-24 lg:py-28 overflow-hidden border-t border-chirp-stone-100">
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center">
        <motion.div {...reveal} className="text-center w-full">
          <span className="pill-label pill-label-light">Free Forever</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Free. No asterisk.
          </h2>
          <p className="mt-5 text-lg leading-[1.75] text-chirp-stone-500 max-w-[520px] mx-auto">
            Chirp costs nothing. No subscription, no usage cap, no credit card. Use it as much as you want, for as long as you want.
          </p>
        </motion.div>

        <motion.div {...reveal} className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          <FeatureCard
            icon={Heart}
            title="No account needed"
            description="Download and go. Nothing to sign up for. No email, no password."
            variant="light"
          />
          <FeatureCard
            icon={CreditCard}
            title="No subscription"
            description="Not now, not ever. No payment info, no 'upgrade' prompts."
            variant="light"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="No catch"
            description="We don't sell your data. We don't show ads. It's just free."
            variant="light"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Smart Cleanup · WHAT — flagship feature                            */
/* ------------------------------------------------------------------ */

function SmartCleanupSection() {
  return (
    <section className="bg-white bg-dotted px-6 py-16 md:py-24 lg:py-28 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-chirp-amber-400/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto flex w-full max-w-[860px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full">
          <span className="pill-label pill-label-light">Cleanup</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            From rambling to ready.
          </h2>
          <p className="mt-5 text-lg leading-[1.75] text-chirp-stone-500 max-w-[520px] mx-auto">
            Chirp cleans up your speech as you talk. Filler words, grammar, and punctuation get corrected on the fly.
          </p>
        </motion.div>

        <motion.div {...reveal} className="w-full mt-10">
          <CleanupDemo />
        </motion.div>

        <motion.div {...reveal} className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl bg-chirp-stone-50 p-4">
            <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-chirp-amber-500" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-bold text-chirp-stone-900">Tone modes</p>
              <p className="text-xs text-chirp-stone-500">Casual, email, or formal</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-chirp-stone-50 p-4">
            <Eraser className="mt-0.5 h-5 w-5 flex-shrink-0 text-chirp-amber-500" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-bold text-chirp-stone-900">Filler removal</p>
              <p className="text-xs text-chirp-stone-500">Um, uh, like, you know</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-chirp-stone-50 p-4">
            <Type className="mt-0.5 h-5 w-5 flex-shrink-0 text-chirp-amber-500" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-bold text-chirp-stone-900">Grammar fix</p>
              <p className="text-xs text-chirp-stone-500">Punctuation and structure</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features · WHAT — alternating rows                                 */
/* ------------------------------------------------------------------ */

const noisyHeights = [
  [8, 36, 12, 38], [8, 28, 18, 32], [8, 40, 8, 26], [8, 20, 22, 34],
  [8, 32, 14, 40], [8, 24, 20, 28], [8, 38, 10, 36], [8, 16, 24, 30],
  [8, 34, 16, 38], [8, 22, 26, 32], [8, 40, 12, 24], [8, 18, 28, 36],
  [8, 30, 14, 40], [8, 26, 20, 28], [8, 36, 8, 34], [8, 14, 22, 30],
  [8, 32, 18, 38], [8, 20, 24, 26], [8, 38, 10, 36], [8, 16, 28, 32],
  [8, 34, 12, 40], [8, 24, 20, 28], [8, 30, 16, 36], [8, 18, 26, 34],
  [8, 36, 14, 30], [8, 22, 22, 38], [8, 28, 10, 32], [8, 20, 24, 36],
];
const noisyDurations = [1.2, 1.5, 1.4, 1.8, 1.3, 1.6, 1.5, 1.7, 1.2, 1.4, 1.6, 1.3, 1.5, 1.8, 1.2, 1.6, 1.4, 1.7, 1.3, 1.5, 1.8, 1.2, 1.6, 1.4, 1.3, 1.7, 1.5, 1.8];

function NoiseSuppVisual() {
  return (
    <div className="rounded-2xl bg-white shadow-surface border border-chirp-stone-100 p-6 md:p-8">
      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] font-bold text-chirp-stone-400 uppercase tracking-wider">Input</span>
          </div>
          <div className="flex items-end gap-[3px] h-10">
            {noisyHeights.map((heights, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-chirp-stone-200"
                animate={{ height: heights }}
                transition={{ repeat: Infinity, duration: noisyDurations[i], ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-chirp-stone-100" />
          <span className="font-mono text-[9px] font-bold text-chirp-amber-600 uppercase tracking-widest">noise suppressed</span>
          <div className="h-px flex-1 bg-chirp-stone-100" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] font-bold text-chirp-amber-500 uppercase tracking-wider">Output</span>
          </div>
          <div className="flex items-end gap-[3px] h-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-chirp-amber-400"
                animate={{ height: [6, 10 + Math.sin(i * 0.5) * 16, 8 + Math.cos(i * 0.3) * 12, 6] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DictionaryVisual() {
  return (
    <div className="rounded-2xl bg-white shadow-surface border border-chirp-stone-100 p-6 md:p-8">
      <div className="space-y-3">
        {["Anthropic", "Kubernetes", "HIPAA"].map((word) => (
          <div key={word} className="flex items-center justify-between py-2 px-3 rounded-xl bg-chirp-stone-50">
            <span className="font-mono text-sm text-chirp-stone-700">{word}</span>
            <Check className="w-4 h-4 text-chirp-amber-500" />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-chirp-stone-100">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] font-bold text-chirp-stone-400 uppercase tracking-wider">Snippet</span>
        </div>
        <div className="py-2 px-3 rounded-xl bg-chirp-amber-50/50 border border-chirp-amber-200/30">
          <span className="font-mono text-xs text-chirp-amber-700">/sig</span>
          <span className="font-mono text-xs text-chirp-stone-400 mx-2">&rarr;</span>
          <span className="text-xs text-chirp-stone-600">&quot;Best regards, Pieter&quot;</span>
        </div>
      </div>
    </div>
  );
}

function HistoryVisual() {
  return (
    <div className="rounded-2xl bg-white shadow-surface border border-chirp-stone-100 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[10px] font-bold text-chirp-stone-400 uppercase tracking-wider">Today</span>
      </div>
      <div className="space-y-3">
        {[
          { text: "Meeting notes about the Q2 product roadmap and timeline...", time: "2:34 PM" },
          { text: "Quick email reply to the design team about the new mockups...", time: "2:12 PM" },
          { text: "Slack message to Sarah about the deployment schedule...", time: "1:45 PM" },
        ].map((entry, i) => (
          <div key={i} className="py-3 px-4 rounded-xl bg-chirp-stone-50 flex items-start justify-between gap-4">
            <p className="text-sm text-chirp-stone-700 line-clamp-1 flex-1">{entry.text}</p>
            <span className="font-mono text-[10px] text-chirp-stone-400 flex-shrink-0 pt-0.5">{entry.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageVisual() {
  return (
    <div className="rounded-2xl bg-white shadow-surface border border-chirp-stone-100 p-6 md:p-8">
      <div className="grid grid-cols-3 gap-2">
        {[
          { lang: "English", flag: "🇺🇸" },
          { lang: "Español", flag: "🇪🇸" },
          { lang: "Français", flag: "🇫🇷" },
          { lang: "Deutsch", flag: "🇩🇪" },
          { lang: "日本語", flag: "🇯🇵" },
          { lang: "中文", flag: "🇨🇳" },
        ].map(({ lang, flag }) => (
          <div key={lang} className="flex items-center gap-2 py-2 px-3 rounded-xl bg-chirp-stone-50">
            <span className="text-base">{flag}</span>
            <span className="text-xs font-medium text-chirp-stone-700 truncate">{lang}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-chirp-stone-100 text-center">
        <span className="font-mono text-xs text-chirp-stone-400">+ 19 more languages</span>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="px-6 py-16 md:py-24 lg:py-28 overflow-hidden border-t border-chirp-stone-100 bg-chirp-stone-50/30">
      <div className="mx-auto max-w-[1120px] space-y-20 md:space-y-32">
        <FeatureRow
          visual={<NoiseSuppVisual />}
          title="Hear you, not your surroundings."
          body="Chirp filters background noise before transcription. Keyboard clatter, AC hum, the coffee shop — filtered out so your words come through clean."
          caption="Built-in noise suppression · always on"
        />
        <FeatureRow
          reverse
          visual={<DictionaryVisual />}
          title="Your words. Your terms."
          body="Add names, jargon, and technical terms to your dictionary so Chirp gets them right every time. Save frequently used phrases as snippets and trigger them instantly."
          caption="Custom dictionary + text snippets"
        />
        <FeatureRow
          visual={<HistoryVisual />}
          title="Everything you've said. Nothing we've heard."
          body="Your transcription history lives on your device. Search, copy, review — then delete it if you want. We'll never know it existed."
          caption="Local-only transcription history"
        />
        <FeatureRow
          reverse
          visual={<LanguageVisual />}
          title="25 languages. Zero setup."
          body="Transcribe in 25 languages out of the box with automatic language detection. No plugins, no downloads, no configuration."
          caption="Auto-detection · no internet required"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Integrations · WHAT — horizontal scroll                            */
/* ------------------------------------------------------------------ */

function IntegrationSection() {
  return (
    <section className="bg-white px-6 py-16 md:py-24 lg:py-28 overflow-hidden border-t border-chirp-stone-100 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-chirp-amber-400/5 blur-[100px] pointer-events-none" />
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full mb-10">
          <span className="pill-label pill-label-light">Compatible</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Works with your stack.
          </h2>
          <p className="mt-5 text-lg leading-[1.75] text-chirp-stone-500 max-w-[540px] mx-auto">
            Chirp pastes text at your cursor. If it accepts keyboard input, it works with Chirp.
          </p>
        </motion.div>
      </div>

      {/* Full-width horizontal scroll */}
      <div className="relative mt-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="mx-auto w-fit">
            <IntegrationGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "Is it really 100% private?",
    a: "Yes. Chirp uses local AI models that run on your computer's CPU. No audio data leaves your machine. We don't even have a server to send it to."
  },
  {
    q: "How is it free forever?",
    a: "Chirp is a side project. Since it runs entirely on your hardware, there are no server costs to pass on to you."
  },
  {
    q: "Does it work in languages other than English?",
    a: "Yes. Chirp supports 25 languages out of the box, including Spanish, French, German, Japanese, and Chinese."
  },
  {
    q: "Can I use it with specialized jargon?",
    a: "Yes. You can add technical terms, names, and industry-specific jargon to your custom dictionary in the settings to ensure perfect transcription."
  }
];

function FAQSection() {
  return (
    <section className="px-6 py-16 md:py-24 lg:py-28 overflow-hidden border-t border-chirp-stone-100 bg-white">
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center">
        <motion.div {...reveal} className="text-center w-full mb-10">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-white border border-chirp-stone-100 hover:border-chirp-amber-200 hover:shadow-subtle transition-all cursor-default"
            >
              <h3 className="font-display font-bold text-lg text-chirp-stone-900 flex items-center gap-3">
                <div className="h-6 w-6 rounded-lg bg-chirp-stone-50 flex items-center justify-center group-hover:bg-chirp-amber-50 transition-colors">
                  <HelpCircle className="w-4 h-4 text-chirp-stone-400 group-hover:text-chirp-amber-500" />
                </div>
                {faq.q}
              </h3>
              <p className="mt-4 text-chirp-stone-500 leading-relaxed pl-9">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Close / CTA · Background image                                     */
/* ------------------------------------------------------------------ */

function CloseSection() {
  return (
    <section className="relative px-6 py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background image — visual bookend with hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/footer-bg.jpeg')" }}
      />
      {/* Dark overlay for text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/40"
      />

      <motion.div
        {...staggerContainer}
        className="mx-auto flex flex-col items-center text-center max-w-[800px] relative z-10"
      >
        <motion.div {...staggerChild}>
          <BirdMark size={80} color="rgba(245,158,11,0.15)" className="mb-8" />
        </motion.div>

        <motion.h2
          {...staggerChild}
          className="font-display text-5xl font-extrabold tracking-tight text-white md:text-6xl"
        >
          Try Chirp.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-5 text-[20px] font-medium text-chirp-stone-400"
        >
          Free. Private. Yours.
        </motion.p>

        <motion.div {...staggerChild} className="mt-8 relative group">
          <div className="absolute inset-0 bg-chirp-amber-400/20 rounded-full blur-xl group-hover:bg-chirp-amber-400/30 transition-colors" />
          <Link
            href="/download"
            className="relative inline-flex h-14 items-center justify-center rounded-full bg-chirp-amber-500 px-10 font-display text-lg font-bold text-white transition-all hover:bg-chirp-amber-600 shadow-amber"
          >
            Download for Free
          </Link>
        </motion.div>

        <motion.p
          {...staggerChild}
          className="mt-3 font-mono text-xs text-chirp-stone-500"
        >
          {PRODUCT.version} · Free forever
        </motion.p>

        <div className="mx-auto mt-12 w-[120px] border-t border-white/[0.06]" />

        <motion.div
          {...staggerChild}
          className="mt-8 flex items-center justify-center gap-8"
        >
          <Link
            href="/faq"
            className="text-sm font-medium text-chirp-stone-400 transition-colors hover:text-white"
          >
            FAQ
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium text-chirp-stone-400 transition-colors hover:text-white"
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
    <main className="relative z-10 bg-white">
      <FounderNoteSection />
      <PrivacySection />
      <FreeForeverSection />
      <SmartCleanupSection />
      <FeaturesSection />
      <IntegrationSection />
      <FAQSection />
      <CloseSection />
    </main>
  );
}
