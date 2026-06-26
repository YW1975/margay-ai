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

## Symptom Routing

| Symptom | Start here | Evidence to collect |
| --- | --- | --- |
| `ccl` does not start | [Installation](installation.md) | `ccl --version`, shell PATH, install method. |
| Login or gateway fails | [Authentication](authentication.md) | `/gateway doctor`, redacted env names, gateway URL health. |
| Wrong model or provider | [Gateway and Model Routing](model-routing.md) | requested model, endpoint, usage fields, route config. |
| Command missing | [Commands](commands.md) | Interactive `/` list, build version, feature flags or plugin state. |
| CLI flag rejected | [CLI Reference](cli-reference.md) | `ccl --help`, exact command and flags. |
| MCP tool missing | [MCP Servers and Tools](mcp.md) | `ccl mcp list`, server config, auth status. |
| Agent not visible | [Agents](agents.md) | `ccl agents --setting-sources user,project,local`, agent definition path. |
| Docs page broken | [Public Documentation Publishing](public-docs.md) | local `node scripts/check-ccl-docs.mjs`, public URL, build log. |

## Gateway Diagnosis

Run `/gateway doctor` before changing multiple credentials. It checks the effective gateway, file configuration, shell variables, OAuth/API-key state, and reachability through `GET /auth/me` when possible. If only one of `CCL_GATEWAY_URL` or `CCL_GATEWAY_KEY` is set, treat it as a broken atomic pair and set both or clear both.

## Agent Diagnosis

Run `ccl agents --setting-sources user,project,local` to check visibility. If an agent requires MCP servers, confirm that the matching servers are configured and authenticated. For built-ins, remember that Explore and Plan are available at runtime, while some other agents may still depend on feature flags or entrypoint rules.

## When To Escalate

Escalate with a small reproduction: exact command, sanitized environment variable names, build version, expected behavior, actual behavior, and the last relevant diagnostic output. Do not include API keys, raw private paths, or full transcripts containing sensitive project content.

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
