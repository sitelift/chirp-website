"use client";

import { useEffect, useRef, useState } from "react";

// Animates a number from 0 to `to` with an ease-out curve. Uses
// requestAnimationFrame, locale-formatted output, and is paired with
// tabular-numeral CSS in the consumer so the digit width doesn't
// jiggle while counting.
//
// Mirrors the Chirp app's `useAnimatedNumber` hook in HeroMetric.tsx
// exactly — no reduced-motion override, since the app doesn't have
// one and we want byte-identical animation behavior.

interface CountUpProps {
  to: number;
  /** Total animation duration in ms. Default 700ms — matches the
   *  Chirp app's `useAnimatedNumber` hook in HeroMetric.tsx exactly. */
  durationMs?: number;
  /** Optional delay before the count starts. */
  delayMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  to,
  durationMs = 700,
  delayMs = 0,
  className,
  style,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let frameId = 0;
    let startTime: number | null = null;

    const tick = (t: number) => {
      if (startTime === null) startTime = t;
      const elapsed = t - startTime - delayMs;
      if (elapsed < 0) {
        frameId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic — fast start, settled finish.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [to, durationMs, delayMs]);

  return (
    <span className={className} style={style}>
      {value.toLocaleString("en-US")}
    </span>
  );
}
