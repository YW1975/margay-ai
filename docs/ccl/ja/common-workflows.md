# 一般的なワークフロー

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

一般的な CCL ワークフローは、対話コマンド、ツール、サブエージェント、ワークフロー、統制証拠を組み合わせ、開発、レビュー、デバッグ、文書、公開を行います。

<!-- section: capabilities -->
## 機能範囲

- 編集前に探索し、絞った diff で実装してプロジェクト検証を実行します。
- 広い調査はサブエージェントに委任し、最終編集はメインセッションが責任を持ちます。
- 公開文書の push 前に整合、リンク、未翻訳残留、ソース正確性、ビルド、安全監査を実行します。

<!-- section: operational-model -->
## 運用モデル

- ワークフローは成果物と証拠の両方が揃って初めて成功です。文書作業では、ビルド成功だけでソース正確性がない状態は不十分です。

<!-- section: configuration -->
## 設定とコマンド

- 反復自動化には [ワークフロー](workflows.md)、レビュー付き納品には [Ralph-Lisa ループ](ralph-lisa-loop.md)、安全な文書公開には [公開ドキュメント公開](public-docs.md) を使います。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/workflows`
- `tools/AgentTool`
- `tools/WorkflowTool`
- `AGENTS.md`

<!-- section: related -->
## 関連ページ

- [ワークフロー](workflows.md)
- [エージェント](agents.md)
- [Ralph-Lisa ループ](ralph-lisa-loop.md)
- [公開ドキュメント公開](public-docs.md)
