"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import {
  ArrowUp,
  Globe2,
  Paperclip,
  Sparkles,
} from "lucide-react";

import ModelSelector, {
  ExtensionModel,
} from "./ModelSelector";

interface ExtensionPromptProps {
  onSubmit?: (prompt: string, model: ExtensionModel) => void;
}

const MAX_LENGTH = 2000;

export default function ExtensionPrompt({
  onSubmit,
}: ExtensionPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<ExtensionModel>("balanced");
  const [isFocused, setIsFocused] = useState(false);
  const [pageContext, setPageContext] = useState(false);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();

    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) return;

    onSubmit?.(trimmedPrompt, model);
    setPrompt("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const canSend = prompt.trim().length > 0;

  return (
    <div className="border-t border-border/40 bg-background/80 p-3 backdrop-blur-xl">
      <form onSubmit={handleSubmit}>
        <div
          className={`relative overflow-hidden rounded-2xl border transition-all duration-200 ${
            isFocused
              ? "border-violet-500/40 bg-background shadow-lg shadow-violet-500/5"
              : "border-border/60 bg-muted/20"
          }`}
        >
          {/* Top glow */}
          <div
            className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent transition-opacity ${
              isFocused ? "opacity-100" : "opacity-0"
            }`}
          />

          <textarea
            value={prompt}
            onChange={(event) =>
              setPrompt(event.target.value.slice(0, MAX_LENGTH))
            }
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask EchoGPT anything..."
            rows={3}
            aria-label="Ask EchoGPT"
            className="min-h-[78px] w-full resize-none bg-transparent px-3.5 pb-2 pt-3.5 text-xs leading-5 outline-none placeholder:text-muted-foreground/60"
          />

          {/* Composer footer */}
          <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5">
            <div className="flex min-w-0 items-center gap-1.5">
              {/* Model selector */}
              <ModelSelector
                value={model}
                onChange={setModel}
              />

              {/* Page context */}
              <button
                type="button"
                onClick={() => setPageContext((current) => !current)}
                aria-pressed={pageContext}
                title={
                  pageContext
                    ? "Page context enabled"
                    : "Use page context"
                }
                className={`flex size-9 items-center justify-center rounded-xl border transition-all ${
                  pageContext
                    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-500"
                    : "border-border/60 bg-background/60 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Globe2 className="size-4" />
              </button>

              {/* Attachment */}
              <button
                type="button"
                title="Attach file"
                className="hidden size-9 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground sm:flex"
              >
                <Paperclip className="size-4" />
              </button>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden text-[8px] tabular-nums text-muted-foreground sm:block">
                {prompt.length}/{MAX_LENGTH}
              </span>

              <button
                type="submit"
                disabled={!canSend}
                aria-label="Send message"
                className={`group relative flex size-9 items-center justify-center overflow-hidden rounded-xl transition-all ${
                  canSend
                    ? "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20 hover:scale-105"
                    : "cursor-not-allowed bg-muted text-muted-foreground"
                }`}
              >
                {canSend && (
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                )}

                <ArrowUp className="relative size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-2 flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
            <Sparkles className="size-2.5 text-violet-500" />
            <span>
              {pageContext
                ? "Using this page as context"
                : "AI-powered assistance"}
            </span>
          </div>

          <span className="text-[8px] text-muted-foreground">
            Enter to send · Shift + Enter for new line
          </span>
        </div>
      </form>
    </div>
  );
}