"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";
import { LayoutDashboard, Settings as SettingsIcon, Mic, Cpu, BookOpen, Zap, Users, FileAudio } from "lucide-react";
import { BirdMark } from "@/components/bird-mark";

export function SettingsDemo() {
  return (
    <motion.div {...reveal} className="mx-auto mt-16 w-full max-w-[960px] overflow-hidden rounded-[24px] border border-chirp-stone-200 bg-white shadow-hero flex h-[540px]">
      
      {/* Sidebar */}
      <div className="flex w-64 shrink-0 flex-col border-r border-chirp-stone-200 bg-white py-4 px-2.5">
        
        {/* Logo lockup */}
        <div className="flex items-center gap-2 px-3 pb-4 border-b border-chirp-stone-200">
          <BirdMark size={24} />
          <span className="font-display font-extrabold text-[16px] text-chirp-stone-900 tracking-[-0.5px] leading-[1.2]">
            chirp
          </span>
        </div>

        {/* Nav sections */}
        <nav className="flex flex-col flex-1 mt-4">
          
          <span className="text-[11px] font-semibold uppercase tracking-[0.8px] text-chirp-stone-400 px-3 mt-2 mb-1.5 block">
            MAIN
          </span>
          <div className="flex flex-col gap-0.5">
            <button className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm font-body font-medium transition-colors duration-150 ease-out text-chirp-stone-500 hover:bg-chirp-stone-50">
              <LayoutDashboard size={18} strokeWidth={1.5} />
              Home
            </button>
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.8px] text-chirp-stone-400 px-3 mt-6 mb-1.5 block">
            SETTINGS
          </span>
          <div className="flex flex-col gap-0.5">
            <button className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm font-body font-medium transition-colors duration-150 ease-out text-chirp-stone-500 hover:bg-chirp-stone-50">
              <SettingsIcon size={18} strokeWidth={1.5} />
              General
            </button>
            <button className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm font-body font-medium transition-colors duration-150 ease-out text-chirp-stone-500 hover:bg-chirp-stone-50">
              <Mic size={18} strokeWidth={1.5} />
              Audio
            </button>
            <button className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm font-body font-medium transition-colors duration-150 ease-out text-chirp-stone-500 hover:bg-chirp-stone-50">
              <Cpu size={18} strokeWidth={1.5} />
              Model
            </button>
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.8px] text-chirp-stone-400 px-3 mt-6 mb-1.5 block">
            TOOLS
          </span>
          <div className="flex flex-col gap-0.5">
            <button className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm font-body font-medium transition-colors duration-150 ease-out text-chirp-stone-500 hover:bg-chirp-stone-50">
              <BookOpen size={18} strokeWidth={1.5} />
              Dictionary
            </button>
            <button className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm font-body font-medium transition-colors duration-150 ease-out text-chirp-stone-500 hover:bg-chirp-stone-50">
              <Zap size={18} strokeWidth={1.5} />
              Snippets
            </button>
            <button className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm font-body font-medium transition-colors duration-150 ease-out bg-chirp-stone-100 text-chirp-stone-900 shadow-subtle">
              <FileAudio size={18} strokeWidth={1.5} />
              Transcribe File
            </button>
          </div>

        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-12 py-12 bg-chirp-stone-50 relative flex flex-col">
        <h2 className="font-display text-2xl font-bold text-chirp-stone-900 mb-2">Transcribe File</h2>
        
        <p className="text-chirp-stone-600 mb-8 max-w-[480px]">
          Drop any audio or video file to generate a highly accurate, speaker-diarized transcript completely offline.
        </p>

        <div className="w-full h-64 rounded-2xl border-2 border-dashed border-chirp-stone-300 bg-white p-12 text-center transition-colors hover:border-chirp-amber-400 hover:bg-chirp-amber-50 cursor-pointer flex flex-col items-center justify-center group shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chirp-stone-50 text-chirp-stone-500 group-hover:bg-chirp-amber-100 group-hover:text-chirp-amber-600 transition-colors shadow-sm">
                <FileAudio size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-chirp-stone-900 mb-1">Click or drag and drop</h3>
            <p className="text-sm text-chirp-stone-500 font-medium font-mono">MP3, WAV, M4A, FLAC, or OGG</p>
            <p className="text-xs text-chirp-stone-400 mt-4 px-3 py-1 bg-chirp-stone-100 rounded-full font-medium">Takes ~30 seconds per hour of audio</p>
        </div>
      </div>

    </motion.div>
  );
}
