# Agent

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL agent 是专用执行上下文，用于探索、计划、验证、指南、后台工作和自定义委派任务。

<!-- section: capabilities -->
## 能力范围

- 内置 agent 包括 Explore、Plan、verification、statusline setup、general-purpose 和 CCL guide 角色。
- 自定义和插件 agent 从定义目录加载，可限制工具、模型、MCP 要求、hook、权限、记忆和后台行为。
- agent 可以前台或后台运行，并在支持时通过消息继续交互。

<!-- section: operational-model -->
## 运行模型

- agent 发现会从内置、插件 agent 和自定义 Markdown 定义开始，然后按 MCP 可用性与权限规则过滤 active agent，再暴露给 Agent 工具 prompt。
- 兼容保留的内置 type name 应视为路由标识。面向产品的文档应描述 CCL 角色和行为，而不是旧品牌。

<!-- section: configuration -->
## 配置与命令

- 运行 `ccl agents` 查看已配置 agent。定义格式、作用域、MCP 要求、模型选择、hook、记忆和工具限制见 [子 agent](sub-agents.md)。
- 如果 agent 要求 MCP server，CCL 会短暂等待匹配的 pending server；若仍缺少已认证工具面，会报告缺失项，而不是静默启动 agent。

<!-- section: source-evidence -->
## 源码依据

- `tools/AgentTool/builtInAgents.ts`
- `tools/AgentTool/built-in`
- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/AgentTool.tsx`
- `tools/AgentTool/runAgent.ts`

<!-- section: related -->
## 相关页面

- [子 Agent](sub-agents.md)
- [内置工具](tools.md)
- [Skill](skills.md)
- [权限与安全](permissions-security.md)
