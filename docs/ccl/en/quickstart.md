# Quickstart

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Install CCL, configure the gateway or compatible model provider, open a project directory, and start with either an interactive session or a print-mode request.

<!-- section: capabilities -->
## Capabilities

- Run `ccl` for an interactive session.
- Run `ccl -p "summarize this repo"` for non-interactive output.
- Run `ccl doctor` when authentication, updater, or environment health is unclear.

<!-- section: operational-model -->
## Operational model

- CCL loads settings, discovers project context, prepares tools, then routes model requests through the configured provider path. Permission prompts protect file edits, shell commands, MCP tools, and remote actions.

<!-- section: configuration -->
## Configuration and commands

- Use `ccl login` or provider environment variables as appropriate for the deployment.
- Use `ccl mcp` to add external tool servers after the base session works.
- Use `ccl agents` to confirm built-in and custom agents are visible.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`
- `commands/login/login.tsx`
- `commands/mcp/mcp.tsx`
- `tools/AgentTool/builtInAgents.ts`

<!-- section: related -->
## Related pages

- [Installation and Updates](installation.md)
- [Authentication](authentication.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Agents](agents.md)
