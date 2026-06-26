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

## Scope Of This Page

This page is for defining delegated task agents. It does not repeat the high-level agent registry model from [Agents](agents.md). Use it when you need to create, review, or debug a Markdown/JSON agent definition.

## Definition Fields

| Field | What it controls | When to use |
| --- | --- | --- |
| `description` | Routing signal shown to the host model | Always; make it precise and action-oriented. |
| `tools` / `disallowedTools` | Allowed or blocked tool names | When the agent must be read-only or limited to specific actions. |
| `skills` | Skills to preload | When the agent should use a repeatable procedure. |
| `mcpServers` / `requiredMcpServers` | MCP configuration or availability requirements | When the agent depends on external tools. |
| `model` / `effort` | Model preference and reasoning effort | When cost, latency, or task difficulty needs a different default. |
| `permissionMode` | Tool approval behavior | When the agent needs stricter or narrower execution policy. |
| `background` | Background execution | For long-running research or checks. |
| `memory` | Persistent memory scope | Only when repeated work benefits from stored context. |

## Safe Delegation Checklist

Before adding a custom subagent, verify that the description says when to use it, tool access is no broader than necessary, MCP requirements are explicit, background behavior is intentional, and any persistent memory scope avoids secrets or project-private claims that should not be reused globally.

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
