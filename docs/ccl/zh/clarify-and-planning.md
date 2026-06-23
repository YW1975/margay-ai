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
