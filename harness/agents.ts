import { spawn } from "node:child_process";
import type {
  EvaluatorResult,
  EvaluatorScores,
  PrimaryResult,
  Rubric,
  SimplifiedRubric,
} from "./types.js";
import {
  renderRubricForEvaluator,
  renderRubricForPrimary,
} from "./rubric.js";

// We shell out to the `claude` CLI in headless mode (`-p`) so the harness
// authenticates via the user's Claude Pro/Max login (OAuth/keychain) instead
// of requiring an ANTHROPIC_API_KEY. The CLI returns a structured JSON blob
// with the result + token usage, which we parse for both the text and budget
// tracking.

export interface ConversationTurn {
  role: "user" | "assistant";
  content: string;
}

export function buildPrimarySystemPrompt(
  task: string,
  simplified: SimplifiedRubric,
): string {
  return [
    `You are the primary agent. Your job is to produce the best possible response to the task below.`,
    `Your output will be graded by an evaluator agent on the following criteria (with weights):`,
    ``,
    renderRubricForPrimary(simplified),
    ``,
    `Optimize for these criteria. After the first iteration, your user message will contain the FULL history of your previous attempts (marked "=== ASSISTANT ===") and the evaluator's feedback (marked "=== USER ==="). Read all of it and produce an improved version that directly addresses the latest feedback.`,
    ``,
    `Output ONLY the response itself — no preamble, no meta-commentary, no "Here is my improved version:" framing.`,
    ``,
    `TASK:`,
    task,
  ].join("\n");
}

export function buildEvaluatorSystemPrompt(rubric: Rubric): string {
  return [
    `You are a rigorous evaluator. You will be shown an output produced by a primary agent in response to a task. Score it on these five criteria:`,
    ``,
    renderRubricForEvaluator(rubric),
    ``,
    `SCORING CALIBRATION (apply strictly):`,
    `- 10: Flawless on this dimension — nothing to improve, could ship as-is.`,
    `- 9:  Excellent — only the most pedantic nitpick could improve it.`,
    `- 8:  Good — solid work, one clear and addressable improvement available.`,
    `- 7:  Acceptable — notable issues but delivers the core value.`,
    `- 6 or below: Significant problem on this dimension.`,
    ``,
    `A first-pass output that meets all spec requirements should score 8–8.5 on most criteria. Reserve 9+ for genuinely standout work. Do NOT cluster at 9 across the board — be honest about which dimensions are actually excellent vs merely adequate.`,
    ``,
    `PRIOR FEEDBACK RULE: If a <prior_eval> block is included in the user message, you MUST read it before scoring. Do not recommend reverting a change you explicitly requested in a prior evaluation — if the primary addressed your feedback, acknowledge it. Score the improvement relative to what you asked for, not against some new standard.`,
    ``,
    `Respond with STRICT JSON only — no prose, no markdown fences, no preamble. Shape:`,
    `{`,
    `  "scores": {`,
    `    "accuracy": <number 0-10>,`,
    `    "efficiency": <number 0-10>,`,
    `    "code_quality": <number 0-10>,`,
    `    "spec_fidelity": <number 0-10>,`,
    `    "semantic_quality": <number 0-10>`,
    `  },`,
    `  "justification": "<3-6 sentences. Be specific. Name the single biggest improvement the primary should make next iteration.>"`,
    `}`,
  ].join("\n");
}

interface CliResult {
  text: string;
  inputTokens: number; // includes cache create + cache read, since both count
  outputTokens: number;
}

/**
 * Spawns `claude -p --output-format json` and pipes the prompt via stdin.
 * Returns the result text + usage. Rejects with a clear message if the CLI
 * isn't installed, exits non-zero, or returns an error envelope.
 */
function callClaudeCli(args: {
  model: string;
  systemPrompt: string;
  userPrompt: string;
}): Promise<CliResult> {
  return new Promise((resolve, reject) => {
    const child = spawn("claude", [
      "-p",
      "--output-format", "json",
      "--model", args.model,
      "--system-prompt", args.systemPrompt,
      "--tools", "", // disable all tools — these agents only produce text
      "--no-session-persistence", // ephemeral; we don't want sessions piling up
      "--disable-slash-commands",
    ]);

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    child.on("error", (err) => {
      reject(
        new Error(
          `Failed to spawn the \`claude\` CLI: ${err.message}. Make sure Claude Code is installed and \`claude\` is on your PATH.`,
        ),
      );
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `claude CLI exited with code ${code}.\nstderr: ${stderr.slice(0, 800)}\nstdout: ${stdout.slice(0, 500)}`,
          ),
        );
        return;
      }
      try {
        const parsed = JSON.parse(stdout);
        if (parsed.is_error === true) {
          reject(
            new Error(
              `claude CLI returned an error envelope: ${JSON.stringify({
                subtype: parsed.subtype,
                api_error_status: parsed.api_error_status,
              })}`,
            ),
          );
          return;
        }
        const u = parsed.usage ?? {};
        // Count only real prompt + output tokens. Cache creation/read tokens
        // are fixed CLI overhead per call (loading default system prompt,
        // tool defs, CLAUDE.md) — they don't vary with what we ask, so they're
        // noise in the efficiency metric and would falsely trip the budget.
        const inputTokens = u.input_tokens ?? 0;
        const outputTokens = u.output_tokens ?? 0;
        resolve({
          text: String(parsed.result ?? "").trim(),
          inputTokens,
          outputTokens,
        });
      } catch (err) {
        reject(
          new Error(
            `Failed to parse claude CLI JSON output: ${(err as Error).message}\nFirst 500 chars: ${stdout.slice(0, 500)}`,
          ),
        );
      }
    });

    child.stdin.write(args.userPrompt);
    child.stdin.end();
  });
}

