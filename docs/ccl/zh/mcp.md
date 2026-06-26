# MCP Server 与工具

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 集成 Model Context Protocol server，用于外部工具、资源、prompt、OAuth 流程、IDE bridge 和扩展提供的能力。

<!-- section: capabilities -->
## 能力范围

- 使用 `ccl mcp` 管理 server，包括 reconnect、enable 和 disable 操作。
- 通过内置工具列出并读取 MCP resource，并以 `mcp__server__tool` 名称暴露 MCP 工具。
- 通过 MCP service 处理 OAuth 与 channel 权限。

<!-- section: operational-model -->
## 运行模型

- MCP server 会扩展工具面。只安装可信 server，约束作用域，并记录每个 server 可读取或修改的数据。
- 远程认证失败会被短暂缓存为 needs-auth 状态，避免重复连接形成噪声重试循环。

<!-- section: configuration -->
## 配置与命令

- 相关区域：`commands/mcp`、`services/mcp`、`tools/MCPTool`、`tools/ListMcpResourcesTool` 和 `tools/ReadMcpResourceTool`。
- MCP transport 包括 stdio、SSE、streamable HTTP、WebSocket/control transport，以及配置后的 provider-proxy 路径。


<!-- section: source-evidence -->
## 源码依据

- `commands/mcp`
- `services/mcp`
- `tools/MCPTool`
- `tools/ListMcpResourcesTool`
- `tools/ReadMcpResourceTool`

<!-- section: related -->
## 相关页面

- [内置工具](tools.md)
- [插件](plugins.md)
- [认证](authentication.md)
- [权限与安全](permissions-security.md)
