"use client";

// Hero centerpiece — a static composition of the Chirp Home page
// rendered in the website using the actual ported components
// (Sparkline, SegmentedControl, card-surface tokens). Visually
// indistinguishable from a real screenshot but no asset capture
// needed — and we get the live sparkline draw-in animation for free.
//
// Static data here is plausible-but-fake for marketing purposes.

import { Sparkline } from "./sparkline";
import { BirdMark } from "./bird-mark";
import { CountUp } from "./count-up";

// 30 days of realistic-feeling daily word counts.
const SPARK_DATA = [
  120, 80, 200, 60, 140, 0, 0,
  300, 420, 380, 90, 510, 0, 0,
  680, 540, 430, 720, 250, 0, 0,
  890, 760, 620, 1240, 980, 200, 50,
  1450, 1120,
];

export function HeroAppPreview() {
  return (
    <div
      className="relative w-full max-w-[1100px]"
      style={{
        // Aggressive fade — bottom half dissolves into canvas. Black
        // through the top 45%, transparent by 80%. Direct port of
        // Fey's hero treatment, with a harsher curve so the
        // dissolve feels intentional, not gentle.
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 45%, transparent 80%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 45%, transparent 80%)",
      }}
    >
      {/* App window frame — top-rounded only, no bottom corners or
          border. The mask above dissolves the bottom into the canvas;
          a closed bottom edge would fight that effect. */}
      <div
        className="overflow-hidden bg-[#0E0E10]"
        style={{
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Slim titlebar — drag-region only, no window controls. The
            controls would imply a closed window; we want the app to
            feel like it extends past the visible frame. */}
        <div className="h-7" />

        {/* Page content */}
        <div className="px-12 pb-10 pt-2">
          {/* Greeting + Readiness pill */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-display text-[18px] font-semibold tracking-[-0.01em] text-white">
                Good evening
              </span>
              <span className="font-display text-[11px] uppercase tracking-[0.18em] text-white/40">
                Tuesday, April 30
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-display text-[11px] text-white/85 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.55)]" />
              <span className="uppercase tracking-[0.14em]">Ready</span>
              <span className="text-white/20">·</span>
              <KeyBadge>Ctrl</KeyBadge>
              <KeyBadge>Shift</KeyBadge>
              <KeyBadge>Space</KeyBadge>
            </div>
          </div>

          {/* Hero card — words this month + sparkline */}
          <section className="card-surface halo-hero relative overflow-hidden">
            <div className="px-8 pt-7">
              <div className="flex justify-end">
                <div className="flex items-center gap-1 font-display text-[11px] uppercase tracking-[0.16em]">
                  <span className="text-white/40">week</span>
                  <span className="text-white/20">·</span>
                  <span className="relative text-white">
                    month
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-1 left-0 right-0 h-px bg-chirp-amber-400"
                    />
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/40">year</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/40">all</span>
                </div>
              </div>
              <div className="mt-2 flex items-end gap-5">
                <CountUp
                  to={23194}
                  durationMs={1400}
                  className="block font-display font-semibold leading-none text-white"
                  style={{
                    fontFeatureSettings: '"tnum"',
                    letterSpacing: "-0.04em",
                    fontSize: "clamp(56px, 7vw, 96px)",
                  }}
                />
                <span className="mb-3 block font-display text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                  Words this month
                </span>
              </div>
            </div>
            <div className="mt-6 h-[64px] w-full px-1">
              <Sparkline
                data={SPARK_DATA}
                strokeWidth={1.25}
                dotRadius={2.75}
                endRatio={2 / 3}
                animateOnMount={true}
                className="h-full w-full"
              />
            </div>
          </section>

          {/* Quick Actions — Smart Cleanup + Tone */}
          <section className="mt-8 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
            <QuickActionCard
              title="Smart Cleanup"
              valueLabel="Cloud"
              description="Cloud key set"
              segments={["Off", "Local", "Cloud"]}
              activeIndex={2}
            />
            <QuickActionCard
              title="Tone"
              valueLabel="Message"
              description="Natural conversational tone"
              segments={["Message", "Email"]}
              activeIndex={0}
            />
          </section>

          {/* Recent entries dropped from the hero composition — the
              bottom dissolve makes them invisible anyway, and shorter
              preview = tighter fold. The full Recent list lives on
              the actual app surface, not in the marketing teaser. */}
        </div>
      </div>

      {/* No amber halo here — the mask gradient creates the atmospheric
          fade on its own; an additional glow fights the dissolve. */}
    </div>
  );
}

// Small inline subcomponents — kept colocated so the hero composition
// is easy to read top-to-bottom.

function KeyBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.04em] text-white/85">
      {children}
    </span>
  );
}

interface QuickActionCardProps {
  title: string;
  valueLabel: string;
  description: string;
  segments: string[];
  activeIndex: number;
}

function QuickActionCard({
  title,
  valueLabel,
  description,
  segments,
  activeIndex,
}: QuickActionCardProps) {
  return (
    <article className="card-surface flex w-full flex-col p-5">
      <header className="mb-4 flex items-center justify-between">
        <span className="font-display text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
          {title}
        </span>
      </header>
      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-display text-[15px] font-medium text-white">
            {valueLabel}
          </span>
          <span className="truncate font-display text-[12px] text-white/45">
            {description}
          </span>
        </div>
        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5">
          {segments.map((seg, i) => (
            <span
              key={seg}
              className={`rounded-full px-3 py-1 font-display text-[12px] ${
                i === activeIndex
                  ? "bg-white/[0.10] text-white"
                  : "text-white/45"
              }`}
            >
              {seg}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// Re-export for convenience if a section wants the BirdMark with
// the same import root.
export { BirdMark };
