'use client';

import {
  LayoutDashboard,
  FileOutput,
  MessageCircle,
  Workflow,
  Terminal,
  CreditCard,
  Settings,
  Radar,
  Building2,
  ChevronRight,
  BookOpen,
  ExternalLink,
  LifeBuoy,
  ChevronsUpDown,
  TestTube,
  type LucideIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogoMark } from './logo-mark';

interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  beta?: boolean;
}

const primaryNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FileOutput, label: 'List Enrichment', active: true },
  { icon: MessageCircle, label: 'Chat', beta: true },
  { icon: Workflow, label: 'Integrations' },
  { icon: Terminal, label: 'API access' },
  { icon: CreditCard, label: 'Billing' },
  { icon: Settings, label: 'Settings' },
];

const linkClass =
  'group/link flex h-8 min-w-0 items-center gap-2 rounded-lg border border-transparent px-2 text-[13px] font-normal leading-none tracking-[-0.01em] text-sidebar-foreground/80 transition-colors duration-150 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent/80 data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground';

const iconSpanClass =
  'flex size-5 shrink-0 items-center justify-center text-sidebar-foreground/60 transition-colors group-hover/link:text-sidebar-accent-foreground group-data-[active=true]/link:text-sidebar-accent-foreground [&_svg]:size-3.5';

function NavLink({ item }: { item: NavItem }) {
  return (
    <a href="#" data-active={item.active ? 'true' : undefined} className={linkClass}>
      <span className={iconSpanClass}>
        <item.icon />
      </span>
      <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
      {item.beta && (
        <span className="ml-auto flex h-4 items-center gap-1 rounded-full border border-success/25 bg-success/12 px-1.5 text-[9px] font-semibold tracking-wider text-success uppercase">
          <TestTube className="size-2.5" />
          Beta
        </span>
      )}
    </a>
  );
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="border-sidebar-border">
      {/* Brand */}
      <SidebarHeader className="h-12 flex-row items-center border-b border-sidebar-border px-1.5">
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5">
          <LogoMark className="size-[26px] rounded-md" />
          <div className="grid min-w-0 flex-1 gap-0.5 text-left leading-tight">
            <span className="truncate text-sm font-medium text-sidebar-accent-foreground">
              Kaveotech
            </span>
            <span className="truncate text-[11px] leading-4 font-normal text-sidebar-foreground/70">
              Admin
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-2 px-1.5 py-1.5">
        {/* Primary navigation */}
        <SidebarGroup className="p-2">
          <SidebarMenu className="gap-0.5">
            {primaryNav.map((item) => (
              <SidebarMenuItem key={item.label}>
                <NavLink item={item} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Grouped / collapsible navigation */}
        <SidebarGroup className="p-2">
          <SidebarMenu className="gap-0.5">
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <button className={linkClass}>
                    <span className={iconSpanClass}>
                      <Radar />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-left">
                      Signals
                    </span>
                    <ChevronRight className="size-3.5 text-sidebar-foreground/60 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="mr-0 ml-[1.45rem] gap-0.5 border-sidebar-border pr-0">
                    <SidebarMenuSubItem>
                      <a
                        href="#"
                        className="flex h-8 min-w-0 items-center rounded-lg px-2 text-[13px] font-normal tracking-[-0.01em] text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      >
                        <span className="truncate">Local Leads Finder</span>
                      </a>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <button className={linkClass}>
                    <span className={iconSpanClass}>
                      <Building2 />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-left">
                      Companies
                    </span>
                    <ChevronRight className="size-3.5 text-sidebar-foreground/60 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="mr-0 ml-[1.45rem] gap-0.5 border-sidebar-border pr-0">
                    <SidebarMenuSubItem>
                      <a
                        href="#"
                        className="flex h-8 min-w-0 items-center rounded-lg px-2 text-[13px] font-normal tracking-[-0.01em] text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      >
                        <span className="truncate">All Companies</span>
                      </a>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: Docs, Support, user card */}
      <SidebarFooter className="gap-0.5 border-t border-sidebar-border px-1.5 py-1.5">
        <SidebarMenu className="gap-0.5">
          <SidebarMenuItem>
            <a href="#" className={linkClass}>
              <span className={iconSpanClass}>
                <BookOpen />
              </span>
              <span className="min-w-0 flex-1 truncate text-left">Docs</span>
              <ExternalLink className="size-3.5 text-sidebar-foreground/50" />
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a href="#" className={linkClass}>
              <span className={iconSpanClass}>
                <LifeBuoy />
              </span>
              <span className="min-w-0 flex-1 truncate text-left">Support</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>

        <button
          type="button"
          className="mt-0.5 flex h-11 items-center gap-2 rounded-lg px-2 text-left transition-colors hover:bg-sidebar-accent/50"
        >
          <Avatar className="size-7 rounded-md">
            <AvatarFallback className="rounded-md bg-primary text-xs font-medium text-primary-foreground">
              A
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 gap-0.5 leading-tight">
            <span className="truncate text-[13px] font-medium text-sidebar-foreground">
              Andrew Brower
            </span>
            <span className="truncate text-[11px] text-sidebar-foreground/70">
              andrew.brower@kaveotech.com
            </span>
          </div>
          <ChevronsUpDown className="size-4 shrink-0 text-sidebar-foreground/60" />
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
