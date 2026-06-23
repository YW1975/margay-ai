# MCP Servers and Tools

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL integrates Model Context Protocol servers for external tools, resources, prompts, OAuth flows, IDE bridges, and extension-provided capabilities.

<!-- section: capabilities -->
## Capabilities

- Manage servers with `ccl mcp` commands.
- List and read MCP resources through built-in tools.
- Handle OAuth and channel permissions through MCP services.

<!-- section: operational-model -->
## Operational model

- MCP servers expand the tool surface. Install only trusted servers, constrain scopes, and document which data each server can read or mutate.

<!-- section: configuration -->
## Configuration and commands

- Relevant areas: `commands/mcp`, `services/mcp`, `tools/MCPTool`, `tools/ListMcpResourcesTool`, and `tools/ReadMcpResourceTool`.

<!-- section: source-evidence -->
## Source evidence

- `commands/mcp`
- `services/mcp`
- `tools/MCPTool`
- `tools/ListMcpResourcesTool`
- `tools/ReadMcpResourceTool`

<!-- section: related -->
## Related pages

- [Built-in Tools](tools.md)
- [Plugins](plugins.md)
- [Authentication](authentication.md)
- [Permissions and Security](permissions-security.md)
