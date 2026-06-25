# Interactive Commands

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Interactive commands control a running CCL session. They switch modes, manage context, inspect cost and files, configure permissions, operate workflows, and connect integrations.

<!-- section: capabilities -->
## Capabilities

- Core commands include help, config, model, permissions, memory, status, cost, context, compact, clear, resume, diff, commit, review, plan, and workflows.
- Integration commands cover MCP, IDE, terminal setup, Chrome, GitHub app installation, remote setup, remote control, and plugins.
- Diagnostic commands include doctor, endpoint, gateway, stats, insights, usage, and debug tool call helpers where present.

<!-- section: operational-model -->
## Operational model

- A command is session-local unless it explicitly writes settings, creates files, talks to a service, or starts an external process. Review each command prompt and permission request before approving writes.

<!-- section: configuration -->
## Configuration and commands

- Type `/` in an interactive session to discover commands available in the current build and project.

<!-- section: source-evidence -->
## Source evidence

- `commands`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `commands/workflows/index.ts`
- `commands/permissions/permissions.tsx`
- `commands/hooks/hooks.tsx`

<!-- section: related -->
## Related pages

- [CLI Reference](cli-reference.md)
- [Gateway and Model Routing](model-routing.md)
- [Workflows](workflows.md)
- [Permissions and Security](permissions-security.md)
- [Hooks](hooks.md)
