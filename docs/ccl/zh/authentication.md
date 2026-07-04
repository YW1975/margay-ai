# 认证

> 本页作为公开文档源维护。不要发布真实 token、邀请码或私有 gateway URL。

<!-- section: purpose -->
## Purpose

CCL 支持多条认证通道：Margay gateway 凭据、直接 API key、Claude 账号 OAuth、兼容供应商凭据，以及 MCP 服务器自己的 OAuth 流程。正确通道取决于所选模型、部署策略和命令入口。认证和模型路由被刻意分离，因此“我是否已登录”和“这个模型会走哪个端点”是两个需要分别诊断的问题。

<!-- section: capabilities -->
## Capabilities

- 在交互式会话中用 `/gateway register`、`/gateway login`、`/gateway status`、`/gateway doctor` 和 `/gateway logout` 管理 Margay gateway 凭据。
- 用 `ccl auth login`、`ccl auth status` 和 `ccl auth logout` 管理 Claude 账号认证。
- 用 `/login` 和 `/logout` 作为交互式账号命令。
- 用 `ANTHROPIC_API_KEY` 或 `--api-key` 启动直接 API-key 会话。
- 需要显式选择兼容端点时，用 `ANTHROPIC_BASE_URL`。
- 外部 MCP 服务器需要 OAuth 或身份提供方登录时，使用 MCP 认证命令。
- 部署支持时，用 `setup-token` 配置长期 token。
- 用 `/gateway doctor`、`ccl auth status`、`/status`、`/doctor` 和模型路由诊断来排查混合或过期状态。

<!-- section: operational-model -->
## Operational model

Gateway 认证会把规范化后的 gateway URL 和 key 保存到 CCL 配置目录下的 `gateway.json`。启动时，gateway bootstrap 会把该文件加载到 `CCL_GATEWAY_URL` 和 `CCL_GATEWAY_KEY`，除非 shell 中已经存在一组完整且显式的环境覆盖。这样既避免 URL/key 来自不同来源，又保留用户有意设置的 shell 覆盖。

Gateway login 在启用校验时使用 `GET /auth/me` 验证凭据。Gateway register 会把邀请码和可选用户信息提交到 `/register`，然后保存 gateway 返回的凭据：现代 JWT 风格的 `token` 或旧兼容网关的 `api_key`。

Gateway URL 的优先级是显式环境变量、`gateway.json`、内置默认 gateway URL。只有 URL 不代表已经认证；仍然需要 key。如果 shell 中的 `CCL_GATEWAY_URL` 或 `CCL_GATEWAY_KEY` 覆盖了 `gateway.json`，`/gateway doctor` 会报告冲突并给出 unset 或重新 login 的修复建议。

Claude 直接认证是独立通道。`ANTHROPIC_API_KEY`、OAuth token 和 gateway 凭据可以同时存在，但实际路由取决于所选模型和供应商兼容性。Gateway doctor 会分别报告 Claude-direct 与 gateway 的登录/配置状态。

<!-- section: configuration -->
## Configuration and commands

- Gateway 注册：`/gateway register [url] <invite-code> [username] [email] [phone]`。省略 URL 时使用默认 gateway URL。
- Gateway 登录：`/gateway login <url> <key>`。
- Gateway 状态：`/gateway status` 或 `/gateway`。
- Gateway 诊断：`/gateway doctor`。
- Gateway 登出：`/gateway logout`。
- Claude 账号 CLI 认证：`ccl auth login`、`ccl auth status`、`ccl auth logout`。
- 直接 API-key 会话：`ANTHROPIC_API_KEY=<key> ccl ...` 或 `ccl --api-key <key> ...`。
- 不要把真实 API key、gateway token、OAuth token 或邀请码提交到文档、设置、示例或截图。

<!-- section: source-evidence -->
## Source evidence

- `bootstrap/gatewayConfig.ts` 定义 gateway 配置加载、`gateway.json`、显式环境覆盖行为和默认 gateway URL 解析。
- `commands/gateway/gateway.tsx` 实现 `/gateway status`、`login`、`logout`、`doctor` 和 `register`。
- `commands/gateway/gateway-helpers.ts` 用 `GET /auth/me` 校验 gateway login，持久化凭据，解析注册参数，并兼容现代与旧版 gateway 凭据字段。
- `services/gateway/gatewayDoctor.ts` 检测占位值、过期环境覆盖、缺失 gateway 配置和 API-key/OAuth 冲突。
- `main.tsx` 定义 `auth login/status/logout`、`setup-token`、`--api-key`、`--base-url`、`--bare` 和认证初始化流程。
- `services/mcp/auth.ts` 与 `commands/mcp/mcp.tsx` 实现 MCP 相关认证入口。

<!-- section: related -->
## Related pages

- [配置与设置](configuration.md)
- [网关与模型路由](model-routing.md)
- [环境变量](env-vars.md)
- [MCP 服务器与工具](mcp.md)
- [故障排查](troubleshooting.md)
