"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BrainCircuit,
  Check,
  Code2,
  FileText,
  Globe2,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type Preview =
  | { type: "chat" }
  | { type: "steps"; steps: readonly string[] }
  | { type: "chips"; chips: readonly string[] };

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  wide?: boolean;
  iconClass: string;
  glow: string;
  preview: Preview;
}

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

const FEATURES: readonly Feature[] = [
  {
    icon: MessageSquare,
    title: "AI Conversations",
    description:
      "Have natural conversations with an AI assistant that helps you think, learn, plan, and solve problems.",
    wide: true,
    iconClass:
      "bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white",
    glow: "bg-violet-500/20",
    preview: { type: "chat" },
  },
  {
    icon: Code2,
    title: "Code Smarter",
    description:
      "Write, debug, explain, and improve code with an AI coding companion.",
    iconClass:
      "bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white",
    glow: "bg-cyan-500/20",
    preview: { type: "chips", chips: ["Debug", "Refactor", "Explain"] },
  },
  {
    icon: FileText,
    title: "Write Better",
    description:
      "Create polished content, rewrite ideas, summarize documents, and refine your writing.",
    iconClass:
      "bg-fuchsia-500/10 text-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white",
    glow: "bg-fuchsia-500/20",
    preview: { type: "chips", chips: ["Rewrite", "Summarize", "Polish"] },
  },
  {
    icon: Globe2,
    title: "Explore the Web",
    description:
      "Search, discover, and understand information without constantly switching between tools.",
    iconClass:
      "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white",
    glow: "bg-blue-500/20",
    preview: { type: "chips", chips: ["Search", "Compare", "Cite"] },
  },
  {
    icon: ImageIcon,
    title: "Create Visually",
    description:
      "Turn ideas into visual concepts and explore creative possibilities with AI.",
    iconClass:
      "bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white",
    glow: "bg-pink-500/20",
    preview: { type: "chips", chips: ["Concepts", "Moodboards", "Variations"] },
  },
  {
    icon: BrainCircuit,
    title: "Think Deeper",
    description:
      "Break down complex problems, analyze information, and discover better ways to approach your work.",
    wide: true,
    iconClass:
      "bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white",
    glow: "bg-indigo-500/20",
    preview: {
      type: "steps",
      steps: ["Define the problem", "Compare approaches", "Pick a next step"],
    },
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* -------------------------------------------------------------------------- */
/*                               Preview blocks                               */
/* -------------------------------------------------------------------------- */

function ChatPreview() {
  return (
    <div aria-hidden className="mt-6 space-y-2.5">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 px-3.5 py-2 text-xs text-white shadow-md shadow-violet-500/20">
        Plan a launch week for my side project
      </div>

      <div className="flex w-fit max-w-[90%] items-start gap-2 rounded-2xl rounded-bl-md border border-border/60 bg-background/70 px-3.5 py-2.5 text-xs text-muted-foreground backdrop-blur">
        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-violet-500" />
        <span>
          Here&apos;s a 5-day plan — start with a teaser on Monday, then ship
          the demo on Wednesday.
        </span>
      </div>

      <div className="flex w-fit items-center gap-1 rounded-full border border-border/60 bg-background/70 px-3 py-2 backdrop-blur">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="size-1.5 animate-bounce rounded-full bg-violet-500/70 motion-reduce:animate-none"
            style={{ animationDelay: `${dot * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function StepsPreview({ steps }: { steps: readonly string[] }) {
  return (
    <ul aria-hidden className="mt-6 grid gap-2 sm:grid-cols-3">
      {steps.map((step, index) => {
        const isActive = index === steps.length - 1;

        return (
          <li
            key={step}
            className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/70 px-3 py-2.5 text-xs backdrop-blur"
          >
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-500"
                  : "bg-indigo-500 text-white"
              }`}
            >
              {isActive ? (
                <span className="size-1.5 animate-pulse rounded-full bg-indigo-500 motion-reduce:animate-none" />
              ) : (
                <Check className="size-3" />
              )}
            </span>
            <span className={isActive ? "font-medium" : "text-muted-foreground"}>
              {step}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ChipsPreview({ chips }: { chips: readonly string[] }) {
  return (
    <div aria-hidden className="mt-6 flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur transition-colors duration-300 group-hover:border-foreground/15 group-hover:text-foreground"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

function FeaturePreview({ preview }: { preview: Preview }) {
  switch (preview.type) {
    case "chat":
      return <ChatPreview />;
    case "steps":
      return <StepsPreview steps={preview.steps} />;
    case "chips":
      return <ChipsPreview chips={preview.chips} />;
  }
}

/* -------------------------------------------------------------------------- */
/*                                Feature card                                */
/* -------------------------------------------------------------------------- */

function FeatureCard({ feature }: { feature: Feature }) {
  const { icon: Icon, title, description, wide, iconClass, glow, preview } =
    feature;

  // Cursor-following spotlight, driven by CSS variables (no re-renders)
  const handleMouseMove = (event: MouseEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.li
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(320px_circle_at_var(--x,50%)_var(--y,0%),rgba(139,92,246,0.10),transparent_65%)] group-hover:opacity-100"
      />

      {/* Corner glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-20 -top-20 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${glow}`}
      />

      {/* Icon */}
      <div
        className={`relative flex size-12 items-center justify-center rounded-2xl transition-all duration-300 ${iconClass}`}
      >
        <Icon className="size-5" aria-hidden />
      </div>

      {/* Content */}
      <div className="relative mt-6">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Preview (pinned to the bottom so cards in a row line up) */}
      <div className="relative mt-auto">
        <FeaturePreview preview={preview} />
      </div>

      {/* Bottom shine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function Features() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative overflow-hidden border-t border-border/50 bg-background py-24 sm:py-32"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-300">
            <Sparkles className="size-3.5" aria-hidden />
            One workspace. Endless possibilities.
          </div>

          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              create with AI
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            From your first idea to the final result, EchoGPT gives you the
            tools to think, create, code, and get more done.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.ul
          variants={containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.ul>

        {/* Bottom highlight */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-4 overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-background to-cyan-500/10 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
                <Zap className="size-5" aria-hidden />
              </div>

              <div>
                <h3 className="font-semibold">
                  AI that fits into your workflow
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                  Use EchoGPT wherever your ideas happen — from conversations
                  to coding and everything in between.
                </p>
              </div>
            </div>

            <div className="shrink-0 text-sm font-medium text-violet-600 dark:text-violet-300">
              Built for modern creators
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}