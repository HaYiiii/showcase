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
      "Built reusable UI components and shared patterns across modules",
      "Designed stable UX states (loading / empty / error / success) ",
      "Improved frontend performance and interface consistency",
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "GraphQL/REST",
      "Ant Design",
      "Tailwind",
    ],
    links: [
      {
        label: "Open Dashboard Case",
        href: "/case/dashboard",
        variant: "solid",
      },
      { label: "UI/UX Principles", href: "/principles", variant: "soft" },
    ],
  },
  {
    key: "site",
    name: "TGL Homepage",
    tagline: "Company website with CMS and SEO optimization",
    role: "Frontend Engineer (web)",
    impact: [
      "CMS pages with maintainable content structure",
      "Integrated Google Analytics and Search Console",
      "Improved SEO structure and search visibility",
    ],
    tech: ["Next.js", "Tailwind", "SCSS", "GA4"],
    links: [
      { label: "Back to Home", href: "/", variant: "soft" },
      { label: "See Case Studies", href: "#projects", variant: "ghost" },
    ],
  },
  {
    key: "forms",
    name: "Inspection Cloud",
    tagline: "Smart inspection system for field reporting",
    role: "Frontend Engineer (web + mobile)",
    impact: [
      "Improved UX for web and mobile inspection workflows",
      "Optimized photo editing feature for field inspections",
      "Integrated GraphQL APIs and improved data handling",
    ],
    tech: [
      "React",
      "React Native",
      "TypeScript",
      "GraphQL",
      "Redux",
      "React Hook Form",
    ],
    links: [
      { label: "Open Form Case", href: "/case/form", variant: "solid" },
      { label: "Contact", href: "#contact", variant: "ghost" },
    ],
  },
];
