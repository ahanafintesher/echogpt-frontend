"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="group flex w-full justify-end px-3 py-3 sm:px-6">
      <div className="flex max-w-[85%] items-end gap-2 sm:max-w-[75%]">
        <div className="relative rounded-2xl rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 px-4 py-3 text-sm text-white shadow-lg shadow-violet-500/10">
          <p className="whitespace-pre-wrap leading-6">{content}</p>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="absolute -bottom-9 right-0 size-7 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}

            <span className="sr-only">Copy message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}