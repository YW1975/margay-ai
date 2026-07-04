# 配置与设置

> 本页作为公开文档源维护。不要发布密钥、私有路径或生成占位内容。

<!-- section: purpose -->
## Purpose

CCL 配置决定运行时能看到什么、使用哪个模型和端点、哪些工具可以运行、哪些扩展面会加载，以及哪些组织策略会覆盖本地偏好。应把设置当作执行契约：会话、子代理、工作流或审阅者读取同一组输入时，应能预测同一套行为。

本页只说明设置层本身。认证、模型路由、权限、MCP、Hooks、插件和 Skills 等专项能力在相关页面中展开。

<!-- section: capabilities -->
## Capabilities

- 从多类来源加载设置：托管策略、用户设置、项目设置、本地项目覆盖、显式 `--settings`、部分 CLI 参数和运行时状态。
- 通过 `env` 设置项配置环境变量，同时避免把密钥提交到项目文档。
- 配置默认模型、可用模型策略、模型覆盖、提交和 PR 署名、Git 指令、会话清理周期、界面行为、默认 shell、worktree 行为和工具权限默认值。
- 通过受 schema 校验的设置配置权限、Hooks、MCP allow/deny 策略、marketplace 来源、已安装插件和 plugin-only 自定义策略。
- 用 `--setting-sources user,project,local` 限制来源加载，以排查 agents、skills、hooks 或项目设置为什么出现或消失。
- 用 `/config` 查看交互式设置；用 `/permissions`、`/mcp`、`/hooks`、`/plugins`、`/skills`、`/agents`、`/model`、`/endpoint` 等命令处理专项配置。

<!-- section: operational-model -->
## Operational model

设置由向后兼容的 schema 校验。新增字段应为可选，未知字段可在编辑后保留，无效设置在修正前不会被使用。这样托管部署可以安全下发新策略，本地旧文件不会被破坏，本地笔误也能被诊断，而不是悄悄改变运行时行为。

最终配置保留来源信息。托管设置可以限制 hooks、权限规则、MCP 服务器和自定义扩展面。项目设置表示团队共享策略。本地项目设置表示个人覆盖。用户设置是全局偏好。CLI 参数和 `--settings` 只影响当前进程，适合 CI、SDK 调用者和一次性自动化。

`--bare` 是特殊的最小启动模式。它跳过自动 hooks、LSP 启动、插件同步、署名、自动记忆、后台预取、钥匙串读取和自动发现 CCL.md。bare 模式下，需要通过 `--system-prompt`、`--append-system-prompt`、`--add-dir`、`--mcp-config`、`--settings`、`--agents` 或 `--plugin-dir` 显式提供上下文。

配置不能替代认证。凭据应放在环境变量、gateway 配置、OAuth 存储、安全存储或托管密钥系统中。公开文档只能说明名称和优先级，不能放真实值。

<!-- section: configuration -->
## Configuration and commands

- 用 `/config` 打开交互式设置界面。
- 用 `--settings <file-or-json>` 注入当前会话专用设置。
- 用 `--setting-sources user,project,local` 排查 `ccl agents` 和相关启动行为的来源可见性。
- 用 `.ccl/settings.json` 保存团队共享项目设置，用 `.ccl/settings.local.json` 保存个人项目覆盖。
- 用 settings `env` 保存非密钥环境默认值；真实凭据使用密钥管理器或 shell 环境。
- 用 `permissions.defaultMode`、`permissions.allow`、`permissions.deny` 和 `permissions.ask` 定义工具策略。
- 用 `allowedMcpServers`、`deniedMcpServers` 和托管 MCP 策略集中控制 MCP 可用性。
- 组织要求 skills、agents、hooks 或 MCP 只能来自批准插件时，使用 `strictPluginOnlyCustomization`。
- 当运行时行为不符合预期时，先看 `/doctor`、`/status`、`/model`、`/endpoint`、`/gateway doctor` 和 `/permissions`。

<!-- section: source-evidence -->
## Source evidence

- `utils/settings/types.ts` 定义 `SettingsSchema`、权限设置、MCP 策略、插件 marketplace 设置、plugin-only 自定义面、环境变量、模型字段、署名、worktree、hooks 和向后兼容规则。
- `utils/settings/settings.ts` 与 `utils/settings/settingsCache.ts` 负责加载、缓存、校验、合并和保留多来源设置。
- `utils/config.ts` 定义全局和项目配置形状，包括项目工具权限、MCP 状态、onboarding 状态、worktree 会话状态和持久化会话指标。
- `commands/config/config.tsx` 将 `/config` 路由到设置界面。
- `main.tsx` 定义 `--settings`、`--setting-sources`、`--bare`、`--mcp-config`、`--plugin-dir`、`--agents`、`--api-key` 和权限相关参数。
- `utils/settings/pluginOnlyPolicy.ts`、`utils/settings/managedPath.ts` 和 `services/remoteManagedSettings` 实现托管和受限配置行为。

<!-- section: related -->
## Related pages

- [认证](authentication.md)
- [环境变量](env-vars.md)
- [网关与模型路由](model-routing.md)
- [权限与安全](permissions-security.md)
- [MCP 服务器与工具](mcp.md)
- [插件](plugins.md)
