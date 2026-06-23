# Remote Sessions and Automation

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL includes server, open, SSH, assistant bridge, remote setup, remote environment, bridge kick, and remote trigger surfaces for detached or remote-controlled sessions.

<!-- section: capabilities -->
## Capabilities

- Start a session server with host, port, token, socket, workspace, idle timeout, and max session options.
- Connect through `open` URLs or SSH deployment flows.
- Use bridge and remote trigger tools for controlled automation.

<!-- section: operational-model -->
## Operational model

- Remote automation increases blast radius. Always pair it with explicit auth, workspace scoping, idle timeouts, and least-privilege permissions.

<!-- section: configuration -->
## Configuration and commands

- Relevant commands and tools: `server`, `open`, `ssh`, `assistant`, `remote-setup`, `remote-env`, `bridge-kick`, and `RemoteTriggerTool`.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`
- `commands/assistant/assistant.ts`
- `commands/remote-setup`
- `commands/remote-env`
- `commands/bridge-kick.ts`
- `tools/RemoteTriggerTool`

<!-- section: related -->
## Related pages

- [CLI Reference](cli-reference.md)
- [Permissions and Security](permissions-security.md)
- [Authentication](authentication.md)
- [Troubleshooting](troubleshooting.md)
