'use client';

import { History, Star, Sparkles, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { enrichmentById } from '@/lib/enrichments';
import type { Recipe, RecipeSource } from '@/lib/recipes';

const SOURCE: Record<RecipeSource, { label: string; icon: LucideIcon }> = {
  recent: { label: 'Recent', icon: History },
  saved: { label: 'Saved', icon: Star },
  starter: { label: 'Starter', icon: Sparkles },
};

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, '');
}

export function RecipeCard({
  recipe,
  active,
  onApply,
}: {
  recipe: Recipe;
  active: boolean;
  onApply: (recipe: Recipe) => void;
}) {
  const items = recipe.enrichmentIds
    .map((id) => enrichmentById[id])
    .filter(Boolean);
  const costPerRow = items.reduce((s, e) => s + e.cost, 0);
  const src = SOURCE[recipe.source];

  return (
    <button
      type="button"
      onClick={() => onApply(recipe)}
      className={cn(
        'flex flex-col gap-2.5 rounded-xl border p-3 text-left transition-colors',
        active
          ? 'border-primary/60 bg-primary/5'
          : 'border-border bg-card/40 hover:border-border/70 hover:bg-muted/30'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
          <src.icon className="size-3" />
          {src.label}
        </span>
        {recipe.lastUsed && (
          <span className="text-[11px] text-muted-foreground/70">
            {recipe.lastUsed}
          </span>
        )}
      </div>

      <div className="text-sm font-medium text-foreground">{recipe.name}</div>

      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {items.slice(0, 5).map((e, i) => (
            <span
              key={e.id}
              style={{ zIndex: 5 - i }}
              className="flex size-6 items-center justify-center rounded-md border border-background bg-muted text-muted-foreground"
            >
              <e.icon className="size-3" />
            </span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {items.length} · ~{fmt(costPerRow)} cr/row
        </span>
      </div>
    </button>
  );
}
