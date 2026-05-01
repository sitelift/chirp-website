"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { OverlayDemo } from "./overlay-demo";

// "What it does" — the home page's second scene, sitting right
// below the hero. Sells the core interaction in one beat: a
// centered headline + the live ported OverlayDemo pill cycling
// through listening → polishing → reset, framed by a stylized
// "desktop surface" so the visitor sees the overlay the way it
// actually appears on a real machine.
//
// All chrome here uses shipped app tokens (card-surface, halo,
// dotted bg) so the look is byte-identical to the desktop app's
// visual language.

export function WhatItDoesScene() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] px-6 py-28 md:py-36 lg:py-40">
      <motion.div
        {...staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center text-center"
      >
        {/* Headline — three-word procedural beat that mirrors the
            hero's "Speak freely." cadence with the action loop. */}
        <motion.h2
          {...staggerChild}
          className="halo-hero relative font-display font-semibold tracking-tight text-white"
          style={{
            fontSize: "clamp(36px, 5.5vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
          }}
        >
          Press, speak, paste.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-6 max-w-[560px] font-body text-base leading-relaxed text-white/55 md:text-[17px]"
        >
          Hit the hotkey. The overlay listens locally, polishes the
          dictation on-device, and drops the clean text wherever your
          cursor was. No app to switch to.
        </motion.p>

        {/* Overlay centerpiece — wide card-surface with a soft
            amber pool underneath the pill, suggesting the overlay
            sits on top of whatever app the user is in. The
            OverlayDemo cycles automatically. */}
        <motion.div
          {...staggerChild}
          className="relative mt-14 w-full max-w-[880px] md:mt-20"
        >
          <div className="card-surface relative flex h-[320px] items-center justify-center overflow-hidden md:h-[400px]">
            {/* Dotted ambient backdrop. */}
            <div
              className="absolute inset-0 bg-dotted opacity-50"
              aria-hidden
            />
            {/* Soft amber pool under the pill — implies a glow
                emanating from the overlay onto the surface below. */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(240,183,35,0.12) 0%, transparent 70%)",
              }}
            />
            {/* Subtle inset top highlight reinforces the lift. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />
            {/* The live overlay pill, scaled up for visual weight
                without re-implementing the size as a prop. */}
            <div className="relative z-10 scale-[1.5] md:scale-[1.85]">
              <OverlayDemo />
            </div>
          </div>

          {/* Hairline frame caption — gives the impression that
              this is a captured fragment of a real desktop. */}
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            <span>Live preview · synthetic audio</span>
            <span>Loops every 7s</span>
          </div>
        </motion.div>

        {/* Three-stage caption row — sets the mental model so the
            visitor knows what to look for as the demo cycles. */}
        <motion.div
          {...staggerChild}
          className="mt-14 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 md:gap-5 md:text-[12px]"
        >
          <span>Listen</span>
          <span className="h-px w-10 bg-white/15" aria-hidden />
          <span>Clean</span>
          <span className="h-px w-10 bg-white/15" aria-hidden />
          <span>Paste</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
