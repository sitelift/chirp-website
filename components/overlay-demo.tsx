"use client";

import { useEffect, useRef, useState } from "react";
import { TransientCanvas } from "./transient-canvas";

// The "what it does" scene's centerpiece. Wraps the ported
// TransientCanvas with synthetic looping amplitudes + auto-cycling
// state, so the visitor sees the listening waveform → polishing dots
// → fade → restart loop without ever touching their mic.
//
// Cycle:
//   listening (4.5s)  →  polishing (2s)  →  fade (0.4s)  →  reset
//
// Amplitudes are driven by a sum of three sine waves at speech-like
// frequencies plus a slow envelope so the bars rise and fall in
// realistic-feeling waves rather than a flat oscillation.

type Mode = "listening" | "polishing";

const SAMPLE_COUNT = 24;
const FRAME_INTERVAL_MS = 50; // ~20fps update rate

const PHASE_DURATION_MS = {
  listening: 4500,
  polishing: 2000,
  dismiss: 400,
} as const;

function generateAmplitudes(t: number): number[] {
  // t in seconds. Build a speech-envelope-like pattern.
  const out: number[] = [];
  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const phase = (i / SAMPLE_COUNT) * Math.PI * 2;
    // Three layered oscillators at speech-like rates.
    const v1 = Math.sin(t * 4.7 + phase) * 0.5 + 0.5;
    const v2 = Math.sin(t * 9.3 + phase * 1.7) * 0.5 + 0.5;
    const v3 = Math.sin(t * 2.1 + phase * 0.6) * 0.5 + 0.5;
    // Slow envelope simulates breath / sentence rhythm.
    const env = (Math.sin(t * 1.3) * 0.5 + 0.5) * 0.7 + 0.3;
    const blend = (v1 * 0.5 + v2 * 0.3 + v3 * 0.2) * env;
    // Mild per-bar randomness so peaks don't all align.
    const jitter = (Math.sin(t * 17 + i * 3.1) * 0.5 + 0.5) * 0.15;
    out.push(Math.min(1, blend + jitter));
  }
  return out;
}

interface OverlayDemoProps {
  className?: string;
}

export function OverlayDemo({ className = "" }: OverlayDemoProps) {
  const [mode, setMode] = useState<Mode>("listening");
  const [amplitudes, setAmplitudes] = useState<number[]>(() =>
    generateAmplitudes(0),
  );
  const [dismissing, setDismissing] = useState(false);
  const [visible, setVisible] = useState(true);

  const startTimeRef = useRef<number>(0);

  // Frame loop — updates synthetic amplitudes while listening.
  useEffect(() => {
    if (mode !== "listening" || !visible) return;
    if (startTimeRef.current === 0) {
      startTimeRef.current = performance.now();
    }
    const interval = setInterval(() => {
      const t = (performance.now() - startTimeRef.current) / 1000;
      setAmplitudes(generateAmplitudes(t));
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [mode, visible]);

  // State-machine timer.
  useEffect(() => {
    if (!visible) return;
    let timer: ReturnType<typeof setTimeout>;

    if (mode === "listening") {
      timer = setTimeout(() => {
        setMode("polishing");
      }, PHASE_DURATION_MS.listening);
    } else if (mode === "polishing") {
      timer = setTimeout(() => {
        setDismissing(true);
        setTimeout(() => {
          // Reset for the next cycle.
          setVisible(false);
          setTimeout(() => {
            startTimeRef.current = 0;
            setMode("listening");
            setDismissing(false);
            setVisible(true);
          }, 250);
        }, PHASE_DURATION_MS.dismiss);
      }, PHASE_DURATION_MS.polishing);
    }

    return () => clearTimeout(timer);
  }, [mode, visible]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {visible ? (
        <TransientCanvas
          mode={mode}
          amplitudes={amplitudes}
          dismissing={dismissing}
        />
      ) : (
        // Reserve the same footprint while the canvas is invisible
        // so the surrounding layout doesn't reflow each cycle.
        <div className="h-10 w-[120px]" aria-hidden />
      )}
    </div>
  );
}
