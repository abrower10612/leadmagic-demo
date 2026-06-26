'use client';

import * as React from 'react';
import { RefreshCw, Search, ListFilter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { enrichmentRuns } from '@/lib/enrichment-data';
import { EnrichmentTable } from './enrichment-table';

/**
 * "Enrichment history" section: header (+ Refresh), toolbar (search + Filters),
 * and the runs table. Search filters rows by file name (live).
 */
export function EnrichmentHistory() {
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enrichmentRuns;
    return enrichmentRuns.filter((run) =>
      run.fileName.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="rounded-xl border border-border/50 bg-card/80">
      {/* Section header */}
      <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Enrichment history
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {enrichmentRuns.length} recent runs
          </p>
        </div>
        <Button variant="outline" className="h-9 shrink-0 gap-1.5">
          <RefreshCw className="size-4" />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 pb-4 sm:px-5">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by file name…"
            className="h-9 pl-8"
          />
        </div>
        <Button variant="outline" className="h-9 shrink-0 gap-1.5">
          <ListFilter className="size-4" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>

      {/* Table (horizontally scrollable on small screens) */}
      <div className="border-t border-border">
        <EnrichmentTable runs={filtered} />
      </div>
    </section>
  );
}
