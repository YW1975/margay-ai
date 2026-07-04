# 快速开始

> 本页作为公开文档源维护。它描述从 shell 到可工作的 CCL session 的最短安全路径。

<!-- section: purpose -->
## Purpose

使用快速开始时，按顺序验证五件事：`ccl` 二进制能解析，安装健康到足以运行，凭据或网关路由已经配置，print mode 能完成非变更请求，交互式 session 能在目标项目目录启动。

<!-- section: capabilities -->
## Capabilities

- 用 `ccl --version` 确认安装构建，用 `ccl --help` 查看可用命令面。
- 当 `PATH`、更新器健康、workspace trust 或 shell 集成不清楚时，先运行 `ccl doctor`，再改设置。
- 通过部署批准的路径配置凭据：账号登录、网关环境变量，或交互式 `/gateway login URL TOKEN`。
- 在开放更多工具访问前，用 `ccl -p "..." --allowedTools ""` 做非变更 smoke test。
- 在确认路由和响应行为后，再从 print mode 进入 `ccl` 交互模式。
- 首跑行为需要精确证据时，用 `--debug-file <path>` 记录 authentication、model route 或 tool prompts。

<!-- section: operational-model -->
## Operational model

快速开始不应从宽权限开始。首次运行只需要二进制、可信工作目录、凭据、通往已配置模型路径的路由，以及一个不需要文件编辑或 shell 命令的 prompt。只有在用户拿到 startup、auth 和 routing 正确的证据后，才应扩大工具访问。

Print mode 和 interactive mode 共享大量运行时，但暴露面并不完全相同。Print mode 面向确定性的单次自动化，支持 `text`、`json` 和 `stream-json` 输出。Interactive mode 是普通 human-in-the-loop 表面，用于 slash commands、工具审批、session 导航和 context 检查。

如果第一次模型请求失败，先按层分类，再改配置：binary resolution、doctor health、authentication、gateway configuration、endpoint/model compatibility、permission policy 或 project context。故障排查页面提供按层路由的检查表。

<!-- section: configuration -->
## Configuration and commands

最小首次运行：

1. 打开你希望 CCL 检查的项目目录。
2. 运行 `ccl --version`，确认输出预期的 CCL 版本。
3. 运行 `ccl --help`，确认当前构建包含 `-p, --print`、`--output-format`、`--model`、`--settings`、`--mcp-config` 和权限 flags。
4. 如果安装、更新器、`PATH`、包管理器、shell、sandbox 或 workspace trust 不清楚，运行 `ccl doctor`。
5. 通过批准的路径配置凭据。网关用户应优先使用 `CCL_GATEWAY_URL` 加 `CCL_GATEWAY_KEY`，或通过 `/gateway login URL TOKEN` 保存本地网关文件。
6. 运行 `ccl -p "Summarize this repository in five bullets." --allowedTools ""` 作为非变更 smoke test。
7. 如果需要路由证据，带 `--debug-file <path>` 重跑，并检查 route markers、model selection 和 gateway status。
8. 非交互 smoke test 成功后，再运行 `ccl` 进入交互式 session。

常见首跑症状：

| 症状 | 可能层 | 下一步 |
| --- | --- | --- |
| `ccl` not found | 二进制或 shell `PATH` | 阅读[安装与更新](installation.md)，重装或重载 shell，再运行 `ccl --version`。 |
| `ccl --help` 可用但模型调用失败 | 认证或网关路由 | 阅读[认证](authentication.md)和[网关与模型路由](model-routing.md)。 |
| Gateway says not configured | 缺少网关 env/file | 同时设置 `CCL_GATEWAY_URL` 和 `CCL_GATEWAY_KEY`，或使用 `/gateway login URL TOKEN`。 |
| 模型或 endpoint 不对 | 路由优先级 | 检查 `/model`、`/endpoint`、`/gateway status`、debug route markers 和 settings sources。 |
| Smoke test 出现工具提示 | Prompt 或工具策略 | 非变更 smoke test 保持 `--allowedTools ""`，之后再有意扩大权限。 |
| Print mode 下 slash command 不可用 | 表面不匹配 | 使用交互式 `ccl`，或使用存在的顶层 CLI 命令。 |

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` 定义 `ccl [prompt]`、`-p/--print`、`--output-format`、debug flags、`--allowedTools`、`--tools`、`--disallowedTools`、`--permission-mode`、`--model`、`--settings`、`--mcp-config` 和 `--plugin-dir`。
- `main.tsx` 在普通 print mode 中跳过子命令注册，因此 slash command 和 subcommand 行为必须与一次性 prompt execution 分开说明。
- `commands/doctor/doctor.tsx` 将 `ccl doctor` 路由到 Doctor screen，用于安装和运行时诊断。
- `bootstrap/gatewayConfig.ts` 与 `services/gateway/gatewayDoctor.ts` 提供快速开始故障排查引用的网关配置和诊断行为。
- `commands/model/model.tsx`、`commands/endpoint/endpoint.tsx` 与 `utils/model/model.ts` 提供模型和 endpoint 检查或选择行为。

<!-- section: related -->
## Related pages

- [安装与更新](installation.md)
- [认证](authentication.md)
- [网关与模型路由](model-routing.md)
- [交互式会话与 Print Mode](interactive-sessions.md)
- [故障排查](troubleshooting.md)
