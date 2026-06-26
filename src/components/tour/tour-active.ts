'use client';

import * as React from 'react';

/**
 * Whether the guided tour is currently running. The enrichment dialog reads
 * this to switch to non-modal mode during the tour, so driver.js can drive
 * its popover over the modal without the focus-trap / pointer-events guard.
 */
let active = false;
const listeners = new Set<() => void>();

export function setTourActive(value: boolean) {
  active = value;
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return active;
}

export function useTourActive(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
