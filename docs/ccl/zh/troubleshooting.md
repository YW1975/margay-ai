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

## 按症状定位

| 症状 | 先看 | 需要收集的证据 |
| --- | --- | --- |
| `ccl` 无法启动 | [安装](installation.md) | `ccl --version`、shell PATH、安装方式。 |
| 登录或 gateway 失败 | [认证](authentication.md) | `/gateway doctor`、脱敏后的环境变量名、gateway URL 健康状态。 |
| 模型或 provider 不对 | [网关与模型路由](model-routing.md) | 请求的模型、endpoint、usage 字段、路由配置。 |
| 命令缺失 | [命令](commands.md) | 交互式 `/` 列表、构建版本、feature flag 或插件状态。 |
| CLI flag 被拒绝 | [CLI 参考](cli-reference.md) | `ccl --help`、精确命令和 flag。 |
| MCP 工具缺失 | [MCP Server 与工具](mcp.md) | `ccl mcp list`、server 配置、认证状态。 |
| Agent 不可见 | [Agent](agents.md) | `ccl agents --setting-sources user,project,local`、agent 定义路径。 |
| 文档页面损坏 | [公开文档发布](public-docs.md) | 本地 `node scripts/check-ccl-docs.mjs`、公开 URL、构建日志。 |

## Gateway 诊断

修改多个凭据前先运行 `/gateway doctor`。它会检查 effective gateway、文件配置、shell 变量、OAuth/API-key 状态，并在可能时通过 `GET /auth/me` 检查可达性。如果只设置了 `CCL_GATEWAY_URL` 或 `CCL_GATEWAY_KEY` 中的一个，应把它视为损坏的原子配置对：要么两个都设置，要么两个都清理。

## Agent 诊断

运行 `ccl agents --setting-sources user,project,local` 检查可见性。如果 agent 要求 MCP server，确认匹配 server 已配置且已认证。对内置 agent，Explore 和 Plan 已在运行时可用；其他某些 agent 仍可能依赖 feature flag 或 entrypoint 规则。

## 何时升级问题

升级问题时带上小复现：精确命令、脱敏环境变量名、构建版本、期望行为、实际行为，以及最后一段相关诊断输出。不要包含 API key、原始私有路径或含敏感项目内容的完整 transcript。

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
