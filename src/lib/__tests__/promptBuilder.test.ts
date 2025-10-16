import { describe, expect, it } from "vitest";
import { buildPrompt, computeChecklist } from "../promptBuilder";
import { defaultWizardState } from "../schema";

describe("buildPrompt", () => {
  it("generates markdown sections", () => {
    const prompt = buildPrompt(defaultWizardState);
    expect(prompt).toContain("## Role");
    expect(prompt).toContain("## Task");
    expect(prompt).toContain("## Front-end Frameworks");
    expect(prompt).toContain("## Back-end Runtime");
    expect(prompt).toContain("## Context");
    expect(prompt).toContain("## Additional Notes");
  });

  it("adds TODO hints for unknown values", () => {
    const prompt = buildPrompt({
      ...defaultWizardState,
      task: "unknown",
      language: "unknown",
      framework: "unknown",
      frontendFrameworks: ["unknown"],
      context: { details: "", snippet: "" },
    });

    expect(prompt).toContain("Clarify the user's goal");
    expect(prompt).toContain("Language is unspecified");
    expect(prompt).toContain("Context not provided yet");
  });
});

describe("computeChecklist", () => {
  it("rewards detailed prompts", () => {
    const score = computeChecklist(defaultWizardState);
    expect(score.specificity).toBeGreaterThan(0);
    expect(score.constraints).toBeGreaterThanOrEqual(0);
    expect(score.verification).toBeGreaterThan(0);
  });

  it("penalises missing details", () => {
    const score = computeChecklist({
      ...defaultWizardState,
      task: "unknown",
      language: "unknown",
      framework: "unknown",
      frontendFrameworks: ["unknown"],
      constraints: { selections: [], custom: "" },
      style: {
        detailLevel: "unknown",
        deliveryOrder: "unknown",
        exampleTests: "unknown",
        complexityAnalysis: "unknown",
      },
      tools: { selections: ["unknown"], custom: "" },
    });
    expect(score.specificity).toBeLessThanOrEqual(1);
    expect(score.verification).toBeLessThanOrEqual(1);
  });
});
