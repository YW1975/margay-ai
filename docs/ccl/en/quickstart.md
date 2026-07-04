# Quickstart

> This page is maintained as public documentation source. It describes the shortest safe path from a shell to a working CCL session.

<!-- section: purpose -->
## Purpose

Use Quickstart to verify five things in order: the `ccl` binary resolves, the installation is healthy enough to run, credentials or gateway routing are configured, print mode can complete a non-mutating request, and the interactive session can start in the intended project directory.

<!-- section: capabilities -->
## Capabilities

- Confirm the installed build with `ccl --version` and the available command surface with `ccl --help`.
- Run `ccl doctor` before changing settings when PATH, updater health, workspace trust, or shell integration is unclear.
- Configure credentials through the deployment-approved path: account login, gateway environment variables, or an interactive `/gateway login URL TOKEN`.
- Run `ccl -p "..." --allowedTools ""` for a non-mutating smoke test before enabling broader tool access.
- Move from print mode to `ccl` interactive mode after route and response behavior are known.
- Use `--debug-file <path>` when first-run behavior needs exact evidence for authentication, model route, or tool prompts.

<!-- section: operational-model -->
## Operational model

Quickstart should not begin with broad permissions. A first run only needs the binary, a trusted working directory, credentials, a route to the configured model path, and a prompt that does not require file edits or shell commands. Tool access can be expanded after the user has evidence that startup, auth, and routing are correct.

Print mode and interactive mode share much of the runtime, but they do not expose exactly the same surface. Print mode is for deterministic single-shot automation and supports `text`, `json`, and `stream-json` output. Interactive mode is the normal human-in-the-loop surface for slash commands, tool approval, session navigation, and context inspection.

If the first model request fails, classify the layer before changing anything: binary resolution, doctor health, authentication, gateway configuration, endpoint/model compatibility, permission policy, or project context. The Troubleshooting page has the layer-routed checklist.

<!-- section: configuration -->
## Configuration and commands

Minimal first run:

1. Open the project directory you intend CCL to inspect.
2. Run `ccl --version`; confirm it prints the expected CCL version.
3. Run `ccl --help`; confirm `-p, --print`, `--output-format`, `--model`, `--settings`, `--mcp-config`, and permission flags are available in your build.
4. Run `ccl doctor` if installation, updater, PATH, package-manager, shell, sandbox, or workspace trust state is unclear.
5. Configure credentials through your approved path. Gateway users should prefer `CCL_GATEWAY_URL` plus `CCL_GATEWAY_KEY`, or save a gateway file through `/gateway login URL TOKEN`.
6. Run `ccl -p "Summarize this repository in five bullets." --allowedTools ""` for a non-mutating smoke test.
7. If route evidence is needed, rerun with `--debug-file <path>` and inspect route markers, model selection, and gateway status.
8. Run `ccl` for the interactive session after the non-interactive smoke test works.

Common first-run symptoms:

| Symptom | Likely layer | Next step |
| --- | --- | --- |
| `ccl` not found | Binary or shell PATH | Read [Installation and Updates](installation.md), reinstall or reload the shell, then rerun `ccl --version`. |
| `ccl --help` works but model calls fail | Authentication or gateway route | Read [Authentication](authentication.md) and [Gateway and Model Routing](model-routing.md). |
| Gateway says not configured | Missing gateway env/file | Set both `CCL_GATEWAY_URL` and `CCL_GATEWAY_KEY`, or use `/gateway login URL TOKEN`. |
| Wrong model or endpoint | Route precedence | Check `/model`, `/endpoint`, `/gateway status`, debug route markers, and settings sources. |
| Tool prompt appears in smoke test | Prompt or tool policy | Keep `--allowedTools ""` for non-mutating smoke tests, then expand permissions deliberately. |
| Slash command unavailable in print mode | Surface mismatch | Use interactive `ccl`, or use the matching top-level CLI command when one exists. |

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` defines `ccl [prompt]`, `-p/--print`, `--output-format`, debug flags, `--allowedTools`, `--tools`, `--disallowedTools`, `--permission-mode`, `--model`, `--settings`, `--mcp-config`, and `--plugin-dir`.
- `main.tsx` skips subcommand registration in ordinary print mode, so slash-command and subcommand behavior must be documented separately from one-shot prompt execution.
- `commands/doctor/doctor.tsx` routes `ccl doctor` to the Doctor screen for installation and runtime diagnostics.
- `bootstrap/gatewayConfig.ts` and `services/gateway/gatewayDoctor.ts` provide gateway configuration and diagnosis behavior referenced by first-run troubleshooting.
- `commands/model/model.tsx`, `commands/endpoint/endpoint.tsx`, and `utils/model/model.ts` provide model and endpoint inspection or selection behavior.

<!-- section: related -->
## Related pages

- [Installation and Updates](installation.md)
- [Authentication](authentication.md)
- [Gateway and Model Routing](model-routing.md)
- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Troubleshooting](troubleshooting.md)
