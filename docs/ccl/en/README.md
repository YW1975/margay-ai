# CCL Documentation

> This index is maintained as public documentation source. It is the first page rendered as `index.html` in each language.

<!-- section: purpose -->
## Purpose

Use this index to choose the correct CCL documentation path. CCL is a command-line agent runtime with interactive sessions, print-mode automation, tools, settings, gateway routing, MCP, plugins, skills, agents, workflows, remote automation, and Ralph-Lisa governance.

<!-- section: duo-ide-guides -->
## Two agents and editor integration

- [Duo: Peer Collaboration](duo.md)
- [Using CCL in VS Code](ide.md)

<!-- section: capabilities -->
## Capabilities

- Start with [CCL Overview](overview.md) when choosing a workflow.
- Use [Quickstart](quickstart.md) for the shortest safe first run.
- Use [Installation and Updates](installation.md) when the `ccl` binary, shell path, or updater is the problem.
- Use [Troubleshooting](troubleshooting.md) when the failing layer is unclear.
- Use [Public Documentation Publishing](public-docs.md) when updating this official site.

<!-- section: operational-model -->
## Operational model

The generated static site uses this README as the language home page. Navigation is built from `docs/ccl/docs-inventory.json`; the builder writes `README.md` as `index.html` and links every visible page in inventory order. Keep this page focused on routing, not detailed feature prose.

Because this site is the official public fact source, do not treat copied snippets, old private notes, generated summaries, or archived incident reports as authoritative by themselves. A page is authoritative only when it matches current source evidence, passes the public docs checks, renders correctly, and avoids private paths, secrets, and unsupported deployment claims.

For accurate work, follow a job path rather than reading pages alphabetically:

| Job | Start | Continue |
| --- | --- | --- |
| First run | [Quickstart](quickstart.md) | [Authentication](authentication.md), [Gateway and Model Routing](model-routing.md) |
| Configure runtime | [Configuration and Settings](configuration.md) | [Environment Variables](env-vars.md), [Permissions and Security](permissions-security.md) |
| Use CCL daily | [Interactive Sessions](interactive-sessions.md) | [Commands](commands.md), [Built-in Tools](tools.md) |
| Extend CCL | [Agents](agents.md) | [Subagents](sub-agents.md), [Plugins](plugins.md), [Skills](skills.md), [Hooks](hooks.md), [MCP](mcp.md) |
| Automate repeatable work | [Workflow Automation](workflows.md) | [Common Workflows](common-workflows.md), [GitHub and CI Workflows](github-ci.md) |
| Govern delivery | [Ralph-Lisa Loop](ralph-lisa-loop.md) | [Gates and Attestation](gates-attestation.md), [Clarify and Planning](clarify-and-planning.md) |

<!-- section: configuration -->
## Configuration and commands

For local verification of this documentation set, run `node scripts/check-docs.mjs`, `bash scripts/audit-public-content.sh`, and `node scripts/build-site.mjs` in the public docs repository. For CCL feature coverage, run the coverage matrix checks from the CCL repository.

After changing navigation or page inventory, verify the generated `site/<lang>/index.html` files, not only the Markdown. The static builder rewrites Markdown links to HTML links, so rendered navigation is the final artifact users see.

<!-- section: source-evidence -->
## Source evidence

- `docs/ccl/docs-inventory.json` defines language list, glossary entries, public pages, navigation groups, and related-page metadata.
- `scripts/build-site.mjs` renders each language README as `index.html` and builds navigation from visible inventory pages.
- `scripts/check-docs.mjs` enforces language parity, inventory coverage, section marker parity, link integrity, public-safety checks, and translation sanity.
- `scripts/audit-public-content.sh` scans the public repository for generated artifacts, env files, key material, token-like strings, and private local paths.

<!-- section: related -->
## Related pages

- [CCL Overview](overview.md)
- [Quickstart](quickstart.md)
- [CLI Reference](cli-reference.md)
- [Troubleshooting](troubleshooting.md)
- [Public Documentation Publishing](public-docs.md)
