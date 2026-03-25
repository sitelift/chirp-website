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

/** Curated FAQs shown on the homepage. */
export const HOME_PREVIEW_FAQS: { question: string; answer: string }[] = [
  {
    question: "Is it really 100% private?",
    answer:
      "Yes. Chirp uses local AI models that run on your computer. No audio or text ever leaves your machine. There are no servers to send data to.",
  },
  {
    question: "How is it free?",
    answer:
      "Chirp runs entirely on your hardware. No servers, no cloud costs. Everyone deserves access to great voice-to-text tools.",
  },
  {
    question: "What are the system requirements?",
    answer:
      "Windows 10+ or macOS 13+, 4 GB RAM (8 GB recommended), and about 1.5 GB of disk space. No GPU required.",
  },
  {
    question: "Does it work in other languages?",
    answer:
      "Yes. The speech model supports 25 languages including Spanish, French, German, Japanese, and Chinese. Chirp detects the language automatically.",
  },
  {
    question: "What is Smart Cleanup?",
    answer:
      "A local AI model that removes filler words, fixes grammar, and adds punctuation. It runs on your computer and never sends data anywhere.",
  },
  {
    question: "How accurate is it?",
    answer:
      "Very. Chirp uses NVIDIA's Parakeet TDT, one of the most accurate speech recognition models available, with near-human accuracy in good audio conditions.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Completely. After the initial model download, Chirp works without any internet connection.",
  },
  {
    question: "Is it open source?",
    answer:
      "Yes. The source code is available on GitHub.",
  },
];
