# 门禁与证明

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

门禁与证明通过把提交工作关联到测试命令、通过/失败计数、变更 case、过程证据和审阅结论，使 CCL 交付可审计。

<!-- section: capabilities -->
## 能力范围

- 记录精确测试命令和结果。
- 把代码或文档变更关联到验收 case。
- 配置后使用策略检查阻止缺失证据的提交。

<!-- section: operational-model -->
## 运行模型

- 文档工作中的门禁应证明发布安全、语言一致、链接完整、翻译质量和源码准确性，而不是机械模仿单元测试 TDD。

<!-- section: configuration -->
## 配置与命令

- 在 RLL 提交中使用 attest 行，并在适合时把日志保存在 `.dual-agent/harness-results`。

<!-- section: source-evidence -->
## 源码依据

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent`

<!-- section: related -->
## 相关页面

- [Ralph-Lisa 循环](ralph-lisa-loop.md)
- [澄清与计划](clarify-and-planning.md)
- [GitHub 与 CI 工作流](github-ci.md)
