'use client';

import { FileText, Check, ChevronDown, Eye } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ColumnDetection, DetectedInfo, ParsedCsv } from '@/lib/csv';
import type { DetectedColumn } from '@/lib/enrichments';

/**
 * Compact, glanceable summary of the uploaded file: name, row count, and the
 * detected columns with coverage. Replaces the dominant spreadsheet; the full
 * grid lives behind a "Preview rows" disclosure.
 */
export function FileSummary({
  csv,
  detection,
  rowCount,
  showPreview,
  onTogglePreview,
}: {
  csv: ParsedCsv;
  detection: ColumnDetection;
  rowCount: number;
  showPreview: boolean;
  onTogglePreview: () => void;
}) {
  const detected = (
    Object.entries(detection) as [DetectedColumn, DetectedInfo][]
  ).sort((a, b) => a[1].index - b[1].index);

  return (
    <div
      data-tour="modal-file"
      className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-6 py-3"
    >
      <div className="flex items-center gap-1.5 text-sm text-foreground">
        <FileText className="size-4 shrink-0 text-muted-foreground" />
        <span className="font-medium">{csv.fileName}</span>
        <span className="text-muted-foreground">· {rowCount} rows</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {detected.map(([type, info]) => (
          <span
            key={type}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 py-0.5 pr-2 pl-1.5 text-xs"
          >
            <Check className="size-3 text-success" />
            <span className="text-foreground">{info.header}</span>
            <span className="text-muted-foreground">
              {Math.round(info.coverage * 100)}%
            </span>
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onTogglePreview}
        className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        <Eye className="size-3.5" />
        {showPreview ? 'Hide rows' : 'Preview rows'}
        <ChevronDown
          className={cn(
            'size-3.5 text-primary-foreground/80 transition-transform',
            showPreview && 'rotate-180'
          )}
        />
      </button>
    </div>
  );
}
