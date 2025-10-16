import type { WizardData } from "./schema";

const taskCopy: Record<WizardData["task"], string> = {
  debugging:
    "Investigate the reported defect, explain the root cause, and propose a safe fix.",
  "write-code":
    "Design and implement the requested functionality with production quality in mind.",
  "explain-code":
    "Explain the referenced code clearly, highlighting intent and potential pitfalls.",
  refactor:
    "Refactor the existing code to improve structure, readability, and maintainability without changing behavior.",
  "add-tests":
    "Add comprehensive automated tests that cover critical paths and edge cases.",
  "architecture-advice":
    "Provide architectural guidance, trade-offs, and recommended patterns.",
  "code-review":
    "Review the provided changes, assess risks, and suggest actionable improvements.",
  unknown:
    "Clarify the user's goal and outline the safest approach before proceeding.",
};

const languageCopy: Record<WizardData["language"], string> = {
  "javascript-typescript":
    "Focus on TypeScript/JavaScript best practices. If unsure, default to TypeScript.",
  python: "Use idiomatic Python 3. Avoid unnecessary third-party packages.",
  java: "Target Java 21+ conventions with clear class and method documentation.",
  csharp: "Write modern C# targeting .NET 8 patterns and nullable reference types.",
  go: "Produce Go 1.22 compliant code with emphasis on simplicity and clarity.",
  rust: "Favor safe Rust patterns and highlight ownership or borrowing nuances.",
  sql: "Provide SQL that is portable across common relational databases.",
  bash:
    "Deliver POSIX-friendly shell scripts and note platform caveats when applicable.",
  unknown:
    "Language is unspecified. Confirm with the user; suggest TypeScript as a safe default if they defer.",
};

const frameworkCopy: Record<WizardData["framework"], string> = {
  node: "Assume a Node.js runtime (LTS). Mind asynchronous flows and dependency hygiene.",
  deno: "Target Deno with native tooling and permissions constraints.",
  bun: "Optimize for Bun's runtime and package runner capabilities.",
  react: "Use modern React with hooks and functional components.",
  next: "Follow Next.js 15 conventions with server components where appropriate.",
  django: "Adhere to Django 5 best practices and built-in security safeguards.",
  flask: "Structure Flask apps with blueprints and configuration separation.",
  spring: "Use Spring Boot 3 idioms and highlight dependency management.",
  dotnet: ".NET runtime assumed. Prefer minimal APIs and dependency injection.",
  unknown:
    "Framework/runtime not specified. Ask for clarification or assume a lightweight runtime temporarily.",
};

const constraintCopy: Record<WizardData["constraints"]["selections"][number], string> =
  {
    "project-conventions":
      "Follow existing project conventions and style guidelines.",
    "avoid-external-deps":
      "Avoid adding new external dependencies unless absolutely required.",
    "explain-reasoning":
      "Explain reasoning behind key decisions so the reader can follow the logic.",
    "time-space-limits":
      "Respect time/space constraints and call them out if they are at risk.",
    unknown:
      "Clarify constraints with the user. Suggest verifying coding standards and dependency policies.",
  };

const toolCopy: Record<WizardData["tools"]["selections"][number], string> = {
  "unit-tests": "Unit tests may be executed to validate behavior.",
  linters: "Linters or static analysis tools are allowed to verify conventions.",
  "package-managers":
    "Package managers (npm, pip, etc.) can be used for installation tasks.",
  "specific-libraries":
    "Specific libraries are permitted when they accelerate delivery.",
  unknown:
    "Confirm which tools and services are allowed before relying on them.",
};

const detailOrderCopy: Record<WizardData["style"]["detailLevel"], string> = {
  concise: "Keep responses lean and outcome-focused.",
  detailed: "Provide thorough explanations and implementation notes.",
  "step-by-step":
    "Respond with a numbered, step-by-step plan before final output.",
  unknown:
    "Detail level is unspecified. Ask whether a quick summary or in-depth answer is preferred.",
};

const deliveryCopy: Record<WizardData["style"]["deliveryOrder"], string> = {
  "code-first": "Present final code before explanations.",
  "explanation-first": "Explain the approach before presenting code.",
  balanced:
    "Balance code and explanations by interleaving rationale with snippets.",
  unknown:
    "Clarify whether code or narrative should take priority for this user.",
};

const inclusionCopy = {
  exampleTests: {
    include: "Include example tests illustrating the solution.",
    omit: "Only mention tests if they are critical.",
    unknown:
      "Ask whether example tests would be helpful before generating them.",
  },
  complexityAnalysis: {
    include: "Provide complexity analysis for key algorithms.",
    omit: "Skip complexity analysis unless specifically requested.",
    unknown: "Confirm if complexity analysis is needed for this audience.",
  },
} as const;

type ChecklistKey =
  | "specificity"
  | "constraints"
  | "examples"
  | "acceptanceCriteria"
  | "verification";

export const checklistLabels: Record<ChecklistKey, string> = {
  specificity: "Specificity",
  constraints: "Constraints",
  examples: "Examples",
  acceptanceCriteria: "Acceptance Criteria",
  verification: "Verification",
};

export type ChecklistScores = Record<ChecklistKey, number>;

