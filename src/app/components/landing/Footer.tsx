"use client";

import type { ComponentType, MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Mail, Sparkles } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                       Brand icons (inline SVG)                             */
/* Newer lucide-react versions removed brand icons like Github / Linkedin,    */
/* so they are defined locally and never break on a lucide upgrade.           */
/* -------------------------------------------------------------------------- */

type IconComponent = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

const GithubIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*                                    Data                                    */
/* -------------------------------------------------------------------------- */

interface FooterLink {
  label: string;
  /** "#section-id" scrolls smoothly, anything else is a normal link */
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: readonly FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
  external?: boolean;
}

const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Chrome Extension", href: "#extension" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#features" },
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "Contact", href: "#cta" },
    ],
  },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedinIcon,
    external: true,
  },
  { label: "Email", href: "mailto:hello@echogpt.ai", icon: Mail },
];

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const scrollToId = (id: string) => {
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    const target = id === "top" ? null : document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  };

  // Keep real hrefs (SEO, open-in-new-tab) but smooth-scroll for hash links
  const handleHashClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    scrollToId(href.slice(1));
    window.history.replaceState(null, "", href);
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-border/50 bg-background">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 size-[300px] rounded-full bg-violet-500/10 blur-[110px]" />
        <div className="absolute bottom-0 right-1/4 size-[280px] rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      {/* Top shine */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:py-16">
          {/* Brand */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <a
              href="#top"
              onClick={(event) => handleHashClick(event, "#top")}
              aria-label="EchoGPT, back to top"
              className="group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 motion-reduce:transform-none">
                <Sparkles className="size-[18px] text-white" aria-hidden />
              </span>

              <span className="text-lg font-bold tracking-tight">
                Echo
                <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  GPT
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              A beautiful AI workspace for thinking, creating, coding, and
              getting more done.
            </p>

            {/* Social */}
            <ul className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex size-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground outline-none backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section, index) => (
            <motion.nav
              key={section.title}
              aria-label={section.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.08 * (index + 1),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(event) => handleHashClick(event, link.href)}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group/link inline-flex items-center text-sm text-muted-foreground outline-none transition-colors duration-300 hover:text-violet-500 focus-visible:text-violet-500 focus-visible:underline"
                    >
                      <span
                        aria-hidden
                        className="mr-0 h-px w-0 bg-violet-500 transition-all duration-300 group-hover/link:mr-2 group-hover/link:w-3 motion-reduce:transition-none"
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-border/50 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EchoGPT. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="size-3 text-violet-500" aria-hidden />
              Made with AI
            </span>

            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 py-1 pl-3 pr-1 outline-none backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-violet-500/60"
            >
              Back to top
              <span className="flex size-6 items-center justify-center rounded-full bg-muted transition-colors duration-300 group-hover:bg-violet-500 group-hover:text-white">
                <ArrowUp
                  className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-4 text-center"
      >
        <span className="block translate-y-[28%] bg-gradient-to-b from-foreground/10 to-transparent bg-clip-text text-[clamp(4rem,18vw,14rem)] font-black leading-none tracking-[-0.06em] text-transparent">
          EchoGPT
        </span>
      </div>
    </footer>
  );
}