# Workflows

> 本页作为 CCL 公开文档源维护。若将来恢复生成流程，必须先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 用途

Workflows 是 CCL 面向多步骤任务的可重复自动化界面，适合需要结构、工具执行、进度跟踪和验证的工作。当任务预期会重复运行、耗时较长、需要后台进度，或有必须检查的命名产物时，使用 workflow。

不要把 workflow 用于普通的一次性交互工作。如果用户没有要求 workflow，而且任务可以通过普通工具调用完成，应使用常规工具 loop。

<!-- section: capabilities -->
## 能力

CCL 通过交互式和 headless 两类界面暴露 workflows。`/workflows` 列出已保存脚本和最近 runs。`/workflows run <name> [--allow Bash,Write]` 从 TUI 启动 workflow，并返回 run ID 供 tail。`/workflows --tail <runId>`、`--json` 和 `--inspect` 暴露 run state 和 timeline。`/workflows specs`、`rename`、`copy`、`delete` 和 `show` 管理 saved specs。`/workflows new <goal>` 创建交互式 creation payload，并探测相关 skill availability。

Headless 界面是 `ccl workflow run <name-or-path>`。它支持 `--json`、`--dry-run`、`--params <json>`、`--allowed-tools`、`--permission-mode`、`--expect-artifact`、`--allow-empty-result`、`--allow-failed-agents`、`--diagnose`、`--goal` 和 `--run-id`。

Canonical runtime tool 是 `WorkflowRun`。Workflow source files 必须 `export default async function workflow(ctx, params)`。支持的 sandbox tool calls 包括 `Bash`、`Write`、`Read` 和 `Edit`；更宽泛的 agent work 通过 workflow agent adapter 运行。

<!-- section: operational-model -->
## 运行模型

Workflow execution 有三层。Command layer 解析 workflow file 或 spec，校验参数，并选择 TUI 或 headless execution。Runtime layer 校验 workflow contract、运行 engine、dispatch allowed tools、跟踪 phases，并持久化 run state。Quality layer 检查 empty result、failed-empty agents、expected artifacts、diagnostics 和 final status。

`succeeded` 不等于“用户的外部目标已经真实达成”。Workflow 可以验证本地产物、声明输出和自报 run state，但调用方仍需要对发布 URL、部署服务、上传文件或第三方状态变化等外部副作用做客观断言。

对于长时间 TUI run，优先使用 background execution，让终端保持可用。通过 run ID tail，并通过 run state 检查失败原因，而不是依赖单条最终文本。

<!-- section: configuration -->
## 配置和命令

除非文档化配置覆盖 workflows directory，否则 workflow 文件应直接放在 `.ccl/workflows/<name>.js`。导出函数形状必须精确：

```js
export default async function workflow(ctx, params) {
  // use ctx.phase, ctx.agent, ctx.tool, etc.
  return { ok: true }
}
```

操作建议：

- 声明 workflow 所需的最小 `allowedTools`。
- 昂贵运行前使用 `--dry-run` 检查 contract 和 arguments。
- 对必须存在且非空的生成文件使用 `--expect-artifact <path>`。
- 脚本和 CI 使用 `--json`。
- 当 run outcome 需要事后分类时使用 `--diagnose --goal "<goal>"`。
- 不要把 `--dangerously-skip-permissions` 标准化为 workflow 常规路径。

<!-- section: source-evidence -->
## 源码依据

- `commands/workflows/index.ts`：定义 `/workflows` 的列表、运行、跟踪、JSON 输出、检查、规格管理、复制/删除/展示和新建行为。
- `cli/workflow-run.ts`：定义 `ccl workflow run` 的参数解析、无头执行、JSON 输出、诊断、产物门禁和错误展示。
- `tools/WorkflowRun/WorkflowRun.ts`：定义标准 workflow 合约、支持的沙箱工具、后台运行行为和质量门禁提示。
- `tools/WorkflowTool/spec.ts`：定义 workflow 规格 schema 和规格增删改查持久化。
- `tools/WorkflowTool/engine.ts`、`qualityGuard.ts` 和 `runtimeCritic.ts`：实现 workflow 执行和验证行为。

<!-- section: related -->
## 相关页面

- [交互式命令](commands.md)
- [内置工具](tools.md)
- [常见工作流](common-workflows.md)
- [Gates 和 Attestation](gates-attestation.md)
