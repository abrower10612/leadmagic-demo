import { AppSidebar } from './app-sidebar';
import { AppHeader } from './app-header';
import { SupportTab } from './support-tab';

/**
 * Root layout frame: fixed sidebar + main column (header above scrollable content).
 * STUB — structure only; styled to match the screenshot in a later step.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="relative flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1">{children}</main>
        <SupportTab />
      </div>
    </div>
  );
}
