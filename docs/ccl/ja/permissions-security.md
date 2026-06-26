# 権限とセキュリティ

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は権限モード、ツール allowlist、shell とパス検証、PowerShell 安全、hook、sandbox 判断、secret 処理、公開リリース監査で実行を保護します。

<!-- section: capabilities -->
## 機能範囲

- 承認前にファイル書き込み、shell コマンド、MCP 操作、リモート操作を確認します。
- shell 実行には読み取り専用検証、コマンド注入チェック、明示的な allow/deny/ask ルール、破壊的コマンド警告を使います。
- ドキュメントや成果物を公開する前に公開内容監査を実行します。

<!-- section: operational-model -->
## 運用モデル

- セキュリティは層になっています。ある層で許可されたツールでも、方針により別の層でブロックまたは書き換えられることがあります。
- sandbox auto-allow は sandbox サポートと明示的な auto-allow 設定に依存し、明示的な deny/ask ルールは引き続き尊重されます。

<!-- section: configuration -->
## 設定とコマンド

- 関連モジュールは `commands/permissions`、`utils/settings/types.ts`、`tools/BashTool`、`tools/PowerShellTool`、`utils/sandbox`、`services/tools`、`services/teamMemorySync/secretScanner.ts`、公開監査スクリプトです。


<!-- section: source-evidence -->
## ソース上の根拠

- `commands/permissions`
- `utils/settings/types.ts`
- `tools/BashTool`
- `tools/PowerShellTool`
- `utils/sandbox`
- `services/tools/toolExecution.ts`
- `services/teamMemorySync/secretScanner.ts`

<!-- section: related -->
## 関連ページ

- [組み込みツール](tools.md)
- [Hook](hooks.md)
- [プラグイン](plugins.md)
- [GitHub と CI ワークフロー](github-ci.md)
