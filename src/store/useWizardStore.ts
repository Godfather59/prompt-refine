import { create } from "zustand";
import {
  type WizardData,
  type WizardStepKey,
  defaultWizardState,
  stepOrder,
} from "../lib/schema";
import type { TemplateId } from "../lib/templates";
import { mergeWizardState } from "../lib/url";

type WizardStore = {
  data: WizardData;
  currentStep: number;
  appliedTemplate: TemplateId | null;
  totalSteps: number;
  setCurrentStep: (index: number) => void;
  next: () => void;
  previous: () => void;
  setTask: (value: WizardData["task"]) => void;
  setLanguage: (value: WizardData["language"]) => void;
  setFrontendFrameworks: (value: WizardData["frontendFrameworks"]) => void;
  toggleFrontendFramework: (
    value: WizardData["frontendFrameworks"][number],
  ) => void;
  setFramework: (value: WizardData["framework"]) => void;
  updateContext: (value: Partial<WizardData["context"]>) => void;
  toggleConstraint: (
    value: WizardData["constraints"]["selections"][number],
  ) => void;
  setConstraintCustom: (value: string) => void;
  setStyle: (value: Partial<WizardData["style"]>) => void;
  toggleTool: (value: WizardData["tools"]["selections"][number]) => void;
  setToolCustom: (value: string) => void;
  setTarget: (value: WizardData["target"]) => void;
  reset: () => void;
  applyTemplate: (preset: Partial<WizardData>, id: TemplateId) => void;
  hydrate: (snapshot: Partial<WizardData> | null) => void;
  stepKey: () => WizardStepKey;
};

const toggleWithUnknown = <T extends string>(
  current: T[],
  value: T,
  unknownMark: T,
) => {
  const set = new Set(current);
  if (set.has(value)) {
    set.delete(value);
  } else {
    if (value === unknownMark) {
      set.clear();
    } else {
      set.delete(unknownMark);
    }
    set.add(value);
  }
  return Array.from(set) as T[];
};

export const useWizardStore = create<WizardStore>((set, get) => ({
  data: structuredClone(defaultWizardState),
  currentStep: 0,
  appliedTemplate: null,
  totalSteps: stepOrder.length,
  stepKey() {
    return stepOrder[get().currentStep] ?? "task";
  },
  setCurrentStep(index) {
    const safeIndex = Math.min(Math.max(index, 0), stepOrder.length - 1);
    set({ currentStep: safeIndex });
  },
  next() {
    const nextIndex = Math.min(get().currentStep + 1, stepOrder.length - 1);
    set({ currentStep: nextIndex });
  },
  previous() {
    const prevIndex = Math.max(get().currentStep - 1, 0);
    set({ currentStep: prevIndex });
  },
  setTask(value) {
    set((state) => ({
      data: { ...state.data, task: value },
    }));
  },
  setLanguage(value) {
    set((state) => ({
      data: { ...state.data, language: value },
    }));
  },
  setFrontendFrameworks(value) {
    set((state) => ({
      data: { ...state.data, frontendFrameworks: value },
    }));
  },
  toggleFrontendFramework(value) {
    set((state) => ({
      data: {
        ...state.data,
        frontendFrameworks: toggleWithUnknown(
          state.data.frontendFrameworks,
          value,
          "unknown",
        ) as WizardData["frontendFrameworks"],
      },
    }));
  },
  setFramework(value) {
    set((state) => ({
      data: { ...state.data, framework: value },
    }));
  },
  updateContext(value) {
    set((state) => ({
      data: {
        ...state.data,
        context: {
          ...state.data.context,
          ...value,
        },
      },
    }));
  },
  toggleConstraint(value) {
    set((state) => ({
      data: {
        ...state.data,
        constraints: {
          ...state.data.constraints,
          selections: toggleWithUnknown(state.data.constraints.selections, value, "unknown"),
        },
      },
    }));
  },
  setConstraintCustom(value) {
    set((state) => ({
      data: {
        ...state.data,
        constraints: {
          ...state.data.constraints,
          custom: value,
        },
      },
    }));
  },
  setStyle(value) {
    set((state) => ({
      data: {
        ...state.data,
        style: {
          ...state.data.style,
          ...value,
        },
      },
    }));
  },
  toggleTool(value) {
    set((state) => ({
      data: {
        ...state.data,
        tools: {
          ...state.data.tools,
          selections: toggleWithUnknown(state.data.tools.selections, value, "unknown"),
        },
      },
    }));
  },
  setToolCustom(value) {
    set((state) => ({
      data: {
        ...state.data,
        tools: {
          ...state.data.tools,
          custom: value,
        },
      },
    }));
  },
  setTarget(value) {
    set((state) => ({
      data: { ...state.data, target: value },
    }));
  },
  reset() {
    set({
      data: structuredClone(defaultWizardState),
      currentStep: 0,
      appliedTemplate: null,
    });
  },
  applyTemplate(preset, id) {
    set(() => ({
      data: mergeWizardState(defaultWizardState, preset),
      appliedTemplate: id,
      currentStep: 0,
    }));
  },
  hydrate(snapshot) {
    if (!snapshot) return;
    set((state) => ({
      data: mergeWizardState(state.data, snapshot),
    }));
  },
}));

