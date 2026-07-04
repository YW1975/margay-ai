# 记忆、上下文和会话

> 本页作为 CCL 公开文档源维护。若将来恢复生成流程，必须先修复缺失的生成脚本，再重新生成。

<!-- section: purpose -->
## 用途

CCL 在长交互中保留有用状态，但不会把每个 token 都当成永久事实。Session history 支持 resume 和 recovery。Context management 让活跃 prompt 保持在模型限制内。Session memory 和 agent memory 在功能启用且阈值满足时保存经过选择的知识。

关键区别是 scope。Session transcript 是操作历史，compacted context 是模型当前看到的工作集，session memory 是一次对话抽取的 notes，agent memory 是按 user、project 或 local agent use 持久化的知识。

<!-- section: capabilities -->
## 能力

Session persistence 会记录对话，使其可以按 ID 恢复、搜索或通过 `/resume` 选择。`/clear` 会开始新的 session 状态，同时保留合适的 background task 边界。调用方支持时，`/rewind` 和 resume-at-message flow 可以回到较早位置。

Context controls 包括手动 `/compact`、automatic compaction、microcompact transforms、通过 `/context` 进行 context visualization，以及特性启用时的可选 context-collapse 行为。`/context` 有意显示 API-facing view，而不是原始终端 scrollback，因此 compacted 或 collapsed spans 不会误导操作者。

Session memory 使用 forked agent 在后台运行。它在 token 阈值满足后初始化，之后只有在足够的 context growth 和 tool activity 后才更新。Agent memory 把 `MEMORY.md` 存在 user、project 或 local scope 下，其中 local memory 不用于面向版本控制的共享。

<!-- section: operational-model -->
## 运行模型

Compaction 不只是压缩。在 compact 前，CCL 可能运行 pre-compact hooks、应用 microcompact、合并 hook 提供的 instructions，然后创建替换摘要并清理 cache。没有 custom compact instructions 时，会优先尝试 session-memory compaction。

Session memory 被有意延迟并基于阈值触发。它不会每轮都抽取。运行时会检查 token growth、tool-call count，以及 last assistant turn 是否仍有活跃工具调用，再启动 extraction。Memory file 以限制权限创建，然后通过运行时统一的 file-tool path 读取。

Agent memory 在 agent 配置 memory scope 后载入到 agent prompt。User scope 应保持通用；project scope 可能和仓库一起共享；local scope 是机器/项目专用。不要保存 secret、credential、一次性事故细节或未经验证的公开发布声明。

<!-- section: configuration -->
## 配置和命令

使用 `/resume` 恢复 session。在需要理解模型当前看到什么时，先用 `/context`，再决定是否 compact。当 session 变大，或需要把杂乱探索替换成聚焦摘要时，使用 `/compact`。只有默认摘要会遗漏关键事实时，才使用 custom compact instructions。

记忆卫生：

- durable memory 保持事实化、简短、限定 scope。
- 团队共享实践只有在团队同意时才放入 project memory。
- 机器相关细节优先放 local memory。
- 行为变化时清理过期 memory。
- 不要持久化 API keys、只属于一次运行的私有本地路径或推测性结论。

<!-- section: source-evidence -->
## 源码依据

- `utils/sessionStorage.ts` 和 `utils/sessionRestore.ts`：持久化和恢复 sessions。
- `commands/resume/resume.tsx`、`commands/clear/conversation.ts`、`commands/compact/compact.ts` 和 `commands/context/context.tsx`：实现 resume、clear、compact 和 API-facing context inspection。
- `query.ts`：在主 query loop 中应用 microcompact、context collapse、autocompact、reactive compact、memory attachments 和 post-compact 状态转换。
- `services/SessionMemory/sessionMemory.ts`：定义基于阈值的后台 extraction 和 memory-file setup。
- `tools/AgentTool/agentMemory.ts`：定义 user/project/local agent memory scope 和 `MEMORY.md` loading。

<!-- section: related -->
## 相关页面

- [交互式会话和 Print Mode](interactive-sessions.md)
- [Subagents](sub-agents.md)
- [配置和设置](configuration.md)
- [故障排除](troubleshooting.md)
