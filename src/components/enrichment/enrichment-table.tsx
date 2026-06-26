import { enrichmentRuns } from '@/lib/enrichment-data';

/**
 * The runs data table: File Name, Status, Progress, Rows, Succeeded, Failed,
 * Skipped, Credits, Duration, Created, Completed, row actions.
 * STUB — built with the shadcn `table` primitive in a later step.
 * Reads mock rows from @/lib/enrichment-data.
 */
export function EnrichmentTable() {
  return (
    <div data-slot="enrichment-table">
      {/* TODO: Table head + EnrichmentTableRow (StatusBadge, ProgressCell, MetricCell, RowActions) */}
      <span className="sr-only">{enrichmentRuns.length} runs</span>
    </div>
  );
}
