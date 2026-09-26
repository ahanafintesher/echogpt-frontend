import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            E
          </span>

          <span>EchoGPT</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="#models"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            AI Models
          </Link>

          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/chat">Log in</Link>
          </Button>

          <Button asChild>
            <Link href="/chat">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}