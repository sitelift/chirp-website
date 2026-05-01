"use client";

import { useEffect, useRef, useState } from "react";
import { TransientCanvas } from "./transient-canvas";

// A locked-listening variant of the overlay pill. Same TransientCanvas
// the desktop app uses, fed synthetic amplitudes from three layered
// sine waves at speech-like frequencies — but it never cycles to
// polishing/dismiss. Use this when a scene wants to show the
// "listening" beat specifically without the auto state-machine of
// OverlayDemo.
//
// Synthetic-amplitude generator is a verbatim copy of the one in
// overlay-demo.tsx so both components produce visually identical
// waveforms.

const SAMPLE_COUNT = 24;
const FRAME_INTERVAL_MS = 50; // ~20fps update rate

function generateAmplitudes(t: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const phase = (i / SAMPLE_COUNT) * Math.PI * 2;
    const v1 = Math.sin(t * 4.7 + phase) * 0.5 + 0.5;
    const v2 = Math.sin(t * 9.3 + phase * 1.7) * 0.5 + 0.5;
    const v3 = Math.sin(t * 2.1 + phase * 0.6) * 0.5 + 0.5;
    const env = (Math.sin(t * 1.3) * 0.5 + 0.5) * 0.7 + 0.3;
    const blend = (v1 * 0.5 + v2 * 0.3 + v3 * 0.2) * env;
    const jitter = (Math.sin(t * 17 + i * 3.1) * 0.5 + 0.5) * 0.15;
    out.push(Math.min(1, blend + jitter));
  }
  return out;
}

export function ListeningCanvas() {
  const [amplitudes, setAmplitudes] = useState<number[]>(() =>
    generateAmplitudes(0),
  );
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    const interval = setInterval(() => {
      const t = (performance.now() - startTimeRef.current) / 1000;
      setAmplitudes(generateAmplitudes(t));
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <TransientCanvas
      mode="listening"
      amplitudes={amplitudes}
      dismissing={false}
    />
  );
}
