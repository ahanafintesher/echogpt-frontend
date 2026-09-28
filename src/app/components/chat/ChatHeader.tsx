"use client";

import {
  Check,
  ChevronDown,
  Download,
  MoreHorizontal,
  PanelLeft,
  Pencil,
  Share2,
  Sparkles,
  Trash2,
} from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Separator } from "@/components/ui/separator";

import type { Message } from "./ChatMessages";

interface ChatHeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  messages?: Message[];
}

const models = [
  {
    name: "GPT-5.6",
    description: "Most capable",
  },
  {
    name: "GPT-5.6 Fast",
    description: "Fast & efficient",
  },
  {
    name: "Gemini",
    description: "Google AI",
  },
  {
    name: "Claude",
    description: "Anthropic AI",
  },
];

export default function ChatHeader({
  title = "New Chat",
  onToggleSidebar,
  onRename,
  onDelete,
  messages = [],
}: ChatHeaderProps) {
  const [activeModel, setActiveModel] = useState(models[0]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `EchoGPT conversation: ${title}`,
      );

      window.alert("Conversation link copied.");
    } catch {
      window.alert("Unable to copy conversation link.");
    }
  };

  const handleExport = () => {
    const content = messages
      .map(
        (message) =>
          `${message.role.toUpperCase()}\n${message.content}`,
      )
      .join("\n\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${title || "echogpt-chat"}.txt`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/75 px-3 backdrop-blur-xl sm:px-5">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              className="size-9 rounded-xl"
            >
              <PanelLeft className="size-[18px]" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            Toggle sidebar
          </TooltipContent>
        </Tooltip>

        <Separator
          orientation="vertical"
          className="mx-1 hidden h-10 sm:block"
        />

        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-sm shadow-indigo-500/20 sm:flex">
            <Sparkles className="size-4 text-white" />
          </div>

          <div className="min-w-0">
            <h1 className="max-w-[140px] truncate text-sm font-semibold tracking-tight sm:max-w-[220px]">
              {title}
            </h1>

            <p className="hidden text-[11px] text-muted-foreground sm:block">
              AI conversation
            </p>
          </div>
        </div>
      </div>

      {/* Model Selector */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 gap-2 rounded-xl px-2.5 text-sm font-medium hover:bg-accent sm:px-3"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
              </span>

              <span className="max-w-[80px] truncate sm:max-w-[110px]">
                {activeModel.name}
              </span>

              <ChevronDown className="size-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            className="w-64 rounded-2xl p-2"
          >
            <div className="px-2 py-2">
              <p className="text-xs font-medium text-muted-foreground">
                Select model
              </p>
            </div>

            {models.map((model) => (
              <DropdownMenuItem
                key={model.name}
                onClick={() => setActiveModel(model)}
                className="cursor-pointer rounded-xl p-2.5"
              >
                <div className="flex w-full items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/15 to-cyan-500/15">
                    <Sparkles className="size-4 text-violet-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">
                      {model.name}
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      {model.description}
                    </p>
                  </div>

                  {activeModel.name === model.name && (
                    <Check className="size-4 text-violet-500" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="hidden h-9 gap-2 rounded-xl px-3 text-muted-foreground hover:text-foreground sm:flex"
            >
              <Share2 className="size-4" />
              <span className="text-xs">Share</span>
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            Share conversation
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <MoreHorizontal className="size-[18px]" />
              <span className="sr-only">
                More options
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 rounded-2xl p-2"
          >
            <DropdownMenuItem
              onClick={onRename}
              disabled={!onRename}
              className="cursor-pointer gap-2 rounded-xl"
            >
              <Pencil className="size-4" />
              Rename chat
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleExport}
              disabled={messages.length === 0}
              className="cursor-pointer gap-2 rounded-xl"
            >
              <Download className="size-4" />
              Export chat
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onDelete}
              disabled={!onDelete}
              className="cursor-pointer gap-2 rounded-xl text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4" />
              Delete chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}