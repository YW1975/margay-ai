# Agents

> このページは公開ドキュメントのソースとして保守されています。Agent description は routing contract なので正確に保ちます。

<!-- section: purpose -->
## Purpose

CCL agents は探索、計画、review、testing、verification、guidance、background research、custom delegated tasks のための specialized execution context です。Main session は focused worker に独自 instructions、model preference、tool rules、MCP requirements、hooks、memory scope、optional background behavior を持たせて作業を委任できます。

<!-- section: capabilities -->
## Capabilities

- Built-in agents には general-purpose、code-reviewer、test-runner、statusline setup、feature gate 付きの Explore、Plan、guide、verification agents があります。
- Custom agents は user、project、local、managed、CLI argument sources から読み込まれる Markdown definitions です。
- Plugin agents は installed plugin bundles から読み込まれ、別 source として表示されます。
- Agents は `tools`、`disallowedTools`、`skills`、`mcpServers`、`hooks`、`model`、`effort`、`permissionMode`、`maxTurns`、`background`、`memory`、isolation settings を宣言できます。
- Agent availability は configured MCP servers に依存できます。Required MCP servers がない場合、その agent は隠れます。
- `/agents` と `ccl agents --setting-sources user,project,local` は active agents と勝った source の確認に使います。

<!-- section: operational-model -->
## Operational model

Agent discovery は built-ins から始まり、plugin と custom definitions を追加します。Custom Markdown files には `name` と `description` frontmatter が必要です。Invalid agent attempts は skip され記録されます。`--agents` で渡された JSON agents は per-agent failure になり、1 つの不正定義で全体を捨てません。

Active agents は `agentType` と source priority で deduplicate されます。Display code は user、project、local、managed、plugin、CLI arg、built-in agents に分け、別 source に override された場合は注記します。Simple mode では built-ins だけを残します。

Agent 実行時、CCL は tool set、model、MCP tools、lifecycle context を解決します。`SubagentStart` hooks は context を追加できます。Agent frontmatter hooks は plugin-only policy の信頼条件を満たす source の場合だけ登録されます。Frontmatter の skills は利用可能なら preload されます。Background agents は unlinked abort controller と non-interactive execution を使い、sync agents は parent session state をより多く共有します。

Agent を追加するときは、その agent がなぜ必要か、いつ使うべきか、どの tools を使えるか、どの MCP servers が必要か、memory を使うか、background 実行が安全かを確認します。説明が曖昧な agent は routing を悪化させ、main session が自分で行うべき作業を不必要に委任します。

<!-- section: configuration -->
## Configuration and commands

最小 custom agent 例:

```markdown
---
name: repo-reviewer
description: Use when a repository change needs an independent correctness review.
tools: Read,Grep
model: inherit
maxTurns: 8
---
Review the changed files for correctness risks, missing tests, and unsafe assumptions.
```

運用ガイダンス:

- `description` は短く具体的にします。これは主要な routing signal です。
- `tools` は agent が本当に必要な範囲に絞り、明示的な禁止には `disallowedTools` を使います。
- External tools に依存する場合、required MCP servers を宣言します。
- Main session が進んでも安全な作業だけ `background: true` にします。
- Agent memory には durable、non-secret、cross-run reuse に適した知識だけを保存します。

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/builtInAgents.ts` は built-in agent registration、feature gates、SDK disable behavior、non-SDK guide-agent inclusion を定義します。
- `tools/AgentTool/loadAgentsDir.ts` は `AgentDefinition`、source types、frontmatter fields、MCP filtering、memory snapshot initialization、Markdown parsing、JSON parsing、built-in fallback behavior を定義します。
- `tools/AgentTool/runAgent.ts` は tools、model、MCP tools、hooks、skills、background behavior、abort controllers、subagent context を解決します。
- `commands/agents/agents.tsx` は current permission context と available tool set で agents menu を render します。
- `tools/AgentTool/agentDisplay.ts` は source group ordering、override annotation、display model resolution を定義します。

<!-- section: related -->
## Related pages

- [サブエージェント](sub-agents.md)
- [組み込みツール](tools.md)
- [Skills](skills.md)
- [MCP サーバーとツール](mcp.md)
- [権限とセキュリティ](permissions-security.md)
