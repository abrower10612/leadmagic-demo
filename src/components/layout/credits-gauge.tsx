import { cn } from '@/lib/utils';

/**
 * Small speedometer-style gauge shown next to the credits count in the header.
 * Decorative — a green→teal arc filled ~70% with a needle.
 */
export function CreditsGauge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 26"
      fill="none"
      className={cn('h-6 w-9', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="credits-gauge-arc" x1="4" y1="20" x2="36" y2="20">
          <stop offset="0%" stopColor="#00c758" />
          <stop offset="100%" stopColor="#00b7d7" />
        </linearGradient>
      </defs>
      {/* Track */}
      <path
        d="M5 20a15 15 0 0 1 30 0"
        stroke="#262626"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Value arc (~70%) */}
      <path
        d="M5 20a15 15 0 0 1 25.9-10.3"
        stroke="url(#credits-gauge-arc)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Needle */}
      <line
        x1="20"
        y1="20"
        x2="28.4"
        y2="11.6"
        stroke="#f8f8f8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2.4" fill="#f8f8f8" />
    </svg>
  );
}
