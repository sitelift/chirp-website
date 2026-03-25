"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { HomeSections } from "@/components/home-sections";
import { WorkflowDemo } from "@/components/workflow-demo";

export default function Home() {
  return (
    <>
      <section className="relative flex flex-col items-center overflow-x-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpeg')" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/30"
        />

        <motion.div
          {...staggerContainer}
          className="relative z-10 flex w-full min-w-0 max-w-6xl flex-col items-center"
        >
          <motion.h1
            {...staggerChild}
            className="max-w-3xl text-center font-display text-5xl font-extrabold leading-[1.02] tracking-tighter text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Speak freely.
          </motion.h1>

          <motion.p
            {...staggerChild}
            className="mt-6 max-w-xl text-center text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg md:text-xl"
          >
            Voice-to-text that runs on your machine. No cloud, no account, no
            subscription.
          </motion.p>

          <motion.div
            {...staggerChild}
            className="mt-10 flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-5"
          >
            <Link
              href="/download"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-chirp-amber-400 px-8 py-3 font-display text-base font-bold text-chirp-stone-900 transition-colors hover:bg-chirp-amber-300 md:h-14 md:text-lg"
            >
              Download for Mac & Windows
            </Link>
            <a
              href="https://github.com/sitelift/Chirp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-8 py-3 font-display text-base font-bold text-white transition-colors hover:bg-white/10 md:h-14 md:text-lg"
            >
              Learn More
            </a>
          </motion.div>

          <motion.p
            {...staggerChild}
            className="mt-3 text-center font-mono text-xs text-white/40"
          >
            {PRODUCT.version} · {PRODUCT.os}
          </motion.p>

          <motion.div
            {...staggerChild}
            className="mt-14 w-full min-w-0 md:mt-20 lg:mt-24"
          >
            <WorkflowDemo placement="hero" />
          </motion.div>
        </motion.div>
      </section>

      <HomeSections />
    </>
  );
}
