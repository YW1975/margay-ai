# トラブルシューティング

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL のトラブルシューティングでは、まず失敗層を特定します。インストール、認証、ゲートウェイルーティング、MCP、権限、ツール、エージェント、セッション状態、リモート制御、統制ゲートです。

<!-- section: capabilities -->
## 機能範囲

- `ccl doctor` で環境状態を確認します。
- `/gateway status` と `/gateway doctor` で、ゲートウェイ資格情報、到達性、プレースホルダー、shell 環境変数によるシャドーイングを調査します。
- endpoint registry が設定されている場合、`/endpoint status` で endpoint 固定と文脈適合を診断します。
- 利用可能な場合、`/cost`、`/context`、`/usage` で token/cost 可視性、文脈ウィンドウ圧迫、plan limit 状態を分けます。
- MCP 診断、権限プロンプト、remote eligibility エラーで外部 tool または remote session の失敗を切り分けます。

<!-- section: operational-model -->
## 運用モデル

- 広範な再試行より、層ごとの証拠を優先します。設定変更前に正確なコマンド、終了コード、ログ、ビルドバージョンを記録してください。
- ゲートウェイトラブルシューティングでは、CCL 実行時の問題とゲートウェイサービスの問題を分けて扱います。cache ヒット計測と provider usage フィールドは、CCL が検証済みフィールドを受け取るまではゲートウェイ側の証拠です。
- 公開ドキュメントの失敗では、generator source、生成 Markdown、公開リポジトリ同期、audit 出力、site build、ホスト先を別々に検証します。

<!-- section: configuration -->
## 設定とコマンド

- 公開 issue 記録では CCL 実行時問題とゲートウェイまたはサービス問題を分け、私有 hostname、パス、secret を避けてください。
- 古いゲートウェイ設定を調べる場合、shell の `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY` と `~/.ccl/gateway.json` を比較します。shell 値がある場合は意図的に優先されます。
- remote-session 失敗では、policy blocked、not logged in、no remote environment、not in git repo、no git remote、GitHub app missing など具体的な precondition type を記録してください。

## 症状別ルーティング

| 症状 | 最初に見る | 集める証拠 |
| --- | --- | --- |
| `ccl` が起動しない | [インストール](installation.md) | `ccl --version`、shell PATH、インストール方法。 |
| login または gateway が失敗する | [認証](authentication.md) | `/gateway doctor`、redact 済み環境変数名、gateway URL health。 |
| モデルまたは provider が違う | [ゲートウェイとモデルルーティング](model-routing.md) | 要求モデル、endpoint、usage フィールド、route config。 |
| コマンドが見つからない | [コマンド](commands.md) | 対話 `/` list、build version、feature flag または plugin 状態。 |
| CLI flag が拒否される | [CLI リファレンス](cli-reference.md) | `ccl --help`、正確な command と flag。 |
| MCP tool が見つからない | [MCP サーバーとツール](mcp.md) | `ccl mcp list`、server config、auth status。 |
| Agent が見えない | [エージェント](agents.md) | `ccl agents --setting-sources user,project,local`、agent definition path。 |
| ドキュメントページが壊れている | [公開ドキュメント公開](public-docs.md) | local `node scripts/check-ccl-docs.mjs`、public URL、build log。 |

## Gateway 診断

複数の資格情報を変更する前に `/gateway doctor` を実行します。effective gateway、file configuration、shell variables、OAuth/API-key state、可能な場合は `GET /auth/me` による到達性を確認します。`CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` の片方だけが設定されている場合、壊れた原子的ペアとして扱い、両方を設定するか両方を消します。

## Agent 診断

`ccl agents --setting-sources user,project,local` を実行して可視性を確認します。agent が MCP server を要求する場合、対応 server が設定済みで認証済みか確認します。組み込み agent では Explore と Plan は runtime で利用できますが、他の一部 agent は feature flag や entrypoint rule に依存することがあります。

## エスカレーションする時

エスカレーション時は小さな再現を添えます。正確なコマンド、redact 済み環境変数名、build version、期待動作、実際の動作、最後の関連診断出力を含めます。API key、生の私有パス、機密プロジェクト内容を含む完全 transcript は含めないでください。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands/doctor`
- `commands/gateway/gateway.tsx`
- `commands/endpoint/endpoint.tsx`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `services/gateway/gatewayDoctor.ts`
- `services/api/errors.ts`
- `utils/background/remote/remoteSession.ts`
- `docs/ccl0622-runtime-issue-record.md`

<!-- section: related -->
## 関連ページ

- [インストールと更新](installation.md)
- [認証](authentication.md)
- [環境変数](env-vars.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [リモートセッションと自動化](remote-automation.md)
- [公開ドキュメント公開](public-docs.md)
