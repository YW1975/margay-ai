# MargayAI Public Docs

This repository publishes public documentation and approved release artifacts for
MargayAI products.

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

## Current Import

The initial `docs/ccl/en/` content was imported from the private CCL repository's
public documentation output.
