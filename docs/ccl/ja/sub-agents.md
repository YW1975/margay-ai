# サブエージェント

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

サブエージェントにより、CCL セッションは専用指示、ツール制限、モデル選択、任意のメモリ動作を持つ別コンテキストへ作業を委任できます。

<!-- section: capabilities -->
## 機能範囲

- frontmatter 付き Markdown でカスタムエージェントを定義します。
- `name`、`description`、`tools`、`disallowedTools`、`skills`、`mcpServers`、`hooks`、`model`、`effort`、`permissionMode`、`maxTurns`、`background`、`memory`、指示本文を制御します。
- 長時間の調査やチェックにはバックグラウンドエージェントを使い、メインセッションを進められます。

<!-- section: operational-model -->
## 運用モデル

- サブエージェントの description はルーティング信号です。具体的で短く、そのエージェントをいつ使うかに集中させます。
- エージェント単位のツールルールと権限モードは worker ツールプールに反映されますが、CCL の権限方針を公開 bypass するものではありません。

<!-- section: configuration -->
## 設定とコマンド

- ユーザー、プロジェクト、ローカルの各スコープにある agent ディレクトリを使います。shell、ファイル書き込み、MCP には最小権限のツール制限を適用してください。
- `requiredMcpServers` は利用可能な MCP サーバー名と照合され、要件を満たすエージェントだけが active agent として表示されます。

<!-- section: source-evidence -->
## ソース上の根拠

- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/AgentTool.tsx`
- `tools/AgentTool/agentMemory.ts`
- `tools/AgentTool/agentMemorySnapshot.ts`

<!-- section: related -->
## 関連ページ

- [エージェント](agents.md)
- [組み込みツール](tools.md)
- [Skill](skills.md)
- [メモリ、文脈、セッション](memory-sessions.md)
