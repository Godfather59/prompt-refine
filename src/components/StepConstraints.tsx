import { useMemo } from "react";
import { useWizardStore } from "../store/useWizardStore";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { SuggestionCard } from "./SuggestionCard";
import { Badge } from "./ui/badge";

const options = [
  {
    value: "project-conventions",
    label: "Follow project conventions",
    description: "Reference the repository's existing style and architecture.",
  },
  {
    value: "avoid-external-deps",
    label: "Avoid external dependencies",
    description: "Prefer built-ins or existing libraries unless approved.",
  },
  {
    value: "explain-reasoning",
    label: "Explain reasoning",
    description: "Provide context and rationale alongside the solution.",
  },
  {
    value: "time-space-limits",
    label: "Time / space limits",
    description: "Call out complexity constraints and performance budgets.",
  },
  {
    value: "unknown",
    label: "I don't know",
    description: "Help me figure out which constraints matter.",
  },
] as const;

function hasConflict(
  selections: string[],
  customConstraint: string,
  toolsNote: string,
) {
  if (!selections.includes("avoid-external-deps")) return false;
  const text = `${customConstraint} ${toolsNote}`.toLowerCase();
  return /\b(allow|use|introduce)\b.*\b(lib|library|package|dependency)\b/.test(
    text,
  );
}

export function StepConstraints() {
  const selections = useWizardStore(
    (state) => state.data.constraints.selections,
  );
  const custom = useWizardStore((state) => state.data.constraints.custom);
  const toolsNote = useWizardStore((state) => state.data.tools.custom);
  const toggle = useWizardStore((state) => state.toggleConstraint);
  const setCustom = useWizardStore((state) => state.setConstraintCustom);

  const conflict = useMemo(
    () => hasConflict(selections, custom, toolsNote),
    [selections, custom, toolsNote],
  );

  return (
    <section aria-label="Set constraints" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Call out guardrails so the assistant respects coding standards and
        limits before responding.
      </p>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`constraint-${option.value}`}
            className="flex cursor-pointer items-start gap-3 rounded-md border border-border/60 bg-background p-3 transition-colors hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary"
          >
            <Checkbox
              id={`constraint-${option.value}`}
              checked={selections.includes(option.value)}
              onCheckedChange={() => toggle(option.value)}
              aria-describedby={`constraint-${option.value}-desc`}
            />
            <div>
              <span className="font-medium text-sm">{option.label}</span>
              <p
                id={`constraint-${option.value}-desc`}
                className="text-sm text-muted-foreground"
              >
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
      <div className="space-y-2">
        <label htmlFor="custom-constraint" className="text-sm font-medium">
          Custom constraint (optional)
        </label>
        <Input
          id="custom-constraint"
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
          placeholder="Example: Ensure the solution passes the existing accessibility test suite."
        />
      </div>
      {conflict ? (
        <Badge variant="warning">
          Possible conflict: you asked to avoid new dependencies but mentioned
          adding a library. Clarify before proceeding.
        </Badge>
      ) : null}
      {selections.includes("unknown") ? (
        <SuggestionCard
          title="Need help defining constraints?"
          suggestions={[
            "Mention code style guides, testing requirements, or deployment timelines.",
            "Call out performance targets or compatibility requirements.",
            "If unsure, ask the AI to propose sensible constraints before coding.",
          ]}
          defaultLabel="Follow project conventions"
          onUseDefault={() => toggle("project-conventions")}
        />
      ) : null}
    </section>
  );
}
