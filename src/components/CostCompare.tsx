import { useState } from "react";

// What a month of dictation costs. Chirp's speech recognition runs on your PC,
// so the only paid part is a short text call with your own key. Claude Haiku
// 5.5 is $0.10 / $0.50 per million input / output tokens; one cleanup is a
// ~4,300-token cached prompt plus ~130 tokens in and ~60 out: about $0.0001
// with a warm cache, $0.0006 when the cache has to be written again.
const WARM = 0.0001;
const COLD = 0.0006;

// Vendors' own pricing pages, checked 2026-10-25 (monthly billing).
const SUBSCRIPTIONS = [
  { name: "Wispr Flow Pro", price: 15 },
  { name: "Willow Pro", price: 15 },
  { name: "Aqua Voice Pro", price: 12 },
  { name: "Superwhisper Pro", price: 8.49 },
];

const money = (v: number) => (v < 10 ? `$${v.toFixed(2)}` : `$${Math.round(v)}`);

export default function CostCompare() {
  const [perDay, setPerDay] = useState(100);
  const low = perDay * 30 * WARM;
  const high = perDay * 30 * COLD;
  const max = 15;
  const pct = (v: number) => `${Math.max(0.6, (v / max) * 100)}%`;

  return (
    <div className="mt-14 rounded-[28px] border border-white/[0.07] p-6 md:p-10">
      <label className="block">
        <span className="flex items-baseline justify-between gap-4 text-[17px] text-stone-300">
          <span>Dictations a day</span>
          <span className="font-display text-[28px] font-semibold tabular-nums tracking-[-0.03em] text-stone-50">{perDay}</span>
        </span>
        <input
          type="range"
          min={10}
          max={300}
          step={10}
          value={perDay}
          onChange={(e) => setPerDay(Number(e.target.value))}
          className="range mt-4 w-full"
          aria-label="Dictations a day"
        />
      </label>

      <div className="mt-10 space-y-5">
        <Bar label="Chirp, cleanup off" value="$0" width={pct(0)} accent />
        <Bar label="Chirp, with Claude Haiku 5.5" value={`${money(low)}–${money(high)}`} width={pct(high)} accent />
        {SUBSCRIPTIONS.map((s) => (
          <Bar key={s.name} label={s.name} value={money(s.price)} width={pct(s.price)} />
        ))}
      </div>
      <p className="mt-8 text-[15px] leading-relaxed text-stone-500">
        A month of {perDay * 30} dictations. Subscriptions are monthly list prices, the same however much you use them. Chirp's
        range is what Anthropic charges for the cleanup calls; you pay them directly with your own key.
      </p>
    </div>
  );
}

function Bar({ label, value, width, accent }: { label: string; value: string; width: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[minmax(0,13rem)_1fr] items-center gap-4 md:grid-cols-[16rem_1fr]">
      <span className={`text-[15px] md:text-[16px] ${accent ? "text-stone-100" : "text-stone-400"}`}>{label}</span>
      <span className="flex items-center gap-4">
        <span className="relative h-3 flex-1">
          <span
            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-300"
            style={{ width, background: accent ? "#f0b723" : "#44403c", transitionTimingFunction: "var(--ease)" }}
          />
        </span>
        <span className={`w-[9.5rem] shrink-0 text-right font-display text-[18px] font-semibold tabular-nums ${accent ? "text-amber" : "text-stone-300"}`}>
          {value}
          <span className="ml-1 text-[13px] font-normal text-stone-500">/mo</span>
        </span>
      </span>
    </div>
  );
}
