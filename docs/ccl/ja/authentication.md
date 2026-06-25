# 認証

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL はログイン、ログアウト、OAuth 更新、互換デプロイ向け長期トークン設定、MCP 認証フローをサポートします。

<!-- section: capabilities -->
## 機能範囲

- `ccl login` と `ccl logout` でアカウント状態を管理します。
- `ccl auth` で認証管理機能を使います。
- `ccl mcp auth` などの MCP フローで外部サーバーを認可します。
- 対話セッション内で `/gateway login`、`/gateway register`、`/gateway status`、`/gateway doctor`、`/gateway logout` を使い、Margay ゲートウェイ資格情報を管理します。

<!-- section: operational-model -->
## 運用モデル

- 認証状態とモデルルーティングは別の層です。デプロイ方針に応じて、互換 API キー、OAuth セッション、ゲートウェイ資格情報を使います。
- ゲートウェイ認証は可能な場合に `GET /auth/me` で資格情報を検証し、正規化した URL と key を `~/.ccl/gateway.json` に保存し、現在のプロセス環境も更新します。

<!-- section: configuration -->
## 設定とコマンド

- 秘密情報を公開ドキュメントやリポジトリに書かないでください。provider 資格情報は環境変数、安全なローカル設定、管理された secret store に置きます。
- shell の `CCL_GATEWAY_URL` または `CCL_GATEWAY_KEY` が `~/.ccl/gateway.json` と異なる場合、shell 値が優先されます。`/gateway doctor` でこのシャドーイングを検出して説明できます。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/login/login.tsx`
- `commands/logout/logout.tsx`
- `commands/mcp/mcp.tsx`
- `services/oauth`
- `services/mcp/auth.ts`
- `commands/gateway/gateway.tsx`
- `commands/gateway/gateway-helpers.ts`
- `services/gateway/gatewayDoctor.ts`

<!-- section: related -->
## 関連ページ

- [設定](configuration.md)
- [環境変数](env-vars.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [権限とセキュリティ](permissions-security.md)
