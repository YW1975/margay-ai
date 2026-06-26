# GitHub と CI ワークフロー

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は GitHub app 設定、commit と review コマンド、PR 自動化補助、CI 向け print モード、公開ドキュメント公開ワークフローを含みます。

<!-- section: capabilities -->
## 機能範囲

- 対応環境では GitHub app 連携を導入します。
- 利用可能な場合は review、security-review、autofix-pr、commit、commit-push-pr コマンドを使います。
- GitHub Pages 公開前に CI でドキュメントチェックと公開監査を実行します。

<!-- section: operational-model -->
## 運用モデル

- CI 自動化は決定的で監査可能であるべきです。暗黙の人間判断を必要とする prompt より、失敗閉じのスクリプトを優先してください。

<!-- section: configuration -->
## 設定とコマンド

- 関連モジュールは `commands/install-github-app`、`commands/review`、`commands/security-review.ts`、`commands/autofix-pr`、公開リポジトリ workflow です。


<!-- section: source-evidence -->
## ソース上の根拠

- `commands/install-github-app`
- `commands/review`
- `commands/security-review.ts`
- `commands/autofix-pr`
- `commands/commit-push-pr.ts`

<!-- section: related -->
## 関連ページ

- [ワークフロー](workflows.md)
- [権限とセキュリティ](permissions-security.md)
- [ゲートとアテステーション](gates-attestation.md)
- [公開ドキュメント公開](public-docs.md)
