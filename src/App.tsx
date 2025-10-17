import { ThemeToggle } from "./components/ThemeToggle";
import { Wizard } from "./components/Wizard";
import { PromptPreview } from "./components/PromptPreview";
import { TooltipProvider } from "./components/ui/tooltip";
import { Button } from "./components/ui/button";

function App() {
  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40 text-foreground">
        <header className="relative border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-[-3rem] left-8 h-48 w-48 rounded-full bg-secondary/40 blur-3xl" />
          </div>
          <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-10">
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Prompt Refinery
              </span>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Transform Your Ideas Into Precise AI Coding Prompts
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                Guided questions to craft higher quality prompts for coding.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("wizard")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  Start Building
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main
          id="wizard"
          className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:items-start"
        >
          <Wizard />
          <PromptPreview />
        </main>
        <footer className="border-t border-border/60 bg-background/90">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground">
            <span>(c) {new Date().getFullYear()} Prompt Refinery</span>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

export default App;
