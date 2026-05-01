import type { Metadata } from "next";
import { CHANGELOG } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every Chirp release with a short summary of what shipped.",
  openGraph: {
    title: "Chirp Changelog",
    description: "Every Chirp release with a short summary of what shipped.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function ChangelogPage() {
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
          Changelog.
        </h1>
        <p className="mt-5 max-w-md font-body text-[15px] text-white/55">
          Every Chirp release with a short summary of what shipped.
        </p>
      </header>

      <ol className="flex flex-col">
        {CHANGELOG.map((release, idx) => (
          <li
            key={release.version}
            className="animate-slide-up border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0"
            style={{ animationDelay: `${Math.min(idx * 80, 400)}ms` }}
          >
            <div className="flex items-baseline gap-3">
              <span
                className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/85"
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                {release.version}
              </span>
              <span className="text-white/15">·</span>
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40"
                style={{ fontFeatureSettings: '"tnum"' }}
              >
                {release.date}
              </span>
            </div>

            {release.headline && (
              <h2 className="mt-3 font-display text-[22px] font-semibold tracking-tight text-white md:text-[26px]">
                {release.headline}
              </h2>
            )}

            <ul className="mt-5 flex flex-col gap-3">
              {release.notes.map((note, i) => (
                <li
                  key={i}
                  className="flex gap-3 font-body text-[15px] leading-relaxed text-white/70"
                >
                  <span className="mt-2.5 h-px w-3 shrink-0 bg-white/30" aria-hidden />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <footer className="mt-20 border-t border-white/[0.08] pt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
          For full engineering detail, see the{" "}
          <a
            href="https://github.com/sitelift/Chirp/blob/master/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            CHANGELOG.md on GitHub
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
