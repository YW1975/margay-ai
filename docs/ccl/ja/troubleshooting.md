# トラブルシューティング

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL のトラブルシューティングでは、まず失敗層を特定します。インストール、認証、ゲートウェイルーティング、MCP、権限、ツール、エージェント、セッション状態、リモート制御、統制ゲートです。

<!-- section: capabilities -->
## 機能範囲

- `ccl doctor` で環境状態を確認します。
- gateway と endpoint コマンドでルーティング失敗を調べます。
- MCP 診断と権限プロンプトで外部ツール失敗を切り分けます。

<!-- section: operational-model -->
## 運用モデル

- 広範な再試行より、層ごとの証拠を優先します。設定変更前に正確なコマンド、終了コード、ログ、ビルドバージョンを記録してください。

<!-- section: configuration -->
## 設定とコマンド

- 公開 issue 記録では CCL 実行時問題とゲートウェイまたはサービス問題を分け、私有 hostname、パス、secret を避けてください。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/doctor`
- `services/gateway/gatewayDoctor.ts`
- `services/api/errors.ts`
- `docs/ccl0622-runtime-issue-record.md`

<!-- section: related -->
## 関連ページ

- [インストールと更新](installation.md)
- [認証](authentication.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [リモートセッションと自動化](remote-automation.md)
