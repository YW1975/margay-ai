# 插件

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

插件把命令、MCP 配置、hook、skill、组件、marketplace 和受策略控制的扩展打包，便于在 CCL 安装之间复用。

<!-- section: capabilities -->
## 能力范围

- 安装、验证、管理、启用、禁用、卸载和浏览插件。
- 配置 marketplace，以及组织对允许来源的策略。
- 在 manifest 支持时打包命令、agent、skill、hook、MCP server、LSP server、settings 和输出样式。

<!-- section: operational-model -->
## 运行模型

- 插件应视作供应链输入。启用插件提供的工具或 hook 前，应验证 manifest、优先固定来源，并记录信任边界。
- 插件错误有类型区分，因此 CCL 可分别处理 manifest、marketplace、重复 MCP server、hook 加载、component 加载、下载和 LSP 失败。

<!-- section: configuration -->
## 配置与命令

- 使用 `ccl plugin` 或 `ccl plugins`。公开文档不能发布私有 marketplace URL 或 token。


<!-- section: source-evidence -->
## 源码依据

- `commands/plugin`
- `services/plugins`
- `types/plugin.ts`
- `utils/plugins`
- `main.tsx`

<!-- section: related -->
## 相关页面

- [MCP Server 与工具](mcp.md)
- [Skill](skills.md)
- [Hook](hooks.md)
- [权限与安全](permissions-security.md)
