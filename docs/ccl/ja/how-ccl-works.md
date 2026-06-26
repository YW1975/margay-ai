# CCL の仕組み

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL はエージェント型ループを実行します。プロジェクト文脈を集め、ユーザー要求を推論し、方針の下でツールを呼び、結果をストリームし、セッション状態を保存し、文脈が大きくなれば compact または委任します。

<!-- section: capabilities -->
## 機能範囲

- セッション開始時に設定、モデルルーティング、権限、ツール、コマンド、MCP、エージェント、プラグイン、プロジェクト文脈を解決します。
- モデルは行動を提案しますが、ツールは方針と権限チェックを通った後だけ実行されます。
- 長時間または専門的な作業はサブエージェント、ワークフロー、RLL レビューループへ移せます。

<!-- section: operational-model -->
## 運用モデル

- CCL は CLI/session shell、設定と方針、モデル transport、ツール、拡張、統制の層で考えます。問題調査ではまず失敗層を特定します。

<!-- section: configuration -->
## 設定とコマンド

- [トラブルシューティング](troubleshooting.md) で症状を層に対応付け、[組み込みツール](tools.md) と [権限とセキュリティ](permissions-security.md) で実行境界を理解します。


<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `services/api/client.ts`
- `services/tools/toolExecution.ts`
- `services/compact`
- `tools/AgentTool`

<!-- section: related -->
## 関連ページ

- [CCL 概要](overview.md)
- [対話セッションと Print モード](interactive-sessions.md)
- [組み込みツール](tools.md)
- [エージェント](agents.md)
- [トラブルシューティング](troubleshooting.md)
