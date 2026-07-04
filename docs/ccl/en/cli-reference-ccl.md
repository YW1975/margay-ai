# CCL CLI Compatibility Reference

> This page is maintained as public documentation source. It explains where compatibility notes belong and how to treat legacy or hidden command surfaces.

<!-- section: purpose -->
## Purpose

The compatibility reference keeps CCL command behavior, compatibility literals, aliases, and stability guidance attached to the unified CLI reference. It exists because some source-level names and flags remain for compatibility even when the public workflow should be described in CCL terms.

<!-- section: capabilities -->
## Capabilities

- Direct users to the canonical [CLI Reference](cli-reference.md) for command usage.
- Explain that compatibility names may appear in flags, environment variables, source comments, or wire formats without changing the public product name.
- Keep hidden, internal, feature-gated, or deployment-specific commands out of stable user automation unless the condition is documented.
- Clarify that `ccl --help` in the installed build is the final local source for available command surfaces.
- Preserve links to the `ccl-compatibility` section for older external references.

<!-- section: operational-model -->
## Operational model

Compatibility is a documentation constraint, not a separate CLI product. When a behavior is part of the public `ccl` command, document it in [CLI Reference](cli-reference.md), [Commands](commands.md), or the feature-specific page. When a literal exists only because CCL is compatible with an underlying SDK, a legacy flag, or an internal wire protocol, mention it only if users must configure or debug it.

Commands can exist in source but still be unsuitable for public automation. Examples include hidden commands, internal URL openers, bridge helpers, debug-only paths, feature-gated remote surfaces, and command paths that are intentionally skipped in ordinary print mode. The docs should state the stable public entry point rather than encouraging users to depend on internals.

When a compatibility literal is unavoidable, document the user-visible effect and the reason it still appears. For example, a flag may remain because another CLI or SDK expects that spelling, while the recommended CCL workflow uses a different command. This distinction prevents users from treating implementation names as product promises.

Compatibility review should also check negative scope. If a command is hidden from help, requires a feature gate, opens an internal URL scheme, or is present only for automated tests, the public page should either omit it or label the condition. A runnable command in source is evidence, but it is not automatically an official API.

<!-- section: configuration -->
## Configuration and commands

- Canonical CLI reference: [CLI Reference](cli-reference.md)
- Compatibility anchor: [CLI Reference: CCL Compatibility](cli-reference.md#ccl-compatibility)
- Validate local command availability with `ccl --help` and, where supported, `ccl <command> --help`.
- Prefer `ccl -p "..." --output-format json` or `stream-json` for scriptable work instead of undocumented internal commands.
- Treat source comments, hidden flags, and deployment-specific helpers as implementation evidence, not stable user APIs.
- When documenting compatibility literals, include the active CCL command, the legacy or wire-compatible literal, the reason users might see it, and the supported troubleshooting path.

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` defines the top-level `ccl` command, visible and hidden flags, print-mode behavior, subcommand registration, remote/open surfaces, auth commands, MCP commands, plugin commands, and version output.
- `main.tsx` explicitly skips ordinary subcommand registration in `-p/--print` mode, which is why print-mode automation and interactive/subcommand behavior are documented separately.
- `commands/version.ts` exposes a local version command for sessions where that command is enabled.
- `docs/ccl/en/cli-reference.md` contains the canonical public command table and the `ccl-compatibility` anchor.
- `scripts/check-docs.mjs` protects the public docs from forbidden branding and stale compatibility residue.
- `main.tsx` help text and command registration conditions are the source of truth for deciding whether a compatibility surface is visible, hidden, print-mode-only, interactive-only, or deployment-gated.

<!-- section: related -->
## Related pages

- [CLI Reference](cli-reference.md#ccl-compatibility)
- [Commands](commands.md)
- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Environment Variables](env-vars.md)
- [Troubleshooting](troubleshooting.md)
