import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Fey-style announcement pill. Rounded glass chrome on a dark canvas,
// subtle amber accent dot on the left, click-through to /changelog
// (or any href). Sits above the hero headline.

interface AnnouncementPillProps {
  href: string;
  label: string;
  /** Optional small badge (e.g. "v1.4 ships"). Renders before the
   *  label with an amber dot separator. */
  badge?: string;
  className?: string;
}

export function AnnouncementPill({
  href,
  label,
  badge,
  className = "",
}: AnnouncementPillProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-display text-[12px] text-white/85 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.97] ${className}`}
    >
      {badge && (
        <>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-chirp-amber-400">
            {badge}
          </span>
          <span className="text-white/20">·</span>
        </>
      )}
      <span>{label}</span>
      <ArrowRight
        size={13}
        className="text-white/45 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/85"
      />
    </Link>
  );
}
