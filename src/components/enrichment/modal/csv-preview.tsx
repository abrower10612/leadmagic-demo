'use client';

import {
  Undo2,
  Redo2,
  SquareFunction,
  EllipsisVertical,
  Sheet,
  ArrowDownToLine,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { columnLetter, type ParsedCsv } from '@/lib/csv';

/**
 * Read-only spreadsheet preview of the uploaded CSV — styled to match the
 * real app's editor (column letters with fx/menu affordances, header row,
 * violet footer controls). The first file row shows as row 1, styled as a
 * header when "Use first row as header" is on.
 */
export function CsvPreview({
  csv,
  useHeader,
}: {
  csv: ParsedCsv;
  useHeader: boolean;
}) {
  const gridRows = [csv.headers, ...csv.rows];
  const colCount = gridRows.reduce((m, r) => Math.max(m, r.length), 1);
  const cols = Array.from({ length: colCount });
  const dataCount = useHeader ? csv.rows.length : gridRows.length;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full border-separate border-spacing-0 text-[13px]">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="sticky left-0 z-20 w-11 border-r border-b border-border bg-secondary/70 px-2 py-2" />
              {cols.map((_, i) => (
                <th
                  key={i}
                  className="group min-w-[150px] border-r border-b border-border bg-secondary/70 px-3 py-2 text-left font-medium text-muted-foreground"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span>{columnLetter(i)}</span>
                    <span className="flex items-center gap-0.5 text-muted-foreground/40">
                      <SquareFunction className="size-3.5" />
                      <EllipsisVertical className="size-3.5" />
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gridRows.map((row, r) => {
              const isHeaderRow = useHeader && r === 0;
              return (
                <tr key={r}>
                  <td className="sticky left-0 z-10 border-r border-b border-border bg-muted/50 px-2 py-2 text-center text-[11px] text-muted-foreground tabular-nums">
                    {r + 1}
                  </td>
                  {cols.map((_, c) => (
                    <td
                      key={c}
                      className={cn(
                        'max-w-[260px] truncate border-r border-b border-border px-3 py-2',
                        isHeaderRow
                          ? 'bg-secondary/40 font-medium text-foreground'
                          : 'text-foreground/90'
                      )}
                      title={row[c] ?? ''}
                    >
                      {row[c] ?? ''}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Spreadsheet footer */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Sheet className="size-4 text-primary" />
          {dataCount} {dataCount === 1 ? 'row' : 'rows'}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled
              className="text-muted-foreground"
            >
              <Undo2 className="size-4" />
              <span className="sr-only">Undo</span>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              disabled
              className="text-muted-foreground"
            >
              <Redo2 className="size-4" />
              <span className="sr-only">Redo</span>
            </Button>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            <ArrowDownToLine className="size-4" />
            Save Edited File
          </button>
        </div>
      </div>
    </div>
  );
}
