# Agents

> This page is maintained as public documentation source. Agent descriptions are routing contracts; keep them precise.

<!-- section: purpose -->
## Purpose

CCL agents are specialized execution contexts used for exploration, planning, review, testing, verification, guidance, background research, and custom delegated tasks. They let a main session ask a focused worker to operate with its own instructions, model preference, tool rules, MCP requirements, hooks, memory scope, and optional background behavior.

<!-- section: capabilities -->
## Capabilities

- Built-in agents include general-purpose, code-reviewer, test-runner, Debug, statusline setup, and feature-gated Explore, Plan, guide, and verification agents.
- Custom agents are Markdown definitions loaded from user, project, local, managed, or CLI argument sources.
- Plugin agents are loaded from installed plugin bundles and displayed as a distinct source.
- Agents can declare `tools`, `disallowedTools`, `skills`, `mcpServers`, `hooks`, `model`, `effort`, `permissionMode`, `maxTurns`, `background`, `memory`, and isolation settings.
- Agent availability can depend on configured MCP servers; missing required MCP servers hide the agent.
- `/agents` and `ccl agents --setting-sources user,project,local` help inspect which agents are active and which source won.

<!-- section: operational-model -->
## Operational model

Agent discovery starts with built-ins, then adds plugin and custom definitions. Custom Markdown files require `name` and `description` frontmatter. Invalid agent attempts are skipped and recorded; JSON agents passed through `--agents` fail per-agent rather than discarding the whole batch.

Active agents are deduplicated by `agentType` and source priority. Display code groups them as user, project, local, managed, plugin, CLI arg, and built-in agents, and annotates when one source overrides another. Simple mode keeps only built-ins.

When an agent runs, CCL resolves its tool set, model, MCP tools, and lifecycle context. `SubagentStart` hooks can add context; agent frontmatter hooks are registered only when the source is trusted under plugin-only policy. Skills listed in agent frontmatter are preloaded if available. Background agents use an unlinked abort controller and non-interactive execution; synchronous agents share more parent session state.

<!-- section: configuration -->
## Configuration and commands

Minimal custom agent shape:

```markdown
---
name: repo-reviewer
description: Use when a repository change needs an independent correctness review.
tools: Read,Grep
model: inherit
maxTurns: 8
---
Review the changed files for correctness risks, missing tests, and unsafe assumptions.
```

Operational guidance:

- Keep `description` short and specific; it is the main routing signal.
- Restrict `tools` to what the agent needs and use `disallowedTools` for explicit denials.
- Declare required MCP servers when the agent depends on external tools.
- Use `background: true` only for work that can safely continue while the main session moves on.
- Use agent memory only for durable, non-secret knowledge that should survive across runs.

## Debug Agent

The built-in Debug agent is a debugging specialist for bug reports, regressions, and "X does not work" tasks — anything that is primarily "find out why this is broken and fix it" rather than "build something new".

Its evidence discipline is non-negotiable:

- Reproduce first. Before touching any code it must produce a reproducible failing artifact — a probe assertion that comes back red on the reported behavior, or a failing test/command with captured output.
- One hypothesis, one decidable experiment at a time. Every root-cause hypothesis is paired with an experiment whose outcome decides it; it never stacks two unverified hypotheses.
- The same evidence must turn green after the fix. It re-runs the exact red reproduction with the same oracle; a different, weaker check does not count.
- Its report is a root-cause chain (symptom, mechanism, origin with file references), an evidence list (every experiment and its verdict), and a minimal fix diff. An honest "unproven" is required when reproduction or proof fails.

The agent drives reproduction through the debug probe tool. Platform support:

| Platform | Status |
| --- | --- |
| `tui` | Full support: launches the app in an isolated terminal pane, sends key sequences, captures pane text, and asserts oracles. |
| `web` | Minimal support: headless browser page (click/fill/type, DOM snapshot, console and network capture). Requires a locally installed browser automation dependency; if it is missing the probe fails with a clear unavailable error and install instructions. |
| `desktop` | Not yet supported; the probe returns a clear error. |

The Debug agent runs on the analysis capability pool, so quality routing priority sends it to a strong model automatically, and it cannot spawn nested agents.

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/builtInAgents.ts` defines built-in agent registration, feature gates, SDK disable behavior, and non-SDK guide-agent inclusion.
- `tools/AgentTool/loadAgentsDir.ts` defines `AgentDefinition`, source types, frontmatter fields, MCP filtering, memory snapshot initialization, Markdown parsing, JSON parsing, and built-in fallback behavior.
- `tools/AgentTool/runAgent.ts` resolves tools, model, MCP tools, hooks, skills, background behavior, abort controllers, and subagent context.
- `commands/agents/agents.tsx` renders the agents menu using the current permission context and available tool set.
- `tools/AgentTool/agentDisplay.ts` defines source group ordering, override annotation, and display model resolution.
- `tools/AgentTool/built-in/debugAgent.ts` defines the Debug agent: trigger description, evidence discipline, probe-first system prompt, analysis-pool model, and nested-agent denial.
- `tools/DebugProbeTool/` implements the probe providers: full terminal-pane support, minimal headless-web support, and the unsupported desktop placeholder.

<!-- section: related -->
## Related pages

- [Subagents](sub-agents.md)
- [Built-in Tools](tools.md)
- [Skills](skills.md)
- [MCP Servers and Tools](mcp.md)
- [Permissions and Security](permissions-security.md)
- [Duo: Peer Collaboration](duo.md)
- [Using CCL in VS Code](ide.md)
