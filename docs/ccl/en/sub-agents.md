# Subagents

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Subagents let a CCL session delegate focused work to a separate context with its own instructions, tool limits, model preference, and optional memory behavior.

<!-- section: capabilities -->
## Capabilities

- Define custom agents in Markdown with frontmatter metadata.
- Control `name`, `description`, `tools`, `model`, scope, and instruction body.
- Use background agents for long-running research or checks while the main session continues.

<!-- section: operational-model -->
## Operational model

- Subagent descriptions are routing signals. Keep them specific, short, and oriented around when the agent should be used.

<!-- section: configuration -->
## Configuration and commands

- Use agent directories in user, project, or local scope. Use tool restrictions for least privilege, especially for shell, file write, and MCP access.

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
