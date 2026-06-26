# Plugins

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Plugins package commands, MCP configuration, hooks, skills, components, marketplaces, and policy-controlled extensions for reuse across CCL installations.

<!-- section: capabilities -->
## Capabilities

- Install, validate, manage, enable, disable, uninstall, and browse plugins.
- Configure marketplaces and organization policy around allowed sources.
- Package commands, agents, skills, hooks, MCP servers, LSP servers, settings, and output styles when the manifest supports them.

<!-- section: operational-model -->
## Operational model

- Treat plugins as supply-chain inputs. Validate manifests, prefer pinned sources, and document trust boundaries before enabling plugin-provided tools or hooks.
- Plugin errors are typed so CCL can distinguish manifest, marketplace, duplicate MCP server, hook-load, component-load, download, and LSP failures.

<!-- section: configuration -->
## Configuration and commands

- Use `ccl plugin` or `ccl plugins`. Public docs should not publish private marketplace URLs or tokens.


<!-- section: source-evidence -->
## Source evidence

- `commands/plugin`
- `services/plugins`
- `types/plugin.ts`
- `utils/plugins`
- `main.tsx`

<!-- section: related -->
## Related pages

- [MCP Servers and Tools](mcp.md)
- [Skills](skills.md)
- [Hooks](hooks.md)
- [Permissions and Security](permissions-security.md)
