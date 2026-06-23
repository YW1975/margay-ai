# Agents

> CCL's built-in agents and how to configure them.

CCL includes two kinds of agents:

* **Ralph-Lisa Loop roles** (`Ralph` and `Lisa`) coordinate the turn-based development/review workflow.
* **AgentTool subagents** are registered agent types that CCL can invoke from a session, such as `Explore`, `Plan`, and `general-purpose`.

This guide covers both concepts and calls out where they differ.

---

## Built-in agents

CCL ships with the following Ralph-Lisa roles and AgentTool built-ins:

| Agent | Role | When to use |
|-------|------|-------------|
| **Ralph** | Lead Developer | Planning, coding, testing, fixing — the doer in the Ralph-Lisa Loop |
| **Lisa** | Code Reviewer | Reviewing, challenging, verifying — the checker in the Ralph-Lisa Loop |
| **Explore** | Fast codebase exploration | Searching files and understanding code without edits |
| **Plan** | Planning research | Gathering read-only context while the main conversation remains in plan mode |
| **general-purpose** | Research and execution | Complex multi-step research, code search, and implementation support |
| **statusline-setup** | Status line config | Configuring the CCL status line in your terminal |
| **verification** | Independent verification | Running checks and returning PASS/FAIL/PARTIAL evidence after non-trivial work |
| **claude-code-guide** | CCL guidance | Compatibility type name for the CCL guide agent; answers questions about CCL features, commands, settings, and compatibility behavior |

### Ralph — Lead Developer

Ralph is the primary agent in the Ralph-Lisa Loop. He plans approaches, writes code, runs tests, and submits work for review.

**When active:**
- `ccl whose-turn` returns `ralph`
- `RL_AGENT_ROLE=ralph` is set in the environment

**Key responsibilities:**
- Submit `[PLAN]` before any code
- Include real test results in `[CODE]` / `[FIX]` submissions
- Explain reasoning when responding to `[NEEDS_WORK]`
- Use `--file` for submissions to avoid shell escaping issues

**Read more:** [Ralph-Lisa Loop](/en/ralph-lisa-loop)

### Lisa — Code Reviewer

Lisa reviews Ralph's submissions and responds with `[PASS]`, `[NEEDS_WORK]`, or other tags. She verifies test results, checks file:line citations, and ensures quality gates pass.

**When active:**
- `ccl whose-turn` returns `lisa`
- `RL_AGENT_ROLE=lisa` is set in the environment

**Key responsibilities:**
- Verify test results are from actual execution, not fabricated
- Check that `[CODE]` includes §149 attest lines
- Ensure complexity-judge/verify passed for complex tasks
- Provide substantive rationale (not rubber-stamp PASS)

**Read more:** [Ralph-Lisa Loop](/en/ralph-lisa-loop)

### Explore

The `Explore` agent is a fast, read-only subagent for codebase search and understanding.

**Usage:**

```text
use Explore to find where authentication tokens are stored
```

Explore is optimized for searches and summaries. It cannot edit files.

### Plan

The `Plan` agent gathers read-only context while the main session stays in planning mode.

**Usage:**

```text
enter plan mode and use Plan to inspect the migration surface
```

Plan is for architecture and implementation planning, not file edits.

### general-purpose

The `general-purpose` agent handles broad research and multi-step work when a task would flood the main context.

**Usage:**

```text
use general-purpose to inspect the test framework and summarize the failing paths
```

### statusline-setup

The `statusline-setup` agent configures your terminal's status line to show CCL session information.

**Usage:**

```text
set up my status line to show the current CCL session
```

### verification

The `verification` agent independently checks implementation work and returns a literal `VERDICT: PASS`, `VERDICT: FAIL`, or `VERDICT: PARTIAL` with evidence.

**Usage:**

```text
use verification to check the files I changed for this feature
```

### claude-code-guide

The `claude-code-guide` type name is retained for compatibility with existing routing rules and settings. In current CCL it acts as the **CCL guide agent**: it answers questions about CCL features, commands, settings, RLL, AgentTool subagents, and compatibility behavior.

