"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { AmberWarmth } from "@/components/amber-warmth";
import { HeroDemo } from "@/components/hero-demo";
import { HomeSections } from "@/components/home-sections";

export default function Home() {
  return (
    <>
      <section className="dot-grid relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
        <AmberWarmth className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        <motion.div
          {...staggerContainer}
          className="relative flex flex-col items-center text-center"
        >
          <motion.h1
            {...staggerChild}
            className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] text-chirp-stone-900 md:text-7xl"
          >
            Speak. <span className="text-chirp-amber-500">Chirp</span> types.
          </motion.h1>

          <motion.p
            {...staggerChild}
            className="mt-6 max-w-[540px] text-xl leading-relaxed text-chirp-stone-500"
          >
            Voice-to-text that never leaves your computer. No cloud. No cost. No
            account. Just your voice and your words.
          </motion.p>

          <motion.div {...staggerChild} className="relative mt-10">
            <AmberWarmth tight className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Link
              href="/download"
              className="relative inline-flex h-12 items-center rounded-full bg-chirp-amber-500 px-8 font-display font-bold text-white shadow-amber transition-all hover:bg-chirp-amber-600 hover:shadow-amber-hover"
            >
              Download for Windows
            </Link>
          </motion.div>

          <motion.p
            {...staggerChild}
            className="mt-3 font-mono text-xs text-chirp-stone-400"
          >
            {PRODUCT.version} · {PRODUCT.os}
          </motion.p>
        </motion.div>

        <HeroDemo />
      </section>

      <HomeSections />
    </>
  );
}
