"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import * as Accordion from "@radix-ui/react-accordion";
import { PRODUCT, HOME_PREVIEW_FAQS } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";
import { IntegrationGrid } from "./integration-grid";
import { PowerTools } from "./power-tools";

/* ------------------------------------------------------------------ */
/*  Integrations: Works Where You Do                                  */
/* ------------------------------------------------------------------ */

function IntegrationsSection() {
  return (
    <section className="relative overflow-hidden border-t border-chirp-stone-100 bg-white px-6 py-16 md:py-24 lg:py-28">
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
/*  Power Tools: Bento Grid                                           */
/* ------------------------------------------------------------------ */

function PowerToolsSection() {
  return (
    <section className="relative overflow-hidden border-t border-chirp-stone-100 bg-chirp-stone-50 bg-dotted px-6 py-16 md:py-24 lg:py-28">
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
    <section className="relative overflow-hidden border-t border-chirp-stone-100 bg-white px-6 py-16 md:py-24 lg:py-28">
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
    <section className="overflow-hidden border-t border-chirp-amber-100 bg-chirp-amber-50/50 px-6 py-16 md:py-24 lg:py-28">
      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
        <motion.div {...reveal}>
          <span className="pill-label pill-label-light">Forever Free</span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            Other apps charge. We don&apos;t.
          </h2>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="mt-12 grid w-full max-w-[720px] grid-cols-1 gap-4 sm:grid-cols-3 md:mt-14"
        >
          <motion.div
            {...staggerChild}
            className="flex flex-col items-center rounded-2xl border border-chirp-amber-200 bg-white p-6 md:p-8"
          >
            <span className="font-mono text-sm text-chirp-stone-400 line-through">
              $10/mo
            </span>
            <span className="mt-1 font-display text-5xl font-extrabold leading-none text-chirp-stone-900 md:text-6xl">
              $0
            </span>
            <span className="mt-2 font-mono text-[11px] font-bold tracking-[0.2em] text-chirp-stone-400 uppercase">
              forever
            </span>
          </motion.div>

          <motion.div
            {...staggerChild}
            className="flex flex-col items-center rounded-2xl border border-chirp-amber-200 bg-white p-6 md:p-8"
          >
            <span className="font-mono text-sm text-chirp-stone-400 line-through">
              Limited
            </span>
            <span className="mt-1 font-display text-5xl font-extrabold leading-none text-chirp-stone-900 md:text-6xl">
              &infin;
            </span>
            <span className="mt-2 font-mono text-[11px] font-bold tracking-[0.2em] text-chirp-stone-400 uppercase">
              usage
            </span>
          </motion.div>

          <motion.div
            {...staggerChild}
            className="flex flex-col items-center rounded-2xl border border-chirp-amber-200 bg-white p-6 md:p-8"
          >
            <span className="font-mono text-sm text-chirp-stone-400 line-through">
              Cloud lock-in
            </span>
            <span className="mt-1 font-display text-5xl font-extrabold leading-none text-chirp-stone-900 md:text-6xl">
              Yours
            </span>
            <span className="mt-2 font-mono text-[11px] font-bold tracking-[0.2em] text-chirp-stone-400 uppercase">
              forever
            </span>
          </motion.div>
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
    <section className="overflow-hidden bg-white px-6 py-32 md:py-40 lg:py-48">
      <div className="mx-auto max-w-[1000px]">
        <motion.div
          {...reveal}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[auto_1fr] lg:gap-14"
        >
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <img
              src="/pieter.jpg"
              alt="Pieter de Bruijn"
              className="h-24 w-24 rounded-full object-cover shadow-md md:h-32 md:w-32"
            />
            <div className="mt-1 text-center lg:text-left">
              <span className="text-lg font-semibold text-chirp-stone-900">
                Pieter de Bruijn
              </span>
              <p className="mt-0.5 text-sm text-chirp-stone-500">
                Creator of Chirp
              </p>
            </div>
          </div>
          <blockquote className="text-center font-display text-3xl font-extrabold leading-[1.15] tracking-tighter text-chirp-stone-900 md:text-4xl lg:text-left lg:text-5xl">
            "I use voice-to-text every day. Every tool I tried was either expensive, slow, or sending my audio to the cloud. Chirp fixes all three."
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
    <section className="overflow-hidden bg-chirp-stone-50/60 px-6 py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[680px]">
        <motion.div {...reveal} className="mb-12 text-center">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900">
            Questions & Answers
          </h2>
        </motion.div>

        <motion.div {...reveal}>
          <Accordion.Root type="multiple" className="w-full">
            {HOME_PREVIEW_FAQS.map((faq) => (
              <Accordion.Item
                key={faq.question}
                value={faq.question}
                className="border-b border-black/[0.06]"
              >
                <Accordion.Header asChild>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left text-[17px] font-body font-medium text-chirp-stone-900 hover:text-chirp-stone-700">
                    <span>{faq.question}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 ml-4 text-chirp-stone-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="text-chirp-stone-600 text-base leading-relaxed pb-5">
                    {faq.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Close CTA                                                          */
/* ------------------------------------------------------------------ */

function CloseSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-24 md:pb-32 md:pt-32 lg:pb-36 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/footer-bg.jpeg')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/45"
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
          className="mb-2 font-display text-7xl font-extrabold leading-none tracking-tighter text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.4)] md:text-8xl lg:text-9xl"
        >
          Try chirp.
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
