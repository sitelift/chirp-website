"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { HomeSections } from "@/components/home-sections";
import { OverlayDemo } from "@/components/overlay-demo";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { AnnouncementPill } from "@/components/announcement-pill";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 md:pb-32 md:pt-40 lg:pb-40 lg:pt-48">
        {/* Cursor-following amber spotlight overlay. Disables under
            prefers-reduced-motion. Sits behind everything else. */}
        <CursorSpotlight />

        <motion.div
          {...staggerContainer}
          className="relative z-10 flex w-full min-w-0 max-w-6xl flex-col items-center"
        >
          {/* Announcement pill above the headline, links to /changelog. */}
          <motion.div {...staggerChild} className="mb-8">
            <AnnouncementPill
              href="/changelog"
              badge="New"
              label="The dark redesign just shipped"
            />
          </motion.div>

          <motion.h1
            {...staggerChild}
            className="halo-hero relative max-w-4xl text-center font-display font-semibold leading-[0.95] tracking-tight text-white"
            style={{
              fontSize: "clamp(56px, 9vw, 124px)",
              letterSpacing: "-0.03em",
            }}
          >
            Speak freely.
          </motion.h1>

          <motion.p
            {...staggerChild}
            className="mt-7 max-w-xl text-center font-body text-base leading-relaxed text-white/65 sm:mt-8 sm:text-lg md:text-xl"
          >
            Voice-to-text that runs entirely on your machine.
            <br className="hidden sm:inline" />
            No cloud. No account. No subscription.
          </motion.p>

          <motion.div
            {...staggerChild}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="/download"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 font-display text-[14px] font-semibold text-black transition-all duration-150 hover:-translate-y-px hover:bg-white/95 active:translate-y-0 active:scale-[0.98]"
            >
              Download for Mac &amp; Windows
            </Link>
            <a
              href="https://github.com/sitelift/Chirp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 font-display text-[14px] font-medium text-white/85 backdrop-blur-md transition-all duration-150 hover:bg-white/[0.07] active:scale-[0.98]"
            >
              Source on GitHub
            </a>
          </motion.div>

          <motion.p
            {...staggerChild}
            className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/35"
          >
            {PRODUCT.version} · {PRODUCT.os}
          </motion.p>

          {/* Live overlay demo — looping listening waveform → polishing
              dots → fade. The hero's product moment. */}
          <motion.div
            {...staggerChild}
            className="mt-16 flex items-center justify-center md:mt-20"
          >
            <OverlayDemo />
          </motion.div>
        </motion.div>
      </section>

      <HomeSections />
    </>
  );
}
