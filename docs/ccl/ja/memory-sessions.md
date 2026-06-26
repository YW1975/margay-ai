# メモリ、文脈、セッション

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は会話状態、セッション transcript、メモリ抽出、compact、文脈 collapse、agent memory、セッション再開フローを管理します。

<!-- section: capabilities -->
## 機能範囲

- コマンド面からセッションを再開、管理します。
- セッションが大きくなった場合に文脈を compact または collapse します。
- 有効な場合、ユーザー、プロジェクト、ローカル、リモート backing のスコープに agent memory を永続化します。

<!-- section: operational-model -->
## 運用モデル

- メモリは強力ですが、スコープを限定してください。secret や公開リリース専用の主張を永続メモリに置かないでください。

<!-- section: configuration -->
## 設定とコマンド

- 関連コマンドとサービスは `memory`、`resume`、`session`、`compact`、`contextCollapse`、`SessionMemory`、`extractMemories`、`agentMemory` です。


<!-- section: source-evidence -->
## ソース上の根拠

- `commands/memory`
- `commands/resume`
- `commands/session`
- `services/SessionMemory`
- `services/contextCollapse`
- `tools/AgentTool/agentMemory.ts`

<!-- section: related -->
## 関連ページ

- [対話セッションと Print モード](interactive-sessions.md)
- [サブエージェント](sub-agents.md)
- [設定](configuration.md)
- [トラブルシューティング](troubleshooting.md)
