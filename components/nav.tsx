"use client";

import { useState } from "react";
import Link from "next/link";
import { BirdMark } from "./bird-mark";

// Top nav. Always solid black with a hairline bottom border —
// ditched the scroll-driven transparent → dark transition that
// shipped before. Reads consistently across every page; the
// announcement pill below the nav (on the home hero only) does
// the "atmospheric" work that the transparent nav used to.
//
// Layout: BirdMark + chirp wordmark on the left (links to home),
// minimal text-link nav in the center on desktop, amber Download
// pill on the right. Mobile hamburger collapses to a full-screen
// overlay menu.

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/download", label: "Download" },
  { href: "/faq", label: "FAQ" },
  { href: "/changelog", label: "Changelog" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 h-14 border-b border-white/[0.06] bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-6">
          {/* Brand — small mono wordmark instead of the bright bird +
              display-bold. Reads as a chapter mark, not a logo dump. */}
          <Link
            href="/"
            className="group flex items-center gap-2 transition-opacity duration-150 hover:opacity-90"
          >
            <BirdMark size={16} className="opacity-85 transition-opacity group-hover:opacity-100" />
            <span className="font-display text-[13px] font-medium tracking-tight text-white/85">
              chirp
            </span>
          </Link>

          {/* Center text links — desktop only. Quiet, hover-lifts to
              full white. */}
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-[13px] font-medium text-white/45 transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTA — restrained outline pill. The hero CTAs
              already carry the amber moment; the nav doesn't need
              to repeat it. */}
          <div className="hidden md:block">
            <Link
              href="/download"
              className="group inline-flex h-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-4 font-display text-[12px] font-medium text-white/85 backdrop-blur-md transition-all duration-150 hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
            >
              Download
            </Link>
          </div>

          {/* Mobile hamburger. */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block h-0.5 w-5 bg-white/85 transition-all duration-200 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white/85 transition-all duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white/85 transition-all duration-200 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay. */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-black/95 backdrop-blur-md md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[20px] font-medium text-white/85 transition-colors hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/download"
            className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-chirp-amber-400 px-7 font-display text-[15px] font-semibold text-black transition-colors hover:bg-chirp-amber-300"
            onClick={() => setMobileOpen(false)}
          >
            Download for Mac &amp; Windows
          </Link>
        </div>
      )}
    </>
  );
}
