# Permissions and Security

> このページは CCL 公開ドキュメントのソースとして保守されています。生成ワークフローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

CCL の権限システムは、モデルの要求がユーザーのマシンや接続サービス上の実操作になる境界を保護します。対象は shell command、file change、notebook edit、MCP tool、agent delegation、user-question tool、sandbox decision、hook、SDK permission callback、公開リリース前の安全チェックです。

権限は単一の global yes/no switch ではありません。CCL は mode、明示的な allow/deny/ask rule、tool 固有 validator、working-directory check、sandbox policy、hook decision、non-interactive fallback を組み合わせます。そのためドキュメントは、ひとつの flag がすべてを安全にするという説明ではなく、decision path を説明する必要があります。

<!-- section: capabilities -->
## 機能

CCL は、default approval behavior、plan mode、accept-edits behavior、bypass permissions、don't-ask behavior など複数の permission mode をサポートします。一部の内部または feature-gated mode は classifier-driven automation を追加できますが、公開利用の原則は同じです。破壊的または機密性の高い操作は、明示ルールと確認可能な evidence で制約してください。

ルールは挙動別に分類されます。

- `allow`: 一致する tool または scoped tool input を承認します。
- `deny`: 一致する tool を削除またはブロックします。blanket deny は prompt-visible tool pool からも除外します。
- `ask`: ほかの経路が許可できる場合でも approval prompt を強制します。

ルールの出所には settings、CLI arguments、commands、session state があります。MCP は server-level rule をサポートするため、生成された tool 名を一つずつ列挙せず、server namespace 全体を対象にできます。

<!-- section: operational-model -->
## 動作モデル

権限 decision は意図的に階層化されています。CCL はまず tool が blanket-denied かどうかを確認し、次に tool 固有の safety check と rule-based permissions を評価します。Pre-tool hook は allow、deny、approval 要求を返せます。permission mode は、非対話 context で ask を deny に変換したり、関連機能が有効なとき classifier-assisted evaluation に進めたりします。SDK host は permission prompt tool も提供できます。host callback が失敗したり不正な decision を返した場合、安全な動作は fail closed です。

`bypassPermissions` は scoped rules の代替設計ではありません。操作者がリスクを受け入れた管理環境向けのものです。一部の check は通常 prompt より優先され、user interaction が必要な tool には interactive path が必要です。`dontAsk` は fail-closed automation と考えてください。CCL が本来 ask する場所では deny します。

公開ドキュメントの例には、実 secret、private absolute path、実 API key、内部 network address を含めてはいけません。ドキュメントサイトは公開リリース成果物であり、公開前に safety scan を通す必要があります。

<!-- section: configuration -->
## 設定とコマンド

interactive management には `/permissions` を使い、再現可能な設定には CLI flags または settings を使います。すべての shell command を許可するような広いルールより、特定の command prefix や workspace path に絞ったルールを優先してください。チーム全員が継承すべき場合だけ project または managed settings に永続ルールを置き、一回限りの作業には session-scoped grant を使います。

推奨事項:

- deny rule は保護対象に最も近い場所に置きます。
- destructive command と cross-boundary tool には ask rule を使います。
- hook は短く監査可能に保ち、複雑な分析は test coverage のある script に移します。
- user judgment に依存する workflow を headless automation にしないでください。使う場合は fail-closed permission prompt callback を接続します。
- ドキュメントや公開成果物の公開前に docs audit と public audit を実行します。

<!-- section: source-evidence -->
## ソース根拠

- `utils/permissions/PermissionMode.ts`: permission mode と external mode name を対応付けます。
- `utils/permissions/permissions.ts`: allow、ask、deny、mode transformation、hook decision、classifier behavior、headless fallback を解決します。
- `utils/permissions/PermissionRule.ts` と `utils/permissions/permissionRuleParser.ts`: rule shape と parsing を定義します。
- `tools.ts`: モデルが tool pool を受け取る前に blanket-denied tools を filtering します。
- `tools/BashTool/*`、`tools/PowerShellTool/*`、`utils/sandbox/*`: command validation、shell safety、sandbox decision を実装します。
- public docs site の `scripts/audit-public-content.sh` と `scripts/check-docs.mjs`: documentation release safety を機械的に検査します。

<!-- section: related -->
## 関連ページ

- [Built-in Tools](tools.md)
- [Hooks](hooks.md)
- [MCP Servers and Tools](mcp.md)
- [Public Documentation Publishing](public-docs.md)
