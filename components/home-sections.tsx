"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT, HOME_PREVIEW_FAQS } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";
import { IntegrationGrid } from "./integration-grid";
import { PowerTools } from "./power-tools";
import {
  ShieldCheck,
  Heart,
  CreditCard,
  HelpCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Integrations — Works Where You Do                                  */
/* ------------------------------------------------------------------ */

function IntegrationsSection() {
  return (
    <section className="relative overflow-hidden border-t border-chirp-stone-100 bg-chirp-amber-50 px-6 py-28 md:py-36 lg:py-44">
      <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div {...reveal} className="text-center lg:text-left">
          <span className="pill-label pill-label-light">Seamless Integration</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Works where you do.
          </h2>
          <p className="mt-6 text-lg leading-[1.85] text-chirp-stone-500 lg:max-w-[480px]">
            Chirp isn&apos;t a walled garden. There&apos;s no app to switch to.
            You just press the hotkey, speak, and the clean text drops perfectly
            into wherever your cursor is.
          </p>
        </motion.div>

        <div className="min-w-0 lg:justify-self-end lg:w-full">
          <IntegrationGrid />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Power Tools — Bento Grid                                           */
/* ------------------------------------------------------------------ */

function PowerToolsSection() {
  return (
    <section className="relative overflow-hidden border-t border-chirp-stone-100 bg-chirp-stone-50 bg-dotted px-6 py-28 md:py-36 lg:py-44">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[600px] w-[600px] rounded-full bg-chirp-stone-50/50 blur-[80px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1060px] flex-col items-center">
        <motion.div {...reveal} className="mb-12 w-full text-center lg:mb-14 lg:text-left">
          <span className="pill-label pill-label-light">Complete Control</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Heavyweight power. <br className="hidden md:block" /> Lightweight
            footprint.
          </h2>
        </motion.div>

        <PowerTools />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Privacy                                                            */
/* ------------------------------------------------------------------ */

function PrivacySection() {
  return (
    <section className="relative overflow-hidden border-t border-chirp-stone-100 bg-white px-6 py-28 md:py-36 lg:py-40">
      <div className="relative z-10 mx-auto flex w-full max-w-[1060px] flex-col items-center">
        <motion.div {...reveal} className="w-full text-center">
          <span className="pill-label pill-label-light">Absolute Privacy</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl lg:text-6xl">
            Your voice never leaves
            <br className="hidden md:block" /> your laptop.
          </h2>
          <p className="mx-auto mt-8 max-w-[640px] text-xl leading-[1.7] text-chirp-stone-500">
            Everything runs locally on your own CPU. No telemetry, no API
            calls, no servers. Built from the ground up for strict
            confidentiality.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="mt-16 flex w-full max-w-[720px] flex-col gap-10 sm:mt-20 sm:flex-row sm:items-stretch sm:justify-center sm:gap-0"
        >
          <motion.div
            {...staggerChild}
            className="flex flex-col items-center text-center sm:flex-1 sm:px-4"
          >
            <span className="font-display text-6xl font-extrabold leading-none text-chirp-stone-900 md:text-7xl">
              0
            </span>
            <span className="mt-3 font-mono text-[11px] font-bold tracking-[0.2em] text-chirp-stone-400 uppercase md:text-xs">
              servers
            </span>
          </motion.div>
          <div
            className="hidden w-px shrink-0 bg-chirp-stone-200 sm:block self-stretch min-h-[4rem]"
            aria-hidden
          />
          <motion.div
            {...staggerChild}
            className="flex flex-col items-center text-center sm:flex-1 sm:px-4"
          >
            <span className="font-display text-6xl font-extrabold leading-none text-chirp-stone-900 md:text-7xl">
              0
            </span>
            <span className="mt-3 font-mono text-[11px] font-bold tracking-[0.2em] text-chirp-stone-400 uppercase md:text-xs">
              network calls
            </span>
          </motion.div>
          <div
            className="hidden w-px shrink-0 bg-chirp-stone-200 sm:block self-stretch min-h-[4rem]"
            aria-hidden
          />
          <motion.div
            {...staggerChild}
            className="flex flex-col items-center text-center sm:flex-1 sm:px-4"
          >
            <span className="font-display text-6xl font-extrabold leading-none text-chirp-stone-900 md:text-7xl">
              0
            </span>
            <span className="mt-3 font-mono text-[11px] font-bold tracking-[0.2em] text-chirp-stone-400 uppercase md:text-xs">
              bytes transmitted
            </span>
          </motion.div>
        </motion.div>

        <p className="mt-12 text-center font-mono text-sm text-chirp-stone-500">
          Offline-first · No analytics · No cloud pipeline
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Free Forever                                                       */
/* ------------------------------------------------------------------ */

function FreeForeverSection() {
  return (
    <section className="overflow-hidden border-t border-chirp-stone-200 bg-chirp-stone-50 px-6 py-28 md:py-36 lg:py-44">
      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center">
        <motion.div
          {...reveal}
          className="relative flex w-full flex-col gap-10 overflow-hidden rounded-[32px] border border-chirp-stone-200 bg-white p-10 shadow-elevated md:flex-row md:items-center md:justify-between md:gap-12 md:p-14"
        >
          <div className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-chirp-amber-400/5 blur-[60px]" />

          <div className="relative z-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-chirp-amber-100 bg-chirp-amber-50 shadow-inner">
              <Heart
                className="h-7 w-7 text-chirp-amber-500"
                strokeWidth={1.5}
              />
            </div>

            <h2 className="font-display text-4xl font-extrabold leading-[1.0] tracking-tighter text-chirp-stone-900 md:text-5xl">
              Free. No asterisk.
            </h2>

            <p className="mt-4 max-w-[480px] text-lg font-medium leading-[1.6] text-chirp-stone-500">
              No subscriptions. No credit cards. No artificial limits. Built for
              the community, forever.
            </p>
          </div>

          <div className="relative z-10 flex w-full flex-col gap-4 rounded-2xl border border-chirp-stone-100 bg-chirp-stone-50 p-6 font-mono text-[13px] font-bold tracking-widest text-chirp-stone-500 uppercase md:w-auto">
            <span className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-chirp-success" /> 100%
              Secure
            </span>
            <span className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-chirp-amber-500" /> Zero Cost
            </span>
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
    <section className="overflow-hidden border-y border-chirp-stone-100 bg-white px-6 py-28 md:py-36 lg:py-40">
      <div className="mx-auto max-w-[1000px]">
        <motion.div
          {...reveal}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[auto_1fr] lg:gap-14"
        >
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <img
              src="/pieter.jpg"
              alt="Pieter de Bruijn"
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-elevated md:h-32 md:w-32"
            />
            <div className="text-center lg:text-left">
              <span className="font-display text-xl font-bold tracking-widest text-chirp-stone-900 uppercase">
                Pieter de Bruijn
              </span>
              <p className="mt-2">
                <span className="inline-block rounded-full border border-chirp-amber-200/50 bg-chirp-amber-50 px-4 py-1.5 font-mono text-[11px] font-bold tracking-widest text-chirp-amber-700 uppercase shadow-subtle">
                  Creator of Chirp
                </span>
              </p>
            </div>
          </div>
          <blockquote className="text-center font-display text-3xl font-extrabold leading-[1.15] tracking-tighter text-chirp-stone-900 md:text-4xl lg:text-left lg:text-5xl">
            &ldquo;Your voice shouldn&apos;t require a monthly fee. I built
            Chirp to run entirely on your own hardware.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

function FAQSection() {
  return (
    <section className="overflow-hidden border-t border-chirp-stone-100 bg-chirp-amber-50 px-6 py-28 md:py-36 lg:py-40">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <motion.div {...reveal} className="mb-14 w-full text-center md:mb-16">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {HOME_PREVIEW_FAQS.map((faq, i) => (
            <motion.div
              key={faq.question}
              {...reveal}
              transition={{ delay: i * 0.06 }}
              className="group cursor-default rounded-2xl border border-chirp-stone-100 bg-white p-7 transition-all hover:border-chirp-amber-200 hover:shadow-subtle md:p-8"
            >
              <h3 className="flex items-start gap-3 font-display text-lg font-bold text-chirp-stone-900">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-chirp-stone-50 transition-colors group-hover:bg-chirp-amber-50">
                  <HelpCircle className="h-4 w-4 text-chirp-stone-400 transition-colors group-hover:text-chirp-amber-500" />
                </div>
                <span>{faq.question}</span>
              </h3>
              <p className="mt-4 leading-relaxed text-chirp-stone-500 pl-9">
                {faq.answer}
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
    <section className="relative overflow-hidden px-6 py-28 md:py-36 lg:py-44">
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
        className="relative z-10 mx-auto flex max-w-[800px] flex-col items-center text-center"
      >
        <motion.div {...staggerChild}>
          <BirdMark size={72} color="rgba(245,158,11,0.15)" className="mb-10" />
        </motion.div>

        <motion.h2
          {...staggerChild}
          className="mb-2 font-display text-7xl font-extrabold tracking-tighter text-white md:text-8xl lg:text-[10rem] leading-none"
        >
          Try Chirp.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-8 text-[22px] font-medium text-chirp-stone-300"
        >
          Free. Private. Yours.
        </motion.p>

        <motion.div {...staggerChild} className="relative mt-10">
          <Link
            href="/download"
            className="inline-flex h-14 min-h-11 items-center justify-center rounded-full bg-chirp-amber-400 px-10 font-display text-lg font-bold text-chirp-stone-900 transition-colors hover:bg-chirp-amber-300"
          >
            Download for Free
          </Link>
        </motion.div>

        <motion.p
          {...staggerChild}
          className="mt-4 font-mono text-xs text-chirp-stone-400"
        >
          {PRODUCT.version} · Free forever
        </motion.p>
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
