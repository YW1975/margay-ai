# Attestation

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Attestation records what was tested, which acceptance cases were covered, where process evidence lives, and which command produced the reported result.

<!-- section: capabilities -->
## Capabilities

- Use exact command strings and pass/fail counts.
- Reference log files rather than relying on memory.
- Tie documentation checks to docs acceptance cases, not unrelated unit tests.

<!-- section: operational-model -->
## Operational model

- Good attestation is narrow and falsifiable. A reviewer should be able to rerun the command or inspect the cited file.

<!-- section: configuration -->
## Configuration and commands

- In RLL submissions, include Test-Process, Test-Cases, and Test-Results lines when required by the active policy.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.dual-agent`

<!-- section: related -->
## Related pages

- [Gates and Attestation](gates-attestation.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Gate System](gate-system.md)
