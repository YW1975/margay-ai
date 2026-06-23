# CCL CLI 互換リファレンス

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

この互換リファレンスは以前の公開 slug を保ちつつ、現在の CCL CLI コマンド面と安定性ガイドへ案内します。

<!-- section: capabilities -->
## 機能範囲

- 現在のコマンド一覧は [CLI リファレンス](cli-reference.md) を参照します。
- 対話型 slash command は [コマンド](commands.md) を参照します。
- server、open、SSH、bridge フローは [リモートセッションと自動化](remote-automation.md) を参照します。

<!-- section: operational-model -->
## 運用モデル

- 互換ページはリンク切れを避けるために維持します。古いコマンド詳細を重複させないでください。

<!-- section: configuration -->
## 設定とコマンド

- 対象ビルドで `ccl --help` を実行し、正確な現在の構文を確認します。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`

<!-- section: related -->
## 関連ページ

- [CLI リファレンス](cli-reference.md)
- [対話型コマンド](commands.md)
- [リモートセッションと自動化](remote-automation.md)
