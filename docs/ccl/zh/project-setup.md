# 项目设置

> 本页作为公开文档源维护。项目指令应保持简洁，长流程应放入 skills、hooks、workflows 或被引用文件。

<!-- section: purpose -->
## Purpose

一个适配 CCL 的项目，应告诉后续会话哪些内容不能仅靠代码安全推断：非显而易见的构建命令、验证命令、项目约束、可信工具边界、本地扩展目录和团队约定。项目设置不只是 onboarding，它是让 agents、subagents、workflows 和 reviewers 在同一个仓库中无需猜测即可工作的契约。

<!-- section: capabilities -->
## Capabilities

- 用 `/init` 创建或改进基于 CCL.md 的项目指令。
- 选择 `/init` 要准备项目 CCL.md、个人 CCL.local.md、两者，以及是否同时建议 skills 和 hooks。
- 让 `/init` 检查 manifest、README、CI 文件、已有 AI 指令、`.mcp.json`、`.ccl/skills`、`.ccl/rules`、formatter 配置和 worktree 状态。
- 将团队共享指导放入项目指令，将个人偏好放入 `CCL.local.md`。
- 将长内容或路径相关指导拆到 `.ccl/rules/` 文件，并使用 path frontmatter，而不是塞进始终加载的根文件。
- 为可重复流程添加项目 skills，为确定性检查如格式化添加 hooks。
- 把项目设置、本地设置、MCP 配置、agents、skills、hooks 和 workflows 作为独立层使用，而不是把所有流程写进一个指令文件。

<!-- section: operational-model -->
## Operational model

`/init` 是 prompt command，不是隐藏生成器。它会询问要设置什么，探索仓库，只补充代码无法回答的缺口，提出 artifact 方案，并在用户接受后写入简洁文件。该 prompt 明确要求 CCL 避免泛泛建议、避免编造章节，只保留删除后会导致错误的内容。

核心原则是加载预算纪律。CCL.md 会被相关会话读取，因此应只包含高信号项目约束。长 API 参考、部署 runbook、发布流程和专业知识应放在 skills、workflows 或被引用 markdown 文件中。个人细节应放在 `CCL.local.md` 或由它引用的 home 目录文件中，不应放入共享项目文件。

对于 monorepo 或多模块项目，根指令可以定义全局约束，子目录 CCL.md 可提供模块级指导。对于大量使用 worktree 的项目，个人指令可能需要一个共享 home 目录文件，并在每个 sibling worktree 中放一个短本地 stub。

<!-- section: configuration -->
## Configuration and commands

- 在交互式 CCL 会话中运行 `/init` 创建或更新设置 artifact。
- 用 `CCL.md` 保存团队共享指令。
- 用 `CCL.local.md` 保存个人项目指令，并加入 `.gitignore`。
- 用 `.ccl/rules/*.md` 保存聚焦且可按路径作用的指令文件。
- 用 `.ccl/skills/<name>/SKILL.md` 保存可复用任务流程。
- 用 `.ccl/settings.json` 保存团队共享项目设置，用 `.ccl/settings.local.json` 保存个人覆盖。
- 用 `.mcp.json` 或 MCP 命令配置项目 MCP 服务器。
- 修改后用 `/config`、`/permissions`、`/mcp`、`/agents`、`/skills`、`/hooks`、`/workflows` 和 `/doctor` 检查项目设置。

<!-- section: source-evidence -->
## Source evidence

- `commands/init.ts` 定义当前 `/init` 工作流，包括项目/个人 CCL.md 选择、skill 和 hook 方案、仓库探索，以及对简洁指令的严格要求。
- `utils/claudemd.ts` 与 `utils/markdownConfigLoader.ts` 加载 markdown 指令文件和路径限定配置。
- `utils/settings/constants.ts` 定义 `.ccl` 项目配置目录。
- `skills/loadSkillsDir.ts` 加载项目、用户、托管、插件、内置和动态发现的 skills。
- `commands/config/config.tsx`、`commands/permissions/permissions.tsx`、`commands/mcp/mcp.tsx`、`commands/agents/agents.tsx`、`commands/skills/skills.tsx` 和 `commands/hooks/hooks.tsx` 暴露项目设置入口。
- `main.tsx` 定义 `--add-dir`、`--settings`、`--agents`、`--mcp-config`、`--plugin-dir` 和 `--bare` 等显式启动输入。

<!-- section: related -->
## Related pages

- [快速开始](quickstart.md)
- [配置与设置](configuration.md)
- [Skills](skills.md)
- [Hooks](hooks.md)
- [MCP 服务器与工具](mcp.md)
- [常见工作流](common-workflows.md)
