# ゲートウェイとモデルルーティング

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は互換 provider と MargayAI ゲートウェイ構成へモデル要求をルーティングし、既存 SDK 型や wire format に必要な互換層を維持します。

<!-- section: capabilities -->
## 機能範囲

- 短い別名または完全な provider モデル ID でモデルを選びます。
- 設定済みの場合、既定以外のモデル名をゲートウェイ transport へ送ります。
- endpoint registry が設定されている場合、`/endpoint` で固定、解除、確認、切り替えができます。
- 有効な場合は compact と micro-compact transport で文脈を管理します。
- 現在のデプロイが必要な usage フィールドを公開している場合、セッションコスト、文脈使用量、plan usage 面を確認できます。
- gateway classifier が `model_suggestion` と `routing_table` を返す場合、smart routing を使えます。

<!-- section: operational-model -->
## 運用モデル

- モデルルーティングはツール層やエージェント層の下にあります。エージェントはモデルを要求できますが、実行経路は provider 資格情報とゲートウェイ方針で決まります。
- endpoint 切り替えでは可能な範囲でモデル互換性を検証し、設定済み endpoint の文脈適合情報を表示できます。
- CCL は応答 usage フィールドから input、output、cache-read、cache-write token カウンタを記録し、設定済みモデル価格からセッションコストを計算します。モデル価格が不明な場合、cost 出力は不正確な可能性があると表示されます。
- turn ごとの channel selection はモデルごとに決まります。非 Claude model は、設定済み gateway があれば gateway を使います。Claude model は OAuth または first-party API-key auth がある場合 local Claude auth channel を使います。local Claude auth がない場合は、設定済み gateway が Claude request を運ぶこともあります。
- `auto` または `smart` mode では、CCL は最初の model suggestion を gateway classifier に問い合わせます。routing table がある場合、後続 turn は intent によって model を切り替えられます。classifier が利用できず model alias がまだ `auto` または `smart` の場合、CCL は Claude default に黙って解決せず、設定済み domestic fallback に落とします。

<!-- section: configuration -->
## 設定とコマンド

- gateway、endpoint、model、cost、context、usage コマンドで状態を確認します。互換変数名は製品名ではなく互換層として説明してください。
- CCL ドキュメントだけで provider prompt-cache の節約やヒット率計測を仮定しないでください。cache-read と cache-write フィールドは、有効な transport またはゲートウェイが検証済み usage データを返す場合だけ意味を持ちます。
- `CCL_ROUTING_PRIORITY=cost` または `CCL_ROUTING_PRIORITY=quality` で、gateway routing table のどちらの list を優先するか選びます。cost mode は安価で十分なモデルを優先し、quality mode は gateway policy により coding や debugging などで強い Claude route を選ぶ場合があります。

## Claude が使われる場合

ユーザーが Claude model を明示選択した場合、endpoint pin が Claude model だけを許す場合、gateway classifier または routing table が Claude model を選ぶ場合、または設定済み fallback model が Claude の場合に Claude が使われます。それ以外の一般的な dual-channel deployment では、Claude call は OAuth を使い、DeepSeek、Kimi、その他 third-party model は Margay gateway を使います。

session の実際の route は debug file で確認できます。関連 marker は `[SmartRoute] model_suggestion=...`、`[SmartRoute] mainLoopModel=...`、`[INTENT-SWITCH] ...`、`[Channel] 3P model=...` または `[Channel] Claude→gw ...` です。


<!-- section: source-evidence -->
## ソース上の根拠

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
## 関連ページ

- [設定](configuration.md)
- [環境変数](env-vars.md)
- [認証](authentication.md)
- [エージェント](agents.md)
- [トラブルシューティング](troubleshooting.md)
