"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Apple } from "lucide-react";
import { PRODUCT } from "@/lib/constants";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { BirdMark } from "@/components/bird-mark";
import { AmberWarmth } from "@/components/amber-warmth";

export default function DownloadPage() {
  const [platform, setPlatform] = useState<"windows" | "mac">("windows");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlatform(/Mac|iPhone|iPad/i.test(navigator.userAgent) ? "mac" : "windows");
  }, []);

  const isMac = platform === "mac";

  const steps = [
    {
      number: "1",
      title: "Run the installer",
      description: isMac
        ? "Open the .dmg and drag Chirp to Applications."
        : "Double-click the installer. Chirp installs in seconds.",
    },
    {
      number: "2",
      title: "Walk through setup",
      description:
        "Choose your hotkey, grant mic access, and download the speech model (~465 MB).",
    },
    {
      number: "3",
      title: (
        <>
          Press <span className="font-mono">{isMac ? "Cmd+Shift+Space" : "Ctrl+Shift+Space"}</span>
        </>
      ),
      description: "From any app. Start talking. Text appears at your cursor.",
    },
  ];

  return (
    <section className="relative flex flex-col items-center pt-32 pb-20 px-6">
      <AmberWarmth className="top-0 left-1/2 -translate-x-1/2" />

      <motion.div className="relative max-w-[520px] w-full" {...reveal}>
        <div className="mx-auto flex max-w-[800px] flex-col items-center">
          <BirdMark size={48} className="mb-8" />
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-chirp-stone-900 md:text-5xl">
            Download Chirp
          </h1>
          <p className="mt-4 text-center text-lg text-chirp-stone-500">
            Free, local voice-to-text for Mac & Windows
          </p>
        </div>

        {/* Download card */}
        <div className="mt-12 rounded-2xl bg-white shadow-elevated p-8">
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold text-xl text-chirp-stone-900">
              Chirp {PRODUCT.version}
            </span>
          </div>

          {/* Primary button — detected platform */}
          <a
            href={isMac ? PRODUCT.downloadUrlMac : PRODUCT.downloadUrlWindows}
            className="mt-6 flex items-center justify-center gap-2 w-full h-12 bg-chirp-amber-500 text-white font-display font-bold rounded-full shadow-amber hover:bg-chirp-amber-600 hover:shadow-amber-hover transition-all"
          >
            {isMac ? <Apple size={18} /> : <Monitor size={18} />}
            Download for {isMac ? "Mac" : "Windows"}
          </a>

          {/* Secondary button — other platform */}
          <a
            href={isMac ? PRODUCT.downloadUrlWindows : PRODUCT.downloadUrlMac}
            className="mt-3 flex items-center justify-center gap-2 w-full h-10 bg-transparent border border-black/[0.08] text-chirp-stone-500 font-display font-semibold text-sm rounded-full hover:bg-chirp-stone-50 transition-all"
          >
            {isMac ? <Monitor size={15} /> : <Apple size={15} />}
            Also available for {isMac ? "Windows" : "Mac"}
          </a>

          <p className="font-mono text-xs text-chirp-stone-400 mt-4 text-center">
            {PRODUCT.os} &middot; {PRODUCT.ram} &middot; {PRODUCT.diskSpace} disk
          </p>
        </div>

        {/* Installation steps */}
        <motion.div className="mt-16" {...staggerContainer}>
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="flex gap-5 mb-8"
              {...staggerChild}
            >
              <span className="font-display text-chirp-amber-500 text-2xl font-bold leading-tight">
                {step.number}
              </span>
              <div>
                <p className="text-chirp-stone-900 font-medium">
                  {step.title}
                </p>
                <p className="text-chirp-stone-600 text-sm mt-1">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 font-mono text-xs text-chirp-stone-400 text-center">
          All processing runs locally. Your voice never leaves your device.
        </p>
      </motion.div>
    </section>
  );
}
