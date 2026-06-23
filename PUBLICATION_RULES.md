# Publication Rules

This repository is public. Treat every committed byte as externally visible.

## Source Of Truth

Private repositories remain the source of truth for product implementation and
draft documentation:

- `ccl`
- `margay`
- `margay-studio` / Ralph-Lisa Loop

This public repository is a publication target for reviewed documentation and
approved release artifacts only.

## Allowed Content

Only commit content from these allowlisted categories:

- Public product documentation under `docs/<product>/`.
- Public release artifacts under `artifacts/<product>/`.
- Repository governance files such as `README.md`, `PUBLICATION_RULES.md`,
  `.gitignore`, and CI audit workflows.
- Publication scripts that copy allowlisted files into this repository.

## Disallowed Content

Never publish:

- Source trees from private repositories.
- Source maps, debug bundles, or unminified internal builds.
- `.env`, credentials, tokens, API keys, certificates, or private config.
- Internal prompts, private issue links, private Slack/Lark/WeCom URLs, or
  customer data.
- Raw logs that include local user paths, session transcripts, request bodies, or
  provider responses unless explicitly scrubbed.
- Files copied by broad directory syncs from a private repository root.

## Build Artifact Rules

Artifacts may be public only when all of the following are true:

1. They are intended for public distribution.
2. They do not include source maps.
3. They do not embed secrets or private endpoint credentials.
4. They do not expose private source files or private repository layout.
5. They are produced by a repeatable build command in the private repository.

Prefer GitHub Release assets for large binaries. Keep repository-tracked
artifacts small and inspectable.

## Sync Rules

Use allowlist sync scripts. Do not copy from private repository roots.

Required checks before commit:

```bash
scripts/audit-public-content.sh
```

Product import scripts should copy only known public output directories, for
example:

```bash
scripts/sync-ccl-docs.sh /path/to/private/ccl
```

## Review Checklist

- The diff contains only docs, approved artifacts, or governance files.
- No source maps are present.
- No hidden macOS/IDE files are present.
- Brand terms are consistent with MargayAI public naming.
- Any compatibility terms are explained as compatibility surfaces, not product
  names.
- Links point to public URLs or relative paths.
