# 交互会话与 Print 模式

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 默认启动交互式终端会话，也可以通过 print 模式执行一次性自动化，并输出文本、JSON 或流式结果。

<!-- section: capabilities -->
## 能力范围

- 使用 REPL 进行迭代工作、工具审批、slash command 和计划模式。
- 使用 `-p` 或 `--print` 编写脚本、CI 任务和可复现命令流水线。
- 通过 session 命令恢复、重命名、回退、压缩、清空和导出会话。

<!-- section: operational-model -->
## 运行模型

- 交互模式保留对话状态。print 模式应作为命令行 API 使用，输入显式、输出可检查。

<!-- section: configuration -->
## 配置与命令

- 常用命令：`resume`、`session`、`rename`、`rewind`、`compact`、`clear`、`export`、`copy` 和 `cost`。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`
- `commands/resume`
- `commands/session`
- `commands/compact`
- `commands/export`
- `commands/rewind`

<!-- section: related -->
## 相关页面

- [CLI 参考](cli-reference.md)
- [交互式命令](commands.md)
- [记忆、上下文与会话](memory-sessions.md)
- [工作流](workflows.md)
