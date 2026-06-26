'use client';

import {
  LayoutGrid,
  ListRestart,
  MessageCircle,
  Waypoints,
  SquareTerminal,
  CreditCard,
  Settings,
  Radar,
  Building2,
  ChevronRight,
  BookOpen,
  ExternalLink,
  LifeBuoy,
  ChevronsUpDown,
  type LucideIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
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
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: ListRestart, label: 'List Enrichment', active: true },
  { icon: MessageCircle, label: 'Chat', beta: true },
  { icon: Waypoints, label: 'Integrations' },
  { icon: SquareTerminal, label: 'API access' },
  { icon: CreditCard, label: 'Billing' },
  { icon: Settings, label: 'Settings' },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="border-sidebar-border">
      {/* Brand */}
      <SidebarHeader className="h-14 flex-row items-center gap-2.5 px-3">
        <LogoMark />
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold text-sidebar-foreground">
            Kaveotech
          </span>
          <span className="mt-1 text-xs text-muted-foreground">Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {/* Primary navigation */}
        <SidebarGroup className="p-0">
          <SidebarMenu className="gap-1">
            {primaryNav.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  isActive={item.active}
                  className="h-9 gap-3 px-3 text-muted-foreground data-active:text-sidebar-foreground [&_svg]:size-[18px]"
                >
                  <item.icon />
                  <span>{item.label}</span>
                  {item.beta && (
                    <span className="ml-auto rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-400 uppercase">
                      Beta
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Grouped / collapsible navigation */}
        <SidebarGroup className="mt-2 p-0">
          <SidebarMenu className="gap-1">
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-9 gap-3 px-3 text-muted-foreground [&_svg]:size-[18px]">
                    <Radar />
                    <span>Signals</span>
                    <ChevronRight className="ml-auto size-4! transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="mr-0 ml-[1.4rem] border-sidebar-border pr-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="h-8 text-muted-foreground">
                        <span>Local Leads Finder</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-9 gap-3 px-3 text-muted-foreground [&_svg]:size-[18px]">
                    <Building2 />
                    <span>Companies</span>
                    <ChevronRight className="ml-auto size-4! transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="mr-0 ml-[1.4rem] border-sidebar-border pr-0">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="h-8 text-muted-foreground">
                        <span>All Companies</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: Docs, Support, user card */}
      <SidebarFooter className="gap-1 p-2">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton className="h-9 gap-3 px-3 text-muted-foreground [&_svg]:size-[18px]">
              <BookOpen />
              <span>Docs</span>
              <ExternalLink className="ml-auto size-3.5! opacity-60" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-9 gap-3 px-3 text-muted-foreground [&_svg]:size-[18px]">
              <LifeBuoy />
              <span>Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <button
          type="button"
          className="mt-1 flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-sidebar-accent"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-primary text-xs font-medium text-primary-foreground">
              A
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-sm font-medium text-sidebar-foreground">
              Andrew Brower
            </span>
            <span className="mt-1 truncate text-xs text-muted-foreground">
              andrew.brower@kaveotech.com
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
