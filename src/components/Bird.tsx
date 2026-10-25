import type { SVGProps } from "react";
import { BIRD_PATH, BIRD_VIEWBOX } from "../lib/bird";

export default function Bird(props: SVGProps<SVGSVGElement> & { "data-on"?: string }) {
  return (
    <svg viewBox={`0 0 ${BIRD_VIEWBOX} ${BIRD_VIEWBOX}`} aria-hidden fill="currentColor" {...props}>
      <path d={BIRD_PATH} />
    </svg>
  );
}
