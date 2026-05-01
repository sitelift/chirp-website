// Curated release notes for the website's /changelog page. Source of
// truth is the Chirp app repo's CHANGELOG.md; entries below are
// summaries of shipped releases written for end-users (the app's
// CHANGELOG has more engineering detail than visitors need).
//
// When a new version ships: add an entry at the top, keep notes
// scannable. Each note is one user-visible change.

export interface ChangelogRelease {
  version: string;
  date: string;
  headline?: string;
  notes: string[];
}

export const CHANGELOG: ChangelogRelease[] = [
  {
    version: "v1.3.4",
    date: "2026-04-25",
    headline: "Smart Cleanup CPU fallback + Windows install fixes",
    notes: [
      "Smart Cleanup now starts on machines without a usable GPU — falls back to CPU automatically when Vulkan isn't available.",
      "Older Gemma cleanup model is removed on upgrade — reclaims ~3.1 GB of disk space for users coming from v1.2.6.",
      "Windows installer now ships with a fully self-contained C/C++ runtime — no more 0xc0000142 launch errors on machines without VC++ Redistributable.",
      "Smart Cleanup server logs to a file under your config directory so we can diagnose start-up issues on report.",
    ],
  },
  {
    version: "v1.3.0",
    date: "2026-04-21",
    headline: "Cleanup model upgrade",
    notes: [
      "New on-device language model for Smart Cleanup. Faster, cleaner output, especially on long dictations.",
      "Win32 clipboard rewrite — paste no longer trips Slack, Notion, or other apps that watch the clipboard.",
      "Reclaim ~3 GB of disk by removing the previous cleanup model on first launch.",
    ],
  },
  {
    version: "v1.2.5",
    date: "2026-04-08",
    headline: "Hotkey rewrite + dictionary fix",
    notes: [
      "Global hotkey is now captured via a low-level keyboard hook on Windows — no more dropped or duplicated triggers.",
      "Dictionary entries are correctly applied to the speech model when you add or edit a word — previously some changes only took effect on the next launch.",
      "Cross-machine ACL fixes for the model cache directory.",
      "Hardcoded vocabulary helpers removed in favor of your custom dictionary.",
    ],
  },
  {
    version: "v1.2.0",
    date: "2026-03-24",
    headline: "Public launch",
    notes: [
      "Free, local-only voice-to-text for Mac and Windows.",
      "Press a global hotkey, speak, watch your text appear at the cursor.",
      "Local Smart Cleanup polishes filler words and grammar without sending audio anywhere.",
      "Custom dictionary for proper nouns and technical terms.",
      "Voice-triggered text snippets for boilerplate phrases.",
    ],
  },
];
