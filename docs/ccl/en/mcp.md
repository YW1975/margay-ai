# MCP Servers and Tools

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

CCL integrates Model Context Protocol servers so external systems can provide tools, resources, prompts, authentication flows, IDE bridges, and plugin-provided capabilities. MCP is how CCL extends beyond built-in local tools while keeping those capabilities visible to the same permission and hook system.

Use MCP when a capability naturally belongs to another service or process: a database inspector, ticketing system, browser/IDE bridge, knowledge store, internal API, or team-specific automation server.

<!-- section: capabilities -->
## Capabilities

MCP server configuration supports local stdio servers, remote SSE servers, streamable HTTP servers, WebSocket servers, SDK servers, IDE transports, and proxy-backed remote connectors. Server config can live in local, user, project, dynamic, enterprise, managed, or connector-derived scopes.

Connected MCP servers can expose:

- tools, usually named `mcp__server__tool`;
- resources that can be listed and read through built-in MCP resource tools;
- server instructions and capabilities;
- authentication requirements, including OAuth-related metadata for supported remote servers.

The `/mcp` command opens MCP management, supports reconnecting a named server, and can enable or disable a named server or all servers. In some builds, the base MCP management UI is redirected through the plugin-management surface because plugin-provided MCP servers are managed as part of the extension system.

<!-- section: operational-model -->
## Operational model

At startup and refresh points, CCL reads MCP server definitions from configured scopes, plugin-provided servers, and dynamic/managed sources. It connects clients, records server state as connected, pending, failed, needs-auth, or disabled, and adds connected tools to the session tool pool.

Manual MCP configuration takes precedence over plugin-provided duplicate servers. Plugin MCP servers are namespaced to avoid name collisions, and duplicate detection compares command arrays or URLs so two plugins do not silently launch the same underlying server twice.

MCP tools pass through the same visibility and permission checks as built-in tools. Deny rules can hide a whole server namespace, and scoped rules can target individual generated tool names. Treat every MCP server as a trust boundary: it may read remote data, mutate external systems, or return instructions that influence the model.

<!-- section: configuration -->
## Configuration and commands

Use `.mcp.json` or settings-backed MCP configuration for project servers. The config schema includes:

- `stdio`: `command`, optional `args`, and optional `env`;
- `sse` / `http`: `url`, optional `headers`, optional `headersHelper`, and optional OAuth configuration;
- `ws`: `url`, optional `headers`, optional `headersHelper`;
- `sdk`: a named SDK server;
- internal IDE/proxy transport types used by integrations.

Use `/mcp reconnect <server>` after fixing a failed or needs-auth server. Use `/mcp enable <server>` or `/mcp disable <server>` to control availability without deleting configuration. Keep tokens out of public docs and avoid committing local-only MCP credentials.

<!-- section: source-evidence -->
## Source evidence

- `commands/mcp/mcp.tsx`: implements `/mcp`, reconnect, enable, and disable command behavior.
- `services/mcp/types.ts`: defines MCP transport types, config scopes, server config schemas, and connection states.
- `services/mcp/config.ts`: loads scoped configuration, writes `.mcp.json` atomically, merges plugin servers, and deduplicates duplicate server definitions.
- `services/mcp/MCPConnectionManager.tsx` and `services/mcp/client.ts`: manage connections and client state.
- `tools/MCPTool/MCPTool.ts`, `tools/ListMcpResourcesTool/ListMcpResourcesTool.ts`, and `tools/ReadMcpResourceTool/ReadMcpResourceTool.ts`: expose MCP tools and resources to the model.

<!-- section: related -->
## Related pages

- [Built-in Tools](tools.md)
- [Plugins](plugins.md)
- [Authentication](authentication.md)
- [Permissions and Security](permissions-security.md)
