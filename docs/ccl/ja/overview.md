# CCL 概要

> このページは公開ドキュメントのソースとして保守されています。CCL の能力を俯瞰し、各ワークフローを権威ある詳細ページへ案内します。

<!-- section: purpose -->
## Purpose

CCL は MargayAI のコマンドライン agent ランタイムです。対話型コーディング、非対話自動化、リポジトリ認識ツール、複数 agent 委任、MCP 連携、プラグイン、スキル、ワークフロー、リモート自動化、統制付き delivery loop を扱います。公式ドキュメントは、ユーザーが正しい入口を選べるようにしつつ、デプロイ固有の動作を一般化しない必要があります。

<!-- section: capabilities -->
## Capabilities

- `ccl` で対話型ターミナルセッションを開始し、`ccl -p` で再現しやすい print-mode 自動化を実行できます。
- 指示、設定、コマンド定義、スキル、agent、MCP 設定、hooks、プラグイン、memory、添付からプロジェクト context を読み込みます。
- 設定済みの直結またはゲートウェイ経路でモデル要求を送り、権限とポリシー制御の下で承認済み tools を実行します。
- MCP server、custom agent、workflow、hook、plugin、skill で CCL を拡張しながら、サプライチェーンと権限境界を明確に保ちます。
- Session を保存および再開し、大きな会話を圧縮し、利用量を追跡し、専門 agent や Ralph-Lisa review loop に作業を委任できます。
- 安全な Markdown、言語一致性チェック、公開内容スキャン、サイト build、coverage matrix 検証により公式 docs を公開します。

<!-- section: operational-model -->
## Operational model

このページをナビゲーションの中心として使います。新規ユーザーはまず Quickstart を読み、binary がない場合や古い場合は Installation に進みます。運用者は Configuration、Environment Variables、Authentication、Gateway and Model Routing、Permissions and Security、Troubleshooting から始めます。CCL を拡張する開発者は Agents、Delegated Task Agents、MCP、Plugins、Skills、Hooks、Workflow Automation を確認します。Ralph-Lisa Loop を使うチームは governance ページから始めます。

CCL は単なるモデル呼び出しラッパーではありません。起動時に CLI flags、settings、project trust、authentication、context、extensions、permission policy を解決してから、main loop が安全に動作します。各 turn ではモデル出力を stream し、tool request を検証し、hooks が作業を観測または停止し、結果を resume や audit のため保存します。

公開 docs は保守的であるべきです。動作が feature flag、gateway response field、managed setting、account channel、内部 deployment に依存する場合、条件を明示するか、より狭いページへリンクします。CCL 自身が露出、検証、記録していない provider behavior を CCL ソースから推測してはいけません。

<!-- section: configuration -->
## Configuration and commands

| 目的 | まず読む | 次に読む |
| --- | --- | --- |
| プロジェクトで CCL を一度実行する | [クイックスタート](quickstart.md) | [インタラクティブセッション](interactive-sessions.md), [コマンド](commands.md) |
| Binary を install/update する | [インストールと更新](installation.md) | [トラブルシューティング](troubleshooting.md) |
| Credentials や route selection を調べる | [認証](authentication.md) | [環境変数](env-vars.md), [ゲートウェイとモデルルーティング](model-routing.md) |
| Tools と shell access を制御する | [権限とセキュリティ](permissions-security.md) | [組み込みツール](tools.md), [Hooks](hooks.md) |
| Agents に作業を委任する | [Agents](agents.md) | [委任型タスク Agents](sub-agents.md), [ワークフロー自動化](workflows.md) |
| Docs を公開または保守する | [公開ドキュメント公開](public-docs.md) | [ゲートと Attestation](gates-attestation.md), [GitHub と CI ワークフロー](github-ci.md) |
| Runtime を理解する | [CCL の仕組み](how-ccl-works.md) | [Memory と Session 管理](memory-sessions.md), [モデルルーティング](model-routing.md) |

最上位 CLI entrypoint は `ccl [prompt]` です。`ccl --help` で現在の build の実コマンド面を確認し、`ccl doctor` で環境健康状態を確認し、`ccl -p "..." --output-format json` または `stream-json` で scriptable automation を実行します。

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` は `ccl` command、print mode、output formats、debug flags、permission flags、settings flags、model flags、session flags、subcommand registration を定義します。
- `query.ts`、`services/api/claude.ts`、`services/tools/toolExecution.ts`、`services/tools/toolOrchestration.ts` は model loop、streaming events、tool execution path、orchestration を実装します。
- `utils/settings/types.ts`、`utils/config.ts`、`bootstrap/gatewayConfig.ts` は settings、project config、gateway config、runtime config loading を定義します。
- `utils/sessionStorage.ts`、`services/compact/compact.ts`、`services/SessionMemory/sessionMemory.ts` は session persistence、compaction、memory behavior を実装します。
- `scripts/check-official-docs-coverage.mjs`、`scripts/check-docs.mjs`、`scripts/audit-public-content.sh`、`scripts/build-site.mjs` は public docs validation path を提供します。

<!-- section: related -->
## Related pages

- [クイックスタート](quickstart.md)
- [インストールと更新](installation.md)
- [CCL の仕組み (How CCL Works)](how-ccl-works.md)
- [CLI リファレンス](cli-reference.md)
- [トラブルシューティング](troubleshooting.md)
