# Ralph-Lisa Loop

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

The Ralph-Lisa Loop is CCL project governance for turn-based developer and reviewer collaboration, explicit submissions, feedback rounds, and evidence-backed delivery.

<!-- section: capabilities -->
## Capabilities

- Check whose turn it is before work or submission.
- Submit plans, code, fixes, challenges, and consensus through files.
- Record test results, attestations, and Lisa review outcomes.

<!-- section: operational-model -->
## Operational model

- RLL is a workflow discipline, not a replacement for tests. Its value is the preserved evidence trail around decisions, verification, and reviewer agreement.

<!-- section: configuration -->
## Configuration and commands

- Common commands: `ralph-lisa whose-turn`, `ralph-lisa read review.md`, and `ralph-lisa submit-ralph --file .dual-agent/submit.md`.

## Getting Started

<a id="getting-started"></a>

The Ralph-Lisa Loop is a turn-based development and review protocol. Ralph plans and implements; Lisa reviews independently and can pass, request work, challenge, or reach consensus. In an active loop, always check whose turn it is before submitting work. In a standalone session, help normally and do not impersonate loop state.

## Phase Boundaries

Submit at real boundaries: plan, research, code, fix, and consensus. A code or fix submission should include the concrete files changed, the acceptance cases covered, and real test results. Do not move to publication or commit just because content exists; wait for the review checkpoint required by the active slice.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`

<!-- section: related -->
## Related pages

- [Clarify and Planning](clarify-and-planning.md)
- [Gates and Attestation](gates-attestation.md)
- [GitHub and CI Workflows](github-ci.md)
