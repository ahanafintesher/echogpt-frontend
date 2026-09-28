"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  History,
  MessageSquare,
  Settings,
  Sparkles,
} from "lucide-react";

import ExtensionChat from "./ExtensionChat";
import ExtensionHeader from "./ExtensionHeader";
import ExtensionPrompt from "./ExtensionPrompt";
import ExtensionSettings from "./ExtensionSettings";
import ExtensionSidebar from "./ExtensionSidebar";

type ExtensionView = "chat" | "history" | "settings";

export default function ExtensionsPopup() {
  const [activeView, setActiveView] = useState<ExtensionView>("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case "history":
        return <ExtensionHistoryPreview />;

      case "settings":
        return <ExtensionSettings />;

      case "chat":
      default:
        return (
          <div className="flex min-h-0 flex-1 flex-col">
            <ExtensionChat />
            <ExtensionPrompt />
          </div>
        );
    }
  };

  return (
    <div className="relative flex h-[680px] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-violet-500/20 bg-background shadow-2xl shadow-violet-500/15">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 -top-24 size-64 rounded-full bg-violet-500/10 blur-[90px]" />

        <div className="absolute -bottom-24 -right-24 size-64 rounded-full bg-cyan-500/10 blur-[90px]" />

        <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/5 blur-[100px]" />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 z-30 bg-black/20 backdrop-blur-[2px]"
            />

            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-y-0 left-0 z-40 w-[250px] border-r border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl"
            >
              <ExtensionSidebar
                activeView={activeView}
                onNavigate={(view) => {
                  setActiveView(view);
                  setSidebarOpen(false);
                }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <ExtensionHeader
          activeView={activeView}
          onMenuClick={() => setSidebarOpen(true)}
          onNewChat={() => setActiveView("chat")}
        />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="relative flex min-h-0 flex-1 flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-center border-t border-border/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            EchoGPT is ready
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Temporary History UI                                                       */
/* -------------------------------------------------------------------------- */

function ExtensionHistoryPreview() {
  const conversations = [
    {
      title: "React dashboard architecture",
      time: "Just now",
    },
    {
      title: "Fix authentication bug",
      time: "Today",
    },
    {
      title: "Next.js App Router",
      time: "Yesterday",
    },
    {
      title: "Portfolio improvement ideas",
      time: "Yesterday",
    },
    {
      title: "MongoDB query optimization",
      time: "2 days ago",
    },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-5">
      <div className="mb-5">
        <div className="mb-2 flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 text-violet-500">
          <History className="size-4" />
        </div>

        <h2 className="text-base font-semibold">Conversation history</h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Continue a previous conversation or start something new.
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {conversations.map((conversation, index) => (
          <button
            key={`${conversation.title}-${index}`}
            type="button"
            className="group flex w-full items-center gap-3 rounded-xl border border-border/50 bg-muted/20 px-3 py-3 text-left transition-all hover:border-violet-500/25 hover:bg-violet-500/5"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm transition-colors group-hover:text-violet-500">
              <MessageSquare className="size-3.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">
                {conversation.title}
              </p>

              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {conversation.time}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}