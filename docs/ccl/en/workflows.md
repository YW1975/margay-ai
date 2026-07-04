# Workflows

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

Workflows are CCL's repeatable automation surface for multi-step jobs that need structure, tool execution, progress tracking, and verification. Use a workflow when a task is expected to run again, may take a long time, needs background progress, or has named artifacts that must be checked.

Do not use workflows for ordinary one-off interactive work. If the user did not ask for a workflow and the task can be handled by normal tool calls, use the regular tool loop.

<!-- section: capabilities -->
## Capabilities

CCL exposes workflows through both interactive and headless surfaces. `/workflows` lists saved scripts and recent runs. `/workflows run <name> [--allow Bash,Write]` starts a workflow from the TUI and returns a run ID for tailing. `/workflows --tail <runId>`, `--json`, and `--inspect` expose run state and timelines. `/workflows specs`, `rename`, `copy`, `delete`, and `show` manage saved specs. `/workflows new <goal>` creates an interactive creation payload and probes relevant skill availability.

The headless surface is `ccl workflow run <name-or-path>`. It supports `--json`, `--dry-run`, `--params <json>`, `--allowed-tools`, `--permission-mode`, `--expect-artifact`, `--allow-empty-result`, `--allow-failed-agents`, `--diagnose`, `--goal`, and `--run-id`.

The canonical runtime tool is `WorkflowRun`. Workflow source files must export `default async function workflow(ctx, params)`. Supported sandbox tool calls include `Bash`, `Write`, `Read`, and `Edit`; broader agent work runs through the workflow agent adapter.

<!-- section: operational-model -->
## Operational model

Workflow execution has three layers. The command layer resolves the workflow file or spec, validates arguments, and chooses TUI or headless execution. The runtime layer validates the workflow contract, runs the engine, dispatches allowed tools, tracks phases, and persists run state. The quality layer checks empty results, failed-empty agents, expected artifacts, diagnostics, and final status.

`succeeded` is not the same as "the user's external goal is true." A workflow can verify local artifacts, declared outputs, and self-reported run state, but the caller still needs an objective assertion for external side effects such as a published URL, deployed service, uploaded file, or third-party state change.

For long TUI runs, prefer background execution so the terminal remains usable. Tail the run by ID and inspect failures through run state rather than relying on a single final text message.

<!-- section: configuration -->
## Configuration and commands

Author workflow files directly under `.ccl/workflows/<name>.js` unless a documented configuration overrides the workflows directory. Keep the exported function shape exact:

```js
export default async function workflow(ctx, params) {
  // use ctx.phase, ctx.agent, ctx.tool, etc.
  return { ok: true }
}
```

Operational guidance:

- Declare the minimal `allowedTools` needed by the workflow.
- Use `--dry-run` for contract and argument checks before expensive runs.
- Use `--expect-artifact <path>` for generated files that must exist and be non-empty.
- Use `--json` for scripts and CI.
- Use `--diagnose --goal "<goal>"` when the run outcome needs post-run classification.
- Do not normalize `--dangerously-skip-permissions` as the standard workflow path.

<!-- section: source-evidence -->
## Source evidence

- `commands/workflows/index.ts`: defines `/workflows` listing, run, tail, json, inspect, specs, CRUD, show, and new behavior.
- `cli/workflow-run.ts`: defines `ccl workflow run`, argument parsing, headless execution, JSON output, diagnostics, artifact guards, and error surfacing.
- `tools/WorkflowRun/WorkflowRun.ts`: defines the canonical workflow contract, supported sandbox tools, background run behavior, and quality-guard prompt.
- `tools/WorkflowTool/spec.ts`: defines workflow spec schema and spec CRUD persistence.
- `tools/WorkflowTool/engine.ts`, `qualityGuard.ts`, and `runtimeCritic.ts`: implement workflow execution and validation behavior.

<!-- section: related -->
## Related pages

- [Interactive Commands](commands.md)
- [Built-in Tools](tools.md)
- [Common Workflows](common-workflows.md)
- [Gates and Attestation](gates-attestation.md)
