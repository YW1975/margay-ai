# CCL 概要

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は MargayAI のコマンドライン型エージェント実行基盤で、対話型開発、非対話自動化、複数エージェント委任、MCP 連携、プラグイン、skill、ワークフロー、統制された開発ループを扱います。

<!-- section: capabilities -->
## 機能範囲

- 対話型ターミナルセッションと print モード自動化。
- ファイル、shell、検索、Web、LSP、タスク、ゴール、チーム、MCP、ワークフロー、レビュー成果物の組み込みツール。
- コマンド、hook、skill、プラグイン、MCP サーバー、カスタムエージェントによる拡張層。

<!-- section: operational-model -->
## 運用モデル

- このページは最上位の地図です。まずクイックスタートを読み、必要な作業に応じて設定、コマンド、ツール、拡張ガイドへ進んでください。

<!-- section: configuration -->
## 設定とコマンド

- CLI エントリポイントは `ccl [prompt]`、`ccl -p`、および [CLI リファレンス](cli-reference.md) のトップレベルサブコマンドです。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `tools`
- `commands`
- `services`

<!-- section: related -->
## 関連ページ

- [クイックスタート](quickstart.md)
- [インストールと更新](installation.md)
- [CLI リファレンス](cli-reference.md)
- [組み込みツール](tools.md)
- [エージェント](agents.md)
