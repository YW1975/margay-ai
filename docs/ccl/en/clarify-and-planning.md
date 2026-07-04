# Clarify and Planning

> This page is maintained as public documentation source. Clarification and planning should reduce risk, not add ceremony.

<!-- section: purpose -->
## Purpose

Clarification and planning help CCL avoid hidden assumptions before work becomes expensive or dangerous. Use them when the task has unclear scope, user-only decisions, destructive potential, publication risk, or enough moving parts that a wrong assumption would create rework.

<!-- section: capabilities -->
## Capabilities

- Use the `AskUserQuestion` tool to ask focused questions about requirements, preferences, and implementation choices.
- Use `/plan` to enter plan mode, inspect the current plan, or open the plan file in an editor.
- Use the exit-plan-mode tool when a written plan is ready for approval.
- Record covered scope, negative scope, decisions, risks, and verification expectations before implementation.
- Keep plan mode separate from RLL `[PLAN]` submissions: one is a runtime permission mode, the other is a Ralph-Lisa review artifact.

<!-- section: operational-model -->
## Operational model

Clarify first when user input is genuinely needed. The question should be narrow enough that the answer changes the implementation or verification path. Do not ask the user to approve a plan through `AskUserQuestion`; the plan is not visible in that UI. Use the exit-plan-mode tool for plan approval.

`/plan` changes the session permission mode to plan mode. In plan mode, CCL prepares the permission context for planning rather than editing. If a plan already exists, `/plan` displays it; `/plan open` opens the plan file in the configured editor.

RLL planning is separate. A Ralph `[PLAN]` is a review submission for alignment. A `[TDD-PLAN]` is the gated development-start round when test cases and quality gates are locked. Documentation-only work still needs evidence, but it should use docs-specific checks rather than pretending every page update is unit-test-driven code development.

<!-- section: configuration -->
## Configuration and commands

Useful planning surfaces:

| Surface | Use when | Boundary |
| --- | --- | --- |
| `AskUserQuestion` | A user decision changes scope, preference, or trade-off. | Do not use it for final plan approval. |
| `/plan` | You need to enter planning mode or show the current plan. | It changes session permission mode. |
| `/plan open` | You need to edit the plan in an external editor. | Requires an available editor path. |
| Exit plan mode tool | The written plan is ready for approval. | Requires plan mode unless teammate policy handles approval separately. |
| RLL `[PLAN]` | Ralph and Lisa need architecture or scope alignment. | It is a review artifact, not the same as runtime plan mode. |

For documentation work, a strong plan names source pages, feature coverage, translation expectations, public-safety checks, rendered-site checks, and reviewer evidence. For code work, a strong plan names the behavior change, tests, rollback risk, and the command that proves success.

<!-- section: source-evidence -->
## Source evidence

- `commands/plan/plan.tsx` enters plan mode, prepares permission context for plan mode, displays the current plan, and supports `/plan open`.
- `tools/AskUserQuestionTool/prompt.ts` defines the clarification tool and explicitly says plan approval belongs to the exit-plan-mode tool.
- `tools/ExitPlanModeTool/ExitPlanModeV2Tool.ts` defines the plan-approval tool, validates that non-teammate sessions are in plan mode, and asks for user confirmation when required.
- `utils/plans.ts` stores and retrieves plan content and plan file paths.
- `AGENTS.md` defines the RLL split between `[PLAN]` and `[TDD-PLAN]`.

<!-- section: related -->
## Related pages

- [Clarify Phase](clarify-phase.md)
- [Gate System](gate-system.md)
- [Gates and Attestation](gates-attestation.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Common Workflows](common-workflows.md)
