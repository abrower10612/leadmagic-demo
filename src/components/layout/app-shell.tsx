import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';
import { SupportTab } from './support-tab';

/**
 * Root layout frame: collapsible sidebar + main column (sticky header above content).
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AppHeader />
        <div className="flex-1">{children}</div>
      </SidebarInset>
      <SupportTab />
    </SidebarProvider>
  );
}
