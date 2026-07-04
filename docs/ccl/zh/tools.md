# 内置工具

> 本页作为 CCL 公开文档源维护。若将来恢复生成流程，必须先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 用途

工具是模型和宿主环境之间真正执行动作的边界。CCL 提供读取和编辑文件、运行 shell 命令、搜索工作区、访问 Web、管理任务和目标、向用户提问、委托 agent、读取 MCP 资源以及运行 workflow 自动化的工具。

实际判断规则是：模型可以提出工具调用，但输入校验、权限检查、hook 执行、遥测、流式进度和结果回传都由 CCL 运行时负责。任务行为异常时，应先定位工具层，而不是直接假设模型没有理解需求。

<!-- section: capabilities -->
## 能力

核心文件和搜索工具包括 `Read`、`Write`、`Edit`、`NotebookEdit`、`Glob` 和 `Grep`。`Bash` 是主要本地命令执行工具；`PowerShell` 只会在对应 shell 功能启用时暴露。外部上下文工具包括 `WebFetch`、`WebSearch`、MCP 工具、MCP 资源列举/读取，以及在特性开关启用时出现的浏览器或终端面板能力。

协作类工具覆盖 agent 委托、任务管理、todo 更新、目标状态、进入/退出 plan mode、用户问题、review artifact、远程触发、定时 cron、团队消息、worktree 进入/退出和 workflow 执行。不是每个构建都会包含每个工具；`tools.ts` 先构造基础工具列表，再按特性开关、环境、权限上下文、simple mode 和 MCP 服务器提供的工具进行过滤。

MCP 工具会和内置工具放进同一个工具池。它们通常使用 `mcp__server__tool` 命名，这使权限规则可以指向单个工具、整个服务器或服务器通配规则。

<!-- section: operational-model -->
## 运行模型

工具执行按分层路径运行：

1. 当前 session 从内置工具和已连接 MCP 工具组装工具池。
2. blanket deny 规则先移除模型不可见的工具。
3. 模型按名称和结构化输入请求工具。
4. CCL 校验输入 schema 并运行 pre-tool hook。
5. 权限逻辑根据显式规则、权限模式、sandbox 状态、classifier 状态、SDK permission prompt 和 hook 决策，给出 allow、ask 或 deny。
6. 只有 allow 后工具才执行。
7. CCL 流式展示进度，并运行 post-tool 或 post-failure hook。
8. 结果转换为 tool-result 内容返回给模型。

这套分层对运维很关键。allow 规则可以让常见命令更顺畅，但 deny 规则、安全检查、工具自身校验或 hook 仍然可以阻止调用。反过来，用 blanket deny 从 prompt 中隐藏工具，比依赖模型自觉避开更可靠。

<!-- section: configuration -->
## 配置和命令

使用 `--allowed-tools`、`--disallowed-tools`、`/permissions`、项目 settings 和 managed settings 控制哪些工具可见或可执行。工具规则语法支持整工具规则，如 `Read`，也支持作用域规则，如 `Bash(git status)`，以及 MCP 服务器规则，如 `mcp__docs` / `mcp__docs__*`。

只有在明确需要缩小工具面时才使用 simple mode。simple mode 会保留较小的本地编辑循环，通常围绕 shell/read/edit 操作；只有 coordinator 功能需要时才会额外加入协作工具。

对于可重复自动化，优先使用 workflow 或 print mode，并给出明确预期输出。对于探索性工作，保留交互式 session，这样权限 prompt 和用户问题不会在 headless 环境中被静默拒绝。

<!-- section: source-evidence -->
## 源码依据

- `tools.ts`：`getAllBaseTools()`、`getTools()`、`assembleToolPool()` 和 `filterToolsByDenyRules()` 定义工具清单和过滤逻辑。
- `services/tools/toolExecution.ts`：校验工具输入、运行 hook、记录遥测、分类错误并返回 tool-result 内容。
- `services/tools/toolHooks.ts`：把 pre/post tool hook 接入工具执行和权限行为。
- `utils/permissions/permissions.ts`：在执行前解析 allow/ask/deny 决策。
- `services/mcp/utils.ts` 和 `services/mcp/mcpStringUtils.ts`：定义 MCP 工具命名与权限匹配行为。

<!-- section: related -->
## 相关页面

- [权限和安全](permissions-security.md)
- [Hooks](hooks.md)
- [MCP 服务器和工具](mcp.md)
- [Workflows](workflows.md)
