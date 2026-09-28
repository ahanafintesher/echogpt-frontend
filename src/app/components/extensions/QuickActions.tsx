"use client";

import {
  Code2,
  FileText,
  Languages,
  PenLine,
  Search,
  Sparkles,
} from "lucide-react";

interface QuickAction {
  label: string;
  description: string;
  prompt: string;
  icon: typeof Sparkles;
  iconClass: string;
  iconBg: string;
}

const quickActions: QuickAction[] = [
  {
    label: "Summarize",
    description: "Get the key points",
    prompt: "Summarize this page and give me the key points.",
    icon: FileText,
    iconClass: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
  {
    label: "Rewrite",
    description: "Improve this text",
    prompt: "Rewrite this content to make it clearer and more professional.",
    icon: PenLine,
    iconClass: "text-fuchsia-500",
    iconBg: "bg-fuchsia-500/10",
  },
  {
    label: "Explain",
    description: "Make it simple",
    prompt: "Explain this page in simple terms that are easy to understand.",
    icon: Sparkles,
    iconClass: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
  },
  {
    label: "Code",
    description: "Analyze the code",
    prompt: "Analyze the code on this page and suggest improvements.",
    icon: Code2,
    iconClass: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
  },
  {
    label: "Research",
    description: "Explore the topic",
    prompt: "Research the main topic of this page and provide useful insights.",
    icon: Search,
    iconClass: "text-amber-500",
    iconBg: "bg-amber-500/10",
  },
  {
    label: "Translate",
    description: "Translate content",
    prompt: "Translate the important content of this page into English.",
    icon: Languages,
    iconClass: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
  },
];

interface QuickActionsProps {
  onAction: (prompt: string) => void;
}

export default function QuickActions({
  onAction,
}: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {quickActions.map((action, index) => {
        const Icon = action.icon;

        return (
          <button
            key={action.label}
            type="button"
            onClick={() => onAction(action.prompt)}
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-background/60 p-3 text-left backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/25 hover:bg-muted/40 hover:shadow-md hover:shadow-violet-500/5 active:translate-y-0"
          >
            {/* Hover glow */}
            <div
              aria-hidden
              className={`pointer-events-none absolute -right-5 -top-5 size-16 rounded-full ${action.iconBg} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
            />

            <div className="relative">
              <div
                className={`mb-2 flex size-8 items-center justify-center rounded-lg ${action.iconBg} ${action.iconClass} transition-transform duration-200 group-hover:scale-105`}
              >
                <Icon className="size-4" />
              </div>

              <p className="text-[11px] font-semibold">
                {action.label}
              </p>

              <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                {action.description}
              </p>
            </div>

            {/* Index indicator */}
            <span className="absolute right-2.5 top-2.5 text-[8px] font-medium text-muted-foreground/40">
              0{index + 1}
            </span>
          </button>
        );
      })}
    </div>
  );
}