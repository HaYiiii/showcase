"use client";

import { ActionButton } from "@/components/blocks/ActionButton";
import { PillBadge } from "@/components/blocks/PillBadge";
import { ArrowRight, Github, Linkedin } from "lucide-react";
// nếu chưa có GlassCard thì dùng div className="glass"

function Doodle() {
  return (
    <svg
      width="220"
      height="64"
      viewBox="0 0 220 64"
      fill="none"
      className="opacity-90"
    >
      <path
        d="M12 42c18-20 30 16 48 0s22-18 36 0 26 16 40 0 24-20 44 0"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18 22c10-8 16 8 26 0s12-10 20 0 14 8 22 0 14-10 26 0"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeroSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
      <div className="glass relative overflow-hidden p-7 lg:col-span-7 md:p-8">
        <div
          className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-[48px]"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--accent) 35%, white), color-mix(in oklab, var(--accent) 10%, transparent))",
            opacity: 0.55,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-[56px]"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--accent) 25%, white), color-mix(in oklab, var(--accent) 10%, transparent))",
            opacity: 0.5,
          }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <PillBadge>UX thinking</PillBadge>
            <PillBadge>UI systems</PillBadge>
            <PillBadge tone="accent">fast interactions</PillBadge>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            I build clean UI, <span className="text-accent">thoughtful UX</span>
            , and
            <br className="hidden md:block" /> scalable components.
          </h1>

          <p className="mt-3 max-w-xl text-[14px] leading-6 text-foreground/75">
            Recruiters don’t just read — they can click, explore, and feel how I
            design flows. I care about hierarchy, micro-interactions, and
            reliable UX states.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <ActionButton asChild variant="solid">
              <a href="#projects">
                Explore projects <ArrowRight className="h-4 w-4" />
              </a>
            </ActionButton>
            <ActionButton asChild variant="soft">
              <a href="#contact">Say hi</a>
            </ActionButton>
            <ActionButton asChild variant="ghost">
              <a href="#">Download CV</a>
            </ActionButton>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4 rounded-2xl bg-ui/55 p-4">
            <div>
              <div className="text-[12px] font-bold text-foreground/70">
                Signature
              </div>
              <div className="mt-2">
                <Doodle />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ActionButton
                variant="soft"
                className="px-3"
                asChild
                aria-label="GitHub"
              >
                <a href="#" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </ActionButton>
              <ActionButton
                variant="soft"
                className="px-3"
                asChild
                aria-label="LinkedIn"
              >
                <a href="#" target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </ActionButton>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: About + stats -> mình sẽ build ở section sau nếu bạn ok */}
      <div className="grid gap-4 lg:col-span-5">
        <div className="glass p-6">
          <div className="text-[12px] font-bold tracking-widest text-foreground/70">
            ABOUT
          </div>
          <div className="mt-2 text-[18px] font-extrabold text-foreground">
            Not a dashboard — a story
          </div>
          <div className="mt-1 text-[13px] text-foreground/70">
            I’m Ha. I love clean spacing, readable hierarchy, and interactions
            that feel calm.
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl bg-ui/65 p-3 text-[12px] font-semibold text-foreground/80">
              Dashboard-first UI
            </div>
            <div className="rounded-2xl bg-ui/65 p-3 text-[12px] font-semibold text-foreground/80">
              Role-based UX
            </div>
            <div className="rounded-2xl bg-ui/65 p-3 text-[12px] font-semibold text-foreground/80">
              Fast interactions
            </div>
            <div className="rounded-2xl bg-ui/65 p-3 text-[12px] font-semibold text-foreground/80">
              Clear UX writing
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass flex items-center justify-between p-4">
            <div className="text-[12px] font-bold text-foreground/70">
              Experience
            </div>
            <div className="text-[14px] font-extrabold text-foreground">
              3+ years
            </div>
          </div>
          <div className="glass flex items-center justify-between p-4">
            <div className="text-[12px] font-bold text-foreground/70">
              Focus
            </div>
            <div className="text-[14px] font-extrabold text-foreground">
              UI/UX craft
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
