import { Badge } from '@/components/ui/badge';
import type { EnrichmentStatus } from '@/lib/enrichment-data';

/**
 * Status pill (e.g. "Completed"). Variants per status styled in a later step.
 * STUB — minimal render for now.
 */
export function StatusBadge({ status }: { status: EnrichmentStatus }) {
  return (
    <Badge data-slot="status-badge" variant="secondary">
      {status}
    </Badge>
  );
}
