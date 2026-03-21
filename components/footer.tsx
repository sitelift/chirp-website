import Link from "next/link";
import { BirdMark } from "./bird-mark";
import { PRODUCT } from "@/lib/constants";


export function Footer() {
  return (
    <footer className="relative bg-chirp-stone-900">

      {/* Main footer content */}
      <div className="relative z-10 mx-auto max-w-[1120px] px-6 pt-20 pb-14 md:pt-24">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <BirdMark size={22} />
              <span className="font-display text-[16px] font-extrabold tracking-tight text-chirp-stone-100">
                chirp
              </span>
            </div>
            <p className="text-sm leading-relaxed text-chirp-stone-400">
              Local voice-to-text.
            </p>
          </div>

          {/* Multi-column links */}
          <div className="flex gap-16">
            {/* Product column */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-chirp-stone-300">
                Product
              </h3>
              <nav className="flex flex-col gap-2.5">
                <Link
                  href="/download"
                  className="text-sm text-chirp-stone-400 transition-colors duration-200 hover:text-chirp-amber-400"
                >
                  Download
                </Link>
                <Link
                  href="/changelog"
                  className="text-sm text-chirp-stone-400 transition-colors duration-200 hover:text-chirp-amber-400"
                >
                  Changelog
                </Link>
              </nav>
            </div>

            {/* Resources column */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-chirp-stone-300">
                Resources
              </h3>
              <nav className="flex flex-col gap-2.5">
                <Link
                  href="/faq"
                  className="text-sm text-chirp-stone-400 transition-colors duration-200 hover:text-chirp-amber-400"
                >
                  FAQ
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm text-chirp-stone-400 transition-colors duration-200 hover:text-chirp-amber-400"
                >
                  Privacy
                </Link>
                <a
                  href={PRODUCT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-chirp-stone-400 transition-colors duration-200 hover:text-chirp-amber-400"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-chirp-stone-800 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-chirp-stone-500">
            Free Forever &middot; No Subscription
          </p>
          <p className="text-xs text-chirp-stone-500">
            &copy; {new Date().getFullYear()} Chirp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
