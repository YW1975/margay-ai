# RLL 入门

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

RLL 从具体任务 step 开始，经过 Ralph 轮次、基于文件的提交、Lisa 审阅，以及 consensus 或 fix 轮次，直到 slice 关闭。

<!-- section: capabilities -->
## 能力范围

- 工作前运行 `ralph-lisa whose-turn`。
- Lisa feedback 就绪时读取 `review.md`。
- 使用正确 tag 和测试证据，通过 `.dual-agent/submit.md` 提交。

<!-- section: operational-model -->
## 运行模型

- RLL 保护轮次归属和审阅质量，但不替代读代码、跑命令和保持 commit 范围。

<!-- section: configuration -->
## 配置与命令

- 根据当前 step policy 和 Lisa feedback 使用 `[PLAN]`、`[CODE]`、`[FIX]`、`[CHALLENGE]` 和 `[CONSENSUS]`。

<!-- section: source-evidence -->
## 源码依据

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`

<!-- section: related -->
## 相关页面

- [Ralph-Lisa 循环](ralph-lisa-loop.md)
- [门禁与证明](gates-attestation.md)
- [澄清与计划](clarify-and-planning.md)
