# ワークフロー

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

ワークフローは再利用可能な複数ステップ自動化で、ツール実行、spec 検査、run の tail、検証結果の公開を行えます。

<!-- section: capabilities -->
## 機能範囲

- ワークフロー状態の作成、一覧、名前変更、コピー、削除、表示、実行、tail、inspect、エクスポートを行います。
- ワークフローツールで Bash、Write、Read、Edit、コンパイル済み spec を使います。
- ワークフロー実行に quality guard と runtime critic を適用します。

<!-- section: operational-model -->
## 運用モデル

- 構造と検証が必要な反復作業にはワークフローを使います。一回限りの対話制御には通常コマンドを使います。

<!-- section: configuration -->
## 設定とコマンド

- 関連モジュールは `commands/workflows`、`tools/WorkflowTool`、`tools/WorkflowRun` です。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/workflows`
- `tools/WorkflowTool`
- `tools/WorkflowRun`

<!-- section: related -->
## 関連ページ

- [対話型コマンド](commands.md)
- [組み込みツール](tools.md)
- [GitHub と CI ワークフロー](github-ci.md)
- [ゲートとアテステーション](gates-attestation.md)
