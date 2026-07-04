# Built-in Tools

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

Tools are the executable boundary between the model and the host environment. CCL exposes tools for reading and editing files, running shell commands, searching a workspace, using web access, managing tasks and goals, asking the user questions, delegating to agents, reading MCP resources, and running workflow automation.

The practical rule is simple: the model may propose a tool call, but the CCL runtime owns validation, permission checks, hook execution, telemetry, streaming, and result delivery. When a task behaves unexpectedly, debug the tool layer before assuming the model misunderstood the request.

<!-- section: capabilities -->
## Capabilities

Core file and search tools include `Read`, `Write`, `Edit`, `NotebookEdit`, `Glob`, and `Grep`. `Bash` is the primary local command runner; `PowerShell` is exposed only when the shell feature is enabled. Web and external-context tools include `WebFetch`, `WebSearch`, MCP tools, MCP resource listing and reading, and optional browser or terminal-panel capabilities when those feature flags are enabled.

Coordination tools cover agent delegation, task management, todo updates, goal state, plan-mode entry and exit, user questions, review artifacts, remote triggers, scheduled cron work, team messaging, worktree entry/exit, and workflow execution. Not every tool is present in every build. `tools.ts` builds the base list, then filters by feature flags, environment, permission context, simple mode, and whether an MCP server supplies additional tools.

MCP tools are added to the same pool as built-ins. Their names normally use the `mcp__server__tool` shape, which lets permissions target one tool, one server, or a wildcard server rule.

<!-- section: operational-model -->
## Operational model

Tool execution follows a layered path:

1. The active session assembles the tool pool from built-ins plus connected MCP tools.
2. Blanket deny rules remove tools before the model sees them.
3. The model requests a tool by name with structured input.
4. CCL validates the input schema and runs pre-tool hooks.
5. Permission logic decides allow, ask, or deny using explicit rules, permission mode, sandbox state, classifier state, SDK permission prompts, and hook decisions.
6. The tool executes only if allowed.
7. CCL streams progress and runs post-tool or post-failure hooks.
8. The result is converted into tool-result content and returned to the model.

This layering matters for operations. An allow rule can make a common command faster, but a deny rule, safety check, tool-specific validation, or hook can still stop the call. Conversely, hiding a tool from the prompt with a blanket deny is stronger than relying on the model to avoid it.

<!-- section: configuration -->
## Configuration and commands

Use `--allowed-tools`, `--disallowed-tools`, `/permissions`, project settings, and managed settings to control which tools are visible or executable. Tool rule syntax supports whole-tool rules such as `Read` and scoped rules such as `Bash(git status)` or MCP server rules such as `mcp__docs` / `mcp__docs__*`.

Use simple mode only when you intentionally want a reduced tool surface. In simple mode CCL keeps the basic local edit loop small, normally around shell/read/edit operations, with extra coordination tools only when coordinator features require them.

For repeatable automation, prefer workflow or print-mode commands with explicit expected outputs. For exploratory work, keep the interactive session available so permission prompts and user questions are not silently denied by a headless context.

<!-- section: source-evidence -->
## Source evidence

- `tools.ts`: `getAllBaseTools()`, `getTools()`, `assembleToolPool()`, and `filterToolsByDenyRules()` define tool inventory and filtering.
- `services/tools/toolExecution.ts`: validates tool input, runs hooks, records telemetry, classifies errors, and returns tool-result content.
- `services/tools/toolHooks.ts`: connects pre/post tool hooks to execution and permission behavior.
- `utils/permissions/permissions.ts`: resolves allow/ask/deny decisions before execution.
- `services/mcp/utils.ts` and `services/mcp/mcpStringUtils.ts`: define MCP tool naming and permission matching behavior.

<!-- section: related -->
## Related pages

- [Permissions and Security](permissions-security.md)
- [Hooks](hooks.md)
- [MCP Servers and Tools](mcp.md)
- [Workflows](workflows.md)
