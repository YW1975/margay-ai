# ゲートウェイとモデルルーティング

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は互換 provider と MargayAI ゲートウェイ構成へモデル要求をルーティングし、既存 SDK 型や wire format に必要な互換層を維持します。

<!-- section: capabilities -->
## 機能範囲

- 短い別名または完全な provider モデル ID でモデルを選びます。
- 設定済みの場合、既定以外のモデル名をゲートウェイ transport へ送ります。
- 有効な場合は compact と micro-compact transport で文脈を管理します。

<!-- section: operational-model -->
## 運用モデル

- モデルルーティングはツール層やエージェント層の下にあります。エージェントはモデルを要求できますが、実行経路は provider 資格情報とゲートウェイ方針で決まります。

<!-- section: configuration -->
## 設定とコマンド

- gateway、endpoint、model コマンドで状態を確認します。互換変数名は製品名ではなく互換層として説明してください。

<!-- section: source-evidence -->
## ソース上の根拠

- `services/api/gatewayTransport.ts`
- `services/api/client.ts`
- `commands/gateway/gateway.tsx`
- `commands/model/model.tsx`
- `services/compact`

<!-- section: related -->
## 関連ページ

- [設定](configuration.md)
- [認証](authentication.md)
- [エージェント](agents.md)
- [トラブルシューティング](troubleshooting.md)
