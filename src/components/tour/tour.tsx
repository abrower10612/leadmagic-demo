'use client';

import * as React from 'react';
import { driver, type Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Compass } from 'lucide-react';

import { tourSteps } from './tour-steps';

const SEEN_KEY = 'lm-tour-seen';

/**
 * Floating "Take a tour" control + the driver.js controller. Auto-starts once
 * per visitor (localStorage), and can be replayed via the button.
 */
export function Tour() {
  const driverRef = React.useRef<Driver | null>(null);

  const start = React.useCallback(() => {
    driverRef.current?.destroy();
    const d = driver({
      showProgress: true,
      allowClose: true,
      overlayColor: '#09090b',
      overlayOpacity: 0.65,
      stagePadding: 6,
      stageRadius: 10,
      popoverClass: 'lm-tour',
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      doneBtnText: 'Done',
      progressText: '{{current}} of {{total}}',
      steps: tourSteps,
      onDestroyed: () => {
        try {
          localStorage.setItem(SEEN_KEY, '1');
        } catch {
          /* ignore */
        }
      },
    });
    driverRef.current = d;
    d.drive();
  }, []);

  // Auto-start once, after the page has settled.
  React.useEffect(() => {
    let seen = true;
    try {
      seen = localStorage.getItem(SEEN_KEY) === '1';
    } catch {
      /* ignore */
    }
    if (seen) return;
    const t = setTimeout(start, 800);
    return () => clearTimeout(t);
  }, [start]);

  React.useEffect(() => () => driverRef.current?.destroy(), []);

  return (
    <button
      type="button"
      onClick={start}
      className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-lg transition-colors hover:border-primary/40 hover:bg-muted"
    >
      <Compass className="size-4 text-primary" />
      Take a tour
    </button>
  );
}
