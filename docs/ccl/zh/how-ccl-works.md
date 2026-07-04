# CCL 如何工作

> 本页作为公开文档源维护。这里描述运行时层次，不描述私有部署内部。

<!-- section: purpose -->
## Purpose

CCL 是一个 agentic CLI runtime。一次会话从 CLI 参数、设置、认证、模型选择、项目上下文、工具、命令、扩展和策略开始；随后进入循环：读取用户输入，构造上下文，调用模型，执行已批准的工具，流式或普通渲染结果，持久化会话状态，并在工作变大时压缩、委托或进入审阅流程。

理解层次是排查 CCL 的最快方式。大多数故障都属于某一层：启动/配置、认证、模型路由、上下文构造、工具执行、扩展加载、会话持久化、远程自动化或治理门禁。

<!-- section: capabilities -->
## Capabilities

- 从同一个 CLI 入口启动 interactive、print mode、SDK、server、direct-connect、SSH 和 remote-triggered sessions。
- 在主循环运行前解析 settings、project context、CCL.md、commands、skills、agents、hooks、MCP servers、plugins 和 permission state。
- 根据模型、endpoint、凭据和 routing policy，把模型调用发送到 direct provider channel 或 gateway transport。
- 工具只有经过 permission checks、policy filters、hook handling 和 tool-specific validation 后才会执行。
- 持久化 session transcript，支持 resume/fork，并在活动对话增长时压缩 context。
- 需要职责隔离时，把专门工作委托给 agents、subagents、workflows、remote sessions 或 Ralph-Lisa review loops。

<!-- section: operational-model -->
## Operational model

可以把 CCL 看成八层：

1. 入口层：`main.tsx` 解析 CLI flags、subcommands、startup mode、cwd、stdin、print-mode formats、session IDs、direct-connect URLs、server mode 和 remote/SSH 的早期参数改写。
2. 配置层：解析 settings、环境变量、managed policy、project trust、gateway config、plugin directories、MCP config 和 setting-source filters。
3. 上下文层：组装 project instructions、commands、skills、agents、attachments、memories、session transcript 和 compacted context。
4. 模型层：规范化所选模型，检查 allowlists 和 endpoint compatibility，并通过 direct client 或 gateway stream adapter 发送请求。
5. 工具层：模型请求工具后进入 tool execution path，由权限、hooks、tool orchestration、streaming output 和错误处理决定是否执行以及如何执行。
6. 持久化层：session storage、summaries、context collapse、session memory、usage metrics 和 cost accounting 让会话可恢复、可审计。
7. 扩展层：plugins、skills、hooks、MCP、agents、workflows 和 remote surfaces 在不改核心循环的情况下增加能力。
8. 治理层：permissions、policy limits、public-audit checks、RLL gates、review commands 和 CI scripts 提供更高层控制。

排障时先定位层次。例如，命令缺失通常是扩展加载或 feature gate；shell 命令被拒绝是权限；provider 错误是 routing/authentication；上下文消失通常是 compaction 或 startup context construction。

<!-- section: configuration -->
## Configuration and commands

- 用 `ccl --help`、`/help`、`/status`、`/doctor`、`/config`、`/context`、`/permissions`、`/model`、`/endpoint` 和 `/gateway doctor` 检查当前 runtime。
- 路由、工具或启动行为需要精确证据时，用 `--debug-file <path>` 或 `--debug-to-stderr`。
- 隔离扩展或启动问题时，用 `--bare` 减少启动层，并显式传入上下文。
- 自动化和 CI 使用 `--print --output-format json` 或 `stream-json` 产生确定性日志。
- 按层查相关文档：configuration、authentication、model routing、tools、permissions、MCP、hooks、agents、workflows、remote automation 和 troubleshooting。

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` 定义主要 CLI 入口、subcommands、startup flags、print mode、server/open/ssh surfaces、setting sources、model flags 和启动顺序。
- `query.ts` 与 `services/api/claude.ts` 实现模型循环、streaming events、smart-route 直接回复、usage accounting 和模型 fallback 路径。
- `services/api/client.ts` 与 `services/api/gatewayTransport.ts` 实现 direct client setup 和 gateway streaming transport。
- `services/tools/toolExecution.ts`、`services/tools/toolOrchestration.ts` 与 `services/tools/toolHooks.ts` 实现工具执行、编排和 hook 集成。
- `utils/settings/types.ts`、`utils/config.ts`、`bootstrap/gatewayConfig.ts` 与 `utils/model/model.ts` 提供设置、项目配置、gateway 配置和模型选择行为。
- `utils/sessionStorage.ts`、`services/compact/compact.ts` 与 `services/SessionMemory/sessionMemory.ts` 提供持久化、压缩和记忆行为。

<!-- section: related -->
## Related pages

- [CCL 概览](overview.md)
- [交互式会话与 Print Mode](interactive-sessions.md)
- [配置与设置](configuration.md)
- [网关与模型路由](model-routing.md)
- [内置工具](tools.md)
- [故障排查](troubleshooting.md)
