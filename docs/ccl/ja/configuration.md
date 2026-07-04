# 設定と構成

> このページは公開ドキュメントのソースとして保守されています。秘密情報、非公開パス、生成用プレースホルダーを載せないでください。

<!-- section: purpose -->
## Purpose

CCL の設定は、実行時に何を参照できるか、どのモデルとエンドポイントを使うか、どのツールを実行できるか、どの拡張面を読み込むか、どの組織ポリシーがローカル設定を上書きするかを決めます。設定は実行契約として扱うべきです。同じ入力を読んだ session、subagent、workflow、reviewer は、同じ挙動を予測できる必要があります。

このページは設定レイヤーそのものを扱います。認証、モデルルーティング、権限、MCP、Hooks、Plugins、Skills は関連ページで扱います。

<!-- section: capabilities -->
## Capabilities

- managed policy、user settings、project settings、local project overrides、明示的な `--settings`、一部 CLI flags、runtime state から設定を読み込みます。
- `env` 設定キーで環境変数を定義しつつ、秘密値をプロジェクト文書に入れない運用ができます。
- 既定モデル、利用可能モデルの方針、モデル上書き、commit/PR の署名文、Git 指示、保持期間、UI 動作、既定 shell、worktree 動作、ツール権限の既定値を設定できます。
- 検証済み schema により permissions、hooks、MCP allow/deny policy、marketplace sources、installed plugins、plugin-only customization policy を設定できます。
- `--setting-sources user,project,local` で読み込む source を制限し、agents、skills、hooks、project settings が見える理由または見えない理由を調査できます。
- `/config` で設定 UI を開き、`/permissions`、`/mcp`、`/hooks`、`/plugins`、`/skills`、`/agents`、`/model`、`/endpoint` で個別領域を調整できます。

<!-- section: operational-model -->
## Operational model

設定は後方互換の schema で検証されます。新しい field は optional で、未知の field は編集後も残り、無効な設定は修正されるまで使われません。これにより managed deployment は新しい policy を安全に配布でき、古い local file を壊さず、ローカルの typo も診断可能になります。

最終的な設定は source-aware です。Managed settings は hooks、permission rules、MCP servers、customization surfaces を制限できます。Project settings はチーム共有 policy です。Local project settings は個人用 override です。User settings は全体の preference です。CLI flags と `--settings` は process-scoped で、CI、SDK caller、一回限りの automation に向いています。

`--bare` は最小起動 mode です。automatic hooks、LSP startup、plugin sync、attribution、auto-memory、background prefetches、keychain reads、automatic CCL.md discovery をスキップします。bare mode では `--system-prompt`、`--append-system-prompt`、`--add-dir`、`--mcp-config`、`--settings`、`--agents`、`--plugin-dir` で context を明示的に渡します。

設定は認証の代替ではありません。認証情報は environment variables、gateway configuration、OAuth storage、secure storage、managed secret systems に置くべきです。公開文書では credential 名と優先順位だけを説明し、実値は書きません。

<!-- section: configuration -->
## Configuration and commands

- `/config` で interactive settings UI を開きます。
- `--settings <file-or-json>` で session-specific settings を注入します。
- `--setting-sources user,project,local` で `ccl agents` と関連 startup behavior の source visibility を調べます。
- `.ccl/settings.json` は共有 project settings、`.ccl/settings.local.json` は個人 project overrides に使います。
- settings `env` は secret ではない環境既定値に使い、credential は secret manager または shell environment に置きます。
- `permissions.defaultMode`、`permissions.allow`、`permissions.deny`、`permissions.ask` で tool policy を定義します。
- `allowedMcpServers`、`deniedMcpServers`、managed MCP policy で MCP availability を集中管理します。
- 組織が skills、agents、hooks、MCP customization を承認済み plugins のみに限定したい場合は `strictPluginOnlyCustomization` を使います。
- runtime が期待と違う場合は `/doctor`、`/status`、`/model`、`/endpoint`、`/gateway doctor`、`/permissions` を確認します。

<!-- section: source-evidence -->
## Source evidence

- `utils/settings/types.ts` は `SettingsSchema`、権限設定、MCP 方針、プラグイン marketplace 設定、plugin-only の対象面、環境変数、モデル項目、署名、worktree、hooks、後方互換規則を定義します。
- `utils/settings/settings.ts` と `utils/settings/settingsCache.ts` は settings の load、cache、validation、merge、source 間 preservation を行います。
- `utils/config.ts` は global/project config の shape を定義し、project tool permissions、MCP state、onboarding state、worktree session state、persisted session metrics を含みます。
- `commands/config/config.tsx` は `/config` を settings UI に接続します。
- `main.tsx` は `--settings`、`--setting-sources`、`--bare`、`--mcp-config`、`--plugin-dir`、`--agents`、`--api-key`、permission flags を定義します。
- `utils/settings/pluginOnlyPolicy.ts`、`utils/settings/managedPath.ts`、`services/remoteManagedSettings` は managed/restricted configuration behavior を実装します。

<!-- section: related -->
## Related pages

- [認証](authentication.md)
- [環境変数](env-vars.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [権限とセキュリティ](permissions-security.md)
- [MCP サーバーとツール](mcp.md)
- [Plugins](plugins.md)
