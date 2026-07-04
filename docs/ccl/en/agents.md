# Agents

> This page is maintained as public documentation source. Agent descriptions are routing contracts; keep them precise.

<!-- section: purpose -->
## Purpose

CCL agents are specialized execution contexts used for exploration, planning, review, testing, verification, guidance, background research, and custom delegated tasks. They let a main session ask a focused worker to operate with its own instructions, model preference, tool rules, MCP requirements, hooks, memory scope, and optional background behavior.

<!-- section: capabilities -->
## Capabilities

- Built-in agents include general-purpose, code-reviewer, test-runner, statusline setup, and feature-gated Explore, Plan, guide, and verification agents.
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

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/builtInAgents.ts` defines built-in agent registration, feature gates, SDK disable behavior, and non-SDK guide-agent inclusion.
- `tools/AgentTool/loadAgentsDir.ts` defines `AgentDefinition`, source types, frontmatter fields, MCP filtering, memory snapshot initialization, Markdown parsing, JSON parsing, and built-in fallback behavior.
- `tools/AgentTool/runAgent.ts` resolves tools, model, MCP tools, hooks, skills, background behavior, abort controllers, and subagent context.
- `commands/agents/agents.tsx` renders the agents menu using the current permission context and available tool set.
- `tools/AgentTool/agentDisplay.ts` defines source group ordering, override annotation, and display model resolution.

<!-- section: related -->
## Related pages

- [Subagents](sub-agents.md)
- [Built-in Tools](tools.md)
- [Skills](skills.md)
- [MCP Servers and Tools](mcp.md)
- [Permissions and Security](permissions-security.md)
