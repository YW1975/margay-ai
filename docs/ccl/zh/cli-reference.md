# CLI 参考

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

`ccl` 二进制提供交互入口、print 模式、MCP 管理、server 与远程连接命令、认证、插件管理、agent、自动化、更新器命令和 shell completion。

<!-- section: capabilities -->
## 能力范围

- 顶层命令包括 `mcp`、`server`、`ssh`、`open`、`auth`、`plugin`、`agents`、`auto-mode`、`doctor`、`update`、`install` 和 `completion`。
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
| MCP | `ccl mcp list`, `ccl mcp add`, `ccl mcp get`, `ccl mcp remove`, `ccl mcp serve` | 管理外部工具 server，或启动 CCL MCP server。 |
| 远程/session server | `ccl server`, `ccl open`, `ccl ssh`, `ccl remote-control`, `ccl assistant` | 运行 detached session、连接内部 URL、桥接远程控制或附加 bridge session。 |
| 认证 | `ccl auth login`, `ccl auth status`, `ccl auth logout`, `ccl login`, `ccl logout`, `ccl setup-token` | 检查或修改账号认证状态。 |
| 插件 | `ccl plugin validate`, `list`, `install`, `enable`, `disable`, `marketplace` | 管理插件供应链输入和已安装扩展包。 |
| Agent | `ccl agents --setting-sources user,project,local` | 列出 active agent 并排查来源可见性。 |
| 运维 | `ccl doctor`, `ccl update`, `ccl install`, `ccl completion` | 检查健康、更新/安装或生成 shell completion。 |

## Print 模式

当 prompt 和输出需要显式、可脚本化时使用 print 模式。只读 smoke test 优先使用空 allowed-tools 列表；只有调用方准备好解析 JSON 或 stream JSON 时，才请求这些格式。

示例：`ccl -p "List the top-level directories and their purpose." --allowedTools ""`

## 顶层命令参考

| 命令 | 作用 | 何时使用 | 常见问题 |
| --- | --- | --- | --- |
| `ccl [prompt]` | 启动交互式会话，可选用 prompt 预填。 | 正常 human-in-the-loop 工作。 | 如果 prompt 以 slash command 开头，命令处理会在会话内执行。 |
| `ccl -p "..."` | 运行 print mode 并退出。 | 脚本、CI 或 smoke test。 | 交互式命令和 prompt 在 REPL 与 print mode 中行为可能不同。 |
| `ccl mcp serve` | 启动 CCL MCP server。 | 另一个 client 需要 CCL 暴露的 MCP 能力。 | debug mode 会输出更多日志；避免泄漏 secret。 |
| `ccl mcp list/get/add/remove` | 检查并修改 MCP server 配置。 | 管理外部工具 server。 | list/get 可能为健康检查启动 stdio server；只在可信目录使用。 |
| `ccl server` | 启动 CCL session server。 | detached 或远程控制会话。 | host、token 和 idle timeout 必须有意设置。 |
| `ccl open <cc-url>` | 连接内部 CCL server URL。 | 附加到已有 session endpoint。 | 只使用可信 `cc://` URL。 |
| `ccl ssh <host> [dir]` | 通过 SSH 在远端 host 运行 CCL，并隧道转发认证。 | 无需手动远端设置即可处理远端机器。 | 权限模式和远端信任边界必须明确。 |
| `ccl auth login/status/logout` | 管理认证状态。 | 账号登录、检查或登出。 | 网关凭据与账号认证是分开的。 |
| `ccl plugin ...` | 验证、列出、安装、启用、禁用、更新插件或管理 marketplace。 | 安装或审计扩展包。 | 插件是供应链输入；验证 manifest 和来源。 |
| `ccl agents` | 列出已配置 active agent。 | 排查内置/自定义/插件 agent 可见性。 | 使用 `--setting-sources` 控制加载哪些设置。 |
| `ccl auto-mode ...` | 在启用时检查 auto-mode classifier 默认值/配置/critique。 | 排查自动行为策略。 | 是否可用取决于构建 flag。 |
| `ccl remote-control` / `ccl assistant` | 连接本地或 bridge session，用于 remote-control flow。 | 部署策略启用远程交互控制时。 | 需要认证、feature 支持和谨慎的环境边界。 |
| `ccl doctor` | 检查运行时/更新器健康。 | 安装、更新或 workspace-health 问题。 | 它是诊断命令；按报告 fix 执行，不要盲目重跑。 |
| `ccl update` / `ccl upgrade` | 检查并安装更新。 | 保持本地二进制为当前版本。 | 版本策略可能因安装渠道不同而不同。 |
| `ccl install [target]` | 安装 native build。 | 初次安装或安装指定 target。 | 只有有意重装时才使用 `--force`。 |
| `ccl completion <shell>` | 生成 shell completion。 | 提升 CLI 使用体验。 | 写入正确的 shell 启动路径。 |

## CCL 兼容性

<a id="ccl-compatibility"></a>

部分命令名、环境变量名和源码级标识会因为 SDK 或 wire-format 兼容而保留。公开文档应解释用户实际看到的 CCL 行为；只有在配置或调试当前构建确实需要时，才提及这些兼容字面量。

## 稳定性说明

源码中标记为 internal、hidden 或 deployment-specific 的命令，不应当作稳定公开自动化 API。若命令只在 feature flag 或内部构建条件下可用，应记录条件，或从用户工作流中省略。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`

<!-- section: related -->
## 相关页面

- [交互式命令](commands.md)
- [网关与模型路由](model-routing.md)
- [MCP Server 与工具](mcp.md)
- [插件](plugins.md)
- [Agent](agents.md)
- [远程会话与自动化](remote-automation.md)
