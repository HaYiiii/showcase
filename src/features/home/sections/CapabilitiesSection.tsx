"use client";

import { SectionTitle } from "@/components/blocks/SectionTitle";
import { SKILLS, SKILL_ICONS } from "../data/skills";

export function CapabilitiesSection() {
  return (
    <section className="mt-12">
      <SectionTitle
        kicker="CAPABILITIES"
        title="What I’m strong at"
        desc="A quick snapshot — the details are proven inside the interactive cases."
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        {SKILLS.map((s, idx) => {
          const localAccent = [
            "color-mix(in oklab, var(--accent) 75%, white)",
            "var(--accent)",
            "color-mix(in oklab, var(--accent) 70%, black)",
          ][idx % 3];

          const Icon = SKILL_ICONS[s.icon];

          return (
            <div key={s.title} className="glass p-6 lg:col-span-4">
              <div className="flex items-center gap-2 text-[12px] font-bold text-foreground/70">
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-ui/70"
                  style={{ color: localAccent }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {s.title}
              </div>

              <ul className="mt-4 space-y-2 text-[13px] text-foreground/75">
                {s.items.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ui/70">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: localAccent }} />
                    </span>
                    <span className="text-foreground">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
