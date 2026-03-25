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
          "No. Zero telemetry. Chirp doesn't phone home, track usage, or make any network requests during operation.",
      },
      {
        question: "Can I use it with sensitive or confidential content?",
        answer:
          "Yes. Chirp works fully offline after the initial model download. No data leaves your device. It's suitable for medical, legal, financial, or classified environments.",
      },
      {
        question: "Is it really free? What's the catch?",
        answer:
          "No catch. Chirp is free. No freemium tiers, no pro plan, no subscriptions.",
      },
    ],
  },
  {
    title: "FEATURES",
    items: [
      {
        question: "What is Smart Cleanup?",
        answer:
          "A local AI model (Qwen 2.5 1.5B, ~1 GB) that removes filler words, fixes grammar, and adds punctuation. It runs on your CPU. Chirp sends nothing over the network.",
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
    ],
  },
  {
    title: "TECHNICAL",
    items: [
      {
        question: "What speech model does it use?",
        answer:
          "NVIDIA Parakeet TDT 0.6B — excellent accuracy, runs efficiently on consumer hardware. About 465 MB.",
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
    ],
  },
  {
    title: "TROUBLESHOOTING",
    items: [
      {
        question: "SmartScreen is blocking the installer.",
        answer:
          'That\'s normal for new unsigned software. Click "More info" then "Run anyway." Chirp is safe — it runs fully offline after setup.',
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
      "Chirp is a side project. Since it runs entirely on your hardware, there are no server costs to pass on to you.",
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
    date: "March 17, 2026",
    latest: true,
    changes: [
      "Added text snippets with triggers",
      "Added completion sound effects",
      "Added passive overlay mode",
      "Added transcription history",
      "Fixed microphone test volume display",
    ],
  },
  {
    version: "v0.3.0",
    date: "February 20, 2026",
    changes: [
      "Added Smart Cleanup with Qwen 2.5 1.5B",
      "Added custom dictionary for technical terms",
      "Improved transcription accuracy",
      "Added system tray minimize option",
      "Fixed hotkey conflict detection",
    ],
  },
  {
    version: "v0.2.0",
    date: "January 15, 2026",
    changes: [
      "Added noise suppression",
      "Added configurable hotkeys",
      "Improved overlay positioning",
      "Added auto-paste at cursor",
      "Fixed multi-monitor support",
    ],
  },
  {
    version: "v0.1.0",
    date: "December 10, 2025",
    changes: [
      "Initial release",
      "Voice-to-text with Parakeet TDT 0.6B",
      "Global hotkey activation",
      "Floating overlay UI",
      "Windows 10+ support",
    ],
  },
];
