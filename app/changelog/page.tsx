import type { Metadata } from "next";
import { CHANGELOG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Changelog",
};

export default function ChangelogPage() {
  return (
    <section className="relative flex flex-col items-center pt-32 pb-20 px-6">
      <div className="max-w-[640px] w-full">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-chirp-stone-900">
          Changelog
        </h1>

        <p className="text-chirp-stone-500 mt-3">What's new in Chirp.</p>

        <div className="mt-12">
          {CHANGELOG.map((release, index) => (
            <div
              key={release.version}
              className={`py-10 ${
                index < CHANGELOG.length - 1
                  ? "border-b border-black/[0.06]"
                  : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-chirp-amber-600 text-base font-medium">
                    {release.version}
                  </span>
                  {release.latest && (
                    <span className="font-mono text-xs bg-chirp-amber-50 text-chirp-amber-700 rounded-full px-2 py-0.5">
                      Latest
                    </span>
                  )}
                </div>
                <span className="font-mono text-chirp-stone-400 text-sm">
                  {release.date}
                </span>
              </div>

              <ul className="mt-4 space-y-1.5">
                {release.changes.map((change) => (
                  <li
                    key={change}
                    className="text-chirp-stone-700 text-[15px] leading-relaxed"
                  >
                    <span className="text-chirp-stone-400 mr-1.5">&middot;</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
