# CCL の仕組み

> このページは公開ドキュメントのソースとして保守されています。Runtime layers を説明し、非公開 deployment internals は扱いません。

<!-- section: purpose -->
## Purpose

CCL は agentic CLI runtime です。Session は CLI arguments、settings、authentication、model selection、project context、tools、commands、extensions、policy から始まります。その後、user input を読み、context を組み立て、model を呼び、承認された tools を実行し、結果を stream または render し、session state を保存し、必要に応じて compact、delegate、review します。

CCL の調査では layers を理解することが最短です。多くの失敗は startup/configuration、authentication、model routing、context construction、tool execution、extension loading、session persistence、remote automation、governance のどれかに属します。

<!-- section: capabilities -->
## Capabilities

- 同じ CLI entrypoint から interactive、print mode、SDK、server、direct-connect、SSH、remote-triggered sessions を開始できます。
- Main loop の前に settings、project context、CCL.md files、commands、skills、agents、hooks、MCP servers、plugins、permission state を解決します。
- Model、endpoint、credentials、routing policy に応じて、model calls を direct provider channel または gateway transport に送ります。
- Tools は permission checks、policy filters、hook handling、tool-specific validation の後だけ実行されます。
- Session transcripts を保存し、resume/fork behavior を提供し、active conversation が大きくなったときに context を compact します。
- 責務分離が必要な場合、agents、subagents、workflows、remote sessions、Ralph-Lisa review loops に専門作業を委任できます。

<!-- section: operational-model -->
## Operational model

CCL は次の層として考えられます。

1. 入口層: `main.tsx` が CLI フラグ、サブコマンド、起動モード、作業ディレクトリ、標準入力、出力形式、セッション ID、直接接続 URL、サーバーモード、リモート/SSH の早期引数書き換えを処理します。
2. 設定層: 設定、環境変数、管理ポリシー、プロジェクト信頼、ゲートウェイ設定、プラグインディレクトリ、MCP 設定、設定ソースの絞り込みを解決します。
3. コンテキスト層: プロジェクト指示、コマンド、スキル、エージェント、添付、メモリ、セッション transcript、圧縮済み context をモデル用に組み立てます。
4. モデル層: 選択モデルを正規化し、許可リストとエンドポイント互換性を確認して、直結クライアントまたはゲートウェイのストリームアダプターへ送ります。
5. ツール層: モデルのツール要求はツール実行経路に入り、権限、フック、ツール連携、ストリーミング出力、エラー処理が実行可否と実行方法を決めます。
   ソース上ではこの経路を `tool execution path` として追跡できます。
6. Persistence layer: session storage、summaries、context collapse、session memory、usage metrics、cost accounting が session を resumable かつ auditable にします。
7. Extension layer: plugins、skills、hooks、MCP、agents、workflows、remote surfaces が core loop を変えずに capability を追加します。
8. Governance layer: permissions、policy limits、public-audit checks、RLL gates、review commands、CI scripts が上位制御を提供します。

Troubleshooting ではまず layer を特定します。Command missing は extension loading または feature gating、shell command denied は permissions、wrong provider は routing/authentication、context item disappearance は compaction または startup context construction が主な候補です。

<!-- section: configuration -->
## Configuration and commands

- `ccl --help`、`/help`、`/status`、`/doctor`、`/config`、`/context`、`/permissions`、`/model`、`/endpoint`、`/gateway doctor` で active runtime を確認します。
- Route、tool、startup behavior の exact evidence が必要な場合は `--debug-file <path>` または `--debug-to-stderr` を使います。
- Extension や startup 問題を切り分けるときは `--bare` で startup layers を減らし、context を明示的に渡します。
- Automation と CI では `--print --output-format json` または `stream-json` を使い deterministic logs を得ます。
- Layer-specific docs を参照してください。configuration、authentication、model routing、tools、permissions、MCP、hooks、agents、workflows、remote automation、troubleshooting です。

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` は primary CLI entrypoint、subcommands、startup flags、print mode、server/open/ssh surfaces、setting sources、model flags、startup sequencing を定義します。
- `query.ts` と `services/api/claude.ts` は model loop、streaming events、non-escalating smart-route replies、usage accounting、model fallback paths を実装します。
- `services/api/client.ts` と `services/api/gatewayTransport.ts` は direct client setup と gateway streaming transport を実装します。
- `services/tools/toolExecution.ts`、`services/tools/toolOrchestration.ts`、`services/tools/toolHooks.ts` は tool execution、orchestration、hook integration を実装します。
- `utils/settings/types.ts`、`utils/config.ts`、`bootstrap/gatewayConfig.ts`、`utils/model/model.ts` は settings、project config、gateway config、model selection behavior を提供します。
- `utils/sessionStorage.ts`、`services/compact/compact.ts`、`services/SessionMemory/sessionMemory.ts` は persistence、compaction、memory behavior を提供します。

<!-- section: related -->
## Related pages

- [CCL 概要](overview.md)
- [インタラクティブセッションと Print Mode](interactive-sessions.md)
- [設定と構成](configuration.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [組み込みツール](tools.md)
- [トラブルシューティング](troubleshooting.md)
