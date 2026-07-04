# MCP 服务器和工具

> 本页作为 CCL 公开文档源维护。若将来恢复生成流程，必须先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 用途

CCL 集成 Model Context Protocol 服务器，让外部系统提供工具、资源、prompts、认证流程、IDE bridge 和 plugin 提供的能力。MCP 是 CCL 扩展到内置本地工具之外的主要方式，同时这些能力仍进入同一套权限和 hook 系统。

当能力天然属于另一个服务或进程时，应考虑 MCP：数据库检查器、工单系统、浏览器/IDE bridge、知识库、内部 API 或团队专用自动化服务器。

<!-- section: capabilities -->
## 能力

MCP 服务器配置支持本地 stdio server、远程 SSE server、streamable HTTP server、WebSocket server、SDK server、IDE transport 和 proxy-backed remote connector。服务器配置可以位于 local、user、project、dynamic、enterprise、managed 或 connector-derived scope。

已连接 MCP 服务器可以暴露：

- 工具，通常命名为 `mcp__server__tool`；
- 可通过内置 MCP resource 工具列举和读取的 resources；
- server instructions 和 capabilities；
- 认证需求，包括受支持远程服务器的 OAuth 相关 metadata。

`/mcp` 命令打开 MCP 管理界面，支持 reconnect 指定服务器，也支持 enable 或 disable 指定服务器或全部服务器。在部分构建中，基础 MCP 管理界面会通过 plugin 管理界面承载，因为 plugin 提供的 MCP server 属于扩展系统的一部分。

<!-- section: operational-model -->
## 运行模型

启动和刷新时，CCL 从配置 scope、plugin 提供的服务器以及 dynamic/managed 来源读取 MCP server 定义。它会连接 client，把服务器状态记录为 connected、pending、failed、needs-auth 或 disabled，并把已连接工具加入 session 工具池。

手动 MCP 配置优先于重复的 plugin-provided server。Plugin MCP server 会被 namespaced 以避免名称冲突；重复检测会比较命令数组或 URL，防止两个 plugin 静默启动同一个底层服务器。

MCP 工具通过与内置工具相同的可见性和权限检查。deny 规则可以隐藏整个服务器命名空间，scoped rule 可以指向单个生成工具名。每个 MCP server 都应被视为信任边界：它可能读取远程数据、修改外部系统，或返回影响模型行为的 instructions。

<!-- section: configuration -->
## 配置和命令

项目服务器使用 `.mcp.json` 或 settings-backed MCP 配置。配置 schema 包括：

- `stdio`：`command`、可选 `args` 和可选 `env`；
- `sse` / `http`：`url`、可选 `headers`、可选 `headersHelper` 和可选 OAuth 配置；
- `ws`：`url`、可选 `headers`、可选 `headersHelper`；
- `sdk`：命名 SDK server；
- 集成使用的内部 IDE/proxy transport 类型。

修复 failed 或 needs-auth server 后，使用 `/mcp reconnect <server>`。使用 `/mcp enable <server>` 或 `/mcp disable <server>` 在不删除配置的情况下控制可用性。不要在公开文档中放 token，也不要提交本地专用 MCP 凭证。

<!-- section: source-evidence -->
## 源码依据

- `commands/mcp/mcp.tsx`：实现 `/mcp`、reconnect、enable 和 disable 命令行为。
- `services/mcp/types.ts`：定义 MCP transport 类型、config scope、server config schema 和连接状态。
- `services/mcp/config.ts`：加载 scoped configuration、原子写入 `.mcp.json`、合并 plugin servers 并去重重复 server 定义。
- `services/mcp/MCPConnectionManager.tsx` 与 `services/mcp/client.ts`：管理连接和 client 状态。
- `tools/MCPTool/MCPTool.ts`、`tools/ListMcpResourcesTool/ListMcpResourcesTool.ts` 和 `tools/ReadMcpResourceTool/ReadMcpResourceTool.ts`：向模型暴露 MCP 工具和资源。

<!-- section: related -->
## 相关页面

- [内置工具](tools.md)
- [Plugins](plugins.md)
- [Authentication](authentication.md)
- [权限和安全](permissions-security.md)
