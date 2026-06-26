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

## Gates

<a id="gates"></a>

A gate is a runnable check tied to a claim. For public docs, useful gates include generated-doc parity, link integrity, source-evidence existence, forbidden-branding scan, private-path/secret scan, site build, and live URL fetch after deployment. A broad passing command is weak evidence when it does not cover the claim being made.

## Attestation

<a id="attestation"></a>

Attestation records the process evidence: what command ran, what it covered, whether it passed, where the log lives, and which acceptance case it proves. In RLL submissions, the required `Test-Process`, `Test-Cases`, and `Test-Results` lines are meant to make the evidence falsifiable.

## Complexity Gates

<a id="complexity-gates"></a>

Complexity gates should scale with risk. A documentation-only slice should not pretend that unrelated unit tests prove content quality, but it should run documentation-specific checks. A code-bearing slice should include the relevant unit, integration, smoke, security, or e2e tiers from the project manifest and plan.

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
