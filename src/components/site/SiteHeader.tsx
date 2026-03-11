"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Github, Linkedin, Settings } from "lucide-react";

import { ActionButton } from "@/components/blocks/ActionButton";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = { label: string; id: string };

const NAV: NavItem[] = [
  { label: "Projects", id: "projects" },
  { label: "Explorations", id: "explore" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Contact", id: "contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", `#${id}`);
  return true;
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode, nextAccent } = useTheme();

  const [activeId, setActiveId] = React.useState<string>("projects");
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const onNav = React.useCallback(
    (id: string) => {
      if (pathname && pathname.startsWith("/case")) {
        router.push(`/#${id}`);
        return;
      }

      const ok = scrollToId(id);
      if (!ok) window.location.hash = `#${id}`;
    },
    [pathname, router],
  );

  React.useEffect(() => {
    if (pathname && pathname.startsWith("/case")) return;

    const sectionIds = NAV.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.3, 0.5, 0.7],
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/72 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="group flex items-center gap-3 rounded-xl transition"
          aria-label="Go to Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ui shadow-sm transition-transform duration-300 group-hover:-translate-y-[1px]">
            <span className="text-sm font-bold text-foreground">H</span>
          </div>
          <div className="text-left leading-tight">
            <div className="text-sm font-semibold text-foreground">Ha Nguyen</div>
            <div className="text-xs text-muted-foreground">UI/UX Craft</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className={cn(
                  "group relative rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{item.label}</span>

                {/* hover / active underline */}
                <span
                  className={cn(
                    "pointer-events-none absolute left-3 right-3 bottom-1 h-[2px] origin-left rounded-full bg-accent transition-transform duration-250",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1">
          <ActionButton variant="ghost" asChild className="px-3">
            <a href="#" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </ActionButton>

          <ActionButton variant="ghost" asChild className="px-3">
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </ActionButton>

          <DropdownMenu open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Open visual settings"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-transparent text-foreground transition hover:bg-ui/40 hover:border-glass/60"
              >
                <Settings
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    settingsOpen ? "rotate-45" : "rotate-0 hover:rotate-12",
                  )}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 rounded-2xl bg-background">
              <DropdownMenuLabel>Visual System</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setMode("a")}
                className={cn("cursor-pointer", mode === "a" && "font-semibold text-foreground")}
              >
                Palette A
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setMode("b")}
                className={cn("cursor-pointer", mode === "b" && "font-semibold text-foreground")}
              >
                Palette B
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={nextAccent} className="cursor-pointer">
                Switch Accent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}