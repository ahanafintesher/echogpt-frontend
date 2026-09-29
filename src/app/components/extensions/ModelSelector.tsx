"use client";

import { useState } from "react";
import {
  Brain,
  Check,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ChatModel =
  | "gpt-5.6"
  | "gpt-5.6-fast"
  | "claude"
  | "gemini";

interface Model {
  id: ChatModel;
  name: string;
  description: string;
  icon: typeof Sparkles;
  iconClass: string;
}

const models: Model[] = [
  {
    id: "gpt-5.6",
    name: "GPT-5.6",
    description: "Advanced & balanced",
    icon: Sparkles,
    iconClass: "text-violet-500",
  },
  {
    id: "gpt-5.6-fast",
    name: "GPT-5.6 Fast",
    description: "Fast responses",
    icon: Zap,
    iconClass: "text-cyan-500",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Thoughtful & capable",
    icon: Brain,
    iconClass: "text-orange-500",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Multimodal AI",
    icon: Sparkles,
    iconClass: "text-blue-500",
  },
];

interface ModelSelectorProps {
  value?: ChatModel;
  onChange?: (model: ChatModel) => void;
}

export default function ModelSelector({
  value,
  onChange,
}: ModelSelectorProps) {
  const [internalModel, setInternalModel] =
    useState<ChatModel>("gpt-5.6");

  const selectedId = value ?? internalModel;

  const selectedModel =
    models.find((model) => model.id === selectedId) ??
    models[0];

  const handleSelect = (model: ChatModel) => {
    setInternalModel(model);
    onChange?.(model);
  };

  const SelectedIcon = selectedModel.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 max-w-[190px] gap-1.5 rounded-lg px-2 text-xs font-medium hover:bg-muted/70"
        >
          <SelectedIcon
            className={`size-3.5 shrink-0 ${selectedModel.iconClass}`}
          />

          <span className="truncate">
            {selectedModel.name}
          </span>

          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        side="top"
        sideOffset={8}
        className="z-[100] w-64"
      >
        <DropdownMenuLabel>
          Select AI model
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {models.map((model) => {
          const Icon = model.icon;
          const isSelected =
            selectedModel.id === model.id;

          return (
            <DropdownMenuItem
              key={model.id}
              onSelect={() =>
                handleSelect(model.id)
              }
              className="flex cursor-pointer items-start gap-3 py-3"
            >
              <Icon
                className={`mt-0.5 size-4 shrink-0 ${model.iconClass}`}
              />

              <div className="flex min-w-0 flex-1 flex-col">
                <span className="font-medium">
                  {model.name}
                </span>

                <span className="text-xs text-muted-foreground">
                  {model.description}
                </span>
              </div>

              {isSelected && (
                <Check className="mt-0.5 size-4 shrink-0 text-violet-500" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}