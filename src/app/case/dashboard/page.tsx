"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ChevronDown,
  Eye,
  Filter,
  PencilLine,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardTable } from "./_components/DashboardTable";

/* ---------------- Types ---------------- */

type Status = "Active" | "Paused" | "Archived";
type Role = "Admin" | "Member";

type Row = {
  id: string;
  name: string;
  owner: string;
  email: string;
  status: Status;
  updatedAt: string;
  role: Role;
};

const SEED: Row[] = [
  {
    id: "WB-1024",
    name: "WorkBee — KPI Catalog",
    owner: "Ha Nguyen",
    email: "ha@company.com",
    status: "Active",
    updatedAt: "2026-02-01",
    role: "Admin",
  },
  {
    id: "WB-1025",
    name: "Department OKR — Planning",
    owner: "Linh Nguyen",
    email: "linh@company.com",
    status: "Paused",
    updatedAt: "2026-01-28",
    role: "Member",
  },
  {
    id: "WB-1026",
    name: "Goal Management — Tree View",
    owner: "Duy Tran",
    email: "duy@company.com",
    status: "Active",
    updatedAt: "2026-01-22",
    role: "Member",
  },
  {
    id: "WB-1027",
    name: "BSC Strategy Dashboard",
    owner: "Quang Pham",
    email: "quang@company.com",
    status: "Archived",
    updatedAt: "2025-12-18",
    role: "Admin",
  },
  {
    id: "WB-1028",
    name: "TMS — Approval Flow",
    owner: "Ha Nguyen",
    email: "ha@company.com",
    status: "Active",
    updatedAt: "2026-02-02",
    role: "Admin",
  },
];

const STATUS_META: Record<Status, { label: string; className: string }> = {
  Active: { label: "Active", className: "bg-primary/10 text-primary" },
  Paused: { label: "Paused", className: "bg-muted text-foreground" },
  Archived: {
    label: "Archived",
    className: "bg-destructive/10 text-destructive",
  },
};

/* ---------------- Page ---------------- */

