"use client";

import {
  Brain,
  Code2,
  Lightbulb,
  PenLine,
  Sparkles,
} from "lucide-react";

import SuggestionCard from "./SuggestionCard";

interface ChatEmptyStateProps {
  onPromptSelect?: (prompt: string) => void;
}

const suggestions = [
  {
    title: "Write something",
    description: "Create emails, articles, stories, and more.",
    icon: PenLine,
    gradient: "from-violet-500/25 via-fuchsia-500/15 to-pink-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
    prompt:
      "Help me write a professional email about a project update.",
  },
  {
    title: "Build with code",
    description: "Debug, explain, or create your next project.",
    icon: Code2,
    gradient: "from-blue-500/25 via-cyan-500/15 to-teal-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    prompt:
      "Help me build a modern Next.js application with Tailwind CSS.",
  },
  {
    title: "Analyze deeply",
    description: "Break down complex ideas and find useful insights.",
    icon: Brain,
    gradient: "from-fuchsia-500/25 via-purple-500/15 to-indigo-500/10",
    iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
    prompt:
      "Analyze this problem and explain the best solution step by step.",
  },
  {
    title: "Brainstorm ideas",
    description: "Turn a rough thought into something practical.",
    icon: Lightbulb,
    gradient: "from-amber-500/25 via-orange-500/15 to-yellow-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    prompt:
      "Help me brainstorm some creative ideas for my next project.",
  },
];

export default function ChatEmptyState({
  onPromptSelect,
}: ChatEmptyStateProps) {
  return (
    <div className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[110px] sm:size-[500px]" />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Hero */}
        <div className="mb-9 text-center sm:mb-11">
          <div className="relative mx-auto mb-5 flex size-16 items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 opacity-30 blur-xl" />

            <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-xl shadow-violet-500/20">
              <Sparkles className="size-8 text-white" />
            </div>
          </div>

          <h2 className="bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            How can I help you?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Ask anything, brainstorm ideas, write code, analyze information,
            or turn your thoughts into something useful.
          </p>
        </div>

        {/* Suggestion Cards — 2 × 2 */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.title}
              title={suggestion.title}
              description={suggestion.description}
              icon={suggestion.icon}
              gradient={suggestion.gradient}
              iconColor={suggestion.iconColor}
              onClick={() => onPromptSelect?.(suggestion.prompt)}
            />
          ))}
        </div>

        {/* Footer hint */}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
          <span className="size-1.5 rounded-full bg-violet-500/60" />
          <span>Start a conversation by typing a message below</span>
        </div>
      </div>
    </div>
  );
}