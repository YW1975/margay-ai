# Public Documentation Publishing

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Public CCL documentation is prepared from sanitized Markdown sources, checked for language parity and sensitive content, then built into a static GitHub Pages site.

<!-- section: capabilities -->
## Capabilities

- Sync only approved documentation sources into the public repository.
- Block secrets, private paths, source maps, environment files, and key material before push.
- Build a static site without committing generated maps or dependency directories.

<!-- section: operational-model -->
## Operational model

- The public repository is a publication surface, not a mirror of private source. Every file must be intentionally safe to expose.

<!-- section: configuration -->
## Configuration and commands

- Run `scripts/audit-public-content.sh`, docs checks, and the Pages build before publishing.

<!-- section: source-evidence -->
## Source evidence

- `docs/ccl-docs`
- `scripts/check-ccl-docs.mjs`

<!-- section: related -->
## Related pages

- [GitHub and CI Workflows](github-ci.md)
- [Permissions and Security](permissions-security.md)
- [CCL Overview](overview.md)
