# SDK

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

The CCL SDK exposes the `@margay/ccl-core/sdk` import path for host processes that need a headless, stream-oriented CCL agent session with permission interception, resumable sessions, pending approvals, and usage accounting.

<!-- section: capabilities -->
## Capabilities

- Start a managed CCL subprocess with `query({ prompt, options })` and receive a `Query` handle: the event stream plus session control methods.
- Resume a normal session with `query({ prompt, options: { resume: sessionId } })`.
- Drive a running session through control methods such as `interrupt`, `setModel`, `setPermissionMode`, and `rewindFiles` without stopping the event stream.
- Resume a suspended approval flow with `resumeWithDecision(sessionId, decision, options)`.
- Intercept tool use through `canUseTool` and return `allow`, `deny`, or `pending`.
- Persist pending approvals and accumulated usage through the `SessionStore` interface.
- Configure provider, model, cwd, tools, settings, plugins, skills, hooks, budget, turns, and environment through `QueryOptions`.

<!-- section: operational-model -->
## Operational model

- The SDK is a host-side wrapper around the same CLI runtime. It launches CCL in print mode with stream JSON input and output, so tools, permissions, skills, hooks, gateway routing, and session persistence follow CLI behavior.
- A `pending` permission decision suspends the session before the tool executes. The host can render an approval UI, then later call `resumeWithDecision` from another process.
- On approval, the SDK applies the recorded pending input or the explicit updated input supplied by the approver. It must not silently execute a different regenerated tool input.
- Hooks are observational. Use `canUseTool` for blocking or modifying tool execution.

<!-- section: configuration -->
## Configuration and commands

- Import from `@margay/ccl-core/sdk`.
- Set `CCL_SDK_CLI_PATH` if the host must point at a specific CLI build.
- Set `CCL_SDK_STORE_DIR` or pass a custom `SessionStore` when pending approvals and usage need host-controlled persistence.
- Use `provider: { type: 'openai-compatible', baseUrl, apiKey }` for CCL gateway compatible routes; it maps to the CCL gateway channel (`CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY`), which normalizes tool calling and rejects models without native function calling instead of silently degrading.
- Use `provider: { type: 'anthropic', baseUrl?, apiKey? }` for any endpoint that speaks the direct provider protocol; it maps to `--base-url` / `--api-key`.
- Omit `provider` to inherit the CLI's configured gateway and account state.

## Public Exports

| Export | Purpose |
| --- | --- |
| `query` | Run one prompt and return a `Query` handle that streams SDK events until `result`, `suspended`, or fatal `error`, and exposes session control methods. |
| `queryWithTransport` | Run through a caller-supplied transport seam for tests or advanced hosts. |
| `resumeWithDecision` | Resume a session that suspended on a pending approval. |
| `buildCliArgs` | Convert SDK options into CLI arguments. |
| `buildCliEnv` | Convert SDK options into child-process environment. |
| `spawnCliTransport` | Default subprocess transport. |
| `prepareSkillsWrappers` | Wrap explicit skills directories as temporary plugin inputs. |
| `decideFailClosed` | Normalize invalid permission results or callback failures into deny decisions. |
| `getSessionUsage` | Read accumulated usage for a session from the store. |
| `fileSessionStore` | File-backed `SessionStore` implementation. |
| `defaultStoreDir` | Default SDK store directory. |

## Query Handle And Control Methods

`query({ prompt, options })` returns a `Query` handle: the async iterable of SDK events plus control methods that speak the CLI control protocol. The positional form `query(prompt, options)` still works but is deprecated; new code should use the object form.

The handle eagerly pumps the underlying event loop, so control methods resolve without the host iterating events. Events are buffered and replayed to the iterator, so the stream a host sees is identical to the plain event generator. Once the query has ended (result delivered, transport closed, or subprocess exited), pending and future control calls reject fast — except `rewindFiles`, which is a post-run operation and stays callable between the `result` event and `close()`.

| Method | Purpose |
| --- | --- |
| `interrupt()` | Interrupt the current turn. |
| `setPermissionMode(mode)` | Switch permission mode mid-session. |
| `setModel(model?)` | Switch the session model; omit the argument to reset. |
| `setMaxThinkingTokens(n)` | Set or clear (`null`) the thinking-token cap. |
| `mcpServerStatus()` | Report MCP server status. |
| `reconnectMcpServer(name)` | Reconnect one MCP server. |
| `toggleMcpServer(name, enabled)` | Enable or disable one MCP server. |
| `setMcpServers(servers)` | Replace the MCP server set. |
| `stopTask(id)` | Stop a running background task. |
| `applyFlagSettings(settings)` | Apply flag-style settings at runtime. |
| `rewindFiles(userMessageId, options?)` | Rewind file changes made since a user message; pass `{ dry_run: true }` for a preview. Callable after the `result` event. |
| `initializationResult()` | Return the parsed initialize payload: commands, agents, models, account, and output styles. |
| `reinitialize()` | Send a fresh initialize request and refresh the cached payload. |
| `supportedCommands()` | List commands the session supports (derived from `initializationResult()`). |
| `supportedModels()` | List models the session supports (derived from `initializationResult()`). |
| `supportedAgents()` | List agents the session supports (derived from `initializationResult()`). |
| `accountInfo()` | Return account information (derived from `initializationResult()`). |
| `close()` | Terminate the subprocess and end the stream. Idempotent. |

