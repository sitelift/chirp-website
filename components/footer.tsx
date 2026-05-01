import Link from "next/link";
import { BirdMark } from "./bird-mark";
import { PRODUCT } from "@/lib/constants";

// Single hairline footer row. Renders only on non-home pages
// (ConditionalFooter handles the routing). Pure black, hairline
// top border, three-region layout: brand + version stamp on left,
// inline link nav center, copyright on the right. Collapses to a
// stacked column on mobile.

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-black">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:gap-8">
        {/* Brand + version stamp. */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity duration-150 hover:opacity-90"
        >
          <BirdMark size={20} />
          <span className="font-display text-[14px] font-medium tracking-tight text-white/85">
            chirp
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
            {PRODUCT.version} · Local voice-to-text
          </span>
        </Link>

        {/* Inline link nav. */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-7">
          <FooterLink href="/download">Download</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/changelog">Changelog</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLinkExternal href={PRODUCT.github}>GitHub</FooterLinkExternal>
        </nav>

        {/* Copyright. */}
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
          &copy; {new Date().getFullYear()} Chirp
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-display text-[13px] font-medium text-white/50 transition-colors duration-150 hover:text-white"
    >
      {children}
    </Link>
  );
}

function FooterLinkExternal({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-display text-[13px] font-medium text-white/50 transition-colors duration-150 hover:text-white"
    >
      {children}
    </a>
  );
}
