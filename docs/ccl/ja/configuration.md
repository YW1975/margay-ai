# 設定

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL はユーザー、プロジェクト、ローカル、管理、実行時の各ソースから設定を解決し、モデルルーティング、権限、ツール、MCP、hook、エージェント、プラグイン、通知、UI 動作へ適用します。

<!-- section: capabilities -->
## 機能範囲

- `/config` と関連コマンドで設定を確認、変更します。
- 永続的なプロジェクト方針とローカル開発者設定を分けます。
- 管理設定と同期サービスで組織既定値を扱います。

<!-- section: operational-model -->
## 運用モデル

- 設定はセッション開始前にマージされ、AgentTool や MCP 管理のように設定元を意識するツールからも参照されます。

<!-- section: configuration -->
## 設定とコマンド

- エージェント表示を調査する場合、`ccl agents` に `--setting-sources user,project,local` を指定できます。
- 環境ごとにルーティングが異なる場合は `ccl remote-env`、`ccl endpoint`、ゲートウェイ設定を使います。

<!-- section: source-evidence -->
## ソース上の根拠

- `tools/ConfigTool`
- `services/settingsSync`
- `services/remoteManagedSettings`
- `commands/config/config.tsx`

<!-- section: related -->
## 関連ページ

- [認証](authentication.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [権限とセキュリティ](permissions-security.md)
- [エージェント](agents.md)
