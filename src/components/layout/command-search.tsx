'use client';

import * as React from 'react';
import {
  Search,
  LayoutGrid,
  ListRestart,
  MessageCircle,
  Waypoints,
  SquareTerminal,
  CreditCard,
  Settings,
  Radar,
  Building2,
  Upload,
  KeyRound,
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

const navCommands = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: ListRestart, label: 'List Enrichment' },
  { icon: MessageCircle, label: 'Chat' },
  { icon: Waypoints, label: 'Integrations' },
  { icon: SquareTerminal, label: 'API access' },
  { icon: CreditCard, label: 'Billing' },
  { icon: Settings, label: 'Settings' },
  { icon: Radar, label: 'Local Leads Finder' },
  { icon: Building2, label: 'Companies' },
];

const actionCommands = [
  { icon: Upload, label: 'Upload a CSV' },
  { icon: CreditCard, label: 'Add credits' },
  { icon: KeyRound, label: 'Manage API keys' },
];

/**
 * Header search field. Renders as a button styled like an input; clicking it
 * (or pressing ⌘K) opens the command palette.
 */
export function CommandSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-[220px] items-center gap-2 rounded-lg border border-border bg-input/30 px-3 text-sm text-muted-foreground transition-colors hover:bg-input/50 lg:w-[300px] xl:w-[360px]"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">
          Find settings, commands…
        </span>
        <kbd className="pointer-events-none hidden h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-sans text-[10px] font-medium text-muted-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find settings, commands…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navCommands.map(({ icon: Icon, label }) => (
              <CommandItem key={label} value={label} onSelect={() => setOpen(false)}>
                <Icon />
                <span>{label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            {actionCommands.map(({ icon: Icon, label }) => (
              <CommandItem key={label} value={label} onSelect={() => setOpen(false)}>
                <Icon />
                <span>{label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
