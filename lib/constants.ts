export const PRODUCT = {
  name: "Chirp",
  tagline: "Local voice-to-text for Windows & macOS",
  version: "v1.2.0",
  os: "Windows 10+ & macOS 13+",
  downloadSize: "~80 MB",
  diskSpace: "~1.5 GB",
  ram: "4 GB RAM (8 GB recommended)",
  architecture: "x64",
  license: "MIT",
  github: "https://github.com/sitelift/Chirp",
  website: "https://chirptype.com",
  downloadUrl: "https://github.com/sitelift/Chirp/releases/latest",
  downloadUrlWindows: "https://github.com/sitelift/Chirp/releases/latest/download/Chirp-Setup.exe",
  downloadUrlMac: "https://github.com/sitelift/Chirp/releases/latest/download/Chirp.dmg",
};

export const FAQ_SECTIONS = [
  {
    title: "GETTING STARTED",
    items: [
      {
        question: "What is Chirp?",
        answer:
          "Chirp is a free voice-to-text app for Windows and macOS. Press a hotkey, speak, and your words appear as text wherever your cursor is. Everything runs locally on your computer.",
      },
      {
        question: "How do I install it?",
        answer:
          "Download the installer from the download page, run it, and follow the setup wizard. It takes about a minute, plus a few minutes to download the speech model.",
      },
      {
        question: "What's the default hotkey?",
        answer:
          "Ctrl+Shift+Space. You can change it to any key combination in Settings.",
      },
      {
        question: "Does it work in every app?",
        answer:
          "Yes. Chirp pastes text wherever your cursor is focused: browsers, editors, messaging apps, documents.",
      },
      {
        question: "What are the system requirements?",
        answer:
          "Windows 10+ or macOS 13+, 4 GB RAM (8 GB recommended), and about 1.5 GB of disk space for the app and models. No GPU required.",
      },
      {
        question: "Can I change the hotkey?",
        answer:
          "Yes. Open Settings, click the hotkey field, and press your preferred key combination.",
      },
    ],
  },
  {
    title: "PRIVACY",
    items: [
      {
        question: "Does Chirp send my audio to the cloud?",
        answer:
          "No. All processing happens on your PC using local AI models. There are no servers that could receive your data. We couldn't collect your audio even if we wanted to.",
      },
      {
        question: "Does Chirp collect telemetry or analytics?",
        answer:
          "Chirp offers optional, anonymous usage analytics powered by Aptabase. It's disabled by default and only activates if you enable 'Help improve Chirp' in Settings. We never collect audio, text, or personal information.",
      },
      {
        question: "Can I use it with sensitive or confidential content?",
        answer:
          "Yes. Chirp works fully offline after the initial model download. No data leaves your device. It's suitable for medical, legal, financial, or classified environments.",
      },
      {
        question: "Is it really free? What's the catch?",
        answer:
          "Yes. All processing runs on your hardware, so there are no server costs. If you find Chirp valuable, you can support development through Buy Me a Coffee.",
      },
      {
        question: "What data does the optional analytics collect?",
        answer:
          "When enabled: app launches, feature usage frequency, and crash reports. When disabled: nothing. We never collect audio recordings, transcription text, or personal information.",
      },
      {
        question: "Is Chirp open source?",
        answer:
          "Yes. The source code is available on GitHub at github.com/sitelift/Chirp.",
      },
    ],
  },
  {
    title: "FEATURES",
    items: [
      {
        question: "What is Smart Cleanup?",
        answer:
          "A local AI model (Qwen 2.5 3B, about 2 GB) that removes filler words, fixes grammar, and adds punctuation. It runs on your CPU. Chirp sends nothing over the network.",
      },
      {
        question: "Can I add custom words?",
        answer:
          "Yes. Add names, jargon, and technical terms in Settings so Chirp recognizes them correctly.",
      },
      {
        question: "What are snippets?",
        answer:
          "Saved phrases you can insert instantly with a trigger shortcut. Useful for email signatures, addresses, or boilerplate text.",
      },
      {
        question: "Does it support other languages?",
        answer: "Yes. The speech model supports 25 languages, including Spanish, French, German, Japanese, and Chinese. Chirp detects the language automatically from your speech.",
      },
      {
        question: "What is email mode?",
        answer:
          "When email mode is enabled, Chirp automatically detects greetings and sign-offs in your dictation and formats the output as a structured email with proper line breaks.",
      },
      {
        question: "Can I use it for meetings?",
        answer:
          "Chirp is designed for single-speaker dictation, not meeting transcription. For best results, speak directly into your microphone.",
      },
    ],
  },
  {
    title: "TECHNICAL",
    items: [
      {
        question: "What speech model does it use?",
        answer:
          "NVIDIA Parakeet TDT 0.6B. Excellent accuracy, runs efficiently on consumer hardware. About 465 MB.",
      },
      {
        question: "Do I need a GPU?",
        answer:
          "No. Chirp works well on CPU only. A Vulkan-compatible GPU speeds up transcription if available.",
      },
      {
        question: "How much disk space?",
        answer:
          "About 1.5 GB total: ~80 MB app, ~465 MB speech model, ~1.1 GB cleanup model.",
      },
      {
        question: "Does it work offline?",
        answer: "Completely, after the initial model download.",
      },
      {
        question: "What cleanup model does it use?",
        answer:
          "Qwen 2.5 3B by Alibaba, running locally through llama-server. It handles grammar correction, filler word removal, and sentence restructuring.",
      },
      {
        question: "How accurate is the transcription?",
        answer:
          "Very. Parakeet TDT by NVIDIA is one of the most accurate speech recognition models available, supporting 25 languages with near-human accuracy in good audio conditions.",
      },
    ],
  },
  {
    title: "TROUBLESHOOTING",
    items: [
      {
        question: "SmartScreen is blocking the installer.",
        answer:
          'That\'s normal for new unsigned software. Click "More info" then "Run anyway." Chirp is safe and runs fully offline after setup.',
      },
      {
        question: "Chirp can't hear my microphone.",
        answer:
          "Check Settings to ensure the correct device is selected. Verify Chirp has microphone permission in Windows Settings > Privacy > Microphone.",
      },
      {
        question: "The hotkey isn't working.",
        answer:
          "Check that no other app is using the same key combination. Try changing the hotkey in Settings, or restart Chirp.",
      },
      {
        question: "My transcription is inaccurate.",
        answer:
          "Make sure your microphone is positioned correctly and background noise is minimal. You can also add frequently used terms to your custom dictionary in Settings.",
      },
      {
        question: "Chirp is slow on my computer.",
        answer:
          "The speech model runs on CPU by default and should process a 10-second recording in under 2 seconds. If Smart Cleanup is enabled, it adds 1 to 3 seconds. Try disabling Smart Cleanup for faster results.",
      },
    ],
  },
];

