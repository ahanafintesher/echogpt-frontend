"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Crown,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    description: "Everything you need to start exploring AI.",
    monthly: 0,
    yearly: 0,
    icon: Sparkles,
    gradient: "from-slate-500 to-slate-700",
    features: [
      "Basic AI conversations",
      "Limited daily messages",
      "Access to core AI tools",
      "Basic chat history",
      "Community support",
    ],
    button: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "More power for creators, developers, and professionals.",
    monthly: 19,
    yearly: 15,
    icon: Crown,
    gradient: "from-violet-600 via-indigo-600 to-fuchsia-500",
    features: [
      "Everything in Free",
      "Advanced AI models",
      "Higher message limits",
      "Code & creative tools",
      "Chrome extension access",
      "Priority responses",
      "Extended chat history",
    ],
    button: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Team",
    description: "Powerful AI workflows built for growing teams.",
    monthly: 39,
    yearly: 31,
    icon: Zap,
    gradient: "from-cyan-500 via-blue-500 to-violet-500",
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "Higher usage limits",
      "Team collaboration",
      "Advanced workspace tools",
      "Priority support",
      "Team administration",
    ],
    button: "Start with Team",
    popular: false,
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-border/40 bg-background py-24 sm:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 size-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="absolute -left-40 bottom-0 size-[300px] rounded-full bg-fuchsia-500/8 blur-[110px]" />

        <div className="absolute -right-40 top-1/3 size-[350px] rounded-full bg-cyan-500/8 blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.12)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]" />

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
            <Sparkles className="size-3.5" />
            Simple pricing
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Choose the plan that
            <span className="block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              fits your workflow.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Start for free and upgrade when you need more power, higher limits,
            and advanced AI capabilities.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                billing === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                billing === "yearly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            const price =
              billing === "monthly" ? plan.monthly : plan.yearly;

            return (
              <motion.div
                key={plan.name}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                }}
                className={`relative ${
                  plan.popular ? "lg:-translate-y-3" : ""
                }`}
              >
                {/* Popular glow */}
                {plan.popular && (
                  <div className="pointer-events-none absolute -inset-px rounded-[1.6rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 opacity-70 blur-[1px]" />
                )}

                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[1.55rem] border p-6 shadow-xl backdrop-blur-xl sm:p-7 ${
                    plan.popular
                      ? "border-transparent bg-background"
                      : "border-border/60 bg-background/70"
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                      Most Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${plan.gradient} shadow-lg`}
                  >
                    <Icon className="size-5 text-white" />
                  </div>

                  {/* Plan info */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {plan.name}
                    </h3>

                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-7 flex items-end gap-1">
                    <motion.span
                      key={`${plan.name}-${billing}`}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="text-4xl font-bold tracking-tight"
                    >
                      ${price}
                    </motion.span>

                    <span className="mb-1 text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>

                  {billing === "yearly" && plan.monthly > 0 && (
                    <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                      Billed annually
                    </p>
                  )}

                  {/* Button */}
                  {plan.name === "Free" ? (
                    <Link
                      href="/chat"
                      className="mt-7 flex h-11 w-full items-center justify-center rounded-xl border border-border/70 bg-muted/40 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                    >
                      {plan.button}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={`mt-7 flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:scale-[1.01] hover:shadow-xl"
                          : "border border-border/70 bg-muted/40 text-foreground hover:bg-muted"
                      }`}
                    >
                      {plan.button}
                    </button>
                  )}

                  {/* Divider */}
                  <div className="my-7 h-px bg-border/60" />

                  {/* Features */}
                  <div className="flex-1">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Includes
                    </p>

                    <ul className="space-y-3.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                            <Check className="size-3 text-violet-500" />
                          </span>

                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <Check className="size-3.5 text-emerald-500" />
            No long-term commitment
          </span>

          <span className="flex items-center gap-2">
            <Check className="size-3.5 text-emerald-500" />
            Cancel anytime
          </span>

          <span className="flex items-center gap-2">
            <Check className="size-3.5 text-emerald-500" />
            Upgrade when you need
          </span>
        </motion.div>
      </div>
    </section>
  );
}