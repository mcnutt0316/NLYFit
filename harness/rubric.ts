import type {
  CriterionName,
  EvaluatorScores,
  Rubric,
  SimplifiedRubric,
  WeightOverrides,
} from "./types.js";

// The global rubric template. Equal weights by default; configs can override.
export const DEFAULT_RUBRIC: Rubric = {
  criteria: [
    {
      name: "accuracy",
      weight: 0.2,
      description:
        "Does the output correctly satisfy what was asked? Are facts, claims, and references right? Penalize hallucination, missed requirements, contradictions.",
    },
    {
      name: "efficiency",
      weight: 0.2,
      description:
        "Is the output appropriately concise for what it's trying to do? Penalize padding, repetition, and circling around the point. Reward tight signal-to-noise.",
    },
    {
      name: "code_quality",
      weight: 0.2,
      description:
        "For code outputs: clarity, correctness, idiomatic style, error handling. For non-code outputs: structural quality — logical flow, clean organization, sound reasoning.",
    },
    {
      name: "spec_fidelity",
      weight: 0.2,
      description:
        "Did the output follow every explicit requirement in the task spec, literally and completely? Go through each stated requirement one by one. Penalize omissions, unsolicited additions, and deviations from explicit instructions. 10 = nothing missing, nothing added, every detail correct. First-pass code that hits all spec requirements should score 8–8.5 here, not 9.",
    },
    {
      name: "semantic_quality",
      weight: 0.2,
      description:
        "For code: correct HTML element choice (section/article/figure/blockquote/cite vs div soup), ARIA attributes where needed (aria-hidden, aria-label), no unnecessary abstractions or extra wrappers, no redundant CSS. For non-code: logical soundness, no unsupported leaps, clear structure. 9+ requires zero semantic violations detectable from source.",
    },
  ],
};

const WEIGHT_SUM_TOLERANCE = 0.001;

/**
 * Returns a rubric with weights overridden per the config. Throws if
 * the resulting weights don't sum to 1.0 — caught early at config load.
 */
export function mergeRubric(overrides?: WeightOverrides): Rubric {
  const criteria = DEFAULT_RUBRIC.criteria.map((c) => ({
    ...c,
    weight: overrides?.[c.name] ?? c.weight,
  }));
  const sum = criteria.reduce((acc, c) => acc + c.weight, 0);
  if (Math.abs(sum - 1) > WEIGHT_SUM_TOLERANCE) {
    throw new Error(
      `Rubric weights must sum to 1.0 (got ${sum.toFixed(4)}). ` +
        `Check your config's "weights" block.`,
    );
  }
  return { criteria };
}

/**
 * Final score on a 0..100 scale. Each criterion is 0..10, multiplied by
 * its weight (which sums to 1), then ×10 to scale into 0..100.
 */
export function scoreToFinal(scores: EvaluatorScores, rubric: Rubric): number {
  let total = 0;
  for (const c of rubric.criteria) {
    const raw = scores[c.name as keyof EvaluatorScores];
    total += raw * c.weight;
  }
  return Math.round(total * 10 * 100) / 100; // two decimals
}

/** What the primary agent sees: names + weights + criterion intent (no grading cutoff language). */
export function simplifiedForPrimary(rubric: Rubric): SimplifiedRubric {
  return {
    criteria: rubric.criteria.map((c) => ({ name: c.name, weight: c.weight })),
  };
}

/** Pretty rubric block for the evaluator system prompt. */
export function renderRubricForEvaluator(rubric: Rubric): string {
  return rubric.criteria
    .map(
      (c) =>
        `- ${c.name} (weight ${c.weight}): ${c.description}`,
    )
    .join("\n");
}

/** Pretty simplified rubric block for the primary system prompt. */
export function renderRubricForPrimary(simplified: SimplifiedRubric): string {
  return simplified.criteria
    .map((c) => `- ${c.name} (weight ${c.weight})`)
    .join("\n");
}

export const CRITERION_NAMES: CriterionName[] = [
  "accuracy",
  "efficiency",
  "code_quality",
  "spec_fidelity",
  "semantic_quality",
];
