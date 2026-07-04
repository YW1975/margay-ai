# How CCL Works

> This page is maintained as public documentation source. It describes runtime layers, not private deployment internals.

<!-- section: purpose -->
## Purpose

CCL is an agentic CLI runtime. A session starts from CLI arguments, settings, authentication, model selection, project context, tools, commands, extensions, and policy. It then runs a loop: read user input, construct context, call a model, execute approved tools, stream or render results, persist session state, and compact, delegate, or review when the work grows.

Understanding the layers is the fastest way to debug CCL. Most failures belong to one layer: startup/configuration, authentication, model routing, context construction, tool execution, extension loading, session persistence, remote automation, or governance.

<!-- section: capabilities -->
## Capabilities

- Start interactive, print-mode, SDK, server, direct-connect, SSH, and remote-triggered sessions from the same CLI entrypoint.
- Resolve settings, project context, CCL.md files, commands, skills, agents, hooks, MCP servers, plugins, and permission state before the main loop runs.
- Route model calls through direct provider channels or gateway transport according to model, endpoint, credentials, and routing policy.
- Execute tools only after permission checks, policy filters, hook handling, and tool-specific validation.
- Persist session transcripts, expose resume/fork behavior, and compact context when the active conversation grows.
- Delegate specialized work to agents, subagents, workflows, remote sessions, or Ralph-Lisa review loops when the task needs separation of responsibility.

<!-- section: operational-model -->
## Operational model

Think of CCL as stacked layers:

1. Entrypoint layer: `main.tsx` parses CLI flags, subcommands, startup mode, cwd, stdin, print-mode formats, session IDs, direct-connect URLs, server mode, and remote/SSH early argument rewriting.
2. Configuration layer: settings, environment variables, managed policy, project trust, gateway config, plugin directories, MCP config, and setting-source filters are resolved.
3. Context layer: project instructions, commands, skills, agents, attachments, memories, session transcript, and compacted context are assembled for the model.
4. Model layer: the selected model is normalized, checked against allowlists and endpoint compatibility, and sent through the direct client or gateway stream adapter.
5. Tool layer: model tool requests enter the tool execution path, where permissions, hooks, tool orchestration, streaming output, and error handling determine whether and how work runs.
6. Persistence layer: session storage, summaries, context collapse, session memory, usage metrics, and cost accounting keep the session resumable and auditable.
7. Extension layer: plugins, skills, hooks, MCP, agents, workflows, and remote surfaces add capability without changing the core loop.
8. Governance layer: permissions, policy limits, public-audit checks, RLL gates, review commands, and CI scripts provide higher-level control.

When troubleshooting, locate the layer first. For example, a missing command is usually extension loading or feature gating; a denied shell command is permissions; a wrong provider is routing/authentication; a disappearing context item is compaction or startup context construction.

<!-- section: configuration -->
## Configuration and commands

- Use `ccl --help`, `/help`, `/status`, `/doctor`, `/config`, `/context`, `/permissions`, `/model`, `/endpoint`, and `/gateway doctor` to inspect the active runtime.
- Use `--debug-file <path>` or `--debug-to-stderr` when route, tool, or startup behavior needs exact evidence.
- Use `--bare` to reduce startup layers and pass context explicitly when isolating extension or startup problems.
- Use `--print --output-format json` or `stream-json` for deterministic automation and CI logs.
- Use the layer-specific docs rather than guessing: configuration, authentication, model routing, tools, permissions, MCP, hooks, agents, workflows, remote automation, and troubleshooting.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` defines the primary CLI entrypoint, subcommands, startup flags, print mode, server/open/ssh surfaces, setting sources, model flags, and startup sequencing.
- `query.ts` and `services/api/claude.ts` implement the model loop, streaming events, non-escalating smart-route replies, usage accounting, and model fallback paths.
- `services/api/client.ts` and `services/api/gatewayTransport.ts` implement direct client setup and gateway streaming transport.
- `services/tools/toolExecution.ts`, `services/tools/toolOrchestration.ts`, and `services/tools/toolHooks.ts` implement tool execution, orchestration, and hook integration.
- `utils/settings/types.ts`, `utils/config.ts`, `bootstrap/gatewayConfig.ts`, and `utils/model/model.ts` provide settings, project config, gateway config, and model selection behavior.
- `utils/sessionStorage.ts`, `services/compact/compact.ts`, and `services/SessionMemory/sessionMemory.ts` provide persistence, compaction, and memory behavior.

<!-- section: related -->
## Related pages

- [CCL Overview](overview.md)
- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Configuration and Settings](configuration.md)
- [Gateway and Model Routing](model-routing.md)
- [Built-in Tools](tools.md)
- [Troubleshooting](troubleshooting.md)
