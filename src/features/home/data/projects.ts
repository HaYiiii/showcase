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
    tagline: "A lean management platform based on the BSC model, helping businesses streamline operations, foster human development, and drive innovation for sustainable growth.",
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
    links: [],
  },
  {
    key: "site",
    name: "TGL Homepage",
    tagline: "The company's official website introduces the company, showcases services and projects, and enhances brand presence.",
    role: "Frontend Engineer (web)",
    impact: [
      "CMS pages with maintainable content structure",
      "Integrated Google Analytics and Search Console",
      "Improved SEO structure and search visibility",
    ],
    tech: ["Next.js", "Tailwind", "SCSS", "GA4"],
    links: [],
  },
  {
    key: "forms",
    name: "Inspection Cloud",
    tagline: "A cloud-based web and mobile inspection system for on-site inspections, automated reporting, and centralized project management.",
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
    links: [],
  },
];
