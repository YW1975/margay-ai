# Agents

> 本页作为公开文档源维护。Agent description 是路由契约，必须精确。

<!-- section: purpose -->
## Purpose

CCL agents 是专门执行上下文，用于探索、计划、审查、测试、验证、指导、后台研究和自定义委派任务。主 session 可以让一个聚焦 worker 带着自己的 instructions、model preference、tool rules、MCP requirements、hooks、memory scope 和可选 background behavior 工作。

<!-- section: capabilities -->
## Capabilities

- 内置 agents 包括 general-purpose、code-reviewer、test-runner、Debug、statusline setup，以及受 feature gate 控制的 Explore、Plan、guide 和 verification agents。
- 自定义 agents 是 Markdown definitions，可从 user、project、local、managed 或 CLI argument sources 加载。
- Plugin agents 从已安装 plugin bundles 加载，并以单独 source 显示。
- Agents 可声明 `tools`、`disallowedTools`、`skills`、`mcpServers`、`hooks`、`model`、`effort`、`permissionMode`、`maxTurns`、`background`、`memory` 和 isolation settings。
- Agent 可用性可以取决于已配置 MCP servers；缺少 required MCP servers 时，该 agent 会隐藏。
- `/agents` 和 `ccl agents --setting-sources user,project,local` 用于检查 active agents 和胜出的 source。

<!-- section: operational-model -->
## Operational model

Agent discovery 先加载 built-ins，再加入 plugin 和 custom definitions。自定义 Markdown 文件必须有 `name` 和 `description` frontmatter。无效 agent attempts 会被跳过并记录；通过 `--agents` 传入的 JSON agents 是逐个失败，不会因为一个坏定义丢弃整批。

Active agents 按 `agentType` 与 source priority 去重。显示逻辑把它们分成 user、project、local、managed、plugin、CLI arg 和 built-in agents，并标注哪个 source 覆盖了另一个。Simple mode 只保留 built-ins。

Agent 运行时，CCL 会解析 tool set、model、MCP tools 和 lifecycle context。`SubagentStart` hooks 可以追加 context；agent frontmatter hooks 只有在 source 符合 plugin-only policy 的信任要求时才注册。Frontmatter 中列出的 skills 会在可用时预加载。Background agents 使用不关联的 abort controller 和非交互执行；同步 agents 会共享更多父 session 状态。

<!-- section: configuration -->
## Configuration and commands

最小自定义 agent 形状：

```markdown
---
name: repo-reviewer
description: Use when a repository change needs an independent correctness review.
tools: Read,Grep
model: inherit
maxTurns: 8
---
Review the changed files for correctness risks, missing tests, and unsafe assumptions.
```

操作建议：

- 保持描述简短具体；它是主要路由信号。
- 工具列表只授予真正需要的能力。
- 显式列出不应使用的工具。
- 如果 agent 依赖外部工具，应声明必需的 MCP 服务。
- 只有工作能安全地在主会话继续时，才使用后台运行设置。
- Agent 记忆只保存持久、非密钥、适合跨运行复用的知识。

## Debug Agent

内置 Debug agent 是调试专家，面向 bug 报告、回归和「X 不工作」类任务——即以「查明为什么坏了并修好」为主、而不是「构建新东西」的任务。

它的取证纪律不可协商：

- 先复现。改任何代码之前，必须先产出可复现的失败证据——一个在报告行为上返回红色的 probe 断言，或一条带输出捕获的失败测试/命令。
- 一次一个假设、一个可判定实验。每个根因假设都配一个结果能判定它的实验；绝不叠加两个未验证的假设。
- 修复后必须让同一份证据变绿。用相同 oracle 重跑完全相同的红色复现；换一个更弱的检查不算数。
- 报告输出是：根因链（症状、机制、起点，附文件引用）、证据清单（每个实验及其判定）和最小修复 diff。复现或证明失败时，必须诚实写「未证实」。

Debug agent 通过 debug probe 工具驱动复现。平台支持现状：

| 平台 | 状态 |
| --- | --- |
| `tui` | 全量支持：在隔离终端 pane 中启动应用、发送按键序列、捕获 pane 文本并断言 oracle。 |
| `web` | 最小支持：headless 浏览器页面（点击/填写/输入、DOM 快照、console 与 network 捕获）。需要本地安装浏览器自动化依赖；缺失时 probe 会给出清晰的不可用错误和安装指引。 |
| `desktop` | 尚不支持；probe 返回清晰错误。 |

Debug agent 运行在 analysis capability pool 上，因此 quality 路由优先级会自动把它送到强模型；它不能派生嵌套 agents。

<!-- section: source-evidence -->
## Source evidence

- `tools/AgentTool/builtInAgents.ts` 定义内置 agent 注册、功能门禁、SDK 禁用行为和非 SDK 入口的 guide agent 加载。
- `tools/AgentTool/loadAgentsDir.ts` 定义 `AgentDefinition`、来源类型、frontmatter 字段、MCP 过滤、记忆快照初始化、Markdown/JSON 解析和内置 agent 回退行为。
- `tools/AgentTool/runAgent.ts` 解析工具、模型、MCP 工具、hooks、skills、后台行为、中止控制器和子 agent 上下文。
- `commands/agents/agents.tsx` 使用当前权限上下文和可用工具集合渲染 agents menu。
- `tools/AgentTool/agentDisplay.ts` 定义来源分组顺序、覆盖标注和显示模型解析。
- `tools/AgentTool/built-in/debugAgent.ts` 定义 Debug agent：触发描述、取证纪律、probe 优先的 system prompt、analysis pool 模型和嵌套 agent 禁用。
- `tools/DebugProbeTool/` 实现 probe providers：终端 pane 全量支持、headless web 最小支持，以及未支持的 desktop 占位。

<!-- section: related -->
## Related pages

- [子 Agents](sub-agents.md)
- [内置工具](tools.md)
- [Skills](skills.md)
- [MCP 服务器与工具](mcp.md)
- [权限与安全](permissions-security.md)
