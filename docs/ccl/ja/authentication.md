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

Gateway authentication は正規化された gateway URL と key を CCL config home の `gateway.json` に保存します。起動時、gateway bootstrap は完全な explicit shell environment override が存在しない限り、その file を `CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` に読み込みます。これにより URL/key の mixed-source pair を避けつつ、意図的な shell override を保持します。

Gateway login は validation が有効な場合 `GET /auth/me` で credentials を検証します。Gateway registration は invite code と optional user details を `/register` に送り、gateway が返す modern JWT-style `token` または古い compatible `api_key` を保存します。

Gateway URL の優先順位は explicit environment、`gateway.json`、built-in default gateway URL です。URL だけでは authentication ではなく、key が必要です。Shell の `CCL_GATEWAY_URL` または `CCL_GATEWAY_KEY` が `gateway.json` を shadow している場合、`/gateway doctor` は conflict と unset/login fix を表示します。

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
- `commands/gateway/gateway-helpers.ts` は `GET /auth/me` による gateway login validation、credential persistence、registration argument parsing、modern/legacy gateway credential fields を扱います。
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
