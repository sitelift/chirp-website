"use client";

import { motion } from "framer-motion";
import { 
  Slack, 
  Mail, 
  MessageSquare, 
  Github, 
  Variable, 
  FileText, 
  Briefcase,
  Search,
  CheckCircle2,
  Globe
} from "lucide-react";

const integrations = [
  { name: "Slack", icon: Slack, color: "text-[#4A154B]" },
  { name: "Gmail", icon: Mail, color: "text-[#EA4335]" },
  { name: "VS Code", icon: Variable, color: "text-[#007ACC]" },
  { name: "Notion", icon: FileText, color: "text-[#000000]" },
  { name: "Markdown", icon: Github, color: "text-[#181717]" },
  { name: "Discord", icon: MessageSquare, color: "text-[#5865F2]" },
  { name: "LinkedIn", icon: Briefcase, color: "text-[#0A66C2]" },
  { name: "Chrome", icon: Globe, color: "text-[#4285F4]" },
  { name: "Docs", icon: FileText, color: "text-[#4285F4]" },
];

const reveal = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export function IntegrationGrid() {
  return (
    <div className="relative w-full py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
        {integrations.concat(integrations.slice(0, 1)).map((app, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="group relative flex flex-col items-center justify-center rounded-2xl bg-white border border-chirp-stone-100 p-6 shadow-subtle hover:shadow-lifted hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`p-3 rounded-xl bg-chirp-stone-50 group-hover:bg-white transition-colors`}>
              <app.icon className={`h-8 w-8 ${app.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
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
