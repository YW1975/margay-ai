# Getting Started with the Ralph-Lisa Loop

> A step-by-step guide to structured dual-agent collaboration in CCL.

The Ralph-Lisa Loop (RLL) is CCL's built-in pair-programming protocol. It pairs two AI agents --- **Ralph** (Lead Developer) and **Lisa** (Code Reviewer) --- in a structured, turn-based workflow that turns every coding task into a reviewable, self-correcting process.

This guide walks you through your first RLL session from setup to consensus. For a deep reference on every tag, gate, and protocol rule, see [Ralph-Lisa Loop](/en/ralph-lisa-loop).

---

## What is the Ralph-Lisa Loop?

The Ralph-Lisa Loop is a **stateful, turn-based conversation** between two specialized agents:

| Agent | Role | What they do |
|-------|------|--------------|
| **Ralph** | Lead Developer | Plans, writes code, runs tests, and submits work |
| **Lisa** | Code Reviewer | Reviews every submission, checks quality gates, and approves or sends it back |

Think of it as a pair-programming session where one person writes and the other reviews every line before it lands. The difference is that turns are explicit, feedback is tagged, and the entire conversation is tracked so you (or another tool) can audit it later.

Key properties:

- **Strictly turn-based** --- only one agent is active at any time
- **Tagged submissions** --- every message starts with a tag like `[PLAN]`, `[CODE]`, or `[PASS]`
- **Quality gates** --- submissions are checked for tests, attest lines, and policy compliance
- **Persistent state** --- session history, reviews, and gate results are stored in `.dual-agent/`

---

## When to use it

Use the Ralph-Lisa Loop when you want **structured code review on every change**.

It is especially valuable for:

- **Complex refactors** --- multi-file changes that need careful validation
- **Feature additions** --- new code that must meet test and quality standards
- **Bug fixes** --- changes that need regression tests and review before merging
- **Any task where you want a second pair of eyes** --- Lisa catches what Ralph misses

You do not need RLL for quick questions, one-off file reads, or exploratory research. Use standard CCL for those, and switch to RLL when you are ready to write, test, and review code.

---

## Setup

### 1. Initialize the loop

Run this in your project directory:

```bash
ccl init "<task description>"
```

This creates the `.dual-agent/` directory, which stores:

- Turn state (`whose-turn`)
- Submission history (`history.md`)
- Review feedback (`review.md`)
- Gate results (`gate-results.md`)
- Complexity judgments (`.dual-agent/complexity-judge/`)

Example:

```bash
ccl init "Add OAuth2 login to the API gateway"
```

### 2. Start the loop

Launch the session with:

```bash
ccl start
```

This assigns the first turn to Ralph and opens the dual-agent session. From this point on, Ralph and Lisa take turns until the task is complete.

---

## Your first RLL session

Here is what a typical session looks like, step by step.

### Step 1: Check whose turn it is

Every time you return to the session, run:

```bash
ccl whose-turn
```

Output is either:

- `ralph` --- It is Ralph's turn. Read Lisa's last review and continue working.
- `lisa` --- It is Lisa's turn. Wait for her feedback.

If you lost context or are returning after a break, recover the state first:

```bash
ccl recap
```

This shows the current step, round, last 3 actions, and any unresolved `[NEEDS_WORK]` items.

### Step 2: Ralph writes `[PLAN]`

Ralph's first submission is always `[PLAN]`. This is a gate-free architecture discussion where Ralph explains his understanding of the task, proposed approach, expected deliverables, and test plan.

Write the submission to a file:

```bash
cat > .dual-agent/submit.md << 'EOF'
[PLAN]

## Understanding
Add OAuth2 login to the API gateway using the authorization-code flow.

## Approach
1. Add an OAuth2 config section to the gateway config
2. Implement the /auth/callback handler
3. Store tokens in the existing session cache
4. Add middleware to validate tokens on protected routes

## Deliverables
- src/auth/oauth2.ts (new)
- src/middleware/auth.ts (updated)
- tests/auth/oauth2.test.ts (new)

## Test plan
- Unit tests for token exchange and validation
- Integration test for the full callback flow
- Regression: npm test → all existing tests pass

## Quality gates
- npm run lint
- npm run typecheck
- npm test
EOF
```

Submit it:

```bash
ccl submit-ralph --file .dual-agent/submit.md
```

This passes the turn to Lisa.

### Step 3: Lisa reviews with `[PASS]` or `[NEEDS_WORK]`

Lisa reads the plan and responds. She either:

- **`[PASS]`** --- Approves the plan. Ralph can proceed to coding.
- **`[NEEDS_WORK]`** --- Finds issues. Ralph must address them before continuing.

Read Lisa's feedback:

```bash
ccl read review.md
```

A good `[PASS]` includes specific file references and technical analysis. A good `[NEEDS_WORK]` includes specific reasons and suggested fixes.

