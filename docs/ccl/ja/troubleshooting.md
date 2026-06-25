# トラブルシューティング

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL のトラブルシューティングでは、まず失敗層を特定します。インストール、認証、ゲートウェイルーティング、MCP、権限、ツール、エージェント、セッション状態、リモート制御、統制ゲートです。

<!-- section: capabilities -->
## 機能範囲

- `ccl doctor` で環境状態を確認します。
- `/gateway status` と `/gateway doctor` で、ゲートウェイ資格情報、到達性、プレースホルダー、shell 環境変数によるシャドーイングを調査します。
- endpoint registry が設定されている場合、`/endpoint status` で endpoint 固定と文脈適合を診断します。
- 利用可能な場合、`/cost`、`/context`、`/usage` で token/cost 可視性、文脈ウィンドウ圧迫、plan limit 状態を分けます。
- MCP 診断、権限プロンプト、remote eligibility エラーで外部 tool または remote session の失敗を切り分けます。

<!-- section: operational-model -->
## 運用モデル

- 広範な再試行より、層ごとの証拠を優先します。設定変更前に正確なコマンド、終了コード、ログ、ビルドバージョンを記録してください。
- ゲートウェイトラブルシューティングでは、CCL 実行時の問題とゲートウェイサービスの問題を分けて扱います。cache ヒット計測と provider usage フィールドは、CCL が検証済みフィールドを受け取るまではゲートウェイ側の証拠です。
- 公開ドキュメントの失敗では、generator source、生成 Markdown、公開リポジトリ同期、audit 出力、site build、ホスト先を別々に検証します。

<!-- section: configuration -->
## 設定とコマンド

- 公開 issue 記録では CCL 実行時問題とゲートウェイまたはサービス問題を分け、私有 hostname、パス、secret を避けてください。
- 古いゲートウェイ設定を調べる場合、shell の `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY` と `~/.ccl/gateway.json` を比較します。shell 値がある場合は意図的に優先されます。
- remote-session 失敗では、policy blocked、not logged in、no remote environment、not in git repo、no git remote、GitHub app missing など具体的な precondition type を記録してください。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/doctor`
- `commands/gateway/gateway.tsx`
- `commands/endpoint/endpoint.tsx`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `services/gateway/gatewayDoctor.ts`
- `services/api/errors.ts`
- `utils/background/remote/remoteSession.ts`
- `docs/ccl0622-runtime-issue-record.md`

<!-- section: related -->
## 関連ページ

- [インストールと更新](installation.md)
- [認証](authentication.md)
- [環境変数](env-vars.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [リモートセッションと自動化](remote-automation.md)
- [公開ドキュメント公開](public-docs.md)
