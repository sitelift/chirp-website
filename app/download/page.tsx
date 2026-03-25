"use client";

import { motion } from "framer-motion";
import { PRODUCT } from "@/lib/constants";
import { reveal } from "@/lib/motion";
import { BirdMark } from "@/components/bird-mark";

export default function DownloadPage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6">
      <motion.div className="flex flex-col items-center" {...reveal}>
        {/* Bird logo */}
        <BirdMark size={72} className="mb-10" />

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-chirp-stone-900">
          Speak freely.
        </h1>

        {/* Platform buttons */}
        <div className="mt-10 flex items-center gap-4 flex-wrap justify-center">
          <span className="text-sm text-chirp-stone-500 mr-1">
            Download the desktop app:
          </span>
          <a
            href={PRODUCT.downloadUrlMac}
            className="inline-flex items-center h-10 px-6 rounded-full border border-black/[0.1] text-sm font-medium text-chirp-stone-700 bg-white hover:bg-chirp-stone-50 hover:border-black/[0.15] transition-all"
          >
            macOS
          </a>
          <a
            href={PRODUCT.downloadUrlWindows}
            className="inline-flex items-center h-10 px-6 rounded-full border border-black/[0.1] text-sm font-medium text-chirp-stone-700 bg-white hover:bg-chirp-stone-50 hover:border-black/[0.15] transition-all"
          >
            Windows
          </a>
        </div>

        {/* Version + details */}
        <p className="mt-6 font-mono text-xs text-chirp-stone-400">
          {PRODUCT.version} · Free · Local · No account required
        </p>
      </motion.div>
    </section>
  );
}
