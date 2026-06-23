# ゲートシステム

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

ゲートシステムは方針を実行可能なチェックに変え、安全でない、または証拠不足の提出がレビューや公開に進む前に止めます。

<!-- section: capabilities -->
## 機能範囲

- 必須提出セクションと attest 行を検証します。
- test、docs check、audit、build など設定済みコマンドを実行します。
- 失敗ログを保持し、次の fix ラウンドを具体的証拠から始めます。

<!-- section: operational-model -->
## 運用モデル

- ゲートは正しい理由で失敗できるほど具体的であるべきです。主張する要件を覆っていない broad な green check は弱い証拠です。

<!-- section: configuration -->
## 設定とコマンド

- 公開文書では、ドキュメント整合、リンク、未翻訳残留検出、ソース証拠、公開監査、サイトビルドをゲートに含めます。

<!-- section: source-evidence -->
## ソース上の根拠

- `AGENTS.md`
- `gate-manifest.json`
- `scripts/check-ccl-docs.mjs`

<!-- section: related -->
## 関連ページ

- [ゲートとアテステーション](gates-attestation.md)
- [公開ドキュメント公開](public-docs.md)
- [GitHub と CI ワークフロー](github-ci.md)
