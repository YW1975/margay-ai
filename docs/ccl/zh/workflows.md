# 工作流

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

工作流定义可重复的多步骤自动化，可运行工具、检查 spec、跟踪运行并发布验证结果。

<!-- section: capabilities -->
## 能力范围

- 创建、列出、重命名、复制、删除、展示、运行、tail、inspect 和导出工作流运行状态。
- 在工作流工具中使用 Bash、Write、Read、Edit 和编译后的 spec。
- 对工作流执行应用 quality guard 与 runtime critic 逻辑。

<!-- section: operational-model -->
## 运行模型

- 需要结构化和验证的可重复操作应使用工作流。一次性交互控制使用普通命令即可。

<!-- section: configuration -->
## 配置与命令

- 相关模块：`commands/workflows`、`tools/WorkflowTool` 和 `tools/WorkflowRun`。

<!-- section: source-evidence -->
## 源码依据

- `commands/workflows`
- `tools/WorkflowTool`
- `tools/WorkflowRun`

<!-- section: related -->
## 相关页面

- [交互式命令](commands.md)
- [内置工具](tools.md)
- [GitHub 与 CI 工作流](github-ci.md)
- [门禁与证明](gates-attestation.md)