**Usage:**

```text
how do I set up hooks?
what's the best way to structure my CCL.md?
how do subagents work?
```

**Routing note:** CCL keeps the `claude-code-guide` identifier so existing gateway routing and user settings continue to work. Treat the name as a compatibility identifier, not the product name.

**Docs source note:** The guide uses local docs first. Deployments that publish their own CCL documentation can set `CCL_DOCS_BASE_URL`; the guide then uses `<base>/llms.txt` as the external docs map when local docs are insufficient.

## Test harness helper

### test-runner

The `test-runner` helper runs long or verbose test suites and returns a concise pass/fail report. Use it when test output would flood your context window. It is part of the test harness workflow, not one of the AgentTool built-ins listed above.

**Usage:**

```bash
ccl skill test-runner --suite e2e
```

This routes to the appropriate harness (wezterm-test for CLI, playwright-test for web) and returns a short report.

**Read more:** [Common workflows](/en/common-workflows#run-end-to-end-tests-with-the-test-harness)

---

## Custom agents

You can create custom agents for specialized workflows. Custom agents are configured in `.ccl/agents/` or `~/.ccl/agents/`.

### Agent configuration file

Each agent is a JSON file with the following structure:

```json
{
  "name": "my-custom-agent",
  "description": "A custom agent for my team's workflow",
  "model": "sonnet",
  "system_prompt": "You are a specialized agent for...",
  "tools": ["Read", "Edit", "Bash"],
  "allowed_commands": ["npm test", "go test ./..."],
  "max_iterations": 50
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique identifier for the agent |
| `description` | string | Short description shown in agent listings |
| `model` | string | Model to use (e.g., `sonnet`, `opus`, `haiku`) |
| `system_prompt` | string | Custom system instructions |
| `tools` | string[] | Tools the agent can use |
| `allowed_commands` | string[] | Shell commands the agent can run without asking |
| `max_iterations` | number | Maximum tool calls per invocation |

### Registering a custom agent

1. Create the agent file:

```bash
mkdir -p .ccl/agents
cat > .ccl/agents/my-agent.json << 'EOF'
{
  "name": "security-reviewer",
  "description": "Reviews code for security issues",
  "model": "opus",
  "system_prompt": "You are a security-focused code reviewer. Check for SQL injection, XSS, CSRF, and other OWASP top 10 vulnerabilities. Provide specific file:line citations for every issue.",
  "tools": ["Read", "Grep", "Bash"],
  "allowed_commands": ["npm audit", "go vet ./..."],
  "max_iterations": 30
}
EOF
```

2. Use the agent:

```text
@ccl security-reviewer review src/auth/ for security issues
```

Or via the `/agents` command during a session.

---

## Agent teams

You can compose multiple agents into a team for complex workflows. Agent teams are defined in `.ccl/agent-teams.json`.

### Example: security review team

```json
{
  "teams": [
    {
      "name": "security-review",
      "description": "Multi-layer security review",
      "steps": [
        { "agent": "security-reviewer", "prompt": "Review for OWASP top 10" },
        { "agent": "test-runner", "prompt": "Run security test suite" },
        { "agent": "lisa", "prompt": "Final review with security focus" }
      ]
    }
  ]
}
```

Run a team:

```bash
ccl team run security-review --target src/auth/
```

---

## Agent context and isolation

Each agent invocation gets a fresh context window. This means:

- Agents do not share context with your main session
- Agent work does not bloat your context
- Agents return summaries, not raw tool outputs
- You can run multiple agents in parallel

**Best practice:** Use agents for long-running or parallelizable tasks (large-scale search, batch test runs, multi-file analysis) to keep your main session focused.

---

## See also

- [Sub-agents](/en/sub-agents) — Delegating work to specialized agents
- [Ralph-Lisa Loop](/en/ralph-lisa-loop) — Dual-agent collaboration protocol
- [Test Harness](/en/test-harness) — Built-in testing agents
- [Skills](/en/skills) — Reusable workflows and commands
