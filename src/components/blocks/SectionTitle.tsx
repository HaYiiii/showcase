import * as React from "react";

export function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="text-[12px] font-bold tracking-widest text-foreground/70">
        {kicker}
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
        {title}
      </h2>
      {desc ? <p className="max-w-2xl text-[14px] text-foreground/70">{desc}</p> : null}
    </div>
  );
}
