# GitHub と CI ワークフロー

> このページは公開ドキュメントのソースとして保守されています。Repository secrets、workflow tokens、private PR data を公開しないでください。

<!-- section: purpose -->
## Purpose

CCL には GitHub と CI 向けの repository automation surfaces があります。GitHub App setup、workflow creation、repository secret setup、local PR review、enabled remote review、PR comment retrieval、security review、commit/PR creation、deterministic print-mode CI runs です。これらは repository work を opaque にするのではなく、auditable にするための機能です。

<!-- section: capabilities -->
## Capabilities

- `/install-github-app` で GitHub CLI availability、auth scopes、repository permissions、existing workflows、existing secrets、selected workflow templates を確認できます。
- User が repository access を持ち、setup path が valid な場合、PR assistant と code review automation 用の GitHub Actions workflow files を作成できます。
- User が key または token を提供する場合、`gh secret set` で repository secrets を設定できます。
- `/review` は `gh pr view` と `gh pr diff` に基づいて local PR review を行います。
- `/ultrareview` は remote review feature が有効で quota/preconditions が許す場合だけ使います。
- `/pr-comments` は GitHub API calls で PR-level と code-review comments を収集します。
- `/security-review` は current branch に新しく追加された high-confidence security findings を対象にします。
- `/commit-push-pr` は branch、commit、push、PR create/update を explicit git safety rules 付きで実行します。
- CI jobs では `--print` と JSON または stream JSON output を使い、deterministic logs と exit codes を得られます。

<!-- section: operational-model -->
## Operational model

GitHub App setup は guided flow です。`gh --version`、`gh auth status -a`、required `repo` and `workflow` scopes、current repository detection、admin access、existing workflow files、existing Actions secrets を確認します。Workflow creation は GitHub API calls で branch を作成し、workflow files を書き、必要に応じて secrets を設定し、PR creation 用の compare URL を開きます。

Review surfaces は意図的に分離されています。`/review` は local かつ prompt-based で、`gh` を通して PR details と diff を確認します。`/ultrareview` は remote review entrypoint で、feature、quota、billing、repository、remote-session preconditions に従います。`/security-review` は branch によって新しく追加された security implications だけを対象にし、一般的な style review ではありません。

Commit/PR automation には explicit safety rules があります。User が求めない限り destructive git commands を使わず、git config を変更せず、hooks を skip せず、likely secret files を commit せず、interactive git commands を使いません。Command は git status、full branch diff、default branch、existing PR state、attribution を集めてから PR を作ります。

CI は publish または merge の前に scripted checks を実行すべきです。Public docs では docs validation、public-content audit、static-site build、coverage matrix checks が期待されます。Code changes では repository の test、lint、type-check、security gates を使います。

<!-- section: configuration -->
## Configuration and commands

- GitHub setup: `/install-github-app`。
- Local PR review: `/review <pr-number>`。
- Enabled remote review: `/ultrareview [pr-number]`。
- PR comments: `/pr-comments`。
- Security review: `/security-review`。
- Commit and PR creation: `/commit-push-pr`。
- CI-safe CCL invocation: `ccl -p "<task>" --output-format json` または `--output-format stream-json`。
- GitHub App setup では、`gh` が installed、authenticated、`repo` と `workflow` scopes を持つことを確認します。
- Docs publishing では、hosted GitHub Pages output に頼る前に local docs checks を実行します。

<!-- section: source-evidence -->
## Source evidence

- `commands/install-github-app/install-github-app.tsx` は GitHub CLI checks、auth-scope checks、repository selection、existing workflow/secret checks、setup UI flow を実装します。
- `commands/install-github-app/setupGitHubActions.ts` は workflow files 作成、secrets 設定、branches 作成、compare URLs open、workflow setup outcomes の記録を行います。
- `commands/review.ts` は local `/review` と gated `/ultrareview` command surfaces を定義します。
- `commands/review/reviewRemote.ts` は remote review preconditions、quota/billing checks、repository resolution、remote launch behavior を実装します。
- `commands/pr_comments/index.ts` は GitHub API-based PR comment retrieval flow を定義します。
- `commands/security-review.ts` は focused security-review command を定義します。
- `commands/commit-push-pr.ts` は commit/PR automation、git safety rules、allowed tools、attribution、PR body structure を定義します。

<!-- section: related -->
## Related pages

- [一般的なワークフロー](common-workflows.md)
- [リモートセッションと自動化](remote-automation.md)
- [権限とセキュリティ](permissions-security.md)
- [Gates と Attestation](gates-attestation.md)
- [公開ドキュメント公開](public-docs.md)
