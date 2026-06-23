# Gateway and Model Routing

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

CCL routes model requests through compatible providers and MargayAI gateway deployments while preserving compatibility surfaces required by existing SDK types and wire formats.

<!-- section: capabilities -->
## Capabilities

- Select models by short aliases or full provider model identifiers.
- Route non-default model names through gateway transport where configured.
- Use compact and micro-compact transports for context management when enabled.

<!-- section: operational-model -->
## Operational model

- Model routing happens below the tool and agent layers. Agents can request a model, but provider credentials and gateway policy decide how the request is executed.

<!-- section: configuration -->
## Configuration and commands

- Use gateway, endpoint, and model commands for inspection. Keep compatibility variable names documented as compatibility surfaces, not product names.

<!-- section: source-evidence -->
## Source evidence

- `services/api/gatewayTransport.ts`
- `services/api/client.ts`
- `commands/gateway/gateway.tsx`
- `commands/model/model.tsx`
- `services/compact`

<!-- section: related -->
## Related pages

- [Configuration and Settings](configuration.md)
- [Authentication](authentication.md)
- [Agents](agents.md)
- [Troubleshooting](troubleshooting.md)