/** Curated FAQs shown on the homepage preview (full FAQ page uses FAQ_SECTIONS). */
export const HOME_PREVIEW_FAQS: { question: string; answer: string }[] = [
  {
    question: "Is it really 100% private?",
    answer:
      "Yes. Chirp uses local AI models that run on your computer's CPU. No audio data leaves your machine. We don't even have a server to send it to.",
  },
  {
    question: "How is it free forever?",
    answer:
      "Chirp runs entirely on your hardware. No servers, no cloud costs. Everyone deserves access to great voice-to-text tools.",
  },
  {
    question: "Does it work in languages other than English?",
    answer:
      "Yes. Chirp supports 25 languages out of the box, including Spanish, French, German, Japanese, and Chinese.",
  },
  {
    question: "Can I use it with specialized jargon?",
    answer:
      "Yes. You can add technical terms, names, and industry-specific jargon to your custom dictionary in the settings to ensure perfect transcription.",
  },
];

export const CHANGELOG = [
  {
    version: "v1.2.0",
    date: "March 25, 2026",
    latest: true,
    changes: [
      "Model attribution for Parakeet TDT (NVIDIA) and Qwen 2.5 (Alibaba)",
      "Unified onboarding download with early exit option",
      "Smart email formatting with greeting and sign-off detection",
      "Support Chirp tip jar in sidebar",
      "Optional anonymous analytics (Aptabase) and crash reporting (Sentry)",
      "In-app announcements and feedback system",
      "Single-instance lock prevents duplicate launches",
      "Auto-launch minimizes to system tray",
      "New app icon design",
      "macOS permission handling during onboarding",
      "Auto-updater for seamless updates",
    ],
  },
];
