# Getting Started with RLL

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

Ralph-Lisa Loop (RLL) is the reviewed-delivery workflow used when a CCL task needs an explicit implementer, an independent reviewer, preserved evidence, and a clear handoff between planning, implementation, fixes, and consensus. Use it when correctness matters more than raw speed: release work, public documentation, broad refactors, security-sensitive changes, or long-running autonomous work.

This page is the operator starting point. The deeper protocol details live in [Ralph-Lisa Loop](ralph-lisa-loop.md), while [Gates and Attestation](gates-attestation.md) explains the evidence format that makes a submission reviewable.

<!-- section: capabilities -->
## Capabilities

- Launch a two-agent loop with Ralph as lead implementer and Lisa as reviewer.
- Preserve turn history, submitted work, reviews, test evidence, and consensus decisions under `.dual-agent`.
- Require explicit checkpoints for plan, research, code, fix, challenge, and consensus rounds.
- Keep the human operator informed through the active terminal panes and configured notification channel.
- Route documentation work through documentation-specific evidence instead of pretending unrelated unit tests prove content quality.

<!-- section: operational-model -->
## Operational model

An RLL run is turn-based. Ralph works only on Ralph turn, submits a tagged artifact, then waits. Lisa reads the work, checks it against the task and evidence, and returns `[PASS]`, `[NEEDS_WORK]`, `[CHALLENGE]`, `[QUESTION]`, or `[CONSENSUS]`. A PASS is not final until Ralph accepts it with a substantive consensus and Lisa confirms mutual consensus.

For a new operator, the minimum mental model is:

| Stage | Ralph responsibility | Lisa responsibility | Evidence to keep |
|-------|----------------------|---------------------|------------------|
| Plan | State goal, scope, deliverables, risks, and verification. | Check direction and missing acceptance criteria. | Plan table, clarify decisions, source evidence. |
| Code or docs | Make the scoped change and run the planned checks. | Re-run or independently inspect the result. | Changed files, test logs, screenshots or build output when relevant. |
| Fix | Explain why the feedback is right or challenge it with evidence. | Verify the fix targets the reported issue. | Failed output, corrected command, before/after evidence. |
| Consensus | Accept a substantive PASS and call out residual risk. | Confirm the acceptance is not a rubber stamp. | PASS rationale, consensus text, cascade result. |

Do not keep working past your turn boundary. If the loop says it is Lisa's turn, Ralph may gather read-only context, but must not submit new work or mutate the reviewed files until the turn returns.

<!-- section: configuration -->
## Configuration and commands

Common commands:

| Command | Use it when |
|---------|-------------|
| `ralph-lisa session-role` | Confirm whether the current process is Ralph, Lisa, or standalone. |
| `ralph-lisa start` | Start the dual-agent loop for a task. |
| `ralph-lisa whose-turn` | Check whether Ralph or Lisa may act. |
| `ralph-lisa read review.md` | Read Lisa's latest review. |
| `ralph-lisa submit-ralph --file .dual-agent/submit.md` | Submit Ralph's work safely from a file. |
| `ralph-lisa status` | Inspect current step, round, turn, and watcher heartbeat. |
| `ralph-lisa recap` | Recover current state after context compaction. |

Start with a small, concrete task if you are validating setup. A good smoke task has a visible deliverable and a cheap verification command. For documentation work, prefer checks such as site build, link validation, source-evidence inspection, content safety scans, and generated page existence.

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`
- `.dual-agent`
- `gate-manifest.json`

<!-- section: related -->
## Related pages

- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Gates and Attestation](gates-attestation.md)
- [Clarify and Planning](clarify-and-planning.md)
