# CLI Reference

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

The `ccl` binary exposes the interactive entry point, print mode, MCP management, server and remote connection commands, authentication, plugin management, agents, automation, updater commands, and shell completion.

<!-- section: capabilities -->
## Capabilities

- Top-level commands include `mcp`, `server`, `ssh`, `open`, `auth`, `plugin`, `agents`, `auto-mode`, `doctor`, `update`, `install`, and `completion`.
- Interactive slash commands are documented separately in [Commands](commands.md), including cost, context, usage, gateway, endpoint, and remote-control surfaces when available.
- Internal-only commands should not be documented as stable public automation APIs.

<!-- section: operational-model -->
## Operational model

- The CLI reference describes stable user-facing behavior. When source help marks a command as internal or deployment-specific, document it as operational context rather than a public contract.

<!-- section: configuration -->
## Configuration and commands

- Run `ccl --help` and `ccl <command> --help` in the installed build for the exact command surface available in that build.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`

<!-- section: related -->
## Related pages

- [Interactive Commands](commands.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Plugins](plugins.md)
- [Agents](agents.md)
- [Remote Sessions and Automation](remote-automation.md)
