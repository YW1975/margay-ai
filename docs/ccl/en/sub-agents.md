# Subagents

> This page is maintained as public documentation source. Subagents are separate execution contexts, not permission bypasses.

<!-- section: purpose -->
## Purpose

Subagents let a CCL session delegate focused work to a separate context with its own system prompt, model selection, tool pool, permission mode, MCP clients, hooks, memory behavior, and run limits. Use them when separation improves quality: independent review, parallel research, test execution, scoped exploration, or a specialist procedure.

<!-- section: capabilities -->
## Capabilities

- Start a subagent through the Agent tool, built-in agents, plugin agents, or custom agent definitions.
- Run synchronous agents that share selected parent callbacks or background agents that continue independently.
- Resolve agent-specific tools and MCP tools before execution.
- Preload frontmatter skills into the agent context.
- Run `SubagentStart` hooks and convert agent stop hooks to `SubagentStop`.
- Preserve viewable transcripts and tool results for in-process teammate-style agents when configured.
- Resume background or in-process agents through message routing where supported.

<!-- section: operational-model -->
## Operational model

Subagent execution begins after the parent session selects an agent definition. CCL resolves the agent model, tool list, MCP clients, additional working directories, and system prompt. The agent receives its own context and messages; it does not simply inherit unlimited parent authority.

Synchronous agents share more parent state and abort behavior. Background agents get a separate abort controller and are treated as non-interactive so the parent can continue. Fork-style agents can inherit more context when the fork feature is active, but they are still guarded to prevent recursive uncontrolled spawning.

Permissions still matter. Agent-level `tools`, `disallowedTools`, `permissionMode`, and MCP requirements shape the worker's available surface, but they do not turn an unsafe task into a safe one. Hooks and plugin-only policy can block or limit agent lifecycle behavior.

<!-- section: configuration -->
## Configuration and commands

Use subagents when one of these is true:

| Situation | Recommended agent pattern |
| --- | --- |
| Broad repository exploration | Read/search-only agent with low write authority. |
| Independent code review | Reviewer agent with source-reading tools and no edit tools. |
| Test execution | Test-runner agent with command execution and concise pass/fail output. |
| Long-running research | Background agent with bounded tools and a clear return artifact. |
| Workflow step | Workflow agent adapter with explicit workflow params and expected artifacts. |

Before adding a custom subagent, verify that its `description` says when to use it, its tool access is no broader than necessary, MCP dependencies are explicit, background behavior is intentional, memory avoids secrets, and any isolation mode matches the repository risk.

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/runAgent.ts` builds agent-specific options, resolves tools and MCP tools, handles sync versus background abort behavior, executes `SubagentStart` hooks, registers agent frontmatter hooks, preloads skills, and creates subagent context.
- `tools/AgentTool/loadAgentsDir.ts` parses agent fields including tools, disallowed tools, skills, MCP servers, hooks, model, effort, permission mode, max turns, background, memory, and isolation.
- `tools/AgentTool/forkSubagent.ts` defines fork-subagent behavior and guards implicit forks.
- `tools/AgentTool/resumeAgent.ts` reconstructs and resumes viewable or background subagent sessions when routing supports it.
- `tools/WorkflowTool/agentAdapter.ts` connects workflow execution to agent-backed work.

<!-- section: related -->
## Related pages

- [Agents](agents.md)
- [Workflow Automation](workflows.md)
- [Built-in Tools](tools.md)
- [Permissions and Security](permissions-security.md)
- [Memory and Session Management](memory-sessions.md)
