"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Check,
  Layers3,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const reasons = [
  {
    icon: Layers3,
    title: "One workspace",
    description:
      "Keep conversations, ideas, code, research, and creative work together instead of jumping between different tools.",
    size: "large",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description:
      "A focused interface keeps your AI workflow fast, simple, and distraction-free.",
    size: "small",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: BrainCircuit,
    title: "Think with context",
    description:
      "Move from a simple question to deeper analysis without losing the conversation.",
    size: "small",
    gradient: "from-fuchsia-500 to-violet-500",
  },
  {
    icon: MousePointer2,
    title: "AI where you work",
    description:
      "Use EchoGPT from your workspace or bring AI assistance directly into your browser with the extension.",
    size: "large",
    gradient: "from-indigo-500 to-cyan-400",
  },
];

const principles = [
  "Simple enough for everyday use",
  "Powerful enough for complex work",
  "Flexible across different workflows",
  "Designed around the user",
];

export default function WhyEchoGPT() {
  return (
    <section
      id="why-echogpt"
      className="relative overflow-hidden border-t border-border/40 bg-background py-24 sm:py-28"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 size-[400px] rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute right-0 bottom-1/4 size-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.13)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.13)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-300">
              <Sparkles className="size-3.5" />
              Why EchoGPT
            </div>

            <h2 className="max-w-3xl text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              AI should fit
              <span className="block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                the way you work.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl text-base leading-7 text-muted-foreground lg:pb-1 lg:text-lg"
          >
            EchoGPT brings powerful AI capabilities into a focused experience
            designed to help you move from idea to execution with less friction.
          </motion.p>
        </div>

        {/* Bento cards */}
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/65 p-6 shadow-xl backdrop-blur-xl sm:p-8"
              >
                {/* Hover glow */}
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-gradient-to-br ${reason.gradient} opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-20`}
                />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${reason.gradient} shadow-lg`}
                      >
                        <Icon className="size-5 text-white" />
                      </div>

                      <div className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover:border-violet-500/30 group-hover:text-violet-500">
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    <h3 className="mt-7 text-xl font-semibold tracking-tight sm:text-2xl">
                      {reason.title}
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                      {reason.description}
                    </p>
                  </div>

                  {/* Decorative line */}
                  <div className="mt-8 h-px w-full overflow-hidden bg-border/50">
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + index * 0.1,
                      }}
                      className={`h-full w-1/3 bg-gradient-to-r ${reason.gradient}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom principle panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 overflow-hidden rounded-3xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.07] via-background/70 to-cyan-500/[0.07] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <div>
              <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10">
                <ShieldCheck className="size-5 text-violet-500" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Designed around your workflow
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                From quick questions to focused projects, EchoGPT keeps the
                experience flexible without making it complicated.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="flex items-center gap-3 rounded-2xl border border-border/50 bg-background/60 px-4 py-4"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                    <Check className="size-3.5 text-violet-500" />
                  </div>

                  <span className="text-sm font-medium">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}