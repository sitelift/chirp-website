"use client";
import { motion } from "framer-motion";

export function IntegrationGrid() {
  // Using exact, canonical SimpleIcons slugs that are guaranteed to exist on the main CDN.
  const apps = [
    { name: "Slack", iconUrl: "https://cdn.simpleicons.org/slack/E01E5A", bg: "bg-white" },
    { name: "Discord", iconUrl: "https://cdn.simpleicons.org/discord/5865F2", bg: "bg-white" },
    { name: "Notion", iconUrl: "https://cdn.simpleicons.org/notion/000000", bg: "bg-white" },
    { name: "WhatsApp", iconUrl: "https://cdn.simpleicons.org/whatsapp/25D366", bg: "bg-white" },
    { name: "Linear", iconUrl: "https://cdn.simpleicons.org/linear/5E6AD2", bg: "bg-white" },
    { name: "Figma", iconUrl: "https://cdn.simpleicons.org/figma/F24E1E", bg: "bg-white" },
    { name: "GitHub", iconUrl: "https://cdn.simpleicons.org/github/181717", bg: "bg-white" },
    { name: "X", iconUrl: "https://cdn.simpleicons.org/x/000000", bg: "bg-white" },
  ];

  return (
    <div className="relative w-full max-w-[800px] mx-auto py-10 mt-8">
      <div className="flex flex-wrap justify-center gap-4">
        {apps.map((app, i) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-chirp-stone-200 shadow-lifted hover:shadow-elevated transition-shadow cursor-default"
          >
            <div className={`flex items-center justify-center p-1.5 rounded-xl ${app.bg} w-9 h-9 shadow-subtle border border-chirp-stone-100`}>
              <img src={app.iconUrl} alt={app.name} className="w-5 h-5 object-contain" />
            </div>
            <span className="font-display font-bold text-[16px] text-chirp-stone-800 tracking-tight">{app.name}</span>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center mt-12 gap-5"
      >
        <span className="h-px bg-chirp-stone-200 flex-1 hidden sm:block" />
        <p className="text-center font-mono text-[11px] uppercase tracking-widest text-chirp-stone-400 font-bold whitespace-nowrap">
          And literally any other text field
        </p>
        <span className="h-px bg-chirp-stone-200 flex-1 hidden sm:block" />
      </motion.div>
    </div>
  );
}
