import { Github } from "lucide-react";
import { Wizard } from "./components/Wizard";
import { PromptPreview } from "./components/PromptPreview";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/40 text-foreground">
        <header className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary/80">
                prompt-refinery
              </p>
              <h1 className="text-xl font-semibold">Prompt Refinery Wizard</h1>
              <p className="text-sm text-muted-foreground">
                Guided questions to craft higher quality prompts for coding LLMs.
              </p>
            </div>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:items-start">
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
