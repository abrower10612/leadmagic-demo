'use client';

import * as React from 'react';
import { History, Star, Sparkles, X, type LucideIcon } from 'lucide-react';

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
  onDelete,
}: {
  recipe: Recipe;
  active: boolean;
  onApply: (recipe: Recipe) => void;
  onDelete?: () => void;
}) {
  const [confirming, setConfirming] = React.useState(false);
  const items = recipe.enrichmentIds
    .map((id) => enrichmentById[id])
    .filter(Boolean);
  const costPerRow = items.reduce((s, e) => s + e.cost, 0);
  const src = SOURCE[recipe.source];

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => onApply(recipe)}
        className={cn(
          'flex w-full flex-col gap-2.5 rounded-xl border p-3 text-left transition-colors',
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
            <span
              className={cn(
                'text-[11px] text-muted-foreground/70',
                onDelete && 'group-hover:opacity-0'
              )}
            >
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

      {onDelete && !confirming && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setConfirming(true);
          }}
          aria-label="Delete recipe"
          className="absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
        >
          <X className="size-3.5" />
        </button>
      )}

      {onDelete && confirming && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background/95 p-3 text-center backdrop-blur-sm">
          <p className="text-xs font-medium text-foreground">
            Delete this recipe?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onDelete();
                setConfirming(false);
              }}
              className="rounded-md bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
