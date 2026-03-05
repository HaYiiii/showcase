"use client";

import { Github, Linkedin, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { ActionButton } from "@/components/blocks/ActionButton";
import { useTheme } from "@/components/theme/theme-provider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PERSONAL_INFO } from "@/features/home/data/info";

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

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-3 rounded-xl transition hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ui shadow-sm">
            <span className="text-sm font-bold">H</span>
          </div>
          <div className="text-left leading-tight">
            <div className="text-sm font-semibold">Ha Nguyen</div>
            <div className="text-xs text-muted-foreground">UI/UX Craft</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-16 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Social */}
          <ActionButton variant="ghost" asChild>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </ActionButton>

          <ActionButton variant="ghost" asChild>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </ActionButton>

          {/* Settings (Theme controls moved here) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ActionButton variant="ghost">
                <Settings className="h-4 w-4" />
              </ActionButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 bg-background">
              <DropdownMenuLabel>Visual System</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setMode("a")}
                className={mode === "a" ? "font-semibold" : ""}
              >
                Palette A
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setMode("b")}
                className={mode === "b" ? "font-semibold" : ""}
              >
                Palette B
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={nextAccent}>
                Switch Accent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
