# Interactive Commands

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Interactive commands control a running CCL session. They switch modes, manage context, inspect cost and files, configure permissions, operate workflows, and connect integrations.

<!-- section: capabilities -->
## Capabilities

- Core commands include help, config, model, permissions, memory, status, cost, context, compact, clear, resume, diff, commit, review, plan, and workflows.
- Integration commands cover MCP, IDE, terminal setup, Chrome, GitHub app installation, remote setup, remote control, and plugins.
- Diagnostic commands include doctor, endpoint, gateway, stats, insights, usage, and debug tool call helpers where present.

<!-- section: operational-model -->
## Operational model

- A command is session-local unless it explicitly writes settings, creates files, talks to a service, or starts an external process. Review each command prompt and permission request before approving writes.

<!-- section: configuration -->
## Configuration and commands

- Type `/` in an interactive session to discover commands available in the current build and project.

## How Interactive Commands Work

Interactive commands are entered at the start of a message with `/`. The available command set is assembled for the current build, project, feature flags, installed plugins, MCP state, and session mode. Some commands are hidden, internal, or disabled in non-interactive mode; use the in-session command palette as the source of truth for the running build.

A command can be read-only, session-local, settings-writing, service-calling, or process-spawning. Treat that side effect class as part of the command contract. For example, `/status` is an inspection command, `/gateway login` writes gateway credentials, and workflow or remote commands may launch background work.

## Commands Across A Normal Workflow

| Moment | Useful commands | What they are for |
| --- | --- | --- |
| First session | `/help`, `/init`, `/config`, `/permissions`, `/mcp`, `/agents` | Discover the available command surface, set project context, review tool policy, connect MCP servers, and confirm agent visibility. |
| Before a task | `/plan`, `/model`, `/effort`, `/add-dir`, `/memory` | Choose planning depth, model behavior, extra directories, and relevant persistent context. |
| During a task | `/files`, `/diff`, `/status`, `/cost`, `/context`, `/usage` | Inspect touched files, pending changes, runtime state, token/cost/context usage, and provider usage when available. |
| When context is large | `/compact`, `/clear`, `/resume`, `/rewind`, `/rename` | Reduce context, start fresh, resume prior work, return to a checkpoint, or label the session. |
| Before delivery | `/review`, `/security-review`, `/commit`, `/commit-push-pr`, `/pr-comments` | Review changes, inspect security-sensitive edits, and prepare GitHub handoff. |
| Troubleshooting | `/doctor`, `/gateway doctor`, `/endpoint`, `/debug-tool-call`, `/feedback` | Diagnose installation, gateway, endpoint, tool-call, or product issues. |

## Gateway Commands

`/gateway status` shows whether a gateway is configured and may show token balance when the gateway exposes it. `/gateway login URL API_KEY` validates and saves a gateway URL/key pair. `/gateway register URL INVITE_CODE [USERNAME] [EMAIL] [PHONE]` creates and connects an account through an invite flow. `/gateway doctor` compares shell variables, gateway file settings, OAuth/API-key state, and gateway reachability. `/gateway logout` removes the saved gateway file and clears current process variables.

Use `/gateway doctor` when shell variables and saved config disagree. In the current implementation, shell `CCL_GATEWAY_URL` or `CCL_GATEWAY_KEY` wins over the file as an atomic pair.

## Common Command Reference