export default function DashboardCasePage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "All">("All");
  const [onlyMine, setOnlyMine] = useState(false);

  // States demo
  const [demoState, setDemoState] = useState<"ready" | "loading" | "error">(
    "ready",
  );

  // Modal
  const [openCreate, setOpenCreate] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftOwner, setDraftOwner] = useState("Ha Nguyen");
  const [rows, setRows] = useState<Row[]>(SEED);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  // dùng pagedRows thay filtered khi render table

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter((r) => (status === "All" ? true : r.status === status))
      .filter((r) => (onlyMine ? r.owner === "Ha Nguyen" : true))
      .filter((r) => {
        if (!q) return true;
        return (
          r.id.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
        );
      });
  }, [rows, query, status, onlyMine]);

  const filteredTotal = filtered.length;

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize); // giả lập server response
  }, [filtered, page]);

  const counts = useMemo(() => {
    const all = rows.length;
    const active = rows.filter((r) => r.status === "Active").length;
    const paused = rows.filter((r) => r.status === "Paused").length;
    const archived = rows.filter((r) => r.status === "Archived").length;
    return { all, active, paused, archived };
  }, [rows]);

  const createRow = () => {
    const name = draftName.trim();
    if (!name) return;

    const newRow: Row = {
      id: `WB-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      owner: draftOwner,
      email: draftOwner.toLowerCase().includes("ha")
        ? "ha@company.com"
        : "member@company.com",
      status: "Active",
      updatedAt: "2026-02-02",
      role: draftOwner === "Ha Nguyen" ? "Admin" : "Member",
    };

    setRows((prev) => [newRow, ...prev]);
    setDraftName("");
    setDraftOwner("Ha Nguyen");
    setOpenCreate(false);
  };

  const updateStatus = (id: string, next: Status) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: next, updatedAt: "2026-02-02" } : r,
      ),
    );
  };

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const resetDemo = () => {
    setQuery("");
    setStatus("All");
    setOnlyMine(false);
    setDemoState("ready");
    setRows(SEED);
  };

  return (
    <div className="space-y-6">
      {/* Top back + title */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>

          <div>
            <div className="text-[18px] font-extrabold text-foreground">
              Dashboard Case
            </div>
            <div className="text-[13px] text-muted-foreground">
              Search • Filters • Table actions • Modal form • UX states
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={demoState === "loading" ? "default" : "outline"}
            className="rounded-xl"
            onClick={() => setDemoState("loading")}
          >
            Loading state
          </Button>
          <Button
            variant={demoState === "error" ? "default" : "outline"}
            className="rounded-xl"
            onClick={() => setDemoState("error")}
          >
            Error state
          </Button>
          <Button
            variant={demoState === "ready" ? "default" : "outline"}
            className="rounded-xl"
            onClick={() => setDemoState("ready")}
          >
            Ready
          </Button>
          <Button variant="outline" className="rounded-xl" onClick={resetDemo}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi title="All" value={counts.all} />
        <Kpi title="Active" value={counts.active} className="text-primary" />
        <Kpi title="Paused" value={counts.paused} />
        <Kpi
          title="Archived"
          value={counts.archived}
          className="text-destructive"
        />
      </div>

      {/* Controls */}
      <Card className="rounded-2xl border-border shadow-card">
        <CardHeader className="p-5 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[14px] font-extrabold text-foreground">
              <Filter className="h-4 w-4" />
              Filters
            </div>

            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
              <DialogTrigger asChild>
                <Button className="rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  Create
                </Button>
              </DialogTrigger>

              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[16px] font-extrabold">
                    Create item
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="text-[13px] font-bold text-foreground">
                      Name
                    </div>
                    <Input
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      placeholder="e.g. KPI Assignment — Review flow"
                      className="rounded-xl"
                    />
                    <div className="text-[12px] text-muted-foreground">
                      Keep it descriptive. This will appear in tables and
                      filters.
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[13px] font-bold text-foreground">
                      Owner
                    </div>
                    <Input
                      value={draftOwner}
                      onChange={(e) => setDraftOwner(e.target.value)}
                      placeholder="Ha Nguyen"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => setOpenCreate(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="rounded-xl"
                      onClick={createRow}
                      disabled={!draftName.trim()}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by id, name, owner, email..."
                className="pl-10 rounded-xl"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between rounded-xl bg-background"
                >
                  Status: <span className="ml-2 font-bold">{status}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="rounded-xl bg-background w-full"
              >
                {(["All", "Active", "Paused", "Archived"] as const).map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => setStatus(s as Status)}
                  >
                    {s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={onlyMine ? "default" : "outline"}
              className="rounded-xl justify-start"
              onClick={() => setOnlyMine((v) => !v)}
            >
              Only mine (Ha Nguyen)
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          {/* States */}
          {demoState === "loading" && (
            <StateBlock
              title="Loading..."
              desc="Fetching table data and aggregations."
            >
              <div className="grid gap-3 p-5 md:grid-cols-3">
                <SkeletonBox />
                <SkeletonBox />
                <SkeletonBox />
              </div>
              <Separator />
              <div className="p-5 space-y-3">
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine />
              </div>
            </StateBlock>
          )}

          {demoState === "error" && (
            <StateBlock
              title="Something went wrong"
              desc="Try again, or reset to a known state."
            >
              <div className="flex flex-wrap items-center gap-2 p-5">
                <Button
                  className="rounded-xl"
                  onClick={() => setDemoState("ready")}
                >
                  Retry
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={resetDemo}
                >
                  Reset
                </Button>
              </div>
            </StateBlock>
          )}

          {demoState === "ready" && (
            <DashboardTable
              rows={pageRows}
              onStatus={updateStatus}
              onDelete={removeRow}
              pagination={{
                page,
                pageSize,
                total: filteredTotal,
                onPageChange: setPage,
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Kpi({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className?: string;
}) {
  return (
    <Card className="rounded-2xl border-border shadow-card">
      <CardContent className="p-5">
        <div className="text-[12px] font-extrabold tracking-[0.12em] text-muted-foreground">
          {title}
        </div>
        <div
          className={cn(
            "mt-2 text-[22px] font-extrabold text-foreground",
            className,
          )}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function StateBlock({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-0">
      <div className="p-5 space-y-1">
        <div className="text-[15px] font-extrabold text-foreground">
          {title}
        </div>
        <div className="text-[13px] text-muted-foreground">{desc}</div>
      </div>
      <Separator />
      {children}
    </div>
  );
}

function RowActions({
  row,
  onStatus,
  onDelete,
}: {
  row: Row;
  onStatus: (id: string, next: Status) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-xl bg-background">
          Actions <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="rounded-xl bg-background">
        <DropdownMenuItem onClick={() => alert(`Preview: ${row.id}`)}>
          <Eye className="mr-2 h-4 w-4" /> View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Edit (demo): ${row.id}`)}>
          <PencilLine className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onStatus(row.id, "Active")}>
          Set Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatus(row.id, "Paused")}>
          Set Paused
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatus(row.id, "Archived")}>
          Set Archived
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => onDelete(row.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SkeletonBox() {
  return <div className="h-16 rounded-2xl bg-muted animate-pulse" />;
}
function SkeletonLine() {
  return <div className="h-4 w-full rounded-full bg-muted animate-pulse" />;
}
