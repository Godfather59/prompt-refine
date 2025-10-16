import type { WizardData } from "./schema";

export type TemplateId =
  | "bug-fix"
  | "algorithm-design"
  | "docs-generator"
  | "code-review";

export interface PromptTemplate {
  id: TemplateId;
  name: string;
  description: string;
  preset: Partial<WizardData>;
}

export const templates: PromptTemplate[] = [
  {
    id: "bug-fix",
    name: "Bug Fix",
    description: "Locate, understand, and patch a failing scenario in production.",
    preset: {
      task: "debugging",
      language: "javascript-typescript",
      frontendFrameworks: ["react"],
      framework: "node",
      constraints: {
        selections: ["project-conventions", "time-space-limits"],
        custom: "Document the root cause before proposing the fix.",
      },
      style: {
        detailLevel: "step-by-step",
        deliveryOrder: "explanation-first",
        exampleTests: "include",
        complexityAnalysis: "unknown",
      },
      tools: {
        selections: ["unit-tests", "linters"],
        custom: "Use vitest for rapid regression checks.",
      },
      context: {
        details:
          "Investigate intermittent crashes on the user dashboard when switching filters.",
        snippet: "",
      },
    },
  },
  {
    id: "algorithm-design",
    name: "Algorithm Design",
    description: "Craft an optimal solution with performance guarantees and tests.",
    preset: {
      task: "write-code",
      language: "python",
      frontendFrameworks: [],
      framework: "unknown",
      constraints: {
        selections: ["explain-reasoning"],
        custom:
          "Compare time and space complexity against at least one baseline approach.",
      },
      style: {
        detailLevel: "detailed",
        deliveryOrder: "code-first",
        exampleTests: "include",
        complexityAnalysis: "include",
      },
      tools: {
        selections: ["unit-tests", "package-managers"],
        custom: "Prefer Python standard library utilities.",
      },
    },
  },
  {
    id: "docs-generator",
    name: "Docs Generator",
    description: "Summarize architecture and produce usage documentation.",
    preset: {
      task: "explain-code",
      language: "unknown",
      frontendFrameworks: ["unknown"],
      framework: "unknown",
      constraints: {
        selections: ["project-conventions"],
        custom: "Include a quick-start section and API reference table.",
      },
      style: {
        detailLevel: "detailed",
        deliveryOrder: "explanation-first",
        exampleTests: "omit",
        complexityAnalysis: "omit",
      },
      tools: {
        selections: ["specific-libraries"],
        custom: "You may leverage documentation tooling like JSDoc or Sphinx.",
      },
    },
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "Provide a constructive code review with risk assessment.",
    preset: {
      task: "code-review",
      language: "javascript-typescript",
      frontendFrameworks: ["unknown"],
      framework: "unknown",
      constraints: {
        selections: ["project-conventions", "explain-reasoning"],
        custom: "Highlight security implications or regressions explicitly.",
      },
      style: {
        detailLevel: "detailed",
        deliveryOrder: "explanation-first",
        exampleTests: "include",
        complexityAnalysis: "omit",
      },
      tools: {
        selections: ["linters"],
        custom: "Reference ESLint and unit test outputs if relevant.",
      },
    },
  },
];

export function findTemplate(id: TemplateId) {
  return templates.find((template) => template.id === id) ?? null;
}
