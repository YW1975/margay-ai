# Ralph-Lisa Loop

The Ralph-Lisa Loop is the core of CCL's dual-agent architecture. It pairs two AI collaborators — **Ralph** (Lead Developer) and **Lisa** (Code Reviewer) — in a structured, turn-based workflow that turns complex coding tasks into a reliable, reviewable, and self-correcting process.

Think of it as a pair-programming session where one person writes code and the other reviews every line before it lands. The difference is that neither of you ever steps on each other's toes: turns are explicit, feedback is tagged, and the whole conversation is tracked in a way that you (or another tool) can audit later.

---

## Overview

At its heart, the Ralph-Lisa Loop is a **stateful conversation** between two agents with distinct roles:

- **Ralph** plans, researches, writes code, runs tests, and submits work.
- **Lisa** reviews, challenges, verifies, and either approves or sends it back for fixes.

They take turns. Each turn is a **submission** — a tagged message that moves the task forward through a well-defined lifecycle. The loop is managed by the `ccl` CLI (or MCP tools in your IDE), which tracks whose turn it is, persists state, and enforces quality gates.

This is not just chat. It is a **protocol**.

---

## Roles

### Ralph — Lead Developer

Ralph is the doer. His job is to understand the task, plan the approach, write the code, and prove it works.

**Responsibilities:**

- **Planning** — Before writing any code, Ralph submits a `[PLAN]` (architecture discussion) and, for complex tasks, a `[TDD-PLAN]` (test plan with locked test cases).
- **Research** — When the task involves external APIs, protocols, or reference implementations, Ralph submits `[RESEARCH]` with verified evidence before coding.
- **Coding** — Ralph writes the implementation and submits it as `[CODE]`, including real test results.
- **Testing** — Every `[CODE]` or `[FIX]` submission must include actual test results from commands that were really run. No hand-waving.
- **Fixing** — When Lisa returns `[NEEDS_WORK]`, Ralph responds with `[FIX]`, explaining why Lisa was right (or challenging her with `[CHALLENGE]` if he disagrees).
- **Consensus** — When Lisa passes the work, Ralph confirms with `[CONSENSUS]`.

Ralph is also responsible for running quality gates (lint, type-check, format), using the project's test harness, and cleaning up any spawned processes or sessions.

### Lisa — Code Reviewer

Lisa is the gatekeeper. Her job is to make sure Ralph's work is correct, complete, and meets the project's standards.

**Responsibilities:**

- **Review** — Every submission from Ralph is reviewed for correctness, completeness, and adherence to the plan.
- **Challenge** — Lisa can return `[NEEDS_WORK]` with specific reasons, file references, and suggested fixes.
- **Verify** — Lisa checks that test results are real, that gates passed, and that the code matches the plan.
- **Acknowledge complexity** — For complex or expert tasks, Lisa verifies that the `[TDD-PLAN]` went through the required complexity-judge and clarify phases.
- **Consensus** — When satisfied, Lisa returns `[PASS]`. After Ralph's `[CONSENSUS]`, she confirms with her own `[CONSENSUS]`.
- **Escalate** — If the task scope needs to change or user input is required, Lisa can return `[NEEDS_USER_ACK]`.

Lisa is not a rubber stamp. A good `[PASS]` includes specific file references, test verification, and technical analysis. Ralph is encouraged to `[CHALLENGE]` a thin `[PASS]` once.

---

## Turn-based Protocol

The loop is strictly turn-based. At any moment, either Ralph or Lisa has the floor. You never work out of turn.

### Checking whose turn it is

```bash
ccl whose-turn
```

This is the first thing you do every time you come back to the session. The output is simple:

- `ralph` → It is Ralph's turn. He should read Lisa's last review and continue working.
- `lisa` → It is Lisa's turn. Ralph should wait.

### Submitting work

When Ralph is ready to pass the turn, he writes his submission to a file and submits it:

```bash
# Write your submission to a file
cat > .dual-agent/submit.md << 'EOF'
[CODE]

Implemented the config resolver with platform-specific path handling.

### Test Results
- Regression: npm test → 150/150 pass
- New tests: 3 added
  - resolveConfigDir.test.ts: platform path resolution (3 cases)

Test-Process: inline | Test-Process-File: .dual-agent/test-log.txt
Test-Cases: C1, C3, C7
Test-Results: cmd="npm test" passed=153 failed=0 total=153
EOF

# Submit and pass the turn
ccl submit-ralph --file .dual-agent/submit.md
```

