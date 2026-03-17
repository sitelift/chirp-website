"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BirdMark } from "./bird-mark";
import { PRODUCT } from "@/lib/constants";

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
        className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-200 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1120px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <BirdMark size={24} />
            <span className={`font-display text-[15px] font-semibold transition-colors duration-200 ${scrolled ? 'text-chirp-stone-900' : 'text-white'}`}>
              Chirp
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/changelog"
              className={`text-sm transition-colors duration-200 ${scrolled ? 'text-chirp-stone-500 hover:text-chirp-stone-900' : 'text-chirp-stone-400 hover:text-white'}`}
            >
              Changelog
            </Link>
            <Link
              href="/faq"
              className={`text-sm transition-colors duration-200 ${scrolled ? 'text-chirp-stone-500 hover:text-chirp-stone-900' : 'text-chirp-stone-400 hover:text-white'}`}
            >
              FAQ
            </Link>
            <a
              href={PRODUCT.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 ${scrolled ? 'text-chirp-stone-500 hover:text-chirp-stone-900' : 'text-chirp-stone-400 hover:text-white'}`}
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
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
                className={`block h-0.5 w-5 transition-transform duration-200 ${scrolled ? 'bg-chirp-stone-700' : 'bg-white'} ${
                  mobileOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 transition-all duration-200 ${scrolled ? 'bg-chirp-stone-700' : 'bg-white'} ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 transition-transform duration-200 ${scrolled ? 'bg-chirp-stone-700' : 'bg-white'} ${
                  mobileOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white md:hidden">
          <Link
            href="/"
            className="font-display text-2xl font-semibold text-chirp-stone-900"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/changelog"
            className="font-display text-2xl font-semibold text-chirp-stone-500"
            onClick={() => setMobileOpen(false)}
          >
            Changelog
          </Link>
          <Link
            href="/faq"
            className="font-display text-2xl font-semibold text-chirp-stone-500"
            onClick={() => setMobileOpen(false)}
          >
            FAQ
          </Link>
          <a
            href={PRODUCT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-2xl font-semibold text-chirp-stone-500"
          >
            GitHub
          </a>
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
