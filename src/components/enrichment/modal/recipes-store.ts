'use client';

import * as React from 'react';
import type { Recipe } from '@/lib/recipes';

/**
 * In-memory store for user-saved recipes. Lives outside the modal (which
 * remounts per file) so saved recipes persist across opens in the session.
 */
let userRecipes: Recipe[] = [];
let counter = 0;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function addUserRecipe(name: string, enrichmentIds: string[]): Recipe {
  counter += 1;
  const recipe: Recipe = {
    id: `user-${counter}`,
    name: name.trim() || `My recipe ${counter}`,
    source: 'saved',
    enrichmentIds: [...enrichmentIds],
    lastUsed: 'Just now',
  };
  userRecipes = [recipe, ...userRecipes];
  emit();
  return recipe;
}

export function removeUserRecipe(id: string) {
  userRecipes = userRecipes.filter((r) => r.id !== id);
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return userRecipes;
}

export function useUserRecipes(): Recipe[] {
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
