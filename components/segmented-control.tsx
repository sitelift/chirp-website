"use client";

// Ported pattern from the Chirp app's QuickActions card. A pill-chrome
// segmented selector that's used on Home for Smart Cleanup (Off/Local/
// Cloud) and Tone (Message/Email). On the website we use it for the
// Mac/Windows download switcher and any other "one of N" choices.

interface SegmentedControlProps<T extends string> {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  disabled?: boolean;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  disabled,
  className = "",
}: SegmentedControlProps<T>) {
  return (
    <div
      className={`flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 ${
        disabled ? "opacity-60" : ""
      } ${className}`}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            disabled={disabled}
            className={`rounded-full px-3 py-1 font-display text-[12px] transition-all duration-150 active:scale-95 disabled:cursor-not-allowed ${
              active
                ? "bg-white/[0.10] text-white"
                : "text-white/45 hover:text-white/85"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
