'use client';

import { Undo2, Redo2, Download, Table2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { columnLetter, type ParsedCsv } from '@/lib/csv';

/**
 * Read-only spreadsheet preview of the uploaded CSV. The first file row shows
 * as row 1 — styled as a header when "Use first row as header" is on.
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
        <table className="w-full border-separate border-spacing-0 text-xs">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="sticky left-0 z-20 w-10 border-r border-b border-border bg-muted/60 px-2 py-1.5" />
              {cols.map((_, i) => (
                <th
                  key={i}
                  className="min-w-[120px] border-r border-b border-border bg-muted/60 px-2.5 py-1.5 text-left font-medium text-muted-foreground"
                >
                  {columnLetter(i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gridRows.map((row, r) => {
              const isHeaderRow = useHeader && r === 0;
              return (
                <tr key={r} className="group">
                  <td className="sticky left-0 z-10 border-r border-b border-border bg-muted/40 px-2 py-1.5 text-center text-[11px] text-muted-foreground tabular-nums">
                    {r + 1}
                  </td>
                  {cols.map((_, c) => (
                    <td
                      key={c}
                      className={cn(
                        'max-w-[220px] truncate border-r border-b border-border px-2.5 py-1.5',
                        isHeaderRow
                          ? 'bg-muted/30 font-medium text-foreground'
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
      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Table2 className="size-3.5" />
          {dataCount} {dataCount === 1 ? 'row' : 'rows'}
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon-sm" disabled className="text-muted-foreground">
            <Undo2 className="size-4" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button variant="ghost" size="icon-sm" disabled className="text-muted-foreground">
            <Redo2 className="size-4" />
            <span className="sr-only">Redo</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="size-3.5" />
            Save Edited File
          </Button>
        </div>
      </div>
    </div>
  );
}
