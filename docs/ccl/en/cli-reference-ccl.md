# CCL CLI Reference (Extended)

> Complete reference for CCL-specific CLI commands beyond the standard `ccl` interface.

CCL extends the standard `ccl` CLI with commands for the Ralph-Lisa Loop, complexity management, attestation, and project configuration. This page covers CCL-specific commands. For the standard CLI reference, see [CLI Reference](/en/cli-reference).

---

## Ralph-Lisa Loop commands

### `ccl init "<task>"`

Initialize a new Ralph-Lisa Loop session with a task description. Creates the `.dual-agent/` directory and assigns the first turn to Ralph.

```bash
ccl init "Implement user authentication with OAuth2"
```

**Creates:**
- `.dual-agent/whose-turn` — turn state
- `.dual-agent/history.md` — submission history
- `.dual-agent/review.md` — Lisa's feedback
- `.dual-agent/gate-results.md` — quality gate results
- `.dual-agent/complexity-judge/` — complexity assessments

---

### `ccl start [--tmux] [--daemon]`

Start the Ralph-Lisa dual-agent loop.

```bash
# Interactive mode
ccl start

# Tmux split-terminal mode
ccl start --tmux

# Daemon mode (background, cross-platform)
ccl start --daemon
```

---

### `ccl auto [--engine] [--full-auto]`

Run the loop in automatic mode without human intervention.

```bash
# Auto mode with default engine
ccl auto

# Full-auto unattended mode
ccl auto --full-auto

# Auto mode with specific engine
ccl auto --engine sonnet
```

---

### `ccl whose-turn`

Check which agent currently has the turn.

```bash
ccl whose-turn
```

**Output:**
- `ralph` — It is Ralph's turn. Read Lisa's feedback and continue working.
- `lisa` — It is Lisa's turn. Wait for her review.

---

### `ccl submit-ralph --file <path>`

Submit work from Ralph and pass the turn to Lisa. Always use `--file` instead of inline submission to avoid shell escaping issues.

```bash
ccl submit-ralph --file .dual-agent/submit.md
```

---

### `ccl submit-lisa --file <path>`

Submit Lisa's review response and pass the turn back to Ralph.

```bash
ccl submit-lisa --file .dual-agent/lisa-response.md
```

---

### `ccl read review.md`

Read Lisa's latest review feedback.

```bash
ccl read review.md
```

---

### `ccl status`

View current session state: turn, step, round, pending actions.

```bash
ccl status
```

---

### `ccl recap`

Recover context after compaction or extended break.

```bash
ccl recap
```

**Shows:**
- Current step and round
- Last 3 actions
- Unresolved `[NEEDS_WORK]` items

---

## Complexity management commands

### `ccl task complexity-judge --slice <slug> --json`

Analyze task complexity and output JSON judgment.

```bash
ccl task complexity-judge --slice auth-refactor --json
```

**Output fields:**

| Field | Description |
|-------|-------------|
| `schema_version` | Version of the complexity schema |
| `model_id` | Model used for judgment |
| `prompt_template_hash` | Hash of the prompt template |
| `input_hash` | Hash of the input |
| `tiers` | Assigned quality tiers with confidence |
| `evidence` | Evidence for each high-confidence tier |
| `recommendations` | Suggested workflow adaptations |

---

### `ccl task complexity-verify --slice <slug>`

Verify complexity judgment (hard gate). Must exit 0 before `[TDD-PLAN]` submission.

```bash
ccl task complexity-verify --slice auth-refactor
```

**Validates:**
- Schema version and freshness
- `canonical_tier_ids` whitelist match
- High-confidence tiers accepted or ack-rejected
- Coverage completeness
- Sanity flags

---

## Clarify commands

### `ccl clarify --start`

Begin the R0 clarify phase for complex or expert tasks.

```bash
ccl clarify --start
```

---

### `ccl clarify --status [--json]`

Check current clarify phase status.

```bash
ccl clarify --status
```

---

### `ccl clarify --add-answer <Q-id> "<answer>"`

Record an answer to a clarify question.

```bash
ccl clarify --add-answer Q1 "Use PostgreSQL for persistence"
```

---

### `ccl clarify --commit --understanding "..." --covered "a,b" --negative-scope "x,y" --risks "r1"`

Finalize the R0 clarify phase with the 5 required fields.

```bash
ccl clarify --commit \
  --understanding "Implement OAuth2 login with Google and GitHub" \
  --covered "auth flow, token refresh, user model" \
  --negative-scope "enterprise SSO, SAML, password reset" \
  --risks "token expiry edge cases, provider rate limits"
```

---

### `ccl clarify --skip`

Explicitly skip the R0 clarify phase (prints warning).

```bash
ccl clarify --skip
```

---

### `ccl ack-scope-expansion --reason "..."`

Acknowledge a scope expansion requested by Lisa.

```bash
ccl ack-scope-expansion --reason "User confirmed we need SAML support"
```

---

## Quality gate commands

### `ccl quality-gate`

Run configured quality gates (lint, type-check, format).

