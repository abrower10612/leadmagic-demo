'use client';

import * as React from 'react';

import {
  enrichments,
  enrichmentById,
  type DetectedColumn,
  type Enrichment,
} from '@/lib/enrichments';
import type { ColumnDetection } from '@/lib/csv';

const CREDIT_USD = 0.0125;

/** Ready when any requirement alternative is fully covered by detected columns. */
export function isReady(e: Enrichment, detected: ColumnDetection): boolean {
  return e.requires.some((group) =>
    group.every((col) => Boolean(detected[col]))
  );
}

/** Columns missing for the closest-to-ready alternative (for the "needs" hint). */
export function missingColumns(
  e: Enrichment,
  detected: ColumnDetection
): DetectedColumn[] {
  let best: DetectedColumn[] | null = null;
  for (const group of e.requires) {
    const missing = group.filter((col) => !detected[col]);
    if (best === null || missing.length < best.length) best = missing;
  }
  return best ?? [];
}

export interface Readiness {
  ready: boolean;
  missing: DetectedColumn[];
  /** rows that have every needed input populated */
  coveredRows: number;
  pct: number;
}

/** Whether an enrichment can run on this file, plus input coverage. */
export function inputReadiness(
  e: Enrichment,
  detection: ColumnDetection,
  rowCount: number
): Readiness {
  if (!isReady(e, detection)) {
    return { ready: false, missing: missingColumns(e, detection), coveredRows: 0, pct: 0 };
  }
  const alt = e.requires.find((g) => g.every((c) => detection[c]))!;
  const coveredRows = Math.min(...alt.map((c) => detection[c]!.filled));
  return { ready: true, missing: [], coveredRows, pct: rowCount ? coveredRows / rowCount : 0 };
}

export interface Estimate {
  count: number;
  credits: number;
  usd: number;
}

export function useEnrichmentSelection(
  detection: ColumnDetection,
  rowCount: number
) {
  const readyMap = React.useMemo(() => {
    const m: Record<string, boolean> = {};
    for (const e of enrichments) m[e.id] = isReady(e, detection);
    return m;
  }, [detection]);

  const smartDefault = React.useCallback(
    () =>
      new Set(
        enrichments.filter((e) => e.popular && readyMap[e.id]).map((e) => e.id)
      ),
    [readyMap]
  );

  const [selected, setSelected] = React.useState<Set<string>>(smartDefault);

  const toggle = React.useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleGroup = React.useCallback((ids: string[], on: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of ids) {
        if (on) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }, []);

  /** Replace the current selection with a recipe's enrichments. */
  const applyRecipe = React.useCallback((ids: string[]) => {
    setSelected(new Set(ids));
  }, []);

  /** Select everything that's runnable with the detected columns. */
  const smartSelect = React.useCallback(() => {
    setSelected(
      new Set(enrichments.filter((e) => readyMap[e.id]).map((e) => e.id))
    );
  }, [readyMap]);

  const clear = React.useCallback(() => setSelected(new Set()), []);

  const estimate: Estimate = React.useMemo(() => {
    let credits = 0;
    for (const id of selected) {
      const e = enrichmentById[id];
      if (e) credits += e.cost * rowCount;
    }
    return { count: selected.size, credits, usd: credits * CREDIT_USD };
  }, [selected, rowCount]);

  return {
    selected,
    readyMap,
    toggle,
    toggleGroup,
    applyRecipe,
    smartSelect,
    clear,
    estimate,
  };
}
