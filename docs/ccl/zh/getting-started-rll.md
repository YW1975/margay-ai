# RLL 入门

> 此页面来自 CCL 文档清单。若恢复生成流程，请先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 目的

Ralph-Lisa Loop（RLL）是 CCL 在需要可审查交付时使用的双 agent 工作流。它适用于发布、公共文档、大范围重构、安全敏感修改、长时间自动化任务，以及任何“正确性比速度更重要”的工作。

本页是操作员入口。完整协议见 [Ralph-Lisa Loop](ralph-lisa-loop.md)，证据格式见 [Gates and Attestation](gates-attestation.md)。

<!-- section: capabilities -->
## 能力

- 用 Ralph 作为主实现者、Lisa 作为独立 reviewer 启动双 agent 协作。
- 在 `.dual-agent` 下保留 turn 历史、提交内容、review、测试证据和 consensus。
- 通过 plan、research、code、fix、challenge、consensus 等标签建立明确检查点。
- 通过终端 pane 和配置的通知通道让远程 operator 了解进展。
- 对文档任务使用文档专用证据，而不是用无关单元测试冒充内容质量证明。

<!-- section: operational-model -->
## 运行模型

RLL 是 turn-based。Ralph 只能在 Ralph turn 工作并提交带标签的 artifact，然后等待。Lisa 读取工作、检查任务方向和证据，并返回 `[PASS]`、`[NEEDS_WORK]`、`[CHALLENGE]`、`[QUESTION]` 或 `[CONSENSUS]`。PASS 不是最终完成；Ralph 必须用实质性 consensus 接受，Lisa 再确认 mutual consensus。

最小心智模型：

| 阶段 | Ralph 责任 | Lisa 责任 | 应保留证据 |
|------|------------|-----------|------------|
| Plan | 写清目标、范围、交付物、风险和验证方式。 | 检查方向和缺失验收条件。 | plan 表、clarify 决策、source evidence。 |
| Code 或 docs | 完成限定修改并运行计划中的检查。 | 独立复跑或检查结果。 | 变更文件、测试日志、截图或构建输出。 |
| Fix | 说明为什么反馈成立，或用证据 challenge。 | 验证 fix 是否正对问题。 | 失败输出、修正后的命令、前后对比证据。 |
| Consensus | 接受实质 PASS 并说明剩余风险。 | 确认不是 rubber stamp。 | PASS 理由、consensus 文本、cascade 结果。 |

不要越过 turn 边界继续工作。如果当前是 Lisa turn，Ralph 可以做只读准备，但不能提交新工作，也不应修改正在被 review 的文件。

<!-- section: configuration -->
## 配置和命令

常用命令：

| 命令 | 使用场景 |
|------|----------|
| `ralph-lisa session-role` | 确认当前进程是 Ralph、Lisa 还是 standalone。 |
| `ralph-lisa start` | 为任务启动双 agent loop。 |
| `ralph-lisa whose-turn` | 查看当前由谁行动。 |
| `ralph-lisa read review.md` | 读取 Lisa 最新 review。 |
| `ralph-lisa submit-ralph --file .dual-agent/submit.md` | 从文件安全提交 Ralph 工作。 |
| `ralph-lisa status` | 查看 step、round、turn 和 watcher heartbeat。 |
| `ralph-lisa recap` | 在上下文压缩后恢复当前状态。 |

验证配置时，从小而具体的任务开始。文档任务优先使用站点构建、链接检查、source evidence 检查、内容安全扫描和生成页面存在性检查。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`
- `.dual-agent`
- `gate-manifest.json`

<!-- section: related -->
## 相关页面

- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Gates and Attestation](gates-attestation.md)
- [Clarify and Planning](clarify-and-planning.md)
