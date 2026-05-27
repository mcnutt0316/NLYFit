// Shared types for the harness. One file = single source of truth.

export type CriterionName =
  | "accuracy"
  | "efficiency"
  | "code_quality"
  | "user_experience"
  | "market_appeal";

export interface RubricCriterion {
  name: CriterionName;
  weight: number; // 0..1; all weights across the rubric must sum to 1
  description: string; // guidance shown to the evaluator only
}

export interface Rubric {
  criteria: RubricCriterion[];
}

// Subset of rubric the primary agent sees — no grading guidance, just
// names + weights so it knows what's being optimized for.
export interface SimplifiedRubric {
  criteria: Array<{ name: CriterionName; weight: number }>;
}

// Partial weights map for config overrides. Any criterion not listed
// keeps its default weight.
export type WeightOverrides = Partial<Record<CriterionName, number>>;

export interface Config {
  projectName: string;
  task: string; // the prompt fed to the primary agent
  maxIterations: number;
  tokenBudget: number; // hard cap across the whole run
  minImprovementPct: number; // exit if score gain < this (in %)
  efficiencyThreshold: number; // exit if (scoreDelta per 1k tokens) < this
  weights?: WeightOverrides;
  primaryModel: string;
  evaluatorModel: string;
}

export interface EvaluatorScores {
  // Raw 0..10 per criterion. Final score is computed from these.
  accuracy: number;
  efficiency: number;
  code_quality: number;
  user_experience: number;
  market_appeal: number;
}

export interface EvaluatorResult {
  scores: EvaluatorScores;
  justification: string; // short per-criterion reasoning, fed back to primary
  inputTokens: number;
  outputTokens: number;
}

export interface PrimaryResult {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

export interface IterationResult {
  iter: number; // 1-indexed
  output: string; // primary's text
  scores: EvaluatorScores;
  justification: string;
  finalScore: number; // 0..100
  scoreDelta: number; // finalScore - prev finalScore (0 on iter 1)
  improvementPct: number; // (scoreDelta / prevFinalScore) * 100 (0 on iter 1)
  tokensThisIter: number; // primary + evaluator input+output
  cumulativeTokens: number;
  efficiency: number; // scoreDelta / (tokensThisIter / 1000), 0 on iter 1
}

export type ExitReason =
  | "max-iterations"
  | "score-plateau"
  | "efficiency-floor"
  | "token-budget";

export interface RunSummary {
  projectName: string;
  startedAt: string; // ISO
  finishedAt: string; // ISO
  exitReason: ExitReason;
  iterations: IterationResult[];
  totalTokens: number;
  bestIter: number;
  bestScore: number;
}
