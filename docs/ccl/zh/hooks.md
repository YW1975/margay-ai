# Hook

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

hook 允许 CCL 在工具执行和会话事件周围运行策略或自动化，包括权限决策、输入更新、停止行为和额外上下文。

<!-- section: capabilities -->
## 能力范围

- 通过命令入口查看和管理 hook。
- 在工具执行策略中使用 hook 结果。
- 适合时通过插件打包 hook 行为。

<!-- section: operational-model -->
## 运行模型

- hook 是确定性的策略面，不是对话建议。应保持小、可审计，并限定在其保护的事件范围内。

<!-- section: configuration -->
## 配置与命令

- 相关模块：`commands/hooks`、`services/tools/toolHooks.ts`、`services/tools/toolExecution.ts`，以及插件 hook 加载。

<!-- section: source-evidence -->
## 源码依据

- `commands/hooks`
- `services/tools/toolHooks.ts`
- `services/tools/toolExecution.ts`
- `commands/plugin/PluginErrors.tsx`

<!-- section: related -->
## 相关页面

- [权限与安全](permissions-security.md)
- [插件](plugins.md)
- [内置工具](tools.md)
- [交互式命令](commands.md)
