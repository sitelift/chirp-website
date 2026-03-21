"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";
import { CleanupDemo } from "@/components/cleanup-demo";
import { WorkflowDemo } from "./workflow-demo";
import { LogoStrip } from "./logo-strip";
import { ArchitectureDemo } from "./architecture-demo";
import { FeatureCard } from "./feature-card";
import {
  ShieldCheck,
  Heart,
  CreditCard,
  HelpCircle,
  Sparkles,
  Eraser,
  Type,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Workflow Demo — shows the product in action                        */
/* ------------------------------------------------------------------ */

function WorkflowDemoSection() {
  return (
    <section className="bg-white px-6 py-12 md:py-16 overflow-hidden">
      <motion.div {...reveal} className="mx-auto max-w-[860px]">
        <WorkflowDemo />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scrolling App Logos — trust signal                                  */
/* ------------------------------------------------------------------ */

function LogoStripSection() {
  return (
    <section className="bg-white py-8 md:py-12 overflow-hidden border-t border-chirp-stone-100">
      <LogoStrip />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Smart Cleanup — flagship feature                                   */
/* ------------------------------------------------------------------ */

function SmartCleanupSection() {
  return (
    <section className="bg-white bg-dotted px-6 py-20 md:py-28 lg:py-36 overflow-hidden relative">
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
/*  Privacy — "Speak freely" reprise                                   */
/* ------------------------------------------------------------------ */

function PrivacySection() {
  return (
    <section className="bg-white px-6 py-20 md:py-28 lg:py-36 overflow-hidden relative border-t border-chirp-stone-100">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-chirp-amber-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-chirp-amber-400/3 blur-[100px] pointer-events-none" />

      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full mb-12">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl lg:text-6xl">
            Speak freely — your voice<br className="hidden md:block" /> never leaves your machine.
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
/*  Free Forever                                                       */
/* ------------------------------------------------------------------ */

function FreeForeverSection() {
  return (
    <section className="px-6 py-20 md:py-28 lg:py-36 overflow-hidden border-t border-chirp-stone-100">
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
/*  Founder's Note                                                     */
/* ------------------------------------------------------------------ */

function FounderNoteSection() {
  return (
    <section className="bg-white px-6 py-16 md:py-24 overflow-hidden border-t border-chirp-stone-100">
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
    <section className="px-6 py-20 md:py-28 lg:py-36 overflow-hidden border-t border-chirp-stone-100 bg-white">
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
/*  Close CTA                                                          */
/* ------------------------------------------------------------------ */

function CloseSection() {
  return (
    <section className="relative px-6 py-20 md:py-28 lg:py-36 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/footer-bg.jpeg')" }}
      />
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
      <WorkflowDemoSection />
      <LogoStripSection />
      <SmartCleanupSection />
      <PrivacySection />
      <FreeForeverSection />
      <FounderNoteSection />
      <FAQSection />
      <CloseSection />
    </main>
  );
}
