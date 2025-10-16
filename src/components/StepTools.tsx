import { useWizardStore } from "../store/useWizardStore";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { SuggestionCard } from "./SuggestionCard";

const options = [
  {
    value: "unit-tests",
    label: "Unit tests",
    description: "Run or generate automated tests.",
  },
  {
    value: "linters",
    label: "Linters",
    description: "Use linting/static analysis outputs.",
  },
  {
    value: "package-managers",
    label: "Package managers",
    description: "Install packages with npm, pip, etc.",
  },
  {
    value: "specific-libraries",
    label: "Specific libraries",
    description: "Leverage known third-party tools.",
  },
  {
    value: "unknown",
    label: "I don't know",
    description: "Need guidance on tool usage.",
  },
] as const;

export function StepTools() {
  const selections = useWizardStore((state) => state.data.tools.selections);
  const custom = useWizardStore((state) => state.data.tools.custom);
  const toggle = useWizardStore((state) => state.toggleTool);
  const setCustom = useWizardStore((state) => state.setToolCustom);

  return (
    <section aria-label="Choose permitted tools" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Share which tooling or automation is allowed so the assistant stays
        within your environment&apos;s boundaries.
      </p>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`tool-${option.value}`}
            className="flex cursor-pointer items-start gap-3 rounded-md border border-border/60 bg-background p-3 transition-colors hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary"
          >
            <Checkbox
              id={`tool-${option.value}`}
              checked={selections.includes(option.value)}
              onCheckedChange={() => toggle(option.value)}
              aria-describedby={`tool-${option.value}-desc`}
            />
            <div>
              <span className="text-sm font-semibold">{option.label}</span>
              <p
                id={`tool-${option.value}-desc`}
                className="text-sm text-muted-foreground"
              >
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <label htmlFor="tools-custom" className="text-sm font-medium">
          Notes (optional)
        </label>
        <Input
          id="tools-custom"
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
          placeholder="Example: You can run npm test and ESLint. Avoid network calls."
        />
      </div>
      {selections.includes("unknown") ? (
        <SuggestionCard
          title="Unsure which tools are okay?"
          suggestions={[
            "Mention if unit tests or linters can run automatically.",
            "Clarify whether package installation is allowed.",
            "If tooling access is limited, ask the assistant to propose manual validation steps.",
          ]}
          defaultLabel="Unit tests"
          onUseDefault={() => toggle("unit-tests")}
        />
      ) : null}
    </section>
  );
}
