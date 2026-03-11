"use client";

import { ActionButton } from "@/components/blocks/ActionButton";
import { SectionTitle } from "@/components/blocks/SectionTitle";
import { GraduationCap } from "lucide-react";
import { PERSONAL_INFO } from "../data/info";

export function ContactSection() {
  return (
    <section id="contact" className="mt-10 scroll-mt-24">
      <SectionTitle
        kicker="CONTACT"
        title="Let's connect"
        desc="If you'd like to discuss a project, collaboration, or just say hello, feel free to reach out."
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        {/* Education */}
        <div className="glass p-6 lg:col-span-7">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-2xl bg-ui/70 p-3">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>

            <div>
              <div className="text-[12px] font-bold text-foreground/70">
                EDUCATION
              </div>
              <div className="mt-2 text-[16px] font-extrabold text-foreground">
                University of Information Technology (UIT)
              </div>
              <div className="mt-1 text-[13px] text-foreground/70">
                Computer Science • 2018–2022 • GPA 7.59/10
              </div>
            </div>
          </div>
        </div>

        {/* Message box */}
        <div className="glass p-6 lg:col-span-5">
          <div className="text-[12px] font-bold text-foreground/70">
            MESSAGE
          </div>
          <div className="mt-5 grid md:grid-cols-3 gap-2">
            <ActionButton variant="solid" asChild>
              <a href={`mailto:${PERSONAL_INFO.email}`}>Email me</a>
            </ActionButton>
            <ActionButton variant="soft" asChild>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </ActionButton>
            <ActionButton variant="ghost" asChild>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
