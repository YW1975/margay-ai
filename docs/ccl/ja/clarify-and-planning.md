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

## 確認フェーズ

<a id="clarify-phase"></a>

対象リポジトリ、公開/非公開境界、受入条件、除外スコープ、破壊的操作、公開権限などに実際の曖昧さがある場合に確認を使います。良い確認成果物は、ユーザーが受け入れた理解、対象スコープ、除外スコープ、判断、リスクを記録します。コードベースとユーザー指示で次の動きが十分に決まっている場合、儀式的な質問は不要です。

## 複雑度

<a id="complexity"></a>

複雑度分類は検証方法を変える場合にだけ価値があります。文書作業では、ソース正確性、範囲網羅、ユーザー仕様適合、スタイル、論理一貫性、公開安全監査が最も重要です。コードを含む作業では、プロジェクトの gate manifest と合意済み RLL policy を使います。

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
