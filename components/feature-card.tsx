import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant: "light" | "dark";
}

export function FeatureCard({ icon: Icon, title, description, variant }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8 flex flex-col gap-4",
        variant === "light"
          ? "bg-white border border-chirp-stone-200/80 shadow-surface"
          : "bg-chirp-stone-800 border border-chirp-stone-700"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          variant === "light"
            ? "bg-chirp-amber-400/10"
            : "bg-chirp-amber-400/15"
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5",
            variant === "light" ? "text-chirp-amber-600" : "text-chirp-amber-400"
          )}
          strokeWidth={1.5}
        />
      </div>
      <h3
        className={cn(
          "font-display text-lg font-bold",
          variant === "light" ? "text-chirp-stone-900" : "text-white"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-[15px] leading-relaxed",
          variant === "light" ? "text-chirp-stone-500" : "text-chirp-stone-400"
        )}
      >
        {description}
      </p>
    </div>
  );
}
