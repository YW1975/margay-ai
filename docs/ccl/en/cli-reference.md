# CCL CLI Reference

> Complete reference for the `ccl` command-line interface.

CCL is a terminal-based agentic coding assistant. This page covers every flag, command, and environment variable. For conceptual guides, see [How CCL works](/en/how-ccl-works).

---

## Global options

These flags work with any CCL command.

| Flag | Description |
|------|-------------|
| `--verbose` | Print detailed debug output |
| `--model <name>` | Use a specific model (e.g., `sonnet`, `opus`) |
| `--continue` | Resume the most recent session in the current directory |
| `--resume <name>` | Resume a specific session by name |
| `--fork-session` | Fork the current session into a new one |
| `--version` | Print the CCL version and exit |
| `-h`, `--help` | Print help for the current command |

---

## Core commands

### `ccl [prompt]`

Start a new CCL session. If you provide a prompt, CCL begins working immediately. If not, CCL opens an interactive session waiting for your first message.

```bash
# Start an interactive session
ccl

# Start with a task
ccl "Refactor the auth module to use JWT tokens"
```

**Options:**

| Option | Description |
|--------|-------------|
| `--model <name>` | Start with a specific model |
| `--continue` | Resume the most recent session |
| `--resume <name>` | Resume a named session |
| `--fork-session` | Fork from the current session history |

---

### `ccl --continue`

Resume the most recent session in the current directory. Equivalent to `ccl /resume`.

```bash
ccl --continue
```

---

### `ccl --resume <name>`

Resume a specific session by name. Use `/resume` during a session to see the session picker.

```bash
ccl --resume "fix-login-bug"
```

---

### `ccl init "<task>"`

Initialize a new Ralph-Lisa loop session with a task description. This creates the session state and assigns the first turn to Ralph.

```bash
ccl init "Implement user authentication with OAuth2"
```

---

### `ccl start [--daemon]`

Start the Ralph-Lisa dual-agent loop. In normal mode, this sets up the session and begins the turn-based protocol. With `--daemon`, the loop runs as a background process suitable for CI/CD or long-running tasks.

```bash
# Start an interactive loop session
ccl start

# Start in daemon mode (background process)
ccl start --daemon
```

---

### `ccl auto [--engine] [--full-auto]`

Run the loop in automatic mode, where Ralph and Lisa take turns without human intervention. Use `--engine` to specify the AI engine, and `--full-auto` for completely unattended operation (e.g., overnight batch processing).

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

Check which agent (Ralph or Lisa) currently has the turn. This is the first command you should run when returning to a session.

```bash
ccl whose-turn
```

**Output:**

- `ralph` — It is Ralph's turn. Read Lisa's feedback and continue working.
- `lisa` — It is Lisa's turn. Wait for her review.

---

### `ccl submit-ralph --file <path>`

Submit work from Ralph and pass the turn to Lisa. The file should contain a tagged submission (e.g., `[PLAN]`, `[CODE]`, `[FIX]`). Always use `--file` instead of inline submission to avoid shell escaping issues with brackets, backticks, and quotes.

```bash
ccl submit-ralph --file .dual-agent/submit.md
```

---

### `ccl submit-lisa --file <path>`

Submit Lisa's review response and pass the turn back to Ralph. The file should contain a tagged review (e.g., `[PASS]`, `[NEEDS_WORK]`).

```bash
ccl submit-lisa --file .dual-agent/lisa-response.md
```

---

### `ccl read review.md`

Read Lisa's latest review feedback. This is the first thing Ralph should do when it's his turn.

```bash
ccl read review.md
```

---

### `ccl status`

View the current session state, including whose turn it is, the current step, round number, and any pending actions.

```bash
ccl status
```

---

### `ccl recap`

Recover context after a session compaction or extended break. Shows the current step, round, last 3 actions, and any unresolved `[NEEDS_WORK]` items.

```bash
ccl recap
```

---

### `ccl doctor`

Diagnose common issues with your CCL installation and environment. Checks for required binaries (e.g., `wezterm`, `playwright`), configuration problems, and connectivity issues.

```bash
ccl doctor
```

---

### `ccl quality-gate`

