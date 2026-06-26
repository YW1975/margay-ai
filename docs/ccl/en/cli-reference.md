# CLI Reference

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

The `ccl` binary exposes the interactive entry point, print mode, MCP management, server and remote connection commands, authentication, plugin management, agents, automation, updater commands, and shell completion.

<!-- section: capabilities -->
## Capabilities

- Top-level commands include `mcp`, `server`, `ssh`, `open`, `auth`, `plugin`, `agents`, `auto-mode`, `doctor`, `update`, `install`, and `completion`.
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
| MCP | `ccl mcp list`, `ccl mcp add`, `ccl mcp get`, `ccl mcp remove`, `ccl mcp serve` | Manage external tool servers or run the CCL MCP server. |
| Remote/session server | `ccl server`, `ccl open`, `ccl ssh`, `ccl remote-control`, `ccl assistant` | Run detached sessions, connect to an internal URL, bridge remote control, or attach to a bridge session. |
| Authentication | `ccl auth login`, `ccl auth status`, `ccl auth logout`, `ccl login`, `ccl logout`, `ccl setup-token` | Inspect or change account authentication state. |
| Plugins | `ccl plugin validate`, `list`, `install`, `enable`, `disable`, `marketplace` | Manage plugin supply-chain inputs and installed extension bundles. |
| Agents | `ccl agents --setting-sources user,project,local` | List active agents and debug source visibility. |
| Operations | `ccl doctor`, `ccl update`, `ccl install`, `ccl completion` | Check health, update/install, or generate shell completion. |

## Print Mode

Use print mode for automation when the prompt and outputs should be explicit. Prefer an empty allowed-tools list for read-only smoke tests, and request JSON or stream JSON only when the caller is prepared to parse those formats.

Example: `ccl -p "List the top-level directories and their purpose." --allowedTools ""`

## Top-Level Command Reference

| Command | What it does | When to use | Common issue |
| --- | --- | --- | --- |
| `ccl [prompt]` | Starts an interactive session, optionally seeded with a prompt. | Normal human-in-the-loop work. | If a prompt starts with a slash command, command handling runs inside the session. |
| `ccl -p "..."` | Runs print mode and exits. | Scripts, CI, or smoke tests. | Interactive-only commands and prompts may not behave the same as the REPL. |
| `ccl mcp serve` | Starts the CCL MCP server. | Another client needs CCL-exposed MCP capabilities. | Debug mode can expose more logs; avoid leaking secrets. |
| `ccl mcp list/get/add/remove` | Inspects and changes MCP server configuration. | Managing external tool servers. | Listing/getting can spawn stdio servers for health checks; use trusted directories. |
| `ccl server` | Starts a CCL session server. | Detached or remote-controlled sessions. | Bind host, token, and idle timeout deliberately. |
| `ccl open <cc-url>` | Connects to an internal CCL server URL. | Attaching to an existing session endpoint. | Use only trusted `cc://` URLs. |
| `ccl ssh <host> [dir]` | Runs CCL on a remote host over SSH with auth tunneling. | Remote machine work without manual remote setup. | Permission mode and remote trust boundaries must be explicit. |
| `ccl auth login/status/logout` | Manages authentication state. | Account login, inspection, or logout. | Gateway credentials are separate from account auth. |
| `ccl plugin ...` | Validates, lists, installs, enables, disables, updates, or manages marketplaces. | Installing or auditing extension bundles. | Plugins are supply-chain inputs; validate manifests and sources. |
| `ccl agents` | Lists configured active agents. | Debugging built-in/custom/plugin agent visibility. | Use `--setting-sources` to control which settings are loaded. |
| `ccl auto-mode ...` | Inspects auto-mode classifier defaults/config/critique where enabled. | Debugging automated behavior policy. | Feature availability depends on build flags. |
| `ccl remote-control` / `ccl assistant` | Connects local or bridge sessions for remote-control flows. | Remote interactive control is enabled by deployment policy. | Requires auth, feature support, and careful environment boundaries. |
| `ccl doctor` | Checks runtime/updater health. | Setup, update, or workspace-health problems. | It is diagnostic; follow the reported fix rather than rerunning blindly. |
| `ccl update` / `ccl upgrade` | Checks for and installs updates. | Keeping a local binary current. | Version policy may differ by installation channel. |
| `ccl install [target]` | Installs a native build. | Initial install or explicit target install. | Use `--force` only when reinstalling intentionally. |
| `ccl completion <shell>` | Generates shell completion. | Improving CLI ergonomics. | Write to the correct shell startup path. |

## CCL Compatibility

<a id="ccl-compatibility"></a>

Some command names, environment variable names, and source-level identifiers remain for SDK or wire-compatibility reasons. Public docs should explain the CCL behavior users see, and mention compatibility literals only when they are required to configure or debug the current build.

## Stability Notes

Commands marked internal, hidden, or deployment-specific in the source should not be treated as stable public automation APIs. If a command is available only behind a feature flag or internal build condition, document the condition or omit the command from user-facing workflows.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`

<!-- section: related -->
## Related pages

- [Interactive Commands](commands.md)
- [Gateway and Model Routing](model-routing.md)
- [MCP Servers and Tools](mcp.md)
- [Plugins](plugins.md)
- [Agents](agents.md)
- [Remote Sessions and Automation](remote-automation.md)
