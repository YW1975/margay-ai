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

## 按任务使用文档

CCL 文档按用户要完成的任务组织。新用户先看快速开始；如果本机还没有可用二进制，再看安装。运维和集成负责人应从配置、环境变量、认证、网关与模型路由开始。扩展 CCL 的开发者应从 Agent、子 Agent、MCP、插件、Skill、Hook 和工作流自动化开始。使用 Ralph-Lisa Loop 的团队应从治理页面开始。

| 需求 | 先看 | 然后看 |
| --- | --- | --- |
| 在项目中跑通一次 CCL | [快速开始](quickstart.md) | [交互会话](interactive-sessions.md)、[命令](commands.md) |
| 排查安装或凭据 | [认证](authentication.md) | [环境变量](env-vars.md)、[故障排查](troubleshooting.md) |
| 理解模型/provider 行为 | [网关与模型路由](model-routing.md) | [配置](configuration.md)、[命令中的成本与上下文诊断](commands.md#diagnostics-and-cost) |
| 把工作委派给 agent | [Agent](agents.md) | [子 Agent](sub-agents.md)、[内置工具](tools.md) |
| 发布或维护文档 | [公开文档发布](public-docs.md) | [门禁与证明](gates-attestation.md) |

## CCL 是什么，不是什么

CCL 是命令行 agent runtime。它协调模型、本地项目上下文、工具、权限、设置、扩展以及可选的治理循环。它不是独立文档站、通用聊天包装器，也不是网关替代品。只有当 CCL 源码或可验证运行证据说明 CCL 如何观察到某个网关/provider 行为时，公开文档才应描述该行为。

公开文档必须保守。若某行为依赖网关响应字段、feature flag、托管设置或部署特定命令，页面应直接说明条件，而不是把它写成通用事实。

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
