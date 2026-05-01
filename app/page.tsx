"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { HomeSections } from "@/components/home-sections";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { AnnouncementPill } from "@/components/announcement-pill";
import { HeroAppPreview } from "@/components/hero-app-preview";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-[8vh] md:py-[10vh]">
        {/* Cursor-following amber spotlight, behind everything. */}
        <CursorSpotlight />

        {/* Announcement pill above the hero, links to /changelog. */}
        <motion.div {...staggerChild} className="relative z-10 mb-6 md:mb-8">
          <AnnouncementPill
            href="/changelog"
            badge="New"
            label="The dark redesign just shipped"
          />
        </motion.div>

        {/* Hero app preview — dominant, with its bottom 38% masked
            into the canvas so it dissolves into the page. */}
        <motion.div
          {...staggerChild}
          className="relative z-10 w-full max-w-[1100px]"
        >
          <HeroAppPreview />
        </motion.div>

        {/* Headline anchor pulled UP into the faded bottom of the
            preview. Negative top margin overlaps the dissolved zone
            so the stack reads tight — no void between image and
            text. No brand eyebrow; the giant headline carries
            identity on its own. */}
        <motion.div
          {...staggerContainer}
          className="relative z-20 -mt-24 flex w-full max-w-[1100px] flex-col items-start md:-mt-32"
        >
          <motion.h1
            {...staggerChild}
            className="halo-hero relative font-display font-semibold leading-[0.95] tracking-tight text-white"
            style={{
              fontSize: "clamp(40px, 6.5vw, 88px)",
              letterSpacing: "-0.03em",
            }}
          >
            Speak freely.
          </motion.h1>

          <motion.p
            {...staggerChild}
            className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/60 md:text-lg"
          >
            Voice-to-text that runs entirely on your machine. No cloud, no
            account, no subscription.
          </motion.p>

          <motion.div
            {...staggerChild}
            className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-3"
          >
            <Link
              href="/download"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 font-display text-[14px] font-semibold text-black transition-all duration-150 hover:-translate-y-px hover:bg-white/95 active:translate-y-0 active:scale-[0.98]"
            >
              Download for Mac &amp; Windows
            </Link>
            <a
              href="https://github.com/sitelift/Chirp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 font-display text-[14px] font-medium text-white/85 backdrop-blur-md transition-all duration-150 hover:bg-white/[0.07] active:scale-[0.98]"
            >
              Source on GitHub
            </a>
          </motion.div>

          <motion.p
            {...staggerChild}
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30"
          >
            {PRODUCT.version} · {PRODUCT.os}
          </motion.p>
        </motion.div>
      </section>

      <HomeSections />
    </>
  );
}
