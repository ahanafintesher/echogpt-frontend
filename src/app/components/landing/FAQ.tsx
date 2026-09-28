"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: readonly FaqItem[] = [
  {
    question: "What is EchoGPT?",
    answer:
      "EchoGPT is an AI-powered workspace designed to help you write, code, research, brainstorm, and create from one place.",
  },
  {
    question: "Do I need an account to use EchoGPT?",
    answer:
      "You can explore the experience without an account. An account lets you keep your conversations and access your workspace across sessions.",
  },
  {
    question: "Can EchoGPT help with coding?",
    answer:
      "Yes. EchoGPT can help explain code, debug problems, generate solutions, refactor existing code, and help you think through technical problems.",
  },
  {
    question: "Does EchoGPT work in the browser?",
    answer:
      "Yes. EchoGPT is designed for the web, and the Chrome extension can bring AI assistance directly into the pages you are browsing.",
  },
  {
    question: "Can I use EchoGPT for writing?",
    answer:
      "Absolutely. You can use it for drafting, rewriting, summarizing, brainstorming ideas, improving clarity, and adapting content for different purposes.",
  },
  {
    question: "Is my conversation history saved?",
    answer:
      "When you are signed in, your conversations can be organized in your workspace so you can return to them later.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const baseId = useId();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Arrow keys / Home / End move focus between questions (WAI-ARIA accordion)
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const last = FAQS.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case "ArrowDown":
        next = index === last ? 0 : index + 1;
        break;
      case "ArrowUp":
        next = index === 0 ? last : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
    }

    if (next !== null) {
      event.preventDefault();
      buttonRefs.current[next]?.focus();
    }
  };

  return (
    <section
    id="faq"
      aria-labelledby={`${baseId}-heading`}
      className="relative isolate overflow-hidden border-t border-border/40 bg-background py-24 sm:py-28"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 size-[420px] rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 size-[360px] rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3.5 py-1.5 text-xs font-medium text-violet-600 backdrop-blur-sm dark:text-violet-300">
            <HelpCircle className="size-3.5" aria-hidden />
            Frequently asked questions
          </div>

          <h2
            id={`${baseId}-heading`}
            className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            Questions?
            <span className="block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              We have answers.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Everything you need to know about using EchoGPT and its AI-powered
            workspace.
          </p>
        </motion.div>

        {/* FAQ list */}
        <ul className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${baseId}-question-${index}`;
            const panelId = `${baseId}-answer-${index}`;

            return (
              <motion.li
                key={faq.question}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-violet-500/30 bg-violet-500/[0.04] shadow-lg shadow-violet-500/5"
                    : "border-border/60 bg-background/60 backdrop-blur-sm hover:border-violet-500/25 hover:bg-muted/30"
                }`}
              >
                {/* Active accent bar */}
                <span
                  aria-hidden
                  className={`absolute inset-y-4 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-violet-500 to-cyan-400 transition-all duration-300 ${
                    isOpen ? "opacity-100" : "scale-y-50 opacity-0"
                  }`}
                />

                <h3>
                  <button
                    ref={(node) => {
                      buttonRefs.current[index] = node;
                    }}
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-6 sm:px-6"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isOpen
                            ? "bg-violet-500/15 text-violet-500"
                            : "bg-muted text-muted-foreground group-hover:bg-violet-500/10 group-hover:text-violet-500"
                        }`}
                      >
                        <Sparkles className="size-4" aria-hidden />
                      </span>

                      <span className="text-sm font-semibold tracking-tight sm:text-base">
                        {faq.question}
                      </span>
                    </span>

                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-violet-500/30 bg-violet-500/10 text-violet-500"
                          : "border-border/60 text-muted-foreground group-hover:border-violet-500/30 group-hover:text-violet-500"
                      } motion-reduce:transition-none`}
                    >
                      <ChevronDown className="size-4" aria-hidden />
                    </span>
                  </button>
                </h3>

                {/* Smooth height animation via grid rows (no JS measuring) */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 pl-[4.25rem] text-sm leading-7 text-muted-foreground sm:px-6 sm:pb-6 sm:pl-[4.75rem] sm:pr-14">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}