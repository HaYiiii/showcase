"use client";

import * as React from "react";
import { GraduationCap } from "lucide-react";
import { SectionTitle } from "@/components/blocks/SectionTitle";
import { ActionButton } from "@/components/blocks/ActionButton";

export function ContactSection() {
  return (
    <section id="contact" className="mt-10 scroll-mt-24">
      <SectionTitle
        kicker="CONTACT"
        title="Let’s talk"
        desc="Keep it simple and friendly. Replace placeholders with your real email + links later."
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        {/* Education */}
        <div className="glass p-6 lg:col-span-7">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-2xl bg-ui/70 p-3">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>

            <div>
              <div className="text-[12px] font-bold text-foreground/70">EDUCATION</div>
              <div className="mt-2 text-[16px] font-extrabold text-foreground">
                University of Information Technology (UIT)
              </div>
              <div className="mt-1 text-[13px] text-foreground/70">
                Computer Science • 2018–2022 • GPA 7.59/10
              </div>

              <div className="mt-4 rounded-2xl bg-ui/55 p-4 text-[13px] text-foreground/70">
                This page is meant to feel personal. We’ll swap in content from your CV (projects, links, highlights).
              </div>
            </div>
          </div>
        </div>

        {/* Message box */}
        <div className="glass p-6 lg:col-span-5">
          <div className="text-[12px] font-bold text-foreground/70">MESSAGE</div>
          <div className="mt-2 text-xl font-extrabold tracking-tight text-foreground">
            Want to hire a calm UI builder?
          </div>
          <p className="mt-2 text-[13px] text-foreground/70">
            I’m happy to share details and walk through real cases.
          </p>

          <div className="mt-5 grid gap-2">
            <ActionButton variant="solid">Email me</ActionButton>
            <ActionButton variant="soft">LinkedIn</ActionButton>
            <ActionButton variant="ghost">GitHub</ActionButton>
          </div>
        </div>
      </div>

      <div className="pb-10 pt-8 text-center text-[12px] text-foreground/60">
        Portfolio Preview • Palette:{" "}
        <span className="font-bold text-accent">dynamic</span>
      </div>
    </section>
  );
}
