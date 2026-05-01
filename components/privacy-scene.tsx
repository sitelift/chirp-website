import { Laptop, LockKeyhole, ServerOff, WifiOff } from "lucide-react";
import { BirdMark } from "./bird-mark";

const privacyStats = [
  {
    value: "0",
    label: "servers",
    detail: "No account layer. No remote transcription queue.",
    Icon: ServerOff,
  },
  {
    value: "0",
    label: "network calls",
    detail: "After setup, dictation keeps working offline.",
    Icon: WifiOff,
  },
  {
    value: "0",
    label: "bytes transmitted",
    detail: "Audio and transcripts stay on your machine.",
    Icon: LockKeyhole,
  },
];

export function PrivacyScene() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 28%, transparent 68%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-36 top-20 h-[520px] w-[520px] rounded-full opacity-75 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(240,183,35,0.12) 0%, transparent 62%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="max-w-[620px]">
          <h2
            className="halo-amber font-display font-semibold leading-[0.98] text-white"
            style={{ fontSize: "clamp(44px, 7vw, 86px)" }}
          >
            Your voice never leaves your laptop.
          </h2>
          <p className="mt-7 max-w-[560px] font-body text-base leading-8 text-white/65 md:text-lg">
            Chirp listens, transcribes, cleans up, and pastes text on-device.
            There is no remote relay sitting between your words and the app
            you are already using.
          </p>

          <div className="mt-12 grid border-y border-white/10 sm:grid-cols-3">
            {privacyStats.map(({ value, label, detail, Icon }, index) => (
              <div
                key={label}
                className={`group relative min-h-[190px] px-0 py-8 sm:px-7 ${
                  index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
                }`}
              >
                <div className="mb-8 flex items-center gap-3 text-white/45 transition-colors duration-200 group-hover:text-white/70">
                  <Icon size={18} strokeWidth={1.6} />
                  <span className="font-mono text-[11px] uppercase">
                    {label}
                  </span>
                </div>
                <div className="font-display text-[88px] font-semibold leading-none text-white md:text-[104px]">
                  {value}
                </div>
                <p className="mt-5 max-w-[13rem] text-sm leading-6 text-white/55">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[520px] w-full max-w-[560px] items-center justify-center lg:mx-0">
          <div
            aria-hidden
            className="absolute inset-4 rounded-full border border-white/[0.055]"
          />
          <div
            aria-hidden
            className="absolute inset-16 rounded-full border border-white/[0.075]"
          />
          <div
            aria-hidden
            className="absolute inset-28 rounded-full border border-dashed border-white/10"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(240,183,35,0.16) 0%, rgba(240,183,35,0.04) 42%, transparent 70%)",
            }}
          />

          <div className="relative flex h-[270px] w-[270px] items-center justify-center rounded-full border border-white/12 bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:h-[320px] md:w-[320px]">
            <div
              aria-hidden
              className="absolute inset-8 rounded-full border border-white/10"
            />
            <div className="halo-mark flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-black/80 md:h-32 md:w-32">
              <BirdMark size={62} />
            </div>
            <div className="absolute -top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
              <Laptop size={15} strokeWidth={1.6} />
              <span className="font-mono text-[11px] uppercase">local only</span>
            </div>
            <div className="absolute bottom-9 h-2 w-24 rounded-full bg-white/10">
              <div className="h-full w-12 rounded-full bg-chirp-yellow shadow-[0_0_24px_rgba(240,183,35,0.35)]" />
            </div>
          </div>

          <div className="absolute bottom-2 left-0 right-0 mx-auto grid max-w-[480px] grid-cols-3 gap-2 font-mono text-[10px] uppercase text-white/35">
            <span className="border-t border-white/10 pt-3">microphone</span>
            <span className="border-t border-white/10 pt-3 text-center">
              model
            </span>
            <span className="border-t border-white/10 pt-3 text-right">
              paste
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
