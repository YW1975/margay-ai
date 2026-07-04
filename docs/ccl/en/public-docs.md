# Public Documentation Publishing

> This page is maintained as public documentation source. It defines how CCL public docs are prepared, checked, built, and reviewed before publication.

<!-- section: purpose -->
## Purpose

The CCL documentation site is the official public fact source. Publishing must therefore prove three things: the source Markdown is accurate and language-complete, the public repository contains no private or sensitive material, and the generated site preserves the expected navigation and content.

<!-- section: capabilities -->
## Capabilities

- Maintain English, Chinese, and Japanese Markdown pages under `docs/ccl/<lang>/`.
- Enforce language parity, inventory coverage, section-marker parity, internal-link validity, stale-version checks, forbidden-branding checks, and translation sanity checks.
- Block public leaks such as local private paths, secret-looking tokens, source maps, environment files, and private key material.
- Build a static site under `site/` from the Markdown source without requiring a runtime server.
- Validate CCL feature coverage with the authoritative coverage matrix in the CCL repository.
- Record source evidence, command output, rendered-site checks, and review handoff notes for Lisa or human reviewers.

<!-- section: operational-model -->
## Operational model

Public docs are not a mirror of a private repository. Each page must be intentionally safe to expose, source-backed, and written for public users. If a private implementation detail is required to justify a claim, cite only repository-relative source paths and describe the behavior in public terms.

There are two validation layers. The public docs repository validates Markdown parity, public-safety rules, and static-site generation. The CCL repository validates that the official docs still cover the feature inventory and agent-instruction scope. Both layers are required for authoritative updates.

Producer evidence is not the final verdict. A reviewer should independently inspect representative page lines, rerun the mechanical checks, verify the generated HTML, and ensure claims match source files rather than relying on the submitter's summary.

<!-- section: configuration -->
## Configuration and commands

Required local checks for public-docs changes:

| Check | Command | What it proves |
| --- | --- | --- |
| Markdown and locale parity | `node scripts/check-docs.mjs` | All languages have the same files, inventory pages exist, section markers align, links resolve, and public text avoids known forbidden patterns. |
| Public content audit | `bash scripts/audit-public-content.sh` | Repository output contains no `.DS_Store`, source maps, env files, key files, obvious token patterns, or private local project paths. |
| Static site build | `node scripts/build-site.mjs` | Markdown can render to the public `site/` tree. |
| Coverage structure | `node scripts/check-official-docs-coverage.mjs --check=structure` | Coverage matrix schema and structure remain valid. |
| Coverage inventory | `node scripts/check-official-docs-coverage.mjs --check=inventory` | Public docs inventory and CCL coverage matrix remain aligned. |
| Agent scope | `node scripts/check-official-docs-coverage.mjs --check=agent-scope` | Agent instruction scope remains covered by official docs decisions. |

When publishing to GitHub Pages, verify the hosted URL after deployment in addition to the local build. Hosted verification should check the public URL, language navigation, representative rendered pages, and absence of private paths or generated artifacts.

<!-- section: source-evidence -->
## Source evidence

- `scripts/check-docs.mjs` checks language directories, inventory alignment, section-marker parity, internal links, forbidden branding, private paths, secret-looking tokens, stale version references, translation placeholders, and localized prose sanity.
- `scripts/audit-public-content.sh` scans the publish repository for macOS metadata, source maps, env files, key material, obvious token formats, and private local project paths.
- `scripts/build-site.mjs` renders Markdown pages into the static `site/` output, rewrites Markdown links to HTML links, and builds per-language navigation.
- `docs/ccl/docs-inventory.json` defines public page inventory, navigation targets, and feature-module mapping.
- `docs/official-docs-coverage-matrix.json` and `scripts/check-official-docs-coverage.mjs` in the CCL repository define and validate the authoritative feature coverage matrix.

<!-- section: related -->
## Related pages

- [GitHub and CI Workflows](github-ci.md)
- [Permissions and Security](permissions-security.md)
- [Gates and Attestation](gates-attestation.md)
- [Troubleshooting](troubleshooting.md)
- [CCL Overview](overview.md)
