# Multi-Agent Harness

A small CLI that runs a primary → evaluator loop by shelling out to the local `claude` CLI in headless mode. Authenticates via your Claude Pro/Max subscription — no separate API key, no extra billing. Lives entirely under `harness/`, separate from the Next.js app build.

## How it works

1. **Primary agent** (default: Sonnet 4.6) reads the task + a simplified rubric (criterion names + weights only) and writes an attempt.
2. **Evaluator agent** (default: Opus 4.7) reads the attempt and the *full* rubric (with grading guidance), then returns strict JSON: per-criterion scores 0–10 plus a short justification.
3. The justification is fed back to the primary as the next user turn. Primary tries again.
4. Loop stops when **any** of these trip:
   - `maxIterations` reached
   - improvement vs. previous iter < `minImprovementPct` (default 2%)
   - token efficiency (score points per 1k tokens) < `efficiencyThreshold` (default 0.05)
   - cumulative tokens ≥ `tokenBudget` (hard cap)

Final score = Σ(criterion_score × weight) × 10 → 0–100.

## Setup

You need two things on your machine:

1. **The `claude` CLI** (Claude Code) — already installed if you're using Claude Code. Verify with `claude --version`. Must be logged in via your Pro/Max subscription (`claude auth` if you're not).
2. **`tsx`** to run the harness TypeScript — already added as a dev dependency.

That's it. No `ANTHROPIC_API_KEY`, no `.env.local`, no billing setup.

**Quota note:** Each harness run fires roughly `2 × maxIterations` calls to the `claude` CLI (one primary + one evaluator per iteration). These count against your Claude Pro 5-hour message window. A single 4-iteration run is 8 calls — fine. Three or four runs in an hour can start to chew through your window; if you hit a limit, regular Claude chat will be rate-limited until the window resets.

## Run

```bash
# the first NLYFit config
npm run harness:nlyfit

# or any config
npm run harness -- harness/configs/your-config.json
```

Output lands in `harness/runs/<ISO-timestamp>-<projectName>/`:

- `config.json` — snapshot of the config that produced the run
- `iter-NN-output.txt` — primary's raw output for iter NN
- `iter-NN-eval.json` — evaluator's scores + justification for iter NN
- `summary.json` — machine-readable run record
- `summary.md` — human-readable table + per-iteration justifications

## Config schema

```json
{
  "projectName": "string — used in run folder name",
  "task": "string — the prompt fed to the primary agent",
  "maxIterations": 4,
  "tokenBudget": 60000,
  "minImprovementPct": 2,
  "efficiencyThreshold": 0.05,
  "primaryModel": "claude-sonnet-4-6",
  "evaluatorModel": "claude-opus-4-7",
  "weights": {
    "accuracy": 0.3,
    "efficiency": 0.1,
    "code_quality": 0.2,
    "user_experience": 0.2,
    "market_appeal": 0.2
  }
}
```

All fields except `projectName` and `task` are optional and fall back to defaults. If `weights` is provided, it must include all five criteria summing to 1.0 — partial overrides are merged with defaults.

The five criteria are fixed: `accuracy`, `efficiency`, `code_quality`, `user_experience`, `market_appeal`. Their grading guidance lives in `harness/rubric.ts` (`DEFAULT_RUBRIC`).

## Adding a new project

1. Copy `configs/nlyfit-iron-critique.json` → `configs/your-project.json`.
2. Edit `projectName`, `task`, and any overrides.
3. Run with `npm run harness -- harness/configs/your-project.json`.

That's it — no harness code changes needed for a new project.
