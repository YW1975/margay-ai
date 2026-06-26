# 組み込みツール

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL ツールはモデルとエージェントが実行できる機能で、shell、ファイル I/O、検索、Web、LSP、計画、タスク、ゴール、チーム、MCP、ワークフロー、レビュー成果物、スケジュール、ユーザー対話を扱います。

<!-- section: capabilities -->
## 機能範囲

- ファイル系ツールは Read、Write、Edit、NotebookEdit、Glob、Grep、LSP 操作です。
- 実行系ツールは Bash、PowerShell、terminal capture、workflow run、scheduled cron、remote trigger です。
- 協調系ツールは AgentTool、SendMessage、Task、Team、Todo、Goal、AskUserQuestion、review artifact です。

<!-- section: operational-model -->
## 運用モデル

- ツールは権限と安全方針のもとで実行されます。読み取り専用ツールでも機密データを prompt に含める可能性があるため、公開文書に実 secret や私有パス例を置かないでください。

<!-- section: configuration -->
## 設定とコマンド

- ツール allowlist、権限モード、hook、管理設定で、プロジェクトまたは環境ごとにツール実行を制約します。


<!-- section: source-evidence -->
## ソース上の根拠

- `tools`
- `services/tools/toolExecution.ts`
- `tools/BashTool`
- `tools/FileReadTool`
- `tools/MCPTool`

<!-- section: related -->
## 関連ページ

- [権限とセキュリティ](permissions-security.md)
- [エージェント](agents.md)
- [MCP サーバーとツール](mcp.md)
- [ワークフロー](workflows.md)
