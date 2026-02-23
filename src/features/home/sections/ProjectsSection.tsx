"use client";

import { ActionButton } from "@/components/blocks/ActionButton";
import { SectionTitle } from "@/components/blocks/SectionTitle";
import { CheckCircle2 } from "lucide-react";
import { PROJECTS } from "../data/projects";

function SoftList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-[13px] text-foreground/75">
      {items.map((x) => (
        <li key={x} className="flex items-start gap-2">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ui/70">
            <CheckCircle2 className="h-4 w-4 text-accent" />
          </span>
          <span className="text-foreground">{x}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24">
      <SectionTitle
        kicker="CASE STUDIES"
        title="Projects that show how I think"
        desc="The goal is to feel my UI taste — not just read it. Each card is a doorway to an interactive case."
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        {PROJECTS.map((p, idx) => {
          const localAccent = [
            "var(--accent)",
            "color-mix(in oklab, var(--accent) 55%, white)",
            "color-mix(in oklab, var(--accent) 65%, black)",
          ][idx % 3];

          return (
            <div key={p.key} className="glass group relative overflow-hidden p-6 lg:col-span-4">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-[38px] opacity-60 transition group-hover:opacity-80"
                style={{ background: `linear-gradient(135deg, ${localAccent}, transparent)` }}
              />

              <div className="relative">
                <div className="text-[12px] font-bold text-foreground/70">{p.role}</div>
                <div className="mt-2 text-xl font-extrabold tracking-tight text-foreground">{p.name}</div>
                <div className="mt-1 text-[13px] text-foreground/70">{p.tagline}</div>

                <div className="mt-4 rounded-2xl bg-ui/55 p-4">
                  <div className="text-[12px] font-bold text-foreground/70">IMPACT</div>
                  <SoftList items={p.impact} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-ui/65 px-2.5 py-1 text-[11px] font-semibold text-foreground/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <ActionButton key={`${p.key}-${l.href}`} asChild variant={l.variant ?? "solid"}>
                      <a href={l.href}>{l.label}</a>
                    </ActionButton>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
