"use client";

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

const models = [
  {
    name: "EchoGPT Pro",
    description: "Best for complex tasks",
  },
  {
    name: "EchoGPT Fast",
    description: "Fast responses",
  },
  {
    name: "EchoGPT Creative",
    description: "Writing and creative work",
  },
];

export default function ModelSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 gap-2 px-2 font-medium"
        >
          <Sparkles className="size-4" />
          <span>EchoGPT Pro</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>
          Select model
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {models.map((model) => (
          <DropdownMenuItem
            key={model.name}
            className="flex items-start gap-3 py-3"
          >
            <Sparkles className="mt-0.5 size-4" />

            <div className="flex flex-1 flex-col">
              <span className="font-medium">
                {model.name}
              </span>

              <span className="text-xs text-muted-foreground">
                {model.description}
              </span>
            </div>

            {model.name === "EchoGPT Pro" && (
              <Check className="size-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}