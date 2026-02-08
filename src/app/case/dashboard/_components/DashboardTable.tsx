"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGridTable, ColumnDef } from "@/components/common/DataGridTable";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Eye,
  PencilLine,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Status = "Active" | "Paused" | "Archived";
export type Role = "Admin" | "Member";

export type Row = {
  id: string;
  name: string;
  owner: string;
  email: string;
  status: Status;
  updatedAt: string;
  role: Role;
};

const STATUS_META: Record<Status, { label: string; className: string }> = {
  Active: { label: "Active", className: "bg-primary/10 text-primary" },
  Paused: { label: "Paused", className: "bg-muted text-foreground" },
  Archived: { label: "Archived", className: "bg-destructive/10 text-destructive" },
};

export function DashboardTable({
  rows,
  onStatus,
  onDelete,
  pagination,
}: {
  rows: Row[];
  onStatus: (id: string, next: Status) => void;
  onDelete: (id: string) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}) {
  const columns = React.useMemo<ColumnDef<Row>[]>(() => {
    return [
      {
        key: "id",
        title: "ID",
        colSpan: 2,
        // sticky: "left",
        // widthPx: 220,
        render: (r) => (
          <div>
            <div className="text-[13px] font-extrabold">{r.id}</div>
            <div className="text-[12px] text-muted-foreground">{r.updatedAt}</div>
          </div>
        ),
      },
      {
        key: "name",
        title: "Name",
        colSpan: 5,
        render: (r) => (
          <div>
            <div className="text-[13px] font-bold">{r.name}</div>
            <div className="text-[12px] text-muted-foreground">{r.email}</div>
          </div>
        ),
      },
      {
        key: "owner",
        title: "Owner",
        colSpan: 2,
        render: (r) => (
          <div>
            <div className="text-[13px] font-semibold">{r.owner}</div>
            <div className="text-[12px] text-muted-foreground">{r.role}</div>
          </div>
        ),
      },
      {
        key: "status",
        title: "Status",
        align: "center",
        colSpan: 1,
        render: (r) => (
          <Badge className={cn("rounded-full", STATUS_META[r.status].className)}>
            {STATUS_META[r.status].label}
          </Badge>
        ),
      },
      {
        key: "action",
        title: <div className="text-center">Action</div>,
        colSpan: 2,
        align: "center",
        // sticky: "right",
        // widthPx: 200,
        render: (r) => (
          <div className="flex justify-center">
            <RowActions row={r} onStatus={onStatus} onDelete={onDelete} />
          </div>
        ),
      },
    ];
  }, [onDelete, onStatus]);

  return (
    <DataGridTable<Row>
      rows={rows}
      rowKey={(r) => r.id}
      columns={columns}
      pagination={pagination}
      empty={
        <div className="space-y-1">
          <div className="font-bold text-foreground">No results</div>
          <div className="text-muted-foreground">
            Try changing keywords or filters.
          </div>
        </div>
      }
    />
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
        <Button variant="outline" className="rounded-xl">
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

        <DropdownMenuItem onClick={() => onStatus(row.id, "Active")}>Set Active</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatus(row.id, "Paused")}>Set Paused</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatus(row.id, "Archived")}>Set Archived</DropdownMenuItem>

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
