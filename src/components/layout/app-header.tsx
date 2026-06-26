import { ShoppingCart, KeyRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { CreditsGauge } from './credits-gauge';
import { CommandSearch } from './command-search';

/**
 * Top bar: sidebar toggle · credits meter · Add credits · spacer · command search · API Keys.
 */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background px-4">
      <SidebarTrigger className="size-8 text-muted-foreground hover:text-foreground" />

      <Separator orientation="vertical" className="mx-1 h-5!" />

      {/* Credits meter */}
      <div className="flex items-center gap-2">
        <CreditsGauge />
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tabular-nums text-foreground">
            16,365
          </span>
          <span className="mt-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Credits left
          </span>
        </div>
      </div>

      <Button className="ml-2 h-9 gap-1.5 rounded-lg px-3 hover:bg-primary/90">
        <ShoppingCart className="size-4" />
        Add credits
      </Button>

      <div className="flex-1" />

      {/* Right cluster */}
      <CommandSearch />

      <Button className="h-9 gap-1.5 rounded-lg px-3 hover:bg-primary/90">
        <KeyRound className="size-4" />
        API Keys
      </Button>
    </header>
  );
}
