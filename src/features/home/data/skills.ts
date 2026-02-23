import { Sparkles, Zap, CheckCircle2 } from "lucide-react";

export type SkillGroup = {
  title: string;
  items: string[];
  icon: "sparkles" | "zap" | "check";
};

export const SKILLS: SkillGroup[] = [
  {
    title: "Frontend craft",
    items: [
      "React / Next.js (App Router)",
      "TypeScript, clean component APIs",
      "Design tokens + consistent spacing",
      "State: Redux / Zustand / Context",
    ],
    icon: "sparkles",
  },
  {
    title: "UX thinking",
    items: [
      "Enterprise flows, role-based UX",
      "Interaction states & error handling",
      "A11y basics (labels, keyboard, focus)",
      "Micro-interactions that feel fast",
    ],
    icon: "zap",
  },
  {
    title: "Delivery",
    items: [
      "GraphQL / REST integration",
      "Performance awareness",
      "SEO + analytics when needed",
      "Maintainable structure (hooks, modules)",
    ],
    icon: "check",
  },
];

export const SKILL_ICONS = {
  sparkles: Sparkles,
  zap: Zap,
  check: CheckCircle2,
} as const;
