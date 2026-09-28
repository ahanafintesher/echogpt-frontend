"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import {
  Brain,
  Check,
  ChevronDown,
  Gem,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ExtensionModel =
  | "gpt-5.6"
  | "gpt-5.6-fast"
  | "claude"
  | "gemini";

interface Model {
  id: ExtensionModel;
  name: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
  iconBg: string;
}

const DEFAULT_MODEL: ExtensionModel = "gpt-5.6";

const DROPDOWN_WIDTH = 245;
const VIEWPORT_GAP = 8;
const MIN_DROPDOWN_HEIGHT = 160;

const models: Model[] = [
  {
    id: "gpt-5.6",
    name: "GPT-5.6",
    description: "Advanced & balanced",
    icon: Sparkles,
    iconClass: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
  {
    id: "gpt-5.6-fast",
    name: "GPT-5.6 Fast",
    description: "Fast responses",
    icon: Zap,
    iconClass: "text-cyan-500",
    iconBg: "bg-cyan-500/10",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Thoughtful & capable",
    icon: Brain,
    iconClass: "text-orange-500",
    iconBg: "bg-orange-500/10",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Multimodal AI",
    icon: Gem,
    iconClass: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
];

interface ModelSelectorProps {
  /** Controlled value. না দিলে component নিজের state ব্যবহার করবে। */
  value?: ExtensionModel;
  /** Uncontrolled mode-এর initial value। */
  defaultValue?: ExtensionModel;
  onChange?: (model: ExtensionModel) => void;
}

export default function ModelSelector({
  value,
  defaultValue = DEFAULT_MODEL,
  onChange,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [internalValue, setInternalValue] =
    useState<ExtensionModel>(defaultValue);
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});

  const selectorRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const listboxId = useId();

  const currentValue = value ?? internalValue;
  const selectedModel =
    models.find((model) => model.id === currentValue) ?? models[0];

  // Portal শুধু client-এ render হবে (SSR safe)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger-এর উপরে/নিচে জায়গা মেপে dropdown-এর position ঠিক করা
  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const width = Math.min(DROPDOWN_WIDTH, viewportWidth - VIEWPORT_GAP * 2);

    const left = Math.max(
      VIEWPORT_GAP,
      Math.min(rect.left, viewportWidth - width - VIEWPORT_GAP),
    );

    const spaceAbove = rect.top - VIEWPORT_GAP * 2;
    const spaceBelow = viewportHeight - rect.bottom - VIEWPORT_GAP * 2;

    const openAbove = spaceAbove >= spaceBelow;
    const available = Math.max(
      MIN_DROPDOWN_HEIGHT,
      openAbove ? spaceAbove : spaceBelow,
    );

    setDropdownStyle(
      openAbove
        ? {
            position: "fixed",
            left,
            width,
            bottom: viewportHeight - rect.top + VIEWPORT_GAP,
            maxHeight: available,
          }
        : {
            position: "fixed",
            left,
            width,
            top: rect.bottom + VIEWPORT_GAP,
            maxHeight: available,
          },
    );
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  // Outside click / touch
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        selectorRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  // Dropdown খুললে selected option-এ focus
  useEffect(() => {
    if (!open) return;

    const index = models.findIndex((model) => model.id === selectedModel.id);
    optionRefs.current[index]?.focus({ preventScroll: false });
  }, [open, selectedModel.id]);

  const closeAndRefocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleSelect = (model: ExtensionModel) => {
    if (value === undefined) {
      setInternalValue(model);
    }

    onChange?.(model);
    closeAndRefocus();
  };

  const focusOption = (index: number) => {
    const total = models.length;
    optionRefs.current[(index + total) % total]?.focus();
  };

  // Portal হলেও React event parent-এ bubble করে, তাই এটা কাজ করবে
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeAndRefocus();
      return;
    }

    if (!open) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }

    const currentIndex = optionRefs.current.findIndex(
      (option) => option === document.activeElement,
    );

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusOption(currentIndex + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusOption(currentIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusOption(0);
        break;
      case "End":
        event.preventDefault();
        focusOption(models.length - 1);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  const SelectedIcon = selectedModel.icon;

  return (
    <div
      ref={selectorRef}
      onKeyDown={handleKeyDown}
      className="relative min-w-0"
    >
      {/* Selected model button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        className="group flex h-9 max-w-[145px] items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-2.5 transition-all hover:border-violet-500/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
      >
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-lg ${selectedModel.iconBg} ${selectedModel.iconClass}`}
        >
          <SelectedIcon className="size-3.5" />
        </span>

        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-[10px] font-semibold">
            {selectedModel.name}
          </span>

          <span className="block text-[8px] text-muted-foreground">
            AI model
          </span>
        </span>

        <ChevronDown
          className={`size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown (portal → parent-এর overflow-hidden কাটতে পারবে না) */}
      {mounted &&
        open &&
        createPortal(
          <div
            ref={dropdownRef}
            id={listboxId}
            role="listbox"
            aria-label="Select AI model"
            style={dropdownStyle}
            className="z-[9999] flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-1.5 text-foreground shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
          >
            {/* Dropdown header */}
            <div className="shrink-0 px-2.5 pb-2 pt-1.5">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Choose AI Model
              </p>
            </div>

            {/* Model list (জায়গা কম হলে scroll করবে) */}
            <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-contain">
              {models.map((model, index) => {
                const Icon = model.icon;
                const isSelected = selectedModel.id === model.id;

                return (
                  <button
                    key={model.id}
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    onClick={() => handleSelect(model.id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 ${
                      isSelected ? "bg-violet-500/10" : "hover:bg-muted/60"
                    }`}
                  >
                    {/* Model icon */}
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${model.iconBg} ${model.iconClass}`}
                    >
                      <Icon className="size-4" />
                    </span>

                    {/* Model information */}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-[10px] font-semibold">
                          {model.name}
                        </span>

                        {model.id === DEFAULT_MODEL && (
                          <span className="shrink-0 rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[7px] font-medium text-violet-500">
                            Default
                          </span>
                        )}
                      </span>

                      <span className="mt-0.5 block truncate text-[9px] text-muted-foreground">
                        {model.description}
                      </span>
                    </span>

                    {/* Selected check */}
                    {isSelected && (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white shadow-sm shadow-violet-500/30">
                        <Check className="size-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-1.5 shrink-0 border-t border-border/40 px-2.5 py-2">
              <p className="text-[8px] leading-4 text-muted-foreground">
                Select a model for your current task.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}