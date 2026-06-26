import { EnrichmentTable } from './enrichment-table';

/**
 * "Enrichment history" section: section header (+ Refresh), toolbar (search + Filters),
 * and the runs table. Table search filtering is one of the interactive bits.
 * STUB — header/toolbar built in a later step; renders the table stub for now.
 */
export function EnrichmentHistory() {
  return (
    <section data-slot="enrichment-history">
      {/* TODO: SectionHeader (+ Refresh), TableToolbar (search + Filters) */}
      <EnrichmentTable />
    </section>
  );
}
