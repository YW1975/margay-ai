# Memory, Context, and Sessions

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

CCL keeps useful state across long interactions without treating every token as permanent truth. Session history supports resume and recovery. Context management keeps the active prompt inside model limits. Session memory and agent memory preserve selected learnings when the feature is enabled and the configured thresholds are met.

The important distinction is scope. Session transcript is operational history, compacted context is the model-facing working set, session memory is extracted notes for a conversation, and agent memory is persistent knowledge scoped to user, project, or local agent use.

<!-- section: capabilities -->
## Capabilities

Session persistence records conversations so they can be resumed by ID, searched, or selected through `/resume`. `/clear` starts a new session state while preserving appropriate background task boundaries. `/rewind` and resume-at-message flows can return to an earlier point when supported by the caller.

Context controls include manual `/compact`, automatic compaction, microcompact transforms, context visualization through `/context`, and optional context-collapse behavior when that feature is active. `/context` intentionally shows the API-facing view rather than raw terminal scrollback, so compacted or collapsed spans do not mislead the operator.

Session memory runs in the background using a forked agent. It initializes after token thresholds are met, then updates only after enough context growth and tool activity. Agent memory stores `MEMORY.md` under user, project, or local scope, with local memory excluded from version control-oriented sharing.

<!-- section: operational-model -->
## Operational model

Compaction is not just compression. Before a compact, CCL may run pre-compact hooks, apply microcompact, merge hook-provided instructions, then create a replacement summary and clean caches afterward. Session-memory compaction is tried first when there are no custom compact instructions.

Session memory is intentionally delayed and threshold-based. It does not extract after every turn. The runtime checks token growth, tool-call counts, and whether the last assistant turn still has active tool calls before launching extraction. The memory file is created with restrictive permissions and then read through the same file-tool path used by the rest of the runtime.

Agent memory is loaded into an agent's prompt when a memory scope is configured. User scope should stay general, project scope may be shared with the repository, and local scope is machine/project-specific. Do not store secrets, credentials, temporary incident details, or public-release claims that have not been verified.

<!-- section: configuration -->
## Configuration and commands

Use `/resume` for session recovery and `/context` before compacting when you need to understand what the model currently sees. Use `/compact` when the session has grown large or when you want to replace noisy exploration with a focused summary. Use custom compact instructions only when the default summary would omit essential facts.

Memory hygiene:

- Keep durable memory factual, short, and scoped.
- Put team-shared practices in project memory only when the team agrees.
- Prefer local memory for machine-specific details.
- Remove stale memory when behavior changes.
- Never persist API keys, private local paths intended only for one run, or speculative conclusions.

<!-- section: source-evidence -->
## Source evidence

- `utils/sessionStorage.ts` and `utils/sessionRestore.ts`: persist and restore sessions.
- `commands/resume/resume.tsx`, `commands/clear/conversation.ts`, `commands/compact/compact.ts`, and `commands/context/context.tsx`: implement resume, clear, compact, and API-facing context inspection.
- `query.ts`: applies microcompact, context collapse, autocompact, reactive compact, memory attachments, and post-compact state transitions during the main query loop.
- `services/SessionMemory/sessionMemory.ts`: defines threshold-based background extraction and memory-file setup.
- `tools/AgentTool/agentMemory.ts`: defines user/project/local agent memory scopes and `MEMORY.md` loading.

<!-- section: related -->
## Related pages

- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Subagents](sub-agents.md)
- [Configuration and Settings](configuration.md)
- [Troubleshooting](troubleshooting.md)
