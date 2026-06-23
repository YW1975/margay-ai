# Skill

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

skill 是可复用的指令包，CCL 可在任务匹配 description 时发现并应用，也可通过可用的 skill 工具调用。

<!-- section: capabilities -->
## 能力范围

- 发现本地和远程 skill。
- 只加载当前任务需要的 skill 指令。
- 在仓库策略允许时，将 skill 与 agent、工作流和插件组合使用。

<!-- section: operational-model -->
## 运行模型

- skill description 是触发契约。触发文本要精准，长流程放在正文或引用文件中。

<!-- section: configuration -->
## 配置与命令

- 相关模块：`tools/SkillTool`、`tools/DiscoverSkillsTool`、`services/skillSearch` 和 `commands/skills`。

<!-- section: source-evidence -->
## 源码依据

- `tools/SkillTool`
- `tools/DiscoverSkillsTool`
- `services/skillSearch`
- `commands/skills`

<!-- section: related -->
## 相关页面

- [Agent](agents.md)
- [插件](plugins.md)
- [工作流](workflows.md)
- [交互式命令](commands.md)
