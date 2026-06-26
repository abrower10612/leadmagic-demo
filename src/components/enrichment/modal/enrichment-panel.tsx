'use client';

import * as React from 'react';

import { enrichments, enrichmentGroups } from '@/lib/enrichments';
import type { ColumnDetection } from '@/lib/csv';
import { isReady } from './use-enrichment-selection';
import { EnrichmentToolbar } from './enrichment-toolbar';
import { EnrichmentGroup } from './enrichment-group';

/** The "or choose individually" section: search + Ready-only + grouped grid. */
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
  const [readyOnly, setReadyOnly] = React.useState(false);

  const groups = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return enrichmentGroups
      .map((group) => ({
        group,
        items: enrichments.filter(
          (e) =>
            e.group === group.id &&
            (!q ||
              `${e.name} ${e.input} ${e.output}`.toLowerCase().includes(q)) &&
            (!readyOnly || isReady(e, detection))
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, readyOnly, detection]);

  return (
    <section className="px-6 pt-5 pb-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Or choose individually
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Pick exactly what to run on this file.
          </p>
        </div>
        <EnrichmentToolbar
          query={query}
          onQuery={setQuery}
          readyOnly={readyOnly}
          onReadyOnly={setReadyOnly}
        />
      </div>

      {groups.length === 0 ? (
        <p className="py-10 text-center text-xs text-muted-foreground">
          No enrichments match your filters.
        </p>
      ) : (
        <div className="space-y-6">
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
    </section>
  );
}
