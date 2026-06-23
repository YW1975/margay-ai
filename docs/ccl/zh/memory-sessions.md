# 记忆、上下文与会话

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 管理对话状态、会话 transcript、记忆提取、压缩、上下文折叠、agent memory 和会话恢复流程。

<!-- section: capabilities -->
## 能力范围

- 通过命令入口恢复和管理会话。
- 当会话变大时压缩或折叠上下文。
- 启用时在用户、项目、本地或远程挂载作用域持久化 agent memory。

<!-- section: operational-model -->
## 运行模型

- 记忆能力很强，但必须限定作用域。不要把密钥或只适合公开发布的声明写入持久记忆。

<!-- section: configuration -->
## 配置与命令

- 相关命令和服务：`memory`、`resume`、`session`、`compact`、`contextCollapse`、`SessionMemory`、`extractMemories` 和 `agentMemory`。

<!-- section: source-evidence -->
## 源码依据

- `commands/memory`
- `commands/resume`
- `commands/session`
- `services/SessionMemory`
- `services/contextCollapse`
- `tools/AgentTool/agentMemory.ts`

<!-- section: related -->
## 相关页面

- [交互会话与 Print 模式](interactive-sessions.md)
- [子 Agent](sub-agents.md)
- [配置与设置](configuration.md)
- [故障排查](troubleshooting.md)
