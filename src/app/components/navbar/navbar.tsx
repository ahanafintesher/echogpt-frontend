"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "AI Models", href: "#models" },
  { label: "Product Preview", href: "#product-preview" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Navbar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-105">
              E
            </span>

            <span className="text-lg font-bold tracking-tight">
              Echo
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                GPT
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/chat">Log in</Link>
            </Button>

            <Button
              size="sm"
              asChild
              className="rounded-lg bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 px-4 text-white shadow-md shadow-violet-500/20 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/25"
            >
              <Link href="/chat">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-foreground md:hidden"
          >
            {isOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
            isOpen
              ? "max-h-[420px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border/40 py-4">
            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-violet-500/10 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border/40 pt-4">
              <Button
                variant="outline"
                asChild
                className="rounded-xl"
                onClick={closeMenu}
              >
                <Link href="/chat">Log in</Link>
              </Button>

              <Button
                asChild
                className="rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20"
                onClick={closeMenu}
              >
                <Link href="/chat">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}