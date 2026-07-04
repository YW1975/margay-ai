# Configuration and Settings

> This page is maintained as public documentation source. Do not publish secrets, private paths, or generated placeholders.

<!-- section: purpose -->
## Purpose

CCL configuration controls what the runtime can see, which model and endpoint it uses, which tools may run, which extension surfaces load, and which organization policies override local preferences. Treat settings as an execution contract: a session, a subagent, a workflow, or a reviewer should be able to inspect the same documented inputs and predict the same behavior.

This page covers the settings layer itself. Related pages cover specialized surfaces such as authentication, model routing, permissions, MCP, hooks, plugins, and skills.

<!-- section: capabilities -->
## Capabilities

- Load settings from multiple sources: managed policy, user settings, project settings, local project overrides, explicit `--settings`, selected CLI flags, and runtime state.
- Configure environment variables through the `env` settings key without committing secrets to project documentation.
- Control model defaults, available-model policy, model overrides, attribution text, Git instructions, cleanup retention, UI behavior, default shell, worktree behavior, and tool permission defaults.
- Configure permissions, hooks, MCP allow/deny policy, marketplace sources, installed plugins, and plugin-only customization policy through validated settings schemas.
- Limit source loading with `--setting-sources user,project,local` when debugging why agents, skills, hooks, or project settings appear or disappear.
- Inspect settings interactively with `/config` and use focused commands such as `/permissions`, `/mcp`, `/hooks`, `/plugins`, `/skills`, `/agents`, `/model`, and `/endpoint` for domain-specific configuration.

<!-- section: operational-model -->
## Operational model

Settings are validated by a backward-compatible schema. New fields are optional, unknown fields can survive edits, and invalid settings are not used until fixed. This matters for managed deployments: a newer administrator policy should not destroy older local files, and a local typo should be diagnosable instead of silently changing runtime behavior.

The effective configuration is source-aware. Managed settings can restrict hooks, permission rules, MCP servers, and customization surfaces. Project settings are shared team policy. Local project settings are personal overrides. User settings apply globally. CLI flags and `--settings` are process-scoped and are useful for CI, SDK callers, and one-off automation.

`--bare` is a special minimal-startup mode. It skips automatic hooks, LSP startup, plugin sync, attribution, auto-memory, background prefetches, keychain reads, and automatic CCL.md discovery. In bare mode, pass context explicitly with `--system-prompt`, `--append-system-prompt`, `--add-dir`, `--mcp-config`, `--settings`, `--agents`, or `--plugin-dir`.

Configuration does not replace authentication. Credentials still belong in environment variables, gateway configuration, OAuth storage, secure storage, or managed secret systems. Public docs should describe credential names and precedence, never real values.

<!-- section: configuration -->
## Configuration and commands

- Use `/config` for the interactive settings UI.
- Use `--settings <file-or-json>` for session-specific settings injection.
- Use `--setting-sources user,project,local` to debug source visibility for `ccl agents` and related startup behavior.
- Use `.ccl/settings.json` for shared project settings and `.ccl/settings.local.json` for personal project overrides.
- Use settings `env` for non-secret environment defaults and a secret manager or shell environment for credentials.
- Use `permissions.defaultMode`, `permissions.allow`, `permissions.deny`, and `permissions.ask` for tool policy.
- Use `allowedMcpServers`, `deniedMcpServers`, and managed MCP policy when MCP availability must be controlled centrally.
- Use `strictPluginOnlyCustomization` when an organization wants skills, agents, hooks, or MCP customization to come only through approved plugins.
- Use `/doctor`, `/status`, `/model`, `/endpoint`, `/gateway doctor`, and `/permissions` when the runtime does not match expectations.

<!-- section: source-evidence -->
## Source evidence

- `utils/settings/types.ts` defines `SettingsSchema`, permission settings, MCP policy settings, plugin marketplace settings, plugin-only customization surfaces, environment variables, model fields, attribution, worktree, hooks, and backward-compatibility rules.
- `utils/settings/settings.ts` and `utils/settings/settingsCache.ts` load, cache, validate, merge, and preserve settings across sources.
- `utils/config.ts` defines global and project config shapes, including project tool permissions, MCP state, onboarding state, worktree session state, and persisted session metrics.
- `commands/config/config.tsx` routes `/config` to the settings UI.
- `main.tsx` defines CLI flags such as `--settings`, `--setting-sources`, `--bare`, `--mcp-config`, `--plugin-dir`, `--agents`, `--api-key`, and permission flags.
- `utils/settings/pluginOnlyPolicy.ts`, `utils/settings/managedPath.ts`, and `services/remoteManagedSettings` implement managed and restricted configuration behavior.

<!-- section: related -->
## Related pages

- [Authentication](authentication.md)
- [Environment Variables](env-vars.md)
- [Gateway and Model Routing](model-routing.md)
- [Permissions and Security](permissions-security.md)
- [MCP Servers and Tools](mcp.md)
- [Plugins](plugins.md)
