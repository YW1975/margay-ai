# 认证

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 支持登录、登出、OAuth 刷新、兼容部署中的长期 token 设置，以及 MCP 认证流程。

<!-- section: capabilities -->
## 能力范围

- 使用 `ccl login` 和 `ccl logout` 管理账号状态。
- 使用 `ccl auth` 访问认证管理入口。
- 使用 `ccl mcp auth` 及相关 MCP 流程授权外部 server。

<!-- section: operational-model -->
## 运行模型

- 认证状态与模型路由是不同层。部署可以根据策略使用直接兼容 API key、OAuth 会话或网关凭据。

<!-- section: configuration -->
## 配置与命令

- 不要把密钥写入公开文档或仓库。provider 凭据应放在环境变量、安全的本地设置或托管密钥系统中。

<!-- section: source-evidence -->
## 源码依据

- `commands/login/login.tsx`
- `commands/logout/logout.tsx`
- `commands/mcp/mcp.tsx`
- `services/oauth`
- `services/mcp/auth.ts`

<!-- section: related -->
## 相关页面

- [配置与设置](configuration.md)
- [网关与模型路由](model-routing.md)
- [MCP Server 与工具](mcp.md)
- [权限与安全](permissions-security.md)
