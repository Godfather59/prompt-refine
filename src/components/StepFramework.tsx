import { useEffect, useMemo, type ReactElement } from "react";
import {
  Aperture,
  Atom,
  Bird,
  Binary,
  CircleHelp,
  Compass,
  Cpu,
  Crosshair,
  CupSoda,
  Flower,
  Gauge,
  GitBranch,
  Globe,
  Hexagon,
  Lamp,
  Landmark,
  Leaf,
  Library,
  Mountain,
  Network,
  Orbit,
  PlaneTakeoff,
  Play,
  RefreshCcw,
  Rocket,
  ServerCog,
  Shield,
  Sparkles,
  Sprout,
  Wind,
  Workflow,
  Zap,
  Cloudy,
  Layers,
  Flame,
} from "lucide-react";
import type { WizardData } from "../lib/schema";
import { useWizardStore } from "../store/useWizardStore";
import { OptionTile } from "./OptionTile";
import { SuggestionCard } from "./SuggestionCard";

type FrontendFramework = WizardData["frontendFrameworks"][number];
type BackendFramework = WizardData["framework"];

type FrontendOption = {
  value: FrontendFramework;
  label: string;
  description: string;
  icon: ReactElement;
};

type BackendOption = {
  value: BackendFramework;
  label: string;
  description: string;
  icon: ReactElement;
};

const frontendCatalog: Record<FrontendFramework, FrontendOption> = {
  react: {
    value: "react",
    label: "React",
    description: "Client-side React applications with hooks and Suspense.",
    icon: <Leaf className="h-4 w-4 text-primary" />,
  },
  next: {
    value: "next",
    label: "Next.js",
    description: "Hybrid React app router with server actions and SSR.",
    icon: <Workflow className="h-4 w-4 text-primary" />,
  },
  remix: {
    value: "remix",
    label: "Remix",
    description: "Remix loaders/actions with progressive enhancement.",
    icon: <RefreshCcw className="h-4 w-4 text-primary" />,
  },
  angular: {
    value: "angular",
    label: "Angular",
    description: "Angular 19 standalone components, signals, and DI.",
    icon: <Aperture className="h-4 w-4 text-primary" />,
  },
  vue: {
    value: "vue",
    label: "Vue",
    description: "Vue 3 composition API and `<script setup>` flows.",
    icon: <Sprout className="h-4 w-4 text-primary" />,
  },
  svelte: {
    value: "svelte",
    label: "Svelte",
    description: "Svelte 5 components, reactivity, and store patterns.",
    icon: <Flame className="h-4 w-4 text-primary" />,
  },
  sveltekit: {
    value: "sveltekit",
    label: "SvelteKit",
    description: "Filesystem routing with load functions and endpoints.",
    icon: <Compass className="h-4 w-4 text-primary" />,
  },
  nuxt: {
    value: "nuxt",
    label: "Nuxt",
    description: "Nuxt 3 composables, Nitro routes, and hybrid rendering.",
    icon: <Mountain className="h-4 w-4 text-primary" />,
  },
  solid: {
    value: "solid",
    label: "SolidJS",
    description: "Fine-grained reactive UI with SolidStart tooling.",
    icon: <Atom className="h-4 w-4 text-primary" />,
  },
  qwik: {
    value: "qwik",
    label: "Qwik",
    description: "Resumable components for ultra-fast hydration.",
    icon: <Sparkles className="h-4 w-4 text-primary" />,
  },
  astro: {
    value: "astro",
    label: "Astro",
    description: "Island architecture with multi-framework components.",
    icon: <Orbit className="h-4 w-4 text-primary" />,
  },
  ember: {
    value: "ember",
    label: "Ember",
    description: "Ember Octane with autotracking and Glimmer components.",
    icon: <Lamp className="h-4 w-4 text-primary" />,
  },
  compose: {
    value: "compose",
    label: "Compose Multiplatform",
    description:
      "JetBrains Compose Multiplatform for Kotlin desktop, mobile, and web surfaces.",
    icon: <Layers className="h-4 w-4 text-primary" />,
  },
  unknown: {
    value: "unknown",
    label: "Not sure (front-end)",
    description: "Need help selecting a UI framework.",
    icon: <CircleHelp className="h-4 w-4 text-primary" />,
  },
};

