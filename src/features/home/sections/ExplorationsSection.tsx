"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/blocks/SectionTitle";
import { PillBadge } from "@/components/blocks/PillBadge";
import { ActionButton } from "@/components/blocks/ActionButton";

export function ExplorationsSection() {
  return (
    <section className="mt-12">
      <SectionTitle
        kicker="DESIGN EXPLORATIONS"
        title="Reusable UI Systems & Architecture"
        desc="Intentional design environments built to demonstrate system thinking, pagination strategy, validation UX, and scalable component patterns."
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        {/* Dashboard */}
        <div className="glass relative overflow-hidden p-6 lg:col-span-6">
          <div className="text-[12px] font-bold text-foreground/70">SYSTEM TEMPLATE</div>
          <div className="mt-2 text-xl font-extrabold text-foreground">
            Interactive Dashboard Architecture
          </div>
          <div className="mt-1 text-[13px] text-foreground/70">
            Built to showcase sticky columns, server-friendly pagination, reusable DataGrid core, and predictable data states.
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <PillBadge>Sticky layout logic</PillBadge>
            <PillBadge>Server-side ready</PillBadge>
            <PillBadge>Reusable table core</PillBadge>
            <PillBadge>State-safe UX</PillBadge>
          </div>

          <div className="mt-5">
            <ActionButton asChild variant="solid">
              <a href="/case/dashboard">
                Explore Dashboard <ArrowRight className="h-4 w-4" />
              </a>
            </ActionButton>
          </div>
        </div>

        {/* Form */}
        <div className="glass relative overflow-hidden p-6 lg:col-span-6">
          <div className="text-[12px] font-bold text-foreground/70">FORM SYSTEM</div>
          <div className="mt-2 text-xl font-extrabold text-foreground">
            Structured Form UX Patterns
          </div>
          <div className="mt-1 text-[13px] text-foreground/70">
            Demonstrates validation clarity, sectioned hierarchy, safe submit flows, and accessible focus management.
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <PillBadge>Validation UX</PillBadge>
            <PillBadge>Error summary</PillBadge>
            <PillBadge>Safe actions</PillBadge>
            <PillBadge>Accessible focus</PillBadge>
          </div>

          <div className="mt-5">
            <ActionButton asChild variant="solid">
              <a href="/case/form">
                Try Form Flow <ArrowRight className="h-4 w-4" />
              </a>
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
