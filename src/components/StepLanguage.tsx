import {
  Code,
  Database,
  FileCode2,
  ScrollText,
  Terminal,
  CircleHelp,
  Boxes,
  Binary,
} from "lucide-react";
import type { WizardData } from "../lib/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useWizardStore } from "../store/useWizardStore";
import { SuggestionCard } from "./SuggestionCard";

const options = [
  {
    value: "javascript-typescript",
    label: "JavaScript / TypeScript",
    description: "Modern TypeScript targeting Node/React ecosystems.",
    icon: <Code className="h-4 w-4" />,
  },
  {
    value: "python",
    label: "Python",
    description: "Python 3 with type hints when helpful.",
    icon: <ScrollText className="h-4 w-4" />,
  },
  {
    value: "java",
    label: "Java",
    description: "Java 21+ with modern patterns.",
    icon: <FileCode2 className="h-4 w-4" />,
  },
  {
    value: "csharp",
    label: "C#",
    description: ".NET 8 idiomatic C# guidance.",
    icon: <Boxes className="h-4 w-4" />,
  },
  {
    value: "go",
    label: "Go",
    description: "Go 1.22 best practices.",
    icon: <Binary className="h-4 w-4" />,
  },
  {
    value: "rust",
    label: "Rust",
    description: "Rust with safety and ownership clarity.",
    icon: <FileCode2 className="h-4 w-4" />,
  },
  {
    value: "sql",
    label: "SQL",
    description: "Vendor-neutral SQL queries and schema advice.",
    icon: <Database className="h-4 w-4" />,
  },
  {
    value: "bash",
    label: "Bash / Shell",
    description: "POSIX-friendly shell scripts and automation tips.",
    icon: <Terminal className="h-4 w-4" />,
  },
  {
    value: "unknown",
    label: "I don't know",
    description: "Need help selecting a language.",
    icon: <CircleHelp className="h-4 w-4" />,
  },
] as const;

export function StepLanguage() {
  const language = useWizardStore((state) => state.data.language);
  const setLanguage = useWizardStore((state) => state.setLanguage);

  return (
    <section aria-label="Select language" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pick the language so the assistant uses the right syntax and stack.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setLanguage(option.value as WizardData["language"])}
            className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 ${language === option.value ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50 hover:bg-muted/40"}`}
          >
            <span className="mt-0.5 text-primary">{option.icon}</span>
            <span>
              <span className="block text-sm font-semibold">{option.label}</span>
              <span className="text-sm text-muted-foreground">
                {option.description}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div>
        <label className="sr-only" htmlFor="language-select">
          Language select
        </label>
        <Select
          value={language}
          onValueChange={(value) => setLanguage(value as WizardData["language"])}
        >
          <SelectTrigger id="language-select" aria-label="Language select">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {language === "unknown" ? (
        <SuggestionCard
          title="Language unclear?"
          suggestions={[
            "Default to TypeScript for front-end or full-stack work unless the project says otherwise.",
            "If the repo uses a specific language, align with it to reduce friction.",
            "Ask the user whether static typing or scripting speed matters most.",
          ]}
          defaultLabel="TypeScript"
          onUseDefault={() => setLanguage("javascript-typescript")}
        />
      ) : null}
    </section>
  );
}
