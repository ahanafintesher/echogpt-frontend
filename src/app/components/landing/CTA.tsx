"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

interface Particle {
  className: string;
  delay: number;
}

const PARTICLES: readonly Particle[] = [
  { className: "left-[10%] top-[22%]", delay: 0 },
  { className: "left-[18%] bottom-[25%]", delay: 0.8 },
  { className: "right-[12%] top-[20%]", delay: 1.4 },
  { className: "right-[20%] bottom-[22%]", delay: 2 },
  { className: "left-[50%] top-[12%]", delay: 1 },
];

const HIGHLIGHTS = [
  "AI-powered workspace",
  "Built for creators",
  "Web & Chrome extension",
] as const;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function CTA() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden border-t border-border/40 bg-background py-24 sm:py-32"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 size-[300px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
        <div className="absolute -right-32 top-0 size-[320px] rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]"
      />

      {/* Floating particles */}
      {!prefersReducedMotion &&
        PARTICLES.map((particle, index) => (
          <motion.span
            key={particle.className}
            aria-hidden
            animate={{ y: [0, -12, 0], opacity: [0.25, 0.8, 0.25] }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            className={`absolute -z-10 hidden size-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_2px_rgba(167,139,250,0.6)] sm:block ${particle.className}`}
          />
        ))}

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] via-background/80 to-cyan-500/[0.08] px-6 py-14 text-center shadow-2xl shadow-violet-500/10 backdrop-blur-xl sm:px-10 sm:py-20"
        >
          {/* Top & bottom shine */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          />

          {/* Inner card glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[90px]"
          />

          {/* Icon with soft pulse ring */}
          <div className="relative mx-auto size-16">
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-2xl border border-violet-500/50"
              />
            )}

            <motion.div
              animate={
                prefersReducedMotion ? undefined : { y: [0, -4, 0] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 shadow-xl shadow-violet-500/30"
            >
              <div className="absolute inset-0.5 rounded-[0.9rem] border border-white/20" />
              <Sparkles className="relative size-8 text-white" aria-hidden />
            </motion.div>
          </div>

          <h2
            id="cta-heading"
            className="mx-auto mt-8 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl"
          >
            Your next great idea
            <span className="block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              starts here.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Stop switching between tools. Bring your ideas, questions, code,
            and creativity into one intelligent workspace.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="group h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 px-7 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/30 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100 sm:w-auto"
            >
              <MessageSquare className="mr-2 size-4" aria-hidden />
              Start chatting
              <ArrowRight
                className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full rounded-xl border-border/70 bg-background/70 px-7 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/40 hover:bg-violet-500/5 sm:w-auto"
            >
              <WandSparkles className="mr-2 size-4" aria-hidden />
              Explore EchoGPT
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {HIGHLIGHTS.map((item, index) => (
              <Fragment key={item}>
                {index > 0 && (
                  <li
                    aria-hidden
                    className="hidden size-1 rounded-full bg-border sm:block"
                  />
                )}
                <li>{item}</li>
              </Fragment>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}