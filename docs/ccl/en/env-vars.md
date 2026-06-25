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
