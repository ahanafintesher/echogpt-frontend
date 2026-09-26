"use client";

import {
  Brain,
  Code2,
  Lightbulb,
  PenLine,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const suggestions = [
  {
    title: "Write something",
    description: "Create emails, articles, stories, and more.",
    icon: PenLine,
    gradient: "from-violet-500/15 to-fuchsia-500/10",
  },
  {
    title: "Build with code",
    description: "Debug, explain, or create your next project.",
    icon: Code2,
    gradient: "from-indigo-500/15 to-cyan-500/10",
  },
  {
    title: "Analyze deeply",
    description: "Break down complex ideas and find insights.",
    icon: Brain,
    gradient: "from-fuchsia-500/15 to-pink-500/10",
  },
  {
    title: "Brainstorm ideas",
    description: "Turn a rough thought into something useful.",
    icon: Lightbulb,
    gradient: "from-amber-500/15 to-orange-500/10",
  },
];

export default function SuggestionCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {suggestions.map((suggestion) => {
        const Icon = suggestion.icon;

        return (
          <Card
            key={suggestion.title}
            className={`group cursor-pointer border-border/60 bg-gradient-to-br ${suggestion.gradient} p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10`}
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background/80 shadow-sm">
                <Icon className="size-5 text-violet-600 transition-transform duration-300 group-hover:scale-110 dark:text-violet-400" />
              </div>

              <div>
                <h3 className="font-semibold">
                  {suggestion.title}
                </h3>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}