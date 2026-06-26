# 常用工作流

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 常用工作流会组合交互命令、工具、子 agent、工作流和治理证据，用于编码、审阅、调试、文档和发布。

<!-- section: capabilities -->
## 能力范围

- 编辑前先探索，然后用聚焦 diff 实现并运行项目验证器。
- 把宽泛研究委派给子 agent，主会话负责最终编辑。
- 公开文档 push 前运行一致性、链接、未翻译残留、源码准确性、构建和安全审计。

<!-- section: operational-model -->
## 运行模型

- 工作流只有在产出和证据都完整时才算成功。对文档工作来说，仅构建通过但缺少源码准确性是不够的。

<!-- section: configuration -->
## 配置与命令

- 可重复自动化使用 [工作流](workflows.md)，受审交付使用 [Ralph-Lisa 循环](ralph-lisa-loop.md)，安全发布文档使用 [公开文档发布](public-docs.md)。


<!-- section: source-evidence -->
## 源码依据

- `commands/workflows`
- `tools/AgentTool`
- `tools/WorkflowTool`
- `AGENTS.md`

<!-- section: related -->
## 相关页面

- [工作流](workflows.md)
- [Agent](agents.md)
- [Ralph-Lisa 循环](ralph-lisa-loop.md)
- [公开文档发布](public-docs.md)
