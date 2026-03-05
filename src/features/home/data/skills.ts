import { Sparkles, Zap, CheckCircle2 } from "lucide-react";

export type SkillGroup = {
  title: string;
  items: string[];
  icon: "sparkles" | "zap" | "check";
};

export const SKILLS: SkillGroup[] = [
  {
    title: "Frontend engineering",
    items: [
      "React / Next.js (App Router)",
      "TypeScript, clean component APIs",
      "Reusable UI components and custom hooks",
      "State management (Redux / Zustand / Context)",
    ],
    icon: "sparkles",
  },
  {
    title: "UX thinking",
    items: [
      "Enterprise dashboards and complex workflows",
      "Form UX, validation, and interaction state",
      "Accessible UI (labels, focus, keyboard support)",
      "Micro-interactions and responsive interfaces",
    ],
    icon: "zap",
  },
  {
    title: "Product delivery",
    items: [
      "GraphQL / REST integration",
      "Performance and UX optimization",
      "SEO and analytics integration",
      "Maintainable frontend structure (modules, hooks)",
    ],
    icon: "check",
  },
];

export const SKILL_ICONS = {
  sparkles: Sparkles,
  zap: Zap,
  check: CheckCircle2,
} as const;
