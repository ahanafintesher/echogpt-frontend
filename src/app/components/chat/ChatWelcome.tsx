"use client";

import {
  Code2,
  ImageIcon,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import SuggestionCard from "./SuggestionCard";

export default function ChatWelcome() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Welcome */}
        <div className="mb-10 text-center">
          <div className="relative mx-auto mb-6 flex size-16 items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-400/20 blur-xl" />

            <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
              <Sparkles className="size-7" />
            </div>
          </div>

          <p className="mb-3 text-sm font-medium text-violet-600 dark:text-violet-400">
            YOUR AI WORKSPACE
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your ideas,
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              {" "}
              amplified.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Ask questions, explore ideas, write, code, analyze, and create
            something remarkable with EchoGPT.
          </p>
        </div>

        {/* Suggestions */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SuggestionCard
            title="Brainstorm ideas"
            description="Turn a simple thought into creative possibilities."
            icon={Lightbulb}
            gradient="from-amber-400/20 via-orange-400/10 to-rose-400/20"
            iconColor="text-amber-500"
          />

          <SuggestionCard
            title="Write something"
            description="Create emails, stories, posts, and polished content."
            icon={Sparkles}
            gradient="from-violet-500/20 via-fuchsia-400/10 to-pink-400/20"
            iconColor="text-fuchsia-500"
          />

          <SuggestionCard
            title="Build with code"
            description="Debug, explain, refactor, or build your next feature."
            icon={Code2}
            gradient="from-blue-500/20 via-cyan-400/10 to-indigo-400/20"
            iconColor="text-blue-500"
          />

          <SuggestionCard
            title="Create visuals"
            description="Explore ideas for images, designs, and visual concepts."
            icon={ImageIcon}
            gradient="from-emerald-400/20 via-teal-400/10 to-cyan-400/20"
            iconColor="text-emerald-500"
          />
        </div>
      </div>
    </section>
  );
}