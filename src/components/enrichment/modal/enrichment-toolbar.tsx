'use client';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export function EnrichmentToolbar({
  query,
  onQuery,
  readyOnly,
  onReadyOnly,
}: {
  query: string;
  onQuery: (v: string) => void;
  readyOnly: boolean;
  onReadyOnly: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-56">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search enrichments…"
          className="h-8 pl-8 text-xs"
        />
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-xs whitespace-nowrap text-muted-foreground">
        Ready only
        <Switch checked={readyOnly} onCheckedChange={onReadyOnly} />
      </label>
    </div>
  );
}
