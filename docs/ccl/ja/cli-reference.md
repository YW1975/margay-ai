# CLI リファレンス

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

`ccl` バイナリは対話入口、print モード、MCP 管理、server とリモート接続、認証、プラグイン管理、エージェント、自動化、更新、shell completion を提供します。

<!-- section: capabilities -->
## 機能範囲

- トップレベルコマンドには `mcp`、`server`、`ssh`、`open`、`auth`、`plugin`、`agents`、`auto-mode`、`doctor`、`update`、`install`、`completion` があります。
- 対話型 slash command は [コマンド](commands.md) に分けて記載します。利用可能な場合は cost、context、usage、gateway、endpoint、remote-control 面も含みます。
- 内部用途コマンドを安定した公開自動化 API として記載しないでください。

<!-- section: operational-model -->
## 運用モデル

- CLI リファレンスは安定した利用者向け動作を説明します。ソース上のヘルプが内部用途やデプロイ固有と示すコマンドは、公開契約ではなく運用上の文脈として扱います。

<!-- section: configuration -->
## 設定とコマンド

- 導入済みビルドで `ccl --help` と `ccl <command> --help` を実行し、そのビルドで利用できるコマンド面を確認します。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`

<!-- section: related -->
## 関連ページ

- [対話型コマンド](commands.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [プラグイン](plugins.md)
- [エージェント](agents.md)
- [リモートセッションと自動化](remote-automation.md)
