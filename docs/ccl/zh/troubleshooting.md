# 故障排查

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

排查 CCL 时先定位失败层：安装、认证、网关路由、MCP、权限、工具、agent、会话状态、远程控制或治理门禁。

<!-- section: capabilities -->
## 能力范围

- 使用 `ccl doctor` 检查环境健康。
- 使用 `/gateway status` 和 `/gateway doctor` 排查网关凭据、连通性、占位值和 shell 环境变量遮蔽问题。
- 配置 endpoint registry 后，使用 `/endpoint status` 排查 endpoint 固定和上下文适配问题。
- 在可用时使用 `/cost`、`/context` 和 `/usage` 区分 token/cost 可见性、上下文窗口压力和 plan limit 状态。
- 使用 MCP 诊断、权限提示和 remote eligibility 错误隔离外部工具或远程会话失败。

<!-- section: operational-model -->
## 运行模型

- 优先收集分层证据，而不是盲目重试。修改配置前记录精确命令、退出码、日志和构建版本。
- 网关故障排查应区分 CCL 运行时问题与网关服务问题。cache 命中计量和 provider usage 字段在 CCL 获得可验证字段之前属于网关证据。
- 公开文档失败时，应分别验证 generator 源、生成后的 Markdown、公共仓同步、审计输出、站点构建和线上目标地址。

<!-- section: configuration -->
## 配置与命令

- 公开 issue 记录应区分 CCL 运行时问题与网关或服务问题，并避免私有 hostname、路径或密钥。
- 排查过期网关配置时，应比较 shell 中的 `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY` 与 `~/.ccl/gateway.json`；只要 shell 值存在，它们会有意优先。
- remote-session 失败应记录具体 precondition 类型，例如 policy blocked、not logged in、no remote environment、not in git repo、no git remote 或 GitHub app missing。

<!-- section: source-evidence -->
## 源码依据

- `commands/doctor`
- `commands/gateway/gateway.tsx`
- `commands/endpoint/endpoint.tsx`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `services/gateway/gatewayDoctor.ts`
- `services/api/errors.ts`
- `utils/background/remote/remoteSession.ts`
- `docs/ccl0622-runtime-issue-record.md`

<!-- section: related -->
## 相关页面

- [安装与更新](installation.md)
- [认证](authentication.md)
- [环境变量](env-vars.md)
- [网关与模型路由](model-routing.md)
- [MCP Server 与工具](mcp.md)
- [远程会话与自动化](remote-automation.md)
- [公开文档发布](public-docs.md)
