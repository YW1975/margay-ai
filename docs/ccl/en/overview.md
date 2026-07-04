# CCL Overview

> This page is maintained as public documentation source. It is the top-level map for CCL capabilities and points each workflow to the authoritative detail page.

<!-- section: purpose -->
## Purpose

CCL is the MargayAI command-line agent runtime for interactive coding, non-interactive automation, repository-aware tools, multi-agent delegation, MCP integrations, plugins, skills, workflows, remote automation, and governed delivery loops. The official docs should help a user choose the right entry point without overstating deployment-specific behavior.

<!-- section: capabilities -->
## Capabilities

- Start an interactive terminal session with `ccl` or run deterministic print-mode automation with `ccl -p`.
- Load project context from instructions, settings, command definitions, skills, agents, MCP configuration, hooks, plugins, memories, and attachments.
- Route model requests through the configured direct or gateway path, then execute approved tools under permission and policy controls.
- Extend CCL through MCP servers, custom agents, workflows, hooks, plugins, and skills while keeping supply-chain and permission boundaries explicit.
- Persist and resume sessions, compact large conversations, track usage, and delegate work to specialized agents or Ralph-Lisa review loops.
- Publish official docs through sanitized Markdown, language parity checks, public-content scans, site builds, and coverage-matrix validation.

<!-- section: operational-model -->
## Operational model

Use this page as the navigation hub. New users should read Quickstart first, then Installation if the binary is missing or stale. Operators should start with Configuration, Environment Variables, Authentication, Gateway and Model Routing, Permissions and Security, and Troubleshooting. Developers extending CCL should start with Agents, Delegated Task Agents, MCP, Plugins, Skills, Hooks, and Workflow Automation. Teams using the Ralph-Lisa Loop should start with the governance pages.

CCL is a runtime, not just a wrapper around a model call. Startup resolves CLI flags, settings, project trust, authentication, context, extensions, and permission policy before the main loop can safely run. During a turn, model output is streamed, tool requests are validated, hooks may observe or block work, and results are persisted for resume or audit.

The public docs are intentionally conservative. If a behavior depends on a feature flag, gateway response field, managed setting, account channel, or internal deployment, the docs must say so directly or link to a narrower page. Do not infer provider behavior from CCL source unless CCL itself exposes, validates, or records that behavior.

<!-- section: configuration -->
## Configuration and commands

| Need | Start with | Then read |
| --- | --- | --- |
| Run CCL once in a project | [Quickstart](quickstart.md) | [Interactive Sessions](interactive-sessions.md), [Commands](commands.md) |
| Install or update the binary | [Installation and Updates](installation.md) | [Troubleshooting](troubleshooting.md) |
| Debug credentials or route selection | [Authentication](authentication.md) | [Environment Variables](env-vars.md), [Gateway and Model Routing](model-routing.md) |
| Control tools and shell access | [Permissions and Security](permissions-security.md) | [Built-in Tools](tools.md), [Hooks](hooks.md) |
| Delegate work to agents | [Agents](agents.md) | [Delegated Task Agents](sub-agents.md), [Workflow Automation](workflows.md) |
| Publish or maintain docs | [Public Documentation Publishing](public-docs.md) | [Gates and Attestation](gates-attestation.md), [GitHub and CI Workflows](github-ci.md) |
| Understand the runtime | [How CCL Works](how-ccl-works.md) | [Memory and Session Management](memory-sessions.md), [Model Routing](model-routing.md) |

The top-level CLI entry point is `ccl [prompt]`. Use `ccl --help` for the exact command surface in the installed build, `ccl doctor` for environment health, and `ccl -p "..." --output-format json` or `stream-json` for scriptable automation.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` defines the `ccl` command, print mode, output formats, debug flags, permission flags, settings flags, model flags, session flags, and subcommand registration.
- `query.ts`, `services/api/claude.ts`, `services/tools/toolExecution.ts`, and `services/tools/toolOrchestration.ts` implement the model loop, streaming events, tool execution path, and orchestration.
- `utils/settings/types.ts`, `utils/config.ts`, and `bootstrap/gatewayConfig.ts` define settings, project configuration, gateway configuration, and runtime configuration loading.
- `utils/sessionStorage.ts`, `services/compact/compact.ts`, and `services/SessionMemory/sessionMemory.ts` implement session persistence, compaction, and memory behavior.
- `scripts/check-official-docs-coverage.mjs`, `scripts/check-docs.mjs`, `scripts/audit-public-content.sh`, and `scripts/build-site.mjs` provide the public-docs validation path.

<!-- section: related -->
## Related pages

- [Quickstart](quickstart.md)
- [Installation and Updates](installation.md)
- [How CCL Works](how-ccl-works.md)
- [CLI Reference](cli-reference.md)
- [Troubleshooting](troubleshooting.md)
