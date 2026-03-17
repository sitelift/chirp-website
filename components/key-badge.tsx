"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const keys = ["Ctrl", "Shift", "Space"];

export function KeyBadge() {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPressed(true);
      setTimeout(() => setPressed(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center rounded-2xl bg-white p-8 shadow-surface">
      <div className="flex items-center gap-2">
        {keys.map((key, i) => (
          <span key={key} className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block rounded-lg border border-chirp-stone-200 bg-chirp-stone-50 px-3 py-2 font-mono text-sm text-chirp-stone-700 transition-all duration-200",
                pressed
                  ? "translate-y-[2px] shadow-none"
                  : "shadow-[0_2px_0_0_rgba(0,0,0,0.06)]"
              )}
            >
              {key}
            </span>
            {i < keys.length - 1 && (
              <span className="text-xs text-chirp-stone-300">+</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
