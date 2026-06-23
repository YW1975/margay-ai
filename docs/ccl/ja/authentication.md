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

<!-- section: operational-model -->
## 運用モデル

- 認証状態とモデルルーティングは別の層です。デプロイ方針に応じて、互換 API キー、OAuth セッション、ゲートウェイ資格情報を使います。

<!-- section: configuration -->
## 設定とコマンド

- 秘密情報を公開ドキュメントやリポジトリに書かないでください。provider 資格情報は環境変数、安全なローカル設定、管理された secret store に置きます。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/login/login.tsx`
- `commands/logout/logout.tsx`
- `commands/mcp/mcp.tsx`
- `services/oauth`
- `services/mcp/auth.ts`

<!-- section: related -->
## 関連ページ

- [設定](configuration.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [権限とセキュリティ](permissions-security.md)
