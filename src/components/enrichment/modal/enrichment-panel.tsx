'use client';

import * as React from 'react';
import { Plus, Check, Search } from 'lucide-react';

import { enrichments, enrichmentGroups, enrichmentTags } from '@/lib/enrichments';
import type { ColumnDetection } from '@/lib/csv';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { isReady } from './use-enrichment-selection';
import { EnrichmentGroup } from './enrichment-group';
import { addUserRecipe } from './recipes-store';

/** The "or choose individually" section: search, save-as-recipe, grouped grid. */
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
  const [saving, setSaving] = React.useState(false);
  const [name, setName] = React.useState('');

  const groups = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return enrichmentGroups
      .map((group) => ({
        group,
        items: enrichments.filter(
          (e) =>
            e.group === group.id &&
            (!q ||
              `${e.name} ${e.input} ${e.output} ${group.label} ${(
                enrichmentTags[e.id] ?? []
              ).join(' ')}`
                .toLowerCase()
                .includes(q)) &&
            (!readyOnly || isReady(e, detection))
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, readyOnly, detection]);

  function save() {
    if (!name.trim() || selected.size === 0) return;
    addUserRecipe(name, [...selected]);
    setName('');
    setSaving(false);
  }

  return (
    <section data-tour="modal-list" className="px-4 pt-5 pb-6 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Or choose individually
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Pick exactly what to run, then save it as a recipe to reuse.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex shrink-0 items-center gap-2">
            {selected.size > 0 && !saving && (
              <button
                type="button"
                onClick={() => setSaving(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <Plus className="size-3.5" />
                Save selection
              </button>
            )}
            <div className="relative w-56">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search enrichments…"
                className="h-8 pl-8 text-xs"
              />
            </div>
          </div>
          <label className="flex shrink-0 cursor-pointer items-center gap-2 text-xs whitespace-nowrap text-muted-foreground">
            Ready only
            <Switch checked={readyOnly} onCheckedChange={setReadyOnly} />
          </label>
        </div>
      </div>

      {saving && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-2">
          <Input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') {
                setSaving(false);
                setName('');
              }
            }}
            placeholder={`Name this recipe (${selected.size} enrichments)`}
            className="h-8 text-xs"
          />
          <Button size="sm" className="gap-1" onClick={save} disabled={!name.trim()}>
            <Check className="size-3.5" />
            Save
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setSaving(false);
              setName('');
            }}
          >
            Cancel
          </Button>
        </div>
      )}

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
