# Ralph-Lisa Loop

> This page is maintained as public documentation source. RLL is a collaboration protocol, not a substitute for verification.

<!-- section: purpose -->
## Purpose

The Ralph-Lisa Loop is CCL project governance for turn-based developer and reviewer collaboration. Ralph leads planning and implementation; Lisa reviews direction, evidence, changed files, and test results. The loop creates an auditable trail of submissions, feedback, fixes, challenges, and consensus.

<!-- section: capabilities -->
## Capabilities

- Detect whether the current process is `ralph`, `lisa`, or `standalone` before adopting a role.
- Check whose turn it is before work, review, or submission.
- Submit work and reviews through files to avoid shell escaping problems.
- Use explicit tags such as `[PLAN]`, `[TDD-PLAN]`, `[CODE]`, `[FIX]`, `[PASS]`, `[NEEDS_WORK]`, `[CHALLENGE]`, and `[CONSENSUS]`.
- Preserve test results, attestations, Lisa review rationale, and mutual consensus.
- Let Lisa reject off-direction work, missing evidence, rubber-stamp claims, or unaddressed review feedback.

<!-- section: operational-model -->
## Operational model

Every loop-aware session starts by checking `ralph-lisa session-role`. A direct standalone session should act as a normal assistant and should not run the turn protocol. A Ralph or Lisa loop seat must run `ralph-lisa whose-turn` before acting. When it is not that agent's turn, it must not submit work.

Ralph submits plans, code, fixes, challenges, and consensus through `.dual-agent/submit.md` with `ralph-lisa submit-ralph --file`. Lisa reads Ralph's work, reviews against task direction and evidence, and submits with `ralph-lisa submit-lisa --file`. Inline submission is avoided because tags, quotes, shell expansion, and Markdown can break command arguments.

RLL distinguishes architectural `[PLAN]` from gated `[TDD-PLAN]`. Documentation, planning, and process-only work still need proof, but their proof should be source accuracy, publication safety, language parity, rendered output, and coverage checks. They should not be forced into code-unit-test TDD unless the task actually changes code behavior.

<!-- section: configuration -->
## Configuration and commands

Core loop commands:

| Command | Purpose |
| --- | --- |
| `ralph-lisa session-role` | Determine whether the current process is Ralph, Lisa, or standalone. |
| `ralph-lisa whose-turn` | Check whether Ralph or Lisa may act now. |
| `ralph-lisa read review.md` | Ralph reads Lisa's latest feedback. |
| `ralph-lisa read work.md` | Lisa reads Ralph's latest submission. |
| `ralph-lisa submit-ralph --file .dual-agent/submit.md` | Ralph submits work and passes the turn to Lisa. |
| `ralph-lisa submit-lisa --file .dual-agent/submit.md` | Lisa submits review and passes the turn to Ralph. |
| `ralph-lisa status` | Inspect current round, step, turn, and watcher status. |
| `ralph-lisa recap` | Recover state after context compaction. |

Review discipline:

- A substantive PASS cites files, lines, claims, and verification results.
- Ralph should challenge a rubber-stamp PASS at most once.
- A NEEDS_WORK response requires reasoning; Ralph should explain why Lisa is right or submit a challenge.
- Consensus closes a reviewed slice only after both sides agree.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md` defines Ralph role detection, turn checks, file-based Ralph submission, tags, phase boundaries, PASS/NEEDS_WORK handling, test-result requirements, and the `[PLAN]` versus `[TDD-PLAN]` split.
- `CODEX.md` defines Lisa role detection, turn checks, file-based Lisa submission, task-alignment review, WeCom feedback intake, PASS/NEEDS_WORK rules, and substantive-review requirements.
- `AGENTS.md` documents that standalone sessions should not adopt the loop protocol and should tell users how to start RLL.
- `AGENTS.md` documents that code/fix submissions require real test results and attestation lines.
- `CODEX.md` documents Lisa's duty to review task alignment before code details.

<!-- section: related -->
## Related pages

- [Gates and Attestation](gates-attestation.md)
- [Gate System](gate-system.md)
- [Clarify and Planning](clarify-and-planning.md)
- [Clarify Phase](clarify-phase.md)
- [Common Workflows](common-workflows.md)
