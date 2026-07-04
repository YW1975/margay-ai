# サブエージェント

> このページは公開ドキュメントのソースとして保守されています。Subagents は separate execution contexts であり、permission bypass ではありません。

<!-- section: purpose -->
## Purpose

Subagents は CCL session から focused work を別 context に委任します。その context は独自の system prompt、model selection、tool pool、permission mode、MCP clients、hooks、memory behavior、run limits を持てます。Separation が品質を上げる場合に使います。Independent review、parallel research、test execution、scoped exploration、specialist procedure などです。

<!-- section: capabilities -->
## Capabilities

- Agent tool、built-in agents、plugin agents、custom agent definitions から subagent を開始できます。
- Parent callbacks の一部を共有する synchronous agents、または独立して継続する background agents を実行できます。
- Execution 前に agent-specific tools と MCP tools を解決します。
- Frontmatter skills を agent context に preload します。
- `SubagentStart` hooks を実行し、agent stop hooks を `SubagentStop` に変換します。
- 設定されている場合、in-process teammate-style agents の viewable transcripts と tool results を保持します。
- 対応する routing では background または in-process agents を message routing で resume できます。

<!-- section: operational-model -->
## Operational model

Subagent execution は parent session が agent definition を選んだ後に始まります。CCL は agent model、tool list、MCP clients、additional working directories、system prompt を解決します。Agent は独自の context と messages を受け取り、parent authority を無制限に継承するわけではありません。

Synchronous agents は parent state と abort behavior をより多く共有します。Background agents は separate abort controller を持ち、non-interactive execution として扱われるため parent session は続行できます。Fork-style agents は fork feature 有効時により多くの context を継承できますが、recursive uncontrolled spawning を防ぐ guard があります。

Permissions は引き続き有効です。Agent-level `tools`、`disallowedTools`、`permissionMode`、MCP requirements は worker surface を形作りますが、unsafe task を safe に変えるものではありません。Hooks と plugin-only policy も agent lifecycle behavior を block または limit できます。

<!-- section: configuration -->
## Configuration and commands

次の場合に subagents を使います。

| Situation | Recommended agent pattern |
| --- | --- |
| 広い repository exploration | Read/search-only agent で write authority を下げます。 |
| Independent code review | Reviewer agent に source-reading tools を与え、edit tools は与えません。 |
| Test execution | Test-runner agent に command execution を許し、短い pass/fail output を返させます。 |
| Long-running research | Background agent に bounded tools と明確な return artifact を与えます。 |
| Workflow step | Workflow agent adapter に explicit workflow params と expected artifacts を渡します。 |

Custom subagent を追加する前に、`description` が使用条件を示すこと、tool access が必要最小限であること、MCP dependencies が明示されていること、background behavior が意図的であること、memory が secrets を避けること、isolation mode が repository risk に合うことを確認します。

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/runAgent.ts` は agent-specific options を作り、tools と MCP tools を解決し、sync/background abort behavior を処理し、`SubagentStart` hooks を実行し、agent frontmatter hooks を登録し、skills を preload し、subagent context を作成します。
- `tools/AgentTool/loadAgentsDir.ts` は tools、disallowed tools、skills、MCP servers、hooks、model、effort、permission mode、max turns、background、memory、isolation などの agent fields を parse します。
- `tools/AgentTool/forkSubagent.ts` は fork-subagent behavior と implicit forks の guard を定義します。
- `tools/AgentTool/resumeAgent.ts` は routing が対応する場合に viewable または background subagent sessions を reconstruct/resume します。
- `tools/WorkflowTool/agentAdapter.ts` は workflow execution を agent-backed work に接続します。

<!-- section: related -->
## Related pages

- [Agents](agents.md)
- [ワークフロー自動化](workflows.md)
- [組み込みツール](tools.md)
- [権限とセキュリティ](permissions-security.md)
- [Memory と Session 管理](memory-sessions.md)
