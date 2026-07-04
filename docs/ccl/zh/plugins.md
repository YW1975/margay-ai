# 插件

> 本页作为公开文档源维护。插件是可执行供应链输入，应按可信边界管理。

<!-- section: purpose -->
## Purpose

插件用于打包可复用的 CCL 扩展：slash commands、agents、skills、hooks、MCP servers、LSP servers、output styles、settings、marketplace metadata 和 plugin options。当一个扩展需要作为整体安装、启用、禁用、校验、更新、共享或治理时，插件就是合适的单位。

<!-- section: capabilities -->
## Capabilities

- 通过 `ccl plugin`、`ccl plugins` 或交互式 `/plugin` 安装、卸载、启用、禁用、更新、校验、浏览和管理插件。
- 根据入口不同，可按插件名、`plugin@marketplace`、marketplace URL/path 或显式插件目录安装。
- 添加、移除、更新和列出 marketplaces。
- 用重复的 `--plugin-dir <path>` 参数加载仅当前会话使用的插件。
- 在 manifest 支持时打包 commands、agents、skills、hooks、MCP servers、LSP servers、output styles、settings 和 options。
- 为每个插件保存持久数据目录；该目录跨插件版本更新保留，并可在最后一次卸载时删除。
- 用托管策略和 strict plugin-only customization 限制 skills、agents、hooks 或 MCP 只能来自批准的插件通道。
- 用 marketplace 校验保护保留的官方 marketplace 名称，降低冒名风险。

<!-- section: operational-model -->
## Operational model

插件发现会合并已安装 marketplace 插件和 session-only inline 插件目录。Marketplace 插件按 marketplace、插件名和版本缓存。内置插件和只读 seed 目录可以提供预置插件内容。Session `--plugin-dir` 适合开发和一次性测试，因为它不是持久 marketplace 安装。

插件加载器会校验 manifest、解析插件路径、加载 plugin hooks、读取 commands/agents/skills/output styles、合并 plugin settings、收集类型化 plugin errors，并避免重复或被策略阻止的 MCP server 冲突。手工配置的 MCP server 优先于插件提供的重复 server；插件 server 名称会加命名空间，避免与用户名称冲突。

插件选项可以是敏感或非敏感的。敏感值通过 secure storage 保存；非敏感值可替换进支持的插件内容，并传给 hooks 或 server config。插件数据目录和版本化安装缓存分离，因此更新不会删除插件运行状态。

由于插件可以添加工具、hooks、commands 和 servers，只应从可信来源安装；共享前应校验本地插件，并在项目设置中说明信任边界。

<!-- section: configuration -->
## Configuration and commands

- 打开交互式插件管理器：`/plugin` 或 `/plugins`。
- 安装：`ccl plugin install <plugin>` 或 `ccl plugin install <plugin@marketplace>`。
- 管理已安装插件：`ccl plugin manage`。
- 启用或禁用：`ccl plugin enable <plugin>` 与 `ccl plugin disable <plugin>`。
- 卸载：`ccl plugin uninstall <plugin>`。
- 校验本地插件：`ccl plugin validate <path>`。
- 管理 marketplaces：`ccl plugin marketplace add|remove|update|list ...`。
- 为单次会话加载开发插件：`ccl --plugin-dir <path> --plugin-dir <path>`。
- 仅在需要时用 `CLAUDE_CODE_PLUGIN_CACHE_DIR` 覆盖插件缓存位置；用 `CLAUDE_CODE_PLUGIN_SEED_DIR` 配置只读预置缓存。

<!-- section: source-evidence -->
## Source evidence

- `commands/plugin/parseArgs.ts` 定义 menu、install、manage、uninstall、enable、disable、validate 和 marketplace actions 的参数解析。
- `services/plugins/pluginCliCommands.ts` 实现非交互式 install、uninstall、enable、disable 和 update wrapper。
- `utils/plugins/schemas.ts` 定义插件清单、marketplace、hooks、command、agent、skill、MCP、LSP、settings、options 和插件引用 schema。
- `utils/plugins/pluginLoader.ts` 说明并实现发现、manifest 校验、plugin cache 解析、hook 加载、重复处理和 load-result errors。
- `utils/plugins/pluginDirectories.ts` 定义插件缓存目录、cowork plugin 模式、缓存覆盖、seed 目录和持久 plugin data 目录。
- `services/mcp/config.ts` 将插件提供的 MCP servers 与手工 MCP config 和策略过滤整合。
- `main.tsx` 定义重复 `--plugin-dir <path>` 的 session-only 插件加载。

<!-- section: related -->
## Related pages

- [Skills](skills.md)
- [Hooks](hooks.md)
- [MCP 服务器与工具](mcp.md)
- [配置与设置](configuration.md)
- [权限与安全](permissions-security.md)
