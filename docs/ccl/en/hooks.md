# Hooks

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

Hooks let CCL run deterministic policy, automation, or observation at defined lifecycle points. They are the right place for repeatable checks around tool use, session start/end, compaction, permissions, notifications, task events, file changes, and other runtime events.

Use hooks for enforceable process rules, not for vague conversational guidance. A hook should make a bounded decision, attach context, update an input, or record evidence that can be inspected later.

<!-- section: capabilities -->
## Capabilities

Persistent hook configuration supports four hook command types:

- `command`: run a shell command.
- `prompt`: ask a model to evaluate a prompt.
- `http`: POST hook input JSON to an HTTP endpoint.
- `agent`: run an agentic verifier prompt.

Hooks can be filtered with an `if` field that uses the same permission-rule syntax as tool rules, for example matching a tool name or a scoped command pattern. Hooks can have per-hook timeouts, custom status messages, and one-shot behavior. Command hooks can also run asynchronously; `asyncRewake` hooks can wake the model if they finish with a blocking error.

Session-only function hooks also exist inside the runtime. They cannot be persisted to settings files, which keeps in-memory verifier callbacks separate from user-editable configuration.

<!-- section: operational-model -->
## Operational model

Hooks are executed around the main tool and session loop. `PreToolUse` hooks run before execution and can influence permission behavior or update input. `PostToolUse` hooks run after successful execution and can add context, stop continuation, or update MCP tool output. `PostToolUseFailure` hooks run when a tool fails. `PermissionRequest` and `PermissionDenied` hooks let automation observe or decide approval paths.

Lifecycle events also include `SessionStart`, `SessionEnd`, `Stop`, `StopFailure`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PostCompact`, `UserPromptSubmit`, `Setup`, `TaskCreated`, `TaskCompleted`, `ConfigChange`, `InstructionsLoaded`, `CwdChanged`, and `FileChanged`.

Hook failures should be visible but bounded. Session-end hooks use a short shutdown timeout by default; ordinary tool hooks use a longer tool-hook timeout. Long-running async hooks should be written so cancellation, retries, and duplicate events are safe.

<!-- section: configuration -->
## Configuration and commands

Use `/hooks` to inspect and manage hooks from the interactive interface. Store shared hooks in project or managed settings only when every user of the project should inherit them. Package reusable hook behavior in plugins or skills when the hook needs assets, scripts, or release management.

Operational guidance:

- Keep hook output concise; large output is capped.
- Use `if` filters so hooks do not spawn for unrelated tool calls.
- Prefer command hooks for deterministic local checks and HTTP hooks for existing policy services.
- Use prompt or agent hooks only when judgment is required and latency is acceptable.
- Do not put secrets in hook definitions. If headers need environment variables, explicitly list allowed variables for interpolation.

<!-- section: source-evidence -->
## Source evidence

- `schemas/hooks.ts`: defines persistent hook command types, matcher configuration, `if` conditions, timeouts, async fields, and env interpolation controls.
- `entrypoints/sdk/coreTypes.ts`: defines the canonical `HOOK_EVENTS` list.
- `utils/hooks.ts`: executes hooks, manages output caps, session-end timeout, async behavior, and hook event emission.
- `utils/hooks/sessionHooks.ts`: stores temporary session/function hooks and explains why function hooks are not persisted.
- `services/tools/toolHooks.ts`: connects `PreToolUse`, `PostToolUse`, and failure hooks to tool execution.

<!-- section: related -->
## Related pages

- [Built-in Tools](tools.md)
- [Permissions and Security](permissions-security.md)
- [Plugins](plugins.md)
- [Skills](skills.md)
