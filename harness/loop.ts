import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type {
  Config,
  ExitReason,
  IterationResult,
  RunSummary,
} from "./types.js";
import { mergeRubric, scoreToFinal, simplifiedForPrimary } from "./rubric.js";
import {
  buildEvaluatorSystemPrompt,
  buildPrimarySystemPrompt,
  callEvaluator,
  callPrimary,
  type ConversationTurn,
} from "./agents.js";

export interface LoopOptions {
  config: Config;
  runDir: string;
  // Optional logger so the CLI can format console output. Defaults to console.log.
  log?: (line: string) => void;
}

/**
 * Runs the primary↔evaluator loop. Writes per-iteration artifacts into
 * runDir as it goes. Returns a RunSummary when an exit condition trips.
 */
export async function runLoop(opts: LoopOptions): Promise<RunSummary> {
  const { config, runDir } = opts;
  const log = opts.log ?? ((line: string) => console.log(line));

  const rubric = mergeRubric(config.weights);
  const simplified = simplifiedForPrimary(rubric);
  const primarySystem = buildPrimarySystemPrompt(config.task, simplified);
  const evaluatorSystem = buildEvaluatorSystemPrompt(rubric);

  const conversation: ConversationTurn[] = [
    // Iter 1 kickoff is just the task itself — task is already in system,
    // but having a user turn makes the API contract happy and gives the
    // primary a clear "go" signal.
    { role: "user", content: "Produce your first attempt now." },
  ];

  const iterations: IterationResult[] = [];
  let cumulativeTokens = 0;
  let prevFinalScore = 0;
  let exitReason: ExitReason | null = null;
  const startedAt = new Date().toISOString();

  for (let iter = 1; iter <= config.maxIterations; iter++) {
    // --- Primary turn ---
    const primary = await callPrimary(
      config.primaryModel,
      primarySystem,
      conversation,
    );
    conversation.push({ role: "assistant", content: primary.text });
    writeFileSync(
      join(runDir, `iter-${pad(iter)}-output.txt`),
      primary.text,
      "utf8",
    );

    // --- Evaluator turn ---
    // Pass the previous iteration's eval so the evaluator can avoid contradicting its own feedback.
    const priorEval =
      iterations.length > 0
        ? {
            scores: iterations[iterations.length - 1].scores,
            justification: iterations[iterations.length - 1].justification,
          }
        : undefined;
    const evalResult = await callEvaluator(
      config.evaluatorModel,
      evaluatorSystem,
      config.task,
      primary.text,
      priorEval,
    );

    const finalScore = scoreToFinal(evalResult.scores, rubric);
    const scoreDelta = iter === 1 ? finalScore : finalScore - prevFinalScore;
    const improvementPct =
      iter === 1 || prevFinalScore === 0
        ? 0
        : (scoreDelta / prevFinalScore) * 100;

    const tokensThisIter =
      primary.inputTokens +
      primary.outputTokens +
      evalResult.inputTokens +
      evalResult.outputTokens;
    cumulativeTokens += tokensThisIter;

    // Efficiency: score points gained per 1k tokens this round.
    // Iter 1 always returns 0 — we don't have a delta yet.
    const efficiency =
      iter === 1 ? 0 : scoreDelta / (tokensThisIter / 1000);

    const result: IterationResult = {
      iter,
      output: primary.text,
      scores: evalResult.scores,
      justification: evalResult.justification,
      finalScore,
      scoreDelta,
      improvementPct,
      tokensThisIter,
      cumulativeTokens,
      efficiency,
    };
    iterations.push(result);

    writeFileSync(
      join(runDir, `iter-${pad(iter)}-eval.json`),
      JSON.stringify(
        {
          finalScore,
          scoreDelta,
          improvementPct,
          tokensThisIter,
          cumulativeTokens,
          efficiency,
          scores: evalResult.scores,
          justification: evalResult.justification,
        },
        null,
        2,
      ),
      "utf8",
    );

    log(
      `iter ${iter} — score ${finalScore.toFixed(2)} — Δ${formatDelta(scoreDelta)} — ${tokensThisIter} tok — eff ${efficiency.toFixed(2)} — cum ${cumulativeTokens} tok`,
    );

    // --- Exit checks (order matters: hard cap first, then plateau/efficiency) ---
    if (cumulativeTokens >= config.tokenBudget) {
      exitReason = "token-budget";
      break;
    }
    if (iter >= config.maxIterations) {
      exitReason = "max-iterations";
      break;
    }
    // Plateau + efficiency checks need iter >= 2 (we have a real delta).
    if (iter >= 2) {
      if (scoreDelta < 0) {
        // Score went backwards — stop immediately, don't iterate into a worse state.
        exitReason = "regression";
        break;
      }
      if (improvementPct < config.minImprovementPct) {
        exitReason = "score-plateau";
        break;
      }
      if (efficiency < config.efficiencyThreshold) {
        exitReason = "efficiency-floor";
        break;
      }
    }

    // --- Feed evaluator's feedback back to primary for next iter ---
    conversation.push({
      role: "user",
      content: [
        `Evaluator scored your last attempt ${finalScore.toFixed(2)}/100.`,
        ``,
        `Per-criterion scores (0-10):`,
        `- accuracy: ${evalResult.scores.accuracy}`,
        `- efficiency: ${evalResult.scores.efficiency}`,
        `- code_quality: ${evalResult.scores.code_quality}`,
        `- spec_fidelity: ${evalResult.scores.spec_fidelity}`,
        `- semantic_quality: ${evalResult.scores.semantic_quality}`,
        ``,
        `Feedback: ${evalResult.justification}`,
        ``,
        `Produce an improved version. Address the feedback directly. Focus on whichever criterion scored lowest.`,
      ].join("\n"),
    });

    prevFinalScore = finalScore;
  }

  if (!exitReason) exitReason = "max-iterations"; // defensive; shouldn't hit

  const best = iterations.reduce(
    (acc, r) => (r.finalScore > acc.finalScore ? r : acc),
    iterations[0],
  );

  return {
    projectName: config.projectName,
    startedAt,
    finishedAt: new Date().toISOString(),
    exitReason,
    iterations,
    totalTokens: cumulativeTokens,
    bestIter: best.iter,
    bestScore: best.finalScore,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatDelta(d: number): string {
  if (d === 0) return "  0.00";
  return (d > 0 ? "+" : "") + d.toFixed(2);
}
