"use client";

import {
  Menu,
  Plus,
  Sparkles,
} from "lucide-react";

type ExtensionView = "chat" | "history" | "settings";

interface ExtensionHeaderProps {
  activeView: ExtensionView;
  onMenuClick: () => void;
  onNewChat: () => void;
}

const viewTitles: Record<ExtensionView, string> = {
  chat: "New conversation",
  history: "History",
  settings: "Settings",
};

export default function ExtensionHeader({
  activeView,
  onMenuClick,
  onNewChat,
}: ExtensionHeaderProps) {
  return (
    <header className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-border/50 bg-background/70 px-3 backdrop-blur-xl">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
        >
          <Menu className="size-[18px]" />
        </button>

        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 text-white shadow-md shadow-violet-500/20">
            <Sparkles className="size-3.5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-xs font-bold tracking-tight">
                EchoGPT
              </span>

              <span className="rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-violet-500">
                AI
              </span>
            </div>

            <p className="truncate text-[9px] text-muted-foreground">
              {viewTitles[activeView]}
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Online status */}
        {/* <div
          className="mr-1 hidden items-center gap-1.5 rounded-full border border-border/50 bg-muted/30 px-2 py-1 sm:flex"
          title="EchoGPT is online"
        >
          <span className="size-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/60" />
          <span className="text-[9px] font-medium text-muted-foreground">
            Online
          </span>
        </div> */}

        {/* New Chat */}
        <button
          type="button"
          onClick={onNewChat}
          aria-label="New chat"
          title="New chat"
          className="group flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 active:scale-95"
        >
          <Plus className="size-4 transition-transform duration-200 group-hover:rotate-90" />
        </button>
      </div>
    </header>
  );
}