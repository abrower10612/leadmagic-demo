import { ShoppingCart, KeyRound, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { CreditsGauge } from './credits-gauge';
import { CommandSearch } from './command-search';

/**
 * Top bar — sticky, translucent, blurred. Container classes mirror
 * app.leadmagic.io. Mobile (<lg): toggle + settings. Desktop (lg+):
 * toggle · credits meter · Add credits · spacer · search · API Keys.
 */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl supports-backdrop-filter:bg-background/72">
      <div className="w-full min-w-0 px-3 py-2 md:px-5 md:py-2.5 xl:px-6">
        <div className="flex min-h-8 items-center gap-2">
          <SidebarTrigger className="size-8 shrink-0 text-muted-foreground hover:text-foreground" />

          {/* Mobile-only settings shortcut */}
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Settings className="size-[18px]" />
            <span className="sr-only">Settings</span>
          </Button>

          {/* Desktop cluster */}
          <div className="hidden flex-1 items-center gap-2 lg:flex">
            <Separator orientation="vertical" className="mx-1 h-5!" />

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

            <CommandSearch />

            <Button className="h-9 gap-1.5 rounded-lg px-3 hover:bg-primary/90">
              <KeyRound className="size-4" />
              API Keys
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
