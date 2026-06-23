# 公開ドキュメント公開

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

公開 CCL ドキュメントはサニタイズ済み Markdown ソースから用意し、言語整合と機密内容を検査してから静的 GitHub Pages サイトへ構築します。

<!-- section: capabilities -->
## 機能範囲

- 承認された文書ソースだけを公開リポジトリへ同期します。
- push 前に secret、私有パス、source map、環境ファイル、key material をブロックします。
- 生成された map や依存ディレクトリをコミットせず静的サイトを構築します。

<!-- section: operational-model -->
## 運用モデル

- 公開リポジトリは私有ソースのミラーではなく公開面です。各ファイルは公開してよいことを意図的に確認してください。

<!-- section: configuration -->
## 設定とコマンド

- 公開前に `scripts/audit-public-content.sh`、ドキュメントチェック、Pages ビルドを実行します。

<!-- section: source-evidence -->
## ソース上の根拠

- `docs/ccl-docs`
- `scripts/check-ccl-docs.mjs`

<!-- section: related -->
## 関連ページ

- [GitHub と CI ワークフロー](github-ci.md)
- [権限とセキュリティ](permissions-security.md)
- [CCL 概要](overview.md)
