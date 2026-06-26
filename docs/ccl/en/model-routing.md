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

<!-- section: operational-model -->
## Operational model

- Model routing happens below the tool and agent layers. Agents can request a model, but provider credentials and gateway policy decide how the request is executed.
- Endpoint switching validates model compatibility where possible and can report context-fit information for configured endpoints.
- CCL records input, output, cache-read, and cache-write token counters from response usage fields, then calculates per-session cost from configured model pricing. If a model cost is unknown, cost output is marked as potentially inaccurate.

<!-- section: configuration -->
## Configuration and commands

- Use gateway, endpoint, model, cost, context, and usage commands for inspection. Keep compatibility variable names documented as compatibility surfaces, not product names.
- Do not assume provider prompt-cache savings or hit-rate accounting from CCL docs alone; cache-read and cache-write fields are meaningful only when the active transport or gateway returns verified usage data.


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
