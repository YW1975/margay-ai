# GitHub 与 CI 工作流

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 包含 GitHub app 设置、commit 与 review 命令、PR 自动化辅助、面向 CI 的 print 模式和公开文档发布工作流。

<!-- section: capabilities -->
## 能力范围

- 在支持时安装 GitHub app 集成。
- 在可用时使用 review、security-review、autofix-pr、commit 和 commit-push-pr 命令。
- 发布 GitHub Pages 前在 CI 中运行文档检查和公开审计。

<!-- section: operational-model -->
## 运行模型

- CI 自动化应确定且可审计。优先使用默认失败的脚本，而不是依赖未说明人工判断的 prompt。

<!-- section: configuration -->
## 配置与命令

- 相关模块：`commands/install-github-app`、`commands/review`、`commands/security-review.ts`、`commands/autofix-pr` 和公共仓 workflow。


<!-- section: source-evidence -->
## 源码依据

- `commands/install-github-app`
- `commands/review`
- `commands/security-review.ts`
- `commands/autofix-pr`
- `commands/commit-push-pr.ts`

<!-- section: related -->
## 相关页面

- [工作流](workflows.md)
- [权限与安全](permissions-security.md)
- [门禁与证明](gates-attestation.md)
- [公开文档发布](public-docs.md)
