import type { Metadata } from "next";
import {
  ShieldCheck,
  Cpu,
  ShieldOff,
  Wifi,
  HardDrive,
  Eye,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Chirp processes everything on your device. Your audio and text never leave your machine.",
};

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0">
      <h2 className="flex items-center gap-3 font-display text-[20px] font-semibold tracking-tight text-white md:text-[22px]">
        <Icon
          size={18}
          strokeWidth={1.5}
          className="shrink-0 text-white/40"
          aria-hidden
        />
        {title}
      </h2>
      <div className="mt-4 max-w-[60ch] font-body text-[15px] leading-[1.75] text-white/65 md:text-[16px]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
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
          Privacy.
        </h1>
        <p className="mt-5 max-w-[44ch] font-body text-[15px] leading-relaxed text-white/55 md:text-[16px]">
          Chirp processes everything on your device. We don&apos;t need
          your data, so we don&apos;t take it.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          Last updated · March 2026
        </p>
      </header>

      <div className="animate-slide-up flex flex-col">
        <Section icon={ShieldCheck} title="The short version">
          <p>
            Chirp processes everything on your device. We offer optional,
            anonymous analytics that you control. Your audio and text never
            leave your computer.
          </p>
        </Section>

        <Section icon={Cpu} title="What happens when you use Chirp">
          <p>
            When you press the hotkey, Chirp captures audio from your
            microphone. That audio is processed by an AI model running on
            your computer. The model converts your speech to text. If Smart
            Cleanup is enabled, another local model cleans up the text. The
            result is pasted at your cursor. Every step happens on your
            device.
          </p>
        </Section>

        <Section icon={ShieldOff} title="What we don't do">
          <p>
            We don&apos;t send audio or text to any server. We don&apos;t
            store your recordings. We don&apos;t require an account, email,
            or personal information. We don&apos;t use cookies or tracking.
            We don&apos;t share data with third parties.
          </p>
        </Section>

        <Section icon={BarChart3} title="Optional analytics">
          <p>
            Chirp includes optional analytics powered by Aptabase and crash
            reporting via Sentry. Both are disabled by default. You choose
            whether to enable them in Settings. When enabled, we collect app
            launches, feature usage, and crash reports with stack traces.
            We never collect audio recordings, transcription text,
            dictionary entries, or personal information. You can disable
            analytics at any time.
          </p>
        </Section>

        <Section icon={Wifi} title="Network activity">
          <p>
            Chirp connects to the internet to download AI models during
            setup, check for updates, and fetch announcements. If you
            enable analytics, anonymous usage data is sent periodically.
            Chirp works fully offline after the initial model download.
          </p>
        </Section>

        <Section icon={HardDrive} title="Your data">
          <p>
            Audio is captured, processed, and immediately discarded. It is
            never written to disk and never transmitted. Transcriptions are
            stored locally on your device in your app data folder. You can
            view and delete them at any time. Settings are stored locally.
          </p>
        </Section>

        <Section icon={Eye} title="Transparency">
          <p>
            If you have a privacy concern, reach out at{" "}
            <a
              href="mailto:hello@chirptype.com"
              className="text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              hello@chirptype.com
            </a>
            . We take privacy seriously — it&apos;s the reason Chirp
            exists.
          </p>
        </Section>
      </div>
    </main>
  );
}
