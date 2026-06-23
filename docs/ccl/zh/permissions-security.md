# 权限与安全

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 通过权限模式、工具 allowlist、shell 与路径校验、PowerShell 安全、hook、sandbox 决策、密钥处理和公开发布审计保护执行。

<!-- section: capabilities -->
## 能力范围

- 批准前审阅文件写入、shell 命令、MCP 操作和远程动作。
- 对 shell 执行使用只读校验和破坏性命令警告。
- 发布文档或产物前运行公开内容审计。

<!-- section: operational-model -->
## 运行模型

- 安全是分层的。某个工具即使被一层允许，也可能因为策略要求被另一层阻止或改写。

<!-- section: configuration -->
## 配置与命令

- 相关模块：`commands/permissions`、`tools/BashTool`、`tools/PowerShellTool`、`services/tools`、`services/teamMemorySync/secretScanner.ts` 和公开审计脚本。

<!-- section: source-evidence -->
## 源码依据

- `commands/permissions`
- `tools/BashTool`
- `tools/PowerShellTool`
- `services/tools/toolExecution.ts`
- `services/teamMemorySync/secretScanner.ts`

<!-- section: related -->
## 相关页面

- [内置工具](tools.md)
- [Hook](hooks.md)
- [插件](plugins.md)
- [GitHub 与 CI 工作流](github-ci.md)
