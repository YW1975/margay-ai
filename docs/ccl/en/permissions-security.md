# Permissions and Security

> This page is maintained as CCL public documentation source. If the generator workflow is restored, fix the missing generator script before regenerating.

<!-- section: purpose -->
## Purpose

CCL permissions protect the boundary where a model request becomes a real action on the user's machine or connected services. The permission system covers shell commands, file changes, notebook edits, MCP tools, agent delegation, user-question tools, sandbox decisions, hooks, SDK permission callbacks, and public-release safety checks.

Permissions are not a single global yes/no switch. CCL combines mode, explicit allow/deny/ask rules, tool-specific validators, working-directory checks, sandbox policy, hook decisions, and non-interactive fallbacks. The documentation should therefore describe the decision path rather than telling users that one flag makes everything safe.

<!-- section: capabilities -->
## Capabilities

CCL supports several permission modes, including default approval behavior, plan mode, accept-edits behavior, bypass permissions, and don't-ask behavior. Some internal or feature-gated modes can add classifier-driven automation, but the public rule remains: destructive or sensitive work should be constrained by explicit rules and reviewed evidence.

Rules are grouped by behavior:

- `allow`: approve a matching tool or scoped tool input.
- `deny`: remove or block a matching tool, with blanket deny rules also filtering the prompt-visible tool pool.
- `ask`: force an approval prompt even when another path might otherwise allow the action.

Rules can come from settings, CLI arguments, commands, or session state. MCP server-level rules are supported, so a rule can target a full server namespace instead of one generated tool name.

<!-- section: operational-model -->
## Operational model

The permission decision is intentionally layered. CCL first checks whether a tool is blanket-denied. It then evaluates tool-specific safety checks and rule-based permissions. Pre-tool hooks can allow, deny, or require approval. A permission mode can transform an ask into a denial in non-interactive contexts, or into classifier-assisted evaluation when that feature is enabled. SDK hosts can also provide a permission prompt tool; if the host callback fails or returns an invalid decision, the safe behavior is to fail closed.

`bypassPermissions` is not a design substitute for scoped rules. It exists for controlled environments where the operator accepts the risk. Some checks remain higher priority than ordinary prompts, and tools that require user interaction still need an interactive path. `dontAsk` should be treated as fail-closed automation: when CCL would ask, it denies instead.

For public docs, examples must never include live secrets, private absolute paths, real API keys, or internal network addresses. The docs site is a public release artifact and must pass safety scans before publishing.

<!-- section: configuration -->
## Configuration and commands

Use `/permissions` for interactive management and CLI flags or settings for repeatable configuration. Prefer narrow rules such as a specific command prefix or workspace path over broad rules such as allowing every shell command. Keep persistent rules in project or managed settings only when the whole team should inherit them; use session-scoped grants for one-off work.

Recommended practice:

- Put deny rules closest to the protected resource.
- Use ask rules for destructive commands and cross-boundary tools.
- Keep hooks auditable and short; move complex analysis into a script with test coverage.
- Avoid headless automation for workflows that depend on user judgment unless a fail-closed permission prompt callback is wired.
- Run documentation/publication audits before making generated content public.

<!-- section: source-evidence -->
## Source evidence

- `utils/permissions/PermissionMode.ts`: maps permission modes and external mode names.
- `utils/permissions/permissions.ts`: resolves allow, ask, deny, mode transformations, hook decisions, classifier behavior, and headless fallback behavior.
- `utils/permissions/PermissionRule.ts` and `utils/permissions/permissionRuleParser.ts`: define rule shape and rule parsing.
- `tools.ts`: filters blanket-denied tools before the model receives the tool pool.
- `tools/BashTool/*`, `tools/PowerShellTool/*`, and `utils/sandbox/*`: implement command validation, shell safety, and sandbox decisions.
- `scripts/audit-public-content.sh` and `scripts/check-docs.mjs` in the public docs site enforce release safety for documentation.

<!-- section: related -->
## Related pages

- [Built-in Tools](tools.md)
- [Hooks](hooks.md)
- [MCP Servers and Tools](mcp.md)
- [Public Documentation Publishing](public-docs.md)
