"use client";

import { useState } from "react";
import {
  Brain,
  Check,
  ChevronDown,
  Code2,
  Globe2,
  PenLine,
  Sparkles,
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

export type ExtensionModel =
  | "balanced"
  | "reasoning"
  | "code"
  | "creative"
  | "web";

interface Model {
  id: ExtensionModel;
  name: string;
  description: string;
  icon: typeof Sparkles;
  iconClass: string;
}

const models: Model[] = [
  {
    id: "balanced",
    name: "Balanced",
    description: "Everyday AI assistance",
    icon: Sparkles,
    iconClass: "text-violet-500",
  },
  {
    id: "reasoning",
    name: "Deep Thinking",
    description: "Complex reasoning and analysis",
    icon: Brain,
    iconClass: "text-blue-500",
  },
  {
    id: "code",
    name: "Code",
    description: "Programming and debugging",
    icon: Code2,
    iconClass: "text-cyan-500",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Writing and creative work",
    icon: PenLine,
    iconClass: "text-fuchsia-500",
  },
  {
    id: "web",
    name: "Web",
    description: "Search and web-aware answers",
    icon: Globe2,
    iconClass: "text-emerald-500",
  },
];

interface ModelSelectorProps {
  value?: ExtensionModel;
  onChange?: (model: ExtensionModel) => void;
}

export default function ModelSelector({
  value,
  onChange,
}: ModelSelectorProps) {
  const [internalModel, setInternalModel] =
    useState<ExtensionModel>("balanced");

  const selectedId = value ?? internalModel;

  const selectedModel =
    models.find((model) => model.id === selectedId) ?? models[0];

  const SelectedIcon = selectedModel.icon;

  const handleSelect = (model: ExtensionModel) => {
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
          <SelectedIcon
            className={`size-4 ${selectedModel.iconClass}`}
          />

          <span className="text-sm font-medium">
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

        {models.map((model) => {
          const Icon = model.icon;

          return (
            <DropdownMenuItem
              key={model.id}
              onClick={() => handleSelect(model.id)}
              className="cursor-pointer rounded-lg p-3"
            >
              <div className="flex w-full items-center gap-3">
                <Icon
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
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}