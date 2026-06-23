# Agent

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL agent 是专用执行上下文，用于探索、计划、验证、指南、后台工作和自定义委派任务。

<!-- section: capabilities -->
## 能力范围

- 内置 agent 包括 Explore、Plan、verification、statusline setup 和 CCL guide 角色。
- 自定义 agent 从定义目录加载，可限制工具、模型和行为。
- agent 可以前台或后台运行，并在支持时通过消息继续交互。

<!-- section: operational-model -->
## 运行模型

- 兼容保留的内置 type name 应视为路由标识。面向产品的文档应描述 CCL 角色和行为，而不是旧品牌。

<!-- section: configuration -->
## 配置与命令

- 运行 `ccl agents` 查看已配置 agent。定义格式、作用域、模型选择和工具限制见 [子 agent](sub-agents.md)。

<!-- section: source-evidence -->
## 源码依据

- `tools/AgentTool/builtInAgents.ts`
- `tools/AgentTool/built-in`
- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/runAgent.ts`

<!-- section: related -->
## 相关页面

- [子 Agent](sub-agents.md)
- [内置工具](tools.md)
- [Skill](skills.md)
- [权限与安全](permissions-security.md)
