/**
 * Vertical "Customer Support" tab pinned to the right edge — matches the real
 * app's feedback widget (34px thick × ~170px tall, 16px text, white on violet).
 *
 * Under writing-mode: vertical-rl, Tailwind v4's logical px/py map to swapped
 * physical sides: px (padding-inline) -> the vertical ends, py (padding-block)
 * -> the thickness. So px-5 = 20px end padding, py-[9px] = 9px thickness.
 * rotate-180 makes the text read bottom-to-top; rounded-r faces inward.
 */
export function SupportTab() {
  return (
    <button
      type="button"
      className="fixed top-1/2 right-0 z-30 rotate-180 -translate-y-1/2 rounded-r-lg bg-primary px-5 py-[9px] text-base leading-none font-medium whitespace-nowrap text-white shadow-md transition-colors hover:bg-primary/90 [writing-mode:vertical-rl]"
    >
      Customer Support
    </button>
  );
}
