"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { reveal } from "@/lib/motion";

export function CleanupDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We track the scroll of the container itself
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 40%"],
  });

  // Wipe from 100% clipped on the right, to 0% clipped
  const clipPath = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <motion.div {...reveal} className="mx-auto w-full max-w-[560px]" ref={containerRef}>
      <div className="relative overflow-hidden rounded-[24px] bg-white shadow-hero border border-chirp-stone-200 flex flex-col min-h-[220px]">
        
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-chirp-stone-100 bg-chirp-stone-50 px-5 py-3">
           <span className="text-xs font-semibold text-chirp-stone-400 mr-2 uppercase tracking-wide">Tone</span>
           {["Message", "Email", "Formal", "Casual"].map((tone, i) => (
             <button key={tone} className={`px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-colors ${i === 1 ? 'bg-white border-chirp-stone-200 text-chirp-stone-900 shadow-sm' : 'border-transparent text-chirp-stone-500 hover:text-chirp-stone-900 hover:bg-chirp-stone-100'}`}>
               {tone}
             </button>
           ))}
        </div>

        <div className="relative flex-1">
          {/* Messy Text (Background) */}
          <div className="absolute inset-0 p-8 text-[17px] leading-[1.8] text-chirp-stone-400 font-body">
            So <span className="text-chirp-amber-400 line-through decoration-chirp-amber-400/50">um</span> I was thinking that <span className="text-chirp-amber-400 line-through decoration-chirp-amber-400/50">like</span> maybe we should <span className="text-chirp-amber-400 line-through decoration-chirp-amber-400/50">you know</span> move the standup to thursdays because <span className="text-chirp-amber-400 line-through decoration-chirp-amber-400/50">uh</span> most of the team is <span className="text-chirp-amber-400 line-through decoration-chirp-amber-400/50">like</span> busy on monday mornings and <span className="text-chirp-amber-400 line-through decoration-chirp-amber-400/50">I mean</span> it just makes more sense right
          </div>

          {/* Clean Text (Foreground, revealed by scroll) */}
          <motion.div 
            className="absolute inset-0 p-8 bg-white text-[17px] leading-[1.8] text-chirp-stone-900 font-body font-medium z-10"
            style={{ clipPath }}
          >
            I was thinking we should move the standup to Thursdays. Most of the team is busy on Monday mornings, so it would make more sense.
            
            {/* Scanning Line */}
            <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-chirp-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
