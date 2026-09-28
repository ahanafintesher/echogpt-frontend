"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Check,
  ChevronDown,
  Code2,
  Globe2,
  Sparkles,
  WandSparkles,
} from "lucide-react";

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
  iconBg: string;
}

const models: Model[] = [
  {
    id: "balanced",
    name: "EchoGPT",
    description: "Balanced & versatile",
    icon: Sparkles,
    iconClass: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
  {
    id: "reasoning",
    name: "Deep Thinking",
    description: "Complex reasoning",
    icon: Brain,
    iconClass: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
  },
  {
    id: "code",
    name: "Code",
    description: "Developer focused",
    icon: Code2,
    iconClass: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Writing & ideas",
    icon: WandSparkles,
    iconClass: "text-fuchsia-500",
    iconBg: "bg-fuchsia-500/10",
  },
  {
    id: "web",
    name: "Web Ready",
    description: "Search & research",
    icon: Globe2,
    iconClass: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
  },
];

interface ModelSelectorProps {
  value?: ExtensionModel;
  onChange?: (model: ExtensionModel) => void;
}

export default function ModelSelector({
  value = "balanced",
  onChange,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const selectedModel =
    models.find((model) => model.id === value) ?? models[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (model: ExtensionModel) => {
    onChange?.(model);
    setOpen(false);
  };

  const SelectedIcon = selectedModel.icon;

  return (
    <div ref={selectorRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="group flex h-9 items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-2.5 transition-all hover:border-violet-500/25 hover:bg-muted/40"
      >
        <span
          className={`flex size-6 items-center justify-center rounded-lg ${selectedModel.iconBg} ${selectedModel.iconClass}`}
        >
          <SelectedIcon className="size-3.5" />
        </span>

        <span className="hidden min-w-0 text-left sm:block">
          <span className="block max-w-[90px] truncate text-[10px] font-semibold">
            {selectedModel.name}
          </span>
          <span className="block text-[8px] text-muted-foreground">
            AI model
          </span>
        </span>

        <ChevronDown
          className={`size-3.5 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select AI model"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[230px] overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-1.5 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
        >
          <div className="px-2.5 pb-2 pt-1.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Choose model
            </p>
          </div>

          <div className="space-y-0.5">
            {models.map((model) => {
              const Icon = model.icon;
              const isSelected = selectedModel.id === model.id;

              return (
                <button
                  key={model.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(model.id)}
                  className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors ${
                    isSelected
                      ? "bg-violet-500/10"
                      : "hover:bg-muted/60"
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${model.iconBg} ${model.iconClass}`}
                  >
                    <Icon className="size-4" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold">
                      {model.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[9px] text-muted-foreground">
                      {model.description}
                    </span>
                  </span>

                  {isSelected && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
                      <Check className="size-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-1.5 border-t border-border/40 px-2.5 py-2">
            <p className="text-[8px] leading-4 text-muted-foreground">
              Model selection is ready for AI integration.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}