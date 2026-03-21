"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";
import { WorkflowDemo } from "./workflow-demo";
import { IntegrationGrid } from "./integration-grid";
import { PowerTools } from "./power-tools";
import { LogoStrip } from "./logo-strip";
import { FeatureCard } from "./feature-card";
import {
  ShieldCheck,
  Heart,
  CreditCard,
  HelpCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Workflow Demo — shows the product in action                        */
/* ------------------------------------------------------------------ */

function WorkflowDemoSection() {
  return (
    <section className="bg-white px-6 py-28 md:py-40 lg:py-48 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-chirp-stone-50/50 blur-[80px] pointer-events-none" />
      
      <div className="mx-auto flex w-full max-w-[860px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full mb-12">
          <span className="pill-label pill-label-light">The Workflow</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Press. Speak. Done.
          </h2>
          <p className="mt-5 text-lg leading-[1.75] text-chirp-stone-500 max-w-[520px] mx-auto">
            Chirp is always ready. Press the hotkey, speak your mind, and watch the AI extract your thoughts perfectly into any text field.
          </p>
        </motion.div>

        <motion.div {...reveal} className="w-full relative">
          <WorkflowDemo />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Integrations — Works Where You Do                                  */
/* ------------------------------------------------------------------ */

function IntegrationsSection() {
  return (
    <section className="bg-white px-6 py-28 md:py-40 lg:py-48 overflow-hidden relative">
      <div className="mx-auto flex w-full max-w-[860px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full">
          <span className="pill-label pill-label-light">Seamless Integration</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Works where you do.
          </h2>
          <p className="mt-5 text-lg leading-[1.75] text-chirp-stone-500 max-w-[520px] mx-auto">
            Chirp isn't a walled garden. There's no app to switch to. You just press the hotkey, speak, and the clean text drops perfectly into wherever your cursor is.
          </p>
        </motion.div>
        
        <IntegrationGrid />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Power Tools — Bento Grid                                           */
/* ------------------------------------------------------------------ */

function PowerToolsSection() {
  return (
    <section className="bg-white px-6 py-28 md:py-40 lg:py-48 overflow-hidden border-t border-chirp-stone-100 bg-dotted relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-chirp-stone-50/50 blur-[80px] pointer-events-none" />
      
      <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full mb-8">
          <span className="pill-label pill-label-light">Complete Control</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Heavyweight power. <br className="hidden md:block" /> Lightweight footprint.
          </h2>
        </motion.div>

        <PowerTools />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Privacy — "Speak freely" reprise                                   */
/* ------------------------------------------------------------------ */

function PrivacySection() {
  return (
    <section className="bg-white px-6 py-28 md:py-40 overflow-hidden relative border-t border-chirp-stone-100">
      <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center relative z-10">
        <motion.div {...reveal} className="text-center w-full">
          <span className="pill-label pill-label-light">Absolute Privacy</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl lg:text-6xl">
            Your voice never leaves<br className="hidden md:block" /> your laptop.
          </h2>
          <p className="mt-6 text-xl leading-[1.6] text-chirp-stone-500 max-w-[640px] mx-auto">
            Everything runs locally on your own CPU. No telemetry, no API calls, no servers. Built from the ground up for strict confidentiality.
          </p>
        </motion.div>

        <motion.div {...staggerContainer} className="mt-16 grid grid-cols-3 gap-8 md:gap-16 w-full max-w-[700px] text-center">
          <motion.div {...staggerChild} className="flex flex-col items-center">
            <span className="font-display text-6xl md:text-7xl font-extrabold text-chirp-stone-900 leading-none">0</span>
            <span className="mt-3 font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] text-chirp-stone-400 uppercase">servers</span>
          </motion.div>
          <motion.div {...staggerChild} className="flex flex-col items-center">
            <span className="font-display text-6xl md:text-7xl font-extrabold text-chirp-stone-900 leading-none">0</span>
            <span className="mt-3 font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] text-chirp-stone-400 uppercase">network calls</span>
          </motion.div>
          <motion.div {...staggerChild} className="flex flex-col items-center">
            <span className="font-display text-6xl md:text-7xl font-extrabold text-chirp-stone-900 leading-none">0</span>
            <span className="mt-3 font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] text-chirp-stone-400 uppercase">bytes transmitted</span>
          </motion.div>
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
    <section className="bg-chirp-stone-50 px-6 py-28 md:py-40 lg:py-48 overflow-hidden border-t border-chirp-stone-200">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center relative z-10">
        
        <motion.div {...reveal} className="w-full rounded-[32px] bg-white border border-chirp-stone-200 shadow-elevated p-8 md:p-12 flex items-center justify-between text-left relative overflow-hidden flex-col md:flex-row gap-8">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-chirp-amber-400/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="h-14 w-14 mb-6 rounded-2xl bg-chirp-amber-50 border border-chirp-amber-100 flex items-center justify-center shadow-inner">
               <Heart className="w-7 h-7 text-chirp-amber-500" strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tighter text-chirp-stone-900 leading-[1.0]">
              Free. No asterisk.
            </h2>
            
            <p className="mt-4 text-lg leading-[1.6] text-chirp-stone-500 max-w-[480px] font-medium">
              No subscriptions. No credit cards. No artificial limits. Built for the community, forever.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-4 font-mono text-[13px] uppercase tracking-widest text-chirp-stone-500 font-bold bg-chirp-stone-50 p-6 rounded-2xl border border-chirp-stone-100 w-full md:w-auto">
            <span className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-chirp-success"/> 100% Secure</span>
            <span className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-chirp-amber-500"/> Zero Cost</span>
          </div>
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
    <section className="bg-white px-6 py-28 md:py-40 overflow-hidden relative border-t border-chirp-stone-100">
      <div className="mx-auto max-w-[900px] flex flex-col items-center text-center">
        <motion.div {...reveal} className="flex flex-col items-center gap-12">
          <img
            src="/pieter.jpg"
            alt="Pieter de Bruijn"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-elevated border-4 border-white"
          />
          <div>
            <blockquote className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tighter text-chirp-stone-900 mb-10">
              "Your voice shouldn't require a monthly fee. I built Chirp to run entirely on your own hardware."
            </blockquote>
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="font-display text-xl font-bold text-chirp-stone-900 uppercase tracking-widest">Pieter de Bruijn</span>
              <span className="font-mono text-[11px] font-bold text-chirp-amber-700 uppercase tracking-widest bg-chirp-amber-50 border border-chirp-amber-200/50 px-4 py-1.5 rounded-full shadow-subtle">
                Creator of Chirp
              </span>
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
          className="font-display text-7xl font-extrabold tracking-tighter text-white md:text-8xl lg:text-[10rem] leading-none mb-2"
        >
          Try Chirp.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-6 text-[22px] font-medium text-chirp-stone-400"
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
      <IntegrationsSection />
      <PowerToolsSection />
      <PrivacySection />
      <FreeForeverSection />
      <FounderNoteSection />
      <FAQSection />
      <CloseSection />
    </main>
  );
}
