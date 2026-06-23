# Clarify and Planning

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL governance supports explicit clarification, scope locking, planning, plan-mode entry and exit, and verification that planned work was actually executed.

<!-- section: capabilities -->
## Capabilities

- Use clarify flows when requirements are ambiguous or high risk.
- Use plan mode to inspect and propose before writing.
- Use verification tools to check that implementation matches the accepted plan.

<!-- section: operational-model -->
## Operational model

- Planning should reduce uncertainty. It should not become ceremony when the user explicitly selects a lighter acceptance path.

<!-- section: configuration -->
## Configuration and commands

- Relevant tools: `EnterPlanModeTool`, `ExitPlanModeTool`, `VerifyPlanExecutionTool`, planning commands, and RLL clarify artifacts.

<!-- section: source-evidence -->
## Source evidence

- `tools/EnterPlanModeTool`
- `tools/ExitPlanModeTool`
- `tools/VerifyPlanExecutionTool`
- `commands/plan`
- `AGENTS.md`

<!-- section: related -->
## Related pages

- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Gates and Attestation](gates-attestation.md)
- [Workflows](workflows.md)
