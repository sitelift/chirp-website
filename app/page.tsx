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
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-chirp-stone-900 px-6 py-32 lg:py-48">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-12 lg:flex-row lg:items-center">
          
          <motion.div
            {...staggerContainer}
            className="relative flex max-w-[620px] flex-col pt-24 text-left lg:pt-0"
          >
            <motion.h1
              {...staggerChild}
              className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl"
            >
              Speak Freely
            </motion.h1>

            <motion.p
              {...staggerChild}
              className="mt-6 text-xl leading-relaxed text-chirp-stone-400"
            >
              Works instantly in the background. Cleans up filler words and fixes punctuation instantly. 100% private. No internet required.
            </motion.p>

            <motion.div {...staggerChild} className="mt-10 flex items-center gap-6">
              <Link
                href="/download"
                className="inline-flex h-14 items-center rounded-lg bg-chirp-amber-400 px-8 font-display text-lg font-bold text-chirp-stone-900 transition-all hover:bg-chirp-amber-300"
              >
                Download for Mac & Windows
              </Link>
            </motion.div>

            <motion.p
              {...staggerChild}
              className="mt-4 font-mono text-xs text-chirp-stone-500"
            >
              {PRODUCT.version} · {PRODUCT.os}
            </motion.p>
          </motion.div>

          <motion.div
            {...reveal}
            className="w-full lg:w-1/2 lg:flex lg:justify-end"
          >
            <WaveformOverlayDemo />
          </motion.div>
        
        </div>
      </section>

      <HomeSections />
    </>
  );
}
