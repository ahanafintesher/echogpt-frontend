"use client";

import { Sparkles } from "lucide-react";

import MessageActions from "./MessageActions";

interface AssistantMessageProps {
  content: string;
  onRegenerate?: () => void;
}

export default function AssistantMessage({
  content,
  onRegenerate,
}: AssistantMessageProps) {
  return (
    <div className="group flex w-full px-3 py-4 sm:px-6">
      <div className="flex w-full max-w-3xl gap-3">
        {/* AI Avatar */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-md shadow-violet-500/20">
          <Sparkles className="size-4 text-white" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-sm font-semibold">EchoGPT</span>

            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-500">
              AI
            </span>
          </div>

          <div className="text-sm leading-7 text-foreground/90">
            <p className="whitespace-pre-wrap">{content}</p>
          </div>

          <MessageActions
            content={content}
            onRegenerate={onRegenerate}
          />
        </div>
      </div>
    </div>
  );
}