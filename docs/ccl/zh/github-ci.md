# GitHub 与 CI 工作流

> 本页作为公开文档源维护。不要发布 repository secrets、workflow tokens 或私有 PR 数据。

<!-- section: purpose -->
## Purpose

CCL 包含面向 GitHub 和 CI 的仓库自动化入口：GitHub App setup、workflow creation、repository secret setup、本地 PR review、启用时的 remote review、PR comment retrieval、security review、commit/PR creation 和 deterministic print-mode CI runs。这些功能应让仓库工作更可审计，而不是更不透明。

<!-- section: capabilities -->
## Capabilities

- 用 `/install-github-app` 检查 GitHub CLI 可用性、auth scopes、repository permissions、existing workflows、existing secrets 和 selected workflow templates。
- 当用户有仓库权限且 setup path 有效时，创建 PR assistant 和 code review automation 的 GitHub Actions workflow files。
- 用户选择提供 key 或 token 时，通过 `gh secret set` 设置 repository secrets。
- 用 `/review` 基于 `gh pr view` 和 `gh pr diff` 做本地 PR review。
- 仅在 remote review feature 启用且 quota/preconditions 允许时使用 `/ultrareview`。
- 用 `/pr-comments` 通过 GitHub API 收集 PR-level 和 code-review comments。
- 用 `/security-review` 针对当前 branch 新增的高置信安全风险做审阅。
- 用 `/commit-push-pr` 创建 branch、commit、push，并用明确 git safety rules 创建或更新 PR。
- 在 CI 中用 `--print` 加 JSON 或 stream JSON output 获取确定性日志和 exit codes。

<!-- section: operational-model -->
## Operational model

GitHub App setup 是一个引导流程。它检查 `gh --version`、`gh auth status -a`、所需 `repo` 和 `workflow` scopes、当前仓库检测、admin access、已有 workflow files 和已有 Actions secrets。Workflow creation 使用 GitHub API 创建 branch、写入 workflow files、可选设置 secrets，并打开 compare URL 以创建 PR。

Review surfaces 被刻意分开。`/review` 是本地 prompt-based 流程：要求 CCL 通过 `gh` 检查 PR details 和 diff。`/ultrareview` 是 remote review 入口，受 feature、quota、billing、repository 和 remote-session preconditions 控制。`/security-review` 只关注当前 branch 新增的安全影响，不做普通风格审查。

Commit/PR automation 有明确安全规则：除非用户要求，不运行破坏性 git 命令；不改 git config；除非用户要求，不跳过 hooks；不提交疑似 secret 文件；不运行 interactive git commands。命令会收集 git status、完整 branch diff、default branch、existing PR state 和 attribution，再生成 PR。

CI 应在发布或合并前运行脚本化检查。公开文档的推荐模式是 docs validation、public-content audit、static-site build 和 coverage matrix checks。代码变更应运行仓库自己的 test、lint、type-check 和 security gates。

<!-- section: configuration -->
## Configuration and commands

- GitHub setup：`/install-github-app`。
- 本地 PR review：`/review <pr-number>`。
- 启用时的 remote review：`/ultrareview [pr-number]`。
- PR comments：`/pr-comments`。
- 安全审阅：`/security-review`。
- Commit 和 PR creation：`/commit-push-pr`。
- CI-safe CCL invocation：`ccl -p "<task>" --output-format json` 或 `--output-format stream-json`。
- GitHub App setup 前，确认 `gh` 已安装、已认证，并具备 `repo` 和 `workflow` scopes。
- 文档发布前，先运行本地 docs checks，不要只依赖已托管的 GitHub Pages 输出。

<!-- section: source-evidence -->
## Source evidence

- `commands/install-github-app/install-github-app.tsx` 实现 GitHub CLI 检查、auth-scope 检查、repository selection、existing workflow/secret checks 和 setup UI flow。
- `commands/install-github-app/setupGitHubActions.ts` 创建 workflow files、设置 secrets、创建 branches、打开 compare URLs，并记录 workflow setup outcomes。
- `commands/review.ts` 定义本地 `/review` 和受 gate 控制的 `/ultrareview` 命令入口。
- `commands/review/reviewRemote.ts` 实现远程评审前置检查、额度与计费校验、仓库解析，以及远程任务启动行为。
- `commands/pr_comments/index.ts` 定义基于 GitHub API 的 PR comment retrieval flow。
- `commands/security-review.ts` 定义聚焦的 security-review 命令。
- `commands/commit-push-pr.ts` 定义提交与 PR 自动化、Git 安全规则、允许使用的工具、归因信息和 PR 正文结构。

<!-- section: related -->
## Related pages

- [常见工作流](common-workflows.md)
- [远程会话与自动化](remote-automation.md)
- [权限与安全](permissions-security.md)
- [Gates 与 Attestation](gates-attestation.md)
- [公开文档发布](public-docs.md)
