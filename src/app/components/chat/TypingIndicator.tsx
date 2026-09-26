"use client";

import { Sparkles } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex w-full px-3 py-4 sm:px-6">
      <div className="flex w-full max-w-3xl gap-3">
        {/* AI Avatar */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-md shadow-violet-500/20">
          <Sparkles className="size-4 text-white" />
        </div>

        {/* Typing bubble */}
        <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-border/60 bg-muted/40 px-4 py-3">
          <span
            className="size-1.5 animate-bounce rounded-full bg-violet-500"
            style={{ animationDelay: "0ms" }}
          />

          <span
            className="size-1.5 animate-bounce rounded-full bg-indigo-500"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="size-1.5 animate-bounce rounded-full bg-cyan-500"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}