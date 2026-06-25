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
