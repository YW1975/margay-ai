# Common workflows

> Step-by-step guides for typical tasks in CCL, from exploring codebases to shipping changes with the Ralph-Lisa Loop.

CCL is a general-purpose tool. You can use it for anything you can do from the terminal: exploring code, fixing bugs, writing tests, refactoring, creating PRs, and more. This guide covers the most common workflows with prompt recipes you can copy and adapt.

For the Ralph-Lisa Loop protocol reference, see [Ralph-Lisa Loop](/en/ralph-lisa-loop). For getting started with RLL, see [Getting Started with the Ralph-Lisa Loop](/en/getting-started-rll).

---

## Understand a codebase

CCL can explore and summarize codebases of any size. It searches files, reads relevant code, and builds a mental model of how the project works.

### High-level overview

Ask CCL for a summary of the project structure and key components:

```text
Give me a high-level overview of this codebase. What is it, what are the main
components, and how do they interact?
```

### Deep dive into a specific area

Point CCL at a directory or module and ask it to trace the data flow:

```text
Explain how the authentication flow works in this project. Start at the login
handler and trace through to the session store. Include the key files and
functions involved.
```

### Find where something happens

When you know what you're looking for but not where it lives:

```text
Find where we handle OAuth2 token refresh. I need to understand the retry
logic and error handling.
```

### Understand a specific file

For dense or complex files, ask CCL to break them down:

```text
Explain the purpose of src/engine/query_planner.rs. What are the main structs,
what does each method do, and how does it fit into the broader system?
```

---

## Fix a bug

CCL's bug-fixing workflow follows the same pattern as the agentic loop: gather context, take action, verify results.

### Start with the error

Paste the error message and let CCL trace it back to the source:

```text
I'm seeing this error in production:

Error: Cannot read property 'token' of undefined
    at validateSession (src/auth/session.ts:42:15)

Find the root cause and fix it.
```

### Fix with a failing test

For trickier bugs, ask CCL to write a test that reproduces the issue first:

```text
The checkout flow breaks when a user has an expired card. Write a failing test
that reproduces this, then fix the bug in src/payments/. Run the tests to
verify.
```

### Fix with the Ralph-Lisa Loop

For critical bugs or changes that need review, use the Ralph-Lisa Loop:

```text
Fix the race condition in src/cache/invalidate.ts. Use the Ralph-Lisa Loop so
Lisa reviews the fix before we merge.
```

CCL will initialize the loop, Ralph will plan and implement the fix, and Lisa will review the submission.

---

## Refactor code

Refactoring is where CCL shines. It can make coordinated changes across many files while preserving behavior.

### Simple refactor

For localized changes, just ask:

```text
Refactor src/utils/helpers.ts to use async/await instead of promise chains.
Keep the public API the same.
```

### Large-scale refactor

For changes that touch many files, use plan mode first (`Shift+Tab` twice) so CCL analyzes the scope before editing:

```text
Rename the UserRepository class to UserStore across the entire codebase.
Update all imports, references, and tests. Run the test suite to verify nothing
broke.
```

### Refactor with the Ralph-Lisa Loop

For architectural refactors that affect module boundaries or public APIs:

```text
Refactor the database layer to abstract behind an interface. Use the
Ralph-Lisa Loop — this is a complex change that needs structured review.
```

Ralph will submit a `[PLAN]` first, then a `[TDD-PLAN]` with locked test cases, then implement the refactor with Lisa reviewing each step.

---

## Write and run tests

CCL can write tests, run them, and iterate until they pass.

### Write tests for existing code

```text
Write unit tests for src/parser/json.ts. Cover the happy path, edge cases,
and error handling. Use the existing test framework (jest).
```

### Test-driven development

```text
I need a function that validates email addresses. Write a failing test first,
then implement the function in src/validators/email.ts, then make the test
pass.
```

### Run the test suite

```text
Run the full test suite and tell me what's failing. Fix any issues you find.
```

### Run end-to-end tests with the test harness

For CLI or browser end-to-end testing, use CCL's built-in test harness instead of hand-rolling your own:

```text
Run the end-to-end tests for the login flow using the test harness.
```

