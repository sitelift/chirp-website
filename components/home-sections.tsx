"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";
import { CleanupDemo } from "@/components/cleanup-demo";
import { KeyboardDemo } from "@/components/keyboard-demo";
import { ArchitectureDemo } from "@/components/architecture-demo";
import { FeatureCard } from "@/components/feature-card";
import { Sparkles, Eraser, Type, Keyboard, BookOpen, Globe, Heart, CreditCard, ShieldCheck } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Section 1 — Smart Cleanup · LIGHT with dots                        */
/* ------------------------------------------------------------------ */

function SmartCleanupSection() {
  return (
    <section className="bg-white bg-dotted px-6 py-20 md:py-32 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-chirp-amber-400/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full">
          <span className="pill-label pill-label-light">Cleanup</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            From rambling to ready.
          </h2>
          <p className="mt-6 text-lg leading-[1.75] text-chirp-stone-500 max-w-[520px] mx-auto">
            Chirp&apos;s local AI cleans up your speech in real time. Filler words, grammar, punctuation. Choose a tone mode and get polished text instantly.
          </p>
        </motion.div>

        <motion.div {...reveal} className="w-full mt-4">
          <CleanupDemo />
        </motion.div>

        <motion.div {...reveal} className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
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
/*  Section 2 — Free Forever · DARK                                     */
/* ------------------------------------------------------------------ */

function FreeForeverSection() {
  return (
    <section className="bg-chirp-stone-900 px-6 py-20 md:py-32 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center">
        <motion.div {...reveal} className="text-center w-full">
          <span className="pill-label pill-label-dark">Free Forever</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
            Free. No asterisk.
          </h2>
          <p className="mt-6 text-lg leading-[1.75] text-chirp-stone-400 max-w-[520px] mx-auto">
            No subscriptions. No &quot;pro&quot; tier. No usage limits. Chirp is free today, free tomorrow, free forever. No credit card, no trial period, no strings attached.
          </p>
        </motion.div>

        <motion.div {...reveal} className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <FeatureCard
            icon={Heart}
            title="No account needed"
            description="Download and go. Nothing to sign up for. No email, no password."
            variant="dark"
          />
          <FeatureCard
            icon={CreditCard}
            title="No subscription"
            description="Not now, not ever. No payment info, no 'upgrade' prompts."
            variant="dark"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="No catch"
            description="We don't sell your data. We don't show ads. It's just free."
            variant="dark"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Band — Thin rhythm breaker                                    */
/* ------------------------------------------------------------------ */

function StatsBand() {
  return (
    <section className="bg-white bg-dotted px-6 py-10 md:py-14 overflow-hidden">
      <motion.div
        {...reveal}
        className="mx-auto flex max-w-[800px] flex-wrap items-center justify-center gap-x-12 gap-y-4 font-mono text-sm tracking-wide"
      >
        <span className="text-chirp-amber-600 font-bold">100% local</span>
        <span className="text-chirp-stone-300" aria-hidden="true">&middot;</span>
        <span className="text-chirp-stone-500">25 languages</span>
        <span className="text-chirp-stone-300" aria-hidden="true">&middot;</span>
        <span className="text-chirp-stone-500">Free forever</span>
        <span className="text-chirp-stone-300" aria-hidden="true">&middot;</span>
        <span className="text-chirp-stone-500">&lt;1 min setup</span>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Works Everywhere · DARK                                 */
/* ------------------------------------------------------------------ */

function WorksEverywhereSection() {
  return (
    <section className="bg-chirp-stone-900 px-6 py-20 md:py-32 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center">
        <motion.div {...reveal} className="text-center w-full">
          <span className="pill-label pill-label-dark">Universal</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
            One hotkey. Every app.
          </h2>
          <p className="mt-6 text-lg leading-[1.75] text-chirp-stone-400 max-w-[520px] mx-auto">
            Press a hotkey from anywhere. Your browser, editor, or email client. Chirp transcribes and pastes right at your cursor.
          </p>
        </motion.div>

        <motion.div {...reveal} className="mt-12 w-full flex justify-center">
          <KeyboardDemo />
        </motion.div>

        <motion.div {...reveal} className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <FeatureCard
            icon={BookOpen}
            title="Custom dictionary"
            description="Add names, jargon, and technical terms so Chirp gets them right."
            variant="dark"
          />
          <FeatureCard
            icon={Keyboard}
            title="Text snippets"
            description="Trigger phrases that expand to full text blocks on command."
            variant="dark"
          />
          <FeatureCard
            icon={Globe}
            title="25 languages"
            description="Transcribe in 25 languages. Built-in support, no plugins or downloads."
            variant="dark"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Privacy · LIGHT with dots                               */
/* ------------------------------------------------------------------ */

function PrivacySection() {
  return (
    <section className="bg-white bg-dotted px-6 py-20 md:py-32 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-chirp-amber-400/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full">
          <span className="pill-label pill-label-light">Privacy</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Your voice never leaves<br />this machine.
          </h2>
          <p className="mt-6 text-lg leading-[1.75] text-chirp-stone-500 max-w-[540px] mx-auto">
            Everything runs on your computer. Your voice is processed right here, never anywhere else. Nothing is uploaded, logged, or transmitted. There is no server.
          </p>
        </motion.div>

        <motion.div {...reveal} className="mt-12 w-full flex justify-center">
          <ArchitectureDemo />
        </motion.div>

        <motion.div {...reveal} className="mt-10 font-mono text-xs text-chirp-stone-500 tracking-widest uppercase text-center">
          Zero servers · Zero telemetry · Zero network calls
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Setup Simplicity · DARK, ASYMMETRIC LAYOUT             */
/* ------------------------------------------------------------------ */

function SetupSection() {
  return (
    <section className="bg-chirp-stone-900 px-6 py-20 md:py-32 overflow-hidden">
      <div className="mx-auto flex w-full max-w-[900px] flex-col md:flex-row md:items-center md:gap-16">
        {/* Left — text */}
        <motion.div {...reveal} className="flex-1 mb-10 md:mb-0">
          <span className="pill-label pill-label-dark">Setup</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
            Download.<br />Install. Done.
          </h2>
          <p className="mt-6 text-lg leading-[1.75] text-chirp-stone-400 max-w-[400px]">
            No API keys. No account creation. No config files. Install Chirp, press the hotkey, start talking. You&apos;ll be up and running in under a minute.
          </p>
        </motion.div>

        {/* Right — visual steps */}
        <motion.div {...reveal} className="flex-1 flex flex-col gap-4 max-w-[360px]">
          <div className="flex items-center gap-4 rounded-2xl bg-chirp-stone-800 border border-chirp-stone-700 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chirp-amber-400/15 font-display text-lg font-bold text-chirp-amber-400 flex-shrink-0">1</div>
            <div>
              <p className="font-display text-sm font-bold text-white">Download the installer</p>
              <p className="text-xs text-chirp-stone-400">~80 MB · Mac or Windows</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-chirp-stone-800 border border-chirp-stone-700 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chirp-amber-400/15 font-display text-lg font-bold text-chirp-amber-400 flex-shrink-0">2</div>
            <div>
              <p className="font-display text-sm font-bold text-white">Run the setup</p>
              <p className="text-xs text-chirp-stone-400">One click. Models download automatically.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-chirp-stone-800 border border-chirp-stone-700 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chirp-amber-400/15 font-display text-lg font-bold text-chirp-amber-400 flex-shrink-0">3</div>
            <div>
              <p className="font-display text-sm font-bold text-white">Press the hotkey and talk</p>
              <p className="text-xs text-chirp-stone-400">Text appears at your cursor. That&apos;s it.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Founder's Note · LIGHT                                 */
/* ------------------------------------------------------------------ */

function FounderNoteSection() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[560px] flex flex-col items-center">
        <motion.div {...reveal} className="w-full">
          <div className="rounded-3xl border border-chirp-stone-200 bg-chirp-stone-50 p-8 md:p-10 flex flex-col">
            <div className="flex items-center gap-3.5 mb-6">
              <img
                src="/pieter.jpg"
                alt="Pieter de Bruijn"
                className="w-12 h-12 rounded-full object-cover border border-chirp-stone-200 shadow-subtle bg-chirp-stone-100 flex-shrink-0"
              />
              <div className="flex flex-col justify-center">
                <span className="font-bold text-chirp-stone-900 text-[15px] leading-snug">Pieter de Bruijn</span>
                <span className="text-chirp-stone-500 text-[13px] font-medium">Creator of Chirp</span>
              </div>
            </div>

            <blockquote className="font-body text-[17px] font-medium leading-[1.8] text-chirp-stone-700">
              &quot;I built Chirp because I got tired of paying for tools that send my voice to someone else&apos;s server. I wanted something that just works&nbsp;&mdash; press a key, talk, done. No accounts, no cloud, no monthly bill. If that&apos;s what you&apos;re looking for, I think you&apos;ll like it.&quot;
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 7 — Close / CTA · Background image                         */
/* ------------------------------------------------------------------ */

function CloseSection() {
  return (
    <section className="relative px-6 py-32 md:py-48 overflow-hidden">
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
          className="mt-6 text-[20px] font-medium text-chirp-stone-400"
        >
          Free. Private. Yours.
        </motion.p>

        <motion.div {...staggerChild} className="mt-12 relative group">
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
          className="mt-4 font-mono text-xs text-chirp-stone-500"
        >
          {PRODUCT.version} · Free forever
        </motion.p>

        <div className="mx-auto mt-20 w-[120px] border-t border-white/[0.06]" />

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
    <>
      <SmartCleanupSection />
      <FreeForeverSection />
      <StatsBand />
      <WorksEverywhereSection />
      <PrivacySection />
      <SetupSection />
      <FounderNoteSection />
      <CloseSection />
    </>
  );
}
