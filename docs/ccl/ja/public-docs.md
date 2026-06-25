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
- docs-publisher ワークフローでソース証拠、生成ログ、公開安全スキャン、レビュー引き継ぎメモを作成します。

<!-- section: operational-model -->
## 運用モデル

- 公開リポジトリは私有ソースのミラーではなく公開面です。各ファイルは公開してよいことを意図的に確認してください。
- 作成者の証拠は判定そのものではありません。公開が範囲に含まれる場合、docs reviewer はソース正確性、言語整合、ブランド残留、漏えいスキャン、ビルド、公開先取得を独立に再実行します。

<!-- section: configuration -->
## 設定とコマンド

- 公開前に `scripts/audit-public-content.sh`、ドキュメントチェック、Pages ビルドを実行します。
- docs-publisher skill は製品非依存に保ちます。CCL 固有のページ本文と証拠はこのリポジトリまたは task evidence bundle に置き、docs-reviewer が公開先を検証します。

<!-- section: source-evidence -->
## ソース上の根拠

- `docs/ccl-docs`
- `scripts/check-ccl-docs.mjs`
- `skills/bundled/docs-publisher/SKILL.md`
- `skills/bundled/docs-reviewer/SKILL.md`
- `docs/docs-publisher-ccl-process-report-2026-06-24.md`

<!-- section: related -->
## 関連ページ

- [GitHub と CI ワークフロー](github-ci.md)
- [権限とセキュリティ](permissions-security.md)
- [CCL 概要](overview.md)
