"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Check,
  Copy,
  Sparkles,
  User,
} from "lucide-react";

import QuickActions from "./QuickActions";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function ExtensionChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleQuickAction = (prompt: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: prompt,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content:
        "I’m ready to help with that. This extension preview is connected and ready for your AI workflow.",
    };

    setMessages((current) => [
      ...current,
      userMessage,
      assistantMessage,
    ]);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {messages.length === 0 ? (
        <EmptyState onQuickAction={handleQuickAction} />
      ) : (
        <MessageList messages={messages} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                               */
/* -------------------------------------------------------------------------- */

interface EmptyStateProps {
  onQuickAction: (prompt: string) => void;
}

function EmptyState({ onQuickAction }: EmptyStateProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* AI Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mb-5"
        >
          <div className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl" />

          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 text-white shadow-xl shadow-violet-500/25"
          >
            <Sparkles className="size-7" />

            <span className="absolute inset-1 rounded-xl border border-white/20" />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-lg font-bold tracking-tight">
            How can I help?
          </h2>

          <p className="mx-auto mt-2 max-w-[290px] text-xs leading-5 text-muted-foreground">
            Ask EchoGPT anything while you browse. Summarize pages, explain
            ideas, write content, or solve code.
          </p>
        </motion.div>

        {/* Quick actions */}
        <div className="mt-6 w-full">
          <p className="mb-2.5 px-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Quick actions
          </p>

          <QuickActions onAction={onQuickAction} />
        </div>
      </div>

      {/* Context hint */}
      <div className="mt-5 flex items-center justify-center gap-1.5 text-[9px] text-muted-foreground">
        <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <Check className="size-2.5" />
        </span>

        EchoGPT can understand the page you're viewing
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Messages                                                                  */
/* -------------------------------------------------------------------------- */

interface MessageListProps {
  messages: Message[];
}

function MessageList({ messages }: MessageListProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Message Bubble                                                            */
/* -------------------------------------------------------------------------- */

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 text-white shadow-sm">
          <Bot className="size-3.5" />
        </div>
      )}

      <div
        className={`max-w-[82%] ${
          isUser
            ? "rounded-2xl rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 px-3.5 py-2.5 text-white shadow-md shadow-violet-500/10"
            : "rounded-2xl rounded-bl-md border border-border/60 bg-muted/40 px-3.5 py-2.5"
        }`}
      >
        <p className="whitespace-pre-wrap text-xs leading-5">
          {content}
        </p>

        {!isUser && (
          <div className="mt-2 flex items-center gap-1 border-t border-border/40 pt-2">
            <button
              type="button"
              aria-label="Copy response"
              className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              <Copy className="size-3" />
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <User className="size-3.5" />
        </div>
      )}
    </motion.div>
  );
}