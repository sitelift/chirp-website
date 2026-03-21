"use client";

import { type ComponentType } from "react";
import { motion } from "framer-motion";
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

interface Integration {
  name: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  usesOwnColor: boolean;
  fallbackColor?: string;
}

const integrations: Integration[] = [
  { name: "Slack", icon: SlackLogo, usesOwnColor: true },
  { name: "Gmail", icon: GmailLogo, usesOwnColor: true },
  { name: "VS Code", icon: VSCodeLogo, usesOwnColor: true },
  { name: "Notion", icon: NotionLogo, usesOwnColor: true },
  { name: "Terminal", icon: Terminal as ComponentType<{ className?: string; size?: number }>, usesOwnColor: false, fallbackColor: "text-[#181717]" },
  { name: "Discord", icon: DiscordLogo, usesOwnColor: true },
  { name: "LinkedIn", icon: LinkedInLogo, usesOwnColor: true },
  { name: "Chrome", icon: ChromeLogo, usesOwnColor: true },
  { name: "Docs", icon: GoogleDocsLogo, usesOwnColor: true },
];

export function IntegrationGrid() {
  return (
    <div className="relative w-full py-6 md:py-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
        {integrations.map((app, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="group relative flex flex-col items-center justify-center rounded-2xl bg-white border border-chirp-stone-100 p-6 shadow-subtle hover:shadow-lifted hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-3 rounded-xl bg-chirp-stone-50 group-hover:bg-white transition-colors">
              <app.icon
                className={`h-8 w-8 ${app.fallbackColor ?? ""} opacity-80 group-hover:opacity-100 transition-opacity`}
                size={32}
              />
            </div>
            <span className="mt-3 text-[10px] font-mono font-bold text-chirp-stone-400 uppercase tracking-widest">{app.name}</span>

            {/* Minimal pulse dot for "active" feel */}
            <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-success opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