CLI / terminal end-to-end:

```bash
ccl skill wezterm-test --macro tests/e2e/login-macro.json
```

Web / browser end-to-end:

```bash
ccl skill playwright-test --spec tests/e2e/login.spec.ts
```

When the test output would flood your context, delegate to the test-runner subagent:

```bash
ccl skill test-runner --suite e2e
```

---

## Create a PR

CCL can prepare a branch, make changes, and open a PR with a description.

### Full PR workflow

```text
Create a new branch called feature/oauth2-login, implement OAuth2 login with
the authorization-code flow, write tests, and open a PR against main. Include a
clear description of the changes and the test results.
```

### Update an existing PR

```text
The reviewer asked for changes on PR #123. Check out the branch, address the
feedback, and push the updates.
```

### PR with the Ralph-Lisa Loop

For PRs that need structured review before opening:

```text
Implement the new rate-limiter and open a PR. Use the Ralph-Lisa Loop for the
implementation so Lisa reviews the code before I create the PR.
```

---

## Write documentation

CCL can write docs, READMEs, API references, and inline comments.

### Write a README

```text
Write a README for this project. Include setup instructions, usage examples, and
contribution guidelines.
```

### Document a module

```text
Document the public API of src/cache/index.ts. Add JSDoc comments to all
exported functions and types.
```

### Update docs after a change

```text
I just renamed the ConfigLoader class to ConfigResolver. Update all
references in the docs/ directory to match.
```

---

## Run a structured code review with the Ralph-Lisa Loop

The Ralph-Lisa Loop turns any coding task into a structured, reviewable process. Ralph plans and implements; Lisa reviews and approves. Turns are explicit, feedback is tagged, and the whole conversation is auditable.

### Initialize a task with RLL

```bash
ccl init "Add circuit breaker to the HTTP client"
```

This creates the `.dual-agent/` directory and starts the session.

### Check whose turn it is

```bash
ccl whose-turn
```

- `ralph` → Read Lisa's last review and continue working
- `lisa` → Wait for her feedback

### Submit work as Ralph

Write your submission to a file and submit it:

```bash
cat > .dual-agent/submit.md << 'EOF'
[CODE]

Implemented circuit breaker with exponential backoff.

### Changes
- src/http/client.ts: added CircuitBreaker class
- src/http/retry.ts: integrated breaker into retry logic
- tests/http/circuit-breaker.test.ts: 8 new test cases

### Test Results
- Regression: npm test → 150/150 pass
- New tests: 8 added

Test-Process: inline | Test-Process-File: .dual-agent/test-log.txt
Test-Cases: C1, C2, C3
Test-Results: cmd="npm test" passed=158 failed=0 total=158
EOF

ccl submit-ralph --file .dual-agent/submit.md
```

### Read Lisa's feedback

```bash
ccl read review.md
```

Lisa responds with `[PASS]`, `[NEEDS_WORK]`, or another tag. If `[NEEDS_WORK]`, address her feedback and submit `[FIX]` with reasoning.

### Reach consensus

When Lisa `[PASS]`es, confirm with `[CONSENSUS]`:

```bash
cat > .dual-agent/submit.md << 'EOF'
[CONSENSUS]

Confirmed. All feedback addressed, tests pass, gates green.
EOF

ccl submit-ralph --file .dual-agent/submit.md
```

Lisa confirms with her own `[CONSENSUS]`, triggering the post-consensus cascade.

---

## Set up a new project with CCL init

`ccl init` prepares a project for the Ralph-Lisa Loop by creating the `.dual-agent/` directory and initializing session state.

### Initialize for a specific task

```bash
ccl init "Implement OAuth2 login"
```

This creates:
- `.dual-agent/whose-turn` — turn state
- `.dual-agent/history.md` — submission history
- `.dual-agent/review.md` — Lisa's feedback
- `.dual-agent/gate-results.md` — quality gate results
- `.dual-agent/complexity-judge/` — complexity assessments

### Start the loop after init

```bash
ccl start
```

This assigns the first turn to Ralph and opens the session.

### Start in different modes

Tmux split-terminal mode:

```bash
ccl start --tmux
```

