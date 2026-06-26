import {
  FileText,
  CircleDashed,
  Gauge,
  Rows3,
  CircleCheck,
  CircleX,
  CircleSlash,
  Coins,
  Timer,
  Calendar,
  Clock,
  ChevronDown,
  ExternalLink,
  Loader2,
  type LucideIcon,
} from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { EnrichmentRun } from '@/lib/enrichment-data';
import { StatusBadge } from './status-badge';

const columns: { icon: LucideIcon; label: string; sortable?: boolean }[] = [
  { icon: FileText, label: 'File Name' },
  { icon: CircleDashed, label: 'Status' },
  { icon: Gauge, label: 'Progress' },
  { icon: Rows3, label: 'Rows' },
  { icon: CircleCheck, label: 'Succeeded' },
  { icon: CircleX, label: 'Failed' },
  { icon: CircleSlash, label: 'Skipped' },
  { icon: Coins, label: 'Credits' },
  { icon: Timer, label: 'Duration' },
  { icon: Calendar, label: 'Created', sortable: true },
  { icon: Clock, label: 'Completed' },
];

function num(value: number) {
  return value.toLocaleString('en-US');
}

/** A numeric cell that renders an em-dash for null and tints by tone. */
function Metric({
  value,
  tone = 'default',
}: {
  value: number | null;
  tone?: 'default' | 'success' | 'danger';
}) {
  if (value === null || value === 0) {
    return <span className="text-muted-foreground">-</span>;
  }
  return (
    <span
      className={cn(
        'tabular-nums',
        tone === 'success' && 'text-success',
        tone === 'danger' && 'text-destructive',
        tone === 'default' && 'text-foreground'
      )}
    >
      {num(value)}
    </span>
  );
}

function ProgressCell({ progress }: { progress: number }) {
  const done = progress >= 100;
  return (
    <div
      className={cn(
        'flex items-center gap-1.5',
        done ? 'text-success' : 'text-info'
      )}
    >
      {done ? (
        <CircleCheck className="size-4" />
      ) : (
        <Loader2 className="size-4 animate-spin" />
      )}
      <span className="tabular-nums">{progress}%</span>
    </div>
  );
}

export function EnrichmentTable({ runs }: { runs: EnrichmentRun[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          {columns.map((col) => (
            <TableHead
              key={col.label}
              className="h-10 px-3 text-xs font-medium text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <col.icon className="size-3.5 shrink-0" />
                {col.label}
                {col.sortable && <ChevronDown className="size-3.5 opacity-70" />}
              </div>
            </TableHead>
          ))}
          <TableHead className="h-10 w-10 px-3" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {runs.length === 0 ? (
          <TableRow className="hover:bg-transparent">
            <TableCell
              colSpan={columns.length + 1}
              className="h-28 text-center text-sm text-muted-foreground"
            >
              No enrichment runs match your search.
            </TableCell>
          </TableRow>
        ) : (
          runs.map((run) => (
            <TableRow key={run.id} className="border-border">
              <TableCell className="max-w-[260px] px-3">
                <div className="flex min-w-0 items-center gap-2">
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-foreground">
                    {run.fileName}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-3">
                <StatusBadge status={run.status} />
              </TableCell>
              <TableCell className="px-3">
                <ProgressCell progress={run.progress} />
              </TableCell>
              <TableCell className="px-3">
                <Metric value={run.rows} />
              </TableCell>
              <TableCell className="px-3">
                <Metric value={run.succeeded} tone="success" />
              </TableCell>
              <TableCell className="px-3">
                <Metric value={run.failed} tone="danger" />
              </TableCell>
              <TableCell className="px-3">
                <Metric value={run.skipped} />
              </TableCell>
              <TableCell className="px-3">
                <Metric value={run.credits} />
              </TableCell>
              <TableCell className="px-3 text-foreground">
                {run.duration}
              </TableCell>
              <TableCell className="px-3 text-muted-foreground">
                {run.created}
              </TableCell>
              <TableCell className="px-3 text-muted-foreground">
                {run.completed ?? '-'}
              </TableCell>
              <TableCell className="px-3">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="size-4" />
                  <span className="sr-only">Open run</span>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
