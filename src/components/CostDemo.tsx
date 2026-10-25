import { useState } from "react";

// A month of dictation. Speech recognition runs on your PC, so the only paid
// part is one short text call on your own key. Claude Haiku 5.5 is $0.10 / $0.50
// per million input / output tokens; one cleanup is a ~4,300-token cached prompt
// plus ~130 tokens in and ~60 out: about $0.0001 with a warm cache, $0.0006 cold.
// We show the cold, worst case.
const PER_DICTATION = 0.0006;

// Vendors' own pricing pages, checked 2026-10-25 (monthly billing).
const SUBSCRIPTION = { low: 8.49, high: 15 };

const money = (v: number) => (v < 10 ? `$${v.toFixed(2)}` : `$${Math.round(v)}`);

export default function CostDemo() {
  const [perDay, setPerDay] = useState(100);
  const chirp = perDay * 30 * PER_DICTATION;

  return (
    <div className="rounded-[28px] bg-white/[0.06] p-7 md:p-10">
      <label className="block">
        <span className="flex items-baseline justify-between text-[16px] text-white/60">
          <span>Dictations a day</span>
          <span className="font-serif text-[34px] leading-none tabular-nums text-white">{perDay}</span>
        </span>
        <input
          type="range"
          min={10}
          max={300}
          step={10}
          value={perDay}
          onChange={(e) => setPerDay(Number(e.target.value))}
          className="mt-4 w-full cursor-pointer accent-amber"
          aria-label="Dictations a day"
        />
      </label>

      <div className="mt-10 space-y-8">
        <Row label="Chirp" value={`up to ${money(chirp)}`} width={(chirp / SUBSCRIPTION.high) * 100} accent />
        <Row label="A dictation subscription" value={`$${SUBSCRIPTION.low}–$${SUBSCRIPTION.high}`} width={100} />
      </div>

      <p className="mt-8 text-[14px] leading-relaxed text-white/45">
        Chirp is $0 with AI cleanup off. With it on, you pay Anthropic directly for Claude Haiku 5.5, and we've assumed the worst case for
        every call. Subscriptions are Wispr Flow, Willow, Aqua Voice and Superwhisper list prices.
      </p>
    </div>
  );
}

function Row({ label, value, width, accent }: { label: string; value: string; width: number; accent?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[17px] text-white/80">{label}</span>
        <span className={`font-serif text-[clamp(28px,3vw,40px)] leading-none tabular-nums ${accent ? "text-amber" : "text-white"}`}>
          {value}
          <span className="ml-1 font-sans text-[15px] text-white/45">/mo</span>
        </span>
      </div>
      <div className="mt-3 h-3 rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full transition-[width] duration-300"
          style={{ width: `${Math.max(1.5, width)}%`, background: accent ? "#f0b723" : "#8a8985", transitionTimingFunction: "var(--ease)" }}
        />
      </div>
    </div>
  );
}
