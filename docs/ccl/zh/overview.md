# CCL 概览

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL 是 MargayAI 的命令行 agent 运行时，覆盖交互式编码、非交互自动化、多 agent 委派、MCP 集成、插件、skill、工作流和受控交付循环。

<!-- section: capabilities -->
## 能力范围

- 交互式终端会话与 print 模式自动化。
- 内置文件、shell、搜索、Web、LSP、任务、目标、团队、MCP、工作流和审阅产物工具。
- 支持命令、hook、skill、插件、MCP server 和自定义 agent 等扩展层。

<!-- section: operational-model -->
## 运行模型

- 本页是顶层导航。先阅读快速开始，再根据实际任务进入配置、命令、工具和扩展指南。

<!-- section: configuration -->
## 配置与命令

- CLI 入口：`ccl [prompt]`、`ccl -p`，以及 [CLI 参考](cli-reference.md) 中列出的顶层子命令。

<!-- section: source-evidence -->
## 源码依据

- `main.tsx`
- `tools`
- `commands`
- `services`

<!-- section: related -->
## 相关页面

- [快速开始](quickstart.md)
- [安装与更新](installation.md)
- [CLI 参考](cli-reference.md)
- [内置工具](tools.md)
- [Agent](agents.md)
