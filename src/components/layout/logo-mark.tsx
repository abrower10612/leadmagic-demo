import { cn } from '@/lib/utils';

/**
 * Kaveotech brand mark: teal→green gradient rounded square with a white glyph.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-300 via-emerald-400 to-emerald-500 shadow-sm',
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-[18px] text-white"
        aria-hidden="true"
      >
        <path
          d="M7.5 4.5v15M7.5 12l8-7.5M7.5 12l8 7.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
