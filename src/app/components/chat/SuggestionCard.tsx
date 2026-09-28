"use client";

import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface SuggestionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
  onClick?: () => void;
}

export default function SuggestionCard({
  title,
  description,
  icon: Icon,
  gradient,
  iconColor,
  onClick,
}: SuggestionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative min-h-[150px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50`}
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-white/20 blur-3xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex size-11 items-center justify-center rounded-xl bg-white/70 shadow-sm backdrop-blur-sm dark:bg-black/20">
            <Icon
              className={`size-5 ${iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]`}
            />
          </div>

          <div className="flex size-8 items-center justify-center rounded-full bg-white/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 dark:bg-black/20">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold tracking-tight">
            {title}
          </h3>

          <p className="mt-1.5 max-w-[240px] text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}