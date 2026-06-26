'use client';

import * as React from 'react';

import { enrichments, enrichmentGroups } from '@/lib/enrichments';
import type { ColumnDetection } from '@/lib/csv';
import { isReady } from './use-enrichment-selection';
import { EnrichmentToolbar, type CategoryFilter } from './enrichment-toolbar';
import { EnrichmentGroup } from './enrichment-group';

export function EnrichmentPanel({
  detection,
  rowCount,
  selected,
  onToggle,
  onToggleGroup,
}: {
  detection: ColumnDetection;
  rowCount: number;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleGroup: (ids: string[], on: boolean) => void;
}) {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<CategoryFilter>('all');
  const [readyOnly, setReadyOnly] = React.useState(false);

  const groups = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return enrichmentGroups
      .map((group) => ({
        group,
        items: enrichments.filter(
          (e) =>
            e.group === group.id &&
            (category === 'all' || category === group.id) &&
            (!q ||
              `${e.name} ${e.input} ${e.output}`.toLowerCase().includes(q)) &&
            (!readyOnly || isReady(e, detection))
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, category, readyOnly, detection]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <EnrichmentToolbar
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        readyOnly={readyOnly}
        onReadyOnly={setReadyOnly}
      />
      <div className="min-h-0 flex-1 overflow-auto px-4 py-2">
        {groups.length === 0 ? (
          <p className="py-10 text-center text-xs text-muted-foreground">
            No enrichments match your filters.
          </p>
        ) : (
          <div className="space-y-3">
            {groups.map(({ group, items }) => (
              <EnrichmentGroup
                key={group.id}
                group={group}
                items={items}
                selected={selected}
                detection={detection}
                rowCount={rowCount}
                onToggle={onToggle}
                onToggleGroup={onToggleGroup}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
