"use client";

import { useEffect, useRef } from "react";

// Cursor-following amber spotlight overlay. Sets CSS custom
// properties --spot-x / --spot-y on the section root via mousemove,
// and a child div renders a radial-gradient anchored to those vars.
// Honors prefers-reduced-motion (no listener attached).

interface CursorSpotlightProps {
  className?: string;
  /** 0..1 — opacity of the spotlight at its center. Default 0.18. */
  intensity?: number;
  /** Radius of the spotlight in pixels. Default 420. */
  radius?: number;
  /** Color (hex/rgb). Default Chirp amber. */
  color?: string;
}

export function CursorSpotlight({
  className = "",
  intensity = 0.18,
  radius = 420,
  color = "#F0B723",
}: CursorSpotlightProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;
    const handle = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pendingX = e.clientX - rect.left;
      pendingY = e.clientY - rect.top;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--spot-x", `${pendingX}px`);
        el.style.setProperty("--spot-y", `${pendingY}px`);
      });
    };
    window.addEventListener("pointermove", handle);
    return () => {
      window.removeEventListener("pointermove", handle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "30%",
          background: `radial-gradient(${radius}px circle at var(--spot-x) var(--spot-y), ${color}${Math.round(
            intensity * 255,
          )
            .toString(16)
            .padStart(2, "0")}, transparent 70%)`,
        } as React.CSSProperties
      }
    />
  );
}
