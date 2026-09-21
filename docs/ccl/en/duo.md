# Duo: Peer Collaboration Between Two Agents

<!-- section: availability -->
<a id="guide-availability"></a>
## Availability

This guide covers the reviewed Duo candidate through commit `1387fdae` (2026-09-21). The npm `next` package is still `1.4.1-beta-duo.0` and does not contain these later fixes. Check the identity of the CLI you run; a version string alone does not identify this candidate. The npm package exposes the `margay` command, while a local `ccl` launcher may point to a separate installation.

<!-- section: purpose -->
<a id="guide-purpose"></a>
## What each agent does

One agent carries out the task; another independently checks the result. Each has its own context and must make a request through a different concrete model. The executor also checks whether the reviewer actually reviewed the work, supplied adequate evidence, and reached a sound conclusion.

Use Duo for code, designs, implementation plans, product documentation, and test reports. The basic cycle is “execute → review → revise or finish.” [Buddy](buddy.md) and Team remain available for lighter delegation. Duo reuses Team communication and tasks without requiring the full RLL sequence of PLAN submissions, consensus records, and cascading gates.

<!-- section: start -->
<a id="guide-start"></a>
## Enter first, provide a task later

In the main CCL input, enter standby without a task:

```text
/duo-agent
```

`/duo` is the short alias for `/duo-agent`. An empty goal starts no agents. When you enter a task, CCL resolves the execution role from the current model selection and the review role from the critic capability. Auto, default, and smart selections are resolved to concrete models before either role sends a request. To override a role, use `/model` for the executor or `/duo --reviewer-model <model-id>` for the reviewer while in standby. Then enter a task, for example:

```text
Check this database migration plan, focusing on compatibility with older clients and rollback steps. Produce a revised plan, then review it independently.
```

You can also supply the reviewer model and task together:

```text
/duo --reviewer-model <fixed-model-id> Fix the parser dropping its final token, add tests, and review independently
```

Replace the placeholder with an available concrete model ID. Duo requires two different actual models, even with explicit selections. If the Gateway cannot resolve or validate a distinct reviewer model, CCL remains in standby, keeps the task, shows the reason, and lets you retry with `/duo` after correcting the route.

The exact phrases `启动双 Agent 协作` and `开启双 Agent 协作`, entered directly in the main input, also enter standby. Quoted material, tool output, and teammate messages cannot start or control Duo.

<!-- section: status -->
## Read the role status

The status area shows Developer and Reviewer separately. `Auto selected: <model> · Unconfirmed` or `Configured: <model> · Unconfirmed` describes the chosen model, not a completed request. A role changes to `Responding:` or `Last:` only after CCL observes that role's own agent request in the current session. A main-session request or another session's request cannot confirm either role. A `Last:` model shows the last observed route; it does not by itself mean the task passed review or completed.

<!-- section: acceptance -->
<a id="guide-acceptance"></a>
## What counts as completion

| Stage | Required work | Completion state |
| --- | --- | --- |
| Execute | Do the work and submit a specific version | Unfinished |
| Review | Independently check material and evidence; return PASS or NEEDS_WORK | Unfinished |
| Revise | Address findings and resubmit | An old PASS cannot approve new content |
| Counter-review | Executor checks the review's integrity, adequacy, and correctness, then explicitly accepts the current PASS | Finished only when all conditions hold |

Completion also requires observed, distinct developer and reviewer model requests, a review bound to the current submission and requirement revision, executor acceptance, and a currently completed protected task. A single-model answer, an old PASS, or a model's claim that it reviewed the work remains unfinished. Changed requirements or material require a fresh review. Open formal challenges prevent acceptance. Project completion checks still apply. Defaults allow at most 5 submissions and 3 task-level formal challenges; exhausting a limit leaves the task unfinished for user intervention.

<!-- section: challenge -->
<a id="guide-challenge"></a>
## Discussion and challenges

Discussion through Team messages is the normal way to compare options, challenge reasoning, and request another review. It does not require a formal challenge ceremony. A formal challenge is available for a disagreement that needs an explicit blocking record: for example, claiming tests passed without actual results or overlooking an acceptance criterion.

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
| `/duo exit` | Immediately return input to the ordinary session; attempt to cancel unfinished work and clean up the pair while retaining review history |
| `/duo adjudicate <reason>` | While both agents are paused, record a user ruling and resolve current open challenges |

You can add input while paused; input alone does not resume work. An operation that cannot yet be cancelled keeps the state at “pausing” until it settles. Late results cannot advance an old round. Check external effects that already occurred or whose outcome is unknown; do not assume rollback or automatically repeat them.

Adjudication does not impersonate a successful review: the task stays unfinished and paused. After checking the result, use `/duo resume`; valid review and executor counter-review are still required. After an accepted task, Duo returns to standby so you can enter another task. `/duo exit` also works after acceptance or if cleanup fails; it releases input first and reports any cleanup problem. Ordinary `/exit` leaves the whole CCL session.

<!-- section: materials -->
<a id="guide-materials"></a>
## Code, documents, and text

In a Git directory, a submission records the code material being reviewed. The current Duo reviewer may inspect the ordinary workspace and run tools under normal permissions; a frozen snapshot directory or restricted cwd is not required. In a non-Git directory, Duo uses text material for designs and reports without requiring a repository; submitted text is saved as `material.md` and may include explicitly selected attachments.

Each review binds to specific material and a requirement revision. An old PASS cannot approve later changes. The material receipt binds the version; it is not a file-tool allowlist or an OS sandbox. Resuming an active Duo task after closing CCL is not currently promised.

<!-- section: validation -->
<a id="guide-validation"></a>
## Verified scope

The reviewed candidate passed 4,081 source tests (19 skipped), 102 focused Duo tests, type checking, the 36 build feature gates, and 5 smoke checks. Installed-package headed terminal scenarios covered a full review/acceptance cycle (15/15 steps) and a second task with an unreviewed single-model answer correctly shown as unfinished (18/18 steps). These scenarios used an isolated deterministic provider; real-model release acceptance remains on HOLD. See the IDE guide for its narrower editor-connection evidence.

<!-- section: related -->
<a id="guide-related"></a>
## Continue reading

- [Using CCL in VS Code](ide.md)
- [Buddy: Teammates and Peer Review](buddy.md)
- [Agents](agents.md)
- [Interactive Sessions](interactive-sessions.md)
- [Full Ralph-Lisa Loop](ralph-lisa-loop.md)
