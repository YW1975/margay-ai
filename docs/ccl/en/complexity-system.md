# Complexity System

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

The complexity system decides how much clarification, planning, and verification a task needs. It exists to scale evidence with risk: small edits should stay lightweight, while broad, public, security-sensitive, or multi-surface work should be checked more deeply before and after implementation.

Complexity is not a label for prestige. It is useful only when it changes the workflow: whether clarify is required, whether a development-start plan must be accepted, which gate tiers are required, and what evidence Lisa should independently verify.

<!-- section: capabilities -->
## Capabilities

- Classify a task as simple, standard, complex, or expert when RLL policy requires it.
- Recommend verification tiers such as unit, smoke, functional, integration, e2e, security, stability, or performance.
- Attach source evidence to high-confidence tier choices.
- Enforce accepted high-risk tiers before code or documentation publication proceeds.
- Distinguish documentation evidence from code evidence.

<!-- section: operational-model -->
## Operational model

Use the lowest complexity level that honestly covers the risk:

| Class | Typical use | Expected evidence |
|-------|-------------|-------------------|
| Simple | Small typo, single safe setting, narrow doc wording. | Direct inspection or one focused command. |
| Standard | One feature page, one command behavior, contained bug fix. | Focused source evidence and a regression check. |
| Complex | Cross-page docs, CLI/runtime contract, public release, migration, security-sensitive content. | Clarify, accepted plan, source matrix, build/check/security evidence. |
| Expert | Multi-system behavior, irreversible migration, deep security, broad automation, or unclear external dependencies. | Staged plan, independent review, broader gates, explicit residual risk. |

For documentation tasks, complexity should not automatically mean "write unit tests." Documentation evidence should prove source accuracy, feature coverage, link integrity, language parity, public safety, and rendered-site usability. Code-bearing tasks still need the relevant project gates from `gate-manifest.json`.

<!-- section: configuration -->
## Configuration and commands

Relevant artifacts and commands:

| Item | Use |
|------|-----|
| `gate-manifest.json` | Lists canonical tier IDs and baseline expectations for the project type. |
| `.dual-agent/complexity-judge/` | Stores complexity judgment artifacts. |
| `ralph-lisa task complexity-judge --slice <name> --extended --json` | Produces a structured task classification. |
| `ralph-lisa task complexity-verify --slice <name>` | Verifies that the judgment is fresh, schema-valid, and policy-compatible. |
| `[TDD-PLAN]` | Development-start checkpoint for code-bearing or high-risk slices when gates apply. |

When the task is documentation-only, explicitly state why documentation-specific gates are enough. When the task changes behavior, do not downgrade required code gates just because the prose is the visible deliverable.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent/complexity-judge`

<!-- section: related -->
## Related pages

- [Clarify and Planning](clarify-and-planning.md#complexity)
- [Gates and Attestation](gates-attestation.md#complexity-gates)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
