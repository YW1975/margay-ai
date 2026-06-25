# エージェント

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL エージェントは、探索、計画、検証、ガイド、バックグラウンド作業、カスタム委任タスクのための専用実行コンテキストです。

<!-- section: capabilities -->
## 機能範囲

- 組み込みエージェントには Explore、Plan、verification、statusline setup、general-purpose、CCL guide ロールがあります。
- カスタムおよびプラグイン由来のエージェントは定義ディレクトリから読み込まれ、ツール、モデル、MCP 要件、hook、権限、メモリ、バックグラウンド動作を制限できます。
- エージェントは前景または背景で実行でき、対応している場合はメッセージで継続できます。

<!-- section: operational-model -->
## 運用モデル

- エージェント発見は組み込み、プラグイン由来、カスタム Markdown 定義から始まり、MCP 可用性と権限ルールで active agent を絞り込んでから Agent ツール prompt に公開します。
- 互換性のために残る組み込み type 名はルーティング識別子として扱います。製品向け文書では旧ブランドではなく CCL のロールと動作を説明します。

<!-- section: configuration -->
## 設定とコマンド

- `ccl agents` で設定済みエージェントを一覧します。定義形式、スコープ、MCP 要件、モデル選択、hook、メモリ、ツール制限は [サブエージェント](sub-agents.md) を参照してください。
- エージェントが MCP サーバーを要求する場合、CCL は一致する pending サーバーを短時間待ち、認証済みツール面がまだなければ黙って起動せず不足を報告します。

<!-- section: source-evidence -->
## ソース上の根拠

- `tools/AgentTool/builtInAgents.ts`
- `tools/AgentTool/built-in`
- `tools/AgentTool/loadAgentsDir.ts`
- `tools/AgentTool/AgentTool.tsx`
- `tools/AgentTool/runAgent.ts`

<!-- section: related -->
## 関連ページ

- [サブエージェント](sub-agents.md)
- [組み込みツール](tools.md)
- [Skill](skills.md)
- [権限とセキュリティ](permissions-security.md)
