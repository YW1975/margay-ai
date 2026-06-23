# 复杂度系统

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

复杂度系统会分类任务风险并建议验证层级。对纯文档 slice，当工作流记录了用户裁决时，可用轻量验收替代仪式化门禁。

<!-- section: capabilities -->
## 能力范围

- 按复杂度和证据需求分类 slice。
- 映射 unit、integration、smoke、security、docs 或 translation check 等层级。
- 显式记录 override，不要静默跳过预期门禁。

<!-- section: operational-model -->
## 运行模型

- 目标是与风险匹配的验证。对文档来说，最相关的门禁是发布安全、链接完整、语言一致、未翻译残留和源码准确性。

<!-- section: configuration -->
## 配置与命令

- 启用时使用项目 RLL policy，并尊重 loop state 中记录的用户明确裁决。

<!-- section: source-evidence -->
## 源码依据

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent/complexity-judge`

<!-- section: related -->
## 相关页面

- [门禁与证明](gates-attestation.md)
- [澄清与计划](clarify-and-planning.md)
- [公开文档发布](public-docs.md)
