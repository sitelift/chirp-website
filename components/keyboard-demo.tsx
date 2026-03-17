"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Key = ({ label, isWide = false, pressed }: { label: string, isWide?: boolean, pressed: boolean }) => (
  <motion.div
    animate={{ 
      y: pressed ? 4 : 0,
      boxShadow: pressed 
        ? "0 0 0 0 rgba(0,0,0,0)" 
        : "0 4px 0 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)"
    }}
    transition={{ duration: 0.1 }}
    className={`
      flex items-center justify-center bg-chirp-stone-50 border border-chirp-stone-200 
      rounded-lg font-mono text-sm font-medium text-chirp-stone-700
      ${isWide ? "w-32 px-4" : "w-16 px-2"} h-12 relative
    `}
  >
    {label}
  </motion.div>
);

export function KeyboardDemo() {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPressed(true);
      setTimeout(() => setPressed(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[400px] mx-auto rounded-2xl bg-white shadow-surface p-12 flex items-center justify-center">
      <div className="flex gap-4">
        <Key label="Ctrl" pressed={pressed} />
        <Key label="Shift" pressed={pressed} />
        <Key label="Space" isWide pressed={pressed} />
      </div>
    </div>
  );
}
