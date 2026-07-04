# Complexity System

> 此页面来自 CCL 文档清单。若恢复生成流程，请先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 目的

Complexity system 决定一个任务需要多少 clarify、planning 和 verification。它的作用是让证据强度匹配风险：小修改保持轻量；跨页面、公开发布、安全敏感或多表面任务则需要更深的事前和事后检查。

复杂度不是荣誉标签。它只有在改变工作流时才有价值：是否强制 clarify，是否需要被接受的 development-start plan，需要哪些 gate tier，以及 Lisa 应独立验证哪些证据。

<!-- section: capabilities -->
## 能力

- 在 RLL policy 要求时把任务分类为 simple、standard、complex 或 expert。
- 推荐 unit、smoke、functional、integration、e2e、security、stability、performance 等验证 tier。
- 为高置信 tier 选择附上 source evidence。
- 在代码或文档发布前执行已接受的高风险 tier。
- 区分文档证据和代码证据。

<!-- section: operational-model -->
## 运行模型

使用能诚实覆盖风险的最低复杂度：

| 类别 | 典型场景 | 期望证据 |
|------|----------|----------|
| Simple | 小 typo、单个安全设置、窄范围文案。 | 直接检查或一个聚焦命令。 |
| Standard | 单个功能页、单个命令行为、局部 bug fix。 | 聚焦 source evidence 和回归检查。 |
| Complex | 跨页面文档、CLI/runtime contract、公开发布、迁移、安全敏感内容。 | Clarify、被接受的 plan、source matrix、build/check/security evidence。 |
| Expert | 多系统行为、不可逆迁移、深度安全、广泛自动化或不明外部依赖。 | 分阶段 plan、独立 review、更广 gate、明确剩余风险。 |

文档任务中，complexity 不应自动等于“写单元测试”。文档证据应证明 source accuracy、feature coverage、link integrity、language parity、public safety 和 rendered-site usability。代码任务仍需执行 `gate-manifest.json` 中相关 project gates。

<!-- section: configuration -->
## 配置和命令

相关 artifact 和命令：

| 项目 | 用途 |
|------|------|
| `gate-manifest.json` | 列出 canonical tier ID 和 project type baseline。 |
| `.dual-agent/complexity-judge/` | 保存 complexity judgment artifact。 |
| `ralph-lisa task complexity-judge --slice <name> --extended --json` | 生成结构化任务复杂度判断。 |
| `ralph-lisa task complexity-verify --slice <name>` | 验证 judgment 是否新鲜、schema 有效且符合 policy。 |
| `[TDD-PLAN]` | 高风险或代码相关 slice 的 development-start checkpoint。 |

当任务是 documentation-only 时，要明确为什么文档专用 gate 足够。若任务改变行为，不要因为可见交付物是文档就降低代码 gate。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent/complexity-judge`

<!-- section: related -->
## 相关页面

- [Clarify and Planning](clarify-and-planning.md#complexity)
- [Gates and Attestation](gates-attestation.md#complexity-gates)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
