# Remote Sessions and Automation

> This page is maintained as public documentation source. Remote automation increases blast radius; document auth, workspace, and policy boundaries.

<!-- section: purpose -->
## Purpose

CCL can run outside a single local terminal through server mode, direct-connect URLs, SSH launch, background remote sessions, assistant/bridge surfaces, remote setup, remote environment management, and remote-trigger tooling. These surfaces are powerful because they can execute work away from the user’s current shell; they must be paired with explicit authentication, workspace scoping, idle limits, and least-privilege permissions.

<!-- section: capabilities -->
## Capabilities

- Start a CCL session server with host, port, bearer token, Unix socket, default workspace, idle timeout, and max-session controls.
- Connect to a CCL server with internal `open` URLs and optional headless print mode.
- Run `ccl ssh <host> [dir]` when the SSH remote feature is enabled; the flow deploys the binary and tunnels local API auth to the remote host.
- Use `remote-setup` and `remote-env` command surfaces for remote environment setup and inspection.
- Create background remote sessions only when policy, login, remote environment, git repository state, and repository access checks pass.
- Allow bundle-seeded remote execution when the relevant gate or environment override is enabled.
- Use remote review and remote task surfaces only when their feature gates, quota/billing gates, and preconditions allow them.

<!-- section: operational-model -->
## Operational model

Server mode is gated by the direct-connect feature. It probes for an existing server, starts a session manager, creates or accepts a bearer token, writes a server lock, enforces idle timeout and max-session limits, and removes the lock on shutdown.

SSH mode is gated by the SSH remote feature and is handled by early argument rewriting before normal commander actions. It rejects headless print mode for SSH launch, forwards selected resume/model flags, and treats local mode as an end-to-end auth-proxy test path.

Background remote sessions perform explicit precondition checks. Policy can block remote sessions immediately. Login state, remote environment availability, current git repository state, GitHub remote presence, GitHub App installation, and bundle-seeding gates determine eligibility. Failures are typed so diagnostics can tell “not logged in” apart from “no remote environment” or “repository access missing.”

Remote automation should be audited as a separate execution environment. The local session may only launch or track work; the remote environment may execute commands, access repository content, and consume credentials according to its own policy.

<!-- section: configuration -->
## Configuration and commands

- Server mode: `ccl server --port <n> --host <addr> --auth-token <token> --workspace <dir> --idle-timeout <ms> --max-sessions <n>`.
- Direct connect: `ccl open <cc-url>` and `ccl open <cc-url> --print --output-format stream-json` when enabled.
- SSH launch: `ccl ssh <user@host|ssh-config-alias> [dir]` with optional permission-mode flags where enabled.
- Remote setup: `/remote-setup` or the matching command module.
- Remote environment: `/remote-env` or the matching command module.
- Remote session diagnosis: record the failed precondition type, current repository state, remote availability, GitHub access method, and policy status.
- Avoid `dangerously-skip-permissions` on remote hosts unless the host is disposable and isolated.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` defines `server`, `open`, and `ssh` command surfaces, feature gates, bearer token setup, lock handling, idle limits, and early SSH argument rewriting.
- `utils/background/remote/preconditions.ts` implements login, remote environment, git repository, GitHub App, token-sync, and repository access checks.
- `utils/background/remote/remoteSession.ts` defines background remote session state and typed precondition failures.
- `commands/remote-setup/index.ts` and `commands/remote-env/index.ts` expose remote setup and remote environment command surfaces.
- `commands/review/reviewRemote.ts` shows remote review launch preconditions, quota checks, and remote task launch behavior.
- `utils/teleport.tsx` contains remote environment and bundle-seeding integration used by remote execution flows.

<!-- section: related -->
## Related pages

- [Authentication](authentication.md)
- [Permissions and Security](permissions-security.md)
- [GitHub and CI Workflows](github-ci.md)
- [CLI Reference](cli-reference.md)
- [Troubleshooting](troubleshooting.md)
