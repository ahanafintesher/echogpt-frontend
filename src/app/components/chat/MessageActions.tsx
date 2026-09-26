"use client";

import {
  Check,
  Copy,
  MoreHorizontal,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
}

export default function MessageActions({
  content,
  onRegenerate,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked((prev) => !prev);
    setLiked(false);
  };

  return (
    <div className="mt-2 flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
      >
        {copied ? (
          <Check className="size-3.5 text-emerald-500" />
        ) : (
          <Copy className="size-3.5" />
        )}

        <span className="sr-only">Copy response</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onRegenerate}
        className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
      >
        <RefreshCw className="size-3.5" />
        <span className="sr-only">Regenerate response</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleLike}
        className={`size-8 rounded-lg ${
          liked
            ? "bg-emerald-500/10 text-emerald-500"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ThumbsUp className="size-3.5" />
        <span className="sr-only">Like response</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDislike}
        className={`size-8 rounded-lg ${
          disliked
            ? "bg-red-500/10 text-red-500"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ThumbsDown className="size-3.5" />
        <span className="sr-only">Dislike response</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
      >
        <MoreHorizontal className="size-3.5" />
        <span className="sr-only">More actions</span>
      </Button>
    </div>
  );
}