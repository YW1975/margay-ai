# 证明记录

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

证明记录说明测试了什么、覆盖了哪些验收 case、过程证据在哪里，以及哪个命令产生了报告结果。

<!-- section: capabilities -->
## 能力范围

- 使用精确命令字符串和通过/失败计数。
- 引用日志文件，不依赖记忆。
- 把文档检查关联到文档验收 case，而不是无关单元测试。

<!-- section: operational-model -->
## 运行模型

- 好的证明记录应窄且可证伪。reviewer 应能重跑命令或查看引用文件。

<!-- section: configuration -->
## 配置与命令

- 在 RLL 提交中，当当前 policy 要求时，应包含 Test-Process、Test-Cases 和 Test-Results 行。

<!-- section: source-evidence -->
## 源码依据

- `AGENTS.md`
- `.dual-agent`

<!-- section: related -->
## 相关页面

- [门禁与证明](gates-attestation.md)
- [Ralph-Lisa 循环](ralph-lisa-loop.md)
- [门禁系统](gate-system.md)
