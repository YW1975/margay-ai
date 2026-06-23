# Complexity System

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

The complexity system classifies task risk and suggests verification tiers. In documentation-only slices, user-approved lightweight acceptance can replace ceremonial gates when the workflow records that decision.

<!-- section: capabilities -->
## Capabilities

- Classify slices by complexity and evidence needs.
- Map tiers such as unit, integration, smoke, security, docs, or translation checks.
- Record explicit overrides rather than silently skipping expected gates.

<!-- section: operational-model -->
## Operational model

- The purpose is risk-fit verification. For documentation, the most relevant gates are publication safety, link integrity, language parity, translation residue, and source accuracy.

<!-- section: configuration -->
## Configuration and commands

- Use the project RLL policy when enabled. Respect explicit user decisions recorded in loop state.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent/complexity-judge`

<!-- section: related -->
## Related pages

- [Gates and Attestation](gates-attestation.md)
- [Clarify and Planning](clarify-and-planning.md)
- [Public Documentation Publishing](public-docs.md)
