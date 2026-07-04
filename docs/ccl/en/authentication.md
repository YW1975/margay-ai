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

Gateway authentication stores a normalized gateway URL and key in `gateway.json` under the CCL config home. On startup, gateway bootstrap loads that file into `CCL_GATEWAY_URL` and `CCL_GATEWAY_KEY` unless a complete explicit shell environment override is already present. This prevents mixed-source URL/key pairs while preserving deliberate shell overrides.

Gateway login validates credentials with `GET /auth/me` when validation is enabled. Gateway registration posts an invite code and optional user details to `/register`, then persists whichever credential the gateway returns: modern JWT-style `token` or older compatible `api_key`.

Gateway URL precedence is explicit environment, then `gateway.json`, then the built-in default gateway URL. A URL alone is not authentication; a key is still required. If shell `CCL_GATEWAY_URL` or `CCL_GATEWAY_KEY` shadows `gateway.json`, `/gateway doctor` reports the conflict and prints an unset/login fix.

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
- `commands/gateway/gateway-helpers.ts` validates gateway login with `GET /auth/me`, persists credentials, parses registration arguments, and handles modern/legacy gateway credential fields.
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
