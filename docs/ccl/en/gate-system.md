# Gate System

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

The gate system turns policy into runnable checks that block unsafe or under-evidenced submissions before they become reviewed or published work.

<!-- section: capabilities -->
## Capabilities

- Validate required submission sections and attest lines.
- Run configured commands such as tests, docs checks, audits, and builds.
- Capture failure logs so the next fix round starts from concrete evidence.

<!-- section: operational-model -->
## Operational model

- A gate should be specific enough to fail for the right reason. Broad green checks are weak evidence when they do not cover the requirement being claimed.

<!-- section: configuration -->
## Configuration and commands

- For public docs, gate commands should include docs parity, links, translation-residue detection, source evidence, public audit, and site build.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `scripts/check-ccl-docs.mjs`

<!-- section: related -->
## Related pages

- [Gates and Attestation](gates-attestation.md)
- [Public Documentation Publishing](public-docs.md)
- [GitHub and CI Workflows](github-ci.md)
