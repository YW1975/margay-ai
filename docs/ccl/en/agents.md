# Agents

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL agents are specialized execution contexts used for exploration, planning, verification, guidance, background work, and custom delegated tasks.

<!-- section: capabilities -->
## Capabilities

- Built-in agents include Explore, Plan, verification, statusline setup, general-purpose, and the CCL guide role.
- Custom and plugin agents are loaded from definition directories and can restrict tools, models, MCP requirements, hooks, permissions, memory, and background behavior.
- Agents can run in the foreground or background and can be continued through messaging when supported.

<!-- section: operational-model -->
## Operational model

- Agent discovery starts from built-ins, plugin agents, and custom Markdown definitions, then filters active agents by MCP availability and permission rules before exposing them to the Agent tool prompt.
- Treat built-in type names that exist for compatibility as routing identifiers. The product-facing documentation should describe the CCL role and behavior, not legacy branding.

<!-- section: configuration -->
## Configuration and commands

- Run `ccl agents` to list configured agents. Use [Subagents](sub-agents.md) for definition format, scopes, MCP requirements, model selection, hooks, memory, and tool restrictions.
- If an agent requires MCP servers, CCL waits briefly for pending matching servers and then reports missing authenticated tool surfaces instead of silently spawning the agent.

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/builtInAgents.ts`
- `tools/AgentTool/built-in`
- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/AgentTool.tsx`
- `tools/AgentTool/runAgent.ts`

<!-- section: related -->
## Related pages

- [Subagents](sub-agents.md)
- [Built-in Tools](tools.md)
- [Skills](skills.md)
- [Permissions and Security](permissions-security.md)
