function TablePreview() {
  return (
    <div className="space-y-3">
      {/* top controls */}
      <div className="flex items-center justify-between gap-3">
        <div className="h-3 w-24 rounded-full bg-border/60" />
        <div className="h-3 w-16 rounded-full bg-border/60" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="h-9 rounded-2xl bg-background border border-border" />
        <div className="h-9 rounded-2xl bg-background border border-border" />
        <div className="h-9 rounded-2xl bg-primary/80" />
      </div>

      {/* table */}
      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        <div className="grid grid-cols-4 gap-0 border-b border-border bg-muted/50">
          {["Name", "Email", "Status", "Action"].map((t) => (
            <div key={t} className="px-4 py-2 text-[12px] font-bold text-muted-foreground">
              {t}
            </div>
          ))}
        </div>

        <div className="divide-y divide-border">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-4">
              <div className="px-4 py-3">
                <div className="h-3 w-20 rounded-full bg-border/60" />
              </div>
              <div className="px-4 py-3">
                <div className="h-3 w-28 rounded-full bg-border/60" />
              </div>
              <div className="px-4 py-3">
                <div className="h-3 w-16 rounded-full bg-border/60" />
              </div>
              <div className="px-4 py-3">
                <div className="h-7 w-16 rounded-xl bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TablePreview;