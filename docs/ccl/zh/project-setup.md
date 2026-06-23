# 项目设置

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

适配 CCL 的项目会声明本地指令、设置、权限、扩展目录、可选 MCP 配置，以及与仓库匹配的验证命令。

<!-- section: capabilities -->
## 能力范围

- 项目指令应短且稳定；流程性内容放到 skill、命令或工作流。
- 开发者偏好放本地设置，共享策略放项目设置。
- 依赖自动化前先记录 build、test、lint 和公开审计命令。

<!-- section: operational-model -->
## 运行模型

- 项目设置不只是 onboarding，而是让 agent、工具和 reviewer 在可预测范围内工作的契约。

<!-- section: configuration -->
## 配置与命令

- 使用 `init`、`config`、`permissions`、`mcp`、`agents`、`skills`、`hooks` 和工作流命令显式化项目行为。

<!-- section: source-evidence -->
## 源码依据

- `commands/init.ts`
- `commands/config`
- `commands/permissions`
- `commands/mcp`
- `tools/AgentTool/loadAgentsDir.ts`

<!-- section: related -->
## 相关页面

- [快速开始](quickstart.md)
- [配置与设置](configuration.md)
- [权限与安全](permissions-security.md)
- [MCP Server 与工具](mcp.md)
- [Skill](skills.md)
