# Hooks

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Hooks let CCL run policy or automation around tool execution and session events, including permission decisions, input updates, stop behavior, and additional context.

<!-- section: capabilities -->
## Capabilities

- Inspect and manage hooks through command surfaces.
- Use hook results in tool execution policy.
- Package hook behavior through plugins where appropriate.

<!-- section: operational-model -->
## Operational model

- Hooks are deterministic policy surfaces, not conversational suggestions. Keep them small, auditable, and scoped to the event they protect.

<!-- section: configuration -->
## Configuration and commands

- Relevant modules: `commands/hooks`, `services/tools/toolHooks.ts`, `services/tools/toolExecution.ts`, and plugin hook loading.

<!-- section: source-evidence -->
## Source evidence

- `commands/hooks`
- `services/tools/toolHooks.ts`
- `services/tools/toolExecution.ts`
- `commands/plugin/PluginErrors.tsx`

<!-- section: related -->
## Related pages

- [Permissions and Security](permissions-security.md)
- [Plugins](plugins.md)
- [Built-in Tools](tools.md)
- [Interactive Commands](commands.md)
