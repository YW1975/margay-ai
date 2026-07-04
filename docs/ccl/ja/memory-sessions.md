# Memory, Context, and Sessions

> このページは CCL 公開ドキュメントのソースとして保守されています。生成ワークフローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は長い interaction の中で有用な state を保持しますが、すべての token を permanent truth として扱うわけではありません。Session history は resume と recovery を支えます。Context management は active prompt を model limits 内に保ちます。Session memory と agent memory は、feature が有効で configured thresholds を満たしたときに、選択された learnings を保存します。

重要なのは scope の違いです。Session transcript は operational history、compacted context は model-facing working set、session memory は conversation から抽出された notes、agent memory は user、project、local agent use に scoped された persistent knowledge です。

<!-- section: capabilities -->
## 機能

Session persistence は conversations を記録し、ID で resume、search、または `/resume` による選択を可能にします。`/clear` は新しい session state を開始しつつ、適切な background task boundaries を保持します。caller が対応している場合、`/rewind` と resume-at-message flows は earlier point に戻れます。

Context controls には manual `/compact`、automatic compaction、microcompact transforms、`/context` による context visualization、feature が active な場合の optional context-collapse behavior があります。`/context` は raw terminal scrollback ではなく API-facing view を表示するため、compacted または collapsed spans によって operator が誤解しにくくなります。

Session memory は forked agent を使って background で動きます。token threshold を満たした後に initialization され、その後は十分な context growth と tool activity がある場合だけ更新されます。Agent memory は user、project、local scope の下に `MEMORY.md` を保存し、local memory は version-control-oriented sharing の対象外です。

<!-- section: operational-model -->
## 動作モデル

Compaction は単なる compression ではありません。compact 前に CCL は pre-compact hooks を実行し、microcompact を適用し、hook-provided instructions を merge し、その後 replacement summary を作って cache cleanup を行うことがあります。custom compact instructions がない場合は、session-memory compaction が先に試されます。

Session memory は意図的に delayed かつ threshold-based です。毎 turn extraction するわけではありません。runtime は token growth、tool-call counts、last assistant turn に active tool calls が残っているかを確認してから extraction を起動します。memory file は restrictive permissions で作成され、runtime の file-tool path を通じて読み取られます。

Agent memory は memory scope が設定された agent の prompt に読み込まれます。User scope は general に保ち、project scope は repository と共有される可能性があり、local scope は machine/project-specific です。secrets、credentials、一時的な incident details、未検証の public-release claims を保存しないでください。

<!-- section: configuration -->
## 設定とコマンド

session recovery には `/resume` を使います。model が現在何を見ているかを理解する必要があるときは、compact の前に `/context` を使います。session が大きくなったとき、または noisy exploration を focused summary に置き換えたいときは `/compact` を使います。custom compact instructions は、default summary が重要 facts を落とす場合だけ使ってください。

Memory hygiene:

- durable memory は factual、short、scoped に保ちます。
- team-shared practices は team agreement がある場合だけ project memory に入れます。
- machine-specific details には local memory を優先します。
- behavior が変わったら stale memory を削除します。
- API keys、一回の run だけの private local paths、speculative conclusions を永続化しないでください。

<!-- section: source-evidence -->
## ソース根拠

- `utils/sessionStorage.ts` と `utils/sessionRestore.ts`: sessions を persist / restore します。
- `commands/resume/resume.tsx`、`commands/clear/conversation.ts`、`commands/compact/compact.ts`、`commands/context/context.tsx`: resume、clear、compact、API-facing context inspection を実装します。
- `query.ts`: main query loop で microcompact、context collapse、autocompact、reactive compact、memory attachments、post-compact state transitions を適用します。
- `services/SessionMemory/sessionMemory.ts`: threshold-based background extraction と memory-file setup を定義します。
- `tools/AgentTool/agentMemory.ts`: user/project/local agent memory scopes と `MEMORY.md` loading を定義します。

<!-- section: related -->
## 関連ページ

- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Subagents](sub-agents.md)
- [Configuration and Settings](configuration.md)
- [Troubleshooting](troubleshooting.md)
