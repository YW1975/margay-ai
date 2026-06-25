# CLI 参考

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

`ccl` 二进制提供交互入口、print 模式、MCP 管理、server 与远程连接命令、认证、插件管理、agent、自动化、更新器命令和 shell completion。

<!-- section: capabilities -->
## 能力范围

- 顶层命令包括 `mcp`、`server`、`ssh`、`open`、`auth`、`plugin`、`agents`、`auto-mode`、`doctor`、`update`、`install` 和 `completion`。
- 交互式 slash command 单独记录在 [命令](commands.md)，其中包括可用时的 cost、context、usage、gateway、endpoint 和 remote-control 入口。
- 内部用途命令不应写成稳定公开自动化 API。

<!-- section: operational-model -->
## 运行模型

- CLI 参考描述稳定的用户可见行为。源码帮助中标记为内部或部署特定的命令，应作为运维背景说明，而不是公开契约。

<!-- section: configuration -->
## 配置与命令

- 在安装后的构建中运行 `ccl --help` 和 `ccl <command> --help`，查看该构建实际可用的命令面。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`

<!-- section: related -->
## 相关页面

- [交互式命令](commands.md)
- [网关与模型路由](model-routing.md)
- [MCP Server 与工具](mcp.md)
- [插件](plugins.md)
- [Agent](agents.md)
- [远程会话与自动化](remote-automation.md)
