# Ralph-Lisa ループ

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

Ralph-Lisa ループは CCL プロジェクトの統制機構で、開発者とレビュー担当のターン制協業、明示的な提出、フィードバックラウンド、証拠に基づく納品を扱います。

<!-- section: capabilities -->
## 機能範囲

- 作業または提出前に現在のターンを確認します。
- plan、code、fix、challenge、consensus をファイル経由で提出します。
- テスト結果、アテステーション、Lisa レビュー結果を記録します。

<!-- section: operational-model -->
## 運用モデル

- RLL はワークフロー規律であり、テストの代替ではありません。価値は意思決定、検証、レビュー合意の証拠履歴を残すことです。

<!-- section: configuration -->
## 設定とコマンド

- 主なコマンドは `ralph-lisa whose-turn`、`ralph-lisa read review.md`、`ralph-lisa submit-ralph --file .dual-agent/submit.md` です。

## はじめに

<a id="getting-started"></a>

Ralph-Lisa Loop はターン制の開発・レビュー手順です。Ralph が計画と実装を担当し、Lisa が独立レビューを行い、PASS、NEEDS_WORK、CHALLENGE、CONSENSUS を返します。active loop では、提出前に必ず現在のターンを確認します。standalone セッションでは通常どおりユーザーを支援し、loop 状態を装ってはいけません。

<!-- section: source-evidence -->
## ソース上の根拠

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`

<!-- section: related -->
## 関連ページ

- [確認と計画](clarify-and-planning.md)
- [ゲートとアテステーション](gates-attestation.md)
- [GitHub と CI ワークフロー](github-ci.md)
