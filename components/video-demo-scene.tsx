"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerChild } from "@/lib/motion";

export function VideoDemoScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <section className="relative overflow-hidden px-6 py-32 md:py-44 lg:py-52">
      <motion.div
        {...staggerContainer}
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center"
      >
        <motion.h2
          {...staggerChild}
          className="halo-hero relative max-w-[18ch] text-center font-display font-semibold leading-[0.96] tracking-tight text-white"
          style={{
            fontSize: "clamp(40px, 5.6vw, 78px)",
            letterSpacing: "-0.03em",
          }}
        >
          From voice to text, instantly.
        </motion.h2>

        <motion.div {...staggerChild} className="mt-14 w-full md:mt-20">
          <div
            role="button"
            aria-label={isPlaying ? "Pause demo" : "Play demo"}
            onClick={toggle}
            className="relative cursor-pointer select-none"
          >
            <video
              ref={videoRef}
              src="/demo/chirp-demo-screen.mov"
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="block h-auto w-full"
            />

            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                isPlaying ? "opacity-0" : "opacity-100"
              }`}
            >
              <span
                className="flex items-center justify-center rounded-full bg-white/95 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
                style={{
                  width: "clamp(72px, 9vw, 112px)",
                  height: "clamp(72px, 9vw, 112px)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="black"
                  className="ml-[10%]"
                  style={{
                    width: "clamp(28px, 3.5vw, 44px)",
                    height: "clamp(28px, 3.5vw, 44px)",
                  }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
