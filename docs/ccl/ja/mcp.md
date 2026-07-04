# MCP Servers and Tools

> このページは CCL 公開ドキュメントのソースとして保守されています。生成ワークフローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は Model Context Protocol servers を統合し、外部システムが tools、resources、prompts、authentication flows、IDE bridges、plugin-provided capabilities を提供できるようにします。MCP は built-in local tools を越えて CCL を拡張する方法でありながら、それらの能力を同じ permission と hook system に通します。

能力が別の service や process に自然に属する場合は MCP を使います。例として、database inspector、ticketing system、browser/IDE bridge、knowledge store、internal API、team-specific automation server があります。

<!-- section: capabilities -->
## 機能

MCP server configuration は local stdio servers、remote SSE servers、streamable HTTP servers、WebSocket servers、SDK servers、IDE transports、proxy-backed remote connectors をサポートします。server config は local、user、project、dynamic、enterprise、managed、connector-derived scopes に置けます。

接続済み MCP servers は次を公開できます。

- tools。通常は `mcp__server__tool` 形式です。
- built-in MCP resource tools で一覧化・読み取りできる resources。
- server instructions と capabilities。
- supported remote servers の OAuth-related metadata を含む authentication requirements。

`/mcp` command は MCP management を開き、named server の reconnect、named server または all servers の enable/disable をサポートします。一部のビルドでは、plugin-provided MCP servers が extension system の一部として管理されるため、基本 MCP management UI が plugin-management surface に redirect されます。

<!-- section: operational-model -->
## 動作モデル

startup と refresh point で、CCL は configured scopes、plugin-provided servers、dynamic/managed sources から MCP server definitions を読みます。client を接続し、server state を connected、pending、failed、needs-auth、disabled として記録し、connected tools を session tool pool に追加します。

manual MCP configuration は重複する plugin-provided server より優先されます。Plugin MCP servers は name collision を避けるため namespaced され、duplicate detection は command arrays または URLs を比較して、二つの plugin が同じ underlying server を黙って起動しないようにします。

MCP tools は built-in tools と同じ visibility と permission checks を通ります。deny rule は server namespace 全体を隠せ、scoped rule は個別の generated tool name を対象にできます。すべての MCP server を trust boundary として扱ってください。remote data を読んだり、external system を変更したり、model behavior に影響する instructions を返したりする可能性があります。

<!-- section: configuration -->
## 設定とコマンド

project servers には `.mcp.json` または settings-backed MCP configuration を使います。config schema には次があります。

- `stdio`: `command`、optional `args`、optional `env`。
- `sse` / `http`: `url`、optional `headers`、optional `headersHelper`、optional OAuth configuration。
- `ws`: `url`、optional `headers`、optional `headersHelper`。
- `sdk`: named SDK server。
- integrations が使う internal IDE/proxy transport types。

failed または needs-auth server を修正した後は `/mcp reconnect <server>` を使います。設定を削除せず可用性だけ制御するには `/mcp enable <server>` または `/mcp disable <server>` を使います。公開ドキュメントに token を載せず、local-only MCP credentials を commit しないでください。

<!-- section: source-evidence -->
## ソース根拠

- `commands/mcp/mcp.tsx`: `/mcp`、reconnect、enable、disable command behavior を実装します。
- `services/mcp/types.ts`: MCP transport types、config scopes、server config schemas、connection states を定義します。
- `services/mcp/config.ts`: scoped configuration を読み込み、`.mcp.json` を atomic に書き、plugin servers を merge し、duplicate server definitions を deduplicate します。
- `services/mcp/MCPConnectionManager.tsx` と `services/mcp/client.ts`: connections と client state を管理します。
- `tools/MCPTool/MCPTool.ts`、`tools/ListMcpResourcesTool/ListMcpResourcesTool.ts`、`tools/ReadMcpResourceTool/ReadMcpResourceTool.ts`: MCP tools と resources を model に公開します。

<!-- section: related -->
## 関連ページ

- [Built-in Tools](tools.md)
- [Plugins](plugins.md)
- [Authentication](authentication.md)
- [Permissions and Security](permissions-security.md)
