"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Key = ({ label, isWide = false, pressed }: { label: string, isWide?: boolean, pressed: boolean }) => (
  <motion.div
    animate={{ 
      y: pressed ? 3 : 0,
      scale: pressed ? 0.98 : 1,
      backgroundColor: pressed ? "#FFF8E1" : "#FFFFFF",
      borderColor: pressed ? "#FFB300" : "#E7E5E4",
      boxShadow: pressed 
        ? "0 0 10px 0 rgba(255,179,0,0.2)" 
        : "0 4px 0 0 #D6D3D1, 0 1px 2px 0 rgba(0,0,0,0.05)"
    }}
    transition={{ duration: 0.1, ease: "easeOut" }}
    className={`
      flex items-center justify-center border-2 
      rounded-xl font-display text-sm font-bold text-chirp-stone-700
      ${isWide ? "w-36 px-4" : "w-16 px-2"} h-14 relative
      select-none
    `}
  >
    {label}
    
    {/* Inner top shine */}
    <div className="absolute top-0.5 left-1 right-1 h-0.5 bg-white/60 rounded-full" />
  </motion.div>
);

export function KeyboardDemo() {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPressed(true);
      setTimeout(() => setPressed(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[500px] mx-auto rounded-3xl bg-chirp-stone-50/50 border border-chirp-stone-100 p-12 flex flex-col items-center justify-center gap-8">
      <div className="flex gap-4">
        <Key label="Ctrl" pressed={pressed} />
        <Key label="Shift" pressed={pressed} />
        <Key label="Space" isWide pressed={pressed} />
      </div>
      
      <motion.div 
        animate={{ opacity: pressed ? 1 : 0.4 }}
        className="text-[10px] font-mono font-bold text-chirp-stone-400 uppercase tracking-[0.2em]"
      >
        Press hotkey to transcribe
      </motion.div>
    </div>
  );
}
