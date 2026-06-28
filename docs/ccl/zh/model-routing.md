# 网关与模型路由

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 会通过兼容 provider 与 MargayAI 网关部署路由模型请求，同时保留现有 SDK 类型和 wire format 所需的兼容层。

<!-- section: capabilities -->
## 能力范围

- 通过短别名或完整 provider 模型 ID 选择模型。
- 在配置后将非默认模型名路由到网关 transport。
- 配置 endpoint registry 后，可用 `/endpoint` 固定、取消固定、查看或切换 endpoint。
- 启用时使用 compact 与 micro-compact transport 管理上下文。
- 当当前部署暴露所需 usage 字段时，可检查会话成本、上下文用量和 plan usage 入口。
- 当网关 classifier 返回 `model_suggestion` 和 `routing_table` 字段时，可使用智能路由。

<!-- section: operational-model -->
## 运行模型

- 模型路由位于工具和 agent 层之下。agent 可以请求某个模型，但请求如何执行由 provider 凭据和网关策略决定。
- endpoint 切换会尽可能验证模型兼容性，并可为已配置 endpoint 报告上下文适配信息。
- CCL 会根据响应 usage 字段记录 input、output、cache-read 与 cache-write token 计数，再按已配置模型价格计算会话成本。如果模型价格未知，成本输出会标记为可能不准确。
- 每轮 channel 选择按模型决定。非 Claude 模型在有网关时走配置的网关；Claude 模型在本地有 OAuth 或 first-party API-key auth 时走本地 Claude 认证通道；如果没有本地 Claude auth，已配置网关也可以承载 Claude 请求。
- 在 `auto` 或 `smart` 模式下，CCL 会先向网关 classifier 请求首轮模型建议。后续轮如果存在 routing table，可按 intent 切换模型。如果 classifier 不可用且模型别名仍是 `auto` 或 `smart`，CCL 会落到配置的国产 fallback，而不是静默解析到 Claude 默认模型。

<!-- section: configuration -->
## 配置与命令

- 使用 gateway、endpoint、model、cost、context 和 usage 命令做检查。兼容变量名应解释为兼容层，不应作为产品名称使用。
- 不要仅根据 CCL 文档假设 provider prompt-cache 节省或命中率计量；cache-read 与 cache-write 字段只有在当前 transport 或网关返回可验证 usage 数据时才有意义。
- 设置 `CCL_ROUTING_PRIORITY=cost` 或 `CCL_ROUTING_PRIORITY=quality` 可选择优先使用网关 routing table 中的哪组列表。cost 模式偏向便宜且能完成任务的模型；quality 模式可能按网关策略在 coding 或 debugging 等任务中选择更强 Claude 路由。

## 什么时候使用 Claude

当用户显式选择 Claude 模型、endpoint pin 只允许 Claude 模型、网关 classifier 或 routing table 选中 Claude、或配置的 fallback model 是 Claude 时，会使用 Claude。除此之外，常见双通道部署会让 Claude 调用走 OAuth，并让 DeepSeek、Kimi 等第三方模型走 Margay 网关。

可用 debug file 验证一次会话的真实路由。相关标记包括 `[SmartRoute] model_suggestion=...`、`[SmartRoute] mainLoopModel=...`、`[INTENT-SWITCH] ...`，以及 `[Channel] 3P model=...` 或 `[Channel] Claude→gw ...`。


<!-- section: source-evidence -->
## 源码依据

- `services/api/gatewayTransport.ts`
- `services/api/client.ts`
- `services/api/claude.ts`
- `commands/gateway/gateway.tsx`
- `commands/endpoint/endpoint.tsx`
- `commands/model/model.tsx`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/context/context-noninteractive.ts`
- `commands/usage/index.ts`
- `cost-tracker.ts`
- `utils/modelCost.ts`
- `utils/model/endpointCompat.ts`
- `services/compact`

<!-- section: related -->
## 相关页面

- [配置与设置](configuration.md)
- [环境变量](env-vars.md)
- [认证](authentication.md)
- [Agent](agents.md)
- [故障排查](troubleshooting.md)
