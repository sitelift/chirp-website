"use client";

export function Waveform() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-surface">
      {/* Input waveform */}
      <div>
        <span className="mb-2 block font-mono text-xs font-medium text-chirp-stone-500">
          Input
        </span>
        <div className="flex items-end gap-[3px]">
          {Array.from({ length: 24 }, (_, i) => (
            <span
              key={`noisy-${i}`}
              className="w-[3px] origin-bottom rounded-full bg-chirp-stone-300"
              style={{
                height: `${Math.abs(Math.sin(i * 1.3)) * 28 + 6}px`,
                animation: `waveform-bar ${800 + Math.abs(Math.sin(i * 2.1)) * 600}ms ease-in-out ${i * 40}ms infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Arrow / label */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-chirp-stone-200" />
        <span className="font-mono text-xs text-chirp-stone-400">
          noise suppressed
        </span>
        <div className="h-px flex-1 bg-chirp-stone-200" />
      </div>

      {/* Output waveform */}
      <div>
        <span className="mb-2 block font-mono text-xs font-medium text-chirp-stone-500">
          Output
        </span>
        <div className="flex items-end gap-[4px]">
          {Array.from({ length: 16 }, (_, i) => {
            const height = Math.sin((i / 16) * Math.PI * 2) * 12 + 16;
            return (
              <span
                key={`clean-${i}`}
                className="w-[3px] origin-bottom rounded-full bg-chirp-amber-500"
                style={{
                  height: `${height}px`,
                  animation: `waveform-bar ${1200 + i * 50}ms ease-in-out ${i * 60}ms infinite`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
