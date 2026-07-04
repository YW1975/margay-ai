# ゲートウェイとモデルルーティング

> このページは公開ドキュメントのソースとして保守されています。Model names と gateway availability は deployment に依存します。

<!-- section: purpose -->
## Purpose

CCL は model selection と provider transport を分離します。Users は `sonnet`、`opus`、`haiku`、`best`、`auto`、`smart` などの aliases、または full model identifiers を指定できます。Runtime はその model を解決し、allowlists と endpoint compatibility を確認し、正しい credential channel を選び、direct client transport または Margay gateway transport で request を送ります。

この分離により、project は国内 gateway models を default にしながら、explicit direct-provider models、endpoint pins、compact transports、subagent models、gateway classifier suggestions を併用できます。

<!-- section: capabilities -->
## Capabilities

- `--model`、`/model`、settings `model`、互換 environment variables で model を選択できます。
- Model aliases、full model IDs、対応する 1M-context aliases、`auto`、`smart` を使えます。
- Gateway が設定され、explicit model override が勝っていない場合、gateway main-loop model と small-fast model を default にできます。
- Third-party model requests を gateway credentials と SSE-compatible streaming で gateway transport に送れます。
- Endpoint pinning と compatibility checks により、endpoint は unavailable models または大きすぎる active context を拒否できます。
- `/endpoint`、`/priority`、`/effort`、`/advisor`、`/cost`、`/usage`、`/context`、`/gateway doctor` を route inspection surfaces として使えます。
- Print-mode overloads の fallback と compatible streaming/non-streaming fallback paths を扱えます。
- Usage と cost accounting は returned usage fields に結びつきます。Unknown model pricing は invented されず、不確実として扱われます。

<!-- section: operational-model -->
## Operational model

Model selection precedence は in-session overrides、startup flags、environment/settings values、defaults の順です。`utils/model/model.ts` は user-specified aliases と built-in defaults を解決します。Gateway config が存在する場合、gateway-first defaults は direct-provider defaults より前に configured main model と small-fast model を選べます。

Gateway config は explicit `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY`、loaded `gateway.json`、fallback file lookup から解決されます。Complete explicit environment pair が勝ち、それ以外では persisted file が route を提供できます。Authentication state と route state は同じではありません。Direct auth と gateway credentials は同時に存在し得ます。

Endpoint compatibility は段階的に検査されます。Endpoint が model list を宣言している場合はその list を先に確認します。宣言がない場合、CCL は endpoint に対して model validation を行えます。Active messages がある場合、endpoint-declared または model-default context limits に対して context-window fit を確認します。

Gateway transport は gateway-routed calls で direct SDK path を bypass します。Clean JSON request、bearer auth、CCL user-agent、optional trace tags、SSE parsing、429/5xx retry、多くの 4xx の non-retry、abort normalization を提供します。

Smart routing は gateway classifier fields、たとえば `model_suggestion`、escalation decisions、routing tables を使えます。Non-escalating classifier replies も normal text deltas として stream されるため、print-mode `stream-json` consumers は content events を受け取れます。

<!-- section: configuration -->
## Configuration and commands

- Model selection: `ccl --model <model>`、`/model <model>`、settings `model`。
- Endpoint inspection/pin: `/endpoint`。
- Routing preference: `/priority` または `CCL_ROUTING_PRIORITY=cost|quality`。
- Reasoning effort: `--effort <low|medium|high|max>` または `/effort`。
- Gateway diagnosis: `/gateway status` と `/gateway doctor`。
- Route/cost diagnosis: `/model`、`/endpoint`、`/cost`、`/usage`、`/context`、debug logs。
- Print mode で overload fallback が必要な場合: `--fallback-model <model>`。
- Model display text だけで route correctness を判断しないでください。Debug markers、gateway logs、usage fields、endpoint status を確認します。

<!-- section: source-evidence -->
## Source evidence

- `utils/model/model.ts` は model override precedence、aliases、gateway-first default main-loop model、small-fast model behavior、runtime model selection を定義します。
- `utils/model/aliases.ts` は `auto` と `smart` を含む supported model aliases を定義します。
- `utils/model/providers.ts` は provider mode と gateway configuration を解決します。
- `utils/model/endpointCompat.ts` は model/endpoint pairing と active context fit を検証します。
- `services/api/gatewayTransport.ts` は gateway streaming、retries、bearer auth、SSE parsing、trace tags、abort normalization を実装します。
- `services/api/claude.ts` は smart-route replies、usage handling、fallback paths、gateway error routing を実装します。
- `commands/model/model.tsx`、`commands/endpoint/endpoint.tsx`、`commands/priority/priority.tsx`、`commands/effort/effort.tsx` は user-facing routing controls を公開します。

<!-- section: related -->
## Related pages

- [認証](authentication.md)
- [設定と構成](configuration.md)
- [環境変数](env-vars.md)
- [インタラクティブセッションと Print Mode](interactive-sessions.md)
- [トラブルシューティング](troubleshooting.md)
