# MCP サーバーとツール

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は Model Context Protocol サーバーを統合し、外部ツール、リソース、prompt、OAuth フロー、IDE ブリッジ、拡張提供機能を扱います。

<!-- section: capabilities -->
## 機能範囲

- `ccl mcp` でサーバーを管理し、reconnect、enable、disable 操作も扱います。
- 組み込みツールで MCP resource を一覧、読み取りし、MCP ツールは `mcp__server__tool` 名で公開されます。
- MCP service で OAuth と channel 権限を処理します。

<!-- section: operational-model -->
## 運用モデル

- MCP サーバーはツール面を広げます。信頼できるサーバーのみ導入し、スコープを制約し、各サーバーが読めるデータや変更できるデータを記録してください。
- リモート認証失敗は短時間 needs-auth 状態としてキャッシュされ、接続再試行のノイズを抑えます。

<!-- section: configuration -->
## 設定とコマンド

- 関連領域は `commands/mcp`、`services/mcp`、`tools/MCPTool`、`tools/ListMcpResourcesTool`、`tools/ReadMcpResourceTool` です。
- MCP transport には stdio、SSE、streamable HTTP、WebSocket/control transport、設定済みの provider-proxy 経路が含まれます。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/mcp`
- `services/mcp`
- `tools/MCPTool`
- `tools/ListMcpResourcesTool`
- `tools/ReadMcpResourceTool`

<!-- section: related -->
## 関連ページ

- [組み込みツール](tools.md)
- [プラグイン](plugins.md)
- [認証](authentication.md)
- [権限とセキュリティ](permissions-security.md)
