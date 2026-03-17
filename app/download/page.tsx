"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PRODUCT } from "@/lib/constants";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { BirdMark } from "@/components/bird-mark";
import { AmberWarmth } from "@/components/amber-warmth";

export default function DownloadPage() {
  const [isWindows, setIsWindows] = useState(true);

  useEffect(() => {
    setIsWindows(/Windows/i.test(navigator.userAgent));
  }, []);

  const steps = [
    {
      number: "1",
      title: "Run the installer",
      description:
        'Windows may show SmartScreen. Click "More info" then "Run anyway."',
    },
    {
      number: "2",
      title: "Walk through setup",
      description:
        "Choose your microphone and download the speech model (~465 MB).",
    },
    {
      number: "3",
      title: (
        <>
          Press <span className="font-mono">Ctrl+Shift+Space</span>
        </>
      ),
      description: "From any app. Start talking. That's it.",
    },
  ];

  return (
    <section className="relative flex flex-col items-center pt-32 pb-20 px-6">
      <AmberWarmth className="top-0 left-1/2 -translate-x-1/2" />

      <motion.div className="relative max-w-[480px] w-full" {...reveal}>
        <div className="mx-auto flex max-w-[800px] flex-col items-center">
          <BirdMark size={48} className="mb-8" />
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-chirp-stone-900 md:text-5xl">
            Download Chirp
          </h1>
          <p className="mt-4 text-center text-lg text-chirp-stone-500">
            Local voice-to-text for Mac & Windows
          </p>
        </div>
        {/* Download card */}
        <div className="mt-12 rounded-2xl bg-white shadow-elevated p-8">
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold text-xl text-chirp-stone-900">
              Chirp for Mac & Windows
            </span>
            <span className="font-mono text-xs bg-chirp-stone-50 border border-black/[0.06] rounded-full px-3 py-1 text-chirp-stone-500">
              {PRODUCT.version}
            </span>
          </div>

          {isWindows ? (
            <>
              <a
                href={PRODUCT.downloadUrl}
                className="mt-6 flex items-center justify-center w-full h-12 bg-chirp-amber-500 text-white font-display font-bold rounded-full shadow-amber hover:bg-chirp-amber-600 hover:shadow-amber-hover transition-all"
              >
                Download for Windows
              </a>
              <p className="font-mono text-xs text-chirp-stone-400 mt-3 text-center">
                {PRODUCT.downloadSize} · {PRODUCT.os} ({PRODUCT.architecture})
              </p>
            </>
          ) : (
            <p className="mt-6 text-sm text-chirp-stone-600 leading-relaxed">
              Chirp is currently Windows-only. Star us on{" "}
              <a
                href={PRODUCT.github}
                className="text-chirp-amber-600 hover:text-chirp-amber-700 underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              to follow progress on macOS and Linux support.
            </p>
          )}
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

        {/* System requirements */}
        <p className="mt-16 font-mono text-xs text-chirp-stone-400 text-center">
          {PRODUCT.os} ({PRODUCT.architecture}) · {PRODUCT.ram} ·{" "}
          {PRODUCT.diskSpace} disk · GPU optional
        </p>

        {/* GitHub link */}
        <div className="mt-8 flex justify-center">
          <a
            href={PRODUCT.github}
            className="inline-flex items-center gap-2 text-sm text-chirp-stone-500 hover:text-chirp-amber-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View source on GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
