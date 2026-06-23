# 门禁系统

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

门禁系统把策略变成可运行检查，在缺乏证据或不安全的提交进入审阅或发布前阻止它们。

<!-- section: capabilities -->
## 能力范围

- 验证必需提交段落和 attest 行。
- 运行配置的 test、docs check、audit 和 build 等命令。
- 捕获失败日志，让下一轮 fix 从具体证据开始。

<!-- section: operational-model -->
## 运行模型

- 门禁应足够具体，能因正确原因失败。若 green check 没覆盖所声明的要求，它就是弱证据。

<!-- section: configuration -->
## 配置与命令

- 对公开文档，门禁命令应包括文档一致性、链接、未翻译残留检测、源码证据、公开审计和站点构建。

<!-- section: source-evidence -->
## 源码依据

- `AGENTS.md`
- `gate-manifest.json`
- `scripts/check-ccl-docs.mjs`

<!-- section: related -->
## 相关页面

- [门禁与证明](gates-attestation.md)
- [公开文档发布](public-docs.md)
- [GitHub 与 CI 工作流](github-ci.md)
