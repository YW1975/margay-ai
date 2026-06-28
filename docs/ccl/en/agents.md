# Agents

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL agents are specialized execution contexts used for exploration, planning, verification, guidance, background work, and custom delegated tasks.

<!-- section: capabilities -->
## Capabilities

- Built-in agents include general-purpose, code-reviewer, test-runner, Explore, Plan, verification, statusline setup, and the CCL guide role where enabled.
- Custom and plugin agents are loaded from definition directories and can restrict tools, models, MCP requirements, hooks, permissions, memory, and background behavior.
- Agents can run in the foreground, background, or teammate-style pair-agent paths and can be continued through messaging when supported.

<!-- section: operational-model -->
## Operational model

- Agent discovery starts from built-ins, plugin agents, and custom Markdown definitions, then filters active agents by MCP availability and permission rules before exposing them to the Agent tool prompt.
- Treat built-in type names that exist for compatibility as routing identifiers. The product-facing documentation should describe the CCL role and behavior, not legacy branding.
- The `/buddy` command is a convenience prompt around the Agent tool teammate path. It supplies a `team_name` and teammate `name` so a helper can coordinate with the lead session through the team channel.

<!-- section: configuration -->
## Configuration and commands

- Run `ccl agents` to list configured agents. Use [Subagents](sub-agents.md) for definition format, scopes, MCP requirements, model selection, hooks, memory, and tool restrictions.
- If an agent requires MCP servers, CCL waits briefly for pending matching servers and then reports missing authenticated tool surfaces instead of silently spawning the agent.

## Choosing Between Agents And Subagents

Use the Agents page to understand the registry, built-in roles, discovery order, and runtime behavior. Use [Delegated Task Agents](sub-agents.md) when you are writing or debugging an agent definition. This distinction is deliberate: `agents.md` is the product and runtime guide; `sub-agents.md` is the definition and delegation guide.

## Built-In Agents

| Agent role | When to use | Notes |
| --- | --- | --- |
| General-purpose | Open-ended delegated research or implementation support | Uses the normal agent execution path. |
| Code reviewer | Focused review of changes before commit, PR, or handoff | Use for bug-risk, regression, security, and missing-test review. |
| Test runner | Focused execution and summarization of test commands or harness runs | Use when output may be long or when test evidence needs a concise pass/fail report. |
| Explore | Read-only investigation before deciding what to change | Available at runtime; no longer hidden behind the removed Explore/Plan feature gate. |
| Plan | Create a focused plan without immediately editing files | Available at runtime with Explore. |
| CCL guide | Answer user questions about CCL behavior, commands, settings, agents, workflows, MCP, plugins, and compatibility | The canonical type name remains compatibility-oriented in source, but the user-facing role is CCL guidance. |
| Statusline setup / verification | Specialized setup or evidence-checking tasks | May depend on build flags or runtime conditions. |

## Discovery And Filtering

CCL starts with built-ins, then loads plugin and custom agent definitions. Active agents are deduplicated by `agentType`, with later source groups able to override earlier definitions according to the loader order. Required MCP servers are checked against available server names before an agent is exposed. If a required server is unavailable, the agent should be diagnosed as unavailable rather than silently assumed broken.

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/builtInAgents.ts`
- `tools/AgentTool/built-in`
- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/AgentTool.tsx`
- `tools/AgentTool/runAgent.ts`
- `commands/buddy/index.ts`

<!-- section: related -->
## Related pages

- [Subagents](sub-agents.md)
- [Built-in Tools](tools.md)
- [Skills](skills.md)
- [Permissions and Security](permissions-security.md)
