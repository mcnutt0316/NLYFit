import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Config, WeightOverrides } from "./types.js";
import { CRITERION_NAMES, mergeRubric } from "./rubric.js";

const DEFAULTS = {
  maxIterations: 4,
  tokenBudget: 60_000,
  minImprovementPct: 2,
  efficiencyThreshold: 0.05,
  primaryModel: "claude-sonnet-4-6",
  evaluatorModel: "claude-opus-4-7",
};

/**
 * Load + validate a config file. Resolves relative paths against cwd.
 * Throws with a clear message if anything is off — fail fast at the boundary.
 */
export function loadConfig(path: string): Config {
  const absPath = resolve(process.cwd(), path);
  let raw: string;
  try {
    raw = readFileSync(absPath, "utf8");
  } catch (err) {
    throw new Error(`Could not read config at ${absPath}: ${(err as Error).message}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Config at ${absPath} is not valid JSON: ${(err as Error).message}`);
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error(`Config must be a JSON object`);
  }

  const obj = parsed as Record<string, unknown>;

  const projectName = requireString(obj, "projectName");
  const task = requireString(obj, "task");

  const maxIterations = numberOr(obj.maxIterations, DEFAULTS.maxIterations);
  const tokenBudget = numberOr(obj.tokenBudget, DEFAULTS.tokenBudget);
  const minImprovementPct = numberOr(obj.minImprovementPct, DEFAULTS.minImprovementPct);
  const efficiencyThreshold = numberOr(obj.efficiencyThreshold, DEFAULTS.efficiencyThreshold);
  const primaryModel = stringOr(obj.primaryModel, DEFAULTS.primaryModel);
  const evaluatorModel = stringOr(obj.evaluatorModel, DEFAULTS.evaluatorModel);

  if (maxIterations < 1) throw new Error(`maxIterations must be >= 1`);
  if (tokenBudget < 1) throw new Error(`tokenBudget must be >= 1`);

  const weights = parseWeights(obj.weights);
  // Validate weights by trying to merge — throws if they don't sum to 1.
  mergeRubric(weights);

  return {
    projectName,
    task,
    maxIterations,
    tokenBudget,
    minImprovementPct,
    efficiencyThreshold,
    weights,
    primaryModel,
    evaluatorModel,
  };
}

function requireString(obj: Record<string, unknown>, key: string): string {
  const v = obj[key];
  if (typeof v !== "string" || v.trim() === "") {
    throw new Error(`Config field "${key}" is required (non-empty string).`);
  }
  return v;
}

function numberOr(v: unknown, fallback: number): number {
  if (v === undefined) return fallback;
  if (typeof v !== "number" || !Number.isFinite(v)) {
    throw new Error(`Expected number, got ${typeof v}: ${String(v)}`);
  }
  return v;
}

function stringOr(v: unknown, fallback: string): string {
  if (v === undefined) return fallback;
  if (typeof v !== "string") throw new Error(`Expected string, got ${typeof v}`);
  return v;
}

function parseWeights(v: unknown): WeightOverrides | undefined {
  if (v === undefined) return undefined;
  if (!v || typeof v !== "object") {
    throw new Error(`"weights" must be an object of criterion -> number`);
  }
  const out: WeightOverrides = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    if (!CRITERION_NAMES.includes(k as never)) {
      throw new Error(
        `Unknown criterion "${k}" in weights. Valid: ${CRITERION_NAMES.join(", ")}`,
      );
    }
    if (typeof val !== "number" || !Number.isFinite(val) || val < 0) {
      throw new Error(`Weight for "${k}" must be a non-negative number`);
    }
    out[k as keyof WeightOverrides] = val;
  }
  return out;
}
