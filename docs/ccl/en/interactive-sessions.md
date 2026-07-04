# Interactive Sessions and Print Mode

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

CCL has two primary operating surfaces. The default surface is an interactive terminal session for iterative work, approvals, slash commands, context inspection, and long-running collaboration. The non-interactive surface is print mode, enabled with `-p` or `--print`, for scripts, CI, SDK-style callers, and deterministic command pipelines.

Choose the surface by the job. If the task needs user judgment, approvals, exploration, or recovery from ambiguous tool results, use interactive mode. If the task has explicit input, bounded tool permissions, and a machine-checkable output, use print mode.

<!-- section: capabilities -->
## Capabilities

Interactive sessions keep conversation state and expose local commands such as `/resume`, `/compact`, `/context`, `/clear`, `/export`, `/copy`, `/cost`, `/session`, and workflow commands. They are also the normal place for permission prompts, plan mode, hooks that need user visibility, and manual inspection of tool results.

Print mode supports `--output-format text`, `--output-format json`, and `--output-format stream-json`. It also supports stream input, partial message streaming, hook event streaming, JSON schema constrained output, `--max-turns`, `--max-budget-usd`, explicit tool allow/deny lists, permission mode, MCP config, custom system prompts, and session resume options. The default headless turn ceiling is 70 turns; use `--max-turns 0` only when the caller has an external timeout or watchdog.

`--bare` is a minimal mode for controlled automation. It skips hooks, LSP, plugin sync, attribution, auto-memory, background prefetches, keychain reads, and automatic CCL instruction discovery. Because it removes helpful context, provide explicit context through system prompts, settings, agents, plugin dirs, MCP config, or allowed directories when using it.

<!-- section: operational-model -->
## Operational model

Interactive mode owns the terminal event loop. It can ask for permission, update session state, render progress, and let the user inspect or cancel. Session persistence is enabled unless explicitly disabled, so later resume operations can recover history.

Print mode treats CCL as a command-line API. It skips the workspace trust dialog, so use it only in directories you trust. The caller must provide all context and must check exit status and output shape. In streaming JSON mode, use the event stream rather than scraping terminal text.

Resume behavior matters in both modes. `--continue` resumes the most recent conversation for the current directory. `--resume <id>` resumes a specific session, and `--fork-session` creates a new session ID from a resumed conversation instead of mutating the original.

<!-- section: configuration -->
## Configuration and commands

Common interactive commands:

- `/resume`: pick or search previous conversations.
- `/compact`: summarize or reduce context when the session grows.
- `/context`: show the API-facing context view, including compact/collapse transformations.
- `/clear`: start a fresh conversation state.
- `/export`, `/copy`, `/cost`, `/session`: export, copy, inspect cost, or show remote-session details.

Common print-mode patterns:

- `ccl -p "Summarize this repo" --output-format text`
- `ccl -p "Return JSON" --output-format json --json-schema '<schema>'`
- `ccl -p "Run bounded task" --max-turns 20 --allowed-tools Read Grep`
- `ccl -p "Use MCP" --mcp-config ./mcp.json --permission-mode default`

Do not use `--dangerously-skip-permissions` as the normal automation path. Prefer narrow `--allowed-tools` / `--disallowed-tools` rules and an external timeout for CI.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`: defines default interactive startup, `-p/--print`, output/input formats, `--bare`, resume/fork flags, permission flags, and print-mode safety text.
- `cli/print.ts`: implements the non-interactive runtime, structured I/O, tool pool assembly, permission prompt tool integration, MCP setup, and session resume handling.
- `cli/printMaxTurns.ts`: defines the 70-turn default and `CCL_PRINT_MAX_TURNS` / `--max-turns` behavior.
- `commands/resume/resume.tsx`, `commands/compact/compact.ts`, `commands/context/context.tsx`, `commands/clear/clear.ts`, `commands/export/export.tsx`, `commands/cost/cost.ts`, and `commands/session/session.tsx`: implement the major interactive session commands.

<!-- section: related -->
## Related pages

- [CLI Reference](cli-reference.md)
- [Interactive Commands](commands.md)
- [Memory, Context, and Sessions](memory-sessions.md)
- [Workflows](workflows.md)
