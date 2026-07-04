# Skills

> 本页作为公开文档源维护。skill 描述是激活契约，应保持精确。

<!-- section: purpose -->
## Purpose

Skills 是 CCL 暴露为 prompt commands 的可复用指令包。一个 skill 应捕获可重复能力、专家流程或参考知识；这些内容如果总是加载会太大，或者只在特定任务中才需要。Skills 让用户和 agents 在正确时机调用正确流程，而不膨胀每个会话。

<!-- section: capabilities -->
## Capabilities

- 从托管设置、用户 skill 目录、项目 `.ccl/skills`、额外目录、CLI 内置 skills、插件和启用时的 MCP skill builders 加载 skills。
- 支持 `SKILL.md` 目录格式和 legacy command-style markdown 文件。
- 通过 frontmatter 提供名称、描述、参数提示、命名参数、允许工具、when-to-use、版本、模型、effort、shell、hooks、目标 agent、forked execution context、用户可见性、路径过滤和是否允许模型调用。
- 将长参考文件放在 skill 旁边，仅在调用 skill 时加载。
- 用条件 `paths` frontmatter 让 skill 只在匹配文件被触碰后激活。
- 对有副作用且只能由用户触发的 skill，使用 `disable-model-invocation`。
- 用 `/skills` 查看当前会话可用的 skill commands。

<!-- section: operational-model -->
## Operational model

CCL 先根据 frontmatter 估算 skill 成本，而不是急切加载每个 skill 的正文。完整 skill 内容只在被调用或被选中时加载。这可以缩小初始上下文，同时保留专业流程的可用性。

Skill 名称来自目录或文件结构，并通过规范化文件身份去重。托管、用户、项目、额外目录、legacy、插件、内置和 MCP 来源都可以贡献 commands。靠近活动文件路径的项目 skills 可以覆盖更浅层的 skills。`--bare` 会跳过自动的托管/用户/项目目录遍历和 legacy command discovery，但显式额外目录仍可提供 skills。

Frontmatter 是运行语义，不是装饰。`allowed-tools` 限制 skill 可用工具。`model` 和 `effort` 可影响执行。`context: fork` 在 forked context 中运行 skill。`agent` 可指定目标 agent。`hooks` 可附加 hook 行为。`paths` 可让 skill 在相关文件编辑前保持 latent。

Skills 不同于 agents 和 workflows。Agent 定义角色或专家 worker。Workflow 编排可重复的多步执行。Skill 是可复用指令能力，可由用户调用或由模型在策略允许时选择。

<!-- section: configuration -->
## Configuration and commands

- 用户 skills 位于 CCL 配置 home 的 `skills` 目录。
- 项目 skills 位于 `.ccl/skills/<skill-name>/SKILL.md`。
- 托管 skills 位于托管设置路径加 `.ccl/skills`。
- 插件 skills 由插件 manifest 和插件 skill 目录加载。
- 用 `/skills` 打开当前会话的 skills 菜单。
- 设置项目时可用 `/init`，它能根据仓库分析建议可重复工作流对应的 skills。
- 对隐藏或内部 skills 使用 `user-invocable: false`；只应由用户触发时使用 `disable-model-invocation: true`。
- 当 skill 只适用于某个子系统或文件族时，使用路径过滤。

<!-- section: source-evidence -->
## Source evidence

- `skills/loadSkillsDir.ts` 定义 skill 来源类型、路径解析、frontmatter 解析、SKILL.md 加载、legacy command 加载、去重、条件路径激活、动态发现和 bare-mode 行为。
- `skills/bundledSkills.ts` 注册内置 skills，并把内置参考文件懒加载到安全临时 skill root。
- `skills/mcpSkills.ts` 定义 MCP skill 加载集成点。
- `commands/skills/skills.tsx` 使用会话 command 列表打开 skills 菜单。
- `services/skillSearch/*` 包含被 command 和 tool surfaces 消费的、受 feature gate 控制的远程/本地 skill search 集成 stub。
- `utils/settings/pluginOnlyPolicy.ts` 与 `utils/settings/types.ts` 定义可将 skills 限制到批准插件通道的策略。
- `utils/frontmatterParser.ts` 和 `utils/argumentSubstitution.ts` 支持 skill metadata 与参数替换。

<!-- section: related -->
## Related pages

- [项目设置](project-setup.md)
- [插件](plugins.md)
- [Agents](agents.md)
- [Workflows](workflows.md)
- [Hooks](hooks.md)
- [交互式命令](commands.md)
