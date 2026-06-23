# 公开文档发布

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

公开 CCL 文档由经过清理的 Markdown 源生成，检查语言一致和敏感内容后，构建为静态 GitHub Pages 站点。

<!-- section: capabilities -->
## 能力范围

- 只把批准的文档源同步到公共仓。
- push 前阻止密钥、私有路径、source map、环境文件和 key material。
- 构建静态站点，但不提交生成的 map 或依赖目录。

<!-- section: operational-model -->
## 运行模型

- 公共仓是发布面，不是私有源码镜像。每个文件都必须明确适合公开。

<!-- section: configuration -->
## 配置与命令

- 发布前运行 `scripts/audit-public-content.sh`、文档检查和 Pages 构建。

<!-- section: source-evidence -->
## 源码依据

- `docs/ccl-docs`
- `scripts/check-ccl-docs.mjs`

<!-- section: related -->
## 相关页面

- [GitHub 与 CI 工作流](github-ci.md)
- [权限与安全](permissions-security.md)
- [CCL 概览](overview.md)