const backendCatalog: Record<BackendFramework, BackendOption> = {
  node: {
    value: "node",
    label: "Node.js",
    description: "Server-side JavaScript runtime (LTS).",
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
  express: {
    value: "express",
    label: "Express",
    description: "Minimalist Node.js HTTP framework.",
    icon: <Network className="h-4 w-4 text-primary" />,
  },
  fastify: {
    value: "fastify",
    label: "Fastify",
    description: "High-performance Node.js APIs with validation.",
    icon: <Zap className="h-4 w-4 text-primary" />,
  },
  nest: {
    value: "nest",
    label: "NestJS",
    description: "Opinionated TypeScript framework with DI.",
    icon: <Shield className="h-4 w-4 text-primary" />,
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
  fastapi: {
    value: "fastapi",
    label: "FastAPI",
    description: "Async Python APIs using Pydantic validation.",
    icon: <Gauge className="h-4 w-4 text-primary" />,
  },
  gin: {
    value: "gin",
    label: "Gin",
    description: "Go HTTP router with middleware support.",
    icon: <CupSoda className="h-4 w-4 text-primary" />,
  },
  spring: {
    value: "spring",
    label: "Spring Boot",
    description: "Enterprise Java platform with auto-configuration.",
    icon: <Flower className="h-4 w-4 text-primary" />,
  },
  dotnet: {
    value: "dotnet",
    label: ".NET",
    description: "C# runtime with dependency injection.",
    icon: <Cpu className="h-4 w-4 text-primary" />,
  },
  laravel: {
    value: "laravel",
    label: "Laravel",
    description: "PHP framework with expressive Eloquent ORM.",
    icon: <Hexagon className="h-4 w-4 text-primary" />,
  },
  rails: {
    value: "rails",
    label: "Rails",
    description: "Ruby on Rails MVC applications.",
    icon: <GitBranch className="h-4 w-4 text-primary" />,
  },
  ktor: {
    value: "ktor",
    label: "Ktor",
    description: "Kotlin services with coroutines and typed routes.",
    icon: <Wind className="h-4 w-4 text-primary" />,
  },
  vapor: {
    value: "vapor",
    label: "Vapor",
    description: "Server-side Swift with Fluent ORM.",
    icon: <Cloudy className="h-4 w-4 text-primary" />,
  },
  axum: {
    value: "axum",
    label: "Axum",
    description: "Rust services on Tower with async handlers.",
    icon: <Crosshair className="h-4 w-4 text-primary" />,
  },
  rocket: {
    value: "rocket",
    label: "Rocket",
    description: "Rust web apps using request guards and responders.",
    icon: <PlaneTakeoff className="h-4 w-4 text-primary" />,
  },
  phoenix: {
    value: "phoenix",
    label: "Phoenix",
    description: "Elixir web apps with LiveView and OTP supervision.",
    icon: <Bird className="h-4 w-4 text-primary" />,
  },
  play: {
    value: "play",
    label: "Play Framework",
    description: "Scala services with typed routing and Akka concurrency.",
    icon: <Play className="h-4 w-4 text-primary" />,
  },
  pedestal: {
    value: "pedestal",
    label: "Pedestal",
    description: "Clojure interceptors with immutable data pipelines.",
    icon: <Layers className="h-4 w-4 text-primary" />,
  },
  shelf: {
    value: "shelf",
    label: "Shelf",
    description: "Dart server middleware with async handlers.",
    icon: <Library className="h-4 w-4 text-primary" />,
  },
  unknown: {
    value: "unknown",
    label: "I don't know",
    description: "Help me choose the right runtime.",
    icon: <CircleHelp className="h-4 w-4 text-primary" />,
  },
};

type Availability = {
  frontend: FrontendFramework[];
  backend: BackendFramework[];
};

const frameworksByLanguage: Record<WizardData["language"], Availability> = {
  "javascript-typescript": {
    frontend: [
      "react",
      "next",
      "remix",
      "angular",
      "vue",
      "svelte",
      "sveltekit",
      "nuxt",
      "solid",
      "qwik",
      "astro",
      "ember",
      "compose",
      "unknown",
    ],
    backend: [
      "node",
      "deno",
      "bun",
      "express",
      "fastify",
      "nest",
      "unknown",
    ],
  },
  python: {
    frontend: ["unknown"],
    backend: ["django", "flask", "fastapi", "unknown"],
  },
  java: {
    frontend: ["unknown"],
    backend: ["spring", "unknown"],
  },
  csharp: {
    frontend: ["unknown"],
    backend: ["dotnet", "unknown"],
  },
  go: {
    frontend: ["unknown"],
    backend: ["gin", "unknown"],
  },
  rust: {
    frontend: ["unknown"],
    backend: ["axum", "rocket", "unknown"],
  },
  php: {
    frontend: ["unknown"],
    backend: ["laravel", "unknown"],
  },
  ruby: {
    frontend: ["unknown"],
    backend: ["rails", "unknown"],
  },
  kotlin: {
    frontend: ["compose", "unknown"],
    backend: ["spring", "ktor", "unknown"],
  },
  swift: {
    frontend: ["unknown"],
    backend: ["vapor", "unknown"],
  },
  elixir: {
    frontend: ["unknown"],
    backend: ["phoenix", "unknown"],
  },
  scala: {
    frontend: ["unknown"],
    backend: ["play", "unknown"],
  },
  clojure: {
    frontend: ["unknown"],
    backend: ["pedestal", "unknown"],
  },
  fsharp: {
    frontend: ["unknown"],
    backend: ["dotnet", "unknown"],
  },
  dart: {
    frontend: ["unknown"],
    backend: ["shelf", "unknown"],
  },
  sql: {
    frontend: [],
    backend: ["unknown"],
  },
  bash: {
    frontend: [],
    backend: ["unknown"],
  },
  unknown: {
    frontend: [
      "react",
      "next",
      "remix",
      "angular",
      "vue",
      "svelte",
      "sveltekit",
      "nuxt",
      "solid",
      "qwik",
      "astro",
      "ember",
      "compose",
      "unknown",
    ],
    backend: [
      "node",
      "deno",
      "bun",
      "express",
      "fastify",
      "nest",
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
      "phoenix",
      "play",
      "pedestal",
      "shelf",
      "unknown",
    ],
  },
};

const arraysMatch = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((value, index) => value === b[index]);

export function StepFramework() {
  const language = useWizardStore((state) => state.data.language);
  const backend = useWizardStore((state) => state.data.framework);
  const frontend = useWizardStore((state) => state.data.frontendFrameworks);
  const setBackend = useWizardStore((state) => state.setFramework);
  const setFrontend = useWizardStore((state) => state.setFrontendFrameworks);
  const toggleFrontend = useWizardStore(
    (state) => state.toggleFrontendFramework,
  );

  const availability = useMemo(
    () => frameworksByLanguage[language] ?? frameworksByLanguage.unknown,
    [language],
  );

  useEffect(() => {
    const allowed = availability.frontend;
    if (allowed.length === 0) {
      if (frontend.length > 0) {
        setFrontend([]);
      }
      return;
    }
    const filtered = frontend.filter((value) => allowed.includes(value));
    const fallback =
      allowed.find((value) => value !== "unknown") ??
      allowed[0] ??
      undefined;
    const next =
      filtered.length > 0
        ? filtered
        : fallback !== undefined
          ? [fallback]
          : [];
    if (!arraysMatch(frontend, next)) {
      setFrontend(next);
    }
  }, [availability, frontend, setFrontend]);

  useEffect(() => {
    const allowed = availability.backend;
    if (!allowed.includes(backend)) {
      const fallback =
        allowed.find((value) => value !== "unknown") ??
        allowed[0] ??
        "unknown";
      setBackend(fallback);
    }
  }, [availability, backend, setBackend]);

  const frontendOptions = availability.frontend.map(
    (value) => frontendCatalog[value],
  );
  const backendOptions = availability.backend.map(
    (value) => backendCatalog[value],
  );

  const backendFallback =
    backendOptions.find((option) => option.value !== "unknown") ??
    backendOptions[0] ??
    backendCatalog.unknown;

  const showSuggestion =
    backend === "unknown" || frontend.includes("unknown");

  return (
    <section aria-label="Select framework" className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Pick every front-end stack involved, then choose the primary back-end
        runtime. This keeps the generated prompt aligned with the actual
        hand-off between UI and server code.
      </p>
      {frontendOptions.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Front-end frameworks - select all that apply
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {frontendOptions.map((option) => (
              <OptionTile
                key={option.value}
                label={option.label}
                description={option.description}
                selected={frontend.includes(option.value)}
                icon={option.icon}
                onClick={() => toggleFrontend(option.value)}
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-muted-foreground">
          Back-end runtime - pick one
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {backendOptions.map((option) => (
            <OptionTile
              key={option.value}
              label={option.label}
              description={option.description}
              selected={backend === option.value}
              icon={option.icon}
              onClick={() => setBackend(option.value)}
            />
          ))}
        </div>
      </div>
      {showSuggestion ? (
        <SuggestionCard
          title="Not sure which stack?"
          suggestions={[
            "Select each front-end framework that ships UI so the assistant knows where the boundaries are.",
            "Choose the back-end runtime that owns business logic and integrations. If you're unsure, align with the existing server in the repo.",
            "Full-stack work often pairs something like Next.js + Node.js or Nuxt + Laravel. Prefer that combination when scope is broad.",
          ]}
          defaultLabel={backendFallback.label}
          onUseDefault={() => {
            if (frontendOptions.length > 0) {
              const defaultFrontend =
                frontendOptions.find(
                  (option) => option.value !== "unknown",
                ) ?? frontendOptions[0];
              if (defaultFrontend) {
                setFrontend([defaultFrontend.value]);
              }
            }
            setBackend(backendFallback.value);
          }}
        />
      ) : null}
    </section>
  );
}
