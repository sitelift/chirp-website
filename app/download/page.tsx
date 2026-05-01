"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";

// /download — dark editorial page. Halo-hero "Get Chirp." headline,
// auto-detected OS pre-selected on a card-surface OS picker
// (Mac / Windows), one big amber download CTA, three hairline
// install steps below, system requirements row at the bottom.
//
// Auto-detect uses navigator.userAgent (the userAgentData API isn't
// universal yet) and falls back to Mac. If the visitor wants the
// other OS, the picker is one click.

type OS = "mac" | "windows";

function detectOS(): OS {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  return "mac";
}

export default function DownloadPage() {
  const [os, setOs] = useState<OS>("mac");

  useEffect(() => {
    setOs(detectOS());
  }, []);

  const downloadUrl =
    os === "windows" ? PRODUCT.downloadUrlWindows : PRODUCT.downloadUrlMac;
  const osLabel = os === "windows" ? "Windows" : "macOS";

  return (
    <main className="relative mx-auto flex min-h-[100vh] max-w-[820px] flex-col items-center px-6 pt-32 pb-32 md:pt-40">
      {/* Atmospheric amber bloom behind the BirdMark anchor. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[30%] h-[640px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(240,183,35,0.08) 0%, rgba(240,183,35,0.02) 40%, transparent 70%)",
        }}
      />

      <motion.div
        {...staggerContainer}
        className="relative z-10 flex w-full flex-col items-center text-center"
      >
        <motion.div {...staggerChild} className="halo-mark relative mb-10">
          <BirdMark size={56} />
        </motion.div>

        <motion.h1
          {...staggerChild}
          className="halo-hero relative font-display font-semibold leading-[0.96] tracking-tight text-white"
          style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            letterSpacing: "-0.03em",
          }}
        >
          Get Chirp.
        </motion.h1>

        <motion.p
          {...staggerChild}
          className="mt-6 max-w-[44ch] font-body text-[16px] leading-relaxed text-white/55 md:text-[17px]"
        >
          One-time install. No account. The model downloads itself
          on first launch and never reaches out again.
        </motion.p>

        {/* OS picker. */}
        <motion.div
          {...staggerChild}
          className="mt-12 flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md"
        >
          <OsPill active={os === "mac"} onClick={() => setOs("mac")}>
            macOS
          </OsPill>
          <OsPill active={os === "windows"} onClick={() => setOs("windows")}>
            Windows
          </OsPill>
        </motion.div>

        {/* Big amber download CTA. */}
        <motion.div {...staggerChild} className="mt-7">
          <a
            href={downloadUrl}
            className="group inline-flex items-center justify-center rounded-full bg-chirp-amber-400 px-9 font-display text-[16px] font-semibold text-black transition-all duration-200 hover:-translate-y-px hover:bg-chirp-amber-300 active:translate-y-0 active:scale-[0.98]"
            style={{
              height: 56,
              boxShadow:
                "0 8px 28px rgba(240,183,35,0.32), 0 2px 4px rgba(240,183,35,0.20), inset 0 1px 0 rgba(255,255,255,0.20)",
            }}
          >
            Download for {osLabel}
            <span
              aria-hidden
              className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </motion.div>

        <motion.p
          {...staggerChild}
          className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30"
        >
          {PRODUCT.version} · {PRODUCT.downloadSize} · {PRODUCT.license}
        </motion.p>

        {/* Install steps — three hairline-divided rows. */}
        <motion.ol
          {...staggerChild}
          className="mt-24 flex w-full max-w-[620px] flex-col text-left"
        >
          <Step
            number="01"
            title="Download the installer"
            body={`A single ${PRODUCT.downloadSize} executable. The speech model downloads on first launch.`}
          />
          <Step
            number="02"
            title="Run it"
            body="Chirp installs to your user directory and registers a global hotkey. No admin rights needed."
          />
          <Step
            number="03"
            title="Press the hotkey, speak"
            body={
              os === "windows"
                ? "Default is Ctrl + Shift + Space. Hold, talk, release. The cleaned text drops at your cursor."
                : "Default is ⌃ + ⇧ + Space. Hold, talk, release. The cleaned text drops at your cursor."
            }
          />
        </motion.ol>

        {/* System requirements footnote. */}
        <motion.div
          {...staggerChild}
          className="mt-24 grid w-full max-w-[620px] grid-cols-1 gap-3 border-t border-white/[0.08] pt-8 sm:grid-cols-3"
        >
          <Spec label="OS" value={PRODUCT.os.replace(" & ", " · ")} />
          <Spec label="Disk" value={PRODUCT.diskSpace} />
          <Spec label="Memory" value={PRODUCT.ram} />
        </motion.div>
      </motion.div>
    </main>
  );
}

function OsPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-1.5 font-display text-[13px] font-medium transition-all duration-150 active:scale-95 ${
        active ? "bg-white/[0.10] text-white" : "text-white/50 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Step({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-6 border-t border-white/[0.08] py-7 first:border-t-0 first:pt-0">
      <span
        className="font-mono text-[13px] uppercase tracking-[0.18em] text-chirp-amber-400"
        style={{ fontFeatureSettings: '"tnum"' }}
      >
        {number}
      </span>
      <div className="flex-1">
        <h3 className="font-display text-[16px] font-semibold tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-1.5 font-body text-[14px] leading-relaxed text-white/55 md:text-[15px]">
          {body}
        </p>
      </div>
    </li>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
        {label}
      </span>
      <span className="font-display text-[13px] font-medium text-white/85">
        {value}
      </span>
    </div>
  );
}
