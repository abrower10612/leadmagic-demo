/**
 * A Recipe is a named set of enrichments. One primitive, three sources:
 * - starter: curated goal bundles shipped by the app
 * - saved:   presets the user named/pinned
 * - recent:  auto-captured combos from past runs
 */
export type RecipeSource = 'recent' | 'saved' | 'starter';

export interface Recipe {
  id: string;
  name: string;
  source: RecipeSource;
  enrichmentIds: string[];
  /** Display-only, for recent/saved. */
  lastUsed?: string;
}

export const recipes: Recipe[] = [
  // Recent - auto-captured
  {
    id: 'recent-validate-work',
    name: 'Validate + Work emails',
    source: 'recent',
    enrichmentIds: ['validate-emails', 'find-work-emails'],
    lastUsed: '2 days ago',
  },
  {
    id: 'recent-company',
    name: 'Company enrich',
    source: 'recent',
    enrichmentIds: ['add-company-details', 'tech-stacks'],
    lastUsed: 'last week',
  },
  // Saved - user named/pinned
  {
    id: 'saved-outbound',
    name: 'Outbound stack',
    source: 'saved',
    enrichmentIds: ['find-work-emails', 'validate-emails', 'find-mobile'],
    lastUsed: 'Jun 20',
  },
  // Starter - curated bundles
  {
    id: 'starter-verify',
    name: 'Verify list',
    source: 'starter',
    enrichmentIds: ['validate-emails'],
  },
  {
    id: 'starter-emails',
    name: 'Find emails',
    source: 'starter',
    enrichmentIds: ['find-work-emails', 'validate-emails'],
  },
  {
    id: 'starter-contact',
    name: 'Full contact',
    source: 'starter',
    enrichmentIds: ['find-work-emails', 'find-personal-emails', 'find-mobile'],
  },
  {
    id: 'starter-account',
    name: 'Account intel',
    source: 'starter',
    enrichmentIds: ['add-company-details', 'add-funding', 'tech-stacks'],
  },
];

export const recipesBySource: Record<RecipeSource, Recipe[]> = {
  recent: recipes.filter((r) => r.source === 'recent'),
  saved: recipes.filter((r) => r.source === 'saved'),
  starter: recipes.filter((r) => r.source === 'starter'),
};
