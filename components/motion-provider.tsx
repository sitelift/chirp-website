"use client";

import { MotionConfig } from "framer-motion";

// Force framer-motion to ignore the system's prefers-reduced-motion
// preference. The Chirp desktop app's animations run unconditionally,
// and the website is meant to behave identically — so we lock motion
// on, regardless of OS / browser accessibility state.
//
// Mounted at the root layout so every motion.* component below it
// inherits the override.

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
