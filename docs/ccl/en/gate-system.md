# Gate System

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

The gate system turns claims into runnable checks. A gate is not just a command; it is a command plus the claim it proves, the expected pass criteria, and a record of the result. In RLL, gates keep plans honest and prevent a task from moving to consensus with missing or irrelevant evidence.

For public documentation, gates must prove documentation quality directly. A passing runtime unit test does not prove that a public page is accurate, safe to publish, translated, linked, or rendered correctly.

<!-- section: capabilities -->
## Capabilities

- Define required verification rows for a slice.
- Associate each row with a tier such as unit, smoke, functional, integration, e2e, or security.
- Run post-submission and post-consensus cascades where configured.
- Preserve pass/fail output so Lisa can verify claims without relying on prose.
- Separate archive scans from current official-source scans when old incident reports contain historical tokens, IPs, or endpoint names.

<!-- section: operational-model -->
## Operational model

A strong gate row has five properties:

| Property | Strong example | Weak example |
|----------|----------------|--------------|
| Scope | "scan current public docs source and generated site" | "scan docs" when docs includes archive reports |
| Oracle | "0 matches for real-looking keys" | "run grep and paste output" |
| Relevance | "site build and link check for docs change" | unrelated unit test for prose-only edit |
| Reproducibility | exact command, stable cwd, expected exit code | manual statement without command |
| Evidence | log path or captured output | "it passed locally" |

Gate failures should loop back to the smallest responsible fix. If the command is wrong, fix the command or scope. If the content is wrong, fix the content. Do not hide a real failure by weakening the oracle.

<!-- section: configuration -->
## Configuration and commands

Important inputs:

| Artifact | Role |
|----------|------|
| `gate-manifest.json` | Declares canonical tiers and project baseline. |
| `.rll/PLAN.md` | Human-readable plan rows and acceptance cases. |
| `.dual-agent/auto-tdd-plan-<step>.json` | Machine-readable rows used by cascade automation. |
| `.dual-agent/gate-results.md` | Captured gate output and cascade status. |
| `.dual-agent/harness-results/` | Longer logs and evidence files. |

For docs publication, use gates such as `node scripts/check-docs.mjs`, public-content audit, static site build, generated-page existence, source-evidence validation, and targeted security scans over the current source tree.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.rll/PLAN.md`
- `.dual-agent/gate-results.md`

<!-- section: related -->
## Related pages

- [Gates and Attestation](gates-attestation.md#gates)
- [Attestation](attestation.md)
- [Public Documentation Publishing](public-docs.md)
