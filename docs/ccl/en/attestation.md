# Attestation

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

Attestation is the evidence format that connects submitted work to verifiable results. It answers three questions: what process was followed, which acceptance cases were touched, and what command output proves the result. Without attestation, a review becomes a trust exercise instead of an auditable delivery checkpoint.

Use attestation whenever work is submitted to Lisa, when a fix responds to a failure, or when publication depends on a build, scan, rendered output, or external destination.

<!-- section: capabilities -->
## Capabilities

- Identify the process used to produce the change.
- Name the acceptance cases or test rows covered by the submission.
- Record pass/fail counts and the exact command that produced them.
- Point reviewers to durable log files instead of relying on copied summaries.
- Capture residual risk when a check is intentionally skipped or narrowed.

<!-- section: operational-model -->
## Operational model

The minimum RLL code or fix submission includes these lines:

```text
Test-Process: <summary> | Test-Process-File: <path> | Test-Process: git-diff <range>
Test-Cases: C1, C3
Test-Results: cmd="<command>" passed=N failed=0 total=M | Test-Results-File: <path>
```

For documentation work, the same idea applies even when the command is not a unit test. A valid docs attestation might cite a site build, link check, content safety scan, rendered-page inspection, source-evidence diff, translation parity check, or live publication fetch.

If a check is skipped, the submission should say why the skip is valid and what evidence covers the risk instead. "Requires e2e" is not a valid reason to skip a mockable or statically verifiable docs/source claim.

<!-- section: configuration -->
## Configuration and commands

Recommended evidence locations:

| Location | Use |
|----------|-----|
| `.dual-agent/harness-results/<name>.md` | Human-readable command output and review evidence. |
| `.dual-agent/test-reports/` | Structured or generated test reports. |
| `.dual-agent/visual-evidence/` | Screenshots for UI or rendered-page claims. |
| `.dual-agent/gate-results.md` | Cascade and gate summary output. |
| `.dual-agent/submit.md` | The exact submitted work or consensus text. |

For public docs, include the source tree and rendered tree in the evidence when both matter. A Markdown-only scan does not prove that the generated page exists, and a generated page check does not prove the source claim is accurate.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.dual-agent`
- `.dual-agent/harness-results`

<!-- section: related -->
## Related pages

- [Gates and Attestation](gates-attestation.md#attestation)
- [Gate System](gate-system.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
