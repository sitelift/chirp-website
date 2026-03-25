"use client";

import { type ComponentType } from "react";
import { Terminal } from "lucide-react";
import {
  SlackLogo,
  GmailLogo,
  VSCodeLogo,
  NotionLogo,
  DiscordLogo,
  LinkedInLogo,
  ChromeLogo,
  GoogleDocsLogo,
} from "./brand-logos";

const apps: { name: string; icon: ComponentType<{ className?: string; size?: number }> }[] = [
  { name: "Slack", icon: SlackLogo },
  { name: "Gmail", icon: GmailLogo },
  { name: "VS Code", icon: VSCodeLogo },
  { name: "Notion", icon: NotionLogo },
  { name: "Terminal", icon: Terminal as ComponentType<{ className?: string; size?: number }> },
  { name: "Discord", icon: DiscordLogo },
  { name: "LinkedIn", icon: LinkedInLogo },
  { name: "Chrome", icon: ChromeLogo },
  { name: "Docs", icon: GoogleDocsLogo },
];

function LogoItem({ app }: { app: (typeof apps)[number] }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-6 md:px-8 flex-shrink-0">
      <app.icon className="text-chirp-stone-400" size={24} />
      <span className="text-[9px] font-mono font-bold text-chirp-stone-300 uppercase tracking-widest">
        {app.name}
      </span>
    </div>
  );
}

export function LogoStrip() {
  return (
    <div className="relative overflow-hidden">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Scrolling content  - duplicated for seamless loop */}
      <div className="flex animate-marquee">
        {/* First set */}
        <div className="flex items-center flex-shrink-0">
          {apps.map((app) => (
            <LogoItem key={app.name} app={app} />
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center flex-shrink-0">
          {apps.map((app) => (
            <LogoItem key={`dup-${app.name}`} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
}
