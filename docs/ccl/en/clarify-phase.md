# Clarify Phase

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

The clarify phase prevents ambiguous work from turning into broad, unreviewable implementation. It is used when the task has uncertain scope, conflicting requirements, destructive potential, unclear publication authority, or enough complexity that a hidden assumption would create rework.

Clarification is not ceremony. If the user goal and repository state already determine the next safe action, proceed. If the task depends on a choice only the user can make, capture that decision before planning or editing.

<!-- section: capabilities -->
## Capabilities

- Lock the accepted understanding of the user request.
- Record covered scope and negative scope so the implementation does not drift.
- Capture user decisions, trade-offs, and known risks before a plan becomes binding.
- Separate documentation-specific uncertainty from code-specific uncertainty.
- Give Lisa a stable artifact to review when checking direction alignment.

<!-- section: operational-model -->
## Operational model

A useful clarify artifact answers five questions:

| Field | What it proves |
|-------|----------------|
| Understanding | Ralph can restate the user goal in concrete terms. |
| Covered scope | The work area is explicit enough to verify. |
| Negative scope | Nearby but excluded work is intentionally deferred. |
| Decisions | User-confirmed choices are preserved and reviewable. |
| Risks | Known uncertainties are visible before implementation starts. |

For official documentation work, clarify should identify the authoritative destination, the publication source, what counts as current truth, what remains archive-only, and whether multilingual parity is required. A docs clarify artifact should also say how unsupported claims will be removed or sourced.

Use one question at a time when user input is required. Do not ask a batch of speculative questions when code search or existing configuration can answer them.

<!-- section: configuration -->
## Configuration and commands

Relevant RLL commands:

| Command | Purpose |
|---------|---------|
| `ralph-lisa clarify --start` | Begin the clarify workflow for a complex task. |
| `ralph-lisa clarify --status --json` | Inspect whether clarify is committed and whether negative scope is locked. |
| `ralph-lisa clarify --add-answer <id> "<answer>"` | Record a user answer. |
| `ralph-lisa clarify --commit ...` | Finalize understanding, covered scope, negative scope, and risks. |
| `ralph-lisa clarify --skip` | Explicitly skip clarify when the user accepts the risk. |

For documentation-only tasks, the clarify result should drive a documentation oracle: source authority, topic coverage, user-spec compliance, logical coherence, and public safety. It should not force code-oriented TDD cases unless the task also changes runtime behavior.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.dual-agent`
- `gate-manifest.json`

<!-- section: related -->
## Related pages

- [Clarify and Planning](clarify-and-planning.md#clarify-phase)
- [Complexity System](complexity-system.md)
- [Gates and Attestation](gates-attestation.md)
