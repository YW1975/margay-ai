# Common Workflows

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

Common CCL workflows are repeatable ways to combine session control, tools, agents, workflows, and evidence. They are not a separate feature from the runtime; they are operating patterns that help users and guide agents choose the right CCL surface for the job.

The best workflow is the smallest one that leaves enough evidence to prove the outcome. A passing command without source accuracy, a generated file without inspection, or a workflow status without external verification is not enough for authoritative work.

<!-- section: capabilities -->
## Capabilities

For code changes, use the interactive loop: inspect the repo, make focused edits, run the project's verifier, and summarize changed files plus actual test output. Use subagents for broad research or independent verification, but keep final edits and claims in the main session.

For documentation work, use a stricter pattern: inventory the current public pages, derive feature coverage from source files and CLI output, write source-backed content, run parity/link/translation checks, build the site, scan rendered HTML, and run public-content safety audits.

For repeatable long jobs, use workflows. A workflow should declare inputs, tools, expected artifacts, diagnostics, and a post-run assertion. Use headless `ccl workflow run` for cron/CI and `/workflows run` for interactive background execution.

For automation and CI, prefer print mode with explicit output format, bounded turns, narrow tool rules, and a caller-owned timeout. Treat stdout as an API contract, not as a transcript for humans to interpret later.

<!-- section: operational-model -->
## Operational model

Start by classifying the task:

- Exploratory or ambiguous: interactive session.
- Deterministic one-shot: print mode.
- Repeatable multi-step job: workflow.
- Broad source or web research: subagent, then main-session synthesis.
- High-risk publication or code delivery: reviewed loop with evidence.

Then define the proof. For code, proof is tests and relevant runtime checks. For docs, proof is source citations, coverage, build, rendered output, and safety scans. For workflows, proof is run state plus artifact or external assertions. For remote or third-party actions, proof must come from the target system whenever possible.

<!-- section: configuration -->
## Configuration and commands

Useful patterns:

- Explore: `rg`, read key files, inspect CLI help/version, then edit.
- Verify docs: `node scripts/check-docs.mjs`, `bash scripts/audit-public-content.sh`, `node scripts/build-site.mjs`, plus rendered HTML spot checks.
- Verify CCL public coverage: `node scripts/check-official-docs-coverage.mjs --check=structure|inventory|agent-scope`.
- Run a bounded automation task: `ccl -p "<task>" --output-format json --max-turns 20 --allowed-tools Read Grep Bash`.
- Run a workflow: `ccl workflow run <name> --json --params '{"key":"value"}' --expect-artifact out/report.md`.

Use Ralph-Lisa review for changes that need independent scrutiny. The reviewer should check direction, source evidence, tests, and whether success claims are stronger than the proof.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` and `cli/print.ts`: define interactive vs print-mode surfaces and automation controls.
- `commands/workflows/index.ts`, `cli/workflow-run.ts`, and `tools/WorkflowRun/WorkflowRun.ts`: define workflow command surfaces and runtime behavior.
- `tools/AgentTool/AgentTool.tsx` and `tools/AgentTool/builtInAgents.ts`: provide subagent delegation surfaces.
- `scripts/check-official-docs-coverage.mjs` in the CCL repo plus `scripts/check-docs.mjs` and `scripts/audit-public-content.sh` in the public docs repo: current documentation verification commands used by this official-docs update.
- `AGENTS.md`: defines the RLL review protocol used for reviewed delivery in this repository.

<!-- section: related -->
## Related pages

- [Workflows](workflows.md)
- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Public Documentation Publishing](public-docs.md)
