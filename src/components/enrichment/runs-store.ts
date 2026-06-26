'use client';

import * as React from 'react';
import { toast } from 'sonner';

import type { EnrichmentRun } from '@/lib/enrichment-data';

/**
 * Holds runs started during this session (prepended to the mock history).
 * startRun simulates a Processing -> Completed lifecycle with toasts.
 */
let dynamicRuns: EnrichmentRun[] = [];
let counter = 0;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function update(id: string, patch: Partial<EnrichmentRun>) {
  dynamicRuns = dynamicRuns.map((r) => (r.id === id ? { ...r, ...patch } : r));
  emit();
}

function todayLabel() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function startRun(input: {
  fileName: string;
  rows: number;
  credits: number;
}) {
  counter += 1;
  const id = `live-${counter}`;
  const run: EnrichmentRun = {
    id,
    fileName: input.fileName,
    status: 'processing',
    progress: 0,
    rows: input.rows,
    succeeded: 0,
    failed: null,
    skipped: null,
    credits: Math.max(1, Math.round(input.credits)),
    duration: '0s',
    created: todayLabel(),
    completed: null,
  };
  dynamicRuns = [run, ...dynamicRuns];
  emit();
  toast.info('Enrichment started', {
    description: `${input.fileName} · ${input.rows} rows`,
  });

  const startedAt = Date.now();
  const tick = () => {
    const r = dynamicRuns.find((x) => x.id === id);
    if (!r) return;
    const next = Math.min(100, r.progress + 12 + Math.round(Math.random() * 22));
    const secs = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    if (next >= 100) {
      update(id, {
        status: 'completed',
        progress: 100,
        succeeded: input.rows,
        completed: todayLabel(),
        duration: `${secs}s`,
      });
      toast.success('Enrichment completed', {
        description: `${input.fileName} · ${input.rows} rows enriched`,
      });
    } else {
      update(id, {
        progress: next,
        succeeded: Math.round((input.rows * next) / 100),
        duration: `${secs}s`,
      });
      setTimeout(tick, 450 + Math.random() * 350);
    }
  };
  setTimeout(tick, 550);
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return dynamicRuns;
}

export function useDynamicRuns(): EnrichmentRun[] {
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
