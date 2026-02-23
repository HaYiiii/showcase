"use client";

import * as React from "react";
import { useTheme } from "@/components/theme/theme-provider";

const PALETTES = {
  a: { a1: "#77ABB6", a2: "#F8B097", a3: "#3FC495" },
  b: { a1: "#4840A3", a2: "#F9CD6A", a3: "#9CBBFC" },
};

export function Background() {
  const { mode } = useTheme();
  const pal = PALETTES[mode] ?? PALETTES.a;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* soft haze */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(900px 520px at 14% 18%, ${pal.a2}55, transparent 62%),` +
            `radial-gradient(980px 520px at 88% 22%, ${pal.a1}55, transparent 62%),` +
            `radial-gradient(980px 560px at 55% 92%, ${pal.a3}55, transparent 64%)`,
          filter: "blur(16px)",
          opacity: 0.9,
        }}
      />
      {/* subtle noise-like overlay (optional but makes it “premium”) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0.10))]" />
    </div>
  );
}
