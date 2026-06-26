import { cn } from '@/lib/utils';
import type { EnrichmentStatus } from '@/lib/enrichment-data';

const styles: Record<EnrichmentStatus, string> = {
  completed: 'bg-success/10 text-success ring-success/20',
  processing: 'bg-info/10 text-info ring-info/20',
  failed: 'bg-destructive/10 text-destructive ring-destructive/20',
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
