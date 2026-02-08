"use client";

import TablePreview from "@/components/home/TablePreview";
import MiniChip from "@/components/ui-blocks/MiniChip";
import Pill from "@/components/ui-blocks/Pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Boxes,
  FileText,
  Gauge,
  LayoutDashboard,
  PenLine,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const CASES = [
  {
    href: "/case/dashboard",
    title: "Dashboard Case — Management UI",
    desc: "Search, filters, table actions, modal form, and full UX states (loading/empty/error).",
    icon: <LayoutDashboard className="h-5 w-5" />,
    pill: "Enterprise Dashboards",
    accent: "bg-primary/10 text-primary",
  },
  {
    href: "/case/form",
    title: "Form Case — Complex Form UX",
    desc: "Sectioned layout, validation UX, submit feedback, and safe interactions for enterprise forms.",
    icon: <FileText className="h-5 w-5" />,
    pill: "Performance & UX States",
    accent: "bg-primary/10 text-primary",
  },
] as const;

export default function HomePage() {
  const totalCases = useMemo(() => CASES.length, []);

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Interactive UI/UX Showcase
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-[720px] text-[44px] leading-[1.05] tracking-tight font-extrabold text-foreground">
              I build <span className="text-primary">clean UI</span>, thoughtful
              UX,
              <br className="hidden sm:block" /> and scalable components.
            </h1>

            <p className="max-w-[620px] text-[15px] leading-relaxed text-muted-foreground">
              This showcase is designed for recruiters and engineers to
              experience my work by interacting with real UI flows — not just
              reading a resume.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-xl">
              <a href="#case-studies">
                Explore Case Studies <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <a href="#contact">Contact</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "React / Next.js",
              "UI Systems",
              "Performance & UX States",
              "Enterprise Dashboards",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-[13px] font-semibold text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Pill
              icon={<Boxes className="h-4 w-4" />}
              title="Dashboard-first UI"
            />
            <Pill
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Role-based UX"
            />
            <Pill
              icon={<Zap className="h-4 w-4" />}
              title="Fast interactions"
            />
            <Pill
              icon={<PenLine className="h-4 w-4" />}
              title="Clear UX writing"
            />
          </div>

          <Card className="rounded-2xl border-border shadow-card">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[12px] font-extrabold tracking-[0.12em] text-muted-foreground">
                    WHAT YOU WILL SEE
                  </div>
                  <div className="text-[16px] font-extrabold text-foreground">
                    Interactive demos with real UX states
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-muted px-3 py-2 text-center">
                  <div className="text-[16px] font-extrabold text-primary">
                    {totalCases}
                  </div>
                  <div className="text-[12px] font-semibold text-muted-foreground">
                    cases
                  </div>
                </div>
              </div>

              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Search, filters, actions, modal forms, and complete feedback
                loops (loading/empty/error).
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <MiniChip
                  icon={<Gauge className="h-4 w-4" />}
                  label="States-first UI"
                />
                <MiniChip
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Safe actions"
                />
                <MiniChip
                  icon={<Zap className="h-4 w-4" />}
                  label="Smooth UX"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Divider />

      {/* CASE STUDIES */}
      <section id="case-studies" className="space-y-5 scroll-mt-24">
        <div className="space-y-2">
          <div className="text-[12px] font-extrabold tracking-[0.16em] text-muted-foreground">
            CASE STUDIES
          </div>
          <h2 className="text-[28px] font-extrabold tracking-tight text-foreground">
            Explore my UI/UX work through interactive flows
          </h2>
          <p className="max-w-[720px] text-[14px] leading-relaxed text-muted-foreground">
            Each case includes the problem, UX thinking, a live demo, and the FE
            techniques behind it.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {CASES.map((c) => (
            <Link key={c.href} href={c.href} className="group">
              <Card className="rounded-2xl border-border shadow-card transition group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_60px_rgba(0,0,0,0.08)]">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-foreground">
                        {c.icon}
                      </span>
                      <div className="space-y-1">
                        <div className="text-[16px] font-extrabold text-foreground">
                          {c.title}
                        </div>
                        <div className="text-[13px] leading-relaxed text-muted-foreground">
                          {c.desc}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1.5 text-[12px] font-bold",
                          c.accent,
                        )}
                      >
                        {c.pill}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-muted-foreground">
                        Open{" "}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Mock preview block */}
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    <TablePreview />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24">
        <Card className="rounded-2xl border-border shadow-card">
          <CardContent className="p-6 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="text-[18px] font-extrabold text-foreground">
                  Contact
                </div>
                <div className="text-[14px] text-muted-foreground">
                  Want a walkthrough? I can explain the UX decisions and FE
                  implementation details.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Replace "#" with real links later */}
                <Button asChild className="rounded-xl">
                  <a href="#" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <a href="#" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

/* ---------- Small UI blocks ---------- */

function Divider() {
  return <div className="h-px w-full bg-border" />;
}
