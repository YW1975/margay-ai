# Interactive Sessions and Print Mode

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL starts an interactive terminal session by default and can also run one-shot automation through print mode with text, JSON, or stream-oriented outputs.

<!-- section: capabilities -->
## Capabilities

- Use the REPL for iterative work, tool approvals, slash commands, and plan mode.
- Use `-p` or `--print` for scripts, CI tasks, and deterministic command pipelines.
- Resume, rename, rewind, compact, clear, and export sessions through session commands.

<!-- section: operational-model -->
## Operational model

- Interactive mode keeps conversational state. Print mode should be treated as a command-line API with explicit inputs and checked outputs.

<!-- section: configuration -->
## Configuration and commands

- Common commands: `resume`, `session`, `rename`, `rewind`, `compact`, `clear`, `export`, `copy`, `cost`, and `context`.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`
- `commands/resume`
- `commands/session`
- `commands/compact`
- `commands/export`
- `commands/rewind`
- `commands/cost`
- `commands/context`

<!-- section: related -->
## Related pages

- [CLI Reference](cli-reference.md)
- [Interactive Commands](commands.md)
- [Gateway and Model Routing](model-routing.md)
- [Memory, Context, and Sessions](memory-sessions.md)
- [Workflows](workflows.md)
