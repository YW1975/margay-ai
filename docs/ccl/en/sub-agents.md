# Subagents

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Subagents let a CCL session delegate focused work to a separate context with its own instructions, tool limits, model preference, and optional memory behavior.

<!-- section: capabilities -->
## Capabilities

- Define custom agents in Markdown with frontmatter metadata.
- Control `name`, `description`, `tools`, `disallowedTools`, `skills`, `mcpServers`, `hooks`, `model`, `effort`, `permissionMode`, `maxTurns`, `background`, `memory`, and instruction body.
- Use background agents for long-running research or checks while the main session continues.

<!-- section: operational-model -->
## Operational model

- Subagent descriptions are routing signals. Keep them specific, short, and oriented around when the agent should be used.
- Agent-level tool rules and permission modes shape the worker tool pool; they do not grant a public bypass of CCL permission policy.

<!-- section: configuration -->
## Configuration and commands

- Use agent directories in user, project, or local scope. Use tool restrictions for least privilege, especially for shell, file write, and MCP access.
- `requiredMcpServers` is matched against available MCP server names and only agents whose requirements are met are shown as active.

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/AgentTool.tsx`
- `tools/AgentTool/agentMemory.ts`
- `tools/AgentTool/agentMemorySnapshot.ts`

<!-- section: related -->
## Related pages

- [Agents](agents.md)
- [Built-in Tools](tools.md)
- [Skills](skills.md)
- [Memory, Context, and Sessions](memory-sessions.md)
