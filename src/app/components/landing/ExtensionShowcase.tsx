"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe2,
  MessageSquare,
  MousePointer2,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const benefits = [
  "Ask AI from any webpage",
  "Summarize pages instantly",
  "Rewrite and improve text",
  "Quick access without switching tabs",
];

const floatingActions = [
  {
    icon: MessageSquare,
    label: "Ask AI",
    position: "left-2 top-12",
  },
  {
    icon: Globe2,
    label: "Summarize",
    position: "right-0 top-24",
  },
  {
    icon: Zap,
    label: "Rewrite",
    position: "bottom-16 left-6",
  },
];

export default function ExtensionShowcase() {
  return (
    <section
      id="extension"
      className="relative overflow-hidden border-t border-border/50 py-24 sm:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 size-[420px] rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="absolute right-1/4 bottom-0 size-[380px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ================= LEFT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3.5 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-300">
              <Globe2 className="size-3.5" />
              EchoGPT for Chrome
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              AI wherever you{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                browse
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Bring EchoGPT directly into your browser. Read, write, search,
              summarize, and ask questions without leaving the page you're
              working on.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
                    <Check className="size-3" />
                  </span>

                  {benefit}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={"/extension"}>
              <Button
                size="lg"
                className="group h-12 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-6 text-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/25"
              >
                Add to Chrome
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl"
              >
                Learn more
              </Button>
            </div>
          </motion.div>

          {/* ================= RIGHT VISUAL ================= */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            {/* Glow */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 size-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[100px]"
            />

            {/* Browser window */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-background/80 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
            >
              {/* Browser top bar */}
              <div className="flex h-12 items-center gap-3 border-b border-border/60 px-4">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400/70" />
                  <span className="size-2.5 rounded-full bg-yellow-400/70" />
                  <span className="size-2.5 rounded-full bg-green-400/70" />
                </div>

                <div className="flex h-7 flex-1 items-center rounded-lg border border-border/50 bg-muted/40 px-3">
                  <Globe2 className="mr-2 size-3 text-muted-foreground" />

                  <span className="truncate text-[10px] text-muted-foreground">
                    example.com/article
                  </span>
                </div>

                <Globe2 className="size-4 text-muted-foreground" />
              </div>

              {/* Fake webpage */}
              <div className="relative min-h-[390px] p-5 sm:p-7">
                {/* Article */}
                <div className="max-w-[70%] space-y-3">
                  <div className="h-3 w-20 rounded-full bg-muted" />

                  <div className="h-7 w-full rounded-lg bg-muted/80" />

                  <div className="h-7 w-4/5 rounded-lg bg-muted/80" />

                  <div className="space-y-2 pt-3">
                    <div className="h-2 w-full rounded-full bg-muted/60" />
                    <div className="h-2 w-11/12 rounded-full bg-muted/60" />
                    <div className="h-2 w-4/5 rounded-full bg-muted/60" />
                    <div className="h-2 w-10/12 rounded-full bg-muted/60" />
                  </div>
                </div>

                {/* Highlighted text */}
                <div className="mt-7 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-violet-500" />

                    <span className="text-xs font-medium text-violet-500">
                      Selected text
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-full rounded-full bg-violet-500/10" />
                    <div className="h-2 w-4/5 rounded-full bg-violet-500/10" />
                  </div>
                </div>

                {/* AI popup */}
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 right-5 w-[210px] rounded-2xl border border-violet-500/20 bg-background/95 p-3 shadow-2xl shadow-violet-500/10 backdrop-blur-xl sm:right-7 sm:w-[230px]"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
                      <Sparkles className="size-3.5" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold">EchoGPT</p>
                      <p className="text-[9px] text-muted-foreground">
                        Ready to help
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-muted/60 px-2 py-2 text-[9px]">
                      Summarize
                    </div>

                    <div className="rounded-lg bg-muted/60 px-2 py-2 text-[9px]">
                      Explain
                    </div>

                    <div className="rounded-lg bg-muted/60 px-2 py-2 text-[9px]">
                      Rewrite
                    </div>

                    <div className="rounded-lg bg-muted/60 px-2 py-2 text-[9px]">
                      Ask AI
                    </div>
                  </div>
                </motion.div>

                {/* Cursor */}
                <motion.div
                  animate={{
                    x: [0, 35, 10, 0],
                    y: [0, -10, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-20 left-[42%] hidden sm:block"
                >
                  <MousePointer2 className="size-6 fill-violet-500 text-violet-600 drop-shadow-lg" />
                </motion.div>

                {/* Floating actions */}
                {floatingActions.map((action, index) => {
                  const Icon = action.icon;

                  return (
                    <motion.div
                      key={action.label}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4,
                      }}
                      className={`absolute ${action.position} hidden items-center gap-2 rounded-xl border border-border/60 bg-background/90 px-3 py-2 text-[10px] font-medium shadow-xl backdrop-blur-xl sm:flex`}
                    >
                      <Icon className="size-3.5 text-violet-500" />
                      {action.label}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}