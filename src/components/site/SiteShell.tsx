import * as React from "react";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ✅ FULL-WIDTH sticky bar */}
      <header className="sticky top-0 z-50 w-full">
        <div className="bg-background/70 backdrop-blur-xl">
          <div className="mx-auto w-full max-w-[1240px] px-4 md:px-6 py-2">
            {/* nếu muốn header “nổi” hơn, bật rounded + border nhẹ */}
            <div className="rounded-2xl border border-border/40 bg-background/40">
              <SiteHeader />
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Page content container */}
      <main className="mx-auto w-full max-w-[1240px] px-4 md:px-6 pt-6 pb-10 md:pt-10 md:pb-14">
        {children}
      </main>
    </div>
  );
}
