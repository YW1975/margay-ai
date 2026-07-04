# GitHub and CI Workflows

> This page is maintained as public documentation source. Do not publish repository secrets, workflow tokens, or private PR data.

<!-- section: purpose -->
## Purpose

CCL includes GitHub and CI surfaces for repository automation: GitHub App setup, workflow creation, repository secret setup, local PR review, remote review where enabled, PR comment retrieval, security review, commit/PR creation, and deterministic print-mode CI runs. These features should make repository work auditable, not opaque.

<!-- section: capabilities -->
## Capabilities

- Use `/install-github-app` to check GitHub CLI availability, auth scopes, repository permissions, existing workflows, existing secrets, and selected workflow templates.
- Create GitHub Actions workflow files for PR assistant and code review automation when the user has repository access and the selected setup path is valid.
- Set repository secrets through `gh secret set` during setup when the user chooses to provide a key or token.
- Use `/review` for local PR review based on `gh pr view` and `gh pr diff`.
- Use `/ultrareview` only when the remote review feature is enabled and quota/preconditions allow it.
- Use `/pr-comments` to collect PR-level and code-review comments through GitHub API calls.
- Use `/security-review` for high-confidence security findings on the current branch.
- Use `/commit-push-pr` to create a branch, commit, push, and open or update a PR with explicit git safety rules.
- Use `--print` with JSON or stream JSON output for CI jobs that need deterministic logs and exit codes.

<!-- section: operational-model -->
## Operational model

GitHub App setup is a guided flow. It checks `gh --version`, `gh auth status -a`, required `repo` and `workflow` scopes, current repository detection, admin access, existing workflow files, and existing Actions secrets. Workflow creation uses GitHub API calls to create a branch, write workflow files, optionally set secrets, and open a compare URL for PR creation.

Review surfaces are intentionally separate. `/review` is local and prompt-based: it asks CCL to inspect PR details and diff through `gh`. `/ultrareview` is a remote review entrypoint with feature, quota, billing, repository, and remote-session preconditions. `/security-review` is scoped to security implications newly added by the branch, not general style review.

Commit/PR automation has explicit safety rules: no destructive git commands unless the user asks, no config mutation, no skipped hooks unless requested, no committing likely secret files, and no interactive git commands. The command gathers git status, full branch diff, default branch, existing PR state, and attribution before producing a PR.

CI should run scripted checks before publishing or merging. For public docs, the expected pattern is docs validation, public-content audit, static-site build, and coverage matrix checks. For code changes, use the repository’s test, lint, type-check, and security gates.

<!-- section: configuration -->
## Configuration and commands

- GitHub setup: `/install-github-app`.
- Local PR review: `/review <pr-number>`.
- Remote review where enabled: `/ultrareview [pr-number]`.
- PR comments: `/pr-comments`.
- Security review: `/security-review`.
- Commit and PR creation: `/commit-push-pr`.
- CI-safe CCL invocation: `ccl -p "<task>" --output-format json` or `--output-format stream-json`.
- For GitHub App setup, ensure `gh` is installed, authenticated, and has `repo` and `workflow` scopes.
- For docs publishing, run local docs checks before relying on hosted GitHub Pages output.

<!-- section: source-evidence -->
## Source evidence

- `commands/install-github-app/install-github-app.tsx` implements GitHub CLI checks, auth-scope checks, repository selection, existing workflow/secret checks, and setup UI flow.
- `commands/install-github-app/setupGitHubActions.ts` creates workflow files, sets secrets, creates branches, opens compare URLs, and records workflow setup outcomes.
- `commands/review.ts` defines local `/review` and gated `/ultrareview` command surfaces.
- `commands/review/reviewRemote.ts` implements remote review preconditions, quota/billing checks, repository resolution, and remote launch behavior.
- `commands/pr_comments/index.ts` defines the GitHub API-based PR comment retrieval flow.
- `commands/security-review.ts` defines the focused security-review command.
- `commands/commit-push-pr.ts` defines commit/PR automation, git safety rules, allowed tools, attribution, and PR body structure.

<!-- section: related -->
## Related pages

- [Common Workflows](common-workflows.md)
- [Remote Sessions and Automation](remote-automation.md)
- [Permissions and Security](permissions-security.md)
- [Gates and Attestation](gates-attestation.md)
- [Public Documentation Publishing](public-docs.md)
