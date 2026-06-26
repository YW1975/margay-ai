# CCL Overview

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL is the MargayAI command-line agent runtime for interactive coding, non-interactive automation, multi-agent delegation, MCP integrations, plugins, skills, workflows, and governed delivery loops.

<!-- section: capabilities -->
## Capabilities

- Interactive terminal sessions and print-mode automation.
- Built-in tools for files, shell, search, web, LSP, tasks, goals, teams, MCP, workflows, and review artifacts.
- Extension layers for commands, hooks, skills, plugins, MCP servers, and custom agents.

<!-- section: operational-model -->
## Operational model

- Use this page as the top-level map. Start with Quickstart, then move to configuration, commands, tools, and extension guides according to the task you need to run.

<!-- section: configuration -->
## Configuration and commands

- CLI entry point: `ccl [prompt]`, `ccl -p`, and the top-level subcommands listed in [CLI Reference](cli-reference.md).

## Use The Docs By Job

CCL documentation is organized around the job a user is trying to do. New users should read Quickstart first, then Installation if the binary is not already available. Operators should start with Configuration, Environment Variables, Authentication, and Gateway and Model Routing. Developers extending CCL should start with Agents, Delegated Task Agents, MCP, Plugins, Skills, Hooks, and Workflow Automation. Teams using the Ralph-Lisa Loop should start with the governance pages.

| Need | Start with | Then read |
| --- | --- | --- |
| Run CCL once in a project | [Quickstart](quickstart.md) | [Interactive Sessions](interactive-sessions.md), [Commands](commands.md) |
| Debug setup or credentials | [Authentication](authentication.md) | [Environment Variables](env-vars.md), [Troubleshooting](troubleshooting.md) |
| Understand model/provider behavior | [Gateway and Model Routing](model-routing.md) | [Configuration](configuration.md), [Cost and context commands in Commands](commands.md#diagnostics-and-cost) |
| Delegate work to agents | [Agents](agents.md) | [Delegated Task Agents](sub-agents.md), [Built-in Tools](tools.md) |
| Publish or maintain docs | [Public Documentation Publishing](public-docs.md) | [Gates and Attestation](gates-attestation.md) |

## What CCL Is And Is Not

CCL is a command-line agent runtime. It coordinates a model, local project context, tools, permissions, settings, extensions, and optional governance loops. It is not a standalone documentation site, a generic chatbot wrapper, or a replacement for the gateway. Gateway and provider behavior should be documented only when CCL source or verified runtime evidence shows how CCL observes it.

The public docs must be conservative about claims. If a behavior depends on a gateway response field, a feature flag, a managed setting, or a deployment-specific command, the page should say that directly instead of presenting it as universal.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`
- `tools`
- `commands`
- `services`

<!-- section: related -->
## Related pages

- [Quickstart](quickstart.md)
- [Installation and Updates](installation.md)
- [CLI Reference](cli-reference.md)
- [Built-in Tools](tools.md)
- [Agents](agents.md)