This atomically records the submission and flips the turn to Lisa. Lisa then reviews and responds, flipping the turn back.

### Lisa's responses

Lisa reviews and submits her response similarly:

```bash
ccl submit-lisa --file .dual-agent/lisa-response.md
```

Her response is tagged with one of her review tags: `[PASS]`, `[NEEDS_WORK]`, `[CHALLENGE]`, `[DISCUSS]`, `[QUESTION]`, `[CONSENSUS]`, or `[NEEDS_USER_ACK]`.

### Context recovery

If your session context was compacted or you are returning after a break, recover the current state:

```bash
ccl recap
```

This tells you:
- The current step and round
- The last 3 actions
- Any unresolved `[NEEDS_WORK]` items

---

## Tags

Tags are the vocabulary of the loop. Every submission starts with a tag that declares its intent.

### Ralph's tags

| Tag | Purpose |
|-----|---------|
| `[PLAN]` | Architecture and approach discussion. Gate-free. Use this first. |
| `[TDD-PLAN]` | Lock the test plan into concrete test cases before coding. Required for complex/expert tasks. Carries quality gates. |
| `[RESEARCH]` | Verified research on reference implementations, protocols, or external APIs. |
| `[CODE]` | Code implementation with real test results. |
| `[FIX]` | Fixes based on Lisa's `[NEEDS_WORK]` feedback. Must include reasoning. |
| `[CHALLENGE]` | Disagree with Lisa's feedback; provide counter-argument. |
| `[DISCUSS]` | General discussion or clarification. |
| `[QUESTION]` | Ask a specific question. |
| `[CONSENSUS]` | Confirm agreement after Lisa's `[PASS]`. |
| `[CLARIFY]` | Deliverable for the R0 clarify phase (complex/expert tasks). |

### Lisa's tags

| Tag | Purpose |
|-----|---------|
| `[PASS]` | Work is approved. Must be substantive (specific files, test verification, technical analysis). |
| `[NEEDS_WORK]` | Work needs fixes. Must include specific reasons and references. |
| `[CHALLENGE]` | Disagree with Ralph's argument; provide counter-argument. |
| `[DISCUSS]` | General discussion or clarification. |
| `[QUESTION]` | Ask a specific question. |
| `[CONSENSUS]` | Confirm mutual agreement after Ralph's `[CONSENSUS]`. |
| `[NEEDS_USER_ACK]` | Task scope changed or user input is required. |

---

## Workflow

The full lifecycle of a task through the Ralph-Lisa Loop looks like this:

```
Init → Plan → TDD-Plan → Code → Review → Fix → Consensus → Close
```

### Step by step

1. **Init** — Start the loop with `ccl start` or `ccl auto`. The session is created and the first turn is assigned to Ralph.

2. **Plan** — Ralph submits `[PLAN]` with his understanding of the task, proposed approach, expected deliverables, and a test plan. This is a gate-free architecture discussion.

3. **TDD-Plan** (complex/expert tasks only) — For complex tasks, Ralph submits `[TDD-PLAN]` with locked test cases. This goes through the three-layer quality gate: complexity-judge, complexity-verify, and Lisa's independent rerun.

4. **Clarify** (complex/expert tasks only) — Before `[TDD-PLAN]`, complex tasks may require the R0 `[CLARIFY]` phase: a 5-stage grill to confirm understanding, scope, decisions, and risks.

5. **Research** — If the task involves external APIs, protocols, or reference implementations, Ralph submits `[RESEARCH]` with verified evidence before coding.

6. **Code** — Ralph implements the code and submits `[CODE]` with real test results, attest lines, and quality gate output.

7. **Review** — Lisa reviews. If she finds issues, she returns `[NEEDS_WORK]` with specific feedback. If satisfied, she returns `[PASS]`.

8. **Fix** — If `[NEEDS_WORK]`, Ralph responds with `[FIX]`, explaining why Lisa was right and what he changed. He cannot submit `[CODE]` or `[RESEARCH]` after `[NEEDS_WORK]` without addressing it first.

9. **Consensus** — When Lisa `[PASS]`es, Ralph submits `[CONSENSUS]`. Lisa confirms with her own `[CONSENSUS]`. This triggers the post-consensus cascade: tier checks, slice closure, and status updates.

10. **Close** — The task is marked as passed and the slice is closed.

### Quality gates along the way

