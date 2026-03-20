"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild, reveal } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { WaveformOverlayDemo } from "@/components/waveform-overlay-demo";
import { HomeSections } from "@/components/home-sections";

export default function Home() {
  return (
    <>
      <section
        className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 pb-12 pt-32 lg:pt-44"
      >
        {/* Hero background image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpeg')" }}
        />
        {/* Darken overlay for text legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/20"
        />

        {/* Centered content */}
        <motion.div
          {...staggerContainer}
          className="relative z-10 flex max-w-3xl flex-col items-center text-center"
        >
          <motion.h1
            {...staggerChild}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Speak Freely
          </motion.h1>

          <motion.p
            {...staggerChild}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            Press a hotkey, speak, text appears at your cursor. No internet, no cloud, no accounts.
          </motion.p>

          <motion.div {...staggerChild} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex h-14 items-center rounded-lg bg-chirp-amber-400 px-8 font-display text-lg font-bold text-chirp-stone-900 transition-all hover:bg-chirp-amber-300"
            >
              Download for Mac & Windows
            </Link>
            <Link
              href="/faq"
              className="inline-flex h-14 items-center rounded-lg border border-white/20 px-8 font-display text-lg font-bold text-white transition-all hover:bg-white/10"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.p
            {...staggerChild}
            className="mt-4 font-mono text-xs text-white/40"
          >
            {PRODUCT.version} · {PRODUCT.os}
          </motion.p>
        </motion.div>

        {/* Demo below CTAs */}
        <motion.div
          {...reveal}
          className="relative z-10 mt-20 w-full max-w-2xl"
        >
          <WaveformOverlayDemo />
        </motion.div>

        {/* Bottom fade to match next light section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#1C1917]"
        />
      </section>

      <HomeSections />
    </>
  );
}
