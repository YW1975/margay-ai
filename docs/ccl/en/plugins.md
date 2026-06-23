# Plugins

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Plugins package commands, MCP configuration, hooks, skills, components, marketplaces, and policy-controlled extensions for reuse across CCL installations.

<!-- section: capabilities -->
## Capabilities

- Install, validate, manage, enable, disable, uninstall, and browse plugins.
- Configure marketplaces and organization policy around allowed sources.
- Surface plugin errors for manifest, marketplace, MCP, hook, component, and dependency failures.

<!-- section: operational-model -->
## Operational model

- Treat plugins as supply-chain inputs. Validate manifests, prefer pinned sources, and document trust boundaries before enabling plugin-provided tools or hooks.

<!-- section: configuration -->
## Configuration and commands

- Use `ccl plugin` or `ccl plugins`. Public docs should not publish private marketplace URLs or tokens.

<!-- section: source-evidence -->
## Source evidence

- `commands/plugin`
- `services/plugins`
- `main.tsx`

<!-- section: related -->
## Related pages

- [MCP Servers and Tools](mcp.md)
- [Skills](skills.md)
- [Hooks](hooks.md)
- [Permissions and Security](permissions-security.md)
