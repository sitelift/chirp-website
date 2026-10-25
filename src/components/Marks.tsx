// Drawn tick and cross for comparisons (font glyphs render inconsistently).
export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`inline-block h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Yes" role="img">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}
export function Cross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`inline-block h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-label="No" role="img">
      <path d="M6 6l8 8M14 6l-8 8" />
    </svg>
  );
}
