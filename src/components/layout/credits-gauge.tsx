import { cn } from '@/lib/utils';

/**
 * Credit gauge - exact match to app.leadmagic.io's SVG: a ~250° arc with a
 * muted track, a green value sweep (~82%), a needle, and a center hub.
 */
export function CreditsGauge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 70"
      className={cn('h-10 w-14 shrink-0', className)}
      role="img"
      aria-label="Credit gauge at 82 percent"
    >
      <path
        d="M 17.16 58.80 A 34 34 0 1 1 82.84 58.80"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        className="stroke-muted-foreground/25"
      />
      <path
        d="M 17.16 58.80 A 34 34 0 0 1 81.26 36.62"
        fill="none"
        stroke="#10b981"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <polygon
        points="48.82,47.24 72.98,40.16 51.18,52.76"
        strokeWidth="2"
        strokeLinejoin="round"
        className="fill-muted-foreground stroke-muted-foreground"
      />
      <circle cx="50" cy="50" r="4.5" className="fill-muted-foreground" />
      <circle cx="50" cy="50" r="2" className="fill-background" />
    </svg>
  );
}
