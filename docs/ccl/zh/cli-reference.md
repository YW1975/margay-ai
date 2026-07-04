# CLI 参考

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

`ccl` 二进制提供交互入口、print 模式、MCP 管理、认证、插件管理、agent、workflow 自动化、更新命令和安装诊断。

<!-- section: capabilities -->
## 能力范围

- 当前公开顶层命令包括 `agents`、`auth`、`doctor`、`install`、`mcp`、`plugin` 或 `plugins`、`setup-token`、`update` 或 `upgrade`、`workflow`。
- 交互式 slash command 单独记录在 [命令](commands.md)，其中包括可用时的 cost、context、usage、gateway、endpoint 和 remote-control 入口。
- 内部用途命令不应写成稳定公开自动化 API。

<!-- section: operational-model -->
## 运行模型

- CLI 参考描述稳定的用户可见行为。源码帮助中标记为内部或部署特定的命令，应作为运维背景说明，而不是公开契约。

<!-- section: configuration -->
## 配置与命令

- 在安装后的构建中运行 `ccl --help` 和 `ccl <command> --help`，查看该构建实际可用的命令面。

## 终端命令分组

| 命令组 | 示例 | 何时使用 |
| --- | --- | --- |
| 会话入口 | `ccl [prompt]`, `ccl -p "..."`, `ccl --output-format json` | 启动交互式会话，或运行可脚本化的一次性 prompt。 |
| MCP | `ccl mcp` | 配置和管理外部工具 server。 |
| 认证 | `ccl auth`, `ccl setup-token` | 检查或修改账号认证状态。 |
| 插件 | `ccl plugin`, `ccl plugins` | 管理插件供应链输入和已安装扩展包。 |
| Agent | `ccl agents --setting-sources user,project,local` | 列出 active agent 并排查来源可见性。 |
| 工作流 | `ccl workflow` | 运行、校验和管理 workflow 自动化。 |
| 运维 | `ccl doctor`, `ccl update`, `ccl upgrade`, `ccl install` | 检查健康或更新/安装构建。 |

## Print 模式

当 prompt 和输出需要显式、可脚本化时使用 print 模式。只读 smoke test 优先使用空 allowed-tools 列表；只有调用方准备好解析 JSON 或 stream JSON 时，才请求这些格式。

示例：`ccl -p "List the top-level directories and their purpose." --allowedTools ""`

重要 print-mode 控制项：

| 选项 | 作用范围 | 说明 |
| --- | --- | --- |
| `-p`, `--print` | 非交互执行 | 运行一个 prompt 后退出；workspace trust 提示会被跳过，因此只在可信目录使用。 |
| `--output-format text` | 人类可读输出 | 默认 print-mode 输出。 |
| `--output-format json` | 脚本输出 | 输出一个最终 JSON 结果；调用方仍要单独处理非零退出码。 |
| `--output-format stream-json` | 流式集成 | 输出增量事件，通常与 `--input-format stream-json` 配合。 |
| `--include-partial-messages` | 流式输出 | 在 stream JSON 中包含增量 assistant 片段。 |
| `--include-hook-events` | 流式诊断 | 在 stream JSON 中包含 hook 生命周期事件。 |
| `--max-turns` | Agent 循环边界 | 限制非交互轮数；`0` 表示不限制。 |
| `--max-budget-usd` | 成本保护 | 当运行会超过预算时停止。 |
| `--no-session-persistence` | 会话存储 | 不保存可恢复 transcript。 |

## 会话范围与安全

