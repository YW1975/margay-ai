# Environment Variables

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL reads CCL-prefixed environment variables for model selection, logging, permissions, gateway setup, custom headers, and compatibility behavior. Routing credentials use CCL-specific names and are not blindly copied into provider SDK variables.

<!-- section: capabilities -->
## Capabilities

- Use `CCL_MODEL` and model default variables to select the main or fast model for compatible deployments.
- Use `CCL_GATEWAY_URL` and `CCL_GATEWAY_KEY` for Margay gateway routing; these variables are authoritative over `~/.ccl/gateway.json` when set.
- Use `CCL_LOG`, `CCL_BETAS`, `CCL_CUSTOM_HEADERS`, and `CCL_PERMISSIONS_TEMPLATE` for diagnostics, beta flags, headers, and permission defaults.
- Use `CCL_QUIET_DUAL_CHANNEL=1` to silence the expected OAuth-plus-gateway informational note when the deployment intentionally uses Claude through OAuth and third-party models through the gateway.

<!-- section: operational-model -->
## Operational model

- `bootstrap/envSync.ts` maps selected non-routing `CCL_*` variables to compatibility variables only when the compatibility variable is not already set. It explicitly excludes `CCL_BASE_URL` and `CCL_API_KEY` from sync to avoid accidental provider routing changes.
- `bootstrap/gatewayConfig.ts` loads `~/.ccl/gateway.json` only when neither `CCL_GATEWAY_URL` nor `CCL_GATEWAY_KEY` is present. If either shell variable is present, the shell environment is authoritative as an atomic pair.
- In dual-channel mode, Claude model calls use the local Claude auth channel when OAuth or first-party API-key auth is available, while non-Claude models such as DeepSeek or Kimi use the configured gateway. Do not put gateway credentials in provider SDK variables for this mode.

<!-- section: configuration -->
## Configuration and commands

- Gateway commands write and clear `CCL_GATEWAY_URL` and `CCL_GATEWAY_KEY` as part of `/gateway login`, `/gateway register`, and `/gateway logout`.
- Compatibility literals such as `ANTHROPIC_*` may appear in this page only as environment-variable names required by the underlying SDK compatibility layer, not as vendor branding.
- CCL does not currently document provider cache-hit accounting here; cache-read/cache-write metrics are deferred until the gateway exposes verified usage fields.

## Where To Set Variables

| Environment | Example | Use when |
| --- | --- | --- |
| POSIX shell | `export CCL_GATEWAY_URL=https://gateway.example.com` | You need the value for the current shell and child processes. |
| One command | `CCL_LOG=debug ccl doctor` | You need a temporary diagnostic override. |
| Local gateway file | `~/.ccl/gateway.json` | You used `/gateway login` and want durable local gateway credentials. |
| Managed settings | organization-managed settings | The team needs policy-controlled defaults. |

## Precedence And Routing Safety

`CCL_GATEWAY_URL` and `CCL_GATEWAY_KEY` are an atomic pair. If either is present in the shell environment, CCL does not load `~/.ccl/gateway.json`; the shell environment is authoritative. This avoids combining an environment URL with a stale file key.

`bootstrap/envSync.ts` intentionally syncs only selected non-routing `CCL_*` variables to compatibility SDK variables. It does not sync `CCL_BASE_URL` or `CCL_API_KEY` into provider routing variables.

## Common Variables

| Variable | Purpose | Notes |
| --- | --- | --- |
| `CCL_GATEWAY_URL` | Gateway base URL | Use with `CCL_GATEWAY_KEY`; shell value overrides gateway file loading. |
| `CCL_GATEWAY_KEY` | Gateway API key | Use with `CCL_GATEWAY_URL`; keep out of public docs and commits. |
| `CCL_MODEL` | Model selection | Synced to the compatibility model variable only if that target is unset. |
| `CCL_SMALL_FAST_MODEL` | Fast/small model selection | Useful for deployments that split large and cheap tasks. |
| `CCL_LOG` | Logging verbosity | Use temporary command-level overrides for diagnostics. |
| `CCL_ROUTING_PRIORITY` | Smart routing priority | Use `cost` or `quality` when the gateway classifier returns a routing table. |
| `CCL_AUTO_FALLBACK_MODEL` | Auto/smart fallback model | Used when the gateway classifier is unavailable and the selected model is still `auto` or `smart`. |
| `CCL_QUIET_DUAL_CHANNEL` | Startup note control | Set to `1` to hide the informational dual-channel note. |
| `CCL_CUSTOM_HEADERS` | Extra request headers | Treat as sensitive if it carries auth or routing metadata. |
| `CCL_PERMISSIONS_TEMPLATE` | Permission defaults | Use with caution because it affects tool prompting behavior. |

## Sync And Non-Sync Rules

