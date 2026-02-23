import * as React from "react";
import { cn } from "@/lib/utils"; // hoặc cn của bạn
import { Card } from "@/components/ui/card";

type GlassCardProps = React.ComponentProps<typeof Card>;

export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <Card
      className={cn(
        "rounded-[28px] border border-glass/50 bg-ui/60 shadow-glass backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
