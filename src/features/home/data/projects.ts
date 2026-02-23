export type ProjectLink = {
  label: string;
  href: string;
  variant?: "solid" | "soft" | "ghost";
};

export type Project = {
  key: string;
  name: string;
  tagline: string;
  role: string;
  impact: string[];
  tech: string[];
  links: ProjectLink[];
};

export const PROJECTS: Project[] = [
  {
    key: "workbee",
    name: "WorkBee",
    tagline: "BSC / OKR platform with real enterprise UX",
    role: "Frontend Engineer (core product)",
    impact: [
      "Built reusable UI patterns across modules",
      "Designed safe UX states (loading/empty/error/success)",
      "Improved performance & UX consistency",
    ],
    tech: ["React", "Next.js", "TypeScript", "GraphQL/REST", "Tailwind"],
    links: [
      { label: "Open Dashboard Case", href: "/case/dashboard", variant: "solid" },
      { label: "UI/UX Principles", href: "/principles", variant: "soft" },
    ],
  },
  {
    key: "forms",
    name: "Complex Form UX",
    tagline: "Validation, summaries, safe actions, feedback",
    role: "Frontend Engineer (forms & flows)",
    impact: [
      "Built form patterns that scale",
      "Clear error messaging + accessible focus",
      "Stable UX with predictable behavior",
    ],
    tech: ["React Hook Form", "Schema validation", "UI tokens"],
    links: [
      { label: "Open Form Case", href: "/case/form", variant: "solid" },
      { label: "Contact", href: "#contact", variant: "ghost" },
    ],
  },
  {
    key: "site",
    name: "SEO + CMS Website",
    tagline: "Next.js site with analytics and CMS-driven pages",
    role: "Frontend Engineer (web)",
    impact: [
      "SEO improvements + analytics integration",
      "CMS pages with maintainable content structure",
      "Clean responsive UI",
    ],
    tech: ["Next.js", "Tailwind", "SCSS", "GA4"],
    links: [
      { label: "Back to Home", href: "/", variant: "soft" },
      { label: "See Case Studies", href: "#projects", variant: "ghost" },
    ],
  },
];
