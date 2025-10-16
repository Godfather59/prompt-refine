import { Bot, Brain, Cloud, FolderCog, CircleHelp } from "lucide-react";
import { useWizardStore } from "../store/useWizardStore";
import { OptionTile } from "./OptionTile";
import { SuggestionCard } from "./SuggestionCard";

const options = [
  {
    value: "general",
    label: "General compatibility",
    description: "Works across most coding LLMs.",
    icon: <Bot className="h-4 w-4 text-primary" />,
  },
  {
    value: "openai",
    label: "OpenAI (GPT)",
    description: "Tailor the prompt for GPT-4.x style models.",
    icon: <Brain className="h-4 w-4 text-primary" />,
  },
  {
    value: "anthropic",
    label: "Anthropic (Claude)",
    description: "Optimize for Claude's conversational style.",
    icon: <Cloud className="h-4 w-4 text-primary" />,
  },
  {
    value: "local-runner",
    label: "Local / self-hosted",
    description: "Focus on concise prompts suited for local agents.",
    icon: <FolderCog className="h-4 w-4 text-primary" />,
  },
  {
    value: "unknown",
    label: "I don't know",
    description: "Need help deciding which model to target.",
    icon: <CircleHelp className="h-4 w-4 text-primary" />,
  },
] as const;

export function StepTarget() {
  const target = useWizardStore((state) => state.data.target);
  const setTarget = useWizardStore((state) => state.setTarget);

  return (
    <section aria-label="Target model" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Specify the intended model so the prompt can call out any quirks or
        formatting preferences.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <OptionTile
            key={option.value}
            label={option.label}
            description={option.description}
            selected={target === option.value}
            icon={option.icon}
            onClick={() => setTarget(option.value)}
          />
        ))}
      </div>
      {target === "unknown" ? (
        <SuggestionCard
          title="Target unclear?"
          suggestions={[
            "If you plan to paste into multiple tools, choose General compatibility.",
            "OpenAI models prefer explicit instructions about reasoning/detail level.",
            "Local agents benefit from concise prompts with explicit validation steps.",
          ]}
          defaultLabel="General compatibility"
          onUseDefault={() => setTarget("general")}
        />
      ) : null}
    </section>
  );
}