Run the configured quality gates (lint, type-check, format) against the current project. Gate commands are configured via `RL_RALPH_GATE` and `RL_GATE_COMMANDS`.

```bash
ccl quality-gate
```

---

### `ccl plan validate`

Validate the current plan against project policies and quality gates. Checks that the plan includes required sections, test commands, and quality gate commands.

```bash
ccl plan validate
```

---

## Task management commands

### `ccl task complexity-judge --slice <slug> --json`

Analyze the complexity of a task slice and output a JSON judgment. This is Layer 1 of the three-layer gate system (§123). The output includes schema version, model ID, tiers, evidence, and recommendations.

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
| `tiers` | Assigned quality tiers |
| `evidence` | Evidence for each high-confidence tier |
| `recommendations` | Suggested workflow adaptations |

---

### `ccl task complexity-verify --slice <slug>`

Verify the complexity judgment for a slice. This is Layer 2 of the three-layer gate system. Validates schema, freshness, canonical tier IDs, coverage, and sanity flags. Must exit 0 before submitting a `[TDD-PLAN]`.

```bash
ccl task complexity-verify --slice auth-refactor
```

---

## Clarify commands

### `ccl clarify --start`

Begin the R0 clarify phase for complex or expert tasks. This initiates a 5-stage grill (complexity confirmation, codebase exploration, decision tree mapping, Q&A, and consensus deliverable).

```bash
ccl clarify --start
```

---

### `ccl clarify --status [--json]`

Check the current status of the clarify phase, including stage, question count, and whether negative scope is locked.

```bash
ccl clarify --status
```

---

### `ccl clarify --add-answer <Q-id> "<answer>"`

Record an answer to a clarify question in the artifact.

```bash
ccl clarify --add-answer Q1 "Use PostgreSQL for persistence"
```

---

### `ccl clarify --commit --understanding "..." --covered "a,b" --negative-scope "x,y" --risks "r1"`

Finalize the R0 clarify phase with the required 5 fields: understanding, covered scope, negative scope, decisions, and risks.

```bash
ccl clarify --commit \
  --understanding "Implement OAuth2 login with Google and GitHub providers" \
  --covered "auth flow, token refresh, user model" \
  --negative-scope "enterprise SSO, SAML, password reset" \
  --risks "token expiry edge cases, provider rate limits"
```

---

### `ccl clarify --skip`

Explicitly skip the R0 clarify phase. A warning is printed, and this should only be used with user consent.

```bash
ccl clarify --skip
```

---

### `ccl ack-scope-expansion --reason "..."`

Acknowledge a scope expansion requested by Lisa (via `[NEEDS_USER_ACK]`). Provides a reason for the expansion.

```bash
ccl ack-scope-expansion --reason "User confirmed we need SAML support"
```

---

## Communication commands

### `ccl wecom-push --body "..."`

Push a message to the WeCom (WeChat Work) notification channel. Used for alerts, escalations, and status updates.

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

Display token usage statistics for the current session, including input tokens, output tokens, and estimated costs.

```bash
ccl token-usage
```

---

### `ccl token-capture --pane <n>`

Capture token usage from a specific tmux pane. Useful when running CCL in split-terminal mode.

```bash
ccl token-capture --pane 1
```

---

## Testing and gate commands

### `ccl smoke-check`

Run the configured smoke test command (`RL_SMOKE_CMD`) to verify basic system health before submitting code.

```bash
ccl smoke-check
```

---

### `ccl gate-manifest --type <type>`

Set the project type in `gate-manifest.json`. This hints the default baseline tier set for the project archetype (`cli`, `web-app`, `mobile-app`, `library`, `service`).

```bash
ccl gate-manifest --type web-app
```

**Project types:**

| Type | Default baseline tiers |
|------|------------------------|
| `cli` | unit, integration |
| `web-app` | unit, smoke, integration |
| `mobile-app` | unit, e2e |
| `library` | unit |
| `service` | unit, integration, security |

---

## Session management commands

### `ccl sessions`

Open the session picker to view and switch between active sessions. Sessions are scoped to the current worktree by default.

```bash
ccl sessions
```

---

### `ccl session branch --name <name>`

