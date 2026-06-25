# Troubleshooting

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Troubleshooting CCL starts by identifying the failing layer: installation, authentication, gateway routing, MCP, permissions, tools, agents, session state, remote control, or governance gates.

<!-- section: capabilities -->
## Capabilities

- Use `ccl doctor` for environment health.
- Use `/gateway status` and `/gateway doctor` for gateway credential, reachability, placeholder, and shell-env shadowing failures.
- Use `/endpoint status` for endpoint pinning and context-fit diagnostics when endpoint registries are configured.
- Use `/cost`, `/context`, and `/usage` to separate token/cost visibility from context-window pressure and plan-limit state where available.
- Use MCP diagnostics, permission prompts, and remote eligibility errors to isolate external tool or remote-session failures.

<!-- section: operational-model -->
## Operational model

- Prefer layer-specific evidence over broad retries. Capture exact commands, exit codes, logs, and build versions before changing configuration.
- Gateway troubleshooting should distinguish CCL runtime issues from gateway service issues. Cache-hit accounting and provider usage fields belong to gateway evidence until CCL receives verified fields.
- For public documentation failures, verify the generator source, generated Markdown, public repository sync, audit output, site build, and hosted destination separately.

<!-- section: configuration -->
## Configuration and commands

- Public issue records should separate CCL runtime issues from gateway or service issues, and should avoid private hostnames, paths, or secrets.
- For stale gateway configuration, compare shell `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY` with `~/.ccl/gateway.json`; shell values intentionally win when present.
- Remote-session failures should record the specific precondition type, such as policy blocked, not logged in, no remote environment, not in git repo, no git remote, or GitHub app missing.

<!-- section: source-evidence -->
## Source evidence

- `commands/doctor`
- `commands/gateway/gateway.tsx`
- `commands/endpoint/endpoint.tsx`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `services/gateway/gatewayDoctor.ts`
- `services/api/errors.ts`
- `utils/background/remote/remoteSession.ts`
- `docs/ccl0622-runtime-issue-record.md`

<!-- section: related -->
## Related pages

- [Installation and Updates](installation.md)
- [Authentication](authentication.md)
- [Environment Variables](env-vars.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Remote Sessions and Automation](remote-automation.md)
- [Public Documentation Publishing](public-docs.md)
