# CLI Reference

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

The `ccl` binary exposes the interactive entry point, print mode, MCP management, authentication, plugin management, agents, workflow automation, updater commands, and installation diagnostics.

<!-- section: capabilities -->
## Capabilities

- Current public top-level commands include `agents`, `auth`, `doctor`, `install`, `mcp`, `plugin` or `plugins`, `setup-token`, `update` or `upgrade`, and `workflow`.
- Interactive slash commands are documented separately in [Commands](commands.md), including cost, context, usage, gateway, endpoint, and remote-control surfaces when available.
- Internal-only commands should not be documented as stable public automation APIs.

<!-- section: operational-model -->
## Operational model

- The CLI reference describes stable user-facing behavior. When source help marks a command as internal or deployment-specific, document it as operational context rather than a public contract.

<!-- section: configuration -->
## Configuration and commands

- Run `ccl --help` and `ccl <command> --help` in the installed build for the exact command surface available in that build.

## Terminal Command Groups

| Command group | Examples | When to use |
| --- | --- | --- |
| Session entry | `ccl [prompt]`, `ccl -p "..."`, `ccl --output-format json` | Start an interactive session or run a scriptable one-shot prompt. |
| MCP | `ccl mcp` | Configure and manage external tool servers. |
| Authentication | `ccl auth`, `ccl setup-token` | Inspect or change account authentication state. |
| Plugins | `ccl plugin`, `ccl plugins` | Manage plugin supply-chain inputs and installed extension bundles. |
| Agents | `ccl agents --setting-sources user,project,local` | List active agents and debug source visibility. |
| Workflows | `ccl workflow` | Run, validate, and manage workflow automation. |
| Operations | `ccl doctor`, `ccl update`, `ccl upgrade`, `ccl install` | Check health or update/install builds. |

## Print Mode

Use print mode for automation when the prompt and outputs should be explicit. Prefer an empty allowed-tools list for read-only smoke tests, and request JSON or stream JSON only when the caller is prepared to parse those formats.

Example: `ccl -p "List the top-level directories and their purpose." --allowedTools ""`

Important print-mode controls:

| Option | Scope | Notes |
| --- | --- | --- |
| `-p`, `--print` | Non-interactive execution | Runs one prompt and exits; use only in trusted directories because the workspace trust prompt is skipped. |
| `--output-format text` | Human-readable output | Default print-mode output. |
| `--output-format json` | Scripted output | Emits one final JSON result; callers should handle non-zero exits separately. |
| `--output-format stream-json` | Streaming integrations | Emits incremental events and pairs naturally with `--input-format stream-json`. |
| `--include-partial-messages` | Streaming output | Includes partial assistant chunks in stream JSON. |
| `--include-hook-events` | Streaming diagnostics | Includes hook lifecycle events in stream JSON. |
| `--max-turns` | Agent loop bound | Limits non-interactive turns; `0` means unlimited. |
| `--max-budget-usd` | Cost guard | Stops once the run would exceed the budget. |
| `--no-session-persistence` | Session storage | Prevents saving a resumable transcript. |

## Session Scope And Safety

| Option family | What it changes | Safety note |
| --- | --- | --- |
| `--cwd`, `--add-dir` | Working directory and extra readable/editable roots | Keep the scope as narrow as the task allows. |
| `--allowedTools`, `--disallowedTools`, `--tools` | Tool availability | Prefer explicit allowlists for automation. Use `--tools ""` for read-only smoke tests. |
| `--permission-mode` | Permission prompting behavior | `bypassPermissions` and skip-permission flags are for isolated sandboxes, not normal project work. |
| `--mcp-config`, `--strict-mcp-config` | MCP server inputs | Health checks and MCP commands can spawn stdio servers from trusted configuration. |
| `--plugin-dir`, `--agents`, `--agent` | Extension and delegation inputs | Treat plugins and inline agents as executable policy inputs. |
| `--settings`, `--setting-sources` | Settings source selection | Use source filters when debugging user/project/local setting conflicts. |
| `--bare` | Minimal runtime mode | Skips hooks, plugin sync, auto-memory, keychain reads, and auto-discovery; pass all needed context explicitly. |

## Top-Level Command Reference

| Command | What it does | When to use | Common issue |
| --- | --- | --- | --- |
| `ccl [prompt]` | Starts an interactive session, optionally seeded with a prompt. | Normal human-in-the-loop work. | If a prompt starts with a slash command, command handling runs inside the session. |
| `ccl -p "..."` | Runs print mode and exits. | Scripts, CI, or smoke tests. | Interactive-only commands and prompts may not behave the same as the REPL. |
| `ccl mcp` | Configures and manages MCP servers. | External tools need to be added, inspected, or removed. | MCP checks can spawn stdio servers; use trusted directories. |
| `ccl auth` | Manages authentication state. | Account login, inspection, or logout. | Gateway credentials are separate from account auth. |
| `ccl plugin` / `ccl plugins` | Manages plugin bundles and marketplaces. | Installing or auditing extension bundles. | Plugins are supply-chain inputs; validate manifests and sources. |
| `ccl agents` | Lists configured active agents. | Debugging built-in/custom/plugin agent visibility. | Use `--setting-sources` to control which settings are loaded. |
| `ccl workflow` | Runs and manages workflows. | Repeatable multi-step automation needs a CLI entry point. | Validate workflow specs and permissions before relying on unattended runs. |
| `ccl setup-token` | Sets up a long-lived authentication token where supported. | A deployment needs subscription-backed token setup. | Requires the matching account capability. |
| `ccl doctor` | Checks runtime/updater health. | Setup, update, or workspace-health problems. | It is diagnostic; follow the reported fix rather than rerunning blindly. |
| `ccl update` / `ccl upgrade` | Checks for and installs updates. | Keeping a local binary current. | Version policy may differ by installation channel. |
| `ccl install [target]` | Installs a native build. | Initial install or explicit target install. | Use `--force` only when reinstalling intentionally. |

## Help Output As Contract Boundary

`ccl --help` is the first source for the terminal command surface of the installed build. Source files may contain internal, feature-gated, compatibility, or deployment-only commands that should not be promised as public automation APIs. When a command is absent from `ccl --help`, document it only if the page also states the condition that makes it available.

## CCL Compatibility

<a id="ccl-compatibility"></a>

Some command names, environment variable names, and source-level identifiers remain for SDK or wire-compatibility reasons. Public docs should explain the CCL behavior users see, and mention compatibility literals only when they are required to configure or debug the current build.

## Stability Notes

Commands marked internal, hidden, or deployment-specific in the source should not be treated as stable public automation APIs. Current examples include server, SSH, internal URL openers, bridge helpers, shell completion, and auto-mode debugging surfaces when they are hidden from `ccl --help`. If a command is available only behind a feature flag or internal build condition, document the condition or omit the command from user-facing workflows.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`
- `dist/cli.js --help`

<!-- section: related -->
## Related pages

- [Interactive Commands](commands.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Plugins](plugins.md)
- [Agents](agents.md)
- [Remote Sessions and Automation](remote-automation.md)
