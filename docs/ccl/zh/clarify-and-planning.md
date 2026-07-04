# 澄清与计划

> 本页作为公开文档源维护。澄清与计划应降低风险，而不是增加仪式。

<!-- section: purpose -->
## Purpose

Clarification 和 planning 帮助 CCL 在工作变昂贵或危险前消除隐藏假设。当任务范围不清、需要用户独有决策、存在破坏性、存在发布风险，或涉及多个移动部件且错误假设会造成返工时，应使用它们。

<!-- section: capabilities -->
## Capabilities

- 使用 `AskUserQuestion` tool 询问 requirements、preferences 和 implementation choices。
- 使用 `/plan` 进入 plan mode、查看当前 plan，或在 editor 中打开 plan file。
- 当 written plan 准备好审批时，使用 exit-plan-mode tool。
- 在 implementation 前记录 covered scope、negative scope、decisions、risks 和 verification expectations。
- 区分 runtime plan mode 与 RLL `[PLAN]` submissions：前者是权限模式，后者是 Ralph-Lisa review artifact。

<!-- section: operational-model -->
## Operational model

确实需要用户输入时先澄清。问题应足够窄，回答会改变 implementation 或 verification path。不要通过 `AskUserQuestion` 让用户审批 plan；该 UI 中用户看不到 plan。Plan approval 应使用 exit-plan-mode tool。

`/plan` 会把 session permission mode 切换到 plan mode。在 plan mode 中，CCL 为计划而不是编辑准备 permission context。如果已有 plan，`/plan` 会显示它；`/plan open` 会在配置的 editor 中打开 plan file。

RLL planning 是另一层。Ralph `[PLAN]` 是用于 alignment 的 review submission。`[TDD-PLAN]` 是 gated development-start round，用来锁定 test cases 和 quality gates。文档工作仍需要 evidence，但应使用 docs-specific checks，而不是假装每次页面更新都是 unit-test-driven code development。

澄清结果应写成可复核的决定，而不是临时聊天结论。好的澄清记录会说明用户确认的理解、覆盖范围、明确不覆盖的范围、已经选择的 trade-off，以及剩余风险。这样 Lisa 或后续 session 可以判断实现是否偏离原始目标。

<!-- section: configuration -->
## Configuration and commands

有用的 planning surfaces：

| 表面 | 何时使用 | 边界 |
| --- | --- | --- |
| `AskUserQuestion` | 用户决策会改变 scope、preference 或 trade-off。 | 不用于最终 plan approval。 |
| `/plan` | 需要进入 planning mode 或显示当前 plan。 | 它会改变 session permission mode。 |
| `/plan open` | 需要在外部 editor 中编辑 plan。 | 需要可用 editor path。 |
| Exit plan mode tool | Written plan 已准备好审批。 | 除 teammate policy 另行处理外，需要处于 plan mode。 |
| RLL `[PLAN]` | Ralph 和 Lisa 需要 architecture 或 scope alignment。 | 它是 review artifact，不等同 runtime plan mode。 |

文档任务的强计划应列出 source pages、feature coverage、translation expectations、public-safety checks、rendered-site checks 和 reviewer evidence。代码任务的强计划应列出 behavior change、tests、rollback risk 和证明成功的 command。

如果任务范围已经被用户说清楚，计划应尽量短，直接列出要改的文件、验证命令和交付标准。过度询问会降低效率；缺少必要问题则会把风险推迟到实现或发布阶段。

<!-- section: source-evidence -->
## Source evidence

- `commands/plan/plan.tsx` 进入 plan mode，为 plan mode 准备 permission context，显示当前 plan，并支持 `/plan open`。
- `tools/AskUserQuestionTool/prompt.ts` 定义 clarification tool，并明确 plan approval 应使用 exit-plan-mode tool。
- `tools/ExitPlanModeTool/ExitPlanModeV2Tool.ts` 定义 plan-approval tool，校验非 teammate session 是否处于 plan mode，并在需要时询问用户确认。
- `utils/plans.ts` 存储并读取 plan content 和 plan file paths。
- `AGENTS.md` 定义 RLL 中 `[PLAN]` 与 `[TDD-PLAN]` 的拆分。

<!-- section: related -->
## Related pages

- [澄清阶段](clarify-phase.md)
- [门禁系统](gate-system.md)
- [门禁与 Attestation](gates-attestation.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [常见工作流](common-workflows.md)
