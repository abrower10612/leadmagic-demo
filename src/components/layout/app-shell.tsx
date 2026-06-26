import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';
import { SupportTab } from './support-tab';

/**
 * Root layout frame. Structure/classes mirror app.leadmagic.io:
 * sidebar + a muted inset holding a sticky blurred header above a
 * scrollable, max-w-[1800px] centered content column.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-dvh min-w-0 overflow-hidden bg-muted/20">
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <AppHeader />
          <main className="relative flex min-h-0 min-w-0 flex-1 overflow-y-auto">
            <div className="flex min-h-0 min-w-0 flex-1">
              <div className="mx-auto flex w-full min-w-0 max-w-[1800px] flex-1 flex-col px-3 py-3 pb-4 md:px-5 md:py-4 md:pb-5 xl:px-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
      <SupportTab />
    </SidebarProvider>
  );
}
