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

<!-- section: operational-model -->
## Operational model

- `bootstrap/envSync.ts` maps selected non-routing `CCL_*` variables to compatibility variables only when the compatibility variable is not already set. It explicitly excludes `CCL_BASE_URL` and `CCL_API_KEY` from sync to avoid accidental provider routing changes.
- `bootstrap/gatewayConfig.ts` loads `~/.ccl/gateway.json` only when neither `CCL_GATEWAY_URL` nor `CCL_GATEWAY_KEY` is present. If either shell variable is present, the shell environment is authoritative as an atomic pair.

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
| `CCL_CUSTOM_HEADERS` | Extra request headers | Treat as sensitive if it carries auth or routing metadata. |
| `CCL_PERMISSIONS_TEMPLATE` | Permission defaults | Use with caution because it affects tool prompting behavior. |

## Troubleshooting Variables

If `/gateway doctor` says the file and shell disagree, decide which source should win and remove the other. If a provider SDK appears to use an unexpected base URL, check whether compatibility variables were set outside CCL. If a variable appears ignored, confirm whether it is read at process startup and restart the shell/session.

<!-- section: source-evidence -->
## Source evidence

- `bootstrap/envSync.ts`
- `bootstrap/gatewayConfig.ts`
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
