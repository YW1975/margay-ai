# Authentication

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL supports login, logout, OAuth refresh, long-lived token setup for compatible deployments, and MCP authentication flows.

<!-- section: capabilities -->
## Capabilities

- Run `ccl login` and `ccl logout` for account state.
- Use `ccl auth` for authentication management surfaces.
- Use `ccl mcp auth` and related MCP flows for external server authorization.
- Use `/gateway login`, `/gateway register`, `/gateway status`, `/gateway doctor`, and `/gateway logout` inside interactive sessions for Margay gateway credentials.

<!-- section: operational-model -->
## Operational model

- Authentication state is separate from model routing. A deployment may use direct compatible API keys, OAuth-backed sessions, or gateway credentials depending on policy.
- Gateway authentication validates credentials with `GET /auth/me` when possible, saves the normalized URL and key to `~/.ccl/gateway.json`, and also updates the current process environment.

<!-- section: configuration -->
## Configuration and commands

- Keep secrets out of public docs and repositories. Store provider credentials in environment variables, secure local settings, or managed secret stores.
- When shell `CCL_GATEWAY_URL` or `CCL_GATEWAY_KEY` values differ from `~/.ccl/gateway.json`, the shell values win; use `/gateway doctor` to detect and explain that shadowing.

<!-- section: source-evidence -->
## Source evidence

- `commands/login/login.tsx`
- `commands/logout/logout.tsx`
- `commands/mcp/mcp.tsx`
- `services/oauth`
- `services/mcp/auth.ts`
- `commands/gateway/gateway.tsx`
- `commands/gateway/gateway-helpers.ts`
- `services/gateway/gatewayDoctor.ts`

<!-- section: related -->
## Related pages

- [Configuration and Settings](configuration.md)
- [Environment Variables](env-vars.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Permissions and Security](permissions-security.md)
