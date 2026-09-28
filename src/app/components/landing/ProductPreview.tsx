"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Alex Morgan",
    role: "Product Designer",
    initials: "AM",
    text: "EchoGPT makes it incredibly easy to go from a rough idea to something I can actually work with. The focused workspace is what keeps me coming back.",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    name: "Daniel Carter",
    role: "Software Developer",
    initials: "DC",
    text: "I use EchoGPT throughout my development workflow. Having conversations, debugging, and technical brainstorming in one place makes the process feel much smoother.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Maya Wilson",
    role: "Content Creator",
    initials: "MW",
    text: "The writing experience feels simple without being limiting. I can quickly explore different ideas and turn them into polished content.",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    name: "Ryan Lee",
    role: "Startup Founder",
    initials: "RL",
    text: "What I like most is the flexibility. Sometimes I need quick answers, sometimes deep thinking, and sometimes help turning an idea into a plan.",
    gradient: "from-emerald-500 to-cyan-500",
  },
];

export default function ProductReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeReview = reviews[activeIndex];

  const nextReview = () => {
    setActiveIndex((current) => (current + 1) % reviews.length);
  };

  const previousReview = () => {
    setActiveIndex(
      (current) => (current - 1 + reviews.length) % reviews.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-border/40 bg-background py-24 sm:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 size-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="absolute -left-40 bottom-0 size-[300px] rounded-full bg-fuchsia-500/8 blur-[110px]" />

        <div className="absolute -right-40 top-0 size-[320px] rounded-full bg-cyan-500/8 blur-[110px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-300">
            <Star className="size-3.5 fill-current" />
            Loved by creators
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Built to make
            <span className="block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              AI feel effortless.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            See how people use EchoGPT to think through problems, create
            faster, and turn ideas into action.
          </p>
        </motion.div>

        {/* Review showcase */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_300px]">
          {/* Featured review */}
          <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-2xl backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-violet-500/10 blur-[90px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.name}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35 }}
                className="relative flex h-full flex-col justify-between p-7 sm:p-10"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-500/10">
                      <Quote className="size-5 text-violet-500" />
                    </div>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="size-4 fill-violet-500 text-violet-500"
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-10 max-w-3xl text-2xl font-medium leading-[1.45] tracking-tight sm:text-3xl">
                    “{activeReview.text}”
                  </blockquote>
                </div>

                <div className="mt-10 flex items-center justify-between gap-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-11 items-center justify-center rounded-full bg-gradient-to-br ${activeReview.gradient} text-sm font-bold text-white shadow-lg`}
                    >
                      {activeReview.initials}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {activeReview.name}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {activeReview.role}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={previousReview}
                      aria-label="Previous review"
                      className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-muted-foreground transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-500"
                    >
                      <ArrowLeft className="size-4" />
                    </button>

                    <button
                      type="button"
                      onClick={nextReview}
                      aria-label="Next review"
                      className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-muted-foreground transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-500"
                    >
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Review selector */}
          <div className="flex flex-col gap-3">
            {reviews.map((review, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group flex flex-1 items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-violet-500/30 bg-violet-500/[0.06] shadow-lg shadow-violet-500/5"
                      : "border-border/60 bg-background/60 hover:border-violet-500/20 hover:bg-muted/30"
                  }`}
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${review.gradient} text-xs font-bold text-white`}
                  >
                    {review.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {review.name}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {review.role}
                    </p>
                  </div>

                  <div
                    className={`size-1.5 rounded-full transition-all ${
                      isActive
                        ? "bg-violet-500 shadow-lg shadow-violet-500/50"
                        : "bg-border"
                    }`}
                  />
                </button>
              );
            })}

            {/* Trust badge */}
            <div className="mt-auto rounded-2xl border border-border/50 bg-muted/20 p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-violet-500" />

                <span className="text-sm font-semibold">
                  Your workflow, enhanced
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                One intelligent workspace for ideas, conversations, code, and
                creativity.
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mx-auto mt-8 flex max-w-xs items-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              className="group h-1 flex-1 overflow-hidden rounded-full bg-muted"
            >
              <motion.div
                initial={false}
                animate={{
                  width: index === activeIndex ? "100%" : "0%",
                }}
                transition={{
                  duration: index === activeIndex ? 6 : 0.25,
                  ease: "linear",
                }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}