The initialize response that the event loop already requests is parsed and cached, so `initializationResult()` and the derived reads (`supportedCommands`, `supportedModels`, `supportedAgents`, `accountInfo`) do not send a second initialize on the wire; `reinitialize()` does and refreshes the cache.

Suspend and resume work unchanged with the handle: a `pending` permission decision yields a `suspended` event, and `resumeWithDecision(sessionId, decision)` starts a new resumed stream.

## Query Options At A Glance

| Option family | Examples | Effect |
| --- | --- | --- |
| Session identity | `sessionId`, `resume`, `forkSession`, `persistSession` | Controls transcript identity, resume behavior, and whether a run is saved. |
| Runtime scope | `cwd`, `addDirs`, `settings`, `env`, `cliPath`, `execPath` | Controls where the subprocess runs and what configuration it inherits. |
| Model and provider | `model`, `provider`, `maxTurns`, `maxBudgetUsd` | Selects routing and sets turn or budget bounds. |
| Tools and permissions | `allowedTools`, `disallowedTools`, `permissionMode`, `canUseTool`, `canUseToolTimeoutMs` | Limits tool availability and lets the host approve, deny, or suspend tool calls. |
| Extensions | `pluginDirs`, `skillsDirs`, `agents`, `hooks` | Supplies plugins, skills, inline agents, and host-side lifecycle callbacks. |
| Transport/debug | `extraArgs`, `includeRaw`, `signal`, custom store/transport through advanced APIs | Adds escape hatches for embedding and test harnesses. |

## Event Types

The stream yields JSON-serializable events. Important event types include:

| Event | Meaning |
| --- | --- |
| `assistant_text` | Model text output chunk. |
| `tool_use` | The model requested a tool call. |
| `permission_request` | A tool call is waiting for host policy. |
| `permission_resolved` | The host policy allowed or denied the request. |
| `tool_result` | Tool execution completed or was denied. |
| `suspended` | The SDK saved a pending approval and stopped the subprocess. |
| `result` | The run completed. |
| `error` | Fatal or non-fatal SDK/runtime error. |

## Permission Callback

```ts
import { query } from '@margay/ccl-core/sdk'

for await (const event of query({
  prompt: 'audit the workspace',
  options: {
    cwd: '/srv/workspace',
    model: 'deepseek-v4-pro',
    maxTurns: 30,
    canUseTool: async (toolName, input, context) => {
      if (toolName === 'Bash') return { behavior: 'pending' }
      return { behavior: 'allow' }
    },
  },
})) {
  if (event.type === 'suspended') {
    // Render approval UI and persist event.sessionId.
  }
}
```

Valid decisions:

| Decision | Effect |
| --- | --- |
| `{ behavior: 'allow' }` | Execute with original input. |
| `{ behavior: 'allow', updatedInput }` | Execute with approved modified input. |
| `{ behavior: 'deny', message }` | Deny the tool and continue the session. |
| `{ behavior: 'pending' }` | Save the approval request, stop the subprocess, and yield `suspended`. |

## Resume After Approval

```ts
import { resumeWithDecision } from '@margay/ccl-core/sdk'

for await (const event of resumeWithDecision(sessionId, {
  behavior: 'allow',
})) {
  // Continue rendering the resumed stream.
}
```

If no pending approval exists for the session, the first iteration fails with a clear error. Pending records are one-shot and are consumed after application.

## Host Integration Checklist

| Concern | Required host behavior |
| --- | --- |
| Approval UI | Persist `event.sessionId` from `suspended` events and show the recorded tool name and input. |
| Updated input | Use `updatedInput` only for an explicit user-approved modification. |
| Timeout | Keep `canUseToolTimeoutMs` finite for unattended hosts so permission callbacks fail closed. |
| Storage | Use a custom `SessionStore` when approvals or usage must survive container restarts or run across workers. |
| Provider routing | Use `provider: { type: 'openai-compatible', ... }` for gateway-compatible routes, or omit `provider` to inherit CLI configuration. |
| Hooks | Use hooks for observation and telemetry; use `canUseTool` for blocking decisions. |

## Source evidence

- `sdk/index.ts`
- `sdk/README.md`
- `sdk/API.md`
- `sdk/query.ts`
- `sdk/queryHandle.ts`
- `sdk/store.ts`
- `sdk/transport.ts`
- `sdk/types.ts`

<!-- section: related -->
## Related pages

- [CLI Reference](cli-reference.md)
- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Permissions and Security](permissions-security.md)
- [Gateway and Model Routing](model-routing.md)
- [Configuration and Settings](configuration.md)