### Step 4: Ralph writes `[CODE]`

After the plan is approved, Ralph implements the code and submits `[CODE]`.

Every `[CODE]` submission must include:

- **What changed** --- concise description of the implementation
- **Test results** --- actual results from commands that were really run
- **Attest lines** --- three required verbatim lines (see below)

Example submission:

```bash
cat > .dual-agent/submit.md << 'EOF'
[CODE]

Implemented OAuth2 login with authorization-code flow.

### Changes
- src/auth/oauth2.ts: token exchange, user info fetch, session storage
- src/middleware/auth.ts: added validateToken middleware
- tests/auth/oauth2.test.ts: 12 new test cases

### Test Results
- Regression: npm test → 150/150 pass (no breakage)
- New tests: 12 added
  - oauth2.test.ts: token exchange (4 cases)
  - oauth2.test.ts: callback flow (4 cases)
  - oauth2.test.ts: middleware validation (4 cases)

Test-Process: inline | Test-Process-File: .dual-agent/test-log.txt
Test-Cases: C1, C2, C3
Test-Results: cmd="npm test" passed=162 failed=0 total=162
EOF

ccl submit-ralph --file .dual-agent/submit.md
```

### Step 5: Lisa reviews again

Lisa checks the code against the plan, verifies the test results, and runs quality gates. She returns either `[PASS]` or `[NEEDS_WORK]`.

If `[NEEDS_WORK]`, Ralph must respond with `[FIX]`, explaining why Lisa was right and what he changed. He cannot submit `[CODE]` or `[RESEARCH]` after `[NEEDS_WORK]` without addressing it first.

### Step 6: Reach `[CONSENSUS]`

When Lisa `[PASS]`es the work, Ralph confirms agreement:

```bash
cat > .dual-agent/submit.md << 'EOF'
[CONSENSUS]

Confirmed. All feedback addressed, tests pass, gates green.
EOF

ccl submit-ralph --file .dual-agent/submit.md
```

Lisa then confirms with her own `[CONSENSUS]`. This triggers the post-consensus cascade: tier checks, slice closure, and status updates. The task is now complete.

---

## Operating modes

The Ralph-Lisa Loop can run in three modes depending on your environment and needs.

### Tmux mode (split terminal)

Ralph and Lisa each occupy a pane in a split terminal. You can watch both sides of the conversation in real time. Great for local development and debugging.

```bash
ccl start --tmux
```

### Daemon mode (cross-platform)

Runs the loop as a background process. Works across platforms and is ideal for long-running tasks or CI integration.

```bash
ccl start --daemon
```

### Full-auto engine mode (unattended)

Runs entirely unattended. Ralph and Lisa take turns automatically with no human intervention. Designed for overnight runs, batch processing, or autonomous agent workflows.

Configure auto mode via environment variables or project settings.

---

## Key commands reference

| Command | Purpose |
|---------|---------|
| `ccl init "<task>"` | Initialize a new RLL session |
| `ccl start` | Start the loop (interactive) |
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

---

## Tips for effective collaboration

### Always check whose turn it is first

Run `ccl whose-turn` before doing anything else. Working out of turn is a protocol violation and can corrupt session state.

### Never skip the `[PLAN]` phase

Your first submission must be `[PLAN]`. Lisa needs to verify your understanding before you code. Skipping it triggers a policy block.

### Use `--file` for submissions

Always write submissions to a file and use `--file`. It avoids shell escaping issues with brackets, backticks, and quotes.

### Include real test results

Fabricated test results are a policy violation. Run the tests, copy the output, and include it verbatim. Every `[CODE]` or `[FIX]` submission must include actual test results.

### Explain your reasoning

When responding to `[NEEDS_WORK]`, explain why Lisa was right or why you disagree. Never submit a bare `[FIX]` without reasoning.

### Use the test harness

For end-to-end testing, use CCL's built-in harness instead of hand-rolling your own:

- CLI / terminal: `ccl skill wezterm-test --macro <path>`
- Web / browser: `ccl skill playwright-test --spec <path>`

### Clean up after yourself

If your tests spawn processes, tmux sessions, or daemons, include cleanup logic. The test harness tracks these and kills them automatically, but explicit cleanup is safer.

### Do not short-circuit the loop

Do not skip consensus, do not bypass gates, and do not silently ignore failing tests. The loop is designed to catch mistakes. Let it.

### Recover gracefully

If you lose context, run `ccl recap` before continuing. If context was compacted, this tells you the current state and unresolved items.

### Respect the turn

When it is not your turn, do not submit work. Use the time for preparatory research or environment checks if needed.

---

## What is next

- For the full protocol reference, see [Ralph-Lisa Loop](/en/ralph-lisa-loop)
- For complexity management and the R0 clarify phase, see [Complexity Management System](/en/complexity-system)
- For common CCL workflows, see [Common workflows](/en/common-workflows)
