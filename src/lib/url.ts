import { defaultWizardState, wizardSchema } from "./schema";
import type { WizardData } from "./schema";

const keyMap = {
  task: "t",
  language: "l",
  frontendFrameworks: "ff",
  framework: "f",
  contextDetails: "cd",
  contextSnippet: "cs",
  constraintSelections: "cn",
  constraintCustom: "cc",
  styleDetail: "sd",
  styleDelivery: "so",
  styleTests: "st",
  styleComplexity: "sc",
  toolSelections: "tn",
  toolCustom: "tc",
  target: "tg",
} as const;

const arraySeparator = ".";

export function encodeStateToQuery(state = defaultWizardState) {
  const params = new URLSearchParams();
  params.set(keyMap.task, state.task);
  params.set(keyMap.language, state.language);
  if (state.frontendFrameworks.length > 0) {
    params.set(
      keyMap.frontendFrameworks,
      state.frontendFrameworks.join(arraySeparator),
    );
  }
  params.set(keyMap.framework, state.framework);
  if (state.context.details.trim()) {
    params.set(keyMap.contextDetails, state.context.details);
  }
  if (state.context.snippet.trim()) {
    params.set(keyMap.contextSnippet, state.context.snippet);
  }
  if (state.constraints.selections.length > 0) {
    params.set(
      keyMap.constraintSelections,
      state.constraints.selections.join(arraySeparator),
    );
  }
  if (state.constraints.custom.trim()) {
    params.set(keyMap.constraintCustom, state.constraints.custom);
  }
  params.set(keyMap.styleDetail, state.style.detailLevel);
  params.set(keyMap.styleDelivery, state.style.deliveryOrder);
  params.set(keyMap.styleTests, state.style.exampleTests);
  params.set(keyMap.styleComplexity, state.style.complexityAnalysis);
  if (state.tools.selections.length > 0) {
    params.set(
      keyMap.toolSelections,
      state.tools.selections.join(arraySeparator),
    );
  }
  if (state.tools.custom.trim()) {
    params.set(keyMap.toolCustom, state.tools.custom);
  }
  params.set(keyMap.target, state.target);

  return params.toString();
}

export function decodeStateFromQuery(search: string) {
  const trimmed = search.startsWith("?") ? search.slice(1) : search;
  if (!trimmed) return null;

  const params = new URLSearchParams(trimmed);
  const partial: Partial<WizardData> = {};

  const valueOrUndefined = (key: string) => {
    const value = params.get(key);
    return value === null ? undefined : value;
  };

  const task = valueOrUndefined(keyMap.task);
  if (task) partial.task = task as WizardData["task"];

  const language = valueOrUndefined(keyMap.language);
  if (language) partial.language = language as WizardData["language"];

  const frontendFrameworks = valueOrUndefined(keyMap.frontendFrameworks);
  if (frontendFrameworks) {
    partial.frontendFrameworks = frontendFrameworks
      .split(arraySeparator)
      .filter(Boolean) as WizardData["frontendFrameworks"];
  }

  const framework = valueOrUndefined(keyMap.framework);
  if (framework) partial.framework = framework as WizardData["framework"];

  const contextPatch: Partial<WizardData["context"]> = {};
  const contextDetails = valueOrUndefined(keyMap.contextDetails);
  if (contextDetails !== undefined) {
    contextPatch.details = contextDetails;
  }
  const contextSnippet = valueOrUndefined(keyMap.contextSnippet);
  if (contextSnippet !== undefined) {
    contextPatch.snippet = contextSnippet;
  }
  if (Object.keys(contextPatch).length > 0) {
    partial.context = {
      ...defaultWizardState.context,
      ...contextPatch,
    };
  }

  const constraintPatch: Partial<WizardData["constraints"]> = {};
  const constraintSelections = valueOrUndefined(keyMap.constraintSelections);
  if (constraintSelections) {
    constraintPatch.selections = constraintSelections
      .split(arraySeparator)
      .filter(Boolean) as WizardData["constraints"]["selections"];
  }
  const constraintCustom = valueOrUndefined(keyMap.constraintCustom);
  if (constraintCustom !== undefined) {
    constraintPatch.custom = constraintCustom;
  }
  if (Object.keys(constraintPatch).length > 0) {
    partial.constraints = {
      ...defaultWizardState.constraints,
      ...constraintPatch,
    };
  }

  const stylePatch: Partial<WizardData["style"]> = {};
  const styleDetail = valueOrUndefined(keyMap.styleDetail);
  if (styleDetail) {
    stylePatch.detailLevel = styleDetail as WizardData["style"]["detailLevel"];
  }
  const styleDelivery = valueOrUndefined(keyMap.styleDelivery);
  if (styleDelivery) {
    stylePatch.deliveryOrder = styleDelivery as WizardData["style"]["deliveryOrder"];
  }
  const styleTests = valueOrUndefined(keyMap.styleTests);
  if (styleTests) {
    stylePatch.exampleTests = styleTests as WizardData["style"]["exampleTests"];
  }
  const styleComplexity = valueOrUndefined(keyMap.styleComplexity);
  if (styleComplexity) {
    stylePatch.complexityAnalysis = styleComplexity as WizardData["style"]["complexityAnalysis"];
  }
  if (Object.keys(stylePatch).length > 0) {
    partial.style = {
      ...defaultWizardState.style,
      ...stylePatch,
    };
  }

  const toolsPatch: Partial<WizardData["tools"]> = {};
  const toolSelections = valueOrUndefined(keyMap.toolSelections);
  if (toolSelections) {
    toolsPatch.selections = toolSelections
      .split(arraySeparator)
      .filter(Boolean) as WizardData["tools"]["selections"];
  }
  const toolCustom = valueOrUndefined(keyMap.toolCustom);
  if (toolCustom !== undefined) {
    toolsPatch.custom = toolCustom;
  }
  if (Object.keys(toolsPatch).length > 0) {
    partial.tools = {
      ...defaultWizardState.tools,
      ...toolsPatch,
    };
  }

  const target = valueOrUndefined(keyMap.target);
  if (target) partial.target = target as WizardData["target"];

  const partialSchema = wizardSchema.partial();
  const result = partialSchema.safeParse(partial);
  return result.success ? result.data : null;
}

export function mergeWizardState(
  base = defaultWizardState,
  patch: Partial<typeof defaultWizardState> | null,
) {
  if (!patch) return structuredClone(base);

  return {
    ...base,
    ...patch,
    context: {
      ...base.context,
      ...patch.context,
    },
    constraints: {
      ...base.constraints,
      ...patch.constraints,
    },
    style: {
      ...base.style,
      ...patch.style,
    },
    tools: {
      ...base.tools,
      ...patch.tools,
    },
  };
}
