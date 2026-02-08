"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Align = "left" | "center" | "right";
type Sticky = "left" | "right";

export type ColumnDef<T> = {
  key: string;
  title: React.ReactNode;

  /** Grid layout */
  colSpan: number;

  /** Optional width; REQUIRED if sticky */
  widthPx?: number;

  align?: Align;
  sticky?: Sticky;

  headerClassName?: string;
  cellClassName?: string;

  render: (row: T) => React.ReactNode;
};

export type DataGridTableProps<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
  rowKey: (row: T) => string;

  /** How many grid columns total */
  gridCols?: number; // default 12

  className?: string;
  headerClassName?: string;
  bodyClassName?: string;

  /** Row interactions */
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T) => string;

  /** States */
  loading?: boolean;
  error?: string | null;
  empty?: React.ReactNode;

  /** Pagination (controlled UI only) */
  pagination?: {
    page: number;
    pageSize: number;
    total?: number;
    onPageChange: (page: number) => void;
  };

  /** Style hooks */
  headerStyleProps?: React.HTMLAttributes<HTMLDivElement>;
  bodyStyleProps?: React.HTMLAttributes<HTMLDivElement>;
};

type StickyCalc = {
  leftOffset: Record<string, number>;
  rightOffset: Record<string, number>;
  leftKeys: string[];
  rightKeys: string[];
};

function calcSticky<T>(columns: ColumnDef<T>[]): StickyCalc {
  const leftCols = columns.filter((c) => c.sticky === "left");
  const rightCols = columns.filter((c) => c.sticky === "right");

  // sort by appearance order (already in array order) — do not reorder
  const leftOffset: Record<string, number> = {};
  let accLeft = 0;
  for (const c of leftCols) {
    if (typeof c.widthPx !== "number") continue;
    leftOffset[c.key] = accLeft;
    accLeft += c.widthPx;
  }

  const rightOffset: Record<string, number> = {};
  let accRight = 0;
  // right sticky offsets accumulate from rightmost sticky to left
  for (let i = rightCols.length - 1; i >= 0; i--) {
    const c = rightCols[i];
    if (typeof c.widthPx !== "number") continue;
    rightOffset[c.key] = accRight;
    accRight += c.widthPx;
  }

  return {
    leftOffset,
    rightOffset,
    leftKeys: leftCols.map((c) => c.key),
    rightKeys: rightCols.map((c) => c.key),
  };
}

function alignClass(align?: Align) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

function stickyStyle<T>(
  col: ColumnDef<T>,
  sticky: StickyCalc,
  layer: "header" | "cell",
): React.CSSProperties {
  if (!col.sticky) return {};
  // require widthPx to safely compute offsets
  if (typeof col.widthPx !== "number") return {};

  const base: React.CSSProperties = {
    position: "sticky",
    zIndex: layer === "header" ? 20 : 10,
    background: "var(--background)", // ensure text doesn't overlap when sticky
  };

  if (col.sticky === "left") {
    const left = sticky.leftOffset[col.key];
    if (typeof left === "number") base.left = left;
  } else {
    const right = sticky.rightOffset[col.key];
    if (typeof right === "number") base.right = right;
  }

  // lock width for sticky columns
  base.width = col.widthPx;
  base.minWidth = col.widthPx;
  base.maxWidth = col.widthPx;

  return base;
}

function colSpanClass(n: number) {
  // Tailwind needs static class names; we map a safe set (1..12)
  const map: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };
  return map[n] ?? "col-span-1";
}

export function DataGridTable<T>({
  rows,
  columns,
  rowKey,
  gridCols = 12,
  className,
  headerClassName,
  bodyClassName,
  onRowClick,
  rowClassName,
  loading,
  error,
  empty,
  pagination,
  headerStyleProps,
  bodyStyleProps,
}: DataGridTableProps<T>) {
  const sticky = React.useMemo(() => calcSticky(columns), [columns]);

  const total = pagination ? (pagination.total ?? rows.length) : rows.length;

  const totalPages = pagination
    ? Math.max(1, Math.ceil(total / pagination.pageSize))
    : 1;

  React.useEffect(() => {
    if (!pagination) return;
    if (pagination.page > totalPages) {
      pagination.onPageChange(totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  return (
    <div className={cn("overflow-hidden border border-border", className)}>
      {/* Header */}
      <div
        {...headerStyleProps}
        className={cn(
          "border-b border-border bg-muted/40",
          headerStyleProps?.className,
          headerClassName,
        )}
      >
        <div className="grid grid-cols-12 gap-0 px-5 py-3">
          {columns.map((c) => (
            <div
              key={c.key}
              className={cn(
                colSpanClass(c.colSpan),
                "text-[12px] font-bold text-muted-foreground",
                alignClass(c.align),
                c.headerClassName,
              )}
              style={stickyStyle(c, sticky, "header")}
              title={typeof c.title === "string" ? c.title : undefined}
            >
              {c.title}
            </div>
          ))}
        </div>
      </div>

      {/* Body states */}
      {loading ? (
        <div className="p-5 text-[13px] text-muted-foreground">Loading...</div>
      ) : error ? (
        <div className="p-5 text-[13px] text-muted-foreground">{error}</div>
      ) : rows.length === 0 ? (
        <div className="p-5 text-[13px] text-muted-foreground">
          {empty ?? "No results."}
        </div>
      ) : (
        <div
          {...bodyStyleProps}
          className={cn(bodyStyleProps?.className, bodyClassName)}
        >
          <div className="divide-y divide-border">
            {rows.map((row) => {
              const key = rowKey(row);
              return (
                <div
                  key={key}
                  className={cn(
                    "grid grid-cols-12 items-center gap-0 px-5 py-4",
                    onRowClick && "cursor-pointer hover:bg-muted/30",
                    rowClassName?.(row),
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((c) => (
                    <div
                      key={c.key}
                      className={cn(
                        colSpanClass(c.colSpan),
                        "text-[13px] text-foreground",
                        alignClass(c.align),
                        c.cellClassName,
                      )}
                      style={stickyStyle(c, sticky, "cell")}
                    >
                      {c.render(row)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-5 py-3">
          <div className="text-[12px] text-muted-foreground">
            Page{" "}
            <span className="font-bold text-foreground">{pagination.page}</span>{" "}
            of <span className="font-bold text-foreground">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border border-border px-3 py-1.5 text-[12px] font-semibold text-muted-foreground hover:text-foreground disabled:opacity-50"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              Prev
            </button>
            <button
              className="rounded-xl border border-border px-3 py-1.5 text-[12px] font-semibold text-muted-foreground hover:text-foreground disabled:opacity-50"
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
