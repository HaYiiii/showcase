"use client";

import * as React from "react";

const PALETTES = {
  a: { name: "Mint Pop", ink: "#1B1B1B", a1: "#77ABB6", a2: "#F8B097", a3: "#3FC495", bg: "#EEF2F1" },
  b: { name: "Blue Candy", ink: "#141319", a1: "#4840A3", a2: "#F9CD6A", a3: "#9CBBFC", bg: "#D8EFF7" },
};

type Mode = "a" | "b";

type ThemeCtx = {
  mode: Mode;
  setMode: (m: Mode) => void;
  paletteName: string;
  nextAccent: () => void;
};

const Ctx = React.createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<Mode>("a");
  const [accentIdx, setAccentIdx] = React.useState(0);

  const pal = PALETTES[mode];
  const accents = [pal.a1, pal.a2, pal.a3];
  const accent = accents[accentIdx % accents.length];

  React.useEffect(() => {
    const root = document.documentElement; // ✅ apply globally
    root.style.setProperty("--bg", pal.bg);
    root.style.setProperty("--ink", pal.ink);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-ink", pal.ink);
  }, [pal.bg, pal.ink, accent]);

  const value: ThemeCtx = {
    mode,
    setMode,
    paletteName: pal.name,
    nextAccent: () => setAccentIdx((x) => x + 1),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
