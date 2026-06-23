# MargayAI Public Docs

This repository publishes public documentation and approved release artifacts for
MargayAI products.

GitHub Pages target: <https://yw1975.github.io/margay-ai/>

## Products

- `docs/ccl/` — CCL CLI documentation.
- `docs/margay/` — MargayAI account, gateway, and platform documentation.
- `docs/ralph-lisa/` — Ralph-Lisa Loop and Margay Studio documentation.

## Release Artifacts

Approved public build artifacts live under `artifacts/<product>/`.

Artifacts must be generated from private source repositories and copied here by
an allowlist-based release process. Do not commit source trees, source maps,
debug bundles, private logs, secrets, or generated files that embed private
paths.

## Publication Rules

See [PUBLICATION_RULES.md](PUBLICATION_RULES.md).

## Local Checks

```bash
bash scripts/audit-public-content.sh
node scripts/check-docs.mjs
node scripts/build-site.mjs
```

The static site is generated into `site/` for GitHub Pages deployment. Build
output is not committed.

## Current Import

The CCL documentation under `docs/ccl/` is imported from the private CCL
repository's approved public documentation output and includes English, Chinese,
and Japanese pages.
