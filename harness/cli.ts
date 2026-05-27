import { config as loadDotenv } from "dotenv";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadConfig } from "./config.js";
import { runLoop } from "./loop.js";
import type { RunSummary } from "./types.js";

// Load .env.local first (Next-style convention), then .env as fallback.
loadDotenv({ path: ".env.local" });
loadDotenv();

const USAGE = `
Usage:
  npm run harness -- <config.json>
  npm run harness:nlyfit

Runs the primary↔evaluator loop with the given config. Output lands in
harness/runs/<timestamp>/.

Required env: ANTHROPIC_API_KEY (put in .env.local at repo root).
`.trim();

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(USAGE);
    process.exit(args.length === 0 ? 1 : 0);
  }

  const configPath = args[0];
  const config = loadConfig(configPath);

  // One folder per run, named by ISO timestamp (colons swapped for filesystem safety).
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const runDir = resolve(process.cwd(), "harness", "runs", `${stamp}-${config.projectName}`);
  mkdirSync(runDir, { recursive: true });

  // Snapshot the config into the run dir so a run is fully reproducible from its folder.
  copyFileSync(resolve(process.cwd(), configPath), join(runDir, "config.json"));

  console.log(`Run dir: ${runDir}`);
  console.log(`Project: ${config.projectName}`);
  console.log(`Models: primary=${config.primaryModel}  evaluator=${config.evaluatorModel}`);
  console.log(`Budget: ${config.tokenBudget} tok max, up to ${config.maxIterations} iters`);
  console.log(`Exit floors: improvement < ${config.minImprovementPct}%  |  efficiency < ${config.efficiencyThreshold}`);
  console.log("");

  const summary = await runLoop({ config, runDir });

  writeFileSync(join(runDir, "summary.json"), JSON.stringify(summary, null, 2), "utf8");
  writeFileSync(join(runDir, "summary.md"), renderSummaryMd(summary), "utf8");

  console.log("");
  console.log(`Exit: ${summary.exitReason}`);
  console.log(`Best iter: ${summary.bestIter} (score ${summary.bestScore.toFixed(2)})`);
  console.log(`Total tokens: ${summary.totalTokens}`);
  console.log(`Artifacts: ${runDir}`);
}

function renderSummaryMd(s: RunSummary): string {
  const header = [
    `# Run summary — ${s.projectName}`,
    ``,
    `- Started: ${s.startedAt}`,
    `- Finished: ${s.finishedAt}`,
    `- Exit reason: **${s.exitReason}**`,
    `- Best iteration: **${s.bestIter}** (score ${s.bestScore.toFixed(2)})`,
    `- Total tokens: ${s.totalTokens}`,
    ``,
    `## Iterations`,
    ``,
    `| Iter | Score | Δ | Improvement % | Tokens | Cum tokens | Efficiency |`,
    `|-----:|------:|--:|--------------:|-------:|-----------:|-----------:|`,
  ];
  const rows = s.iterations.map(
    (r) =>
      `| ${r.iter} | ${r.finalScore.toFixed(2)} | ${r.scoreDelta.toFixed(2)} | ${r.improvementPct.toFixed(2)} | ${r.tokensThisIter} | ${r.cumulativeTokens} | ${r.efficiency.toFixed(2)} |`,
  );

  const feedback = [
    ``,
    `## Per-iteration justifications`,
    ``,
    ...s.iterations.map(
      (r) => `### Iter ${r.iter} (score ${r.finalScore.toFixed(2)})\n\n${r.justification}\n`,
    ),
  ];

  return [...header, ...rows, ...feedback].join("\n");
}

main().catch((err) => {
  console.error("Harness failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
