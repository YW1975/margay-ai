# ゲートとアテステーション

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

ゲートとアテステーションは、提出作業をテストコマンド、合否数、変更 case、プロセス証拠、レビュー結果に結びつけ、CCL の納品を監査可能にします。

<!-- section: capabilities -->
## 機能範囲

- 正確なテストコマンドと結果を記録します。
- コードまたは文書変更を受入 case に結びつけます。
- 設定されている場合、証拠不足の提出をポリシーチェックでブロックします。

<!-- section: operational-model -->
## 運用モデル

- ドキュメント作業のゲートは、単体テスト TDD を模倣するのではなく、公開安全性、言語整合、リンク完全性、翻訳品質、ソース正確性を証明すべきです。

<!-- section: configuration -->
## 設定とコマンド

- RLL 提出では attest 行を使い、必要に応じてログを `.dual-agent/harness-results` に保存します。

<!-- section: source-evidence -->
## ソース上の根拠

- `AGENTS.md`
- `gate-manifest.json`
- `.dual-agent`

<!-- section: related -->
## 関連ページ

- [Ralph-Lisa ループ](ralph-lisa-loop.md)
- [確認と計画](clarify-and-planning.md)
- [GitHub と CI ワークフロー](github-ci.md)
