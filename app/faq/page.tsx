import type { Metadata } from "next";
import { FAQAccordion } from "./faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions and answers about Chirp — privacy, system requirements, accuracy, languages, and more.",
  openGraph: {
    title: "Chirp FAQ",
    description:
      "Questions and answers about Chirp — privacy, system requirements, accuracy, languages, and more.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function FAQPage() {
  return (
    <main className="relative mx-auto max-w-[720px] px-6 pt-32 pb-32 md:pt-40">
      <header className="animate-slide-up mb-16">
        <h1
          className="halo-hero relative font-display font-semibold text-white"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Questions &amp; answers.
        </h1>
        <p className="mt-5 max-w-[44ch] font-body text-[15px] leading-relaxed text-white/55 md:text-[16px]">
          Everything you might want to know about Chirp before you
          download it. If your question isn&apos;t here, the source
          is on GitHub.
        </p>
      </header>

      <FAQAccordion />

      <footer className="mt-20 border-t border-white/[0.08] pt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
          More to ask?{" "}
          <a
            href="https://github.com/sitelift/Chirp/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Open an issue on GitHub
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
