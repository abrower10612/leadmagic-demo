import { ExternalLink } from 'lucide-react';

/**
 * "Bulk List Enrichment" card - header (title + Guide badge) + description.
 * Classes mirror app.leadmagic.io exactly.
 */
export function PageIntro() {
  return (
    <div
      data-slot="card"
      className="flex flex-col gap-6 rounded-xl border border-border/50 bg-card/80 py-6 text-card-foreground shadow-none"
    >
      <div className="flex flex-col gap-1.5 p-3 md:p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <div className="text-base font-semibold tracking-tight md:text-lg">
              <span className="tracking-tight capitalize">
                Bulk List Enrichment
              </span>
            </div>
            <a href="#" className="shrink-0">
              <span className="inline-flex items-center rounded-md border border-info/25 bg-info/12 px-2 py-0.5 text-[10px] font-medium text-info">
                Guide
                <ExternalLink className="ml-1.5 size-3.5" />
              </span>
            </a>
          </div>
        </div>
        <div className="max-w-2xl text-xs leading-[1.125rem] text-muted-foreground md:text-sm">
          {
            "Upload a CSV and we'll detect emails, B2B profile URLs with /in/, company domains, and more. Pick one or more enrichments, review the credit estimate, and run them in parallel. You only pay for rows with results."
          }
        </div>
      </div>
    </div>
  );
}
