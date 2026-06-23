# クイックスタート

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL をインストールし、ゲートウェイまたは互換モデルプロバイダーを設定し、プロジェクトディレクトリで対話セッションまたは print モードを開始します。

<!-- section: capabilities -->
## 機能範囲

- `ccl` で対話セッションを開始します。
- `ccl -p "summarize this repo"` で非対話出力を得ます。
- 認証、アップデーター、環境状態が不明な場合は `ccl doctor` を実行します。

<!-- section: operational-model -->
## 運用モデル

- CCL は設定を読み込み、プロジェクト文脈を検出し、ツールを準備してから、設定済みの provider 経路へモデル要求を送ります。権限確認はファイル編集、shell コマンド、MCP ツール、リモート操作を保護します。

<!-- section: configuration -->
## 設定とコマンド

- 導入方式に応じて `ccl login` または provider 環境変数を使います。
- 基本セッションが動いたら `ccl mcp` で外部ツールサーバーを追加します。
- `ccl agents` で組み込みおよびカスタムエージェントが見えることを確認します。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `commands/login/login.tsx`
- `commands/mcp/mcp.tsx`
- `tools/AgentTool/builtInAgents.ts`

<!-- section: related -->
## 関連ページ

- [インストールと更新](installation.md)
- [認証](authentication.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [エージェント](agents.md)
