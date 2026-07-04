# 网关与模型路由

> 本页作为公开文档源维护。模型名称和 gateway 可用性取决于部署。

<!-- section: purpose -->
## Purpose

CCL 将模型选择和 provider transport 分离。用户可以选择 `sonnet`、`opus`、`haiku`、`best`、`auto`、`smart` 等别名，也可以提供完整模型标识符。运行时随后解析模型，检查 allowlist 和 endpoint compatibility，选择正确凭据通道，并通过 direct client transport 或 Margay gateway transport 发送请求。

这种分离让项目可以默认使用国内 gateway 模型，同时保留显式 direct-provider 模型、endpoint pin、compact transports、subagent models 和 gateway classifier suggestions。

<!-- section: capabilities -->
## Capabilities

- 通过 `--model`、`/model`、settings `model` 或兼容环境变量选择模型。
- 使用模型别名、完整模型 ID、受支持的 1M context 别名、`auto` 和 `smart`。
- 当 gateway 已配置且没有显式模型覆盖时，默认使用 gateway main-loop model 和 small-fast model。
- 将 third-party 模型请求通过 gateway transport、gateway credentials 和兼容 SSE 的 streaming 发送。
- 用 endpoint pinning 与 compatibility checks 让 endpoint 拒绝不可用模型或过大的活动 context。
- 使用 `/endpoint`、`/priority`、`/effort`、`/advisor`、`/cost`、`/usage`、`/context` 和 `/gateway doctor` 作为路由检查入口。
- 支持 print-mode overload fallback，以及兼容 streaming/non-streaming fallback 路径。
- usage 和 cost accounting 只基于返回的 usage fields；未知模型价格会标记为不确定，而不是编造。

<!-- section: operational-model -->
## Operational model

模型选择优先级从会话内 override 开始，然后是启动 flags、环境/settings 值，最后是默认值。`utils/model/model.ts` 解析用户指定别名和内置默认值。当 gateway config 存在时，gateway-first 默认值可以先选择配置的 main model 和 small-fast model，再进入 direct-provider 默认值。

Gateway config 从显式 `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY`、已加载 `gateway.json` 或 fallback 文件读取。一组完整显式环境变量优先；否则持久化文件可以提供 route。认证状态不等于 route 状态：direct auth 和 gateway credentials 可以同时存在。

Endpoint compatibility 按层检查。如果 endpoint 声明了模型列表，先检查该列表。否则 CCL 可以对 endpoint 做模型校验。提供 active messages 时，会根据 endpoint 声明或模型默认 context limit 检查当前上下文是否能放下。

Gateway transport 对 gateway-routed calls 绕过 direct SDK path。它发送干净 JSON 请求，带 bearer auth、CCL user-agent、可选 trace tags、SSE parsing、429/5xx retry、多数 4xx 不 retry，以及 abort normalization。

Smart routing 可以使用 gateway classifier 返回的 `model_suggestion`、escalation decision 和 routing table。非升级的 classifier reply 也会被包装成普通 text deltas，因此 print-mode `stream-json` consumer 仍能收到内容事件。

<!-- section: configuration -->
## Configuration and commands

- 选择模型：`ccl --model <model>`、`/model <model>` 或 settings `model`。
- 检查或固定 endpoint：`/endpoint`。
- 选择路由偏好：`/priority` 或 `CCL_ROUTING_PRIORITY=cost|quality`。
- 设置 reasoning effort：`--effort <low|medium|high|max>` 或 `/effort`。
- 诊断 gateway：`/gateway status` 和 `/gateway doctor`。
- 诊断 route 和 cost：`/model`、`/endpoint`、`/cost`、`/usage`、`/context` 和 debug logs。
- print mode 需要 overload fallback 时，使用 `--fallback-model <model>`。
- 不要只根据模型显示文本判断 route 正确性；应看 debug markers、gateway logs、usage fields 和 endpoint status。

<!-- section: source-evidence -->
## Source evidence

- `utils/model/model.ts` 定义模型 override 优先级、别名、gateway-first 默认 main-loop model、small-fast model 行为和 runtime model selection。
- `utils/model/aliases.ts` 定义支持的模型别名，包括 `auto` 和 `smart`。
- `utils/model/providers.ts` 解析 provider mode 和 gateway configuration。
- `utils/model/endpointCompat.ts` 校验 model/endpoint 配对和 active context fit。
- `services/api/gatewayTransport.ts` 实现网关流式响应、重试、Bearer 认证、SSE 解析、追踪标签和中止错误归一化。
- `services/api/claude.ts` 实现智能路由响应、用量处理、回退路径和网关错误分流。
- `commands/model/model.tsx`、`commands/endpoint/endpoint.tsx`、`commands/priority/priority.tsx` 与 `commands/effort/effort.tsx` 暴露用户路由控制入口。

<!-- section: related -->
## Related pages

- [认证](authentication.md)
- [配置与设置](configuration.md)
- [环境变量](env-vars.md)
- [交互式会话与 Print Mode](interactive-sessions.md)
- [故障排查](troubleshooting.md)
