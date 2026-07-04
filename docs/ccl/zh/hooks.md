# Hooks

> 本页作为 CCL 公开文档源维护。若将来恢复生成流程，必须先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 用途

Hooks 让 CCL 在确定的生命周期点运行可重复的策略、自动化或观测逻辑。它适合围绕工具调用、session 开始/结束、context compact、权限、通知、任务事件、文件变化和其他运行时事件执行流程规则。

Hooks 应用于可执行的流程规则，而不是模糊的对话建议。一个 hook 应该做边界清晰的决策、附加上下文、更新输入，或记录之后可检查的证据。

<!-- section: capabilities -->
## 能力

持久化 hook 配置支持四种命令类型：

- `command`：运行 shell 命令。
- `prompt`：让模型评估一个 prompt。
- `http`：把 hook input JSON POST 到 HTTP endpoint。
- `agent`：运行 agentic verifier prompt。

Hooks 可以通过 `if` 字段过滤，语法与工具权限规则一致，例如匹配工具名或有作用域的命令模式。Hooks 可配置单个 hook 的 timeout、自定义状态消息和 one-shot 行为。command hook 还可以异步运行；`asyncRewake` hook 如果以 blocking error 结束，可以唤醒模型。

运行时还存在 session-only function hook。它们不能持久化到 settings 文件，这样可以把内存中的 verifier callback 和用户可编辑配置隔离开。

<!-- section: operational-model -->
## 运行模型

Hooks 围绕主工具和 session loop 执行。`PreToolUse` hook 在工具执行前运行，可以影响权限行为或更新输入。`PostToolUse` hook 在执行成功后运行，可以添加上下文、停止继续，或更新 MCP 工具输出。`PostToolUseFailure` hook 在工具失败时运行。`PermissionRequest` 和 `PermissionDenied` hook 让自动化观察或决定审批路径。

生命周期事件还包括 `SessionStart`、`SessionEnd`、`Stop`、`StopFailure`、`SubagentStart`、`SubagentStop`、`PreCompact`、`PostCompact`、`UserPromptSubmit`、`Setup`、`TaskCreated`、`TaskCompleted`、`ConfigChange`、`InstructionsLoaded`、`CwdChanged` 和 `FileChanged`。

Hook 失败应该可见但有边界。Session-end hook 默认使用较短关闭超时；普通 tool hook 使用较长的 tool-hook timeout。长时间运行的 async hook 应保证取消、重试和重复事件都是安全的。

<!-- section: configuration -->
## 配置和命令

使用 `/hooks` 在交互界面检查和管理 hooks。只有当项目所有用户都应该继承时，才把共享 hook 存入项目或 managed settings。需要资产、脚本或发布管理的可复用 hook 行为，应通过 plugin 或 skill 打包。

操作建议：

- hook 输出保持简洁；过大输出会被截断。
- 使用 `if` 过滤，避免无关工具调用也启动 hook。
- 确定性本地检查优先用 command hook，已有策略服务优先用 HTTP hook。
- 只有确实需要判断且能接受延迟时，才使用 prompt 或 agent hook。
- 不要把 secret 放入 hook 定义。如果 header 需要环境变量，必须显式列出允许插值的变量。

<!-- section: source-evidence -->
## 源码依据

- `schemas/hooks.ts`：定义持久化 hook 命令类型、matcher 配置、`if` 条件、timeout、async 字段和环境变量插值控制。
- `entrypoints/sdk/coreTypes.ts`：定义 canonical `HOOK_EVENTS` 列表。
- `utils/hooks.ts`：执行 hook，管理输出截断、session-end timeout、async 行为和 hook 事件发送。
- `utils/hooks/sessionHooks.ts`：保存临时 session/function hooks，并说明 function hook 不持久化。
- `services/tools/toolHooks.ts`：把 `PreToolUse`、`PostToolUse` 和 failure hooks 接入工具执行。

<!-- section: related -->
## 相关页面

- [内置工具](tools.md)
- [权限和安全](permissions-security.md)
- [Plugins](plugins.md)
- [Skills](skills.md)
