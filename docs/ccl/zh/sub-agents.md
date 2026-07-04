# 子 Agents

> 本页作为公开文档源维护。Subagents 是独立执行上下文，不是权限绕过。

<!-- section: purpose -->
## Purpose

Subagents 让 CCL session 把聚焦工作委派给单独 context，并带有自己的 system prompt、model selection、tool pool、permission mode、MCP clients、hooks、memory behavior 和 run limits。当分离能提高质量时使用它们：独立 review、并行研究、测试执行、定向探索或专家流程。

<!-- section: capabilities -->
## Capabilities

- 通过 Agent tool、built-in agents、plugin agents 或 custom agent definitions 启动 subagent。
- 运行共享部分父回调的同步 agents，或可独立继续的 background agents。
- 在执行前解析 agent-specific tools 和 MCP tools。
- 将 frontmatter skills 预加载到 agent context。
- 执行 `SubagentStart` hooks，并把 agent stop hooks 转换成 `SubagentStop`。
- 在配置允许时，为 in-process teammate-style agents 保留可查看 transcript 和 tool results。
- 在支持时，通过 message routing 恢复 background 或 in-process agents。

<!-- section: operational-model -->
## Operational model

Subagent execution 从父 session 选择 agent definition 后开始。CCL 会解析 agent model、tool list、MCP clients、additional working directories 和 system prompt。Agent 获得自己的 context 和 messages；它不是简单继承父 session 的无限权限。

同步 agents 共享更多父状态和 abort behavior。Background agents 获得独立 abort controller，并按非交互执行处理，因此父 session 可以继续。Fork-style agents 在 fork feature 启用时可继承更多 context，但仍有 guard 防止递归失控 spawning。

权限仍然有效。Agent-level `tools`、`disallowedTools`、`permissionMode` 和 MCP requirements 会塑造 worker 的可用表面，但不会把不安全任务变安全。Hooks 和 plugin-only policy 也可以阻止或限制 agent lifecycle behavior。

<!-- section: configuration -->
## Configuration and commands

在以下情况使用 subagents：

| 场景 | 推荐 agent 模式 |
| --- | --- |
| 大范围仓库探索 | 只读/搜索 agent，降低写权限。 |
| 独立代码 review | Reviewer agent，使用源码读取工具，不给 edit tools。 |
| 测试执行 | Test-runner agent，允许命令执行并返回简短 pass/fail。 |
| 长时间研究 | Background agent，工具边界明确并要求返回 artifact。 |
| Workflow step | Workflow agent adapter，显式 workflow params 和 expected artifacts。 |

添加自定义 subagent 前，确认 `description` 明确何时使用、tool access 不超过必要范围、MCP dependencies 明确、background behavior 是有意的、memory 避免 secrets，并且 isolation mode 与仓库风险匹配。

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/runAgent.ts` 构建 agent 专属选项，解析工具和 MCP 工具，处理同步/后台中止行为，执行 `SubagentStart` hooks，注册 agent frontmatter hooks，预加载 skills，并创建子 agent 上下文。
- `tools/AgentTool/loadAgentsDir.ts` 解析工具、禁用工具、技能、MCP 服务、hooks、模型、推理强度、权限模式、turn 上限、后台运行、记忆和隔离等 agent 字段。
- `tools/AgentTool/forkSubagent.ts` 定义 fork-subagent behavior，并保护 implicit forks。
- `tools/AgentTool/resumeAgent.ts` 在路由支持时重建和恢复可查看或 background subagent sessions。
- `tools/WorkflowTool/agentAdapter.ts` 将 workflow execution 连接到 agent-backed work。

<!-- section: related -->
## Related pages

- [Agents](agents.md)
- [工作流自动化](workflows.md)
- [内置工具](tools.md)
- [权限与安全](permissions-security.md)
- [Memory 与 Session 管理](memory-sessions.md)
