# SDK

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

The CCL SDK exposes the `@margay/ccl-core/sdk` import path for host processes that need a headless, stream-oriented CCL agent session with permission interception, resumable sessions, pending approvals, and usage accounting.

<!-- section: capabilities -->
## Capabilities

- Start a managed CCL subprocess with `query(prompt, options)`.
- Resume a normal session with `query(prompt, { resume: sessionId })`.
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
- Use `provider: { type: 'openai-compatible', baseUrl, apiKey }` for CCL gateway compatible routes, or inherit the CLI's configured gateway and account state.

## Public Exports

| Export | Purpose |
| --- | --- |
| `query` | Run one prompt and stream SDK events until `result`, `suspended`, or fatal `error`. |
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

for await (const event of query('audit the workspace', {
  cwd: '/srv/workspace',
  model: 'deepseek-v4-pro',
  maxTurns: 30,
  canUseTool: async (toolName, input, context) => {
    if (toolName === 'Bash') return { behavior: 'pending' }
    return { behavior: 'allow' }
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
