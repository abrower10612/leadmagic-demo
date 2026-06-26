/**
 * Vertical "Customer Support" tab pinned to the right edge of the viewport.
 * Text reads bottom-to-top (vertical-rl + 180° flip); rounded-r so the
 * rounded side faces inward after the flip and the flat side meets the edge.
 */
export function SupportTab() {
  return (
    <button
      type="button"
      className="fixed top-1/2 right-0 z-30 flex rotate-180 -translate-y-1/2 items-center justify-center rounded-r-lg bg-primary px-1.5 py-3.5 text-sm font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 [writing-mode:vertical-rl]"
    >
      Customer Support
    </button>
  );
}
