# 澄清阶段

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

当任务需要显式对齐时，澄清阶段会在实现前解决范围、负范围、决策和风险。

<!-- section: capabilities -->
## 能力范围

- 记录用户接受的任务理解。
- 列出覆盖范围和负范围。
- 记录决策和风险，让后续审阅能识别 scope drift。

<!-- section: operational-model -->
## 运行模型

- 澄清应消除真实不确定性。当代码和用户指令已提供足够方向时，不要提出仪式性问题。

<!-- section: configuration -->
## 配置与命令

- clarify 产物属于当前 loop state；当它影响实现选择时应引用。

<!-- section: source-evidence -->
## 源码依据

- `AGENTS.md`
- `.dual-agent`

<!-- section: related -->
## 相关页面

- [澄清与计划](clarify-and-planning.md)
- [Ralph-Lisa 循环](ralph-lisa-loop.md)
- [复杂度系统](complexity-system.md)
