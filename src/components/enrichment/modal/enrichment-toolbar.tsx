'use client';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { enrichmentGroups, type EnrichmentGroup } from '@/lib/enrichments';

export type CategoryFilter = 'all' | EnrichmentGroup;

export function EnrichmentToolbar({
  query,
  onQuery,
  category,
  onCategory,
  readyOnly,
  onReadyOnly,
}: {
  query: string;
  onQuery: (v: string) => void;
  category: CategoryFilter;
  onCategory: (c: CategoryFilter) => void;
  readyOnly: boolean;
  onReadyOnly: (v: boolean) => void;
}) {
  const chips: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...enrichmentGroups.map((g) => ({ id: g.id, label: g.label })),
  ];

  return (
    <div className="space-y-2.5 border-b border-border px-4 py-3">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search enrichments…"
          className="h-8 pl-8 text-xs"
        />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onCategory(c.id)}
            className={cn(
              'rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors',
              category === c.id
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-muted/50'
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <label className="flex cursor-pointer items-center justify-between text-xs text-muted-foreground">
        <span>Ready only</span>
        <Switch checked={readyOnly} onCheckedChange={onReadyOnly} />
      </label>
    </div>
  );
}
