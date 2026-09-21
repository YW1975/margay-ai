# Buddy: Teammates and Lightweight Peer Review

<!-- section: availability -->
## Availability

This guide covers the reviewed Buddy behavior in the local CCL candidate through commit `1387fdae` (2026-09-21). The npm `next` package is still `1.4.1-beta-duo.0`; check which CLI you are running before relying on the later team-start fix. npm exposes `margay`, while a local `ccl` launcher may use another installation.

<!-- section: ordinary -->
## Start a teammate

Use ordinary Buddy when a visible teammate can help the lead session with a task:

```text
/buddy Check the migration plan for missing rollback steps
/buddy --team migration --name researcher Compare the two API contracts
```

`--team` defaults to `buddy-team`; `--name` defaults to `reviewer`. Without a task, Buddy asks the lead agent to pick up the most actionable thread in the current conversation. A name containing `reviewer` or `critic` adds review instructions to the teammate prompt.

Ordinary `/buddy` expands to a prompt. The lead agent must call `TeamCreate` first, reuse its current team if appropriate, and then call `Agent` with the team name actually returned by `TeamCreate` and the requested member name. If it already leads a different team, it should report the conflict. The prompt alone is not evidence that a teammate started; check the Team and Agent result before relying on its work.

<!-- section: peer-review -->
## Request protected peer review

Use the explicit peer-review mode when development work needs a protected submission and independent reviewer verdict:

```text
/model
/buddy --peer-review --reviewer-model <fixed-model-id> Fix the parser and add regression tests
```

Choose a concrete developer model with `/model`, then replace the reviewer placeholder with an available fixed model ID. `auto`, `smart`, `pool`, `inherit`, and `default` are rejected for the reviewer in this mode. A development goal is required. You may also add `--team <name>` and `--name <reviewer-name>`; the reviewer cannot be named `team-lead`.

The lead creates a peer-review Team and uses its protected task ID, then starts a `code-reviewer` Agent. The developer submits the current material; the reviewer checks and tests the submitted snapshot, returns PASS or NEEDS_WORK for that submission, and can challenge with evidence. A new submission needs a new review. Only a current reviewer PASS can complete this protected Buddy task; cancellation, pause, or exhausted limits leave it unfinished. This legacy peer-review path uses an independent snapshot for normal review tools. [Duo](duo.md) uses a different completion rule: distinct observed model requests, a current review, and executor acceptance; its current reviewer can inspect the ordinary workspace.

<!-- section: limits -->
## Check the result

Both Buddy forms depend on actual Team and Agent tool execution. Inspect the teammate and protected task status; a generated prompt or a model's statement of success is not a completed task. Review copies and tool permissions do not provide an OS sandbox against malicious commands run as the same user. An active collaboration is not guaranteed to resume after CCL restarts.

<!-- section: related -->
## Continue reading

- [Duo: Peer Collaboration](duo.md)
- [Agents](agents.md)
- [Commands](commands.md)
- [Interactive Sessions](interactive-sessions.md)
