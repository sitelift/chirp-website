import Link from "next/link";
import { BirdMark } from "./bird-mark";
import { PRODUCT } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-chirp-stone-50">
      <div className="mx-auto max-w-[1120px] px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BirdMark size={20} />
              <span className="font-display text-[15px] font-semibold text-chirp-stone-900">
                Chirp
              </span>
            </div>
            <p className="text-sm leading-relaxed text-chirp-stone-500">
              Local voice-to-text.
              <br />
              Free. Private. Open source.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a
              href={PRODUCT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-chirp-stone-500 transition-colors duration-200 hover:text-chirp-stone-900"
            >
              GitHub
            </a>
            <Link
              href="/changelog"
              className="text-sm text-chirp-stone-500 transition-colors duration-200 hover:text-chirp-stone-900"
            >
              Changelog
            </Link>
            <Link
              href="/faq"
              className="text-sm text-chirp-stone-500 transition-colors duration-200 hover:text-chirp-stone-900"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-chirp-stone-500 transition-colors duration-200 hover:text-chirp-stone-900"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
