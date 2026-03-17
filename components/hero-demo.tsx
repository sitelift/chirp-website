"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirdMark } from "@/components/bird-mark";

const TYPED_TEXT =
  "I was thinking we should probably move the meeting to Thursday, if that works.";

const BAR_COUNT = 16;
const CHAR_DELAY = 40;
const WAVEFORM_INTERVAL = 80;
const LISTEN_DURATION = 3000;
const PAUSE_BEFORE_START = 1000;
const PAUSE_AFTER_COMPLETE = 3000;
const PROCESSING_DURATION = 600;
const OVERLAY_FADE_DURATION = 500;

type Phase = "idle" | "listening" | "processing" | "typing" | "done";

export function HeroDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [barHeights, setBarHeights] = useState<number[]>(
    () => Array.from({ length: BAR_COUNT }, () => 3)
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const charIndexRef = useRef(0);
  const mountedRef = useRef(true);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const randomizeHeights = useCallback(() => {
    setBarHeights(
      Array.from({ length: BAR_COUNT }, () => Math.floor(Math.random() * 21) + 3)
    );
  }, []);

  const startCycle = useCallback(() => {
    if (!mountedRef.current) return;

    setText("");
    charIndexRef.current = 0;
    setPhase("idle");

    timerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      setPhase("listening");

      intervalRef.current = setInterval(randomizeHeights, WAVEFORM_INTERVAL);

      timerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPhase("processing");

        timerRef.current = setTimeout(() => {
          if (!mountedRef.current) return;
          setPhase("typing");
        }, PROCESSING_DURATION);
      }, LISTEN_DURATION);
    }, PAUSE_BEFORE_START);
  }, [randomizeHeights]);

  useEffect(() => {
    if (phase !== "typing") return;

    const typeNext = () => {
      if (!mountedRef.current) return;
      if (charIndexRef.current < TYPED_TEXT.length) {
        charIndexRef.current++;
        setText(TYPED_TEXT.slice(0, charIndexRef.current));
        timerRef.current = setTimeout(typeNext, CHAR_DELAY);
      } else {
        setPhase("done");

        timerRef.current = setTimeout(() => {
          if (!mountedRef.current) return;
          startCycle();
        }, PAUSE_AFTER_COMPLETE);
      }
    };

    timerRef.current = setTimeout(typeNext, CHAR_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, startCycle]);

  useEffect(() => {
    mountedRef.current = true;
    startCycle();
    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, [startCycle, clearTimers]);

  const showOverlay = phase === "listening" || phase === "processing";

  return (
    <div className="mx-auto mt-16 w-full max-w-[720px] overflow-hidden rounded-2xl bg-white shadow-hero">
      <div className="flex items-center gap-2 rounded-t-2xl bg-chirp-stone-100 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-chirp-stone-300" />
          <span className="h-2 w-2 rounded-full bg-chirp-stone-300" />
          <span className="h-2 w-2 rounded-full bg-chirp-stone-300" />
        </div>
        <span className="flex-1 text-center font-mono text-xs text-chirp-stone-400">
          Untitled — Editor
        </span>
        <div className="w-[52px]" />
      </div>

      <div className="relative min-h-[200px] p-6">
        <p className="font-body text-base leading-relaxed text-chirp-stone-800">
          {text}
          <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-chirp-stone-900" />
        </p>

        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: OVERLAY_FADE_DURATION / 1000 }}
              className="absolute bottom-4 right-4 flex items-center gap-3 rounded-xl bg-white p-3 shadow-elevated"
            >
              <BirdMark size={16} />
              <div className="flex items-end gap-[3px]">
                {barHeights.map((h, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full bg-chirp-amber-500"
                    style={{
                      height: phase === "processing" ? 6 : h,
                      transition: "height 80ms ease",
                      opacity: phase === "processing" ? 0.5 : 1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
