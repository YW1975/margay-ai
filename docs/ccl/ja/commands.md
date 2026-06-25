# 対話型コマンド

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

対話型コマンドは実行中の CCL セッションを制御し、モード切替、文脈管理、コストやファイルの確認、権限設定、ワークフロー実行、連携接続を行います。

<!-- section: capabilities -->
## 機能範囲

- 主要コマンドには help、config、model、permissions、memory、status、cost、context、compact、clear、resume、diff、commit、review、plan、workflows があります。
- 連携コマンドは MCP、IDE、terminal setup、Chrome、GitHub app インストール、remote setup、remote control、plugin を扱います。
- 診断コマンドには doctor、endpoint、gateway、stats、insights、usage、および存在する場合の debug tool call 補助があります。

<!-- section: operational-model -->
## 運用モデル

- コマンドは、設定を書き込む、ファイルを作る、サービスへ接続する、外部プロセスを起動する場合を除き、セッション内に閉じます。書き込みを承認する前にコマンドの説明と権限要求を確認してください。

<!-- section: configuration -->
## 設定とコマンド

- 対話セッションで `/` を入力し、現在のビルドとプロジェクトで利用できるコマンドを確認します。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `commands/workflows/index.ts`
- `commands/permissions/permissions.tsx`
- `commands/hooks/hooks.tsx`

<!-- section: related -->
## 関連ページ

- [CLI リファレンス](cli-reference.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [ワークフロー](workflows.md)
- [権限とセキュリティ](permissions-security.md)
- [Hook](hooks.md)
