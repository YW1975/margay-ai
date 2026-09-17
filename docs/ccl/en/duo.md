# Duo: Peer Collaboration Between Two Agents

<!-- section: availability -->
<a id="guide-availability"></a>
## Availability

This guide describes the Duo development build installed and checked locally on 2026-09-17. It displays `1.4.0-beta.0`, but the same version number on npm does not establish that these features are included. This documentation update does not publish an npm package. First check that your CCL build provides `/duo-agent`.

<!-- section: purpose -->
<a id="guide-purpose"></a>
## What each agent does

One agent carries out the task; another independently checks the result. Each has its own context and can use a different model. The executor also checks whether the reviewer actually reviewed the work, supplied adequate evidence, and reached a sound conclusion.

Use Duo for code, designs, implementation plans, product documentation, and test reports. The basic cycle is “execute → review → revise or finish.” Ordinary `/buddy` and Team entry points remain available. Duo reuses existing Team communication and task mechanisms without requiring the full RLL sequence of PLAN submissions, consensus records, and cascading gates.

<!-- section: start -->
<a id="guide-start"></a>
## Enter first, provide a task later

In the main CCL input, choose the execution model with `/model`, then enter standby:

```text
/model
/duo-agent
/duo --reviewer-model <fixed-model-id>
```

`/duo` is the short alias for `/duo-agent`. A goal is optional: an empty goal enters standby without starting an empty task. Once both models are configured, enter a task, for example:

```text
Check this database migration plan, focusing on compatibility with older clients and rollback steps. Produce a revised plan, then review it independently.
```

You can also supply the reviewer model and task together:

```text
/duo --reviewer-model <fixed-model-id> Fix the parser dropping its final token, add tests, and review independently
```

Replace the placeholder with an available concrete model ID. Both agents may use the same model or different models. Automatic choices such as `auto` and model pools are unsuitable for fixed role bindings. A missing reviewer model keeps the task in standby until configured.

The exact phrases `启动双 Agent 协作` and `开启双 Agent 协作`, entered directly in the main input, also enter standby. Quoted material, tool output, and teammate messages cannot start or control Duo.

<!-- section: acceptance -->
<a id="guide-acceptance"></a>
## What counts as completion

| Stage | Required work | Completion state |
| --- | --- | --- |
| Execute | Do the work and submit a specific version | Unfinished |
| Review | Independently check material and evidence; return PASS or NEEDS_WORK | Unfinished |
| Revise | Address findings and resubmit | An old PASS cannot approve new content |
| Counter-review | Executor checks the review's integrity, adequacy, and correctness, then explicitly accepts the current PASS | Finished only when all conditions hold |

Open formal challenges, user input not processed by both agents, changed requirements, and stale material prevent completion. Project completion checks still apply. Defaults allow at most 5 submissions and 3 task-level formal challenges; resubmission does not reset the challenge budget. Exhausting a limit leaves the task unfinished for user intervention.

<!-- section: challenge -->
<a id="guide-challenge"></a>
## Discussion and challenges

Discussion compares options and clarifies details without blocking completion. A challenge raises a disagreement that affects correctness: for example, claiming tests passed without actual results, overlooking an acceptance criterion, or a serious disagreement over whether a defect is real.

Either agent can raise a formal challenge. The first unresolved challenge blocks completion. The challenged agent cannot close it; the initiator must check the additional evidence and give a reason to resolve or withdraw it. History is preserved.

<!-- section: user-input -->
<a id="guide-user-input"></a>
## Add input while work continues

Return to the main input and add your comment. It is recorded and shared with both agents, normally without pausing. Recorded, delivered, and processed by both agents are distinct states. Ordinary additions count as requirement changes and invalidate prior acceptance.

For a suggestion that does not change acceptance, use this exact prefix, including its punctuation:

```text
仅供讨论，无验收变更：Would grouping the documentation by module make it easier to read?
```

This preserves the acceptance revision, but each agent must still explain adoption or why it does not apply. `@name` messages and input in a teammate view retain their separate routing. Use the main input to reach both agents.

<!-- section: controls -->
<a id="guide-controls"></a>
## Pause, resume, and adjudicate

| Input | Effect |
| --- | --- |
| `/duo pause` | Ask both agents to pause, block new work, and cancel current operations where possible |
| `/duo resume` | Explicitly resume collaboration after current work has stopped |
| `/duo exit` | Leave Duo, mark unfinished work as cancelled, and retain review history |
| `/duo adjudicate <reason>` | While both agents are paused, record a user ruling and resolve current open challenges |

You can add input while paused; input alone does not resume work. An operation that cannot yet be cancelled keeps the state at “pausing” until it settles. Late results cannot advance an old round. Check external effects that already occurred or whose outcome is unknown; do not assume rollback or automatically repeat them.

Adjudication does not impersonate a successful review: the task stays unfinished and paused. After checking the result, use `/duo resume`; valid review and executor counter-review are still required. Ordinary `/exit` leaves the whole CCL session, unlike `/duo exit`.

<!-- section: materials -->
<a id="guide-materials"></a>
## Code, documents, and text

Git working directories default to a code snapshot. The reviewer checks an independent copy, where ordinary test output stays. Non-Git directories default to text material for designs and reports, without requiring a repository; frozen text is saved as `material.md` and may include explicitly selected attachments.

Each review binds to specific material and a requirement revision. An old PASS cannot approve later changes. Copies and runtime controls do not isolate malicious shell commands run as the same operating-system user. Resuming an active Duo task after closing CCL is not currently promised.

<!-- section: validation -->
<a id="guide-validation"></a>
## Verified scope

The development build passed 251 tests. Three headed terminal scenarios on the installed build covered ordinary collaboration, non-Git text work, and pause/input/resume, totaling 46 steps. They used a deterministic local model service to verify tools and runtime control; they do not establish real-model judgment quality. See the IDE guide for the narrower editor-connection evidence.

<!-- section: related -->
<a id="guide-related"></a>
## Continue reading

- [Using CCL in VS Code](ide.md)
- [Agents](agents.md)
- [Interactive Sessions](interactive-sessions.md)
- [Full Ralph-Lisa Loop](ralph-lisa-loop.md)
