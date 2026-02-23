"use client";

import { ActionButton } from "@/components/blocks/ActionButton";
import { PillBadge } from "@/components/blocks/PillBadge";
import { useTheme } from "@/components/theme/theme-provider";
import { Github, Linkedin } from "lucide-react";

export function SiteHeader() {
  const { mode, setMode, paletteName, nextAccent } = useTheme();

  return (
    <div className="flex flex-col gap-3 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
      {/* left */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ui/70 shadow-sm">
          <span className="text-[14px] font-extrabold text-foreground">H</span>
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-extrabold text-foreground">Ha Nguyen</div>
          <div className="text-[12px] text-foreground/70">Frontend • UI/UX craft</div>
        </div>
      </div>

      {/* right */}
      <div className="flex flex-wrap items-center gap-2">
        <PillBadge>Interactive portfolio</PillBadge>
        <PillBadge tone="accent">{paletteName}</PillBadge>

        <div className="flex flex-wrap items-center gap-2">
          <ActionButton variant={mode === "a" ? "solid" : "soft"} className="px-3" onClick={() => setMode("a")}>
            Palette A
          </ActionButton>
          <ActionButton variant={mode === "b" ? "solid" : "soft"} className="px-3" onClick={() => setMode("b")}>
            Palette B
          </ActionButton>
          <ActionButton variant="ghost" className="px-3" onClick={nextAccent} title="Switch accent color">
            Accent
          </ActionButton>

          <ActionButton variant="soft" className="px-3" asChild>
            <a href="#" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </ActionButton>

          <ActionButton variant="soft" className="px-3" asChild>
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
