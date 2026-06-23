# 快速开始

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

安装 CCL，配置网关或兼容模型提供方，进入项目目录，然后使用交互式会话或 print 模式开始。

<!-- section: capabilities -->
## 能力范围

- 运行 `ccl` 进入交互式会话。
- 运行 `ccl -p "summarize this repo"` 获取非交互输出。
- 认证、更新器或环境健康状态不明确时运行 `ccl doctor`。

<!-- section: operational-model -->
## 运行模型

- CCL 会加载设置、发现项目上下文、准备工具，然后通过配置好的 provider 路径路由模型请求。权限提示会保护文件编辑、shell 命令、MCP 工具和远程动作。

<!-- section: configuration -->
## 配置与命令

- 根据部署方式使用 `ccl login` 或 provider 环境变量。
- 基础会话可用后，使用 `ccl mcp` 添加外部工具 server。
- 使用 `ccl agents` 确认内置和自定义 agent 可见。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`
- `commands/login/login.tsx`
- `commands/mcp/mcp.tsx`
- `tools/AgentTool/builtInAgents.ts`

<!-- section: related -->
## 相关页面

- [安装与更新](installation.md)
- [认证](authentication.md)
- [网关与模型路由](model-routing.md)
- [MCP Server 与工具](mcp.md)
- [Agent](agents.md)
