import { ExternalLink } from 'lucide-react';

/**
 * "Bulk List Enrichment" heading + Guide link-badge + description paragraph.
 */
export function PageIntro() {
  return (
    <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2.5">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Bulk List Enrichment
        </h1>
        <a
          href="#"
          className="inline-flex h-6 items-center gap-1 rounded-md bg-info/15 px-2 text-xs font-medium text-info transition-colors hover:bg-info/25"
        >
          Guide
          <ExternalLink className="size-3" />
        </a>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {
          "Upload a CSV and we'll detect emails, B2B profile URLs with /in/, company domains, and more. Pick one or more enrichments, review the credit estimate, and run them in parallel. You only pay for rows with results."
        }
      </p>
    </section>
  );
}
