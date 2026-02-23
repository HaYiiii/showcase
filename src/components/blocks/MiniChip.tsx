function MiniChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[12px] font-semibold text-muted-foreground">
      {icon}
      {label}
    </span>
  );
}

export default MiniChip;