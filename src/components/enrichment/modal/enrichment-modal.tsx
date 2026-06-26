'use client';

import * as React from 'react';
import { Zap, Trash2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { detectColumns, type ParsedCsv } from '@/lib/csv';
import type { Recipe } from '@/lib/recipes';
import { CsvPreview } from './csv-preview';
import { FileSummary } from './file-summary';
import { RecipesRail } from './recipes-rail';
import { EnrichmentPanel } from './enrichment-panel';
import { useEnrichmentSelection } from './use-enrichment-selection';

function formatCredits(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString('en-US')
    : n.toFixed(2).replace(/\.?0+$/, '');
}

/** Inner content - mounted fresh per file (keyed) so all state resets. */
function ModalContent({ csv, onClose }: { csv: ParsedCsv; onClose: () => void }) {
  const [useHeader, setUseHeader] = React.useState(true);
  const [showPreview, setShowPreview] = React.useState(false);
  const [confirmClear, setConfirmClear] = React.useState(false);

  const dataRows = useHeader ? csv.rows : [csv.headers, ...csv.rows];
  const detection = React.useMemo(
    () => detectColumns(useHeader ? csv.headers : [], dataRows),
    // dataRows is derived from csv + useHeader
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [csv, useHeader]
  );
  const rowCount = dataRows.length;
  const sel = useEnrichmentSelection(detection, rowCount);

  const applyRecipe = (r: Recipe) => sel.applyRecipe(r.enrichmentIds);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Submit new enrichment
          </DialogTitle>
          <DialogDescription className="sr-only">
            Review your file and choose which enrichments to run.
          </DialogDescription>
        </div>
        <label className="flex shrink-0 cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
          Use first row as header
          <Switch checked={useHeader} onCheckedChange={setUseHeader} />
        </label>
      </div>

      {/* Compact file summary */}
      <FileSummary
        csv={csv}
        detection={detection}
        rowCount={rowCount}
        showPreview={showPreview}
        onTogglePreview={() => setShowPreview((v) => !v)}
      />

      {/* Optional full spreadsheet */}
      {showPreview && (
        <div className="flex max-h-[300px] shrink-0 flex-col border-b border-border">
          <CsvPreview csv={csv} useHeader={useHeader} />
        </div>
      )}

      {/* Recipes (hero) + the individual list */}
      <div className="min-h-0 flex-1 overflow-auto">
        <RecipesRail
          selected={sel.selected}
          onApply={applyRecipe}
          onSmartSelect={sel.smartSelect}
        />
        <div className="mx-6 border-t border-border" />
        <EnrichmentPanel
          detection={detection}
          rowCount={rowCount}
          selected={sel.selected}
          onToggle={sel.toggle}
          onToggleGroup={sel.toggleGroup}
        />
      </div>

      {/* Footer */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-3">
        <div className="flex items-center gap-1.5 text-sm">
          <Zap className="size-4 text-primary" />
          <span className="font-medium text-foreground">
            {sel.estimate.count}{' '}
            {sel.estimate.count === 1 ? 'enrichment' : 'enrichments'} selected
          </span>
          <span className="text-muted-foreground">
            · up to {formatCredits(sel.estimate.credits)} credits (~$
            {sel.estimate.usd.toFixed(2)}) · Growth plan $0.0125/credit
          </span>
        </div>
        <div className="flex items-center gap-2">
          {sel.estimate.count > 0 &&
            (confirmClear ? (
              <>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
                    sel.clear();
                    setConfirmClear(false);
                  }}
                >
                  <Trash2 className="size-3.5" />
                  Yes, clear all
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmClear(false)}
                >
                  Keep
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setConfirmClear(true)}
              >
                <Trash2 className="size-3.5" />
                Clear all
              </Button>
            ))}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={sel.estimate.count === 0}>Start enrichment</Button>
        </div>
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
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="flex h-[84vh] max-h-[900px] w-[92vw] max-w-[1680px] flex-col gap-0 overflow-hidden bg-background p-0 sm:max-w-[1680px]"
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
