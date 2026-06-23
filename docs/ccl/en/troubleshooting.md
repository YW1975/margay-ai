# Troubleshooting

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Troubleshooting CCL starts by identifying the failing layer: installation, authentication, gateway routing, MCP, permissions, tools, agents, session state, remote control, or governance gates.

<!-- section: capabilities -->
## Capabilities

- Use `ccl doctor` for environment health.
- Use gateway and endpoint commands for routing failures.
- Use MCP diagnostics and permission prompts to isolate external tool failures.

<!-- section: operational-model -->
## Operational model

- Prefer layer-specific evidence over broad retries. Capture exact commands, exit codes, logs, and build versions before changing configuration.

<!-- section: configuration -->
## Configuration and commands

- Public issue records should separate CCL runtime issues from gateway or service issues, and should avoid private hostnames, paths, or secrets.

<!-- section: source-evidence -->
## Source evidence

- `commands/doctor`
- `services/gateway/gatewayDoctor.ts`
- `services/api/errors.ts`
- `docs/ccl0622-runtime-issue-record.md`

<!-- section: related -->
## Related pages

- [Installation and Updates](installation.md)
- [Authentication](authentication.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Remote Sessions and Automation](remote-automation.md)
