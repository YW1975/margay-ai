# Ralph-Lisa 循环

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

Ralph-Lisa 循环是 CCL 项目治理机制，用于开发者和审阅者的轮次协作、显式提交、反馈轮次和基于证据的交付。

<!-- section: capabilities -->
## 能力范围

- 工作或提交前检查当前轮次。
- 通过文件提交 plan、code、fix、challenge 和 consensus。
- 记录测试结果、证明和 Lisa 审阅结论。

<!-- section: operational-model -->
## 运行模型

- RLL 是工作流纪律，不是测试替代品。它的价值在于保留决策、验证和审阅共识的证据链。

<!-- section: configuration -->
## 配置与命令

- 常用命令：`ralph-lisa whose-turn`、`ralph-lisa read review.md` 和 `ralph-lisa submit-ralph --file .dual-agent/submit.md`。

## 入门

<a id="getting-started"></a>

Ralph-Lisa Loop 是基于回合的开发与审阅协议。Ralph 负责计划和实现；Lisa 独立审阅，可以通过、要求返工、挑战或达成共识。在 active loop 中，提交前必须先检查当前轮到谁。在 standalone 会话中，应正常帮助用户，不要伪造 loop 状态。

<!-- section: source-evidence -->
## 源码依据

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`

<!-- section: related -->
## 相关页面

- [澄清与计划](clarify-and-planning.md)
- [门禁与证明](gates-attestation.md)
- [GitHub 与 CI 工作流](github-ci.md)
