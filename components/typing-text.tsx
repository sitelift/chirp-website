"use client";

import { useEffect, useState } from "react";

// Reveals `text` character-by-character on a fixed-length cycle, then
// loops. Multiple TypingText components mounted at the same time stay
// visually in sync as long as their `cycleMs` is identical — the
// internal clock is a modulo of `performance.now()` from mount.
//
// Cycle layout within `cycleMs`:
//   0           → startMs           : empty (waiting)
//   startMs     → startMs + typeMs  : typing chars in
//   startMs+typeMs → cycleMs        : holding fully revealed
// Then resets and repeats.

interface Props {
  text: string;
  /** Total cycle length, including type-in + hold. */
  cycleMs: number;
  /** Delay from cycle start before typing begins. */
  startMs: number;
  /** Duration of the type-in animation. */
  typeMs: number;
}

export function TypingText({ text, cycleMs, startMs, typeMs }: Props) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const tick = () => {
      const elapsed = (performance.now() - startTime) % cycleMs;
      if (elapsed < startMs) {
        setShown(0);
      } else if (elapsed < startMs + typeMs) {
        const progress = (elapsed - startMs) / typeMs;
        setShown(Math.floor(progress * text.length));
      } else {
        setShown(text.length);
      }
    };
    tick();
    const interval = setInterval(tick, 30);
    return () => clearInterval(interval);
  }, [text, cycleMs, startMs, typeMs]);

  return <>{text.slice(0, shown)}</>;
}
