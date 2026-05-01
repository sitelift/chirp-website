// Home page scenes after the hero. Rebuilt from scratch as part of
// the dark-premium redesign — the legacy light-mode scenes
// (IntegrationsSection, PowerToolsSection, PrivacySection,
// FreeForeverSection, FounderNoteSection, FAQSection, CloseSection)
// have been removed entirely. Each scene below is composed from
// shipped-app tokens; new scenes are added here one iteration at a
// time as the redesign progresses.

import { VideoDemoScene } from "./video-demo-scene";
import { PrivacyScene } from "./privacy-scene";
import { PowerToolsScene } from "./power-tools-scene";
import { CloseCtaScene } from "./close-cta-scene";

export function HomeSections() {
  return (
    <main className="relative z-10">
      <VideoDemoScene />
      <PrivacyScene />
      <PowerToolsScene />
      <CloseCtaScene />
    </main>
  );
}
