# Gateway and Model Routing

> This page is maintained as public documentation source. Model names and gateway availability are deployment-dependent.

<!-- section: purpose -->
## Purpose

CCL separates model selection from provider transport. Users can choose aliases such as `sonnet`, `opus`, `haiku`, `best`, `auto`, or `smart`, or provide full model identifiers. The runtime then resolves the model, checks allowlists and endpoint compatibility, chooses the correct credential channel, and sends the request through direct client transport or Margay gateway transport.

This separation lets a project use domestic gateway models by default while still supporting explicit direct-provider models, endpoint pins, compact transports, subagent models, and gateway classifier suggestions.

<!-- section: capabilities -->
## Capabilities

- Select a model with `--model`, `/model`, settings `model`, or compatible environment variables.
- Use model aliases, full model IDs, 1M-context aliases where supported, `auto`, and `smart`.
- Default to gateway main-loop and small-fast models when a gateway is configured and no explicit model override wins.
- Route third-party model requests through gateway transport with gateway credentials and SSE-compatible streaming.
- Use endpoint pinning and compatibility checks so an endpoint can reject unavailable models or oversized active context.
- Use `/endpoint`, `/priority`, `/effort`, `/advisor`, `/cost`, `/usage`, `/context`, and `/gateway doctor` as route inspection surfaces.
- Use fallback handling for print-mode overloads and compatible streaming/non-streaming fallback paths.
- Keep usage and cost accounting tied to returned usage fields; unknown model pricing is reported as less certain rather than invented.

<!-- section: operational-model -->
## Operational model

Model selection precedence starts with in-session overrides, then startup flags, environment/settings values, and finally defaults. `utils/model/model.ts` resolves user-specified aliases and built-in defaults. When a gateway config exists, gateway-first defaults can choose a configured main model and a configured small-fast model before direct-provider defaults.

Gateway config is resolved from explicit `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY`, loaded `gateway.json`, or fallback file lookup. A complete explicit environment pair wins; otherwise the persisted file can supply the route. Authentication state is not the same as route state: direct auth can exist while gateway credentials also exist.

Endpoint compatibility is checked in layers. If an endpoint declares a model list, that list is checked first. Otherwise CCL may validate the model against the endpoint. If active messages are provided, context-window fit is checked against endpoint-declared or model-default context limits.

Gateway transport bypasses the direct SDK path for gateway-routed calls. It sends a clean JSON request with bearer auth, CCL user-agent, optional trace tags for gateway logs, SSE parsing, retry on 429/5xx, non-retry on most 4xx, and abort normalization.

Smart routing can use gateway classifier fields such as `model_suggestion`, escalation decisions, and routing tables. Non-escalating classifier replies can be streamed as normal text deltas so print-mode `stream-json` consumers still receive content events.

<!-- section: configuration -->
## Configuration and commands

- Choose a model: `ccl --model <model>`, `/model <model>`, or settings `model`.
- Inspect or pin endpoints: `/endpoint`.
- Select routing preference where supported: `/priority` or `CCL_ROUTING_PRIORITY=cost|quality`.
- Set reasoning effort where supported: `--effort <low|medium|high|max>` or `/effort`.
- Diagnose gateway setup: `/gateway status` and `/gateway doctor`.
- Diagnose route and cost: `/model`, `/endpoint`, `/cost`, `/usage`, `/context`, and debug logs.
- Use `--fallback-model <model>` in print mode when overload fallback is desired.
- Do not infer route correctness from model display text alone; use debug markers, gateway logs, usage fields, and endpoint status.

## Routing Priority: /priority quality|cost

`/priority` without an argument shows the current priority and where it came from (environment, persisted config, or default). `/priority quality` or `/priority cost` sets it, persists it in the global config so it survives restarts, and refreshes the orchestration prompt for the current session.

Resolution order is: `CCL_ROUTING_PRIORITY` environment variable, then the persisted config value, then the default `cost`.

Where the priority takes effect:

- Auto-mode orchestration. When the model setting is `auto` or `smart`, the system prompt carries an orchestration section. Under `quality`, analysis and planning subtasks are always delegated to the Plan or Explore agents, which run on the strongest available overseas model; execution, coding, and tool subtasks stay on domestic models. Under `cost` (default), domestic models run first, with a budget-gated escalation hatch only after repeated failure.
- Planning-pool model resolution. Agents declared with `pool:planning` or `pool:analysis` (for example Plan, Explore, and Debug) resolve directly to the strongest overseas model under `quality`; under `cost` they resolve through the gateway routing table. If no overseas model is available, resolution loudly falls back to domestic routing.
- Routing-table selection. When the gateway classifier returns a routing table, `quality` selects from the `models_quality` list and `cost` from the `models_cost` list, falling back to the shared `models` list.

Where the priority does not take effect:

- With a concrete model setting (anything other than `auto`/`smart`), the orchestration section is disabled and the priority does not change the main-loop model.
- An explicit per-call model on the Agent tool takes precedence over pool resolution, so a pinned subagent model is never overridden by the priority.

<!-- section: source-evidence -->
## Source evidence

- `utils/model/model.ts` defines model override precedence, aliases, gateway-first default main-loop model, small-fast model behavior, and runtime model selection.
- `utils/model/aliases.ts` defines supported model aliases including `auto` and `smart`.
- `utils/model/providers.ts` resolves provider mode and gateway configuration.
- `utils/model/endpointCompat.ts` validates model/endpoint pairing and active context fit.
- `services/api/gatewayTransport.ts` implements gateway streaming, retries, bearer auth, SSE parsing, trace tags, and abort normalization.
- `services/api/claude.ts` implements smart-route replies, usage handling, fallback paths, and gateway error routing.
- `commands/model/model.tsx`, `commands/endpoint/endpoint.tsx`, `commands/priority/priority.tsx`, and `commands/effort/effort.tsx` expose user-facing routing controls.
- `services/api/intentClassifier.ts` resolves the routing priority (environment, persisted config, `cost` default) and selects models from routing-table quality/cost lists.
- `utils/model/agent.ts` resolves `pool:planning` / `pool:analysis` agents to the strongest overseas model under quality priority and hardens fallbacks under cost priority.
- `constants/prompts.ts` emits the auto-mode orchestration section and switches its delegation policy on the routing priority; it returns nothing for concrete model settings.

<!-- section: related -->
## Related pages

- [Authentication](authentication.md)
- [Configuration and Settings](configuration.md)
- [Environment Variables](env-vars.md)
- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Troubleshooting](troubleshooting.md)
