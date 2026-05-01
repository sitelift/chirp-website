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
      {/* Single quiet white halo — restrained. Amber lives only on
          the CTA pill itself, not the atmosphere. The earlier draft
          had a 1100px amber pool that read as startup-template
          glow; it's gone. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.045) 0%, transparent 58%)",
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

        {/* The monument: 'Try Chirp.' at fold-spanning size. Pulled
            tonal range from pure white to white/92 — Fey's display
            type sits below 100% white, which softens the headline
            block and reads as more editorial. */}
        <motion.h2
          {...staggerChild}
          className="halo-hero relative font-display font-semibold leading-[0.92] tracking-tight"
          style={{
            fontSize: "clamp(72px, 12vw, 168px)",
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.92)",
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
          {/* Restrained CTA — white pill primary, dropped the amber
              fill + amber glow shadow that read as startup-template.
              The amber moment lives in the small dot inside the
              announcement pill on the hero, not here. */}
          <Link
            href="/download"
            className="group inline-flex items-center justify-center rounded-full bg-white px-8 font-display text-[14.5px] font-semibold text-black transition-all duration-200 hover:-translate-y-px hover:bg-white/95 active:translate-y-0 active:scale-[0.98]"
            style={{
              height: 50,
              boxShadow:
                "0 6px 24px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.40)",
            }}
          >
            Download for Mac &amp; Windows
            <span
              aria-hidden
              className="ml-2 text-black/55 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-black"
            >
              →
            </span>
          </Link>
          <a
            href={PRODUCT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[50px] items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 font-display text-[14px] font-medium text-white/75 backdrop-blur-md transition-all duration-150 hover:bg-white/[0.07] hover:text-white/90 active:scale-[0.98]"
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
