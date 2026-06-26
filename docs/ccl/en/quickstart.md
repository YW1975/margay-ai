# Quickstart

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Install CCL, configure the gateway or compatible model provider, open a project directory, and start with either an interactive session or a print-mode request.

<!-- section: capabilities -->
## Capabilities

- Run `ccl` for an interactive session.
- Run `ccl -p "summarize this repo"` for non-interactive output.
- Run `ccl doctor` when authentication, updater, or environment health is unclear.

<!-- section: operational-model -->
## Operational model

- CCL loads settings, discovers project context, prepares tools, then routes model requests through the configured provider path. Permission prompts protect file edits, shell commands, MCP tools, and remote actions.

<!-- section: configuration -->
## Configuration and commands

- Use `ccl login` or provider environment variables as appropriate for the deployment.
- Use `ccl mcp` to add external tool servers after the base session works.
- Use `ccl agents` to confirm built-in and custom agents are visible.

## A Minimal First Run

Use this path when you want to confirm that the binary, credentials, model route, and basic tool policy are working.
1. Open a project directory.
2. Run `ccl --help` to confirm the binary resolves.
3. Run `ccl doctor` if setup, updater health, or workspace trust is unclear.
4. Configure credentials through the deployment-approved path: `ccl login`, environment variables, or `/gateway login URL API_KEY` in an interactive session.
5. Run `ccl -p "Summarize this repository in five bullets." --allowedTools ""` when you need a non-mutating smoke test.
6. Run `ccl` for an interactive session after the non-interactive path works.

## How To Know It Worked

A healthy first run has three signals: the CLI starts without argument parsing errors, the model request reaches the configured provider or gateway, and the response arrives without asking for unexpected destructive permissions. If the response fails before model contact, check Installation and Environment Variables. If the response reaches a provider but fails authentication, check Authentication and Gateway and Model Routing. If a tool prompt appears unexpectedly, check Permissions and Security.

## Common First-Run Problems

| Symptom | Likely cause | Next step |
| --- | --- | --- |
| `ccl` not found | Binary is not installed or shell path is stale | Run the install command for your package manager, then restart the shell or reload PATH. |
| Gateway says not configured | No `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY` and no usable gateway file | Use `/gateway login URL API_KEY` or set both environment variables. |
| Provider receives the wrong URL | Routing-critical variables were mixed up | Use `CCL_GATEWAY_*` for Margay gateway routing; do not use compatibility SDK variables for gateway credentials. |
| Slash command unavailable in print mode | The command is interactive-only | Use the top-level CLI command or run an interactive session. |

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`
- `commands/login/login.tsx`
- `commands/mcp/mcp.tsx`
- `tools/AgentTool/builtInAgents.ts`

<!-- section: related -->
## Related pages

- [Installation and Updates](installation.md)
- [Authentication](authentication.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Agents](agents.md)
