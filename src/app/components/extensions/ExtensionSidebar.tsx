"use client";

import {
  Bot,
  History,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";

type ExtensionView = "chat" | "history" | "settings";

interface ExtensionSidebarProps {
  activeView: ExtensionView;
  onNavigate: (view: ExtensionView) => void;
}

const navigationItems: {
  id: ExtensionView;
  label: string;
  icon: typeof MessageSquare;
}[] = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
  },
  {
    id: "history",
    label: "History",
    icon: History,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function ExtensionSidebar({
  activeView,
  onNavigate,
}: ExtensionSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 border-b border-border/50 px-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
          <Sparkles className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold tracking-tight">EchoGPT</p>
          <p className="text-[9px] font-medium text-muted-foreground">
            Chrome Extension
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {/* New Chat */}
        <button
          type="button"
          onClick={() => onNavigate("chat")}
          className="group mb-5 flex h-10 w-full items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 px-3 text-xs font-semibold text-white shadow-md shadow-violet-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98]"
        >
          <Plus className="size-4 transition-transform duration-200 group-hover:rotate-90" />

          <span>New Chat</span>

          <span className="ml-auto rounded-md bg-white/15 px-1.5 py-0.5 text-[8px] font-semibold">
            N
          </span>
        </button>

        {/* Main */}
        <div className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Workspace
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`group flex h-10 w-full items-center gap-3 rounded-xl px-3 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-violet-500/10 text-violet-600 dark:text-violet-300"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                <span
                  className={`flex size-7 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? "bg-violet-500/15 text-violet-500"
                      : "bg-muted/60 text-muted-foreground group-hover:bg-background group-hover:text-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                </span>

                <span>{item.label}</span>

                {isActive && (
                  <span className="ml-auto size-1.5 rounded-full bg-violet-500 shadow-sm shadow-violet-500/60" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Tools */}
        <div className="mb-2 mt-7 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Quick Tools
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onNavigate("chat")}
            className="group flex h-10 w-full items-center gap-3 rounded-xl px-3 text-xs font-medium text-muted-foreground transition-all hover:bg-muted/70 hover:text-foreground"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 transition-colors group-hover:bg-cyan-500/15">
              <Bot className="size-3.5" />
            </span>

            <span>AI Assistant</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("chat")}
            className="group flex h-10 w-full items-center gap-3 rounded-xl px-3 text-xs font-medium text-muted-foreground transition-all hover:bg-muted/70 hover:text-foreground"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-fuchsia-500/10 text-fuchsia-500 transition-colors group-hover:bg-fuchsia-500/15">
              <Zap className="size-3.5" />
            </span>

            <span>Quick Actions</span>
          </button>
        </div>

        {/* Pro Card */}
        <div className="mt-7 overflow-hidden rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.08] via-background to-fuchsia-500/[0.06] p-3">
          <div className="mb-2 flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 text-violet-500">
            <Sparkles className="size-3.5" />
          </div>

          <p className="text-[11px] font-semibold">
            Unlock more with Pro
          </p>

          <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
            Get access to advanced models and more AI features.
          </p>

          <button
            type="button"
            className="mt-3 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-foreground px-2 text-[9px] font-semibold text-background transition-opacity hover:opacity-90"
          >
            <Sparkles className="size-3" />
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/50 p-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-muted/40 px-2.5 py-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[10px] font-bold text-white">
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold">
              Ahanaf
            </p>

            <p className="text-[9px] text-muted-foreground">
              Free plan
            </p>
          </div>

          <Settings className="size-3.5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}