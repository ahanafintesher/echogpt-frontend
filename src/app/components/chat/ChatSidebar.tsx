"use client";

import {
  Bot,
  ChevronUp,
  CircleHelp,
  Code2,
  Compass,
  Crown,
  Image,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const workspaceItems = [
  {
    title: "Explore",
    icon: Compass,
  },
  {
    title: "AI Tools",
    icon: Bot,
  },
  {
    title: "Image Studio",
    icon: Image,
    badge: "PRO",
  },
  {
    title: "Connectors",
    icon: Users,
  },
];

const recentChats = [
  "Build a React dashboard",
  "Portfolio improvement ideas",
  "Debug authentication",
  "Next.js App Router",
  "REST API architecture",
];

export default function ChatSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-violet-100/80 dark:border-violet-950/40"
    >
      {/* Logo */}
      <SidebarHeader className="px-3 pt-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20">
            <Sparkles className="size-4" />
          </div>

          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-bold tracking-tight">
              EchoGPT
            </span>

            <span className="text-[10px] font-medium text-muted-foreground">
              AI Workspace
            </span>
          </div>
        </div>

        {/* New Chat */}
        <SidebarMenu className="mt-3">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="New Chat"
              className="h-11 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 px-3 text-white shadow-md shadow-violet-500/20 transition-all hover:scale-[1.01] hover:from-violet-700 hover:via-indigo-700 hover:to-fuchsia-600 hover:text-white"
            >
              <button type="button">
                <Plus className="size-4" />
                <span className="font-medium">New Chat</span>

                <kbd className="ml-auto hidden  rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-bold group-data-[collapsible=icon]:hidden sm:inline">
                  ⌘ K
                </kbd>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main content */}
      <SidebarContent className="px-2">
        {/* Workspace */}
        <SidebarGroup className="pt-5">
          <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="h-10 rounded-lg px-3 transition-colors hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-950/30 dark:hover:text-violet-300"
                    >
                      <button type="button">
                        <Icon className="size-4" />

                        <span>{item.title}</span>

                        {item.badge && (
                          <span className="ml-auto rounded-md bg-violet-100 px-1.5 py-0.5 text-[9px] font-bold text-violet-600 dark:bg-violet-950 dark:text-violet-300 group-data-[collapsible=icon]:hidden">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Conversations */}
        <SidebarGroup className="pt-3">
          <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Conversations
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {recentChats.map((chat, index) => (
                <SidebarMenuItem key={chat}>
                  <SidebarMenuButton
                    asChild
                    tooltip={chat}
                    className={`h-9 rounded-lg px-3 text-muted-foreground transition-colors hover:bg-violet-50 hover:text-foreground dark:hover:bg-violet-950/30 ${
                      index === 0
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300"
                        : ""
                    }`}
                  >
                    <button type="button">
                      <MessageSquare className="size-3.5 shrink-0" />

                      <span className="truncate text-xs">
                        {chat}
                      </span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade card */}
        <div className="mt-auto px-1 py-4 group-data-[collapsible=icon]:hidden">
          <div className="relative overflow-hidden rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-4 dark:border-violet-900/40 dark:from-violet-950/40 dark:via-background dark:to-fuchsia-950/20">
            <div className="absolute -right-6 -top-6 size-20 rounded-full bg-fuchsia-400/20 blur-2xl" />

            <div className="relative">
              <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
                <Crown className="size-4" />
              </div>

              <p className="text-sm font-semibold">
                Unlock more with Pro
              </p>

              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                Get more powerful models and advanced AI tools.
              </p>

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
              >
                <Zap className="size-3.5" />
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-2 pb-3">
        <SidebarSeparator />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              className="h-10 rounded-lg"
            >
              <button type="button">
                <Settings className="size-4" />
                <span>Settings</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Help & Support"
              className="h-10 rounded-lg"
            >
              <button type="button">
                <CircleHelp className="size-4" />
                <span>Help & Support</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* User */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Account"
              className="mt-1 h-12 rounded-xl border border-border/60 bg-muted/30 px-2"
            >
              <button type="button">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-semibold text-white">
                  A
                </div>

                <div className="flex min-w-0 flex-1 flex-col items-start group-data-[collapsible=icon]:hidden">
                  <span className="w-full truncate text-xs font-semibold">
                    Ahanaf
                  </span>

                  <span className="text-[10px] text-muted-foreground">
                    Free plan
                  </span>
                </div>

                <ChevronUp className="size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}