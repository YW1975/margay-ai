# Hook

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

hook 允许 CCL 在工具执行和会话事件周围运行策略或自动化，包括权限决策、输入更新、停止行为和额外上下文。

<!-- section: capabilities -->
## 能力范围

- 通过命令入口查看和管理 hook。
- 使用 hook 结果为工具执行添加上下文、更新工具输入、阻止继续，或返回权限行为。
- 适合时通过插件、skill 或 agent 打包 hook 行为。

<!-- section: operational-model -->
## 运行模型

- hook 是确定性的策略面，不是对话建议。应保持小、可审计，并限定在其保护的事件范围内。
- PreToolUse hook 可以 allow、ask、deny 或更新输入，但 hook allow 仍会遵守 settings 中的 deny/ask 规则以及需要用户交互的工具要求。

<!-- section: configuration -->
## 配置与命令

- 相关模块：`commands/hooks`、`schemas/hooks.ts`、`services/tools/toolHooks.ts`、`services/tools/toolExecution.ts`、`skills/loadSkillsDir.ts`，以及插件 hook 加载。


<!-- section: source-evidence -->
## 源码依据

- `commands/hooks`
- `schemas/hooks.ts`
- `types/hooks.ts`
- `services/tools/toolHooks.ts`
- `services/tools/toolExecution.ts`
- `commands/plugin/PluginErrors.tsx`
- `skills/loadSkillsDir.ts`

<!-- section: related -->
## 相关页面

- [权限与安全](permissions-security.md)
- [插件](plugins.md)
- [内置工具](tools.md)
- [交互式命令](commands.md)
