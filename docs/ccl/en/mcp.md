# MCP Servers and Tools

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL integrates Model Context Protocol servers for external tools, resources, prompts, OAuth flows, IDE bridges, and extension-provided capabilities.

<!-- section: capabilities -->
## Capabilities

- Manage servers with `ccl mcp`, including reconnect, enable, and disable operations.
- List and read MCP resources through built-in tools, and expose MCP tools with `mcp__server__tool` names.
- Handle OAuth and channel permissions through MCP services.

<!-- section: operational-model -->
## Operational model

- MCP servers expand the tool surface. Install only trusted servers, constrain scopes, and document which data each server can read or mutate.
- Remote authentication failures are cached briefly as needs-auth states so repeated connection attempts do not create noisy retry loops.

<!-- section: configuration -->
## Configuration and commands

- Relevant areas: `commands/mcp`, `services/mcp`, `tools/MCPTool`, `tools/ListMcpResourcesTool`, and `tools/ReadMcpResourceTool`.
- MCP transports include stdio, SSE, streamable HTTP, WebSocket/control transports, and provider-proxy paths where configured.


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
