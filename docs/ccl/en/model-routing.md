# Gateway and Model Routing

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL routes model requests through compatible providers and MargayAI gateway deployments while preserving compatibility surfaces required by existing SDK types and wire formats.

<!-- section: capabilities -->
## Capabilities

- Select models by short aliases or full provider model identifiers.
- Route non-default model names through gateway transport where configured.
- Pin, unpin, inspect, or switch endpoints with `/endpoint` when endpoint registries are configured.
- Use compact and micro-compact transports for context management when enabled.
- Inspect session cost, context usage, and plan-usage surfaces where the current deployment exposes the needed usage fields.
- Use smart routing with gateway classifier results when the gateway returns `model_suggestion` and `routing_table` fields.

<!-- section: operational-model -->
## Operational model

- Model routing happens below the tool and agent layers. Agents can request a model, but provider credentials and gateway policy decide how the request is executed.
- Endpoint switching validates model compatibility where possible and can report context-fit information for configured endpoints.
- CCL records input, output, cache-read, and cache-write token counters from response usage fields, then calculates per-session cost from configured model pricing. If a model cost is unknown, cost output is marked as potentially inaccurate.
- Per-turn channel selection is model-specific. Non-Claude models route through the configured gateway when available. Claude models use local Claude auth when OAuth or first-party API-key auth is available; if no local Claude auth exists, a configured gateway may carry Claude requests.
- In `auto` or `smart` mode, CCL asks the gateway classifier for the first model suggestion. Later turns can switch by intent when a routing table is present. If the classifier is unavailable and the model alias is still `auto` or `smart`, CCL falls back to the configured domestic fallback instead of silently resolving to a Claude default.

<!-- section: configuration -->
## Configuration and commands

- Use gateway, endpoint, model, cost, context, and usage commands for inspection. Keep compatibility variable names documented as compatibility surfaces, not product names.
- Do not assume provider prompt-cache savings or hit-rate accounting from CCL docs alone; cache-read and cache-write fields are meaningful only when the active transport or gateway returns verified usage data.
- Set `CCL_ROUTING_PRIORITY=cost` or `CCL_ROUTING_PRIORITY=quality` to choose which list from the gateway routing table should be preferred. Cost mode favors cheaper capable models; quality mode may select stronger Claude routes for tasks such as coding or debugging depending on gateway policy.

## When Claude Is Used

Claude is used when the user explicitly selects a Claude model, an endpoint pin only allows Claude models, the gateway classifier or routing table selects a Claude model, or a configured fallback model is Claude. Otherwise, the common dual-channel deployment keeps Claude calls on OAuth and sends DeepSeek, Kimi, and other third-party models through the Margay gateway.

Use a debug file to verify the actual route for a session. The relevant markers are `[SmartRoute] model_suggestion=...`, `[SmartRoute] mainLoopModel=...`, `[INTENT-SWITCH] ...`, and `[Channel] 3P model=...` or `[Channel] Claude→gw ...`.


<!-- section: source-evidence -->
## Source evidence

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
## Related pages

- [Configuration and Settings](configuration.md)
- [Environment Variables](env-vars.md)
- [Authentication](authentication.md)
- [Agents](agents.md)
- [Troubleshooting](troubleshooting.md)