Daemon mode (background, cross-platform):

```bash
ccl start --daemon
```

Full-auto mode (unattended):

Configure via environment variables for overnight or batch runs.

---

## Use complexity-judge before starting a large task

Before coding on a complex task, CCL judges its complexity to determine the appropriate workflow and quality gates.

### Run complexity-judge

```bash
ccl task complexity-judge --slice <slug> --json
```

Output includes:
- `schema_version`, `model_id`, `prompt_template_hash`, `input_hash`
- `tiers` with `tier_id`, `confidence`, and `evidence`
- `recommendations` for additional tests or gates

### Verify the judgment

```bash
ccl task complexity-verify --slice <slug>
```

Must exit 0 to submit. Validates schema, freshness, canonical tier IDs, high-confidence coverage, and sanity flags.

### What the classification means

| Class | R0 Clarify | Workflow |
|-------|-----------|----------|
| simple | No | `[PLAN]` → `[CODE]` |
| standard | No | `[PLAN]` → `[CODE]` |
| complex | **Yes** | `[PLAN]` → `[CLARIFY]` → `[TDD-PLAN]` → `[CODE]` |
| expert | **Yes** | `[PLAN]` → `[CLARIFY]` → `[TDD-PLAN]` → `[CODE]` |

Complex and expert tasks require the R0 Clarify phase before test planning. See [R0 Clarify Phase](/en/clarify-phase) for details.

---

## Run end-to-end tests with the test harness

CCL ships with a test harness for end-to-end testing. Use it instead of hand-rolling your own framework.

### CLI / terminal end-to-end

Drive a real terminal via WezTerm:

```bash
ccl skill wezterm-test --macro tests/e2e/terminal-macro.json
```

### Web / browser end-to-end

Drive a real browser via Playwright:

```bash
ccl skill playwright-test --spec tests/e2e/web-spec.ts
```

### Delegate to the test-runner subagent

When test output would flood your context:

```bash
ccl skill test-runner --suite e2e
```

The subagent routes to the appropriate harness and returns a short pass/fail report.

### Check harness availability

```bash
ccl doctor
```

Reports whether `wezterm` and `playwright` binaries are installed.

### Test cleanup

When tests spawn processes, tmux sessions, or daemons, include cleanup logic:

```typescript
const { cleanup } = tempProject({
  tmuxSessionName: 'test-session',
  daemonPids: [child.pid]
});

afterAll(() => cleanup());
```

Cleanup automatically SIGTERM → 500ms wait → SIGKILL. It never kills `process.pid` or `process.ppid`.

---

## Configure WeCom notifications for remote monitoring

CCL can send notifications to WeCom for stuck-agent alerts, task failures, and escalation events.

### Set up the WeCom bot

Run the setup script:

```bash
./setup-wecom-bot.sh
```

This configures:
- Webhook URL for your WeCom group
- Bot name and avatar
- Event filters (stuck agents, task failures, escalations)

### Environment variables

| Variable | Purpose |
|----------|---------|
| `RL_WECOM_WEBHOOK_URL` | WeCom webhook endpoint |
| `RL_WECOM_BOT_NAME` | Bot display name |
| `RL_WECOM_NOTIFY_ON_STUCK` | Notify when Lisa is stuck >30min |
| `RL_WECOM_NOTIFY_ON_FAILED` | Notify on task failure |
| `RL_WECOM_NOTIFY_ON_ESCALATE` | Notify on escalation events |

### Disable notifications

```bash
export RL_LISA_WATCHDOG_OFF=1        # Disable stuck-agent watchdog
export RL_WECOM_NOTIFY_OFF=1         # Disable all WeCom notifications
```

### What triggers notifications

- **Lisa stuck** — No review for >30min (configurable via `RL_LISA_WATCHDOG_THRESHOLD_SEC`)
- **Task failed** — 3+ consecutive gate failures or smoke test failures
- **Escalation** — 8 consecutive `[NEEDS_WORK]` rounds (deadlock detection)
- **Smoke deadlock** — 3 consecutive smoke test failures

---

## Use the Ralph-Lisa Loop for structured collaboration