| 选项族 | 改变什么 | 安全说明 |
| --- | --- | --- |
| `--cwd`, `--add-dir` | 工作目录和额外可读/可编辑根目录 | 范围应尽量贴近任务需要。 |
| `--allowedTools`, `--disallowedTools`, `--tools` | 工具可用性 | 自动化优先使用显式 allowlist。只读 smoke test 可用 `--tools ""`。 |
| `--permission-mode` | 权限提示行为 | `bypassPermissions` 和跳过权限的 flag 只适合隔离沙箱，不适合普通项目工作。 |
| `--mcp-config`, `--strict-mcp-config` | MCP server 输入 | 健康检查和 MCP 命令可能从可信配置启动 stdio server。 |
| `--plugin-dir`, `--agents`, `--agent` | 扩展和委托输入 | 把插件和 inline agent 视为可执行策略输入。 |
| `--settings`, `--setting-sources` | 设置来源选择 | 排查 user/project/local 设置冲突时使用来源过滤。 |
| `--bare` | 最小运行时模式 | 跳过 hooks、plugin sync、auto-memory、keychain 读取和自动发现；必须显式传入所需上下文。 |

## 顶层命令参考

| 命令 | 作用 | 何时使用 | 常见问题 |
| --- | --- | --- | --- |
| `ccl [prompt]` | 启动交互式会话，可选用 prompt 预填。 | 正常 human-in-the-loop 工作。 | 如果 prompt 以 slash command 开头，命令处理会在会话内执行。 |
| `ccl -p "..."` | 运行 print mode 并退出。 | 脚本、CI 或 smoke test。 | 交互式命令和 prompt 在 REPL 与 print mode 中行为可能不同。 |
| `ccl mcp` | 配置和管理 MCP server。 | 需要添加、检查或移除外部工具时。 | MCP 检查可能启动 stdio server；只在可信目录使用。 |
| `ccl auth` | 管理认证状态。 | 账号登录、检查或登出。 | 网关凭据与账号认证是分开的。 |
| `ccl plugin` / `ccl plugins` | 管理插件包和 marketplace。 | 安装或审计扩展包。 | 插件是供应链输入；验证 manifest 和来源。 |
| `ccl agents` | 列出已配置 active agent。 | 排查内置/自定义/插件 agent 可见性。 | 使用 `--setting-sources` 控制加载哪些设置。 |
| `ccl workflow` | 运行和管理工作流。 | 可重复的多步自动化需要 CLI 入口时。 | 无人值守前先校验 workflow 规格和权限。 |
| `ccl setup-token` | 在支持的账号通道上设置长期认证 token。 | 部署需要订阅账号支持的 token 设置时。 | 需要匹配的账号能力。 |
| `ccl doctor` | 检查运行时/更新器健康。 | 安装、更新或 workspace-health 问题。 | 它是诊断命令；按报告 fix 执行，不要盲目重跑。 |
| `ccl update` / `ccl upgrade` | 检查并安装更新。 | 保持本地二进制为当前版本。 | 版本策略可能因安装渠道不同而不同。 |
| `ccl install [target]` | 安装 native build。 | 初次安装或安装指定 target。 | 只有有意重装时才使用 `--force`。 |

## Help 输出的契约边界

`ccl --help` 是已安装构建的终端命令面的第一来源。源码文件可能包含内部、feature-gated、兼容或部署专用命令，不应把它们承诺为公开自动化 API。若某命令没有出现在 `ccl --help` 中，只有在同时写明启用条件时才应记录。

## CCL 兼容性

<a id="ccl-compatibility"></a>

部分命令名、环境变量名和源码级标识会因为 SDK 或 wire-format 兼容而保留。公开文档应解释用户实际看到的 CCL 行为；只有在配置或调试当前构建确实需要时，才提及这些兼容字面量。

## 稳定性说明

源码中标记为 internal、hidden 或 deployment-specific 的命令，不应当作稳定公开自动化 API。当前例子包括从 `ccl --help` 隐藏的 server、SSH、内部 URL opener、bridge helper、shell completion 和 auto-mode 调试入口。若命令只在 feature flag 或内部构建条件下可用，应记录条件，或从用户工作流中省略。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`
- `dist/cli.js --help`

<!-- section: related -->
## 相关页面

- [交互式命令](commands.md)
- [网关与模型路由](model-routing.md)
- [MCP Server 与工具](mcp.md)
- [插件](plugins.md)
- [Agent](agents.md)
- [远程会话与自动化](remote-automation.md)
