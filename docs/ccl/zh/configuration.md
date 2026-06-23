# 配置与设置

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 会从用户、项目、本地、托管和运行时来源解析设置，并应用到模型路由、权限、工具、MCP、hook、agent、插件、通知和 UI 行为。

<!-- section: capabilities -->
## 能力范围

- 通过 `/config` 和相关命令模块查看、修改设置。
- 区分持久项目策略与本地开发者偏好。
- 通过托管设置和同步服务维护组织级默认值。

<!-- section: operational-model -->
## 运行模型

- 设置会在会话启动前合并，也会被需要感知来源的工具读取，例如 AgentTool 和 MCP 管理。

<!-- section: configuration -->
## 配置与命令

- 排查 agent 可见性时，可在 `ccl agents` 中使用 `--setting-sources user,project,local`。
- 当不同环境有不同路由时，使用 `ccl remote-env`、`ccl endpoint` 和网关设置。

<!-- section: source-evidence -->
## 源码依据

- `tools/ConfigTool`
- `services/settingsSync`
- `services/remoteManagedSettings`
- `commands/config/config.tsx`

<!-- section: related -->
## 相关页面

- [认证](authentication.md)
- [网关与模型路由](model-routing.md)
- [权限与安全](permissions-security.md)
- [Agent](agents.md)
