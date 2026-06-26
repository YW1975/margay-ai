# Memory, Context, and Sessions

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL manages conversation state, session transcripts, memory extraction, compacting, context collapse, agent memory, and session resume flows.

<!-- section: capabilities -->
## Capabilities

- Resume and manage sessions from command surfaces.
- Compact or collapse context when sessions grow large.
- Persist agent memory in user, project, local, or remote-backed scopes where enabled.

<!-- section: operational-model -->
## Operational model

- Memory is powerful but should stay scoped. Do not place secrets or public-release-only claims into persistent memory.

<!-- section: configuration -->
## Configuration and commands

- Relevant commands and services: `memory`, `resume`, `session`, `compact`, `contextCollapse`, `SessionMemory`, `extractMemories`, and `agentMemory`.


<!-- section: source-evidence -->
## Source evidence

- `commands/memory`
- `commands/resume`
- `commands/session`
- `services/SessionMemory`
- `services/contextCollapse`
- `tools/AgentTool/agentMemory.ts`

<!-- section: related -->
## Related pages

- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Subagents](sub-agents.md)
- [Configuration and Settings](configuration.md)
- [Troubleshooting](troubleshooting.md)
