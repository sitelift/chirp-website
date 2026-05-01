"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { BirdMark } from "./bird-mark";

// Close CTA — final scene before the footer. Editorial monument
// pattern: the giant "Try Chirp." headline IS the monument. Small
// BirdMark glyph anchors above; subhead, CTA, and version stamp
// stack beneath. Atmospheric amber pool behind the headline gives
// the moment its weight without needing a bitmap brand image —
// the close reads as a signed-off statement on the dark canvas.
//
// Reference: Fey's "Get started with Fey." pattern with the small
// inline wordmark + atmospheric amber bloom behind.

export function CloseCtaScene() {
  return (
    <section
      id="try-chirp"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 md:py-40 lg:py-48"
    >
      {/* Layered atmospheric bloom — amber pool behind the
          headline gives the moment its weight. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(240,183,35,0.10) 0%, rgba(240,183,35,0.03) 28%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 55%)",
        }}
      />
      {/* Subtle dotted floor — anchors the monument without
          painting a literal horizon. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 30%, transparent 100%)",
        }}
      />

      <motion.div
        {...staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center text-center"
      >
        {/* Small BirdMark anchor — single, halo'd, sets the brand
            note before the headline lands. */}
        <motion.div {...staggerChild} className="halo-mark relative mb-12">
          <BirdMark size={48} />
        </motion.div>

        {/* The monument: 'Try Chirp.' at fold-spanning size. */}
        <motion.h2
          {...staggerChild}
          className="halo-hero relative font-display font-semibold leading-[0.92] tracking-tight text-white"
          style={{
            fontSize: "clamp(72px, 12vw, 168px)",
            letterSpacing: "-0.04em",
          }}
        >
          Try Chirp.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-8 font-body text-[18px] leading-relaxed text-white/55 md:mt-10 md:text-[20px]"
        >
          Free. Local. Yours.
        </motion.p>

        <motion.div
          {...staggerChild}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:mt-14"
        >
          <Link
            href="/download"
            className="group relative inline-flex items-center justify-center rounded-full bg-chirp-amber-400 px-8 font-display text-[15px] font-semibold text-black transition-all duration-200 hover:-translate-y-px hover:bg-chirp-amber-300 active:translate-y-0 active:scale-[0.98]"
            style={{
              height: 52,
              boxShadow:
                "0 6px 24px rgba(240,183,35,0.30), 0 2px 4px rgba(240,183,35,0.20), inset 0 1px 0 rgba(255,255,255,0.20)",
            }}
          >
            Download for Mac &amp; Windows
            <span
              aria-hidden
              className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <a
            href={PRODUCT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 font-display text-[14px] font-medium text-white/85 backdrop-blur-md transition-all duration-150 hover:bg-white/[0.07] active:scale-[0.98]"
          >
            Source on GitHub
          </a>
        </motion.div>

        <motion.p
          {...staggerChild}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white/30"
        >
          {PRODUCT.version} · {PRODUCT.os}
        </motion.p>
      </motion.div>
    </section>
  );
}
