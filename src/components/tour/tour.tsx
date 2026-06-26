'use client';

import * as React from 'react';
import { driver, type Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Compass } from 'lucide-react';

import { tourSteps } from './tour-steps';
import { setTourActive } from './tour-active';

const SEEN_KEY = 'lm-tour-seen';

function clickEl(sel: string) {
  (document.querySelector(sel) as HTMLElement | null)?.click();
}

/** Poll for an element, then run cb (gives async UI like the modal time to mount). */
function waitForEl(sel: string, cb: () => void, tries = 60) {
  if (document.querySelector(sel) || tries <= 0) return cb();
  setTimeout(() => waitForEl(sel, cb, tries - 1), 50);
}

/**
 * Floating "Take a tour" control + the driver.js controller. Auto-starts once
 * per visitor; step 1 hands off to the modal when Sample CSV is clicked.
 */
export function Tour() {
  const driverRef = React.useRef<Driver | null>(null);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  const start = React.useCallback(() => {
    driverRef.current?.destroy();
    setTourActive(true);

    const d = driver({
      showProgress: true,
      allowClose: true,
      overlayColor: '#09090b',
      overlayOpacity: 0.7,
      stagePadding: 6,
      stageRadius: 10,
      popoverClass: 'lm-tour',
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      doneBtnText: 'Done',
      progressText: '{{current}} of {{total}}',
      steps: tourSteps,
      // Step 1 has no Next button: clicking the real Sample CSV button opens
      // the modal and advances the tour.
      onHighlighted: (el) => {
        cleanupRef.current?.();
        cleanupRef.current = null;
        const dr = driverRef.current;
        if (dr?.getActiveIndex() === 0 && el) {
          const onSampleClick = () =>
            waitForEl('[data-tour="modal-file"]', () => {
              if (driverRef.current?.getActiveIndex() === 0) {
                driverRef.current.moveNext();
              }
            });
          el.addEventListener('click', onSampleClick);
          cleanupRef.current = () =>
            el.removeEventListener('click', onSampleClick);
        }
      },
      onDeselected: () => {
        cleanupRef.current?.();
        cleanupRef.current = null;
      },
      // Going back from the first modal step closes the modal first.
      onPrevClick: () => {
        const dr = driverRef.current;
        if (!dr) return;
        if (dr.getActiveIndex() === 1) {
          clickEl('[data-tour="modal-cancel"]');
          setTimeout(() => dr.movePrevious(), 160);
        } else {
          dr.movePrevious();
        }
      },
      onDestroyed: () => {
        cleanupRef.current?.();
        cleanupRef.current = null;
        setTourActive(false);
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

  // Auto-start once per visitor, after the page settles.
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
