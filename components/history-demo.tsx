"use client";

import { Search, Clock, Trash2, Copy } from "lucide-react";

export function HistoryDemo() {
  const entries = [
    {
      time: "2:34 PM",
      text: "Yeah, let's go ahead and deploy the new staging environment before the weekend begins. Make sure to double check the environment variables."
    },
    {
      time: "2:12 PM",
      text: "Thanks for the update. I will review the pull request this afternoon and get back to you with any comments."
    },
    {
      time: "11:45 AM",
      text: "Hey Sarah, could you send over the latest Q3 projections when you have a chance? No rush, just need them by tomorrow."
    }
  ];

  return (
    <div className="w-full max-w-[420px] mx-auto rounded-2xl bg-white shadow-surface border border-chirp-stone-200 overflow-hidden flex flex-col">
      
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-chirp-stone-100 bg-chirp-stone-50">
        <div className="flex items-center gap-2 text-chirp-stone-900 font-display font-bold text-[15px]">
          <Clock className="w-4 h-4 text-chirp-stone-500" />
          History
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-chirp-stone-200 text-chirp-stone-500 transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-chirp-stone-200 text-chirp-stone-500 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {entries.map((entry, i) => (
          <div 
            key={i} 
            className="group flex flex-col p-4 border-b border-chirp-stone-100 last:border-b-0 hover:bg-chirp-stone-50 transition-colors cursor-default relative"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-mono text-chirp-stone-400 font-medium">Today, {entry.time}</span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-medium text-chirp-stone-500 hover:text-chirp-stone-900 bg-white shadow-sm border border-chirp-stone-200 rounded px-1.5 py-0.5 absolute right-4 top-3">
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <p className="text-[13px] text-chirp-stone-700 leading-relaxed font-body">
              {entry.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
