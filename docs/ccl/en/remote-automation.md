# Remote Sessions and Automation

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL includes session server, open URL, SSH, assistant bridge, remote setup, remote environment, remote-control bridge, and remote trigger surfaces for detached or remote-controlled sessions.

<!-- section: capabilities -->
## Capabilities

- Start a session server with host, port, bearer token, unix socket, workspace, idle timeout, and max-session options.
- Connect through internal `open` URLs, SSH deployment flows, or assistant bridge sessions where the installed build enables them.
- Use remote-control bridge and remote trigger tools for controlled automation when feature flags, auth, and policy allow them.

<!-- section: operational-model -->
## Operational model

- Remote automation increases blast radius. Always pair it with explicit auth, workspace scoping, idle timeouts, and least-privilege permissions.
- Remote environment and background remote sessions are deployment-gated. Eligibility checks include remote-session policy, login state, configured remote environment, git repository state, and GitHub app or bundle-seeding prerequisites.

<!-- section: configuration -->
## Configuration and commands

- Relevant commands and tools: `server`, `open`, `ssh`, `assistant`, `remote-control`, `session`, `remote-setup`, `remote-env`, and `RemoteTriggerTool`.
- `bridge-kick` is an internal diagnostic command for manually injecting bridge failure states; do not treat it as a stable public automation API.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx`
- `commands/assistant/assistant.ts`
- `commands/session`
- `commands/bridge`
- `commands/remote-setup`
- `commands/remote-env`
- `commands/bridge-kick.ts`
- `utils/background/remote/remoteSession.ts`
- `tools/RemoteTriggerTool`

<!-- section: related -->
## Related pages

- [CLI Reference](cli-reference.md)
- [Permissions and Security](permissions-security.md)
- [Authentication](authentication.md)
- [Troubleshooting](troubleshooting.md)
