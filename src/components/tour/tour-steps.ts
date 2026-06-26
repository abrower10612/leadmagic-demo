import type { DriveStep } from 'driver.js';

/**
 * Guided walkthrough steps. Targets use data-tour attributes so the tour is
 * decoupled from styling. Modal steps are added in a later step.
 */
export const tourSteps: DriveStep[] = [
  {
    popover: {
      title: 'Welcome to the LeadMagic concept',
      description:
        'A quick tour of what you can click and how the enrichment flow works. Hit Next, or skip anytime.',
    },
  },
  {
    element: '[data-tour="sidebar"]',
    popover: {
      title: 'Navigation',
      description:
        'Move between sections here. List Enrichment is where the action is. The header toggle collapses this rail.',
      side: 'right',
      align: 'start',
    },
  },
  {
    element: '[data-tour="command"]',
    popover: {
      title: 'Command palette',
      description:
        'Click it (or press Cmd K) to search settings and actions from anywhere.',
      side: 'bottom',
      align: 'end',
    },
  },
  {
    element: '[data-tour="dropzone"]',
    popover: {
      title: 'Upload a CSV',
      description:
        'The heart of the demo: drag a CSV here, or click Sample CSV to try it instantly. That opens the enrichment builder.',
      side: 'top',
      align: 'center',
    },
  },
];
