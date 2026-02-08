function Pill({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-3 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-2 text-[13px] font-bold text-foreground">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-foreground">
          {icon}
        </span>
        {title}
      </div>
    </div>
  );
}

export default Pill;