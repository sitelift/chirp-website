"use client";

import { useEffect, useRef, useState } from "react";

// Animates a number from 0 to `to` with an ease-out curve. Uses
// requestAnimationFrame, locale-formatted output, and is paired with
// tabular-numeral CSS in the consumer so the digit width doesn't
// jiggle while counting.
//
// Honors prefers-reduced-motion: snaps straight to the final value.

interface CountUpProps {
  to: number;
  /** Total animation duration in ms. Default 1400ms — matches the
   *  sparkline draw-in so they finish in lockstep. */
  durationMs?: number;
  /** Optional delay before the count starts. */
  delayMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  to,
  durationMs = 1400,
  delayMs = 0,
  className,
  style,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(to);
      return;
    }

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
