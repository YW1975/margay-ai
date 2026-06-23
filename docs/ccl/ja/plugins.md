# プラグイン

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

プラグインはコマンド、MCP 設定、hook、skill、コンポーネント、マーケットプレイス、方針制御された拡張をまとめ、CCL 環境間で再利用できるようにします。

<!-- section: capabilities -->
## 機能範囲

- プラグインのインストール、検証、管理、有効化、無効化、削除、閲覧を行います。
- マーケットプレイスと、許可されたソースに対する組織方針を設定します。
- manifest、marketplace、MCP、hook、component、依存関係の失敗を表示します。

<!-- section: operational-model -->
## 運用モデル

- プラグインはサプライチェーン入力として扱います。プラグイン由来のツールや hook を有効化する前に、manifest を検証し、固定されたソースを優先し、信頼境界を記録してください。

<!-- section: configuration -->
## 設定とコマンド

- `ccl plugin` または `ccl plugins` を使います。公開文書に私有 marketplace URL や token を載せてはいけません。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/plugin`
- `services/plugins`
- `main.tsx`

<!-- section: related -->
## 関連ページ

- [MCP サーバーとツール](mcp.md)
- [Skill](skills.md)
- [Hook](hooks.md)
- [権限とセキュリティ](permissions-security.md)
