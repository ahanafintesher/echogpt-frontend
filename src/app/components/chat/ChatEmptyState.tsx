"use client";

import {
  ArrowUpRight,
  Code2,
  Lightbulb,
  PenLine,
  Sparkles,
} from "lucide-react";

interface ChatEmptyStateProps {
  onPromptSelect?: (prompt: string) => void;
}

const suggestions = [
  {
    title: "Build something",
    description: "Help me create a modern web application",
    icon: Code2,
    prompt:
      "Help me create a modern web application with Next.js and Tailwind CSS.",
  },
  {
    title: "Explore an idea",
    description: "Turn my idea into a clear action plan",
    icon: Lightbulb,
    prompt: "Help me turn my idea into a clear and practical action plan.",
  },
  {
    title: "Write & improve",
    description: "Write, rewrite, or improve my content",
    icon: PenLine,
    prompt: "Help me improve and rewrite this content professionally.",
  },
];

export default function ChatEmptyState({
  onPromptSelect,
}: ChatEmptyStateProps) {
  return (
    <div className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden px-4 py-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-xl shadow-violet-500/20">
            <Sparkles className="size-8 text-white" />
          </div>

          <h2 className="bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            How can I help you?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Ask anything, brainstorm ideas, write code, analyze information,
            or turn your thoughts into something useful.
          </p>
        </div>

        {/* Suggestions */}
        <div className="grid gap-3 sm:grid-cols-3">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;

            return (
              <button
                key={suggestion.title}
                type="button"
                onClick={() => onPromptSelect?.(suggestion.prompt)}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-accent/60 hover:shadow-xl hover:shadow-violet-500/10"
              >
                {/* Hover glow */}
                <div className="absolute -right-8 -top-8 size-20 rounded-full bg-violet-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15">
                      <Icon className="size-4 text-violet-500" />
                    </div>

                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </div>

                  <h3 className="text-sm font-semibold">
                    {suggestion.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom hint */}
        <p className="mt-8 text-center text-xs text-muted-foreground/70">
          Press{" "}
          <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            Enter
          </kbd>{" "}
          to send your message
        </p>
      </div>
    </div>
  );
}