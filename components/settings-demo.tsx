"use client";

import { Check, Settings2, BookOpen, Zap } from "lucide-react";

export function SettingsDemo() {
  return (
    <div className="w-full max-w-[420px] mx-auto rounded-2xl bg-white shadow-surface border border-chirp-stone-200 overflow-hidden flex flex-col">
      
      {/* Sidebar + Content layout mimic */}
      <div className="flex bg-chirp-stone-50 h-full min-h-[300px]">
        
        {/* Mock Sidebar */}
        <div className="w-32 border-r border-chirp-stone-200/60 p-3 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[12px] text-chirp-stone-500 font-medium p-1.5 rounded-md">
            <Settings2 className="w-3.5 h-3.5" />
            General
          </div>
          <div className="flex items-center gap-2 text-[12px] bg-white text-chirp-stone-900 shadow-sm font-bold p-1.5 rounded-md border border-chirp-stone-200/50">
            <BookOpen className="w-3.5 h-3.5" />
            Vocabulary
          </div>
          <div className="flex items-center gap-2 text-[12px] text-chirp-stone-500 font-medium p-1.5 rounded-md">
            <Zap className="w-3.5 h-3.5" />
            Snippets
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-5 flex flex-col">
          
          <div className="font-display font-bold text-chirp-stone-900 text-base mb-4">
            Custom Vocabulary
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-between text-[13px] font-mono text-chirp-stone-700 p-2 rounded-lg border border-chirp-stone-200">
              Anthropic
              <Check className="w-4 h-4 text-chirp-amber-500" />
            </div>
            <div className="flex items-center justify-between text-[13px] font-mono text-chirp-stone-700 p-2 rounded-lg border border-chirp-stone-200 bg-chirp-stone-50">
              Kubernetes
              <Check className="w-4 h-4 text-chirp-amber-500" />
            </div>
            <div className="flex items-center justify-between text-[13px] font-mono text-chirp-stone-700 p-2 rounded-lg border border-chirp-stone-200">
              HIPAA
              <Check className="w-4 h-4 text-chirp-amber-500" />
            </div>
          </div>

          <div className="w-full h-px bg-chirp-stone-100 mb-6" />

          <div className="font-display font-bold text-chirp-stone-900 text-base mb-3">
            Snippets
          </div>

          <div className="flex flex-col bg-chirp-stone-50 rounded-lg border border-chirp-stone-200 overflow-hidden text-[13px]">
            <div className="flex px-3 py-2 border-b border-chirp-stone-100 items-baseline gap-2">
              <span className="font-mono font-medium text-chirp-stone-500 text-[11px] uppercase tracking-wider">Trigger:</span>
              <span className="font-mono text-chirp-amber-600 bg-chirp-amber-50 px-1 rounded">/sig</span>
            </div>
            <div className="px-3 py-2.5 font-body text-chirp-stone-700 leading-relaxed bg-white">
              Best regards,<br />Alex
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
