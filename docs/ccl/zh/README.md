# CCL 文档

> 本索引作为公开文档源维护。它会在每种语言中渲染为 `index.html` 首页。

<!-- section: purpose -->
## Purpose

使用本索引选择正确的 CCL 文档路径。CCL 是命令行 agent 运行时，覆盖交互式 session、print-mode 自动化、tools、settings、gateway routing、MCP、plugins、skills、agents、workflows、remote automation 和 Ralph-Lisa governance。

<!-- section: duo-ide-guides -->
## 双 Agent 协作与编辑器接入

- [Duo：对等双 Agent 协作](duo.md)
- [在 VS Code 中使用 CCL](ide.md)

<!-- section: capabilities -->
## Capabilities

- 选择工作流时，从 [CCL 概览](overview.md) 开始。
- 安全首跑时，使用 [快速开始](quickstart.md)。
- `ccl` 二进制、shell path 或 updater 有问题时，使用 [安装与更新](installation.md)。
- 失败层不清楚时，使用 [故障排查](troubleshooting.md)。
- 更新本站点时，使用 [公开文档发布](public-docs.md)。

<!-- section: operational-model -->
## Operational model

生成的静态站点把本 README 作为语言首页。导航来自 `docs/ccl/docs-inventory.json`；构建脚本会把 `README.md` 写成 `index.html`，并按 inventory 顺序链接所有可见页面。本页应聚焦路由，不承载详细功能说明。

因为本站是官方公开事实源，不能把复制片段、旧私有笔记、生成摘要或归档事故报告直接当作权威内容。页面只有在匹配当前源码证据、通过公开文档检查、正确渲染，并且不含私有路径、密钥和不受支持的部署声明时，才算权威。

为了准确工作，请按任务路径阅读，而不是按字母顺序浏览：

| 任务 | 先读 | 继续读 |
| --- | --- | --- |
| 首次运行 | [快速开始](quickstart.md) | [认证](authentication.md), [网关与模型路由](model-routing.md) |
| 配置运行时 | [配置与设置](configuration.md) | [环境变量](env-vars.md), [权限与安全](permissions-security.md) |
| 日常使用 CCL | [交互式会话](interactive-sessions.md) | [命令](commands.md), [内置工具](tools.md) |
| 扩展 CCL | [Agents](agents.md) | [子 agents](sub-agents.md), [插件](plugins.md), [Skills](skills.md), [Hooks](hooks.md), [MCP](mcp.md) |
| 自动化重复工作 | [工作流自动化](workflows.md) | [常见工作流](common-workflows.md), [GitHub 与 CI 工作流](github-ci.md) |
| 治理交付 | [Ralph-Lisa Loop](ralph-lisa-loop.md) | [门禁与 Attestation](gates-attestation.md), [澄清与计划](clarify-and-planning.md) |

<!-- section: configuration -->
## Configuration and commands

本地验证此文档集时，在公开文档仓库运行 `node scripts/check-docs.mjs`、`bash scripts/audit-public-content.sh` 和 `node scripts/build-site.mjs`。验证 CCL feature coverage 时，在 CCL 仓库运行 coverage matrix checks。

修改导航或页面清单后，除了 Markdown，还要验证生成的 `site/<lang>/index.html`。静态构建器会把 Markdown 链接改写成 HTML 链接，渲染后的导航才是用户最终看到的 artifact。英文锚点：Public Documentation Publishing。

<!-- section: source-evidence -->
## Source evidence

- `docs/ccl/docs-inventory.json` 定义语言列表、glossary entries、公开页面、导航分组和 related-page metadata。
- `scripts/build-site.mjs` 将每种语言的 README 渲染为 `index.html`，并从可见 inventory pages 构建导航。
- `scripts/check-docs.mjs` 强制检查语言一致性、inventory coverage、section marker parity、link integrity、公开安全检查和翻译 sanity。
- `scripts/audit-public-content.sh` 扫描公开仓库中的生成 artifact、env files、key material、疑似 token 字符串和私有本地路径。

<!-- section: related -->
## Related pages

- [CCL 概览](overview.md)
- [快速开始](quickstart.md)
- [CLI 参考](cli-reference.md)
- [故障排查](troubleshooting.md)
- [公开文档发布](public-docs.md)
