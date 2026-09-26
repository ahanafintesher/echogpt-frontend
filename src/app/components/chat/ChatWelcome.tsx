import { Sparkles } from "lucide-react";
import SuggestionCards from "./SuggestionCard";


export default function ChatWelcome() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Welcome */}
        <div className="mb-10 text-center">
          <div className="relative mx-auto mb-6 flex size-16 items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-400/20 blur-xl" />

            <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
              <Sparkles className="size-7" />
            </div>
          </div>

          <p className="mb-3 text-sm font-medium text-violet-600 dark:text-violet-400">
            YOUR AI WORKSPACE
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your ideas,
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
              {" "}
              amplified.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Ask questions, explore ideas, write, code, analyze, and create
            something remarkable with EchoGPT.
          </p>
        </div>

        {/* Suggestions */}
        <SuggestionCards />
      </div>
    </section>
  );
}