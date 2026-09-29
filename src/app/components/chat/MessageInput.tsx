"use client";

import {
  ArrowUp,
  Globe2,
  ImagePlus,
  Mic,
  Paperclip,
  Square,
  X,
} from "lucide-react";

import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ModelSelector, { type ChatModel } from "./ModelSelector";
export interface Attachment {
  id: string;
  file: File;
  previewUrl?: string;
}

interface MessageInputProps {
  onSend?: (
    message: string,
    attachments: Attachment[],
    model: ChatModel,
  ) => void;

  onStop?: () => void;
  isGenerating?: boolean;
  disabled?: boolean;

  webSearchEnabled?: boolean;
  onToggleWebSearch?: (enabled: boolean) => void;

  placeholder?: string;
  maxLength?: number;

  selectedModel?: ChatModel;
  onModelChange?: (model: ChatModel) => void;
}

const MAX_TEXTAREA_HEIGHT_PX = 240;
const DEFAULT_MAX_LENGTH = 8000;

export default function MessageInput({
  onSend,
  onStop,
  isGenerating = false,
  disabled = false,
  webSearchEnabled = false,
  onToggleWebSearch,
  placeholder = "Ask EchoGPT anything...",
  maxLength = DEFAULT_MAX_LENGTH,
  selectedModel,
  onModelChange,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Default selected model
  const [internalModel, setInternalModel] =
    useState<ChatModel>("gpt-5.6");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Parent controlled model অথবা internal model
  const currentModel = selectedModel ?? internalModel;

  const canSend =
    message.trim().length > 0 &&
    !disabled &&
    !isGenerating;

  const isOverLimit = message.length > maxLength;

  // Model selector change
  const handleModelChange = (model: ChatModel) => {
    setInternalModel(model);
    onModelChange?.(model);
  };

  // Auto resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      MAX_TEXTAREA_HEIGHT_PX,
    )}px`;
  }, [message]);

  // Cleanup attachment preview URLs
  useEffect(() => {
    return () => {
      attachments.forEach((attachment) => {
        if (attachment.previewUrl) {
          URL.revokeObjectURL(attachment.previewUrl);
        }
      });
    };
  }, [attachments]);

  // Send message
  const handleSend = useCallback(() => {
    if (!canSend || isOverLimit) return;

    onSend?.(
      message.trim(),
      attachments,
      currentModel,
    );

    setMessage("");

    setAttachments((prev) => {
      prev.forEach((attachment) => {
        if (attachment.previewUrl) {
          URL.revokeObjectURL(
            attachment.previewUrl,
          );
        }
      });

      return [];
    });

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [
    attachments,
    canSend,
    currentModel,
    isOverLimit,
    message,
    onSend,
  ]);

  // Enter = send
  // Shift + Enter = new line
  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSend();
    }
  };

  // File / image selection
  const handleFilesSelected =
    (kind: "file" | "image") =>
    (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      const files = event.target.files;

      if (!files || files.length === 0) {
        return;
      }

      const newAttachments: Attachment[] =
        Array.from(files).map((file) => ({
          id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
          file,
          previewUrl:
            kind === "image"
              ? URL.createObjectURL(file)
              : undefined,
        }));

      setAttachments((prev) => [
        ...prev,
        ...newAttachments,
      ]);

      event.target.value = "";
    };

  // Remove attachment
  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const target = prev.find(
        (attachment) => attachment.id === id,
      );

      if (target?.previewUrl) {
        URL.revokeObjectURL(
          target.previewUrl,
        );
      }

      return prev.filter(
        (attachment) =>
          attachment.id !== id,
      );
    });
  };

  return (
    <div className="w-full border-t bg-background/80 px-4 pb-4 pt-3 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-4xl">
        <div className="group relative overflow-visible rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300 focus-within:border-violet-400 focus-within:shadow-lg focus-within:shadow-violet-500/10">

          {/* Top gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

          {/* Top controls */}
          <div className="flex items-center gap-1 px-3 pt-2.5">

            {/* Existing ModelSelector component */}
            <ModelSelector
              value={currentModel}
              onChange={handleModelChange}
            />

            {/* Web Search */}
            <div className="ml-auto flex items-center gap-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant={
                      webSearchEnabled
                        ? "secondary"
                        : "ghost"
                    }
                    size="icon"
                    aria-pressed={webSearchEnabled}
                    onClick={() =>
                      onToggleWebSearch?.(
                        !webSearchEnabled,
                      )
                    }
                    className="size-8 rounded-lg text-muted-foreground hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-950/30"
                  >
                    <Globe2 className="size-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Web search
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Attachment previews */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pt-2">
              {attachments.map(
                (attachment) => (
                  <div
                    key={attachment.id}
                    className="group/att relative flex items-center gap-2 rounded-lg border border-border/70 bg-muted/40 px-2 py-1.5 text-xs"
                  >
                    {attachment.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          attachment.previewUrl
                        }
                        alt={
                          attachment.file.name
                        }
                        className="size-6 rounded object-cover"
                      />
                    ) : (
                      <Paperclip className="size-3.5 text-muted-foreground" />
                    )}

                    <span className="max-w-32 truncate">
                      {attachment.file.name}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeAttachment(
                          attachment.id,
                        )
                      }
                      aria-label={`Remove ${attachment.file.name}`}
                      className="rounded-full p-0.5 text-muted-foreground opacity-0 transition-opacity hover:bg-muted group-hover/att:opacity-100"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ),
              )}
            </div>
          )}

          {/* Message textarea */}
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            aria-label="Message"
            aria-invalid={isOverLimit}
            className="min-h-20 resize-none border-0 bg-transparent px-4 py-3 text-sm shadow-none focus-visible:ring-0 sm:text-[15px]"
          />

          {/* Bottom controls */}
          <div className="flex items-center justify-between px-3 pb-3">

            {/* Left controls */}
            <div className="flex min-w-0 items-center gap-1">

              {/* File input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFilesSelected(
                  "file",
                )}
              />

              {/* Image input */}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFilesSelected(
                  "image",
                )}
              />

              {/* Attach file */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="size-8 rounded-lg text-muted-foreground hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-950/30"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Attach file
                </TooltipContent>
              </Tooltip>

              {/* Add image */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onClick={() =>
                      imageInputRef.current?.click()
                    }
                    className="size-8 rounded-lg text-muted-foreground hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-950/30"
                  >
                    <ImagePlus className="size-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Add image
                </TooltipContent>
              </Tooltip>

              <span className="ml-2 hidden text-[11px] text-muted-foreground sm:block">
                Enter to send · Shift + Enter
                for new line
              </span>

              {message.length >
                maxLength * 0.9 && (
                <span
                  className={`ml-2 text-[11px] tabular-nums ${
                    isOverLimit
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.length}/{maxLength}
                </span>
              )}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1">

              {/* Voice */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onClick={() => {
                      window.alert(
                        "Voice input is coming soon.",
                      );
                    }}
                    className="size-8 rounded-lg text-muted-foreground hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-950/30"
                  >
                    <Mic className="size-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  Voice input
                </TooltipContent>
              </Tooltip>

              {/* Stop / Send */}
              {isGenerating ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      onClick={onStop}
                      className="size-9 rounded-xl bg-foreground text-background shadow-md transition-all hover:scale-105"
                    >
                      <Square className="size-3.5 fill-current" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>
                    Stop generating
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  type="button"
                  size="icon"
                  disabled={
                    !canSend ||
                    isOverLimit
                  }
                  onClick={handleSend}
                  aria-label="Send message"
                  className="size-9 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20 transition-all hover:scale-105 hover:from-violet-700 hover:via-indigo-700 hover:to-fuchsia-600 disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowUp className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          EchoGPT can make mistakes. Check
          important information.
        </p>
      </div>
    </div>
  );
}