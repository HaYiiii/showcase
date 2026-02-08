"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const nav = [
  { href: "#case-studies", label: "Case Studies" },
  { href: "/principles", label: "UI/UX Principles" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary font-extrabold">
            H
          </span>
          <div className="leading-tight">
            <div className="text-[14px] font-extrabold text-foreground">Ha Nguyen</div>
            <div className="text-[12px] text-muted-foreground">Frontend Engineer</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const active = item.href.startsWith("/")
                ? pathname === item.href
                : false;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground",
                    active && "bg-muted text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button asChild variant="outline" className="rounded-xl">
            <a href="#contact">
              Contact <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* divider nhẹ giống preview */}
      <div className="h-px w-full bg-border/60" />
    </header>
  );
}
