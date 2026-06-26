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

## このページの範囲

このページは委任 task agent の定義に使います。[エージェント](agents.md) の高レベル registry model は繰り返しません。Markdown/JSON agent definition を作成、レビュー、デバッグする場合に使ってください。

## 定義フィールド

| フィールド | 制御するもの | 使う場面 |
| --- | --- | --- |
| `description` | host model に見せる routing signal | 常に必要です。具体的で action-oriented にします。 |
| `tools` / `disallowedTools` | 許可または禁止する tool name | agent を読み取り専用または特定 action に制限したい時。 |
| `skills` | preload する skill | agent が反復可能な手順を使うべき時。 |
| `mcpServers` / `requiredMcpServers` | MCP 設定または availability requirement | agent が外部 tool に依存する時。 |
| `model` / `effort` | モデル preference と reasoning effort | コスト、遅延、task 難易度で別 default が必要な時。 |
| `permissionMode` | tool approval behavior | agent により厳しい、または狭い execution policy が必要な時。 |
| `background` | background execution | 長時間の調査やチェックに使います。 |
| `memory` | persistent memory scope | 反復作業が保存文脈から実際に利益を得る場合だけ使います。 |

## 安全な委任チェックリスト

カスタム subagent を追加する前に、description がいつ使うかを説明していること、tool access が必要以上に広くないこと、MCP requirements が明示されていること、background behavior が意図されたものであること、persistent memory scope に secret やグローバル再利用すべきでない project-private claim が入らないことを確認します。

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