export function computeChecklist(state: WizardData): ChecklistScores {
  const scores: ChecklistScores = {
    specificity: 0,
    constraints: 0,
    examples: 0,
    acceptanceCriteria: 0,
    verification: 0,
  };

  if (state.task !== "unknown" && state.language !== "unknown") {
    scores.specificity += 2;
  } else if (state.task !== "unknown" || state.language !== "unknown") {
    scores.specificity += 1;
  }
  if (state.framework !== "unknown" || state.context.details.trim()) {
    scores.specificity += 1;
  }

  if (state.constraints.selections.length > 0) {
    scores.constraints += 2;
    if (state.constraints.selections.includes("unknown")) {
      scores.constraints -= 1;
    }
  }
  if (state.constraints.custom.trim()) {
    scores.constraints += 1;
  }

  if (state.style.exampleTests === "include") {
    scores.examples += 2;
  } else if (state.style.exampleTests === "unknown") {
    scores.examples += 1;
  }
  if (state.context.snippet.trim()) {
    scores.examples += 1;
  }

  if (state.style.detailLevel === "step-by-step") {
    scores.acceptanceCriteria += 2;
  } else if (state.style.detailLevel !== "unknown") {
    scores.acceptanceCriteria += 1;
  }
  if (state.constraints.selections.includes("time-space-limits")) {
    scores.acceptanceCriteria += 1;
  }

  if (state.tools.selections.includes("unit-tests")) {
    scores.verification += 1;
  }
  if (state.style.exampleTests === "include") {
    scores.verification += 1;
  }
  if (state.style.complexityAnalysis === "include") {
    scores.verification += 1;
  }
  if (state.tools.selections.includes("unknown")) {
    scores.verification -= 1;
  }

  return scores;
}

function formatList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function resolveConstraints(state: WizardData) {
  const items = state.constraints.selections.map(
    (value) => constraintCopy[value],
  );
  if (state.constraints.custom.trim()) {
    items.push(state.constraints.custom.trim());
  }
  if (items.length === 0) {
    items.push(
      "No constraints were supplied. Ask the user about coding standards or delivery expectations.",
    );
  }
  return items;
}

function resolveTools(state: WizardData) {
  const items = state.tools.selections.map((value) => toolCopy[value]);
  if (state.tools.custom.trim()) {
    items.push(state.tools.custom.trim());
  }
  if (items.length === 0) {
    items.push(
      "Tools are unspecified. Confirm whether tests, linters, or package managers are available.",
    );
  }
  return items;
}

export function buildPrompt(state: WizardData) {
  const sections: string[] = [];

  sections.push("## Role", "You are an expert AI coding assistant.");

  sections.push("## Task", taskCopy[state.task]);

  sections.push("## Language", languageCopy[state.language]);

  sections.push("## Framework / Runtime", frameworkCopy[state.framework]);

  const contextLines: string[] = [];
  if (state.context.details.trim()) {
    contextLines.push(state.context.details.trim());
  } else {
    contextLines.push(
      "Context not provided yet. Ask for architecture, requirements, and failure modes before proceeding.",
    );
  }

  if (state.context.snippet.trim()) {
    contextLines.push("\n```text");
    contextLines.push(state.context.snippet.trim());
    contextLines.push("```");
  } else {
    contextLines.push(
      "\n_(Add relevant code snippets or stack traces when available.)_",
    );
  }
  sections.push("## Context", contextLines.join("\n"));

  sections.push("## Constraints", formatList(resolveConstraints(state)));

  const expectationItems = [
    detailOrderCopy[state.style.detailLevel],
    deliveryCopy[state.style.deliveryOrder],
    inclusionCopy.exampleTests[state.style.exampleTests],
    inclusionCopy.complexityAnalysis[state.style.complexityAnalysis],
    "Surface uncertainties and ask clarifying questions before assuming details.",
  ];
  sections.push("## Expectations", formatList(expectationItems));

  const outputItems = [
    "Deliver a structured response with clear section headings.",
    state.style.deliveryOrder === "code-first"
      ? "Present the final solution code first, followed by supporting explanation."
      : state.style.deliveryOrder === "explanation-first"
        ? "Explain the approach before listing final code."
        : "Interleave explanations with code snippets for readability.",
    "Highlight any trade-offs or alternatives considered.",
  ];
  sections.push("## Output Format", formatList(outputItems));

  if (state.style.exampleTests !== "omit") {
    const testNotes =
      state.style.exampleTests === "include"
        ? "Provide runnable example tests that demonstrate expected behavior and edge cases."
        : "Clarify with the user whether example tests are desired before generating them.";
    sections.push("## Test Cases", testNotes);
  }

  const toolLines = resolveTools(state);
  toolLines.push(
    `Target model: ${
      state.target === "general"
        ? "Compatible with most coding LLMs."
        : state.target === "openai"
          ? "Optimized for OpenAI GPT-4/GPT-4.1."
          : state.target === "anthropic"
            ? "Optimized for Anthropic Claude models."
            : state.target === "local-runner"
              ? "Optimized for local/self-hosted coding agents."
              : "Confirm model/agent expectations with the user."
    }`,
  );
  sections.push("## Additional Notes", formatList(toolLines));

  return sections.join("\n\n");
}
