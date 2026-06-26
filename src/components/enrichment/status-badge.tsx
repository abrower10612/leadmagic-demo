import { cn } from '@/lib/utils';
import type { EnrichmentStatus } from '@/lib/enrichment-data';

const styles: Record<EnrichmentStatus, string> = {
  completed: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  processing: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  failed: 'bg-red-500/10 text-red-400 ring-red-500/20',
  queued: 'bg-muted text-muted-foreground ring-border',
};

const labels: Record<EnrichmentStatus, string> = {
  completed: 'Completed',
  processing: 'Processing',
  failed: 'Failed',
  queued: 'Queued',
};

/** Status pill for an enrichment run. */
export function StatusBadge({ status }: { status: EnrichmentStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}
