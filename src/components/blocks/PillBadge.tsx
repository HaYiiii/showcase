import { cn } from "@/lib/utils";
import * as React from "react";

export function PillBadge({
  children,
  tone = "soft",
  className,
}: {
  children: React.ReactNode;
  tone?: "soft" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold",
        tone === "accent"
          ? "bg-accent text-accent-ink"
          : "bg-ui/70 text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
