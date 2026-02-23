"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "soft" | "ghost";

export function ActionButton({
  children,
  variant = "solid",
  asChild,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-[13px] font-semibold transition will-change-transform active:translate-y-[1px]";

  const v =
    variant === "solid"
      ? "bg-accent text-accent-ink shadow-[0_10px_22px_rgba(0,0,0,0.10)] hover:translate-y-[-1px]"
      : variant === "soft"
      ? "bg-ui/70 text-foreground border border-glass/70 hover:bg-ui/85 hover:translate-y-[-1px]"
      : "bg-transparent text-foreground border border-transparent hover:bg-ui/40 hover:border-glass/60";

  if (asChild) {
    const onlyChild = React.Children.only(children) as React.ReactElement<React.ComponentProps<"a"> | React.ComponentProps<"button">>;
    return React.cloneElement(onlyChild, {
      className: cn(base, v, className, onlyChild.props?.className),
      ...props,
    });
  }

  return (
    <button className={cn(base, v, className)} {...props}>
      {children}
    </button>
  );
}
