# Troubleshooting

> This page is maintained as public documentation source. Troubleshooting records must be sanitized before they are shared.

<!-- section: purpose -->
## Purpose

Troubleshooting CCL starts by identifying the failing layer: installation, startup, settings, authentication, gateway routing, endpoint compatibility, context pressure, permissions, MCP, tools, agents, plugins, sessions, remote automation, GitHub integration, documentation publishing, or RLL governance. Changing several layers at once usually hides the cause.

<!-- section: capabilities -->
## Capabilities

- Use `ccl doctor` for installation, updater, PATH, shell, package manager, sandbox, managed setting, alias, and ripgrep diagnostics.
- Use `/gateway status` and `/gateway doctor` for gateway credential, placeholder, reachability, auth-conflict, and shell-env shadowing failures.
- Use `/endpoint`, `/model`, `/priority`, `/effort`, `/cost`, `/usage`, and `/context` for model routing and context-window issues.
- Use `/permissions`, `/allowed-tools`, and command-specific permission prompts for tool-denial issues.
- Use `ccl mcp list`, `/mcp`, server config, auth status, and debug logs for MCP failures.
- Use `ccl agents --setting-sources user,project,local`, `/agents`, `/skills`, `/plugins`, and `/hooks` for extension visibility issues.
- Use remote precondition types for remote-session failures.
- Use docs validation, public audit, site build, rendered HTML checks, and coverage matrix checks for official-documentation failures.

<!-- section: operational-model -->
## Operational model

Collect evidence before changing configuration. A useful report contains the exact command, exit code, CCL version, install method, cwd trust state, relevant setting source, sanitized environment variable names, model/endpoint selection, and the last diagnostic output. Do not include tokens, private paths, full transcripts, or repository secrets.

Layer routing is practical:

- Startup failure: inspect install method, binary path, shell PATH, aliases, package manager, and updater state.
- Auth failure: separate gateway config, direct API-key config, OAuth state, and MCP server auth.
- Wrong model: inspect model selection precedence, endpoint pin, gateway config, classifier output, and debug route markers.
- Tool denied: inspect permission mode, allow/deny/ask rules, managed policy, and tool-specific validation.
- Extension missing: inspect setting sources, plugin-only policy, project trust, bare mode, and feature gates.
- Remote failure: inspect typed preconditions rather than retrying the launch.
- Docs failure: verify source Markdown, inventory, audits, build output, generated site, and hosted URL separately.

Gateway troubleshooting should distinguish runtime bugs from gateway service behavior. Cache-hit accounting, provider-side pricing, and gateway usage fields are only authoritative when returned by the active transport or gateway.

<!-- section: configuration -->
## Configuration and commands

- Environment health: `ccl doctor`.
- Gateway diagnosis: `/gateway doctor`.
- Auth status: `ccl auth status`, `/status`, `/login`, `/logout`.
- Model route: `/model`, `/endpoint`, `/priority`, `/effort`, `/gateway status`, debug file markers.
- Context pressure: `/context`, `/compact`, `/memory`, `/usage`.
- MCP: `ccl mcp list`, `/mcp`, `--mcp-config`, and MCP auth commands.
- Agent visibility: `ccl agents --setting-sources user,project,local`.
- Plugin/skill/hook visibility: `/plugins`, `/skills`, `/hooks`, `--plugin-dir`, `--bare`, and setting-source filters.
- GitHub/CI: `gh auth status -a`, `/install-github-app`, `/review`, `/pr-comments`, `/security-review`, and CI logs.
- Official docs: `node scripts/check-docs.mjs`, `bash scripts/audit-public-content.sh`, `node scripts/build-site.mjs`, and `node scripts/check-official-docs-coverage.mjs`.

## Symptom Routing

| Symptom | Start here | Evidence to collect |
| --- | --- | --- |
| CCL does not start | [Installation](installation.md) | `ccl --version`, invoked binary, shell PATH, install method, `ccl doctor`. |
| Login or gateway fails | [Authentication](authentication.md) | `/gateway doctor`, redacted env names, `gateway.json` presence, `GET /auth/me` result if available. |
| Wrong model or endpoint | [Gateway and Model Routing](model-routing.md) | requested model, endpoint pin, gateway config source, debug route markers, usage fields. |
| Tool is denied | [Permissions and Security](permissions-security.md) | permission mode, allow/deny/ask rules, managed policy, exact tool input. |
| MCP tool missing | [MCP Servers and Tools](mcp.md) | `ccl mcp list`, server scope, auth status, policy allow/deny result. |
| Agent or skill not visible | [Agents](agents.md), [Skills](skills.md) | setting sources, project trust, plugin-only policy, bare mode, definition path. |
| Remote session blocked | [Remote Sessions and Automation](remote-automation.md) | typed precondition, login state, remote env state, git remote, repository access. |
| GitHub setup fails | [GitHub and CI Workflows](github-ci.md) | `gh --version`, `gh auth status -a`, repo permissions, workflow/secret existence. |
| Docs page broken | [Public Documentation Publishing](public-docs.md) | local docs check, audit output, build log, rendered HTML path, hosted URL. |

## Known Limitations

These are honest, current-build limitations, not configuration errors:

- Background session subcommands are not available yet. `ccl ps`, `ccl logs`, `ccl attach`, `ccl kill`, and the `--bg`/`--background` flags exit with a clear "not available in this build yet" message. The background session registry itself works; only the ps/logs/attach/kill CLI surface is still a stub.
- The message actions menu (Shift+Up on a message) requires fullscreen mode. Outside fullscreen the menu keybindings are not wired, so the menu does not open; this is expected, not a broken terminal.
- The Debug agent's probe supports terminal (full) and web (minimal, requires a local browser automation dependency); desktop probing is not yet supported and returns a clear error.

## Escalation Checklist

Escalate only after collecting a small reproduction: exact command, CCL version, sanitized environment variable names, relevant settings source, expected behavior, actual behavior, exit code, and last diagnostic output. Include file paths only when they are repository-relative and safe to share.

<!-- section: source-evidence -->
## Source evidence

- `commands/doctor/doctor.tsx` and `utils/doctorDiagnostic.ts` implement doctor diagnostics and installation health checks.
- `commands/gateway/gateway.tsx`, `commands/gateway/gateway-helpers.ts`, and `services/gateway/gatewayDoctor.ts` implement gateway status, doctor findings, placeholder detection, env shadowing, and reachability probing.
- `utils/model/endpointCompat.ts`, `utils/model/model.ts`, `commands/model/model.tsx`, and `commands/endpoint/endpoint.tsx` implement route and endpoint diagnosis surfaces.
- `services/mcp/config.ts`, `commands/mcp/mcp.tsx`, and `services/mcp/auth.ts` provide MCP diagnosis surfaces.
- `utils/background/remote/remoteSession.ts` and `utils/background/remote/preconditions.ts` define remote-session failure categories.
- `commands/install-github-app/install-github-app.tsx`, `commands/review.ts`, and `commands/pr_comments/index.ts` provide GitHub diagnosis and review surfaces.
- `scripts/check-official-docs-coverage.mjs` and the public docs scripts in `margay-ai/scripts` provide official-documentation validation.

<!-- section: related -->
## Related pages

- [How CCL Works](how-ccl-works.md)
- [Installation and Updates](installation.md)
- [Authentication](authentication.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Remote Sessions and Automation](remote-automation.md)
- [GitHub and CI Workflows](github-ci.md)
