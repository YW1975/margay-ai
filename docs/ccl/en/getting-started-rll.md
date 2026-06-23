# Getting Started with RLL

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

RLL starts with a concrete task step, a Ralph turn, a file-based submission, Lisa review, and consensus or fix rounds until the slice closes.

<!-- section: capabilities -->
## Capabilities

- Run `ralph-lisa whose-turn` before work.
- Read `review.md` when Lisa feedback is ready.
- Submit through `.dual-agent/submit.md` with the correct tag and test evidence.

<!-- section: operational-model -->
## Operational model

- RLL protects turn ownership and review quality. It does not remove the need to inspect code, run commands, or keep commits scoped.

<!-- section: configuration -->
## Configuration and commands

- Use `[PLAN]`, `[CODE]`, `[FIX]`, `[CHALLENGE]`, and `[CONSENSUS]` according to the active step policy and Lisa feedback.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`

<!-- section: related -->
## Related pages

- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Gates and Attestation](gates-attestation.md)
- [Clarify and Planning](clarify-and-planning.md)
