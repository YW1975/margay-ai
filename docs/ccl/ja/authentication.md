# 認証

> このページは公開ドキュメントのソースとして保守されています。実 token、invite code、非公開 gateway URL を載せないでください。

<!-- section: purpose -->
## Purpose

CCL は複数の認証 channel を扱えます。Margay gateway credentials、direct API keys、Claude account OAuth、互換 provider credentials、MCP server-specific OAuth flows です。正しい channel は選択 model、deployment policy、command surface に依存します。認証と model routing は意図的に分離されているため、「ログイン済みか」と「この model はどの endpoint を使うか」は別々に診断します。

<!-- section: capabilities -->
## Capabilities

- interactive session で `/gateway register`、`/gateway login`、`/gateway status`、`/gateway doctor`、`/gateway logout` を使い Margay gateway credentials を管理できます。
- `ccl auth login`、`ccl auth status`、`ccl auth logout` で Claude account authentication を管理できます。
- `/login` と `/logout` は interactive account command surface です。
- `ANTHROPIC_API_KEY` または `--api-key` で direct API-key session を実行できます。
- 互換 endpoint を明示的に選ぶ必要がある場合は `ANTHROPIC_BASE_URL` を使います。
- 外部 MCP server が OAuth や identity-provider login を要求する場合は MCP authentication commands を使います。
- deployment が対応している場合は `setup-token` で long-lived token を設定します。
- mixed state や stale state は `/gateway doctor`、`ccl auth status`、`/status`、`/doctor`、model-routing diagnostics で調べます。

<!-- section: operational-model -->
## Operational model

ゲートウェイの環境設定には `CCL_GATEWAY_URL`、`CCL_GATEWAY_KEY`、`CCL_GATEWAY_CREDENTIAL_TYPE`、`CCL_GATEWAY_ISSUER` の四つをまとめて指定します。issuer は正規化した URL と一致する必要があります。`/gateway login` または `/gateway register` で型付き資格情報を作成し、`/gateway doctor` で隔離や不一致を調べてください。上流プロバイダーのキーをゲートウェイ資格情報として使わないでください。

ゲートウェイのログイン・登録は専用資格情報を検証し、型付き状態を `~/.ccl/gateway.json` に保存して現在のプロセスを更新します。新しい shell rc ブロックは書きません。新規プロセスの起動前に四つの古い環境変数を削除または更新してください。旧 compact JWT の互換受け入れは移行経路であり、メタデータ省略の推奨ではありません。

ログインは同一オリジンの `GET /auth/me` でゲートウェイ専用資格情報を検証してから保存します。登録は招待コードと任意の情報を `/register` に送り、返されたゲートウェイ JWT だけを同じゲートウェイで検証します。旧 `api_key` 応答は登録資格情報として受け入れません。

受け入れ条件を満たす完全な環境設定、または型付きの保存済み設定を使います。URL だけでは認証できません。型のない不透明な資格情報や issuer の不一致はリクエスト前に隔離されます。`/gateway doctor` で調べ、四つの設定を削除または修正してから再ログインしてください。

Direct Claude authentication は別 channel です。`ANTHROPIC_API_KEY`、OAuth tokens、gateway credentials は同時に存在し得ますが、route selection は selected model と provider compatibility に依存します。Gateway doctor は Claude-direct と gateway の channel state を別々に報告します。

<!-- section: configuration -->
## Configuration and commands

- Gateway registration: `/gateway register [url] <invite-code> [username] [email] [phone]`。URL を省略すると default gateway URL を使います。
- Gateway login: `/gateway login <url> <key>`。
- Gateway status: `/gateway status` または `/gateway`。
- Gateway diagnosis: `/gateway doctor`。
- Gateway logout: `/gateway logout`。
- Claude account CLI auth: `ccl auth login`、`ccl auth status`、`ccl auth logout`。
- Direct API-key session: `ANTHROPIC_API_KEY=<key> ccl ...` または `ccl --api-key <key> ...`。
- 実 API key、gateway token、OAuth token、invite code を docs、settings、examples、screenshots に commit してはいけません。

<!-- section: source-evidence -->
## Source evidence

- `bootstrap/gatewayConfig.ts` は gateway config loading、`gateway.json`、explicit environment override behavior、default gateway URL resolution を定義します。
- `commands/gateway/gateway.tsx` は `/gateway status`、`login`、`logout`、`doctor`、`register` を実装します。
- `commands/gateway/gateway-helpers.ts` — ログインは同一オリジンの `GET /auth/me` でゲートウェイ専用資格情報を検証してから保存します。登録は招待コードと任意の情報を `/register` に送り、返されたゲートウェイ JWT だけを同じゲートウェイで検証します。旧 `api_key` 応答は登録資格情報として受け入れません。
- `services/gateway/gatewayDoctor.ts` は placeholder values、stale environment shadowing、missing gateway config、API-key/OAuth conflicts を検出します。
- `main.tsx` は `auth login/status/logout`、`setup-token`、`--api-key`、`--base-url`、`--bare`、authentication initialization flow を定義します。
- `services/mcp/auth.ts` と `commands/mcp/mcp.tsx` は MCP-related authentication surfaces を実装します。

<!-- section: related -->
## Related pages

- [設定と構成](configuration.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [環境変数](env-vars.md)
- [MCP サーバーとツール](mcp.md)
- [トラブルシューティング](troubleshooting.md)
