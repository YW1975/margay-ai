# CCL 如何工作

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 运行 agentic loop：收集项目上下文，推理用户请求，在策略约束下调用工具，流式返回结果，持久化会话状态，并在上下文增长时压缩或委派。

<!-- section: capabilities -->
## 能力范围

- 会话启动会解析设置、模型路由、权限、工具、命令、MCP、agent、插件和项目上下文。
- 模型提出动作，但工具只有通过策略和权限检查后才执行。
- 长时间或专业化工作可以转入子 agent、工作流或 RLL 审阅循环。

<!-- section: operational-model -->
## 运行模型

- 可以把 CCL 看作分层系统：CLI/session shell、设置与策略、模型 transport、工具、扩展和治理。排查问题时先定位失败层。

<!-- section: configuration -->
## 配置与命令

- 使用 [故障排查](troubleshooting.md) 把症状映射到层，并结合 [内置工具](tools.md) 与 [权限与安全](permissions-security.md) 理解执行边界。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`
- `services/api/client.ts`
- `services/tools/toolExecution.ts`
- `services/compact`
- `tools/AgentTool`

<!-- section: related -->
## 相关页面

- [CCL 概览](overview.md)
- [交互会话与 Print 模式](interactive-sessions.md)
- [内置工具](tools.md)
- [Agent](agents.md)
- [故障排查](troubleshooting.md)
