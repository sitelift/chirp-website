import { BIRD_PATH, BIRD_VIEWBOX } from "../lib/bird";

export default function Bird({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${BIRD_VIEWBOX} ${BIRD_VIEWBOX}`} className={className} aria-hidden fill="currentColor">
      <path d={BIRD_PATH} />
    </svg>
  );
}
