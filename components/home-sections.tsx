"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reveal, staggerContainer, staggerChild } from "@/lib/motion";
import { PRODUCT } from "@/lib/constants";
import { BirdMark } from "@/components/bird-mark";
import { CleanupDemo } from "@/components/cleanup-demo";
import { SettingsDemo } from "@/components/settings-demo";
import { KeyboardDemo } from "@/components/keyboard-demo";
import { NoiseDemo } from "@/components/noise-demo";
import { HistoryDemo } from "@/components/history-demo";

/* ------------------------------------------------------------------ */
/*  Section 3 — Smart Cleanup                                          */
/* ------------------------------------------------------------------ */

function SmartCleanupSection() {
  return (
    <section className="bg-white px-6 py-20 md:py-32 border-t border-chirp-stone-200 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-chirp-amber-400/5 blur-[80px] pointer-events-none" />
      
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center justify-center relative z-10">
        
        <motion.div {...reveal} className="text-center w-full">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
            From rambling to ready.
          </h2>
          <p className="mt-6 text-lg leading-[1.75] text-chirp-stone-500 max-w-[500px] mx-auto">
            Chirp&apos;s local AI cleans up your speech in real time — removing filler words, fixing grammar, adding punctuation. All on your device.
          </p>
        </motion.div>

        <motion.div {...reveal} className="w-full">
          <CleanupDemo />
        </motion.div>
        
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Feature Showcase                                       */
/* ------------------------------------------------------------------ */

function FeatureShowcaseSection() {
  const features = [
    {
      id: "hotkey",
      title: "Works in every app.",
      desc: "One hotkey from anywhere — your browser, your editor, your email. Chirp transcribes and pastes right at your cursor.",
      subText: "Default: Ctrl+Shift+Space · fully customizable",
      demo: <KeyboardDemo />,
      alignRight: true
    },
    {
      id: "noise",
      title: "Hear you, not your surroundings.",
      desc: "Chirp filters background noise before transcription. Keyboard clatter, AC hum, the coffee shop — filtered out.",
      subText: "",
      demo: <NoiseDemo />,
      alignRight: false
    },
    {
      id: "snippets",
      title: "Your words. Your terms.",
      desc: "Add names, jargon, and technical terms to your dictionary. Save frequently used phrases as snippets and trigger them instantly.",
      subText: "",
      demo: <SettingsDemo />,
      alignRight: true
    },
    {
      id: "history",
      title: "Everything you've said. Nothing we've heard.",
      desc: "Your transcription history lives on your device. Search, copy, review — then delete it if you want. We'll never know it existed.",
      subText: "",
      demo: <HistoryDemo />,
      alignRight: false
    }
  ];

  return (
    <section className="bg-chirp-stone-50 px-6 py-24 md:py-32 border-t border-chirp-stone-200 overflow-hidden">
      <div className="mx-auto flex max-w-[1120px] flex-col space-y-32">
        {features.map((feature) => (
          <motion.div 
            key={feature.id} 
            {...reveal} 
            className={`flex flex-col gap-12 lg:items-center ${
              feature.alignRight ? "lg:flex-row-reverse" : "lg:flex-row"
            } lg:justify-between`}
          >
            <div className="w-full lg:w-1/2 flex justify-center">
              {feature.demo}
            </div>
            
            <div className="w-full lg:w-[460px]">
              <h3 className="font-display text-3xl font-bold leading-tight text-chirp-stone-900 md:text-4xl">
                {feature.title}
              </h3>
              <p className="mt-6 text-[17px] leading-[1.75] text-chirp-stone-600">
                {feature.desc}
              </p>
              {feature.subText && (
                <p className="mt-4 font-mono text-xs text-chirp-stone-400">
                  {feature.subText}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { ArchitectureDemo } from "@/components/architecture-demo";

/* ------------------------------------------------------------------ */
/*  Section 4 — Privacy First (Architecture)                           */
/* ------------------------------------------------------------------ */

function PrivacyFirstSection() {
  return (
    <section className="bg-chirp-stone-50 px-6 py-20 md:py-32 border-t border-chirp-stone-200 overflow-hidden">
      <div className="mx-auto flex flex-col items-center max-w-[1120px]">
        
        <div className="flex w-full flex-col gap-16 lg:flex-row lg:items-center lg:justify-between mb-16">
          <motion.div {...reveal} className="max-w-[480px]">
            <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-chirp-stone-900 md:text-5xl">
              Your voice never<br />leaves this machine.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-[17px] leading-[1.75] text-chirp-stone-600">
              <p>
                Most voice-to-text tools send your audio to someone else&apos;s server, process it there, and send text back. You&apos;re trusting a company with every word you say.
              </p>
              <p>
                Chirp doesn&apos;t work like that. The speech model runs on your CPU. The cleanup model runs on your CPU. Nothing is ever uploaded, logged, or transmitted. There is no server.
              </p>
              <p>
                After the initial model download, disconnect from the internet. Chirp won&apos;t even notice.
              </p>
            </div>
          </motion.div>

          <motion.div {...reveal} className="w-full lg:w-[500px]">
            <ArchitectureDemo />
          </motion.div>
        </div>

        <motion.div {...reveal} className="font-mono text-xs text-chirp-stone-400 tracking-widest uppercase text-center w-full">
          Zero servers · Zero telemetry · Zero network calls · MIT licensed
        </motion.div>
        
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Testimonial (Wall of Love)                             */
/* ------------------------------------------------------------------ */

import { Quote } from "lucide-react";

function TestimonialSection() {
  return (
    <section className="bg-chirp-stone-50 px-6 py-24 md:py-32 border-t border-chirp-stone-200 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chirp-amber-400/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-[500px] flex flex-col items-center">
        <motion.div {...reveal} className="w-full relative z-10">
          <div className="bg-white rounded-3xl border border-chirp-stone-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden flex flex-col">
            
            {/* Subtle Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-chirp-amber-400/60 to-transparent opacity-50" />
            
            <Quote className="w-8 h-8 text-chirp-amber-500/20 mb-6" strokeWidth={1.5} />
            
            <div className="mb-4 flex gap-[2px]">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className="text-[#F59E0B] text-[15px]">{star}</span>
              ))}
            </div>
            
            <blockquote className="font-body text-[17px] font-medium leading-[1.7] text-chirp-stone-800">
              &quot;Chirp has completely changed how I work. The local processing speed is incredible, and knowing my client data never leaves my machine is a total gamechanger for my peace of mind.&quot;
            </blockquote>
            
            <div className="w-full h-px bg-chirp-stone-100 my-6" />
            
            <div className="flex items-center gap-3.5">
               <img 
                 src="/pieter.jpg" 
                 alt="Pieter de Bruijn" 
                 className="w-11 h-11 rounded-full object-cover border border-chirp-stone-200/60 shadow-subtle bg-chirp-stone-100 flex-shrink-0"
               />
               <div className="flex flex-col justify-center">
                 <span className="font-bold text-chirp-stone-900 text-[14px] leading-snug">Pieter de Bruijn</span>
                 <span className="text-chirp-stone-500 text-[12px] font-medium">Founder & CEO, SiteLift</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Close / CTA                                            */
/* ------------------------------------------------------------------ */

function CloseSection() {
  return (
    <section className="bg-white px-6 py-32 md:py-48 overflow-hidden relative border-t border-chirp-stone-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-chirp-amber-400/5 blur-[80px] pointer-events-none" />
      
      <motion.div
        {...staggerContainer}
        className="mx-auto flex flex-col items-center text-center max-w-[800px] relative z-10"
      >
        <motion.div {...staggerChild}>
          <BirdMark size={80} color="rgba(245,158,11,0.15)" className="mb-8" />
        </motion.div>

        <motion.h2
          {...staggerChild}
          className="font-display text-5xl font-extrabold tracking-tight text-chirp-stone-900 md:text-6xl"
        >
          Try Chirp.
        </motion.h2>

        <motion.p
          {...staggerChild}
          className="mt-6 text-[20px] font-medium text-chirp-stone-500"
        >
          Free. Private. Yours.
        </motion.p>

        <motion.div {...staggerChild} className="mt-12 relative group">
          <div className="absolute inset-0 bg-chirp-amber-400/20 rounded-full blur-xl group-hover:bg-chirp-amber-400/30 transition-colors" />
          <Link
            href="/download"
            className="relative inline-flex h-14 items-center justify-center rounded-full bg-chirp-amber-500 px-10 font-display text-lg font-bold text-white transition-all hover:bg-chirp-amber-600 shadow-amber"
          >
            Download for Windows
          </Link>
        </motion.div>

        <motion.p
          {...staggerChild}
          className="mt-4 font-mono text-xs text-chirp-stone-400"
        >
          {PRODUCT.version} · MIT License
        </motion.p>

        <div className="mx-auto mt-20 w-[120px] border-t border-black/[0.06]" />

        <motion.div
          {...staggerChild}
          className="mt-8 flex items-center justify-center gap-8"
        >
          <a
            href={PRODUCT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-chirp-stone-500 transition-colors hover:text-chirp-stone-900 flex items-center gap-2"
          >
            GitHub
          </a>
          <Link
            href="/faq"
            className="text-sm font-medium text-chirp-stone-500 transition-colors hover:text-chirp-stone-900"
          >
            FAQ
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium text-chirp-stone-500 transition-colors hover:text-chirp-stone-900"
          >
            Privacy
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Combined Export                                                     */
/* ------------------------------------------------------------------ */

export function HomeSections() {
  return (
    <>
      <PrivacyFirstSection />
      <SmartCleanupSection />
      <FeatureShowcaseSection />
      <TestimonialSection />
      <CloseSection />
    </>
  );
}
