import { useMemo } from "react";
import {
  Bug,
  Code,
  BrainCircuit,
  Wrench,
  Hammer,
  FileCode,
  FileSearch,
  CircleHelp,
} from "lucide-react";
import { OptionTile } from "./OptionTile";
import { SuggestionCard } from "./SuggestionCard";
import { useWizardStore } from "../store/useWizardStore";

type TaskValue = (typeof options)[number]["value"];

const options = [
  {
    value: "debugging",
    label: "Debugging",
    description: "Track down bugs and provide fixes plus root-cause analysis.",
    icon: <Bug className="h-4 w-4 text-primary" />,
  },
  {
    value: "write-code",
    label: "Write Code",
    description: "Implement new features or utilities with production quality.",
    icon: <Code className="h-4 w-4 text-primary" />,
  },
  {
    value: "explain-code",
    label: "Explain Code",
    description: "Summarize what the referenced code does and why.",
    icon: <FileSearch className="h-4 w-4 text-primary" />,
  },
  {
    value: "refactor",
    label: "Refactor",
    description: "Improve structure without changing behavior.",
    icon: <Wrench className="h-4 w-4 text-primary" />,
  },
  {
    value: "add-tests",
    label: "Add Tests",
    description: "Design regression coverage and edge-case checks.",
    icon: <Hammer className="h-4 w-4 text-primary" />,
  },
  {
    value: "architecture-advice",
    label: "Architecture Advice",
    description: "Review design decisions and recommend next steps.",
    icon: <BrainCircuit className="h-4 w-4 text-primary" />,
  },
  {
    value: "code-review",
    label: "Code Review",
    description: "Assess diffs, surface risks, and recommend improvements.",
    icon: <FileCode className="h-4 w-4 text-primary" />,
  },
  {
    value: "unknown",
    label: "I don't know",
    description: "Guide me toward the best prompt type.",
    icon: <CircleHelp className="h-4 w-4 text-primary" />,
  },
] as const;

export function StepTask() {
  const task = useWizardStore((state) => state.data.task);
  const setTask = useWizardStore((state) => state.setTask);
  const next = useWizardStore((state) => state.next);
  const suggestion = useMemo(
    () => [
      "Clarify what a successful outcome looks like (new feature, fix, deep dive).",
      "Ask the user for any artifacts they can provide (logs, snippets, specs).",
      "Start by outlining the approach before writing code to ensure alignment.",
    ],
    [],
  );

  const handleSelect = (value: TaskValue) => {
    setTask(value);
    if (value !== "unknown") {
      next();
    }
  };

  return (
    <section aria-label="Select task type" className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose the primary objective so the assistant can frame the response
        correctly.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => (
          <OptionTile
            key={option.value}
            label={option.label}
            description={option.description}
            selected={task === option.value}
            icon={option.icon}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
      {task === "unknown" ? (
        <SuggestionCard
          title="Not sure where to start?"
          suggestions={suggestion}
          defaultLabel="Write Code"
          onUseDefault={() => handleSelect("write-code")}
        />
      ) : null}
    </section>
  );
}
