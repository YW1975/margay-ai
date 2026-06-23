# Gates and Attestation

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Gates and attestations make CCL delivery auditable by tying submitted work to test commands, pass/fail counts, changed cases, process evidence, and reviewer outcomes.

<!-- section: capabilities -->
## Capabilities

- Record exact test commands and results.
- Tie code or documentation changes to acceptance cases.
- Use policy checks to block missing evidence when configured.

<!-- section: operational-model -->
## Operational model

- For documentation work, gates should prove publication safety, language parity, link integrity, translation quality, and source accuracy rather than imitating unit-test TDD.

<!-- section: configuration -->
## Configuration and commands

- Use attest lines in RLL submissions and keep logs under `.dual-agent/harness-results` when appropriate.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent`

<!-- section: related -->
## Related pages

- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Clarify and Planning](clarify-and-planning.md)
- [GitHub and CI Workflows](github-ci.md)
