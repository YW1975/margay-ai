# Interactive Sessions and Print Mode

> このページは CCL 公開ドキュメントのソースとして保守されています。生成ワークフローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

CCL には二つの主要な操作面があります。既定は interactive terminal session で、反復作業、承認、slash commands、context inspection、長い協調作業に使います。非対話の surface は `-p` または `--print` で有効化する print mode で、scripts、CI、SDK-style callers、deterministic command pipelines に向いています。

どちらを使うかは仕事で決めます。user judgment、approval、exploration、曖昧な tool result からの recovery が必要なら interactive mode を使います。入力が明確で、tool permission が限定され、machine-checkable output があるなら print mode を使います。

<!-- section: capabilities -->
## 機能

Interactive sessions は conversation state を保持し、`/resume`、`/compact`、`/context`、`/clear`、`/export`、`/copy`、`/cost`、`/session`、workflow commands などの local commands を提供します。permission prompts、plan mode、user visibility が必要な hooks、tool results の manual inspection も通常ここで扱います。

Print mode は `--output-format text`、`--output-format json`、`--output-format stream-json` をサポートします。stream input、partial message streaming、hook event streaming、JSON schema constrained output、`--max-turns`、`--max-budget-usd`、explicit tool allow/deny lists、permission mode、MCP config、custom system prompts、session resume options も使えます。既定の headless turn ceiling は 70 turns です。`--max-turns 0` は、caller が外部 timeout または watchdog を持つ場合だけ使ってください。

`--bare` は controlled automation 向けの minimal mode です。hooks、LSP、plugin sync、attribution、auto-memory、background prefetches、keychain reads、automatic CCL instruction discovery を skip します。役に立つ context も削るため、system prompts、settings、agents、plugin dirs、MCP config、allowed directories で明示的に context を渡してください。

<!-- section: operational-model -->
## 動作モデル

Interactive mode は terminal event loop を持ちます。permission を求め、session state を更新し、progress を描画し、user が inspect または cancel できるようにします。明示的に無効化しない限り session persistence は有効で、後から resume operations で履歴を復元できます。

Print mode は CCL を command-line API として扱います。workspace trust dialog を skip するため、信頼できる directory でだけ使ってください。caller はすべての context を提供し、exit status と output shape を確認する必要があります。streaming JSON mode では terminal text を scrape せず、event stream を使います。

Resume behavior はどちらの mode でも重要です。`--continue` は current directory の直近 conversation を再開します。`--resume <id>` は指定 session を再開します。`--fork-session` は resumed conversation から新しい session ID を作り、元の session を変更しません。

<!-- section: configuration -->
## 設定とコマンド

よく使う interactive commands:

- `/resume`: past conversations を選択または検索します。
- `/compact`: session が大きくなったとき summary または context reduction を行います。
- `/context`: compact/collapse transforms を含む API-facing context view を表示します。
- `/clear`: fresh conversation state を開始します。
- `/export`、`/copy`、`/cost`、`/session`: export、copy、cost inspection、remote-session details を扱います。

よく使う print-mode patterns:

- `ccl -p "Summarize this repo" --output-format text`
- `ccl -p "Return JSON" --output-format json --json-schema '<schema>'`
- `ccl -p "Run bounded task" --max-turns 20 --allowed-tools Read Grep`
- `ccl -p "Use MCP" --mcp-config ./mcp.json --permission-mode default`

通常の automation path として `--dangerously-skip-permissions` を使わないでください。CI では narrow `--allowed-tools` / `--disallowed-tools` rules と external timeout を優先します。

<!-- section: source-evidence -->
## ソース根拠

- `main.tsx`: 既定の対話起動、`-p/--print`、入出力形式、`--bare`、resume/fork flags、permission flags、print mode の安全説明を定義します。
- `cli/print.ts`: 非対話 runtime、structured I/O、tool pool assembly、permission prompt tool integration、MCP setup、session resume handling を実装します。
- `cli/printMaxTurns.ts`: 70-turn default と `CCL_PRINT_MAX_TURNS` / `--max-turns` の挙動を定義します。
- `commands/resume/resume.tsx`、`commands/compact/compact.ts`、`commands/context/context.tsx`、`commands/clear/clear.ts`、`commands/export/export.tsx`、`commands/cost/cost.ts`、`commands/session/session.tsx`: 主要な対話 session commands を実装します。

<!-- section: related -->
## 関連ページ

- [CLI Reference](cli-reference.md)
- [Interactive Commands](commands.md)
- [Memory, Context, and Sessions](memory-sessions.md)
- [Workflows](workflows.md)
