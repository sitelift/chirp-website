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
    <div className="rounded-2xl border border-chirp-stone-100 bg-chirp-stone-50/50 p-6 md:p-8">
      <h2 className="flex items-center gap-3 text-chirp-stone-900 font-display text-xl font-bold">
        <Icon className="h-5 w-5 shrink-0 text-chirp-amber-500" strokeWidth={1.8} />
        {title}
      </h2>
      <div className="mt-3 text-chirp-stone-600 text-[17px] leading-[1.8]">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-[640px] pt-32 pb-20 px-6">
      <header>
        <h1 className="font-display font-bold text-3xl md:text-5xl text-chirp-stone-900">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-chirp-stone-400 mt-3">
          Last updated March 2026
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-5">
        <Section icon={ShieldCheck} title="The short version">
          <p>
            Chirp processes everything on your device. We offer optional,
            anonymous analytics that you control. Your audio and text never
            leave your computer.
          </p>
        </Section>

        <Section icon={Cpu} title="What happens when you use Chirp">
          <p>
            When you press the hotkey, Chirp captures audio from your microphone.
            That audio is processed by an AI model running on your computer. The
            model converts your speech to text. If Smart Cleanup is enabled,
            another local model cleans up the text. The result is pasted at your
            cursor. Every step happens on your device.
          </p>
        </Section>

        <Section icon={ShieldOff} title="What we don&apos;t do">
          <p>
            We don&apos;t send audio or text to any server. We don&apos;t store
            your recordings. We don&apos;t require an account, email, or
            personal information. We don&apos;t use cookies or tracking. We
            don&apos;t share data with third parties.
          </p>
        </Section>

        <Section icon={BarChart3} title="Optional analytics">
          <p>
            Chirp includes optional analytics powered by Aptabase and crash
            reporting via Sentry. Both are disabled by default. You choose
            whether to enable them in Settings. When enabled, we collect app
            launches, feature usage, and crash reports with stack traces. We
            never collect audio recordings, transcription text, dictionary
            entries, or personal information. You can disable analytics at any
            time.
          </p>
        </Section>

        <Section icon={Wifi} title="Network activity">
          <p>
            Chirp connects to the internet to download AI models during setup,
            check for updates, and fetch announcements. If you enable analytics,
            anonymous usage data is sent periodically. Chirp works fully offline
            after the initial model download.
          </p>
        </Section>

        <Section icon={HardDrive} title="Your data">
          <p>
            Audio is captured, processed, and immediately discarded. It is never
            written to disk and never transmitted. Transcriptions are stored
            locally on your device in your app data folder. You can view and delete
            them at any time. Settings are stored locally.
          </p>
        </Section>

        <Section icon={Eye} title="Transparency">
          <p>
            If you have a privacy concern, reach out to us at
            hello@chirptype.com. We take privacy seriously. It&apos;s the reason
            Chirp exists.
          </p>
        </Section>
      </div>
    </main>
  );
}
