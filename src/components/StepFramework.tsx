import { useEffect, useMemo, type ReactElement } from "react";
import {
  Aperture,
  Binary,
  CircleHelp,
  Compass,
  Cpu,
  Crosshair,
  CupSoda,
  Flame,
  Flower,
  Gauge,
  GitBranch,
  Globe,
  Hexagon,
  Landmark,
  Leaf,
  Mountain,
  Network,
  PlaneTakeoff,
  RefreshCcw,
  Rocket,
  ServerCog,
  Shield,
  Sprout,
  Wind,
  Workflow,
  Zap,
  Cloudy,
} from "lucide-react";
import type { WizardData } from "../lib/schema";
import { useWizardStore } from "../store/useWizardStore";
import { OptionTile } from "./OptionTile";
import { SuggestionCard } from "./SuggestionCard";

type FrameworkCategory = "frontend" | "backend" | "support";

type FrameworkOption = {
  value: WizardData["framework"];
  label: string;
  description: string;
  icon: ReactElement;
  category: FrameworkCategory;
};

const frameworkCatalog: Record<WizardData["framework"], FrameworkOption> = {
  node: {
    value: "node",
    label: "Node.js",
    description: "Server-side JavaScript runtime.",
    icon: <ServerCog className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  deno: {
    value: "deno",
    label: "Deno",
    description: "Secure TypeScript & JavaScript runtime.",
    icon: <Globe className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  bun: {
    value: "bun",
    label: "Bun",
    description: "Blazing-fast JavaScript runtime.",
    icon: <Rocket className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  express: {
    value: "express",
    label: "Express",
    description: "Minimalist Node.js HTTP framework.",
    icon: <Network className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  fastify: {
    value: "fastify",
    label: "Fastify",
    description: "High-performance Node.js APIs with schema validation.",
    icon: <Zap className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  nest: {
    value: "nest",
    label: "NestJS",
    description: "Opinionated TypeScript framework with dependency injection.",
    icon: <Shield className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  react: {
    value: "react",
    label: "React",
    description: "Client-side React applications.",
    icon: <Leaf className="h-4 w-4 text-primary" />,
    category: "frontend",
  },
  next: {
    value: "next",
    label: "Next.js",
    description: "React with hybrid SSR/SSG routing.",
    icon: <Workflow className="h-4 w-4 text-primary" />,
    category: "frontend",
  },
  remix: {
    value: "remix",
    label: "Remix",
    description: "Full-stack routing with loaders, actions, and progressive enhancement.",
    icon: <RefreshCcw className="h-4 w-4 text-primary" />,
    category: "frontend",
  },
  angular: {
    value: "angular",
    label: "Angular",
    description: "Component-based front-end powered by TypeScript.",
    icon: <Aperture className="h-4 w-4 text-primary" />,
    category: "frontend",
  },
  vue: {
    value: "vue",
    label: "Vue",
    description: "Vue 3 applications with the composition API.",
    icon: <Sprout className="h-4 w-4 text-primary" />,
    category: "frontend",
  },
  svelte: {
    value: "svelte",
    label: "Svelte",
    description: "Reactive Svelte components and stores.",
    icon: <Flame className="h-4 w-4 text-primary" />,
    category: "frontend",
  },
  sveltekit: {
    value: "sveltekit",
    label: "SvelteKit",
    description: "Filesystem routing with load functions and endpoints.",
    icon: <Compass className="h-4 w-4 text-primary" />,
    category: "frontend",
  },
  nuxt: {
    value: "nuxt",
    label: "Nuxt",
    description: "Vue meta-framework with server routes and composables.",
    icon: <Mountain className="h-4 w-4 text-primary" />,
    category: "frontend",
  },
  django: {
    value: "django",
    label: "Django",
    description: "Python web framework with batteries included.",
    icon: <Landmark className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  flask: {
    value: "flask",
    label: "Flask",
    description: "Lightweight Python micro-framework.",
    icon: <Binary className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  fastapi: {
    value: "fastapi",
    label: "FastAPI",
    description: "Async Python APIs with Pydantic validation.",
    icon: <Gauge className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  gin: {
    value: "gin",
    label: "Gin",
    description: "Go HTTP router with middleware and JSON helpers.",
    icon: <CupSoda className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  spring: {
    value: "spring",
    label: "Spring Boot",
    description: "Enterprise Java platform with auto-configuration.",
    icon: <Flower className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  dotnet: {
    value: "dotnet",
    label: ".NET",
    description: "C# runtime and tooling.",
    icon: <Cpu className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  laravel: {
    value: "laravel",
    label: "Laravel",
    description: "PHP framework with expressive ORM and queues.",
    icon: <Hexagon className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  rails: {
    value: "rails",
    label: "Rails",
    description: "Ruby on Rails MVC applications.",
    icon: <GitBranch className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  ktor: {
    value: "ktor",
    label: "Ktor",
    description: "Kotlin services with coroutines and typed routes.",
    icon: <Wind className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  vapor: {
    value: "vapor",
    label: "Vapor",
    description: "Server-side Swift with Fluent ORM and async HTTP.",
    icon: <Cloudy className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  axum: {
    value: "axum",
    label: "Axum",
    description: "Rust services built on Tower and async handlers.",
    icon: <Crosshair className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  rocket: {
    value: "rocket",
    label: "Rocket",
    description: "Rust web apps with request guards and responders.",
    icon: <PlaneTakeoff className="h-4 w-4 text-primary" />,
    category: "backend",
  },
  unknown: {
    value: "unknown",
    label: "I don't know",
    description: "Help me choose the right runtime.",
    icon: <CircleHelp className="h-4 w-4 text-primary" />,
    category: "support",
  },
};

const frameworksByLanguage: Record<
  WizardData["language"],
  WizardData["framework"][]
> = {
  "javascript-typescript": [
    "node",
    "deno",
    "bun",
    "express",
    "fastify",
    "nest",
    "react",
    "next",
    "remix",
    "angular",
    "vue",
    "svelte",
    "sveltekit",
    "nuxt",
    "unknown",
  ],
  python: ["django", "flask", "fastapi", "unknown"],
  java: ["spring", "unknown"],
  csharp: ["dotnet", "unknown"],
  go: ["gin", "unknown"],
  rust: ["axum", "rocket", "unknown"],
  php: ["laravel", "unknown"],
  ruby: ["rails", "unknown"],
  kotlin: ["spring", "ktor", "unknown"],
  swift: ["vapor", "unknown"],
  sql: ["unknown"],
  bash: ["unknown"],
  unknown: [
    "node",
    "deno",
    "bun",
    "express",
    "fastify",
    "nest",
    "react",
    "next",
    "remix",
    "angular",
    "vue",
    "svelte",
    "sveltekit",
    "nuxt",
    "django",
    "flask",
    "fastapi",
    "gin",
    "spring",
    "dotnet",
    "laravel",
    "rails",
    "ktor",
    "vapor",
    "axum",
    "rocket",
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
  const groups = useMemo(() => {
    const options = availableKeys.map((key) => frameworkCatalog[key]);
    return {
      frontend: options.filter((option) => option.category === "frontend"),
      backend: options.filter((option) => option.category === "backend"),
      support: options.filter((option) => option.category === "support"),
    };
  }, [availableKeys]);
  const prioritizedOptions = [
    ...groups.frontend,
    ...groups.backend,
    ...groups.support,
  ];
  const defaultOption =
    prioritizedOptions.find((option) => option.value !== "unknown") ??
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
    <section aria-label="Select framework" className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Choose the primary runtime or framework. Front-end stacks power the UI,
        while back-end choices handle APIs, services, or infrastructure.
      </p>
      <div className="space-y-6">
        <FrameworkGroup
          title="Front-end frameworks"
          options={groups.frontend}
          selected={framework}
          onSelect={setFramework}
        />
        <FrameworkGroup
          title="Back-end frameworks"
          options={groups.backend}
          selected={framework}
          onSelect={setFramework}
        />
        <FrameworkGroup
          title="Assistance"
          options={groups.support}
          selected={framework}
          onSelect={setFramework}
        />
      </div>
      {framework === "unknown" ? (
        <SuggestionCard
          title="Not sure which runtime?"
          suggestions={[
            "Pick a front-end option like React, Next.js, or Nuxt when the work centers on UI.",
            "Choose a back-end runtime such as Node.js, FastAPI, or Spring for service logic and APIs.",
            "When the requirements span both, Next.js or NestJS provide structured full-stack defaults.",
          ]}
          defaultLabel={defaultOption.label}
          onUseDefault={() => setFramework(defaultOption.value)}
        />
      ) : null}
    </section>
  );
}

function FrameworkGroup({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: FrameworkOption[];
  selected: WizardData["framework"];
  onSelect: (value: WizardData["framework"]) => void;
}) {
  if (options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase text-muted-foreground">
        {title}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <OptionTile
            key={option.value}
            label={option.label}
            description={option.description}
            selected={selected === option.value}
            icon={option.icon}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
