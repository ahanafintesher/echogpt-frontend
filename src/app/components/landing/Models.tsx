"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  Check,
  Code2,
  Globe2,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

const models = [
  {
    id: "echo",
    name: "EchoGPT",
    label: "Balanced",
    description:
      "A versatile AI model for everyday conversations, writing, analysis, and creative work.",
    icon: Sparkles,
    gradient: "from-violet-600 via-indigo-500 to-cyan-400",
    glow: "bg-violet-500/20",
    capabilities: [
      "General conversations",
      "Writing & analysis",
      "Creative thinking",
      "Everyday tasks",
    ],
  },
  {
    id: "reasoning",
    name: "Reason",
    label: "Deep Thinking",
    description:
      "Built for complex problems, multi-step reasoning, planning, and analytical tasks.",
    icon: BrainCircuit,
    gradient: "from-blue-600 via-violet-500 to-fuchsia-500",
    glow: "bg-blue-500/20",
    capabilities: [
      "Deep reasoning",
      "Problem solving",
      "Complex analysis",
      "Planning",
    ],
  },
  {
    id: "code",
    name: "Code",
    label: "Developer",
    description:
      "Your AI coding partner for debugging, architecture, refactoring, and implementation.",
    icon: Code2,
    gradient: "from-cyan-500 via-blue-500 to-violet-500",
    glow: "bg-cyan-500/20",
    capabilities: [
      "Code generation",
      "Debugging",
      "Refactoring",
      "Architecture",
    ],
  },
  {
    id: "creative",
    name: "Create",
    label: "Creative",
    description:
      "Turn rough ideas into polished content, concepts, stories, and visual directions.",
    icon: ImageIcon,
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
    glow: "bg-fuchsia-500/20",
    capabilities: [
      "Creative writing",
      "Brainstorming",
      "Content creation",
      "Visual ideas",
    ],
  },
  {
    id: "web",
    name: "Explore",
    label: "Web Ready",
    description:
      "Research ideas, explore information, and work with web-powered conversations.",
    icon: Globe2,
    gradient: "from-emerald-500 via-cyan-500 to-blue-500",
    glow: "bg-cyan-500/20",
    capabilities: [
      "Web research",
      "Information discovery",
      "Summarization",
      "Current context",
    ],
  },
];

export default function Models() {
  const [activeModel, setActiveModel] = useState("echo");

  const selectedModel =
    models.find((model) => model.id === activeModel) ?? models[0];

  const SelectedIcon = selectedModel.icon;

  return (
    <section
      id="models"
      className="relative overflow-hidden border-t border-border/40 bg-background py-24 sm:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-1/2 top-1/3 size-[500px] -translate-x-1/2 rounded-full ${selectedModel.glow} opacity-40 blur-[140px] transition-all duration-700`}
        />

        <div className="absolute -left-40 bottom-0 size-[300px] rounded-full bg-fuchsia-500/8 blur-[110px]" />

        <div className="absolute -right-40 top-0 size-[350px] rounded-full bg-cyan-500/8 blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.14)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.14)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-300">
            <Zap className="size-3.5" />
            Powerful AI models
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            The right model for
            <span className="block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              every kind of work.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Switch between specialized AI experiences depending on what you are
            trying to accomplish.
          </p>
        </motion.div>

        {/* Main showcase */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[280px_1fr]">
          {/* Model selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border/60 bg-background/60 p-2 shadow-xl backdrop-blur-xl"
          >
            {models.map((model) => {
              const Icon = model.icon;
              const isActive = model.id === activeModel;

              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setActiveModel(model.id)}
                  className={`group relative mb-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-300 last:mb-0 ${
                    isActive
                      ? "bg-muted/80 shadow-sm"
                      : "hover:bg-muted/40"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-model"
                      className="absolute inset-0 rounded-2xl border border-violet-500/20 bg-violet-500/5"
                    />
                  )}

                  <div
                    className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${model.gradient} shadow-lg`}
                  >
                    <Icon className="size-4 text-white" />
                  </div>

                  <div className="relative z-10 min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {model.name}
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      {model.label}
                    </p>
                  </div>

                  {isActive && (
                    <Check className="relative z-10 ml-auto size-4 text-violet-500" />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative min-h-[440px] overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-2xl backdrop-blur-xl"
          >
            {/* Top glow */}
            <div
              className={`absolute -right-20 -top-20 size-72 rounded-full ${selectedModel.glow} blur-[90px]`}
            />

            {/* Decorative orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="pointer-events-none absolute right-10 top-10 hidden size-40 rounded-full border border-dashed border-violet-500/15 sm:block"
            >
              <span className="absolute -left-1/2 top-1/2 size-2 rounded-full bg-violet-400 shadow-lg shadow-violet-500/70" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedModel.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative flex h-full flex-col justify-between p-7 sm:p-10"
              >
                <div>
                  {/* Model icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedModel.gradient} shadow-xl`}
                    >
                      <SelectedIcon className="size-7 text-white" />
                    </div>

                    <div className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                      {selectedModel.label}
                    </div>
                  </div>

                  <h3 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
                    {selectedModel.name}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {selectedModel.description}
                  </p>
                </div>

                {/* Capabilities */}
                <div className="mt-10">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Capabilities
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {selectedModel.capabilities.map((capability) => (
                      <div
                        key={capability}
                        className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 px-4 py-3"
                      >
                        <div className="flex size-6 items-center justify-center rounded-lg bg-violet-500/10">
                          <Check className="size-3.5 text-violet-500" />
                        </div>

                        <span className="text-sm">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fake prompt */}
                <div className="mt-8 rounded-2xl border border-border/50 bg-muted/30 p-3">
                  <div className="flex items-center gap-3 rounded-xl bg-background/70 px-4 py-3">
                    <MessageSquare className="size-4 text-muted-foreground" />

                    <span className="flex-1 truncate text-sm text-muted-foreground">
                      Ask {selectedModel.name} anything...
                    </span>

                    <div
                      className={`flex size-7 items-center justify-center rounded-lg bg-gradient-to-br ${selectedModel.gradient}`}
                    >
                      <ArrowUpIcon />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-3.5 py-2">
            <Sparkles className="size-3.5 text-violet-500" />
            Multiple AI experiences
          </span>

          <span className="flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-3.5 py-2">
            <Code2 className="size-3.5 text-cyan-500" />
            Built for developers
          </span>

          <span className="flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-3.5 py-2">
            <Globe2 className="size-3.5 text-emerald-500" />
            Web-ready workflows
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="size-3.5 text-white"
      aria-hidden="true"
    >
      <path
        d="M10 14V6M10 6L6.5 9.5M10 6L13.5 9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}