// Stylized CSS-only stand-in for atmospheric brand bitmaps that
// will be generated via ChatGPT image gen in a separate daytime
// task. Looks intentional even without the real PNG — card-surface
// frame, dotted bg, two concentric hairline rings, soft amber pool,
// the Chirp BirdMark in a small inner ring, and a mono uppercase
// label at the bottom edge naming the slot.
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
        background: "#0E0E10",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Dotted ambient backdrop. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Two concentric hairline rings, centered. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "min(70%, 560px)",
          aspectRatio: "1 / 1",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "min(45%, 360px)",
          aspectRatio: "1 / 1",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      />

      {/* Soft amber pool behind the brand mark. */}
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

      {/* Inner ring with the BirdMark — anchors the composition. */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div
          className="halo-mark flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm"
          style={{
            width: "clamp(80px, 11%, 132px)",
            aspectRatio: "1 / 1",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <BirdMark size={56} />
        </div>
      </div>

      {/* Bottom label — names the slot so it's identifiable when
          the real image hasn't landed yet. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          Brand image · {name}
        </span>
        {caption && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