Branch the current session to explore an alternative approach without losing the original state.

```bash
ccl session branch --name "alternative-auth-approach"
```

---

### `ccl session fork --name <name>`

Fork the current session to start a new task from a clean state while preserving the original session.

```bash
ccl session fork --name "new-feature-branch"
```

---

## Built-in slash commands

During any CCL session, you can use these slash commands:

| Command | Description |
|---------|-------------|
| `/check-turn` | Check whose turn it is in the Ralph-Lisa loop |
| `/submit-work "[TAG] ..."` | Submit work and pass the turn |
| `/view-status` | See current session status |
| `/read-review` | Read Lisa's latest feedback |
| `/next-step "name"` | Enter a new step after consensus |
| `/init` | Walk through creating a CCL.md for your project |
| `/agents` | Configure custom subagents |
| `/doctor` | Diagnose common installation issues |
| `/context` | See what's using space in the context window |
| `/compact` | Compact the conversation to free context space |
| `/model` | Switch models during a session |
| `/mcp` | Check per-server MCP context costs |
| `/resume` | Open the session picker |
| `/branch` | Fork the current session |
| `/clear` | Clear the screen |
| `/help` | Show available commands |
| `/exit` | End the session |

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `RL_AGENT_ROLE` | Set by `ccl start` / `auto` / `start --daemon`. Signals whether the session is in the Ralph-Lisa loop (`ralph` or `lisa`) or standalone. |
| `RL_POLICY_MODE` | Policy enforcement mode: `block` (default) or `warn`. In block mode, submit-time policy violations exit 1 and reject the submission. |
| `RL_RALPH_ATTEST_OFF` | Set to `1` to opt out of the §149 attest block requirement (dev escape hatch). |
| `RL_SMOKE_CMD` | Command to run for smoke tests after `[CODE]` / `[FIX]` submissions. |
| `RL_SMOKE_AUTO_LOOP_OFF` | Set to `1` to disable automatic smoke test loops after submission. |
| `RL_LISA_WATCHDOG_OFF` | Set to `1` to disable the Lisa watchdog that pings WeCom when Lisa is silent for >30 minutes. |
| `RL_LISA_WATCHDOG_THRESHOLD_SEC` | Seconds of inactivity before the Lisa watchdog fires (default: 1800). |
| `RL_VISUAL_EVIDENCE_OFF` | Set to `1` to downgrade the visual evidence requirement from block to warn. |
| `RL_PROJECT_TYPE_TIERS_OFF` | Set to `1` to disable project-type tier mismatch warnings. |
| `RL_RALPH_GATE` | Comma-separated list of quality gate commands to run before submission. |
| `RL_GATE_COMMANDS` | JSON mapping of gate names to shell commands. |
| `CCL_API_KEY` | Your [CCL_VENDOR] API key for authentication. |
| `CCL_CONFIG_DIR` | Override the default `~/.ccl/` configuration directory. |

---

## Configuration files

| File | Purpose |
|------|---------|
| `~/.ccl/settings.json` | Global CCL settings (permissions, allowed commands, MCP servers) |
| `~/.ccl/projects/` | Session history and application data |
| `./CCL.md` | Project-specific instructions loaded at the start of every session |
| `./.ccl/settings.json` | Project-specific settings |
| `./gate-manifest.json` | Project type and default baseline tier configuration |
| `.dual-agent/submit.md` | Default submission file for Ralph's work |
| `.dual-agent/review.md` | Lisa's latest review feedback |
| `.dual-agent/history.md` | Full submission history |
| `.dual-agent/gate-results.md` | Quality gate results |
| `.dual-agent/complexity-judge/<slice>.json` | Cached complexity judgments |

---

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | General error or policy violation (blocked submission) |
| `2` | Invalid arguments or usage error |
| `3` | Session state error (e.g., out-of-turn submission) |
| `130` | Interrupted by user (Ctrl+C) |

---

## See also

- [How CCL works](/en/how-ccl-works) — Core architecture and capabilities
- [Ralph-Lisa Loop](/en/ralph-lisa-loop) — Dual-agent collaboration protocol
- [Complexity System](/en/complexity-system) — Task classification and tier assignment
