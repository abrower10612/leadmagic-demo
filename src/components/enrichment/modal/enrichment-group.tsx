'use client';

import type { Enrichment, GroupMeta } from '@/lib/enrichments';
import type { ColumnDetection } from '@/lib/csv';
import { EnrichmentRow } from './enrichment-row';

export function EnrichmentGroup({
  group,
  items,
  selected,
  detection,
  rowCount,
  onToggle,
  onToggleGroup,
}: {
  group: GroupMeta;
  items: Enrichment[];
  selected: Set<string>;
  detection: ColumnDetection;
  rowCount: number;
  onToggle: (id: string) => void;
  onToggleGroup: (ids: string[], on: boolean) => void;
}) {
  const ids = items.map((e) => e.id);
  const selectedCount = ids.filter((id) => selected.has(id)).length;
  const allSelected = selectedCount === ids.length;

  return (
    <section>
      <header className="sticky top-0 z-10 -mx-1 flex items-center justify-between gap-2 bg-background px-1 py-1.5">
        <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <group.icon className="size-3.5" />
          {group.label}
          <span className="text-muted-foreground/60">({items.length})</span>
        </div>
        <button
          type="button"
          onClick={() => onToggleGroup(ids, !allSelected)}
          className="text-xs font-medium text-primary transition-colors hover:underline"
        >
          {allSelected ? 'Clear' : 'Select all'}
        </button>
      </header>
      <div className="grid gap-2.5 pt-1.5 pb-1 lg:grid-cols-2 2xl:grid-cols-3">
        {items.map((e) => (
          <EnrichmentRow
            key={e.id}
            enrichment={e}
            selected={selected.has(e.id)}
            detection={detection}
            rowCount={rowCount}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}
