import { useState } from "react";

// A month of dictation. Speech recognition runs on your PC, so the app costs
// nothing to use. The only optional cost is AI cleanup on your own key: with
// Claude Haiku 5.5 ($0.10 / $0.50 per million input / output tokens) one cleanup
// is a ~4,300-token cached prompt plus ~130 tokens in and ~60 out, about $0.0001
// with a warm prompt cache and $0.0006 when the cache has to be written again.
const WARM = 0.0001;
const COLD = 0.0006;

// Vendors' own pricing pages, checked 2026-10-25 (monthly billing).
const SUB_LOW = 8.49;
const SUB_HIGH = 15;

const money = (v: number) => (v < 10 ? `$${v.toFixed(2)}` : `$${Math.round(v)}`);

export default function CostDemo() {
  const [perDay, setPerDay] = useState(100);
  const month = perDay * 30;
  const low = month * WARM;
  const high = month * COLD;

  return (
    <div className="rounded-[28px] bg-white p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] md:p-12">
      <label className="block">
        <span className="flex items-baseline justify-between gap-4 text-[17px] text-muted">
          <span>How much you dictate</span>
          <span className="whitespace-nowrap text-ink">
            <span className="font-serif text-[32px] tabular-nums">{perDay}</span> a day
          </span>
        </span>
        <input
          type="range"
          min={10}
          max={300}
          step={10}
          value={perDay}
          onChange={(e) => setPerDay(Number(e.target.value))}
          className="range-lg mt-5 w-full"
          aria-label="Dictations a day"
        />
        <span className="mt-1 flex justify-between text-[13px] text-faint">
          <span>10</span>
          <span>300</span>
        </span>
      </label>

      <div className="mt-10 divide-y divide-line border-y border-line">
        <Row label="Chirp" value="$0" width={0} accent />
        <Row label="Optional AI cleanup, on your key" value={`${money(low)}–${money(high)}`} width={(high / SUB_HIGH) * 100} accent />
        <Row label="A dictation subscription" value={`$${SUB_LOW}–$${SUB_HIGH}`} width={100} />
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-muted">
        AI cleanup is Claude Haiku 5.5, paid to Anthropic, for {month.toLocaleString("en-US")} dictations a month. Subscriptions run from Superwhisper Pro to
        Wispr Flow Pro.
      </p>
    </div>
  );
}

function Row({ label, value, width, accent }: { label: string; value: string; width: number; accent?: boolean }) {
  return (
    <div className="py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[17px] text-ink">{label}</span>
        <span className="whitespace-nowrap font-serif text-[30px] leading-none tabular-nums md:text-[34px]">
          {value}
          <span className="ml-1 font-sans text-[15px] text-muted">/mo</span>
        </span>
      </div>
      <div className="mt-3 h-2.5 rounded-full bg-[#efebe2]">
        <div
          className="h-full rounded-full transition-[width] duration-300"
          style={{ width: `${Math.max(1.2, width)}%`, background: accent ? "#f0b723" : "#8a8985", transitionTimingFunction: "var(--ease)" }}
        />
      </div>
    </div>
  );
}
