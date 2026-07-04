# Ralph-Lisa Loop

> 本页作为公开文档源维护。RLL 是协作协议，不是验证替代品。

<!-- section: purpose -->
## Purpose

Ralph-Lisa Loop 是 CCL 项目中的回合制开发者与 reviewer 协作治理。Ralph 负责 planning 和 implementation；Lisa 审查 direction、evidence、changed files 和 test results。Loop 会保留 submissions、feedback、fixes、challenges 和 consensus 的可审计轨迹。

<!-- section: capabilities -->
## Capabilities

- 在采用角色前，检测当前进程是 `ralph`、`lisa` 还是 `standalone`。
- 在 work、review 或 submission 前检查当前是谁的 turn。
- 通过文件提交 work 和 reviews，避免 shell escaping 问题。
- 使用明确 tags，例如 `[PLAN]`、`[TDD-PLAN]`、`[CODE]`、`[FIX]`、`[PASS]`、`[NEEDS_WORK]`、`[CHALLENGE]` 和 `[CONSENSUS]`。
- 保留测试结果、证明记录、Lisa 审阅理由和双方共识。
- 允许 Lisa 拒绝方向错误、证据缺失、橡皮图章式通过或未处理审阅反馈的工作。

<!-- section: operational-model -->
## Operational model

每个 loop-aware session 先运行 `ralph-lisa session-role`。直接启动的 standalone session 应作为普通 assistant 工作，不运行 turn protocol。Ralph 或 Lisa loop seat 必须在行动前运行 `ralph-lisa whose-turn`。如果不是该 agent 的 turn，就不能 submit work。

Ralph 通过 `.dual-agent/submit.md` 和 `ralph-lisa submit-ralph --file` 提交 plans、code、fixes、challenges 和 consensus。Lisa 读取 Ralph work，按 task direction 和 evidence review，并通过 `ralph-lisa submit-lisa --file` 提交。避免 inline submission，因为 tags、quotes、shell expansion 和 Markdown 都可能破坏 command arguments。

RLL 区分 architecture `[PLAN]` 和 gated `[TDD-PLAN]`。文档、计划和 process-only work 仍需要 proof，但 proof 应是 source accuracy、publication safety、language parity、rendered output 和 coverage checks。除非任务真正改变 code behavior，否则不应强行套用 code-unit-test TDD。

<!-- section: configuration -->
## Configuration and commands

核心 loop commands：

| 命令 | 目的 |
| --- | --- |
| `ralph-lisa session-role` | 判断当前进程是 Ralph、Lisa 还是 standalone。 |
| `ralph-lisa whose-turn` | 检查现在 Ralph 或 Lisa 是否可以行动。 |
| `ralph-lisa read review.md` | Ralph 读取 Lisa 最新反馈。 |
| `ralph-lisa read work.md` | Lisa 读取 Ralph 最新提交。 |
| `ralph-lisa submit-ralph --file .dual-agent/submit.md` | Ralph 提交 work 并把 turn 交给 Lisa。 |
| `ralph-lisa submit-lisa --file .dual-agent/submit.md` | Lisa 提交 review 并把 turn 交给 Ralph。 |
| `ralph-lisa status` | 查看当前 round、step、turn 和 watcher status。 |
| `ralph-lisa recap` | 在 context compaction 后恢复状态。 |

Review discipline：

- 实质 PASS 应引用 files、lines、claims 和 verification results。
- Ralph 对 rubber-stamp PASS 最多 challenge 一次。
- NEEDS_WORK 需要 reasoning；Ralph 应解释为什么 Lisa 是对的，或提交 challenge。
- 只有双方同意后，consensus 才关闭已 review 的 slice。

<!-- section: source-evidence -->
## Source evidence

- `AGENTS.md` 定义 Ralph 角色检测、回合检查、基于文件的 Ralph 提交、标签、阶段边界、PASS/NEEDS_WORK 处理、测试结果要求，以及 `[PLAN]` 与 `[TDD-PLAN]` 的拆分。
- `CODEX.md` 定义 Lisa 角色检测、回合检查、基于文件的 Lisa 提交、任务对齐审阅、WeCom 反馈读取、PASS/NEEDS_WORK 规则和实质审阅要求。
- `AGENTS.md` 记录 standalone sessions 不应采用 loop protocol，并应告诉用户如何启动 RLL。
- `AGENTS.md` 记录 code/fix 提交需要真实测试结果和证明记录行。
- `CODEX.md` 记录 Lisa 在审代码细节前先检查 task alignment 的职责。

<!-- section: related -->
## Related pages

- [门禁与 Attestation](gates-attestation.md)
- [门禁系统](gate-system.md)
- [澄清与计划](clarify-and-planning.md)
- [澄清阶段](clarify-phase.md)
- [常见工作流](common-workflows.md)
