import type { DriveStep } from 'driver.js';

/**
 * Guided walkthrough. Step 1 prompts the visitor to click Sample CSV (which
 * opens the builder); the rest highlights the parts we reimagined and why.
 * Targets use data-tour attributes so the tour is decoupled from styling.
 */
export const tourSteps: DriveStep[] = [
  {
    element: '[data-tour="sample-csv"]',
    popover: {
      title: 'Try it with a sample',
      description:
        "This concept reimagines LeadMagic's bulk enrichment builder. Click Sample CSV to load a sample file and open it.",
      side: 'top',
      align: 'center',
      showButtons: ['close'],
    },
  },
  {
    element: '[data-tour="modal-file"]',
    popover: {
      title: 'Your file at a glance',
      description:
        'I swapped the dominant spreadsheet for a compact summary: the columns I detected and how much of each is filled. Peek at the raw rows anytime with Preview rows.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="modal-recipes"]',
    popover: {
      title: 'Recipes: the new fast path',
      description:
        'Start from a recipe in one click (your recent picks, your saved sets, or starter examples), or hit Smart select for the recommended set for this file.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="modal-list"]',
    popover: {
      title: 'Build and save your own',
      description:
        'Browse by outcome (emails, phone, company, and more) and search by name or tag. Then Save selection to turn any custom set into a reusable recipe.',
      side: 'top',
      align: 'start',
    },
  },
  {
    element: '[data-tour="modal-footer"]',
    popover: {
      title: 'Live estimate, then run',
      description:
        'The credit estimate updates as you choose. Clear all to reset, or Start enrichment when ready. That is the concept, explore freely!',
      side: 'top',
      align: 'end',
    },
  },
];
