"use client";
import { motion } from "framer-motion";

export function IntegrationGrid() {
  // Using exact, canonical SimpleIcons slugs that are guaranteed to exist on the main CDN.
  const apps = [
    { name: "Slack", iconSrc: "/integrations/slack.svg", bg: "bg-white" },
    { name: "Discord", iconSrc: "/integrations/discord.svg", bg: "bg-white" },
    { name: "Notion", iconSrc: "/integrations/notion.svg", bg: "bg-white" },
    { name: "WhatsApp", iconSrc: "/integrations/whatsapp.svg", bg: "bg-white" },
    { name: "Linear", iconSrc: "/integrations/linear.svg", bg: "bg-white" },
    { name: "Figma", iconSrc: "/integrations/figma.svg", bg: "bg-white" },
    { name: "GitHub", iconSrc: "/integrations/github.svg", bg: "bg-white" },
    { name: "X", iconSrc: "/integrations/x.svg", bg: "bg-white" },
  ];

  return (
    <div className="relative mx-auto mt-8 w-full max-w-full py-4 lg:mt-0 lg:py-6">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 lg:justify-end">
        {apps.map((app, i) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
            className="flex cursor-default items-center gap-3 rounded-2xl border border-chirp-stone-200 bg-white px-5 py-3 transition-colors hover:border-chirp-amber-200"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl border border-chirp-stone-100 p-1.5 ${app.bg}`}
            >
              <img
                src={app.iconSrc}
                alt=""
                role="presentation"
                className="h-5 w-5 object-contain"
              />
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
