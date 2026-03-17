import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

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

      <div className="text-chirp-stone-600 text-[17px] leading-[1.8] mt-12">
        <h2 className="text-chirp-stone-900 font-display text-xl font-bold mt-12 mb-4">
          The short version
        </h2>
        <p>
          Chirp doesn&apos;t collect, store, or transmit your data. There is no
          server. There is nothing to worry about.
        </p>

        <h2 className="text-chirp-stone-900 font-display text-xl font-bold mt-12 mb-4">
          What happens when you use Chirp
        </h2>
        <p>
          When you press the hotkey, Chirp captures audio from your microphone.
          That audio is processed by an AI model running on your computer. The
          model converts your speech to text. If Smart Cleanup is enabled,
          another local model cleans up the text. The result is pasted at your
          cursor. Every step happens on your device.
        </p>

        <h2 className="text-chirp-stone-900 font-display text-xl font-bold mt-12 mb-4">
          What we don&apos;t do
        </h2>
        <p>
          We don&apos;t send audio or text to any server. We don&apos;t store
          your recordings. We don&apos;t collect telemetry, analytics, or usage
          data. We don&apos;t make network requests during operation. We
          don&apos;t require an account, email, or personal information. We
          don&apos;t use cookies or tracking. We don&apos;t share data with
          third parties — there is no data to share.
        </p>

        <h2 className="text-chirp-stone-900 font-display text-xl font-bold mt-12 mb-4">
          Network activity
        </h2>
        <p>
          Chirp connects to the internet exactly once: to download the AI models
          during first-time setup. After that, it works fully offline. You can
          verify this by disconnecting from the internet — Chirp won&apos;t
          notice.
        </p>

        <h2 className="text-chirp-stone-900 font-display text-xl font-bold mt-12 mb-4">
          Your data
        </h2>
        <p>
          Audio is captured, processed, and immediately discarded. It is never
          written to disk and never transmitted. Transcriptions are stored
          locally on your device in your app data folder. You can view and delete
          them at any time. Settings are stored locally.
        </p>

        <h2 className="text-chirp-stone-900 font-display text-xl font-bold mt-12 mb-4">
          Open source
        </h2>
        <p>
          Chirp is MIT-licensed. You can read every line of code on GitHub. If
          you find a privacy concern, please open an issue.
        </p>
      </div>
    </main>
  );
}
