import { cn } from "@/lib/utils";

export function AmberWarmth({
  className,
  tight = false,
}: {
  className?: string;
  tight?: boolean;
}) {
  return (
    <div
      className={cn(tight ? "amber-warmth-tight" : "amber-warmth", className)}
      aria-hidden="true"
    />
  );
}
