// Stylized CSS-only stand-in for atmospheric brand bitmaps that
// will be generated via ChatGPT image gen in a separate daytime
// task. Rebuilt to feel CRAFTED rather than generic placeholder
// art — concentric rings with calibration tick marks, viewfinder
// corner brackets, layered radial blooms, a subtle conic
// rotation, and the Chirp BirdMark seated in a deep inner well.
//
// Codex round 3 flagged the previous version as "still feels
// placeholder" because it read as a dotted card with rings. This
// rebuild gives the slot its own material weight so it can stand
// as the section's primary object even before the real bitmap
// lands.
//
// Usage:
//   <BrandPlaceholder name="close-cta-monument" aspectRatio="16 / 10" />
//
// When the real image lands at public/brand/<name>.png, swap the
// component for <Image src="/brand/<name>.png" /> at the same call
// site — layout dimensions are set by aspectRatio, so the swap is
// pixel-stable.
//
// Every active slot must be logged in BRAND_IMAGE_SLOTS.md at the
// repo root.

import { BirdMark } from "./bird-mark";

interface Props {
  /** Stable identifier — must match the eventual public/brand/<name>.png. */
  name: string;
  /** CSS aspect-ratio value. Defaults to a wide editorial 16:10. */
  aspectRatio?: string;
  /** Optional sub-label below the name. Defaults to nothing. */
  caption?: string;
  className?: string;
}

export function BrandPlaceholder({
  name,
  aspectRatio = "16 / 10",
  caption,
  className = "",
}: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[20px] ${className}`}
      style={{
        aspectRatio,
        background:
          "radial-gradient(ellipse at 50% 35%, #14130F 0%, #0A0A0C 55%, #050507 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -40px 80px rgba(0,0,0,0.6)",
      }}
    >
      {/* Layered atmosphere: subtle dotted bg masked by a vertical
          gradient so the dots fade out near the edges instead of
          tiling all the way to the rounded corners. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Slow conic rotation behind everything — gives the
          composition a sense of being alive without being
          distracting. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(85%, 720px)",
          aspectRatio: "1 / 1",
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(240,183,35,0.045) 22%, transparent 50%, rgba(255,255,255,0.025) 72%, transparent 100%)",
          opacity: 0.6,
          filter: "blur(40px)",
        }}
      />

      {/* Three concentric rings — outer hairline, middle solid,
          inner with calibration tick marks rendered via dashed
          stroke for that camera-viewfinder cue. */}
      <Ring sizePct={70} opacity={0.05} />
      <Ring sizePct={52} opacity={0.08} />
      <Ring
        sizePct={36}
        opacity={0.12}
        dashed
        dashLength={1.5}
        dashGap={6}
      />

      {/* Soft amber pool behind the inner well. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: "min(38%, 320px)",
          aspectRatio: "1 / 1",
          background:
            "radial-gradient(circle, rgba(240,183,35,0.18) 0%, rgba(240,183,35,0.04) 45%, transparent 70%)",
        }}
      />

      {/* Inner well — deep recess holding the BirdMark. The inset
          shadow creates the illusion of a milled-out cavity. */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: "clamp(96px, 14%, 152px)",
            aspectRatio: "1 / 1",
            background:
              "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.85) 65%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "inset 0 2px 6px rgba(0,0,0,0.6), 0 0 0 6px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.5)",
          }}
        >
          <BirdMark size={56} />
        </div>
      </div>

      {/* Viewfinder brackets in each corner — small L-shapes that
          read as a calibrated frame, not decorative chrome. */}
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />

      {/* Vignette toward the bottom edge — anchors the composition
          and smooths the transition into the surrounding canvas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Caption — sits at the bottom-center over the vignette. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          {name}
        </span>
        {caption && (
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/25">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}

interface RingProps {
  sizePct: number;
  opacity: number;
  dashed?: boolean;
  dashLength?: number;
  dashGap?: number;
}

function Ring({ sizePct, opacity, dashed, dashLength = 1, dashGap = 4 }: RingProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: `${sizePct}%`,
        aspectRatio: "1 / 1",
        border: `1px ${dashed ? "dashed" : "solid"} rgba(255,255,255,${opacity})`,
        ...(dashed && {
          // Render a fine dashed border using a CSS background trick
          // since `border-dashed` doesn't allow custom dash widths.
          backgroundImage: `repeating-conic-gradient(rgba(255,255,255,${opacity}) 0deg ${dashLength}deg, transparent ${dashLength}deg ${dashLength + dashGap}deg)`,
          border: "none",
          backgroundColor: "transparent",
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent calc(50% - 1.5px), black calc(50% - 0.5px), black calc(50% + 0.5px), transparent calc(50% + 1.5px))",
          maskImage:
            "radial-gradient(circle at center, transparent calc(50% - 1.5px), black calc(50% - 0.5px), black calc(50% + 0.5px), transparent calc(50% + 1.5px))",
        }),
      }}
    />
  );
}

function CornerBracket({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");
  const inset = "20px";
  const len = 18;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        top: isTop ? inset : "auto",
        bottom: !isTop ? inset : "auto",
        left: isLeft ? inset : "auto",
        right: !isLeft ? inset : "auto",
        width: len,
        height: len,
      }}
    >
      {/* Horizontal arm. */}
      <div
        className="absolute"
        style={{
          height: 1,
          width: len,
          background: "rgba(255,255,255,0.20)",
          top: isTop ? 0 : "auto",
          bottom: !isTop ? 0 : "auto",
          left: 0,
        }}
      />
      {/* Vertical arm. */}
      <div
        className="absolute"
        style={{
          width: 1,
          height: len,
          background: "rgba(255,255,255,0.20)",
          left: isLeft ? 0 : "auto",
          right: !isLeft ? 0 : "auto",
          top: 0,
        }}
      />
    </div>
  );
}
