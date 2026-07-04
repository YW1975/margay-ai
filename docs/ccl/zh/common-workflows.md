# 常见工作流

> 本页作为 CCL 公开文档源维护。若将来恢复生成流程，必须先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 用途

CCL 常见工作流是组合 session control、tools、agents、workflows 和 evidence 的可重复方式。它们不是运行时之外的独立功能，而是帮助用户和 guide agent 为任务选择正确 CCL 界面的操作模式。

最好的 workflow 是最小的，同时留下足够证据证明结果。只有通过命令但没有源码准确性、生成了文件但没有检查、或 workflow status 缺少外部验证，都不足以支撑权威工作。

<!-- section: capabilities -->
## 能力

代码修改使用交互式 loop：检查仓库、做聚焦编辑、运行项目 verifier，并总结变更文件和真实测试输出。广泛研究或独立验证可以交给 subagents，但最终编辑和结论应由主 session 负责。

文档工作使用更严格模式：盘点当前公开页面，从源码文件和 CLI 输出推导 feature coverage，写 source-backed content，运行 parity/link/translation checks，构建站点，扫描 rendered HTML，并运行 public-content safety audits。

可重复长任务使用 workflows。Workflow 应声明 inputs、tools、expected artifacts、diagnostics 和 post-run assertion。cron/CI 使用 headless `ccl workflow run`，交互式后台执行使用 `/workflows run`。

自动化和 CI 优先使用 print mode，明确 output format、bounded turns、narrow tool rules 和调用方自己的 timeout。把 stdout 当作 API contract，而不是之后让人类解释的 transcript。

<!-- section: operational-model -->
## 运行模型

先给任务分类：

- 探索性或模糊：interactive session。
- 确定性一次性任务：print mode。
- 可重复多步骤任务：workflow。
- 广泛源码或 web research：subagent，然后主 session 综合。
- 高风险发布或代码交付：带 evidence 的 reviewed loop。

然后定义 proof。代码的 proof 是 tests 和相关 runtime checks。文档的 proof 是 source citations、coverage、build、rendered output 和 safety scans。Workflow 的 proof 是 run state 加 artifact 或外部断言。远程或第三方动作的 proof 应尽可能来自目标系统。

<!-- section: configuration -->
## 配置和命令

有用模式：

- Explore：`rg`、读取关键文件、检查 CLI help/version，然后编辑。
- Verify docs：`node scripts/check-docs.mjs`、`bash scripts/audit-public-content.sh`、`node scripts/build-site.mjs`，再加 rendered HTML spot checks。
- Verify CCL public coverage：`node scripts/check-official-docs-coverage.mjs --check=structure|inventory|agent-scope`。
- Run bounded automation task：`ccl -p "<task>" --output-format json --max-turns 20 --allowed-tools Read Grep Bash`。
- Run workflow：`ccl workflow run <name> --json --params '{"key":"value"}' --expect-artifact out/report.md`。

需要独立审查的变更使用 Ralph-Lisa review。Reviewer 应检查方向、source evidence、tests，以及 success claims 是否强于证据。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx` 和 `cli/print.ts`：定义 interactive vs print-mode surfaces 和 automation controls。
- `commands/workflows/index.ts`、`cli/workflow-run.ts` 和 `tools/WorkflowRun/WorkflowRun.ts`：定义 workflow command surfaces 和 runtime behavior。
- `tools/AgentTool/AgentTool.tsx` 与 `tools/AgentTool/builtInAgents.ts`：提供 subagent delegation surfaces。
- CCL 仓库中的 `scripts/check-official-docs-coverage.mjs`，以及公开文档仓库中的 `scripts/check-docs.mjs` 和 `scripts/audit-public-content.sh`：当前官方文档更新使用的文档验证命令。
- `AGENTS.md`：定义本仓库 reviewed delivery 使用的 RLL review protocol。

<!-- section: related -->
## 相关页面

- [Workflows](workflows.md)
- [交互式会话和 Print Mode](interactive-sessions.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [公开文档发布](public-docs.md)
