'use client';

import * as React from 'react';
import { FileSpreadsheet, Zap } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { detectColumns, type ParsedCsv } from '@/lib/csv';
import { CsvPreview } from './csv-preview';
import { EnrichmentPanel } from './enrichment-panel';
import { useEnrichmentSelection } from './use-enrichment-selection';

function formatCredits(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString('en-US')
    : n.toFixed(2).replace(/\.?0+$/, '');
}

/** Inner content — mounted fresh per file (keyed) so all state resets. */
function ModalContent({ csv, onClose }: { csv: ParsedCsv; onClose: () => void }) {
  const [useHeader, setUseHeader] = React.useState(true);

  const dataRows = useHeader ? csv.rows : [csv.headers, ...csv.rows];
  const detection = React.useMemo(
    () => detectColumns(useHeader ? csv.headers : [], dataRows),
    // dataRows is derived from csv + useHeader
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [csv, useHeader]
  );
  const rowCount = dataRows.length;
  const sel = useEnrichmentSelection(detection, rowCount);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <DialogTitle className="text-base font-semibold">
            Submit new enrichment
          </DialogTitle>
          <DialogDescription className="sr-only">
            Preview your CSV and choose which enrichments to run.
          </DialogDescription>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileSpreadsheet className="size-3.5 shrink-0" />
            <span className="truncate">{csv.fileName}</span>
          </div>
        </div>
        <label className="flex shrink-0 cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          Use first row as header
          <Switch checked={useHeader} onCheckedChange={setUseHeader} />
        </label>
      </div>

      {/* Body: spreadsheet | enrichment panel */}
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col border-r border-border">
          <CsvPreview csv={csv} useHeader={useHeader} />
        </div>

        <aside className="flex w-[400px] shrink-0 flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">
              Choose enrichments
            </h2>
            <span className="text-xs text-muted-foreground">
              {sel.estimate.count} selected
            </span>
          </div>

          <EnrichmentPanel
            detection={detection}
            rowCount={rowCount}
            selected={sel.selected}
            onToggle={sel.toggle}
            onToggleGroup={sel.toggleGroup}
          />

          {/* Footer: estimate + actions */}
          <div className="space-y-3 border-t border-border p-4">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs">
              <div className="flex items-center gap-1.5">
                <Zap className="size-3.5 text-primary" />
                <span className="font-medium text-foreground">
                  {sel.estimate.count}{' '}
                  {sel.estimate.count === 1 ? 'enrichment' : 'enrichments'}{' '}
                  selected
                </span>
                <span className="text-muted-foreground">
                  · up to {formatCredits(sel.estimate.credits)} credits (~$
                  {sel.estimate.usd.toFixed(2)})
                </span>
              </div>
              <div className="mt-1 text-muted-foreground">
                Growth plan · $0.0125/credit on your account
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={sel.estimate.count === 0}>
                Start enrichment
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function EnrichmentModal({
  csv,
  open,
  onOpenChange,
}: {
  csv: ParsedCsv | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[88vh] max-h-[820px] w-[calc(100%-2rem)] max-w-[1180px] flex-col gap-0 overflow-hidden p-0 sm:max-w-[1180px]"
      >
        {csv && (
          <ModalContent
            key={`${csv.fileName}:${csv.rowCount}`}
            csv={csv}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
