# Built-in Tools

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL tools are the executable capabilities available to the model and agents. They cover shell, file I/O, search, web access, LSP, planning, tasks, goals, teams, MCP, workflows, review artifacts, scheduling, and user interaction.

<!-- section: capabilities -->
## Capabilities

- File tools: Read, Write, Edit, NotebookEdit, Glob, Grep, and LSP operations.
- Execution tools: Bash, PowerShell, terminal capture, workflow run, scheduled cron, and remote triggers.
- Coordination tools: AgentTool, SendMessage, Task, Team, Todo, Goal, AskUserQuestion, and review artifacts.

<!-- section: operational-model -->
## Operational model

- Tools run under permission and safety policy. Read-only tools can still expose sensitive data in prompts, so public documentation must avoid examples with real secrets or private paths.

<!-- section: configuration -->
## Configuration and commands

- Use tool allowlists, permission modes, hooks, and managed settings to constrain tool execution by project or environment.


<!-- section: source-evidence -->
## Source evidence

- `tools`
- `services/tools/toolExecution.ts`
- `tools/BashTool`
- `tools/FileReadTool`
- `tools/MCPTool`

<!-- section: related -->
## Related pages

- [Permissions and Security](permissions-security.md)
- [Agents](agents.md)
- [MCP Servers and Tools](mcp.md)
- [Workflows](workflows.md)