```bash
ccl quality-gate
```

**Configured via:** `RL_RALPH_GATE` and `RL_GATE_COMMANDS`.

---

### `ccl plan validate`

Validate current plan against project policies and quality gates.

```bash
ccl plan validate
```

---

### `ccl smoke-check`

Run the configured smoke test command (`RL_SMOKE_CMD`).

```bash
ccl smoke-check
```

---

### `ccl gate-manifest --type <type>`

Set project type in `gate-manifest.json`.

```bash
ccl gate-manifest --type web-app
```

**Project types:** `cli`, `web-app`, `mobile-app`, `library`, `service`.

---

## Communication commands

### `ccl wecom-push --body "..."`

Push a message to the WeCom notification channel.

```bash
ccl wecom-push --body "Smoke tests failed after 3 consecutive attempts"
```

---

### `ccl wecom-feedback unread`

Check for unread feedback messages from the WeCom channel.

```bash
ccl wecom-feedback unread
```

---

## Token and usage commands

### `ccl token-usage`

Display token usage statistics for the current session.

```bash
ccl token-usage
```

---

### `ccl token-capture --pane <n>`

Capture token usage from a specific tmux pane.

```bash
ccl token-capture --pane 1
```

---

## Test harness commands

### `ccl skill wezterm-test --macro <path>`

Run CLI/terminal end-to-end tests via WezTerm.

```bash
ccl skill wezterm-test --macro tests/e2e/login-macro.json
```

---

### `ccl skill playwright-test --spec <path>`

Run web/browser end-to-end tests via Playwright.

```bash
ccl skill playwright-test --spec tests/e2e/login.spec.ts
```

---

### `ccl skill test-runner --suite <name>`

Delegate test execution to the test-runner subagent.

```bash
ccl skill test-runner --suite e2e
```

---

## Diagnostic commands

### `ccl doctor`

Diagnose common issues with CCL installation and environment.

```bash
ccl doctor
```

**Checks:**
- Required binaries (`wezterm`, `playwright`)
- Configuration problems
- Connectivity issues
- Gateway health

---

### `ccl smoke-fail clear`

Clear smoke test failure history.

```bash
ccl smoke-fail clear
```

---

## Session management commands

### `ccl sessions`

Open the session picker.

```bash
ccl sessions
```

---

### `ccl session branch --name <name>`

Branch the current session to explore an alternative approach.

```bash
ccl session branch --name "alternative-auth-approach"
```

---

### `ccl session fork --name <name>`

Fork the current session to start a new task from a clean state.

```bash
ccl session fork --name "new-feature-branch"
```

---

## Visual evidence commands

### `ccl visual-evidence add --file <path>`

Add a screenshot to the visual evidence directory.

```bash
ccl visual-evidence add --file screenshot.png
```

**Rotation cap:** 20 screenshots.

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `RL_AGENT_ROLE` | Set by `ccl start` / `auto`. Signals `ralph`, `lisa`, or `standalone`. |
| `RL_POLICY_MODE` | `block` (default) or `warn`. |
| `RL_RALPH_ATTEST_OFF` | Opt out of §149 attest block (dev only). |
| `RL_LISA_ATTEST_OFF` | Opt out of Lisa attest block. |
| `RL_SMOKE_CMD` | Smoke test command. |
| `RL_SMOKE_AUTO_LOOP_OFF` | Disable automatic smoke test loops. |
| `RL_LISA_WATCHDOG_OFF` | Disable Lisa stuck-agent watchdog. |
| `RL_LISA_WATCHDOG_THRESHOLD_SEC` | Watchdog threshold in seconds (default: 1800). |
| `RL_VISUAL_EVIDENCE_OFF` | Downgrade visual evidence to warn. |
| `RL_PROJECT_TYPE_TIERS_OFF` | Disable project-type tier mismatch warnings. |
| `RL_RALPH_GATE` | Comma-separated quality gate commands. |
| `RL_GATE_COMMANDS` | JSON mapping of gate names to shell commands. |
| `RL_WECOM_WEBHOOK_URL` | WeCom webhook endpoint. |
| `RL_WECOM_BOT_NAME` | WeCom bot display name. |
| `RL_WECOM_NOTIFY_ON_STUCK` | Notify when Lisa is stuck. |
| `RL_WECOM_NOTIFY_ON_FAILED` | Notify on task failure. |
| `RL_WECOM_NOTIFY_ON_ESCALATE` | Notify on escalation events. |
| `CCL_API_KEY` | [CCL_VENDOR] API key. |
| `CCL_CONFIG_DIR` | Override `~/.ccl/` directory. |

---

## See also

- [CLI Reference](/en/cli-reference) — Standard `ccl` command-line reference
- [Ralph-Lisa Loop](/en/ralph-lisa-loop) — Dual-agent collaboration protocol
- [Complexity System](/en/complexity-system) — Task classification and tier assignment
- [Gate System](/en/gate-system) — Quality gates and checkpoints
- [Attestation](/en/attestation) — §149 attest and §133 policy details
