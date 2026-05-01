// Three kbd-style key glyphs representing the global hotkey
// (Ctrl + Shift + Space on Windows; the marketing site shows the
// Windows form since that's the most common visitor profile).
// Visually the trio sits with a subtle amber glow underneath,
// implying activity without animating — animation lives in the
// listening pill that follows in the cascade.

export function HotkeyTrio() {
  return (
    <div className="relative flex items-center gap-2">
      {/* Soft amber pool under the keys. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(240,183,35,0.12) 0%, transparent 70%)",
        }}
      />
      <Key>Ctrl</Key>
      <Plus />
      <Key>Shift</Key>
      <Plus />
      <Key wide>Space</Key>
    </div>
  );
}

function Key({
  children,
  wide,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <span
      className={`relative z-10 inline-flex h-12 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-white/90 backdrop-blur-md ${
        wide ? "px-6" : "px-4"
      }`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 18px rgba(0,0,0,0.4)",
      }}
    >
      {children}
    </span>
  );
}

function Plus() {
  return (
    <span
      aria-hidden
      className="relative z-10 font-mono text-[13px] text-white/30"
    >
      +
    </span>
  );
}
