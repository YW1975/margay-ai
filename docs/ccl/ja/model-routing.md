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

## ルーティング優先度：/priority quality|cost

`/priority` を引数なしで実行すると、現在の優先度とその由来（環境変数、永続化された設定、または既定値）を表示します。`/priority quality` または `/priority cost` は優先度を設定し、global config に永続化して再起動後も維持し、現在の session の orchestration prompt を更新します。

解決順序：`CCL_ROUTING_PRIORITY` 環境変数が最優先、次に永続化された設定値、最後に既定値 `cost` です。

優先度が効く場所：

- Auto モードのオーケストレーション。model 設定が `auto` または `smart` のとき、system prompt に orchestration セクションが入ります。`quality` では、分析・計画系のサブタスクは常に Plan または Explore agent に委任され、それらは利用可能な最強の海外モデルで動きます。実行・コーディング・tool 系のサブタスクは国内モデルに残ります。`cost`（既定）では国内モデルが先で、繰り返し失敗した後だけ budget 制限付きのエスカレーション経路を使います。
- Planning pool のモデル解決。`pool:planning` または `pool:analysis` を宣言した agents（Plan、Explore、Debug など）は、`quality` では最強の海外モデルに直接解決されます。`cost` では gateway routing table 経由で解決されます。海外モデルが利用できない場合は、明示的に国内ルーティングへフォールバックします。
- Routing table の選択。gateway classifier が routing table を返す場合、`quality` は `models_quality` リストから、`cost` は `models_cost` リストから選択し、どちらも無ければ共有の `models` リストにフォールバックします。

優先度が効かない場所：

- 具体的な model 設定（`auto`/`smart` 以外）では orchestration セクションが無効になり、優先度は main-loop model を変えません。
- Agent tool 呼び出しで明示された model は pool 解決より優先されるため、pin された subagent model が優先度に上書きされることはありません。

<!-- section: source-evidence -->
## Source evidence

- `utils/model/model.ts` は model override precedence、aliases、gateway-first default main-loop model、small-fast model behavior、runtime model selection を定義します。
- `utils/model/aliases.ts` は `auto` と `smart` を含む supported model aliases を定義します。
- `utils/model/providers.ts` は provider mode と gateway configuration を解決します。
- `utils/model/endpointCompat.ts` は model/endpoint pairing と active context fit を検証します。
- `services/api/gatewayTransport.ts` は gateway streaming、retries、bearer auth、SSE parsing、trace tags、abort normalization を実装します。
- `services/api/claude.ts` は smart-route replies、usage handling、fallback paths、gateway error routing を実装します。
- `commands/model/model.tsx`、`commands/endpoint/endpoint.tsx`、`commands/priority/priority.tsx`、`commands/effort/effort.tsx` は user-facing routing controls を公開します。
- `services/api/intentClassifier.ts` は routing priority（環境変数、永続化設定、既定 `cost`）を解決し、routing table の quality/cost リストからモデルを選択します。
- `utils/model/agent.ts` は quality priority で `pool:planning` / `pool:analysis` agents を最強の海外モデルに解決し、cost priority ではフォールバックを堅牢化します。
- `constants/prompts.ts` は auto モードの orchestration セクションを生成し、routing priority で委任ポリシーを切り替えます。具体的な model 設定では生成しません。

<!-- section: related -->
## Related pages

- [認証](authentication.md)
- [設定と構成](configuration.md)
- [環境変数](env-vars.md)
- [インタラクティブセッションと Print Mode](interactive-sessions.md)
- [トラブルシューティング](troubleshooting.md)
