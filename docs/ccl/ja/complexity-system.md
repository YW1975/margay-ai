# 複雑度システム

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

複雑度システムは task リスクを分類し、検証 tier を提案します。文書専用 slice では、ユーザー承認済みの軽量受入が記録されていれば儀式的ゲートを置き換えられます。

<!-- section: capabilities -->
## 機能範囲

- slice を複雑度と証拠要求で分類します。
- unit、integration、smoke、security、docs、translation check などの tier に対応付けます。
- 期待されたゲートを黙って飛ばすのではなく、明示的 override を記録します。

<!-- section: operational-model -->
## 運用モデル

- 目的はリスクに合う検証です。文書では、公開安全性、リンク完全性、言語整合、未翻訳残留、ソース正確性が最も重要なゲートです。

<!-- section: configuration -->
## 設定とコマンド

- 有効な場合はプロジェクト RLL policy を使い、loop state に記録された明示的なユーザー判断を尊重します。

<!-- section: source-evidence -->
## ソース上の根拠

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent/complexity-judge`

<!-- section: related -->
## 関連ページ

- [ゲートとアテステーション](gates-attestation.md)
- [確認と計画](clarify-and-planning.md)
- [公開ドキュメント公開](public-docs.md)
