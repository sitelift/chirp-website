"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BirdMark } from "./bird-mark";


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-chirp-stone-900/95 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1120px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <BirdMark size={24} />
            <span className="font-display text-[15px] font-semibold text-white">
              Chirp
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/changelog"
              className="text-sm text-chirp-stone-400 transition-colors duration-200 hover:text-white"
            >
              Changelog
            </Link>
            <Link
              href="/faq"
              className="text-sm text-chirp-stone-400 transition-colors duration-200 hover:text-white"
            >
              FAQ
            </Link>
            <Link
              href="/download"
              className="inline-flex h-8 items-center rounded-lg bg-chirp-amber-400 px-4 font-display text-sm font-bold text-chirp-stone-900 transition-colors duration-200 hover:bg-chirp-amber-300"
            >
              Download
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-8 w-8 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 transition-transform duration-200 bg-white ${
                  mobileOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 transition-all duration-200 bg-white ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 transition-transform duration-200 bg-white ${
                  mobileOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-chirp-stone-900 md:hidden">
          <Link
            href="/"
            className="font-display text-2xl font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/changelog"
            className="font-display text-2xl font-semibold text-chirp-stone-400"
            onClick={() => setMobileOpen(false)}
          >
            Changelog
          </Link>
          <Link
            href="/faq"
            className="font-display text-2xl font-semibold text-chirp-stone-400"
            onClick={() => setMobileOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/download"
            className="inline-flex h-12 items-center rounded-full bg-chirp-amber-500 px-8 font-display text-lg font-bold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Download
          </Link>
        </div>
      )}
    </>
  );
}
