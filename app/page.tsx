"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { HomeSections } from "@/components/home-sections";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { AnnouncementPill } from "@/components/announcement-pill";
import { HeroAppPreview } from "@/components/hero-app-preview";
import { BirdMark } from "@/components/bird-mark";

export default function Home() {
  return (
    <>
      <section className="relative flex flex-col items-center overflow-hidden px-6 pb-32 pt-24 md:pt-28 lg:pt-32">
        {/* Cursor-following amber spotlight, behind everything. */}
        <CursorSpotlight />

        {/* Announcement pill above the hero, links to /changelog. */}
        <motion.div
          {...staggerChild}
          className="relative z-10 mb-12 md:mb-16"
        >
          <AnnouncementPill
            href="/changelog"
            badge="New"
            label="The dark redesign just shipped"
          />
        </motion.div>

        {/* Hero app preview — dominant, takes the upper viewport.
            Static composition using ported components (Sparkline,
            card-surface, etc.) so it reads identical to the real app. */}
        <motion.div
          {...staggerChild}
          className="relative z-10 w-full max-w-[1100px]"
        >
          <HeroAppPreview />
        </motion.div>

        {/* Brand mark + headline anchor below the app preview, Fey-
            style. Eyebrow brand wordmark, then the giant statement. */}
        <motion.div
          {...staggerContainer}
          className="relative z-10 mt-20 flex w-full max-w-4xl flex-col items-start md:mt-28"
        >
          <motion.div
            {...staggerChild}
            className="mb-3 flex items-center gap-2"
          >
            <BirdMark size={18} color="#F0B723" />
            <span className="font-display text-[15px] font-semibold tracking-tight text-white/55">
              Chirp
            </span>
          </motion.div>
          <motion.h1
            {...staggerChild}
            className="halo-hero relative font-display font-semibold leading-[0.92] tracking-tight text-white"
            style={{
              fontSize: "clamp(48px, 8vw, 116px)",
              letterSpacing: "-0.03em",
            }}
          >
            Type at the speed
            <br />
            of thought.
          </motion.h1>

          <motion.p
            {...staggerChild}
            className="mt-7 max-w-xl font-body text-base leading-relaxed text-white/60 sm:text-lg md:text-xl"
          >
            Voice-to-text that runs entirely on your machine.
            <br className="hidden sm:inline" />
            No cloud. No account. No subscription.
          </motion.p>

          <motion.div
            {...staggerChild}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
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
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35"
          >
            {PRODUCT.version} · {PRODUCT.os}
          </motion.p>
        </motion.div>
      </section>

      <HomeSections />
    </>
  );
}
