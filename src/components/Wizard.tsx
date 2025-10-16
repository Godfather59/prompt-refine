import { useEffect, useMemo, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWizardStore } from "../store/useWizardStore";
import {
  defaultWizardState,
  stepLabels,
  stepOrder,
  type WizardStepKey,
} from "../lib/schema";
import { decodeStateFromQuery, encodeStateToQuery } from "../lib/url";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { StepTask } from "./StepTask";
import { StepLanguage } from "./StepLanguage";
import { StepFramework } from "./StepFramework";
import { StepContext } from "./StepContext";
import { StepConstraints } from "./StepConstraints";
import { StepStyle } from "./StepStyle";
import { StepTools } from "./StepTools";
import { StepTarget } from "./StepTarget";
import { TemplatePicker } from "./TemplatePicker";

const components: Record<WizardStepKey, ComponentType> = {
  task: StepTask,
  language: StepLanguage,
  framework: StepFramework,
  context: StepContext,
  constraints: StepConstraints,
  style: StepStyle,
  tools: StepTools,
  target: StepTarget,
};

export function Wizard() {
  const data = useWizardStore((state) => state.data);
  const currentStep = useWizardStore((state) => state.currentStep);
  const totalSteps = useWizardStore((state) => state.totalSteps);
  const stepKey = useWizardStore((state) => state.stepKey());
  const setCurrentStep = useWizardStore((state) => state.setCurrentStep);
  const next = useWizardStore((state) => state.next);
  const previous = useWizardStore((state) => state.previous);
  const reset = useWizardStore((state) => state.reset);
  const hydrate = useWizardStore((state) => state.hydrate);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const snapshot = decodeStateFromQuery(window.location.search);
    if (snapshot) {
      hydrate(snapshot);
    } else {
      const defaultQuery = encodeStateToQuery(defaultWizardState);
      const url = new URL(window.location.href);
      if (!url.search) {
        url.search = defaultQuery;
        window.history.replaceState(null, "", url.toString());
      }
    }
  }, [hydrate]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = encodeStateToQuery(data);
    const current = window.location.search.startsWith("?")
      ? window.location.search.slice(1)
      : window.location.search;
    if (query !== current) {
      const url = new URL(window.location.href);
      url.search = query;
      window.history.replaceState(null, "", url.toString());
    }
  }, [data]);

  const progress = useMemo(() => {
    if (totalSteps <= 1) return 0;
    return Math.round((currentStep / (totalSteps - 1)) * 100);
  }, [currentStep, totalSteps]);

  const StepComponent = components[stepKey];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Step {currentStep + 1} - {stepLabels[stepKey]}
              </h2>
              <p className="text-sm text-muted-foreground">
                Answer the guided questions to refine your AI prompt.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </div>
          <Progress value={progress} />
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {stepOrder.map((key, index) => (
              <button
                key={key}
                type="button"
                onClick={() => setCurrentStep(index)}
                className={`rounded-full px-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "bg-muted hover:bg-muted/80"
                }`}
              >
                {index + 1}. {stepLabels[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <TemplatePicker />

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap justify-between gap-3 border-t border-border bg-card px-6 py-4">
          <Button
            variant="outline"
            onClick={() => previous()}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (currentStep >= totalSteps - 1) {
                setCurrentStep(0);
              } else {
                next();
              }
            }}
          >
            {currentStep >= totalSteps - 1 ? "Restart" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

