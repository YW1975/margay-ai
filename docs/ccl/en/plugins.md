# Plugins

> This page is maintained as public documentation source. Treat plugins as executable supply-chain inputs.

<!-- section: purpose -->
## Purpose

Plugins package reusable CCL extensions: slash commands, agents, skills, hooks, MCP servers, LSP servers, output styles, settings, marketplace metadata, and plugin options. They are the right unit when an extension should be installed, enabled, disabled, validated, updated, shared, or governed as a bundle.

<!-- section: capabilities -->
## Capabilities

- Install, uninstall, enable, disable, update, validate, browse, and manage plugins through `ccl plugin`, `ccl plugins`, or the interactive `/plugin` surface.
- Install by plugin name, `plugin@marketplace`, marketplace URL/path, or explicit plugin directory depending on the command surface.
- Add, remove, update, and list marketplaces.
- Load session-only plugins with repeated `--plugin-dir <path>` flags.
- Package commands, agents, skills, hooks, MCP servers, LSP servers, output styles, settings, and options when the manifest supports them.
- Store persistent plugin data under a per-plugin data directory that survives plugin version updates and can be removed on final uninstall.
- Use managed policy and strict plugin-only customization to restrict skills, agents, hooks, or MCP customization to approved plugin channels.
- Use marketplace validation to protect reserved official marketplace names and reduce impersonation risk.

<!-- section: operational-model -->
## Operational model

Plugin discovery combines installed marketplace plugins and session-only inline plugin directories. Marketplace plugins are cached by marketplace, plugin name, and version. Built-in plugins and read-only seed directories can provide preloaded plugin content. Session `--plugin-dir` entries are useful for development and one-off testing because they do not behave like durable marketplace installs.

The loader validates plugin manifests, resolves plugin paths, loads plugin hooks, reads commands/agents/skills/output styles, merges plugin settings, collects typed plugin errors, and prevents duplicate or policy-blocked MCP server conflicts. Manual MCP servers take precedence over plugin-provided duplicates; plugin server names are namespaced so they do not collide with user names.

Plugin options can be sensitive or non-sensitive. Sensitive values are stored through secure storage; non-sensitive values can be substituted into supported plugin content and passed to hooks or server config. Plugin data is separate from the versioned install cache so updates do not destroy plugin runtime state.

Because plugins can add tools, hooks, commands, and servers, install only from trusted sources, validate local plugins before sharing, and document trust boundaries in project setup.

<!-- section: configuration -->
## Configuration and commands

- Open the interactive plugin manager: `/plugin` or `/plugins`.
- Install: `ccl plugin install <plugin>` or `ccl plugin install <plugin@marketplace>`.
- Manage installed plugins: `ccl plugin manage`.
- Enable or disable: `ccl plugin enable <plugin>` and `ccl plugin disable <plugin>`.
- Uninstall: `ccl plugin uninstall <plugin>`.
- Validate a local plugin: `ccl plugin validate <path>`.
- Manage marketplaces: `ccl plugin marketplace add|remove|update|list ...`.
- Load development plugins for one session: `ccl --plugin-dir <path> --plugin-dir <path>`.
- Override plugin cache location only when needed with `CLAUDE_CODE_PLUGIN_CACHE_DIR`; use `CLAUDE_CODE_PLUGIN_SEED_DIR` for read-only preloaded caches.

<!-- section: source-evidence -->
## Source evidence

- `commands/plugin/parseArgs.ts` defines plugin command parsing for menu, install, manage, uninstall, enable, disable, validate, and marketplace actions.
- `services/plugins/pluginCliCommands.ts` implements non-interactive install, uninstall, enable, disable, and update wrappers.
- `utils/plugins/schemas.ts` defines plugin manifest, marketplace, hooks, command, agent, skill, MCP, LSP, settings, options, and plugin reference schemas.
- `utils/plugins/pluginLoader.ts` documents and implements discovery, manifest validation, plugin cache resolution, hook loading, duplicate handling, and load-result errors.
- `utils/plugins/pluginDirectories.ts` defines plugin cache directories, cowork plugin mode, cache overrides, seed directories, and persistent plugin data directories.
- `services/mcp/config.ts` integrates plugin-provided MCP servers with manual MCP config and policy filtering.
- `main.tsx` defines repeated `--plugin-dir <path>` session-only plugin loading.

<!-- section: related -->
## Related pages

- [Skills](skills.md)
- [Hooks](hooks.md)
- [MCP Servers and Tools](mcp.md)
- [Configuration and Settings](configuration.md)
- [Permissions and Security](permissions-security.md)
