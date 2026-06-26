# 内置工具

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 工具是模型和 agent 可执行的能力，覆盖 shell、文件 I/O、搜索、Web、LSP、计划、任务、目标、团队、MCP、工作流、审阅产物、调度和用户交互。

<!-- section: capabilities -->
## 能力范围

- 文件工具：Read、Write、Edit、NotebookEdit、Glob、Grep 和 LSP 操作。
- 执行工具：Bash、PowerShell、terminal capture、workflow run、scheduled cron 和 remote trigger。
- 协作工具：AgentTool、SendMessage、Task、Team、Todo、Goal、AskUserQuestion 和 review artifact。

<!-- section: operational-model -->
## 运行模型

- 工具在权限和安全策略下运行。只读工具仍可能把敏感数据带入 prompt，因此公开文档不能包含真实密钥或私有路径示例。

<!-- section: configuration -->
## 配置与命令

- 使用工具 allowlist、权限模式、hook 和托管设置，按项目或环境约束工具执行。


<!-- section: source-evidence -->
## 源码依据

- `tools`
- `services/tools/toolExecution.ts`
- `tools/BashTool`
- `tools/FileReadTool`
- `tools/MCPTool`

<!-- section: related -->
## 相关页面

- [权限与安全](permissions-security.md)
- [Agent](agents.md)
- [MCP Server 与工具](mcp.md)
- [工作流](workflows.md)
