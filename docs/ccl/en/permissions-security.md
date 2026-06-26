# Permissions and Security

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL protects execution through permission modes, tool allowlists, shell and path validation, PowerShell safety, hooks, sandbox decisions, secret handling, and public-release audits.

<!-- section: capabilities -->
## Capabilities

- Review file writes, shell commands, MCP operations, and remote actions before approval.
- Use read-only validation, command-injection checks, explicit allow/deny/ask rules, and destructive command warnings for shell execution.
- Run public-content audits before publishing docs or artifacts.

<!-- section: operational-model -->
## Operational model

- Security is layered. A tool can be allowed by one layer and still be blocked or rewritten by another layer when policy requires it.
- Sandbox auto-allow is conditional on sandbox support and explicit auto-allow settings, and it still respects explicit deny/ask rules.

<!-- section: configuration -->
## Configuration and commands

- Relevant modules: `commands/permissions`, `utils/settings/types.ts`, `tools/BashTool`, `tools/PowerShellTool`, `utils/sandbox`, `services/tools`, `services/teamMemorySync/secretScanner.ts`, and public audit scripts.


<!-- section: source-evidence -->
## Source evidence

- `commands/permissions`
- `utils/settings/types.ts`
- `tools/BashTool`
- `tools/PowerShellTool`
- `utils/sandbox`
- `services/tools/toolExecution.ts`
- `services/teamMemorySync/secretScanner.ts`

<!-- section: related -->
## Related pages

- [Built-in Tools](tools.md)
- [Hooks](hooks.md)
- [Plugins](plugins.md)
- [GitHub and CI Workflows](github-ci.md)
