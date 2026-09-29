"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Code2,
  FileText,
  Image as ImageIcon,
  Sparkles,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

interface FloatingItem {
  icon: LucideIcon;
  label: string;
  className: string;
  delay: number;
}

const FLOATING_ITEMS: readonly FloatingItem[] = [
  {
    icon: Code2,
    label: "Code",
    className: "left-0 top-10 sm:-left-4",
    delay: 0.6,
  },
  {
    icon: ImageIcon,
    label: "Create",
    className: "right-0 top-20 sm:-right-4",
    delay: 0.8,
  },
  {
    icon: FileText,
    label: "Write",
    className: "bottom-24 left-4 sm:left-8",
    delay: 1,
  },
];

const WORDS = ["Think", "Create", "Build"] as const;
const LONGEST_WORD = WORDS.reduce((a, b) => (b.length > a.length ? b : a));

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const loop = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut",
});

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

function useTypewriter(
  words: readonly string[],
  enabled: boolean,
  typeSpeed = 110,
  deleteSpeed = 60,
  pause = 1400,
): string {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled) return;

    const current = words[wordIndex];
    const isComplete = !isDeleting && text === current;
    const isEmpty = isDeleting && text === "";

    let delay = isDeleting ? deleteSpeed : typeSpeed;
    if (isComplete) delay = pause;

    const timer = setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
      } else if (isEmpty) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        const nextLength = text.length + (isDeleting ? -1 : 1);
        setText(current.slice(0, nextLength));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [
    enabled,
    words,
    wordIndex,
    text,
    isDeleting,
    typeSpeed,
    deleteSpeed,
    pause,
  ]);

  return enabled ? text : words[0];
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const typedText = useTypewriter(WORDS, !prefersReducedMotion);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-background"
    >
      {/* Background gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15%] size-[600px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[120px]" />
        <div className="absolute -left-32 top-1/3 size-[350px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 size-[400px] rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      {/* Grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.18)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.18)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-background to-transparent"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ------------------------------ LEFT ------------------------------ */}
          <div className="max-w-2xl text-center lg:text-left">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-xs font-medium text-violet-600 shadow-sm shadow-violet-500/5 backdrop-blur-sm dark:text-violet-300 lg:mx-0">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-500 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-violet-500" />
                </span>
                Your intelligent AI workspace
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="mt-7 text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
            >
              {/* Screen readers get the stable phrase, not the typing effect */}
              <span className="sr-only">Think, Create, Build with AI.</span>

              <span aria-hidden className="block">
                {/* Fixed-size box: invisible longest word reserves width + height,
                    so the layout never changes while typing or deleting. */}
                <span className="inline-grid bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400 bg-clip-text text-left text-transparent">
                  <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
                    {LONGEST_WORD}
                    <span className="ml-1 inline-block w-[3px]" />
                  </span>

                  <span className="col-start-1 row-start-1 whitespace-nowrap">
                    {typedText}
                    {/* Cursor sits on the text baseline, same height as the letters */}
                    <span className="ml-1 inline-block h-[0.72em] w-[3px] animate-pulse rounded-full bg-violet-500 align-baseline motion-reduce:animate-none" />
                  </span>
                </span>

                <span className="block text-foreground">with AI.</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0"
            >
              EchoGPT brings powerful AI tools into one beautiful workspace.
              Write, code, analyze, brainstorm, and get things done faster.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
             <Link href={"/chat"}>
              <Button
                size="lg"
                className="group h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/30 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
              >
                Start chatting
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

             </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl border-border/70 bg-background/60 px-6 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/40 hover:bg-violet-500/5 sm:w-auto"
              >
                Explore features
              </Button>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex items-center justify-center gap-6 text-xs text-muted-foreground lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-violet-500" />
                AI-powered
              </div>

              <div aria-hidden className="h-3 w-px bg-border" />

              <div className="flex items-center gap-2">
                <WandSparkles className="size-3.5 text-cyan-500" />
                Built for creators
              </div>
            </motion.div>
          </div>

          {/* ------------------------------ RIGHT ----------------------------- */}
          <motion.div
            variants={itemVariants}
            aria-hidden
            className="relative mx-auto w-full max-w-[560px]"
          >
            {/* Main glow */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }
              }
              transition={loop(5)}
              className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[90px] sm:size-[400px]"
            />

            {/* Main AI orb */}
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
              transition={loop(5)}
              className="relative mx-auto aspect-square w-[min(78vw,430px)]"
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-[3rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-cyan-500/10 p-px shadow-2xl shadow-violet-500/10 backdrop-blur-xl" />

              {/* Inner panel */}
              <div className="absolute inset-5 overflow-hidden rounded-[2.5rem] border border-white/10 bg-background/70 shadow-2xl backdrop-blur-2xl dark:bg-background/50">
                {/* Rotating conic gradient */}
                <motion.div
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,#8b5cf6,#d946ef,#22d3ee,#8b5cf6)] opacity-70 blur-2xl"
                />

                {/* Inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10" />

                {/* Subtle noise-like highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* Center AI icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={
                      prefersReducedMotion ? undefined : { scale: [1, 1.06, 1] }
                    }
                    transition={loop(3)}
                    className="relative flex size-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 shadow-2xl shadow-violet-500/40 sm:size-32"
                  >
                    <div className="absolute inset-1 rounded-[1.8rem] border border-white/20" />
                    <Sparkles className="relative size-12 text-white sm:size-14" />
                  </motion.div>
                </div>

                {/* Orbit */}
                <motion.div
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-10 rounded-full border border-dashed border-violet-500/20"
                >
                  <span className="absolute -left-1 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-violet-400 shadow-lg shadow-violet-500/70" />
                  <span className="absolute -right-1 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/70" />
                  <span className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-fuchsia-400 shadow-lg shadow-fuchsia-500/70" />
                </motion.div>

                {/* Chat preview bar */}
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-2xl border border-border/60 bg-background/80 px-3.5 py-2.5 text-xs text-muted-foreground shadow-lg backdrop-blur-xl">
                  <Sparkles className="size-3.5 shrink-0 text-violet-500" />
                  <span className="truncate">Ask EchoGPT anything…</span>
                  <span className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>

              {/* Floating feature cards */}
              {FLOATING_ITEMS.map(({ icon: Icon, label, className, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 1, scale: 1, y: [0, -6, 0] }
                  }
                  transition={{
                    opacity: { duration: 0.5, delay },
                    scale: { duration: 0.5, delay },
                    y: loop(4, delay),
                  }}
                  className={`absolute ${className} hidden items-center gap-2 rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-xs font-medium shadow-xl backdrop-blur-xl sm:flex`}
                >
                  <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/15 to-cyan-500/15">
                    <Icon className="size-3.5 text-violet-500" />
                  </div>
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}