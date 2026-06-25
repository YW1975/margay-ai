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

<!-- section: operational-model -->
## 運用モデル

- モデルルーティングはツール層やエージェント層の下にあります。エージェントはモデルを要求できますが、実行経路は provider 資格情報とゲートウェイ方針で決まります。
- endpoint 切り替えでは可能な範囲でモデル互換性を検証し、設定済み endpoint の文脈適合情報を表示できます。
- CCL は応答 usage フィールドから input、output、cache-read、cache-write token カウンタを記録し、設定済みモデル価格からセッションコストを計算します。モデル価格が不明な場合、cost 出力は不正確な可能性があると表示されます。

<!-- section: configuration -->
## 設定とコマンド

- gateway、endpoint、model、cost、context、usage コマンドで状態を確認します。互換変数名は製品名ではなく互換層として説明してください。
- CCL ドキュメントだけで provider prompt-cache の節約やヒット率計測を仮定しないでください。cache-read と cache-write フィールドは、有効な transport またはゲートウェイが検証済み usage データを返す場合だけ意味を持ちます。

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