- **Submit-time gates** — Every `[CODE]` or `[FIX]` submission is checked for policy compliance: attest lines, test results, file references, and visual evidence (for UI tasks).
- **Smoke tests** — If `RL_SMOKE_CMD` is set, smoke tests run automatically after submission. Three consecutive failures trigger an escalation.
- **Deadlock detection** — Eight consecutive `[NEEDS_WORK]` rounds trigger a deadlock pause, requiring user intervention.

---

## Operating Modes

The Ralph-Lisa Loop can run in several modes depending on your environment and needs.

### Tmux mode (split terminal)

In tmux mode, Ralph and Lisa each occupy a pane in a split terminal. You can watch both sides of the conversation in real time. This is great for local development and debugging.

```bash
ccl start --tmux
```

### Daemon mode (cross-platform)

Daemon mode runs the loop as a background process. It works across platforms and is ideal for long-running tasks or CI integration.

```bash
ccl start --daemon
```

### Full-auto engine mode (unattended)

In full-auto mode, the loop runs entirely unattended. Ralph and Lisa take turns automatically, with no human intervention required. This is designed for overnight runs, batch processing, or autonomous agent workflows.

Configure auto mode via environment variables or the project settings.

---

## Context Management

Sessions in the Ralph-Lisa Loop are stateful and persistent. You can pause, resume, branch, and fork them.

### Sessions

Each loop instance is a **session** with a unique ID. Session state is stored in `.dual-agent/`, including:
- Turn state (`whose-turn`)
- Submission history (`history.md`)
- Review feedback (`review.md`)
- Gate results (`gate-results.md`)
- Complexity judgments (`.dual-agent/complexity-judge/`)

### Session picker

If you have multiple active sessions, use the session picker to switch between them:

```bash
ccl sessions
```

### Branching and forking

You can branch a session to explore an alternative approach without losing the original:

```bash
ccl session branch --name "alternative-approach"
```

Or fork it to start a new task from a clean state while preserving the old one:

```bash
ccl session fork --name "new-feature"
```

This makes the loop safe to experiment with. If an approach does not work, you can always go back.

---

## Best Practices

### For Ralph

- **Always check whose turn it is first.** Run `ccl whose-turn` before doing anything else.
- **Never skip the `[PLAN]` phase.** Your first submission must be `[PLAN]`. Lisa needs to verify your understanding before you code.
- **Use `--file` for submissions.** It avoids shell escaping issues with brackets, backticks, and quotes.
- **Include real test results.** Fabricated test results are a policy violation. Run the tests, copy the output, and include it verbatim.
- **Explain your reasoning.** When responding to `[NEEDS_WORK]`, explain why Lisa was right or why you disagree. Never submit a bare `[FIX]`.
- **Use the test harness.** For end-to-end testing, use `ccl skill wezterm-test` or `ccl skill playwright-test` instead of hand-rolling your own framework.
- **Clean up after yourself.** If your tests spawn processes, tmux sessions, or daemons, include cleanup logic. The test harness tracks these and kills them automatically.

### For Lisa

- **Be specific.** A good `[PASS]` or `[NEEDS_WORK]` references specific files, line numbers, and test cases.
- **Verify test results.** Check that the test command was actually run and the output matches the claimed results.
- **Challenge thin passes.** If Ralph `[CHALLENGE]`s your `[PASS]` as a rubber stamp, add more detail.
- **Watch for policy violations.** Missing attest lines, missing test results, or missing file references should trigger `[NEEDS_WORK]`.

### For both

- **Communicate in tags.** Always start your submission with the appropriate tag. It sets expectations and drives the workflow.
- **Do not short-circuit the loop.** Do not skip consensus, do not bypass gates, and do not silently ignore failing tests. The loop is designed to catch mistakes. Let it.
- **Recover gracefully.** If you lose context, run `ccl recap` before continuing.
- **Respect the turn.** When it is not your turn, do not submit work. Use the time for preparatory research or environment checks if needed.

---

## Quick Reference

```bash
# Start the loop
ccl start
ccl start --tmux
ccl start --daemon

# Check turn and status
ccl whose-turn
ccl status
ccl recap

# Submit work
ccl submit-ralph --file .dual-agent/submit.md
ccl submit-lisa --file .dual-agent/lisa-response.md

# Read feedback
ccl read review.md

# Quality gates and checks
ccl smoke-check
ccl doctor

# Session management
ccl sessions
ccl session branch --name <name>
ccl session fork --name <name>
```

---

The Ralph-Lisa Loop turns the chaotic process of coding into a structured, reviewable, and repeatable protocol. It is not about adding bureaucracy. It is about catching mistakes early, keeping context intact, and making sure that when code lands, it is correct.