| Command | What it does | Use it when | Common issue |
| --- | --- | --- | --- |
| `/help` | Shows available commands for the current session. | You are unsure what this build supports. | A command may be absent because it is hidden, disabled, plugin-provided, or not supported in the current mode. |
| `/init` | Creates or updates project instructions and setup guidance. | Starting CCL in a repository that lacks useful project context. | Do not let generated instructions claim policy that the repository does not actually follow. |
| `/config` | Opens configuration/settings surfaces. | You need to inspect or change behavior that should persist beyond one prompt. | Setting source matters; user, project, local, and managed values may differ. |
| `/permissions` | Shows or edits tool permission rules. | A tool prompt is too permissive, too restrictive, or surprising. | Changing permissions can affect future tool calls; review deny/ask/allow rules carefully. |
| `/model` | Inspects or switches model selection where supported. | The current task needs a different speed, cost, or capability profile. | Model aliases and gateway model names are not the same thing in every deployment. |
| `/effort` | Adjusts reasoning effort where the active model path supports it. | A task needs deeper reasoning or faster shallow handling. | Higher effort can increase latency or cost. |
| `/memory` | Manages memory/context surfaces. | Reusable project knowledge should be reviewed or updated. | Do not store secrets or one-off assumptions in persistent memory. |
| `/add-dir` | Adds an additional directory to session context. | The task spans more than the current working directory. | Large or irrelevant directories can inflate context and slow work. |
| `/files` | Shows file context known to the session. | You need to inspect what files are currently in play. | It does not guarantee every repository file has been read. |
| `/diff` | Shows pending changes. | Before review, commit, or handoff. | Generated files can make the diff noisy; inspect source changes separately. |
| `/status` | Shows current session status. | You need quick state without changing anything. | It is diagnostic, not a fix command. |
| `/cost` | Shows cost/token accounting where usage data is available. | You need to understand spending or context growth. | Cache counters are meaningful only when the transport returns verified fields. |
| `/context` | Inspects context usage. | The session is long, slow, or close to context limits. | Context size does not identify which content is least useful by itself. |
| `/usage` | Shows usage surfaces exposed by the current deployment. | You need provider/gateway usage details. | Some deployments do not return all usage fields. |
| `/compact` | Compacts conversation context. | The session is long but should continue. | Compaction may lose low-salience detail; summarize critical constraints first. |
| `/clear` | Starts a clean conversation state. | The current context is no longer useful. | Clearing does not undo file changes. |
| `/resume` | Resumes a previous session. | Continuing prior work. | Choose the correct session; similar names can be confusing. |
| `/rewind` | Returns to an earlier checkpoint where supported. | You need to back out conversation state. | It is not a git reset; inspect files separately. |
| `/rename` | Renames a session. | You need future session discovery to be clear. | Generated names may fail if there is too little context. |
| `/plan` | Switches or invokes planning behavior. | Before significant edits or ambiguous work. | A plan is not implementation; still verify with tests or docs checks. |
| `/review` | Runs review-oriented analysis. | Before commit, PR, or handoff. | Review output is evidence to inspect, not an automatic approval. |
| `/security-review` | Looks for security-sensitive issues. | Changes touch auth, secrets, shell, network, permissions, or publishing. | It cannot replace secret scanning or policy gates. |
| `/commit` | Prepares a commit workflow where enabled. | Changes are reviewed and ready to record. | Do not use before checking the diff and test evidence. |
| `/commit-push-pr` | Automates commit, push, and PR flow where enabled. | The repository policy allows automated GitHub handoff. | Requires correct branch, auth, and review discipline. |
| `/mcp` | Manages MCP tool servers in-session. | External tools should be connected, inspected, or toggled. | Workspace trust matters; do not spawn untrusted stdio servers casually. |
| `/agents` | Shows or manages active agent visibility. | You need to know which built-in/custom/plugin agents can be used. | MCP requirements or setting sources can hide an expected agent. |
| `/hooks` | Inspects hook configuration. | Tool behavior is being changed by policy automation. | Hooks can block or rewrite tool input; check event scope. |
| `/workflows` | Creates, lists, runs, tails, or inspects workflow automation. | A repeatable multi-step operation needs structure and verification. | Workflow background runs need explicit follow-up via tail/inspect. |
| `/endpoint` | Pins, inspects, or switches endpoint routing where configured. | A model route or endpoint compatibility issue is suspected. | Endpoint switching depends on configured registry data. |
| `/gateway` | Manages Margay gateway status, login, registration, doctor, and logout. | Gateway credentials or reachability need inspection or change. | Shell variables can shadow saved gateway config. |

## Diagnostics And Cost

<a id="diagnostics-and-cost"></a>

Use `/cost`, `/context`, `/usage`, `/stats`, `/insights`, `/endpoint`, and `/gateway doctor` for diagnostics. Cache-read and cache-write counters should be interpreted only when the active transport returns verified usage fields; otherwise the docs must not claim a cache hit rate.

<!-- section: source-evidence -->
## Source evidence

- `commands`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `commands/workflows/index.ts`
- `commands/permissions/permissions.tsx`
- `commands/hooks/hooks.tsx`

<!-- section: related -->
## Related pages

- [CLI Reference](cli-reference.md)
- [Gateway and Model Routing](model-routing.md)
- [Workflows](workflows.md)
- [Permissions and Security](permissions-security.md)
- [Hooks](hooks.md)
