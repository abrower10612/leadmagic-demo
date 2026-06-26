/**
 * Vertical "Customer Support" tab pinned to the right edge of the viewport.
 */
export function SupportTab() {
  return (
    <button
      type="button"
      className="fixed top-1/2 right-0 z-30 flex -translate-y-1/2 items-center rounded-l-lg bg-primary px-1.5 py-4 text-xs font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 [writing-mode:vertical-rl]"
    >
      Customer Support
    </button>
  );
}
