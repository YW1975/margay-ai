# 澄清与计划

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 治理支持显式澄清、范围锁定、计划、进入和退出计划模式，以及验证计划中的工作是否实际执行。

<!-- section: capabilities -->
## 能力范围

- 需求不明确或高风险时使用澄清流程。
- 使用计划模式先检查和提出方案，再写入。
- 使用验证工具检查实现是否符合已接受计划。

<!-- section: operational-model -->
## 运行模型

- 计划应降低不确定性。用户明确选择轻量验收路径时，计划不应变成仪式。

<!-- section: configuration -->
## 配置与命令

- 相关工具：`EnterPlanModeTool`、`ExitPlanModeTool`、`VerifyPlanExecutionTool`、计划命令和 RLL clarify 产物。

## 澄清阶段

<a id="clarify-phase"></a>

当任务存在真实不确定性时使用澄清：目标仓库、公开/私有边界、验收标准、负范围、破坏性动作或发布权限。好的澄清产物应记录用户接受的理解、覆盖范围、负范围、决策和风险。当代码库和用户指令已经足够明确时，不应提出仪式性问题。

## 复杂度

<a id="complexity"></a>

复杂度分类只有在会改变验证方式时才有价值。对文档工作，最相关的检查是源码准确性、覆盖度、用户要求符合度、风格、逻辑一致性和公开安全审计。对涉及代码的工作，应使用项目 gate manifest 和已接受的 RLL policy。

<!-- section: source-evidence -->
## 源码依据

- `tools/EnterPlanModeTool`
- `tools/ExitPlanModeTool`
- `tools/VerifyPlanExecutionTool`
- `commands/plan`
- `AGENTS.md`

<!-- section: related -->
## 相关页面

- [Ralph-Lisa 循环](ralph-lisa-loop.md)
- [门禁与证明](gates-attestation.md)
- [工作流](workflows.md)
