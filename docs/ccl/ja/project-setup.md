# プロジェクト設定

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL 対応プロジェクトは、ローカル指示、設定、権限、拡張ディレクトリ、任意の MCP 設定、リポジトリに合う検証コマンドを宣言します。

<!-- section: capabilities -->
## 機能範囲

- プロジェクト指示は短く安定させ、手順は skill、コマンド、ワークフローへ移します。
- 開発者設定はローカル設定、共有方針はプロジェクト設定に置きます。
- 自動化に頼る前に build、test、lint、公開監査コマンドを記録します。

<!-- section: operational-model -->
## 運用モデル

- プロジェクト設定は onboarding だけではありません。エージェント、ツール、レビュー担当が予測可能な範囲で動くための契約です。

<!-- section: configuration -->
## 設定とコマンド

- `init`、`config`、`permissions`、`mcp`、`agents`、`skills`、`hooks`、ワークフローコマンドでプロジェクト動作を明示します。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/init.ts`
- `commands/config`
- `commands/permissions`
- `commands/mcp`
- `tools/AgentTool/loadAgentsDir.ts`

<!-- section: related -->
## 関連ページ

- [クイックスタート](quickstart.md)
- [設定](configuration.md)
- [権限とセキュリティ](permissions-security.md)
- [MCP サーバーとツール](mcp.md)
- [Skill](skills.md)
