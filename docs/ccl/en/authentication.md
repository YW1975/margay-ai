# Authentication

> This page is maintained as public documentation source. Do not publish real tokens, invite codes, or private gateway URLs.

<!-- section: purpose -->
## Purpose

CCL can authenticate through several channels: Margay gateway credentials, direct API keys, Claude account OAuth, compatible provider credentials, and MCP server-specific OAuth flows. The correct channel depends on the selected model, deployment policy, and command surface. Authentication is intentionally separate from model routing so users can diagnose “am I logged in?” and “which endpoint will this model use?” as two different questions.

<!-- section: capabilities -->
## Capabilities

- Use `/gateway register`, `/gateway login`, `/gateway status`, `/gateway doctor`, and `/gateway logout` for Margay gateway credentials inside an interactive session.
- Use `ccl auth login`, `ccl auth status`, and `ccl auth logout` for Claude account authentication.
- Use `/login` and `/logout` as interactive command surfaces for account state.
- Use `ANTHROPIC_API_KEY` or `--api-key` for direct API-key sessions.
- Use `ANTHROPIC_BASE_URL` when a direct compatible endpoint must be selected explicitly.
- Use MCP authentication commands for external MCP servers that require OAuth or identity-provider login.
- Use `setup-token` for a long-lived token where the deployment supports that command.
- Diagnose mixed or stale state with `/gateway doctor`, `ccl auth status`, `/status`, `/doctor`, and model-routing diagnostics.

<!-- section: operational-model -->
## Operational model

Gateway environment configuration uses four fields together: `CCL_GATEWAY_URL`, `CCL_GATEWAY_KEY`, `CCL_GATEWAY_CREDENTIAL_TYPE`, and `CCL_GATEWAY_ISSUER`. The issuer must match the normalized gateway URL. Prefer `/gateway login` or `/gateway register` to create typed credentials; use `/gateway doctor` to diagnose quarantined or mismatched state. Never substitute an upstream provider key for a gateway credential.

Gateway login/registration verifies a gateway-owned credential, writes typed state to `~/.ccl/gateway.json`, and updates the current process. It does not write a new shell rc block. Clear or update all four stale exported fields before starting another process. Legacy compact JWT admission is a compatibility path, not an instruction to omit metadata.

Login verifies a gateway-owned credential with same-origin `GET /auth/me` before saving it. Registration posts an invite and optional user details to `/register`, accepts only the returned gateway JWT, and verifies it with that same gateway. A legacy `api_key` response is not accepted as registration credentials.

Use a complete admitted environment tuple or typed saved gateway state. A URL alone is not authentication. Untyped opaque credentials and issuer mismatches are quarantined before requests; inspect `/gateway doctor` and clear or correct the full tuple before logging in again.

Direct Claude authentication is separate. `ANTHROPIC_API_KEY`, OAuth tokens, and gateway credentials can all exist, but route selection depends on the selected model and provider compatibility. The gateway doctor reports both channel states so users can see whether Claude-direct and gateway paths are configured independently.

<!-- section: configuration -->
## Configuration and commands

- Gateway registration: `/gateway register [url] <invite-code> [username] [email] [phone]`. If the URL is omitted, CCL uses the default gateway URL.
- Gateway login: `/gateway login <url> <key>`.
- Gateway status: `/gateway status` or `/gateway`.
- Gateway diagnosis: `/gateway doctor`.
- Gateway logout: `/gateway logout`.
- Claude account CLI auth: `ccl auth login`, `ccl auth status`, `ccl auth logout`.
- Direct API-key session: `ANTHROPIC_API_KEY=<key> ccl ...` or `ccl --api-key <key> ...`.
- Never commit real API keys, gateway tokens, OAuth tokens, or invite codes to docs, settings, examples, or screenshots.

<!-- section: source-evidence -->
## Source evidence

- `bootstrap/gatewayConfig.ts` defines gateway config loading, `gateway.json`, explicit environment override behavior, and default gateway URL resolution.
- `commands/gateway/gateway.tsx` implements `/gateway status`, `login`, `logout`, `doctor`, and `register`.
- `commands/gateway/gateway-helpers.ts` — Login verifies a gateway-owned credential with same-origin `GET /auth/me` before saving it. Registration posts an invite and optional user details to `/register`, accepts only the returned gateway JWT, and verifies it with that same gateway. A legacy `api_key` response is not accepted as registration credentials.
- `services/gateway/gatewayDoctor.ts` detects placeholder values, stale environment shadowing, missing gateway config, and API-key/OAuth conflicts.
- `main.tsx` defines `auth login/status/logout`, `setup-token`, `--api-key`, `--base-url`, `--bare`, and authentication initialization flow.
- `services/mcp/auth.ts` and `commands/mcp/mcp.tsx` implement MCP-related authentication surfaces.

<!-- section: related -->
## Related pages

- [Configuration and Settings](configuration.md)
- [Gateway and Model Routing](model-routing.md)
- [Environment Variables](env-vars.md)
- [MCP Servers and Tools](mcp.md)
- [Troubleshooting](troubleshooting.md)
