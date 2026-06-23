# R0 Clarify Phase

> For complex and expert tasks, the R0 Clarify phase is your first step before any test planning or coding begins. It is a structured conversation that makes sure you, Ralph, and Lisa all agree on what you are actually building.

Not every task needs R0. A typo fix or a config update can move straight to planning. But when you are refactoring across modules, implementing a protocol, or touching security-critical code, jumping straight to code is a recipe for rework. R0 exists to surface hidden assumptions, lock scope, and document the decisions that will guide the rest of the work.

---

## When is R0 required?

R0 is mandatory for **complex** and **expert** tasks. It is optional for **simple** and **standard** tasks.

| Complexity | Description | R0 Required? |
|------------|-------------|------------|
| **simple** | Typo fixes, config updates, single-file refactors | No |
| **standard** | Feature additions, API extensions, test coverage gaps | No |
| **complex** | Refactors across modules, protocol implementations, state machine changes | **Yes** |
| **expert** | Consensus algorithm changes, security audits, performance-critical paths | **Yes** |

The system determines your task's complexity automatically through `ccl task complexity-judge`. You cannot override the result directly. If you think the classification is wrong, you can reframe the task description to trigger re-evaluation, up to three times. After that, you must either accept the classification or explicitly skip R0 with `ccl clarify --skip`.

R0 happens **before** `[TDD-PLAN]`. Think of it as requirement clarification before test planning, so the tests you write actually match what the task needs.

---

## Stage 0: Complexity confirmation

Before R0 begins, the system presents its complexity classification. You have three options:

- **A: Agree and proceed.** Accept the classification and enter the R0 flow.
- **B: Reframe the task.** Change the task description to genuinely alter the scope. The system re-evaluates. You can do this up to three times.
- **C: Skip with `--skip`.** Explicitly bypass R0. A warning is printed and the skip is logged in the artifact. Use this sparingly.

If you reframe three times and still disagree, you must choose A or C. You cannot keep reframing indefinitely.

This stage exists because complexity is not just a label. It determines which gates apply, which tests are required, and how much rigor Lisa will apply during review. Getting the classification right upfront saves rounds later.

---

## Stage 1: Codebase exploration

This stage is entirely AI-internal. Ralph explores the codebase to understand:

- Which modules are relevant and how they connect
- Existing patterns and conventions you already follow
- Dependencies and potential integration points
- Prior art that might already solve part of the problem

You do not need to do anything here. The exploration results feed into the next stages, so the questions and decision trees are grounded in your actual code rather than generic assumptions.

---

## Stage 2: Decision tree mapping

Ralph maps out the decision points your task will face, organized from upstream to downstream:

1. **Architecture decisions.** Will you introduce new abstractions? Change module boundaries? Restructure existing code?
2. **Interface decisions.** What API shapes, protocol changes, or data formats are involved? Will this break existing consumers?
3. **Implementation decisions.** Which algorithms or libraries fit? Are there performance trade-offs? What are the constraints?
4. **Testing decisions.** What coverage strategy makes sense? Where should mocks stop and real integrations begin? Which harness should you use?
5. **Deployment decisions.** Is there a migration path? Do you need feature flags? What does rollback look like?

This is not a checklist to complete. It is a map of the territory. The goal is to identify which decisions are already made, which ones you need to make, and which ones have hidden constraints that could derail the work.

---

## Stage 3: 1-question-at-a-time grill

This is the heart of R0. Ralph asks you one question at a time, probing the areas where the decision tree surfaced ambiguity. The default is 10 questions, but you control the pace.

Typical questions probe:

- Ambiguous requirements: "When you say 'handle errors,' do you mean log and continue, or fail fast?"
- Hidden constraints: "Is this feature allowed to add new dependencies?"
- Edge cases: "What should happen if the upstream service returns a 503 for 30 seconds?"
- Scope boundaries: "Should this change affect the admin dashboard, or only the public API?"

You answer each question as specifically as you can. If you are not sure, say so. Uncertainty is data. Ralph records your answers so they become part of the consensus artifact.

After each question, you can:

- Continue to the next question
- Stop early if you feel the remaining questions are not relevant
- Go back and revise an earlier answer if you realize you were wrong

