# CCL 概览

> 本页作为公开文档源维护。它是 CCL 能力的顶层地图，并把每类工作流指向权威详情页。

<!-- section: purpose -->
## Purpose

CCL 是 MargayAI 的命令行 agent 运行时，覆盖交互式编码、非交互自动化、仓库感知工具、多 agent 委派、MCP 集成、插件、技能、工作流、远程自动化和治理式交付循环。官方文档应帮助用户选择正确入口，同时避免夸大部署特定行为。

<!-- section: capabilities -->
## Capabilities

- 用 `ccl` 启动交互式终端会话，或用 `ccl -p` 运行可复现的 print-mode 自动化。
- 从指令、设置、命令定义、技能、agent、MCP 配置、hooks、插件、memory 和附件加载项目上下文。
- 按配置好的直连或网关路径路由模型请求，并在权限和策略控制下执行已批准工具。
- 通过 MCP server、自定义 agent、workflow、hook、plugin 和 skill 扩展 CCL，同时保持供应链与权限边界清晰。
- 保存和恢复 session，压缩大型对话，跟踪用量，并把工作委派给专门 agent 或 Ralph-Lisa review loop。
- 通过安全 Markdown、语言一致性检查、公开内容扫描、站点构建和覆盖矩阵验证发布官方文档。

<!-- section: operational-model -->
## Operational model

把本页当作导航中心。新用户先读快速开始；如果二进制不存在或版本过旧，再读安装与更新。运维用户应从配置、环境变量、认证、网关与模型路由、权限安全和故障排查开始。扩展 CCL 的开发者应从 Agents、委派式任务 agents、MCP、插件、技能、hooks 和工作流自动化开始。使用 Ralph-Lisa Loop 的团队应先读治理页面。

CCL 不只是模型调用包装器。启动阶段会先解析 CLI flags、settings、project trust、authentication、context、extensions 和 permission policy，然后主循环才能安全运行。每个 turn 中，模型输出会流式返回，工具请求会被校验，hooks 可能观察或阻止工作，结果会保存以供恢复或审计。

公开文档必须保守。若行为取决于 feature flag、gateway response field、managed setting、account channel 或内部部署，文档必须直接说明条件，或链接到更窄的页面。除非 CCL 本身暴露、校验或记录相关行为，不要从 CCL 源码推断 provider 行为。

<!-- section: configuration -->
## Configuration and commands

| 需求 | 先读 | 再读 |
| --- | --- | --- |
| 在项目里运行一次 CCL | [快速开始](quickstart.md) | [交互式会话](interactive-sessions.md), [命令](commands.md) |
| 安装或更新二进制 | [安装与更新](installation.md) | [故障排查](troubleshooting.md) |
| 调试凭据或路由选择 | [认证](authentication.md) | [环境变量](env-vars.md), [网关与模型路由](model-routing.md) |
| 控制工具和 shell 访问 | [权限与安全](permissions-security.md) | [内置工具](tools.md), [Hooks](hooks.md) |
| 委派工作给 agents | [Agents](agents.md) | [委派式任务 Agents](sub-agents.md), [工作流自动化](workflows.md) |
| 发布或维护文档 | [公开文档发布](public-docs.md) | [门禁与 Attestation](gates-attestation.md), [GitHub 与 CI 工作流](github-ci.md) |
| 理解运行时 | [CCL 如何工作](how-ccl-works.md) | [Memory 与 Session 管理](memory-sessions.md), [模型路由](model-routing.md) |

顶层 CLI 入口是 `ccl [prompt]`。使用 `ccl --help` 查看当前安装构建的真实命令面，使用 `ccl doctor` 检查环境健康，使用 `ccl -p "..." --output-format json` 或 `stream-json` 进行可脚本化自动化。

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` 定义 `ccl` 命令、print mode、输出格式、debug flags、权限 flags、settings flags、模型 flags、session flags 和子命令注册。
- `query.ts`、`services/api/claude.ts`、`services/tools/toolExecution.ts` 与 `services/tools/toolOrchestration.ts` 实现模型循环、流式事件、工具执行路径和编排。
- `utils/settings/types.ts`、`utils/config.ts` 与 `bootstrap/gatewayConfig.ts` 定义 settings、项目配置、网关配置和运行时配置加载。
- `utils/sessionStorage.ts`、`services/compact/compact.ts` 与 `services/SessionMemory/sessionMemory.ts` 实现 session 持久化、压缩和 memory 行为。
- `scripts/check-official-docs-coverage.mjs`、`scripts/check-docs.mjs`、`scripts/audit-public-content.sh` 与 `scripts/build-site.mjs` 提供公开文档验证路径。

<!-- section: related -->
## Related pages

- [快速开始](quickstart.md)
- [安装与更新](installation.md)
- [CCL 如何工作 (How CCL Works)](how-ccl-works.md)
- [CLI 参考](cli-reference.md)
- [故障排查](troubleshooting.md)
