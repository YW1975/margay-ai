# CCL CLI 兼容参考

> 本页作为公开文档源维护。它说明兼容说明应放在哪里，以及如何处理 legacy 或 hidden 命令面。

<!-- section: purpose -->
## Purpose

兼容参考把 CCL 命令行为、兼容字面量、aliases 和稳定性指导连接到统一 CLI 参考。它存在的原因是：某些源码级名称和 flags 会因兼容性继续存在，但公开工作流仍应使用 CCL 术语描述。

<!-- section: capabilities -->
## Capabilities

- 将用户导向权威的 [CLI 参考](cli-reference.md)。
- 说明兼容名称可能出现在 flags、environment variables、source comments 或 wire formats 中，但这不会改变公开产品名。
- 除非条件已文档化，否则不要把 hidden、internal、feature-gated 或 deployment-specific commands 当作稳定用户自动化入口。
- 明确当前安装构建中的 `ccl --help` 是本地可用命令面的最终来源。
- 为较旧外部引用保留到 `ccl-compatibility` section 的链接。

<!-- section: operational-model -->
## Operational model

Compatibility 是文档约束，不是独立 CLI 产品。当行为属于公开 `ccl` 命令时，应记录在 [CLI 参考](cli-reference.md)、[命令](commands.md) 或具体功能页中。当某个字面量只因为底层 SDK、legacy flag 或内部 wire protocol 兼容而存在时，只有用户必须配置或调试它，才需要提及。

命令存在于源码中，并不代表适合公开自动化。例如 hidden commands、内部 URL openers、bridge helpers、debug-only paths、feature-gated remote surfaces，以及普通 print mode 中有意跳过的 command paths。文档应说明稳定公开入口，而不是鼓励用户依赖 internals。

当兼容字面量不可避免时，应记录用户能观察到的效果，以及它为什么仍然存在。例如某个 flag 可能因为另一套 CLI 或 SDK 期望这个拼写而保留，但推荐的 CCL 工作流使用不同命令。这个区分可以防止用户把实现名称误当作产品承诺。

兼容审阅还应检查 negative scope。如果命令从 help 中隐藏、需要 feature gate、打开内部 URL scheme，或只为自动化测试存在，公开页面应省略它，或明确标注条件。源码里可运行的命令是证据，但不会自动成为官方 API。

<!-- section: configuration -->
## Configuration and commands

- 权威 CLI 参考：[CLI 参考](cli-reference.md)
- 兼容 anchor：[CLI 参考：CCL 兼容](cli-reference.md#ccl-compatibility)
- 用 `ccl --help`，以及支持时的 `ccl <command> --help` 验证本地命令可用性。
- 脚本化工作优先使用 `ccl -p "..." --output-format json` 或 `stream-json`，不要使用未文档化内部命令。
- 将 source comments、hidden flags 和 deployment-specific helpers 视为实现证据，而不是稳定用户 API。
- 记录兼容字面量时，应同时写明当前 CCL 命令、legacy 或 wire-compatible literal、用户为什么会看到它，以及受支持的排查路径。

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` 定义顶层 `ccl` 命令、可见和隐藏 flags、print-mode behavior、subcommand registration、remote/open surfaces、auth commands、MCP commands、plugin commands 和 version output。
- `main.tsx` 明确在 `-p/--print` mode 中跳过普通 subcommand registration，因此 print-mode automation 与 interactive/subcommand behavior 需要分开记录。
- `commands/version.ts` 在启用时提供本地 version command。
- `docs/ccl/en/cli-reference.md` 包含权威公开 command table 和 `ccl-compatibility` anchor。
- `scripts/check-docs.mjs` 防止公开 docs 出现禁用品牌和过期兼容残留。
- `main.tsx` 的 help text 与命令注册条件，是判断兼容表面属于 visible、hidden、print-mode-only、interactive-only 或 deployment-gated 的事实源。

<!-- section: related -->
## Related pages

- [CLI 参考](cli-reference.md#ccl-compatibility)
- [命令](commands.md)
- [交互式会话与 Print Mode](interactive-sessions.md)
- [环境变量](env-vars.md)
- [故障排查](troubleshooting.md)
