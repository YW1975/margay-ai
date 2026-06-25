# Configuration and Settings

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL resolves settings from user, project, local, managed, and runtime sources, then applies them to model routing, permissions, tools, MCP, hooks, agents, plugins, notifications, and UI behavior.

<!-- section: capabilities -->
## Capabilities

- Inspect and modify settings through `/config` and related command modules.
- Separate durable project policy from local developer preferences.
- Use managed settings and sync services for organization-controlled defaults.

<!-- section: operational-model -->
## Operational model

- Settings are merged before session startup and can also be read by tools that need source-aware behavior, such as AgentTool and MCP management.
- CCL-specific environment variables are intentionally separated from gateway routing credentials so endpoint selection is explicit and debuggable.

<!-- section: configuration -->
## Configuration and commands

- Use `--setting-sources user,project,local` with `ccl agents` when debugging agent visibility.
- Use `ccl remote-env`, `ccl endpoint`, and gateway settings when deployment-specific routing differs by environment.
- See [Environment Variables](env-vars.md) for the CCL-specific variables and the compatibility variables that are intentionally passed through.

<!-- section: source-evidence -->
## Source evidence

- `tools/ConfigTool`
- `services/settingsSync`
- `services/remoteManagedSettings`
- `commands/config/config.tsx`
- `bootstrap/envSync.ts`
- `bootstrap/gatewayConfig.ts`

<!-- section: related -->
## Related pages

- [Authentication](authentication.md)
- [Gateway and Model Routing](model-routing.md)
- [Environment Variables](env-vars.md)
- [Permissions and Security](permissions-security.md)
- [Agents](agents.md)
