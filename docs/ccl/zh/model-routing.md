# 网关与模型路由

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 会通过兼容 provider 与 MargayAI 网关部署路由模型请求，同时保留现有 SDK 类型和 wire format 所需的兼容层。

<!-- section: capabilities -->
## 能力范围

- 通过短别名或完整 provider 模型 ID 选择模型。
- 在配置后将非默认模型名路由到网关 transport。
- 启用时使用 compact 与 micro-compact transport 管理上下文。

<!-- section: operational-model -->
## 运行模型

- 模型路由位于工具和 agent 层之下。agent 可以请求某个模型，但请求如何执行由 provider 凭据和网关策略决定。

<!-- section: configuration -->
## 配置与命令

- 使用 gateway、endpoint 和 model 命令做检查。兼容变量名应解释为兼容层，不应作为产品名称使用。

<!-- section: source-evidence -->
## 源码依据

- `services/api/gatewayTransport.ts`
- `services/api/client.ts`
- `commands/gateway/gateway.tsx`
- `commands/model/model.tsx`
- `services/compact`

<!-- section: related -->
## 相关页面

- [配置与设置](configuration.md)
- [认证](authentication.md)
- [Agent](agents.md)
- [故障排查](troubleshooting.md)
