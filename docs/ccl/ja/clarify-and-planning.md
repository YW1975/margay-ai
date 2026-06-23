# 確認と計画

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL の統制は、明示的な確認、スコープ固定、計画、計画モードの開始と終了、計画された作業が実行されたことの検証を支えます。

<!-- section: capabilities -->
## 機能範囲

- 要件が曖昧または高リスクの場合は確認フローを使います。
- 書き込み前の調査と提案には計画モードを使います。
- 実装が受け入れ済み計画に合うか検証ツールで確認します。

<!-- section: operational-model -->
## 運用モデル

- 計画は不確実性を減らすためのものです。ユーザーが軽量な受入経路を明示した場合、儀式化させてはいけません。

<!-- section: configuration -->
## 設定とコマンド

- 関連ツールは `EnterPlanModeTool`、`ExitPlanModeTool`、`VerifyPlanExecutionTool`、planning コマンド、RLL clarify 成果物です。

<!-- section: source-evidence -->
## ソース上の根拠

- `tools/EnterPlanModeTool`
- `tools/ExitPlanModeTool`
- `tools/VerifyPlanExecutionTool`
- `commands/plan`
- `AGENTS.md`

<!-- section: related -->
## 関連ページ

- [Ralph-Lisa ループ](ralph-lisa-loop.md)
- [ゲートとアテステーション](gates-attestation.md)
- [ワークフロー](workflows.md)
