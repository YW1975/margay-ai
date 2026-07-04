# Plugins

> このページは公開ドキュメントのソースとして保守されています。Plugins は executable supply-chain input として扱ってください。

<!-- section: purpose -->
## Purpose

Plugins は再利用可能な CCL extensions を package 化します。Slash commands、agents、skills、hooks、MCP servers、LSP servers、output styles、settings、marketplace metadata、plugin options です。Extension を bundle として install、enable、disable、validate、update、share、govern したい場合、plugin が適切な単位です。

<!-- section: capabilities -->
## Capabilities

- `ccl plugin`、`ccl plugins`、interactive `/plugin` surface で install、uninstall、enable、disable、update、validate、browse、manage できます。
- command surface に応じて plugin name、`plugin@marketplace`、marketplace URL/path、explicit plugin directory から install できます。
- Marketplaces を add、remove、update、list できます。
- repeated `--plugin-dir <path>` flags で session-only plugins を読み込めます。
- Manifest が対応している場合、commands、agents、skills、hooks、MCP servers、LSP servers、output styles、settings、options を package 化できます。
- Plugin version updates をまたいで残る per-plugin data directory を使え、final uninstall 時に削除できます。
- Managed policy と strict plugin-only customization により、skills、agents、hooks、MCP customization を approved plugin channels に限定できます。
- Marketplace validation は reserved official marketplace names を保護し、impersonation risk を下げます。

<!-- section: operational-model -->
## Operational model

Plugin discovery は installed marketplace plugins と session-only inline plugin directories を組み合わせます。Marketplace plugins は marketplace、plugin name、version ごとに cache されます。Built-in plugins と read-only seed directories は preloaded plugin content を提供できます。Session `--plugin-dir` entries は development と one-off testing に向いており、durable marketplace install とは異なります。

Loader は plugin manifests を検証し、plugin paths を解決し、plugin hooks を読み、commands/agents/skills/output styles を読み込み、plugin settings を merge し、typed plugin errors を集め、duplicate または policy-blocked MCP server conflicts を防ぎます。Manual MCP servers は plugin-provided duplicates より優先されます。Plugin server names は namespaced されるため user names と衝突しません。

Plugin options には sensitive と non-sensitive があります。Sensitive values は secure storage に保存されます。Non-sensitive values は supported plugin content に置換され、hooks または server config に渡せます。Plugin data は versioned install cache と分離されているため、updates は plugin runtime state を破壊しません。

Plugins は tools、hooks、commands、servers を追加できるため、trusted sources からのみ install し、local plugins は共有前に validate し、project setup に trust boundaries を記録してください。

運用では、plugin を単なる文書テンプレートではなく実行可能な拡張として扱います。更新時には versioned cache と persistent data の違いを確認し、どの scope に install したかを記録します。チームで共有する plugin は、必要な commands、skills、hooks、MCP servers を明示し、不要な権限や不明な marketplace を避けるべきです。

<!-- section: configuration -->
## Configuration and commands

- interactive plugin manager: `/plugin` または `/plugins`。
- Install: `ccl plugin install <plugin>` または `ccl plugin install <plugin@marketplace>`。
- Manage installed plugins: `ccl plugin manage`。
- Enable/disable: `ccl plugin enable <plugin>` と `ccl plugin disable <plugin>`。
- Uninstall: `ccl plugin uninstall <plugin>`。
- Validate local plugin: `ccl plugin validate <path>`。
- Manage marketplaces: `ccl plugin marketplace add|remove|update|list ...`。
- One session だけ development plugins を読み込む: `ccl --plugin-dir <path> --plugin-dir <path>`。
- 必要な場合のみ `CLAUDE_CODE_PLUGIN_CACHE_DIR` で plugin cache location を上書きします。Read-only preloaded caches には `CLAUDE_CODE_PLUGIN_SEED_DIR` を使います。

<!-- section: source-evidence -->
## Source evidence

- `commands/plugin/parseArgs.ts` は menu、install、manage、uninstall、enable、disable、validate、marketplace actions の command parsing を定義します。
- `services/plugins/pluginCliCommands.ts` は non-interactive install、uninstall、enable、disable、update wrappers を実装します。
- `utils/plugins/schemas.ts` は plugin manifest、marketplace、hooks、command、agent、skill、MCP、LSP、settings、options、plugin reference schemas を定義します。
- `utils/plugins/pluginLoader.ts` は discovery、manifest validation、plugin cache resolution、hook loading、duplicate handling、load-result errors を説明し実装します。
- `utils/plugins/pluginDirectories.ts` は plugin cache directories、cowork plugin mode、cache overrides、seed directories、persistent plugin data directories を定義します。
- `services/mcp/config.ts` は plugin-provided MCP servers を manual MCP config と policy filtering に統合します。
- `main.tsx` は repeated `--plugin-dir <path>` session-only plugin loading を定義します。

<!-- section: related -->
## Related pages

- [Skills](skills.md)
- [Hooks](hooks.md)
- [MCP サーバーとツール](mcp.md)
- [設定と構成](configuration.md)
- [権限とセキュリティ](permissions-security.md)
