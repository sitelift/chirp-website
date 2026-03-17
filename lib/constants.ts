export const PRODUCT = {
  name: "Chirp",
  tagline: "Local voice-to-text for Windows",
  version: "v0.4.0",
  os: "Windows 10+",
  downloadSize: "~80 MB",
  diskSpace: "~1.5 GB",
  ram: "4 GB RAM (8 GB recommended)",
  architecture: "x64",
  license: "MIT",
  github: "https://github.com/trychirp/chirp",
  website: "https://trychirp.app",
  downloadUrl: "https://github.com/trychirp/chirp/releases/latest",
};

export const FAQ_SECTIONS = [
  {
    title: "GETTING STARTED",
    items: [
      {
        question: "What is Chirp?",
        answer:
          "Chirp is a free, open-source voice-to-text app for Windows. Press a hotkey, speak, and your words appear as text wherever your cursor is. Everything runs locally on your PC — no cloud, no account, no subscription.",
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
          "Yes. Chirp pastes text wherever your cursor is focused — browsers, editors, messaging apps, documents.",
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
          "No catch. MIT-licensed open source. No freemium tiers, no pro plan, no subscriptions. It's a community project.",
      },
    ],
  },
  {
    title: "FEATURES",
    items: [
      {
        question: "What is Smart Cleanup?",
        answer:
          "A local AI model (Qwen 2.5 1.5B, ~1 GB) that removes filler words, fixes grammar, and adds punctuation. It runs entirely on your CPU — nothing is sent anywhere.",
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
        answer: "Currently English only. Other languages are planned.",
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
          'That\'s normal for new unsigned software. Chirp is open source — every line of code is on GitHub. Click "More info" then "Run anyway."',
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

export const CHANGELOG = [
  {
    version: "v0.4.0",
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
