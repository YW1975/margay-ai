# GitHub and CI Workflows

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL includes GitHub app setup, commit and review commands, PR automation helpers, CI-oriented print mode, and public documentation publishing workflows.

<!-- section: capabilities -->
## Capabilities

- Install GitHub app integration where supported.
- Use review, security-review, autofix-pr, commit, and commit-push-pr commands when available.
- Run docs checks and public audits in CI before publishing GitHub Pages.

<!-- section: operational-model -->
## Operational model

- CI automation should be deterministic and auditable. Prefer scripts that fail closed over prompts that require unstated human judgment.

<!-- section: configuration -->
## Configuration and commands

- Relevant modules: `commands/install-github-app`, `commands/review`, `commands/security-review.ts`, `commands/autofix-pr`, and public repo workflows.

<!-- section: source-evidence -->
## Source evidence

- `commands/install-github-app`
- `commands/review`
- `commands/security-review.ts`
- `commands/autofix-pr`
- `commands/commit-push-pr.ts`

<!-- section: related -->
## Related pages

- [Workflows](workflows.md)
- [Permissions and Security](permissions-security.md)
- [Gates and Attestation](gates-attestation.md)
- [Public Documentation Publishing](public-docs.md)
