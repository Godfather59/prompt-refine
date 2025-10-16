import { useWizardStore } from "../store/useWizardStore";
import { SuggestionCard } from "./SuggestionCard";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const detailOptions = [
  { value: "concise", label: "Concise", description: "Keep answers lean." },
  {
    value: "detailed",
    label: "Detailed",
    description: "Explain rationale with supporting notes.",
  },
  {
    value: "step-by-step",
    label: "Step-by-step",
    description: "Plan out the approach before implementation.",
  },
  {
    value: "unknown",
    label: "I don't know",
    description: "Recommend what level of detail makes sense.",
  },
] as const;

const deliveryOptions = [
  {
    value: "code-first",
    label: "Code first",
    description: "Show the final solution before discussing it.",
  },
  {
    value: "explanation-first",
    label: "Explanation first",
    description: "Lay out the reasoning before showing code.",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Alternate between context and code snippets.",
  },
  {
    value: "unknown",
    label: "I don't know",
    description: "Let the assistant choose the best ordering.",
  },
] as const;

const preferenceOptions = [
  { value: "include", label: "Include" },
  { value: "omit", label: "Skip" },
  { value: "unknown", label: "I don't know" },
] as const;

export function StepStyle() {
  const style = useWizardStore((state) => state.data.style);
  const setStyle = useWizardStore((state) => state.setStyle);

  const unknownSelected =
    style.detailLevel === "unknown" ||
    style.deliveryOrder === "unknown" ||
    style.exampleTests === "unknown" ||
    style.complexityAnalysis === "unknown";

  return (
    <section aria-label="Choose style and output" className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Tune how the assistant structures the answer, whether to include tests,
        and how much explanation is needed.
      </p>

      <div className="space-y-3">
        <span className="text-sm font-medium">Detail level</span>
        <div className="grid gap-3 md:grid-cols-2">
          {detailOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setStyle({ detailLevel: option.value })}
              className={`rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 ${style.detailLevel === option.value ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50 hover:bg-muted/40"}`}
            >
              <span className="text-sm font-semibold">{option.label}</span>
              <span className="block text-sm text-muted-foreground">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-sm font-medium">Output order</span>
        <div className="grid gap-3 md:grid-cols-2">
          {deliveryOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setStyle({ deliveryOrder: option.value })}
              className={`rounded-lg border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 ${style.deliveryOrder === option.value ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/50 hover:bg-muted/40"}`}
            >
              <span className="text-sm font-semibold">{option.label}</span>
              <span className="block text-sm text-muted-foreground">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <span className="text-sm font-medium">Include example tests?</span>
          <div className="flex flex-wrap gap-2" role="group">
            {preferenceOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={
                  style.exampleTests === option.value ? "default" : "outline"
                }
                size="sm"
                aria-pressed={style.exampleTests === option.value}
                onClick={() => setStyle({ exampleTests: option.value })}
              >
                {option.label}
              </Button>
            ))}
          </div>
          {style.exampleTests === "omit" ? (
            <Badge variant="outline">
              Tests will be skipped unless the user asks for them.
            </Badge>
          ) : null}
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Include complexity analysis?</span>
          <div className="flex flex-wrap gap-2" role="group">
            {preferenceOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={
                  style.complexityAnalysis === option.value
                    ? "default"
                    : "outline"
                }
                size="sm"
                aria-pressed={style.complexityAnalysis === option.value}
                onClick={() =>
                  setStyle({ complexityAnalysis: option.value })
                }
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {unknownSelected ? (
        <SuggestionCard
          title="Unsure about tone or structure?"
          suggestions={[
            "Detailed + balanced responses work well for most engineering tasks.",
            "Include example tests when shipping code changes.",
            "Ask for a step-by-step plan when dealing with complex debugging.",
          ]}
          defaultLabel="Detailed & balanced with tests"
          onUseDefault={() =>
            setStyle({
              detailLevel: "detailed",
              deliveryOrder: "balanced",
              exampleTests: "include",
              complexityAnalysis: "omit",
            })
          }
        />
      ) : null}
    </section>
  );
}
