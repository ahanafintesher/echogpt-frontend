"use client";

import { useState } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";

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
  iconClass: string;
}

const models: Model[] = [
  {
    id: "gpt-5.6",
    name: "GPT-5.6",
    description: "Advanced & balanced",
    iconClass: "text-violet-500",
  },
  {
    id: "gpt-5.6-fast",
    name: "GPT-5.6 Fast",
    description: "Fast responses",
    iconClass: "text-cyan-500",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Thoughtful & capable",
    iconClass: "text-orange-500",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Multimodal AI",
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
    models.find((model) => model.id === selectedId) ?? models[0];

  const handleSelect = (model: ChatModel) => {
    setInternalModel(model);
    onChange?.(model);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 gap-2 rounded-xl px-3"
        >
          <Sparkles
            className={`size-4 ${selectedModel.iconClass}`}
          />

          <span className="hidden text-sm font-medium sm:inline">
            {selectedModel.name}
          </span>

          <ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-64 rounded-xl p-1"
      >
        <DropdownMenuLabel className="px-3 py-2 text-xs text-muted-foreground">
          Select AI Model
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => handleSelect(model.id)}
            className="cursor-pointer rounded-lg p-3"
          >
            <div className="flex w-full items-center gap-3">
              <Sparkles
                className={`size-4 shrink-0 ${model.iconClass}`}
              />

              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">
                  {model.name}
                </span>

                <span className="text-xs text-muted-foreground">
                  {model.description}
                </span>
              </div>

              {selectedId === model.id && (
                <Check className="size-4 text-violet-500" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}