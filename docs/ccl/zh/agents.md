# Agent

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL agent 是专用执行上下文，用于探索、计划、验证、指南、后台工作和自定义委派任务。

<!-- section: capabilities -->
## 能力范围

- 内置 agent 包括 general-purpose、code-reviewer、test-runner、Explore、Plan、verification、statusline setup，以及启用时的 CCL guide 角色。
- 自定义和插件 agent 从定义目录加载，可限制工具、模型、MCP 要求、hook、权限、记忆和后台行为。
- agent 可以前台、后台或 teammate 风格 pair-agent 路径运行，并在支持时通过消息继续交互。

<!-- section: operational-model -->
## 运行模型

- agent 发现会从内置、插件 agent 和自定义 Markdown 定义开始，然后按 MCP 可用性与权限规则过滤 active agent，再暴露给 Agent 工具 prompt。
- 兼容保留的内置 type name 应视为路由标识。面向产品的文档应描述 CCL 角色和行为，而不是旧品牌。
- `/buddy` 命令是 Agent 工具 teammate 路径上的便利 prompt。它会提供 `team_name` 和 teammate `name`，让 helper 通过 team channel 与主会话协作。

<!-- section: configuration -->
## 配置与命令

- 运行 `ccl agents` 查看已配置 agent。定义格式、作用域、MCP 要求、模型选择、hook、记忆和工具限制见 [子 agent](sub-agents.md)。
- 如果 agent 要求 MCP server，CCL 会短暂等待匹配的 pending server；若仍缺少已认证工具面，会报告缺失项，而不是静默启动 agent。

## Agent 与子 Agent 的区别

使用 Agent 页面理解 registry、内置角色、发现顺序和运行时行为。编写或调试 agent 定义时，使用 [子 Agent](sub-agents.md)。这个区分是有意设计的：`agents.md` 是产品和运行时指南；`sub-agents.md` 是定义和委派指南。

## 内置 Agent

| Agent 角色 | 何时使用 | 说明 |
| --- | --- | --- |
| General-purpose | 开放式委派研究或实现支持 | 使用常规 agent 执行路径。 |
| Code reviewer | commit、PR 或交接前对变更做聚焦审查 | 用于 bug 风险、回归、安全和缺失测试审查。 |
| Test runner | 聚焦执行并总结测试命令或 harness run | 当输出可能很长，或测试证据需要简洁 pass/fail 报告时使用。 |
| Explore | 修改前的只读调查 | 运行时可用；不再受已移除的 Explore/Plan feature gate 隐藏。 |
| Plan | 在不立即编辑文件的情况下生成聚焦计划 | 与 Explore 一起在运行时可用。 |
| CCL guide | 回答 CCL 行为、命令、设置、agent、workflow、MCP、plugin 和兼容行为问题 | 源码中的 canonical type name 为兼容保留，但用户面向角色是 CCL guidance。 |
| Statusline setup / verification | 专门的设置或证据检查任务 | 可能依赖构建 flag 或运行时条件。 |

## 发现与过滤

CCL 先从内置 agent 开始，再加载插件和自定义 agent 定义。Active agent 按 `agentType` 去重，后续来源组可根据 loader 顺序覆盖较早定义。Required MCP server 会在 agent 暴露前按可用 server 名称检查。如果 required server 不可用，应诊断为 agent 不可用，而不是静默假设 agent 损坏。

<!-- section: source-evidence -->
## 源码依据

- `tools/AgentTool/builtInAgents.ts`
- `tools/AgentTool/built-in`
- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/AgentTool.tsx`
- `tools/AgentTool/runAgent.ts`
- `commands/buddy/index.ts`

<!-- section: related -->
## 相关页面

- [子 Agent](sub-agents.md)
- [内置工具](tools.md)
- [Skill](skills.md)
- [权限与安全](permissions-security.md)