The Ralph-Lisa Loop is CCL's built-in pair-programming protocol. It ensures every code change is planned, tested, reviewed, and agreed upon before it lands.

### When to use it

Use RLL when you want structured code review on every change:

- Complex refactors that touch multiple modules
- Feature additions that need test and quality standards
- Bug fixes that need regression tests and review
- Any task where you want a second pair of eyes

You do not need RLL for quick questions, one-off file reads, or exploratory research.

### Full workflow

```
Init → Plan → TDD-Plan → Code → Review → Fix → Consensus → Close
```

1. **Init** — `ccl init "<task>"` or `ccl start`
2. **Plan** — Ralph submits `[PLAN]` with understanding, approach, deliverables, and test plan
3. **TDD-Plan** (complex/expert only) — Ralph submits `[TDD-PLAN]` with locked test cases; goes through complexity-judge, complexity-verify, and Lisa's independent rerun
4. **Clarify** (complex/expert only) — R0 `[CLARIFY]` phase: 5-stage grill to confirm understanding, scope, decisions, and risks
5. **Research** — If external APIs or protocols are involved, Ralph submits `[RESEARCH]` with verified evidence
6. **Code** — Ralph implements and submits `[CODE]` with real test results and attest lines
7. **Review** — Lisa reviews with `[PASS]` or `[NEEDS_WORK]`
8. **Fix** — If `[NEEDS_WORK]`, Ralph submits `[FIX]` with reasoning
9. **Consensus** — Ralph `[CONSENSUS]`, Lisa `[CONSENSUS]`; triggers post-consensus cascade
10. **Close** — Task marked passed, slice closed

### Key commands

| Command | Purpose |
|---------|---------|
| `ccl init "<task>"` | Initialize a new RLL session |
| `ccl start` | Start the loop |
| `ccl start --tmux` | Start in tmux split-terminal mode |
| `ccl start --daemon` | Start in background daemon mode |
| `ccl whose-turn` | Check which agent is active |
| `ccl status` | View current session state |
| `ccl recap` | Recover context after a break |
| `ccl submit-ralph --file <path>` | Ralph submits work and passes turn |
| `ccl submit-lisa --file <path>` | Lisa submits review and passes turn |
| `ccl read review.md` | Read Lisa's latest feedback |
| `ccl smoke-check` | Verify test infrastructure |
| `ccl doctor` | Diagnose installation issues |
| `ccl sessions` | List and switch between active sessions |
| `ccl session branch --name <name>` | Branch to explore an alternative approach |
| `ccl session fork --name <name>` | Fork to start a new task from a clean state |

### Best practices

- **Always check whose turn it is first.** Run `ccl whose-turn` before doing anything else.
- **Never skip the `[PLAN]` phase.** Your first submission must be `[PLAN]`. Lisa needs to verify your understanding before you code.
- **Use `--file` for submissions.** It avoids shell escaping issues with brackets, backticks, and quotes.
- **Include real test results.** Fabricated test results are a policy violation. Run the tests, copy the output, and include it verbatim.
- **Explain your reasoning.** When responding to `[NEEDS_WORK]`, explain why Lisa was right or why you disagree. Never submit a bare `[FIX]`.
- **Do not short-circuit the loop.** Do not skip consensus, do not bypass gates, and do not silently ignore failing tests.
- **Recover gracefully.** If you lose context, run `ccl recap` before continuing.
- **Respect the turn.** When it is not your turn, do not submit work.

---

## What's next

<CardGroup cols={2}>
  <Card title="How CCL works" icon="book" href="/en/how-ccl-works">
    Understand the dual-agent loop, built-in tools, and architecture
  </Card>

  <Card title="Ralph-Lisa Loop" icon="arrows-spin" href="/en/ralph-lisa-loop">
    Deep reference on tags, gates, and protocol rules
  </Card>

  <Card title="Getting Started with RLL" icon="rocket" href="/en/getting-started-rll">
    Step-by-step walkthrough from setup to consensus
  </Card>

  <Card title="Complexity Management" icon="gauge-high" href="/en/complexity-system">
    Task classification, complexity-judge, and R0 clarify phase
  </Card>
</CardGroup>
