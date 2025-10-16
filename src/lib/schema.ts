import { z } from "zod";

export const taskValues = [
  "debugging",
  "write-code",
  "explain-code",
  "refactor",
  "add-tests",
  "architecture-advice",
  "code-review",
  "unknown",
] as const;

export const languageValues = [
  "javascript-typescript",
  "python",
  "java",
  "csharp",
  "go",
  "rust",
  "sql",
  "bash",
  "unknown",
] as const;

export const frameworkValues = [
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
] as const;

export const constraintValues = [
  "project-conventions",
  "avoid-external-deps",
  "explain-reasoning",
  "time-space-limits",
  "unknown",
] as const;

export const detailLevelValues = [
  "concise",
  "detailed",
  "step-by-step",
  "unknown",
] as const;

export const deliveryOrderValues = [
  "code-first",
  "explanation-first",
  "balanced",
  "unknown",
] as const;

export const inclusionPreferenceValues = ["include", "omit", "unknown"] as const;

export const toolValues = [
  "unit-tests",
  "linters",
  "package-managers",
  "specific-libraries",
  "unknown",
] as const;

export const targetValues = [
  "general",
  "openai",
  "anthropic",
  "local-runner",
  "unknown",
] as const;

export const wizardSchema = z.object({
  task: z.enum(taskValues),
  language: z.enum(languageValues),
  framework: z.enum(frameworkValues),
  context: z.object({
    details: z
      .string()
      .max(2000, "Context should stay below 2000 characters.")
      .default(""),
    snippet: z
      .string()
      .max(4000, "Snippets should stay below 4000 characters.")
      .default(""),
  }),
  constraints: z.object({
    selections: z
      .array(z.enum(constraintValues))
      .max(5)
      .default([]),
    custom: z.string().max(500, "Keep custom constraints concise.").default(""),
  }),
  style: z.object({
    detailLevel: z.enum(detailLevelValues),
    deliveryOrder: z.enum(deliveryOrderValues),
    exampleTests: z.enum(inclusionPreferenceValues),
    complexityAnalysis: z.enum(inclusionPreferenceValues),
  }),
  tools: z.object({
    selections: z
      .array(z.enum(toolValues))
      .max(5)
      .default([]),
    custom: z.string().max(300, "Keep tool notes brief.").default(""),
  }),
  target: z.enum(targetValues),
});

export type WizardData = z.infer<typeof wizardSchema>;

export const defaultWizardState: WizardData = {
  task: "write-code",
  language: "javascript-typescript",
  framework: "react",
  context: {
    details: "",
    snippet: "",
  },
  constraints: {
    selections: [],
    custom: "",
  },
  style: {
    detailLevel: "detailed",
    deliveryOrder: "balanced",
    exampleTests: "include",
    complexityAnalysis: "omit",
  },
  tools: {
    selections: ["unit-tests"],
    custom: "",
  },
  target: "general",
};

export type WizardStepKey =
  | "task"
  | "language"
  | "framework"
  | "context"
  | "constraints"
  | "style"
  | "tools"
  | "target";

export const stepOrder: WizardStepKey[] = [
  "task",
  "language",
  "framework",
  "context",
  "constraints",
  "style",
  "tools",
  "target",
];

export const stepLabels: Record<WizardStepKey, string> = {
  task: "Task Type",
  language: "Language",
  framework: "Framework",
  context: "Context",
  constraints: "Constraints",
  style: "Style & Output",
  tools: "Tools",
  target: "Target Model",
};
