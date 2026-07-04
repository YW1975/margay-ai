# 交互式会话和 Print Mode

> 本页作为 CCL 公开文档源维护。若将来恢复生成流程，必须先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 用途

CCL 有两个主要操作界面。默认界面是交互式终端 session，用于迭代工作、审批、slash commands、context inspection 和长期协作。非交互界面是 print mode，通过 `-p` 或 `--print` 启用，适用于脚本、CI、SDK-style caller 和确定性命令流水线。

应按任务选择界面。如果任务需要用户判断、审批、探索或从模糊工具结果中恢复，使用交互式模式。如果任务有明确输入、受限工具权限和可机器检查输出，使用 print mode。

<!-- section: capabilities -->
## 能力

交互式 session 保留对话状态，并提供 `/resume`、`/compact`、`/context`、`/clear`、`/export`、`/copy`、`/cost`、`/session` 和 workflow commands 等本地命令。它也是 permission prompt、plan mode、需要用户可见性的 hook，以及手动检查工具结果的正常位置。

Print mode 支持 `--output-format text`、`--output-format json` 和 `--output-format stream-json`。它还支持 stream input、partial message streaming、hook event streaming、JSON schema constrained output、`--max-turns`、`--max-budget-usd`、显式 tool allow/deny list、permission mode、MCP config、自定义 system prompt 和 session resume options。默认 headless turn 上限是 70；只有当调用方有外部 timeout 或 watchdog 时才使用 `--max-turns 0`。

`--bare` 是受控自动化的最小模式。它跳过 hooks、LSP、plugin sync、attribution、auto-memory、background prefetch、keychain 读取和自动 CCL instruction discovery。由于它移除了有帮助的上下文，使用时应通过 system prompt、settings、agents、plugin dirs、MCP config 或 allowed directories 显式提供上下文。

<!-- section: operational-model -->
## 运行模型

交互式模式拥有终端事件循环。它可以请求权限、更新 session 状态、渲染进度，并允许用户检查或取消。除非显式禁用，session persistence 会启用，因此后续 resume 可以恢复历史。

Print mode 把 CCL 当成命令行 API。它会跳过 workspace trust dialog，所以只应在信任目录中使用。调用方必须提供所有上下文，并检查 exit status 和 output shape。在 streaming JSON 模式中，应使用事件流，而不是抓取终端文本。

Resume 行为在两种模式中都很重要。`--continue` 恢复当前目录最近的对话。`--resume <id>` 恢复指定 session，`--fork-session` 则从已恢复对话创建新的 session ID，而不是继续修改原 session。

<!-- section: configuration -->
## 配置和命令

常用交互式命令：

- `/resume`：选择或搜索历史对话。
- `/compact`：当 session 变大时进行摘要或减小上下文。
- `/context`：显示 API-facing context view，包括 compact/collapse 转换。
- `/clear`：开始新的对话状态。
- `/export`、`/copy`、`/cost`、`/session`：导出、复制、查看成本或显示 remote-session 信息。

常用 print-mode 模式：

- `ccl -p "Summarize this repo" --output-format text`
- `ccl -p "Return JSON" --output-format json --json-schema '<schema>'`
- `ccl -p "Run bounded task" --max-turns 20 --allowed-tools Read Grep`
- `ccl -p "Use MCP" --mcp-config ./mcp.json --permission-mode default`

不要把 `--dangerously-skip-permissions` 当成常规自动化路径。CI 中优先使用窄 `--allowed-tools` / `--disallowed-tools` 规则和外部 timeout。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`：定义默认交互式启动、`-p/--print`、输出/输入格式、`--bare`、resume/fork flags、permission flags 和 print-mode 安全文案。
- `cli/print.ts`：实现非交互运行时、structured I/O、tool pool assembly、permission prompt tool integration、MCP setup 和 session resume handling。
- `cli/printMaxTurns.ts`：定义 70-turn 默认值，以及 `CCL_PRINT_MAX_TURNS` / `--max-turns` 行为。
- `commands/resume/resume.tsx`、`commands/compact/compact.ts`、`commands/context/context.tsx`、`commands/clear/clear.ts`、`commands/export/export.tsx`、`commands/cost/cost.ts` 和 `commands/session/session.tsx`：实现主要交互式 session 命令。

<!-- section: related -->
## 相关页面

- [CLI 参考](cli-reference.md)
- [交互式命令](commands.md)
- [记忆、上下文和会话](memory-sessions.md)
- [Workflows](workflows.md)
