# Project Setup

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

A CCL-ready project declares local instructions, settings, permissions, extension directories, optional MCP configuration, and verification commands that match the repository.

<!-- section: capabilities -->
## Capabilities

- Keep project instructions short and stable; move procedures into skills, commands, or workflows.
- Use local settings for developer preferences and project settings for shared policy.
- Document build, test, lint, and public audit commands before relying on automation.

<!-- section: operational-model -->
## Operational model

- Project setup is not only onboarding. It is the contract that lets agents, tools, and reviewers operate with predictable scope.

<!-- section: configuration -->
## Configuration and commands

- Use `init`, `config`, `permissions`, `mcp`, `agents`, `skills`, `hooks`, and workflow commands to make project behavior explicit.

<!-- section: source-evidence -->
## Source evidence

- `commands/init.ts`
- `commands/config`
- `commands/permissions`
- `commands/mcp`
- `tools/AgentTool/loadAgentsDir.ts`

<!-- section: related -->
## Related pages

- [Quickstart](quickstart.md)
- [Configuration and Settings](configuration.md)
- [Permissions and Security](permissions-security.md)
- [MCP Servers and Tools](mcp.md)
- [Skills](skills.md)
