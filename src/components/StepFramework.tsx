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
import { useWizardStore } from "../store/useWizardStore";
import { OptionTile } from "./OptionTile";
import { SuggestionCard } from "./SuggestionCard";

const options = [
  {
    value: "node",
    label: "Node.js",
    description: "Server-side JavaScript runtime.",
    icon: <ServerCog className="h-4 w-4 text-primary" />,
  },
  {
    value: "deno",
    label: "Deno",
    description: "Secure TypeScript & JavaScript runtime.",
    icon: <Globe className="h-4 w-4 text-primary" />,
  },
  {
    value: "bun",
    label: "Bun",
    description: "Blazing-fast JavaScript runtime.",
    icon: <Rocket className="h-4 w-4 text-primary" />,
  },
  {
    value: "react",
    label: "React",
    description: "Client-side React applications.",
    icon: <Leaf className="h-4 w-4 text-primary" />,
  },
  {
    value: "next",
    label: "Next.js",
    description: "React with hybrid SSR/SSG routing.",
    icon: <Workflow className="h-4 w-4 text-primary" />,
  },
  {
    value: "django",
    label: "Django",
    description: "Python web framework with batteries included.",
    icon: <Landmark className="h-4 w-4 text-primary" />,
  },
  {
    value: "flask",
    label: "Flask",
    description: "Lightweight Python micro-framework.",
    icon: <Binary className="h-4 w-4 text-primary" />,
  },
  {
    value: "spring",
    label: "Spring",
    description: "Enterprise Java platform.",
    icon: <Cpu className="h-4 w-4 text-primary" />,
  },
  {
    value: "dotnet",
    label: ".NET",
    description: "C# runtime and tooling.",
    icon: <ServerCog className="h-4 w-4 text-primary" />,
  },
  {
    value: "unknown",
    label: "I don't know",
    description: "Help me choose the right runtime.",
    icon: <CircleHelp className="h-4 w-4 text-primary" />,
  },
] as const;

export function StepFramework() {
  const framework = useWizardStore((state) => state.data.framework);
  const setFramework = useWizardStore((state) => state.setFramework);

  return (
    <section aria-label="Select framework" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Identify the primary runtime or framework so the prompt surfaces the
        correct APIs and tooling.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => (
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
          defaultLabel="React"
          onUseDefault={() => setFramework("react")}
        />
      ) : null}
    </section>
  );
}