/**
 * Flattens a multi-turn conversation into a single user prompt. The system
 * prompt tells the model how to interpret the "=== USER ===" / "=== ASSISTANT ==="
 * section headers so it can pick up where the previous iteration left off.
 */
function flattenConversation(conversation: ConversationTurn[]): string {
  // First iteration is always a single user "go" message — pass as-is.
  if (conversation.length === 1 && conversation[0].role === "user") {
    return conversation[0].content;
  }
  return conversation
    .map((turn) => {
      const label = turn.role === "user" ? "USER" : "ASSISTANT";
      return `=== ${label} ===\n${turn.content}`;
    })
    .join("\n\n");
}

export async function callPrimary(
  model: string,
  systemPrompt: string,
  conversation: ConversationTurn[],
): Promise<PrimaryResult> {
  const userPrompt = flattenConversation(conversation);
  const result = await callClaudeCli({ model, systemPrompt, userPrompt });
  return {
    text: result.text,
    inputTokens: result.inputTokens,
    outputTokens: result.outputTokens,
  };
}

export async function callEvaluator(
  model: string,
  systemPrompt: string,
  task: string,
  primaryOutput: string,
  priorEval?: { scores: EvaluatorScores; justification: string },
): Promise<EvaluatorResult> {
  const priorBlock = priorEval
    ? [
        `<prior_eval>`,
        `Prior scores: ${JSON.stringify(priorEval.scores)}`,
        `Prior feedback: ${priorEval.justification}`,
        `</prior_eval>`,
        ``,
      ].join("\n")
    : "";
  const userPrompt = `${priorBlock}Grade the primary agent's output against the task below. Respond with strict JSON only.\n\n<task>\n${task}\n</task>\n\n<output>\n${primaryOutput}\n</output>`;

  const first = await callClaudeCli({ model, systemPrompt, userPrompt });
  const parsed = tryParseEval(first.text);
  if (parsed) {
    return {
      ...parsed,
      inputTokens: first.inputTokens,
      outputTokens: first.outputTokens,
    };
  }

  // One retry, reminding the evaluator to emit pure JSON.
  const retryPrompt = `Your previous response was not valid JSON. The task and output were:\n\n<task>\n${task}\n</task>\n\n<output>\n${primaryOutput}\n</output>\n\nRespond again with strict JSON only — no prose, no markdown fences.`;
  const retry = await callClaudeCli({
    model,
    systemPrompt,
    userPrompt: retryPrompt,
  });
  const reparsed = tryParseEval(retry.text);
  if (!reparsed) {
    throw new Error(
      `Evaluator returned non-JSON twice. Last response:\n${retry.text.slice(0, 500)}`,
    );
  }
  return {
    ...reparsed,
    inputTokens: first.inputTokens + retry.inputTokens,
    outputTokens: first.outputTokens + retry.outputTokens,
  };
}

interface ParsedEval {
  scores: EvaluatorScores;
  justification: string;
}

function tryParseEval(text: string): ParsedEval | null {
  let cleaned = text.trim();
  const fenceMatch = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (fenceMatch) cleaned = fenceMatch[1].trim();

  try {
    const parsed = JSON.parse(cleaned) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const obj = parsed as Record<string, unknown>;
    const scoresRaw = obj.scores;
    const justification = obj.justification;
    if (
      !scoresRaw ||
      typeof scoresRaw !== "object" ||
      typeof justification !== "string"
    ) {
      return null;
    }
    const s = scoresRaw as Record<string, unknown>;
    const keys: (keyof EvaluatorScores)[] = [
      "accuracy",
      "efficiency",
      "code_quality",
      "spec_fidelity",
      "semantic_quality",
    ];
    const scores: Partial<EvaluatorScores> = {};
    for (const k of keys) {
      const v = s[k];
      if (typeof v !== "number" || !Number.isFinite(v) || v < 0 || v > 10) {
        return null;
      }
      scores[k] = v;
    }
    return { scores: scores as EvaluatorScores, justification };
  } catch {
    return null;
  }
}
