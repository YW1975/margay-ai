# 環境変数

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は CCL 接頭辞の環境変数を読み取り、モデル選択、ログ、権限、ゲートウェイ設定、カスタムヘッダー、互換動作に使います。ルーティング資格情報は CCL 固有名を使い、provider SDK 変数へ無条件にはコピーされません。

<!-- section: capabilities -->
## 機能範囲

- `CCL_MODEL` とモデル既定値変数で、互換デプロイのメインモデルまたは高速モデルを選びます。
- `CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` は Margay ゲートウェイルーティングに使います。設定されている場合は `~/.ccl/gateway.json` より優先されます。
- `CCL_LOG`、`CCL_BETAS`、`CCL_CUSTOM_HEADERS`、`CCL_PERMISSIONS_TEMPLATE` は診断、beta フラグ、ヘッダー、権限既定値に使います。

<!-- section: operational-model -->
## 運用モデル

- `bootstrap/envSync.ts` は、互換変数が未設定の場合に限り、一部の非ルーティング `CCL_*` 変数を互換変数へ対応付けます。誤った provider ルーティングを避けるため、`CCL_BASE_URL` と `CCL_API_KEY` は明示的に同期対象外です。
- `bootstrap/gatewayConfig.ts` は `CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` の両方がない場合だけ `~/.ccl/gateway.json` を読み込みます。どちらかの shell 変数が存在する場合、shell 環境が原子的な設定ペアとして優先されます。

<!-- section: configuration -->
## 設定とコマンド

- `/gateway login`、`/gateway register`、`/gateway logout` は `CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` を書き込みまたは削除します。
- `ANTHROPIC_*` などの互換リテラルは、基盤 SDK 互換層に必要な環境変数名としてのみ記載し、ベンダーブランド文言としては扱いません。
- provider cache ヒット率はこのページではまだ扱いません。cache-read/cache-write 指標は、ゲートウェイが検証済み usage フィールドを公開してから追記します。

<!-- section: source-evidence -->
## ソース上の根拠

- `bootstrap/envSync.ts`
- `bootstrap/gatewayConfig.ts`
- `commands/gateway/gateway.tsx`
- `commands/gateway/gateway-helpers.ts`
- `commands/endpoint/endpoint.tsx`
- `commands/model/model.tsx`
- `package.json`

<!-- section: related -->
## 関連ページ

- [設定](configuration.md)
- [認証](authentication.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [トラブルシューティング](troubleshooting.md)
