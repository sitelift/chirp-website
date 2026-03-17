"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FeatureRowProps {
  reverse?: boolean;
  visual: React.ReactNode;
  title: string;
  body: string;
  caption?: string;
}

export function FeatureRow({
  reverse = false,
  visual,
  title,
  body,
  caption,
}: FeatureRowProps) {
  return (
    <motion.div
      {...reveal}
      className={cn(
        "mx-auto grid max-w-[1120px] items-center gap-12 md:grid-cols-2",
        reverse && "md:[&>*:first-child]:order-2"
      )}
    >
      <div>{visual}</div>
      <div>
        <h3 className="font-display text-[32px] font-bold leading-tight tracking-tight text-chirp-stone-900">
          {title}
        </h3>
        <p className="mt-4 max-w-[440px] text-[17px] leading-[1.75] text-chirp-stone-600">
          {body}
        </p>
        {caption && (
          <p className="mt-4 font-mono text-xs text-chirp-stone-400">
            {caption}
          </p>
        )}
      </div>
    </motion.div>
  );
}
