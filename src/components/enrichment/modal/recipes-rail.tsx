'use client';

import { Sparkles } from 'lucide-react';

import { recipes } from '@/lib/recipes';
import type { Recipe } from '@/lib/recipes';
import { RecipeCard } from './recipe-card';

/**
 * The hero of the picker: one-click recipes (Recent / Saved / Starter) plus a
 * "Smart select" that auto-picks everything runnable on this file.
 */
export function RecipesRail({
  selected,
  onApply,
  onSmartSelect,
}: {
  selected: Set<string>;
  onApply: (recipe: Recipe) => void;
  onSmartSelect: () => void;
}) {
  const isActive = (r: Recipe) =>
    r.enrichmentIds.length === selected.size &&
    r.enrichmentIds.every((id) => selected.has(id));

  return (
    <section className="px-6 pt-5 pb-5">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Start with a recipe
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Reuse a saved set or one of your recent selections — one click.
          </p>
        </div>
        <button
          type="button"
          onClick={onSmartSelect}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
        >
          <Sparkles className="size-3.5" />
          Smart select
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {recipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            active={isActive(r)}
            onApply={onApply}
          />
        ))}
      </div>
    </section>
  );
}