| CCL variable family | Compatibility target | Routing risk |
| --- | --- | --- |
| `CCL_MODEL`, `CCL_SMALL_FAST_MODEL` | Model selection compatibility variables | Safe to sync when the target variable is unset. |
| `CCL_LOG`, `CCL_BETAS`, `CCL_CUSTOM_HEADERS` | Diagnostic/header compatibility variables | Safe to sync, but headers may contain sensitive metadata. |
| `CCL_PERMISSIONS_TEMPLATE` | Permission-template compatibility variable | Safe to sync, but it changes tool prompting defaults. |
| `CCL_DEFAULT_*_MODEL*`, `CCL_CUSTOM_MODEL_OPTION*` | Model menu customization variables | Safe to sync for model presentation and selection. |
| `CCL_BASE_URL`, `CCL_API_KEY` | No automatic sync | Must not be copied into provider routing variables because that can hijack Claude-channel calls or conflict with account auth. |
| `CCL_GATEWAY_URL`, `CCL_GATEWAY_KEY` | No provider SDK sync | Gateway routing stays in the CCL namespace or gateway file. |

## Dual-Read Variables (CCL Name First, Legacy Fallback)

For a set of behavior toggles, CCL reads the `CCL_*` name first and falls back to the legacy compatibility name only when the `CCL_*` name is unset. Set the `CCL_*` form in new deployments; existing scripts using the legacy names keep working.

| CCL variable (wins when set) | Legacy fallback | Purpose |
| --- | --- | --- |
| `CCL_SIMPLE` | `CLAUDE_CODE_SIMPLE` | Bare/minimal runtime mode (same effect as `--bare`). |
| `CCL_MAX_OUTPUT_TOKENS` | `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | Explicit max-output-token override; when set, the automatic output-token escalation is skipped. |
| `CCL_REMOTE_MEMORY_DIR` | `CLAUDE_CODE_REMOTE_MEMORY_DIR` | Overrides the base directory for memory files in remote/containerized runs. |
| `CCL_SKIP_PROMPT_HISTORY` | `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | Skips writing prompts to the command history (used by spawned verification sessions to avoid polluting real history). |
| `CCL_DISABLE_CLAUDE_MDS` | `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | Disables loading of project/user memory instruction files. |

`CCL_CONFIG_DIR` follows the same idea with an OR chain: the config home resolves to `CCL_CONFIG_DIR`, then `CLAUDE_CONFIG_DIR`, then the home directory default. The first non-empty value wins.

## Operational Variables

| Variable | Use |
| --- | --- |
| `CCL_PRINT_MAX_TURNS` | Default max turns for print mode when `--max-turns` is not provided. |
| `CCL_ROUTING_PRIORITY` | Gateway smart-routing preference, normally `cost` or `quality`. |
| `CCL_GATEWAY_MAIN_MODEL` | Default main model when gateway mode selects a gateway-backed model and no explicit model is set. |
| `CCL_GATEWAY_SMALL_FAST_MODEL` | Default small/fast model in gateway mode. |
| `CCL_HOOK_MAX_OUTPUT_BYTES` | Raises or lowers retained hook output before truncation. |
| `CCL_JSONL_HEAP_HEADROOM_MB` | Overrides JSONL heap headroom for large structured streams. |
| `CCL_AUTO_HEAPDUMP_OFF` | Disables automatic heap dump monitoring. |
| `CCL_AUTO_HEAPDUMP_HIGH_MB`, `CCL_AUTO_HEAPDUMP_CRITICAL_MB` | Tune high and critical heap dump thresholds. |
| `CCL_CONFIG_DIR` | Isolates CCL configuration from the default config home; wins over the legacy `CLAUDE_CONFIG_DIR`, which wins over the home-directory default. |

## Troubleshooting Variables

If `/gateway doctor` says the file and shell disagree, decide which source should win and remove the other. If a provider SDK appears to use an unexpected base URL, check whether compatibility variables were set outside CCL. If a variable appears ignored, confirm whether it is read at process startup and restart the shell/session.

When using OAuth plus the Margay gateway, avoid setting provider SDK API-key or base-URL variables to gateway values. That can create an auth-conflict warning or cause provider SDK calls to use the wrong URL. Keep gateway state in `CCL_GATEWAY_*` or `~/.ccl/gateway.json`; use `CCL_QUIET_DUAL_CHANNEL=1` only to silence the expected informational note, not to hide a real credential conflict.

<!-- section: source-evidence -->
## Source evidence

- `bootstrap/envSync.ts`
- `bootstrap/gatewayConfig.ts`
- `utils/env.ts` (config-dir resolution chain)
- `utils/envUtils.ts`, `history.ts`, `memdir/paths.ts`, `tools/AgentTool/agentMemory.ts`, `context.ts`, `query.ts` (dual-read call sites)
- `commands/gateway/gateway.tsx`
- `commands/gateway/gateway-helpers.ts`
- `commands/endpoint/endpoint.tsx`
- `commands/model/model.tsx`
- `package.json`

<!-- section: related -->
## Related pages

- [Configuration and Settings](configuration.md)
- [Authentication](authentication.md)
- [Gateway and Model Routing](model-routing.md)
- [Troubleshooting](troubleshooting.md)
