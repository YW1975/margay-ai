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

## Agents と Subagents の使い分け

Agents ページは registry、組み込みロール、発見順序、runtime behavior を理解するために使います。agent 定義を書いたりデバッグしたりする場合は [サブエージェント](sub-agents.md) を使います。この区別は意図的です。`agents.md` は製品と runtime guide、`sub-agents.md` は definition と delegation guide です。

## 組み込みエージェント

| エージェントロール | 使う場面 | メモ |
| --- | --- | --- |
| General-purpose | オープンエンドの委任調査または実装支援 | 通常の agent execution path を使います。 |
| Explore | 変更前の読み取り専用調査 | runtime で利用できます。削除済み Explore/Plan feature gate に隠されません。 |
| Plan | すぐにファイル編集せず集中した計画を作る | Explore と同じく runtime で利用できます。 |
| CCL guide | CCL の動作、コマンド、設定、agent、workflow、MCP、plugin、互換動作に関する質問に答える | source の canonical type name は互換性のため残りますが、user-facing role は CCL guidance です。 |
| Statusline setup / verification | 専用の setup または evidence check task | build flag または runtime condition に依存する場合があります。 |

## 発見とフィルタリング

CCL は組み込み agent から始め、plugin agent と custom agent definition を読み込みます。Active agent は `agentType` で dedupe され、後の source group が loader order に従って以前の定義を上書きできます。Required MCP server は agent 公開前に利用可能 server 名と照合されます。required server が利用できない場合、agent が壊れていると黙って仮定せず、利用不可として診断してください。

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
