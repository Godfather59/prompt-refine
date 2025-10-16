import { useEffect, useMemo, type ReactElement } from "react";
import {
  Cpu,
  Globe,
  Leaf,
  Rocket,
  ServerCog,
  Binary,
  Landmark,
  Workflow,
  CircleHelp,
} from "lucide-react";
import type { WizardData } from "../lib/schema";
import { useWizardStore } from "../store/useWizardStore";
import { OptionTile } from "./OptionTile";
import { SuggestionCard } from "./SuggestionCard";

type FrameworkOption = {
  value: WizardData["framework"];
  label: string;
  description: string;
  icon: ReactElement;
};

const frameworkCatalog: Record<WizardData["framework"], FrameworkOption> = {
  node: {
    value: "node",
    label: "Node.js",
    description: "Server-side JavaScript runtime.",
    icon: <ServerCog className="h-4 w-4 text-primary" />,
  },
  deno: {
    value: "deno",
    label: "Deno",
    description: "Secure TypeScript & JavaScript runtime.",
    icon: <Globe className="h-4 w-4 text-primary" />,
  },
  bun: {
    value: "bun",
    label: "Bun",
    description: "Blazing-fast JavaScript runtime.",
    icon: <Rocket className="h-4 w-4 text-primary" />,
  },
  react: {
    value: "react",
    label: "React",
    description: "Client-side React applications.",
    icon: <Leaf className="h-4 w-4 text-primary" />,
  },
  next: {
    value: "next",
    label: "Next.js",
    description: "React with hybrid SSR/SSG routing.",
    icon: <Workflow className="h-4 w-4 text-primary" />,
  },
  django: {
    value: "django",
    label: "Django",
    description: "Python web framework with batteries included.",
    icon: <Landmark className="h-4 w-4 text-primary" />,
  },
  flask: {
    value: "flask",
    label: "Flask",
    description: "Lightweight Python micro-framework.",
    icon: <Binary className="h-4 w-4 text-primary" />,
  },
  spring: {
    value: "spring",
    label: "Spring",
    description: "Enterprise Java platform.",
    icon: <Cpu className="h-4 w-4 text-primary" />,
  },
  dotnet: {
    value: "dotnet",
    label: ".NET",
    description: "C# runtime and tooling.",
    icon: <ServerCog className="h-4 w-4 text-primary" />,
  },
  unknown: {
    value: "unknown",
    label: "I don't know",
    description: "Help me choose the right runtime.",
    icon: <CircleHelp className="h-4 w-4 text-primary" />,
  },
};

const frameworksByLanguage: Record<
  WizardData["language"],
  WizardData["framework"][]
> = {
  "javascript-typescript": ["node", "deno", "bun", "react", "next", "unknown"],
  python: ["django", "flask", "unknown"],
  java: ["spring", "unknown"],
  csharp: ["dotnet", "unknown"],
  go: ["unknown"],
  rust: ["unknown"],
  sql: ["unknown"],
  bash: ["unknown"],
  unknown: [
    "node",
    "deno",
    "bun",
    "react",
    "next",
    "django",
    "flask",
    "spring",
    "dotnet",
    "unknown",
  ],
};

export function StepFramework() {
  const language = useWizardStore((state) => state.data.language);
  const framework = useWizardStore((state) => state.data.framework);
  const setFramework = useWizardStore((state) => state.setFramework);
  const availableKeys = useMemo(
    () => frameworksByLanguage[language] ?? frameworksByLanguage.unknown,
    [language],
  );
  const availableOptions = availableKeys.map(
    (key) => frameworkCatalog[key],
  );
  const defaultOption =
    availableOptions.find((option) => option.value !== "unknown") ??
    frameworkCatalog.unknown;

  useEffect(() => {
    if (!availableKeys.includes(framework)) {
      const fallback =
        availableKeys.find((value) => value === "unknown") ?? availableKeys[0];
      if (fallback) {
        setFramework(fallback);
      }
    }
  }, [availableKeys, framework, setFramework]);

  return (
    <section aria-label="Select framework" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Identify the primary runtime or framework so the prompt surfaces the
        correct APIs and tooling.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {availableOptions.map((option) => (
          <OptionTile
            key={option.value}
            label={option.label}
            description={option.description}
            selected={framework === option.value}
            icon={option.icon}
            onClick={() => setFramework(option.value)}
          />
        ))}
      </div>
      {framework === "unknown" ? (
        <SuggestionCard
          title="Not sure which runtime?"
          suggestions={[
            "Match the runtime to the project's existing stack when possible.",
            "If you're building a front-end feature, React or Next.js are safe defaults.",
            "When in doubt, start with Node.js to keep things portable.",
          ]}
          defaultLabel={defaultOption.label}
          onUseDefault={() => setFramework(defaultOption.value)}
        />
      ) : null}
    </section>
  );
}
