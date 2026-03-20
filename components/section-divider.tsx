import { cn } from "@/lib/utils";

type DividerVariant = "light-to-dark" | "dark-to-light" | "dark-to-light-dotted" | "light-to-dark-amber" | "dark-to-light-amber";

interface SectionDividerProps {
  variant: DividerVariant;
  className?: string;
}

export function SectionDivider({ variant, className }: SectionDividerProps) {
  const configs: Record<DividerVariant, { bg: string; wave1: string; wave2: string; wave3: string; accent: string }> = {
    "light-to-dark": {
      bg: "#ffffff",
      wave1: "#292524",
      wave2: "#1C1917",
      wave3: "#1C1917",
      accent: "#FBBF24",
    },
    "dark-to-light": {
      bg: "#1C1917",
      wave1: "#F5F5F4",
      wave2: "#ffffff",
      wave3: "#ffffff",
      accent: "#FBBF24",
    },
    "dark-to-light-dotted": {
      bg: "#1C1917",
      wave1: "#F5F5F4",
      wave2: "#ffffff",
      wave3: "#ffffff",
      accent: "#FBBF24",
    },
    "light-to-dark-amber": {
      bg: "#ffffff",
      wave1: "#292524",
      wave2: "#1C1917",
      wave3: "#1C1917",
      accent: "#FBBF24",
    },
    "dark-to-light-amber": {
      bg: "#1C1917",
      wave1: "#F5F5F4",
      wave2: "#ffffff",
      wave3: "#ffffff",
      accent: "#FBBF24",
    },
  };

  const { bg, wave1, wave2, wave3, accent } = configs[variant];

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: "clamp(100px, 12vw, 180px)" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background wave — deepest, most subtle */}
        <path
          d="M0,100 C180,70 360,120 540,85 C720,50 900,110 1080,75 C1200,55 1320,95 1440,70 L1440,180 L0,180 Z"
          fill={wave1}
          opacity="0.4"
        />

        {/* Middle wave */}
        <path
          d="M0,115 C160,85 320,130 480,100 C640,70 800,120 960,90 C1120,60 1280,105 1440,80 L1440,180 L0,180 Z"
          fill={wave2}
          opacity="0.7"
        />

        {/* Amber accent line weaving through */}
        <path
          d="M0,108 C200,78 400,128 600,92 C800,56 1000,116 1200,82 C1320,66 1400,90 1440,76"
          stroke={accent}
          strokeWidth="2"
          strokeOpacity="0.35"
          fill="none"
        />

        {/* Front wave — solid, final color */}
        <path
          d="M0,130 C120,105 240,145 360,120 C480,95 600,140 720,115 C840,90 960,135 1080,110 C1200,85 1320,125 1440,100 L1440,180 L0,180 Z"
          fill={wave3}
        />
      </svg>
    </div>
  );
}
