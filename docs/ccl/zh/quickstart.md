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

## 最小首次运行

当你想确认二进制、凭据、模型路由和基础工具策略是否可用时，使用这条路径。
1. 打开一个项目目录。
2. 运行 `ccl --help`，确认二进制能被 shell 找到。
3. 如果安装、更新器健康或 workspace trust 不明确，运行 `ccl doctor`。
4. 按部署批准的方式配置凭据：`ccl login`、环境变量，或在交互会话中运行 `/gateway login URL API_KEY`。
5. 需要非写入 smoke test 时，运行 `ccl -p "Summarize this repository in five bullets." --allowedTools ""`。
6. 非交互路径可用后，再运行 `ccl` 进入交互式会话。

## 如何确认成功

健康的首次运行有三个信号：CLI 启动时没有参数解析错误；模型请求到达配置的 provider 或网关；响应返回时没有要求意外的破坏性权限。如果响应在接触模型前失败，先看安装和环境变量。如果请求到达 provider 但认证失败，先看认证、网关与模型路由。如果出现意外工具提示，检查权限与安全。

## 首次运行常见问题

| 症状 | 可能原因 | 下一步 |
| --- | --- | --- |
| 找不到 `ccl` | 二进制未安装，或 shell PATH 仍是旧状态 | 按包管理器方式安装，然后重启 shell 或刷新 PATH。 |
| Gateway 提示未配置 | 没有 `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY`，也没有可用 gateway 文件 | 使用 `/gateway login URL API_KEY`，或同时设置两个环境变量。 |
| Provider 收到错误 URL | 路由关键变量混用了 | Margay 网关路由使用 `CCL_GATEWAY_*`；不要用兼容 SDK 变量保存网关凭据。 |
| Print 模式下 slash command 不可用 | 该命令仅支持交互模式 | 使用顶层 CLI 命令，或进入交互式会话。 |

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
