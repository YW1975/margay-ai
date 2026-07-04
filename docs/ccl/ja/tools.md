# Built-in Tools

> このページは CCL 公開ドキュメントのソースとして保守されています。生成ワークフローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

ツールは、モデルとホスト環境のあいだで実際の操作を実行する境界です。CCL は、ファイルの読み取りと編集、shell コマンドの実行、ワークスペース検索、Web アクセス、task と goal の管理、ユーザーへの質問、agent への委譲、MCP resource の読み取り、workflow 自動化のためのツールを提供します。

実務上のルールは明確です。モデルはツール呼び出しを提案できますが、入力検証、権限チェック、hook 実行、telemetry、ストリーミング進捗、結果返却は CCL runtime が管理します。タスクの挙動が予想と違う場合は、まずツール層を確認し、すぐにモデル理解の問題と決めつけないでください。

<!-- section: capabilities -->
## 機能

主要なファイルおよび検索ツールには `Read`、`Write`、`Edit`、`NotebookEdit`、`Glob`、`Grep` があります。`Bash` は主なローカルコマンド実行ツールです。`PowerShell` は対応する shell 機能が有効な場合だけ公開されます。外部コンテキスト系のツールには `WebFetch`、`WebSearch`、MCP tools、MCP resource の一覧と読み取り、機能フラグで有効化される browser や terminal-panel の能力があります。

協調系のツールは、agent 委譲、task 管理、todo 更新、goal 状態、plan mode の入出、ユーザー質問、review artifact、remote trigger、scheduled cron、team messaging、worktree の入出、workflow 実行を扱います。すべてのビルドにすべてのツールが含まれるわけではありません。`tools.ts` は基本ツール一覧を作成し、feature flag、環境、権限コンテキスト、simple mode、MCP server から追加されるツールに基づいて絞り込みます。

MCP tools は built-in tools と同じ tool pool に追加されます。通常は `mcp__server__tool` 形式の名前になり、権限ルールは単一 tool、server 全体、または server wildcard を対象にできます。

<!-- section: operational-model -->
## 動作モデル

ツール実行は次の階層で進みます。

1. アクティブな session が built-in tools と接続済み MCP tools から tool pool を組み立てます。
2. blanket deny ルールが、モデルに見せる前にツールを除外します。
3. モデルが名前と構造化入力でツールを要求します。
4. CCL が入力 schema を検証し、pre-tool hook を実行します。
5. 権限ロジックが、明示ルール、permission mode、sandbox 状態、classifier 状態、SDK permission prompt、hook decision を使って allow、ask、deny を決定します。
6. allow の場合だけツールが実行されます。
7. CCL が進捗を stream し、post-tool または post-failure hook を実行します。
8. 結果が tool-result content に変換され、モデルへ返されます。

この階層は運用上重要です。allow ルールはよく使う操作を速くできますが、deny ルール、安全チェック、tool 固有の検証、hook は呼び出しを止められます。逆に、blanket deny で prompt-visible tool pool から隠すほうが、モデルに使わないことを期待するより確実です。

<!-- section: configuration -->
## 設定とコマンド

`--allowed-tools`、`--disallowed-tools`、`/permissions`、project settings、managed settings を使って、どのツールを表示または実行できるかを制御します。ツールルールの構文は、`Read` のような tool 全体のルール、`Bash(git status)` のような scoped rule、`mcp__docs` / `mcp__docs__*` のような MCP server rule をサポートします。

simple mode は、意図的にツール面を小さくしたい場合だけ使ってください。simple mode では通常、shell/read/edit を中心にした小さなローカル編集ループを維持し、coordinator 機能が必要な場合だけ追加の協調ツールが入ります。

繰り返し可能な自動化では、期待出力を明示した workflow または print mode を優先します。探索的な作業では、permission prompt や user question が headless context で黙って拒否されないように、interactive session を維持してください。

<!-- section: source-evidence -->
## ソース根拠

- `tools.ts`: `getAllBaseTools()`、`getTools()`、`assembleToolPool()`、`filterToolsByDenyRules()` がツール一覧と filtering を定義します。
- `services/tools/toolExecution.ts`: tool input を検証し、hook を実行し、telemetry を記録し、error を分類し、tool-result content を返します。
- `services/tools/toolHooks.ts`: pre/post tool hook をツール実行と権限挙動に接続します。
- `utils/permissions/permissions.ts`: 実行前の allow/ask/deny decision を解決します。
- `services/mcp/utils.ts` と `services/mcp/mcpStringUtils.ts`: MCP tool naming と permission matching を定義します。

<!-- section: related -->
## 関連ページ

- [Permissions and Security](permissions-security.md)
- [Hooks](hooks.md)
- [MCP Servers and Tools](mcp.md)
- [Workflows](workflows.md)