The goal is not to interrogate you. It is to build a shared understanding before anyone writes a line of code.

---

## Stage 4: Consensus deliverable

When the grill is complete, Ralph produces a final artifact with five required fields. This artifact is submitted with the `[CLARIFY]` tag and becomes the source of truth for the rest of the task.

| Field | What it contains |
|-------|------------------|
| `understanding` | Your task understanding, in your own words. This is quoted back to you so you can confirm Ralph heard you correctly. |
| `covered_scope` | What is explicitly in scope. This is the positive boundary. |
| `negative_scope` | What is **not** in scope. This is the strongest signal against over-engineering. If it is not listed here, it is fair game for someone to add later. |
| `decisions` | An array of the decisions you confirmed during the grill. Each entry includes the question and your answer. |
| `risks` | Known risks and boundary trade-offs. This is not a pessimism exercise. It is a record of what you already know could go wrong, so you are not surprised later. |

The `negative_scope` field is especially important. It is where you say things like "We are not touching the WebSocket client" or "Out of scope: migration scripts, those are handled by the ops team." Without this field, scope creep is the default. With it, you have a document to point to when someone asks for more.

---

## CLI commands

All R0 commands are under the `ccl clarify` namespace.

### Start a session

```bash
ccl clarify --start
```

Enters the 5-stage R0 flow. Progress is saved to `.dual-agent/clarify/` so you can resume if interrupted.

### Check status

```bash
ccl clarify --status
ccl clarify --status --json
```

Shows which stage you are in, how many questions have been asked, and whether `negative_scope` is locked. Use the `--json` flag if you are scripting around this.

### Add an answer

```bash
ccl clarify --add-answer Q-42 "The retry limit should be 3, not 5."
```

Records your answer to a specific grill question. The question ID is shown when the question is asked. You can also use this to revise an earlier answer.

### Commit the artifact

```bash
ccl clarify --commit \
  --understanding "Add circuit breaker to the HTTP client with exponential backoff" \
  --covered "http-client, retry-logic, circuit-breaker-state" \
  --negative-scope "websocket-client, grpc, admin-dashboard" \
  --risks "Timeout edge cases under high load; need to verify thread safety of state machine"
```

Finalizes the R0 artifact. All five fields are required. Once committed, the artifact is submitted with `[CLARIFY]` and the turn passes to Lisa for review.

### Skip R0

```bash
ccl clarify --skip
```

Explicitly bypasses R0 for a complex or expert task. A warning is printed and the skip is logged. Use this only when you genuinely believe R0 is unnecessary, not because you are in a hurry.

### Acknowledge scope expansion

```bash
ccl ack-scope-expansion --reason "User requested WebSocket support after R0 locked."
```

If the scope changes after R0 is finalized, use this command to document the change. It triggers re-evaluation and may require a new R0 session.

---

## User override rules

You cannot directly override the `complexity_class` field. The system enforces this to prevent gaming the classification. Your legitimate paths are:

1. **Reframe the task.** Change the task description so the scope genuinely changes. The LLM re-evaluates. You get up to three reframes. After that, you must choose A or C.
2. **Accept and proceed.** Acknowledge the classification and follow the required workflow. This is the normal path.
3. **Explicit skip.** Use `ccl clarify --skip` with documented justification. The skip is logged and visible to Lisa during review.

Naked overrides, like editing the complexity JSON directly, are rejected by `complexity-verify` and will block your submission. The system is designed to catch this, so do not try to work around it. If you believe the classification is genuinely wrong after three reframes, skip with `--skip` and explain why in your submission.

---

## What happens after R0?

Once R0 is complete and Lisa has reviewed the `[CLARIFY]` submission, you move to `[TDD-PLAN]`. The R0 artifact becomes the baseline for your test plan. If your `[TDD-PLAN]` includes tests for things that were in `negative_scope`, Lisa will flag it. If you discover during `[TDD-PLAN]` that a decision from R0 needs to change, you can submit a revised `[CLARIFY]` or use `ccl ack-scope-expansion` if the change is user-driven.

R0 is not bureaucracy. It is a conversation that happens once, at the beginning, so the rest of the work is grounded in shared understanding rather than assumptions.
