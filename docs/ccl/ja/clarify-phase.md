# 確認フェーズ

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

確認フェーズは、明示的な合意が必要な task について、実装前にスコープ、除外スコープ、判断、リスクを解決します。

<!-- section: capabilities -->
## 機能範囲

- ユーザーが受け入れた理解を記録します。
- 対象スコープと除外スコープを列挙します。
- 判断とリスクを記録し、後続レビューで scope drift を検出できるようにします。

<!-- section: operational-model -->
## 運用モデル

- 確認は実際の不確実性を取り除くために使います。コードとユーザー指示が十分な方向を示している場合、儀式的な質問をしないでください。

<!-- section: configuration -->
## 設定とコマンド

- clarify 成果物は現在の loop state に属し、実装判断へ影響する場合は引用します。

<!-- section: source-evidence -->
## ソース上の根拠

- `AGENTS.md`
- `.dual-agent`

<!-- section: related -->
## 関連ページ

- [確認と計画](clarify-and-planning.md)
- [Ralph-Lisa ループ](ralph-lisa-loop.md)
- [複雑度システム](complexity-system.md)
