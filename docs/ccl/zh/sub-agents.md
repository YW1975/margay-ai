# 子 Agent

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

子 agent 允许 CCL 会话把聚焦任务委派给独立上下文，并为其设置专属指令、工具限制、模型偏好和可选记忆行为。

<!-- section: capabilities -->
## 能力范围

- 使用带 frontmatter 的 Markdown 定义自定义 agent。
- 控制 `name`、`description`、`tools`、`disallowedTools`、`skills`、`mcpServers`、`hooks`、`model`、`effort`、`permissionMode`、`maxTurns`、`background`、`memory` 和指令正文。
- 对长时间研究或检查任务使用后台 agent，同时主会话继续推进。

<!-- section: operational-model -->
## 运行模型

- 子 agent 的 description 是路由信号，应具体、简短，并说明何时使用该 agent。
- agent 级工具规则和权限模式会影响 worker 工具池，但不会公开绕过 CCL 权限策略。

<!-- section: configuration -->
## 配置与命令

- 在用户、项目或本地作用域中使用 agent 目录。对 shell、文件写入和 MCP 访问尤其要使用最小权限工具限制。
- `requiredMcpServers` 会与可用 MCP server 名称匹配；只有满足要求的 agent 才会作为 active agent 显示。

## 本页范围

本页用于定义委派任务 agent，不重复 [Agent](agents.md) 中的高层 registry 模型。当你需要创建、审阅或调试 Markdown/JSON agent 定义时使用本页。

## 定义字段

| 字段 | 控制什么 | 何时使用 |
| --- | --- | --- |
| `description` | 展示给 host model 的路由信号 | 总是需要；应精准、面向动作。 |
| `tools` / `disallowedTools` | 允许或禁止的工具名 | 当 agent 必须只读或限制在特定动作时。 |
| `skills` | 预加载 skill | 当 agent 应使用可重复流程时。 |
| `mcpServers` / `requiredMcpServers` | MCP 配置或可用性要求 | 当 agent 依赖外部工具时。 |
| `model` / `effort` | 模型偏好和 reasoning effort | 当成本、延迟或任务难度需要不同默认值时。 |
| `permissionMode` | 工具审批行为 | 当 agent 需要更严格或更窄执行策略时。 |
| `background` | 后台执行 | 用于长时间研究或检查。 |
| `memory` | 持久记忆作用域 | 仅当重复工作确实受益于存储上下文时。 |

## 安全委派清单

添加自定义子 agent 前，确认 description 说明何时使用；工具访问不超过必要范围；MCP 要求明确；后台行为是有意的；任何持久 memory scope 都不包含不应全局复用的 secret 或项目私有声明。

<!-- section: source-evidence -->
## 源码依据

- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/AgentTool.tsx`
- `tools/AgentTool/agentMemory.ts`
- `tools/AgentTool/agentMemorySnapshot.ts`

<!-- section: related -->
## 相关页面

- [Agent](agents.md)
- [内置工具](tools.md)
- [Skill](skills.md)
- [记忆、上下文与会话](memory-sessions.md)
