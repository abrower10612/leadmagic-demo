'use client';

import { Sparkles } from 'lucide-react';

import { recipes as starterRecipes } from '@/lib/recipes';
import type { Recipe } from '@/lib/recipes';
import { RecipeCard } from './recipe-card';
import { useUserRecipes, removeUserRecipe } from './recipes-store';

/**
 * The hero of the picker: one-click recipes (your saved + recent + starters)
 * plus a "Smart select" recommended set. Saving happens in the list section.
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
  const userRecipes = useUserRecipes();
  const all = [...userRecipes, ...starterRecipes];

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
            Reuse a saved set or recent selection in one click.
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
        {all.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            active={isActive(r)}
            onApply={onApply}
            onDelete={
              r.id.startsWith('user-')
                ? () => removeUserRecipe(r.id)
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
