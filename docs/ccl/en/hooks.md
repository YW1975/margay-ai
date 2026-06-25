# Hooks

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Hooks let CCL run policy or automation around tool execution and session events, including permission decisions, input updates, stop behavior, and additional context.

<!-- section: capabilities -->
## Capabilities

- Inspect and manage hooks through command surfaces.
- Use hook results to add context, update tool input, block continuation, or return permission behavior for tool execution.
- Package hook behavior through plugins, skills, or agents where appropriate.

<!-- section: operational-model -->
## Operational model

- Hooks are deterministic policy surfaces, not conversational suggestions. Keep them small, auditable, and scoped to the event they protect.
- A PreToolUse hook can allow, ask, deny, or update input, but hook allow still respects settings deny/ask rules and tools that require user interaction.

<!-- section: configuration -->
## Configuration and commands

- Relevant modules: `commands/hooks`, `schemas/hooks.ts`, `services/tools/toolHooks.ts`, `services/tools/toolExecution.ts`, `skills/loadSkillsDir.ts`, and plugin hook loading.

<!-- section: source-evidence -->
## Source evidence

- `commands/hooks`
- `schemas/hooks.ts`
- `types/hooks.ts`
- `services/tools/toolHooks.ts`
- `services/tools/toolExecution.ts`
- `commands/plugin/PluginErrors.tsx`
- `skills/loadSkillsDir.ts`

<!-- section: related -->
## Related pages

- [Permissions and Security](permissions-security.md)
- [Plugins](plugins.md)
- [Built-in Tools](tools.md)
- [Interactive Commands](commands.md)
