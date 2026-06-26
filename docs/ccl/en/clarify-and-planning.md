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

## Clarify Phase

<a id="clarify-phase"></a>

Use clarification when the task has real ambiguity: target repository, public/private boundary, acceptance criteria, negative scope, destructive actions, or deployment authority. A good clarify artifact records the user-accepted understanding, covered scope, negative scope, decisions, and risks. Do not ask ceremonial questions when the codebase and user instruction already determine the next move.

## Complexity

<a id="complexity"></a>

Complexity classification is useful only when it changes verification. For documentation work, the most relevant checks are source accuracy, coverage, user-spec compliance, style, logical coherence, and public-safety audits. For code-bearing work, use the project gate manifest and accepted RLL policy.

## Planning Output

A useful plan names the user goal, the page or code areas touched, the acceptance cases, and the commands that will prove the work. For docs, the plan must also state how duplicates are merged and how live URLs remain valid.

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
