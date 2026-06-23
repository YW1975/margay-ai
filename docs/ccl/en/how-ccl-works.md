# How CCL Works

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL runs an agentic loop: gather project context, reason about the user request, call tools under policy, stream results, persist session state, and compact or delegate when the context grows.

<!-- section: capabilities -->
## Capabilities

- Session startup resolves settings, model routing, permissions, tools, commands, MCP, agents, plugins, and project context.
- The model proposes actions, but tools execute only after policy and permission checks.
- Long-running or specialized work can move into subagents, workflows, or RLL review loops.

<!-- section: operational-model -->
## Operational model

- Think of CCL as layers: CLI/session shell, settings and policy, model transport, tools, extensions, and governance. Debug failures by locating the layer first.

<!-- section: configuration -->
## Configuration and commands

- Use [Troubleshooting](troubleshooting.md) to map symptoms to layers, and [Tools](tools.md) plus [Permissions and Security](permissions-security.md) to understand execution boundaries.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`
- `services/api/client.ts`
- `services/tools/toolExecution.ts`
- `services/compact`
- `tools/AgentTool`

<!-- section: related -->
## Related pages

- [CCL Overview](overview.md)
- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Built-in Tools](tools.md)
- [Agents](agents.md)
- [Troubleshooting](troubleshooting.md)
