# Clarify 阶段

> 此页面来自 CCL 文档清单。若恢复生成流程，请先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 目的

Clarify 阶段用于防止模糊需求变成不可 review 的大范围实现。当任务范围不清、要求冲突、可能破坏数据、发布权限不明，或复杂度足以让隐藏假设造成返工时，应先 clarify。

Clarify 不是仪式。如果用户目标和仓库状态已经决定了下一步安全动作，就继续执行。只有当任务依赖用户才能决定的选择时，才应先记录决策。

<!-- section: capabilities -->
## 能力

- 锁定对用户请求的共同理解。
- 记录 covered scope 和 negative scope，避免实现漂移。
- 在计划绑定前保存用户决策、取舍和已知风险。
- 区分文档任务的不确定性和代码任务的不确定性。
- 给 Lisa 一个稳定 artifact，用于检查方向是否偏离。

<!-- section: operational-model -->
## 运行模型

有效的 clarify artifact 应回答五个问题：

| 字段 | 证明内容 |
|------|----------|
| Understanding | Ralph 能具体复述用户目标。 |
| Covered scope | 工作范围足够明确，可以验证。 |
| Negative scope | 相邻但不做的工作被明确排除。 |
| Decisions | 用户确认过的选择可追溯。 |
| Risks | 已知不确定性在实现前可见。 |

官方文档任务中，clarify 应确认权威发布目标、发布源、什么算当前事实、什么只保留为历史归档，以及是否要求多语言一致。文档 clarify 还应说明没有来源支撑的功能声明如何删除或补证。

需要用户输入时一次只问一个问题。能通过代码搜索或配置确认的问题，不应打包成猜测式问题交给用户。

<!-- section: configuration -->
## 配置和命令

相关 RLL 命令：

| 命令 | 目的 |
|------|------|
| `ralph-lisa clarify --start` | 为复杂任务启动 clarify 流程。 |
| `ralph-lisa clarify --status --json` | 查看 clarify 是否 committed，以及 negative scope 是否锁定。 |
| `ralph-lisa clarify --add-answer <id> "<answer>"` | 记录用户答案。 |
| `ralph-lisa clarify --commit ...` | 固化 understanding、covered scope、negative scope 和 risks。 |
| `ralph-lisa clarify --skip` | 在用户接受风险时显式跳过 clarify。 |

文档-only 任务的 clarify 结果应转化为文档 oracle：source authority、topic coverage、user-spec compliance、logical coherence 和 public safety。除非任务也改变运行时行为，否则不要强行套用代码 TDD 用例。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.dual-agent`
- `gate-manifest.json`

<!-- section: related -->
## 相关页面

- [Clarify and Planning](clarify-and-planning.md#clarify-phase)
- [Complexity System](complexity-system.md)
- [Gates and Attestation](gates-attestation.md)
