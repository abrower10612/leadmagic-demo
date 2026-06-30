'use client';

import { Link2, Check, AlertTriangle } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { COLUMN_LABEL, type Enrichment } from '@/lib/enrichments';
import type { ColumnDetection } from '@/lib/csv';
import { inputReadiness } from './use-enrichment-selection';

export function EnrichmentRow({
  enrichment: e,
  selected,
  detection,
  rowCount,
  onToggle,
}: {
  enrichment: Enrichment;
  selected: boolean;
  detection: ColumnDetection;
  rowCount: number;
  onToggle: (id: string) => void;
}) {
  const r = inputReadiness(e, detection, rowCount);

  return (
    <label
      className={cn(
        'flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors',
        selected
          ? 'border-primary/60 bg-primary/5'
          : 'border-border hover:border-border/70 hover:bg-muted/30'
      )}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={() => onToggle(e.id)}
        className="mt-0.5"
      />
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-md',
          selected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        )}
      >
        <e.icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-medium text-foreground">{e.name}</span>
          {e.popular && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-primary uppercase">
              Popular
            </span>
          )}
          {r.ready ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success/12 px-1.5 py-0.5 text-[10px] font-medium text-success">
              <Check className="size-2.5" />
              Ready
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-warning/25 bg-warning/12 px-1.5 py-0.5 text-[10px] font-medium text-warning">
              <AlertTriangle className="size-2.5" />
              Needs {r.missing.map((c) => COLUMN_LABEL[c]).join(' + ')}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {e.input} → {e.output}
        </p>
        <p className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link2 className="size-3 shrink-0" />
          {e.cost} {e.cost === 1 ? 'credit' : 'credits'} per {e.unit}
          {r.ready && rowCount > 0 && (
            <span className="text-muted-foreground/70">
              · {r.coveredRows}/{rowCount} rows ready
            </span>
          )}
        </p>
      </div>
    </label>
  );
}
