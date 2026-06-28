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
- OAuth とゲートウェイを意図的に併用するデプロイでは、`CCL_QUIET_DUAL_CHANNEL=1` で起動時の dual-channel 情報メモを非表示にできます。Claude は OAuth、third-party model は gateway を使います。

<!-- section: operational-model -->
## 運用モデル

- `bootstrap/envSync.ts` は、互換変数が未設定の場合に限り、一部の非ルーティング `CCL_*` 変数を互換変数へ対応付けます。誤った provider ルーティングを避けるため、`CCL_BASE_URL` と `CCL_API_KEY` は明示的に同期対象外です。
- `bootstrap/gatewayConfig.ts` は `CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` の両方がない場合だけ `~/.ccl/gateway.json` を読み込みます。どちらかの shell 変数が存在する場合、shell 環境が原子的な設定ペアとして優先されます。
- dual-channel mode では、OAuth または first-party API-key auth が利用できる場合、Claude model call は local Claude auth channel を使います。DeepSeek や Kimi などの非 Claude model は設定済み gateway を使います。この mode では gateway credential を provider SDK 変数に入れないでください。

<!-- section: configuration -->
## 設定とコマンド

- `/gateway login`、`/gateway register`、`/gateway logout` は `CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` を書き込みまたは削除します。
- `ANTHROPIC_*` などの互換リテラルは、基盤 SDK 互換層に必要な環境変数名としてのみ記載し、ベンダーブランド文言としては扱いません。
- provider cache ヒット率はこのページではまだ扱いません。cache-read/cache-write 指標は、ゲートウェイが検証済み usage フィールドを公開してから追記します。

## 変数を設定する場所

| 環境 | 例 | 使う場面 |
| --- | --- | --- |
| POSIX shell | `export CCL_GATEWAY_URL=https://gateway.example.com` | 現在の shell と子プロセスに値を渡したい時。 |
| 一回のコマンド | `CCL_LOG=debug ccl doctor` | 一時的な診断 override が必要な時。 |
| ローカル gateway ファイル | `~/.ccl/gateway.json` | `/gateway login` で永続ローカル gateway 資格情報を保存した時。 |
| 管理設定 | organization-managed settings | チームが policy-controlled default を必要とする時。 |

## 優先順位とルーティング安全性

`CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` は原子的なペアです。shell 環境にどちらか一つでも存在する場合、CCL は `~/.ccl/gateway.json` を読み込みません。shell 環境が優先されます。これにより、環境 URL と古いファイル key の混在を避けます。

`bootstrap/envSync.ts` は選択された非ルーティング `CCL_*` 変数だけを互換 SDK 変数へ同期します。`CCL_BASE_URL` や `CCL_API_KEY` を provider routing 変数へ同期しません。

## 主な変数

| 変数 | 用途 | メモ |
| --- | --- | --- |
| `CCL_GATEWAY_URL` | ゲートウェイ base URL | `CCL_GATEWAY_KEY` と併用します。shell 値があると gateway ファイル読み込みを止めます。 |
| `CCL_GATEWAY_KEY` | ゲートウェイ API key | `CCL_GATEWAY_URL` と併用します。公開文書や commit に入れないでください。 |
| `CCL_MODEL` | モデル選択 | 互換 target 変数が未設定の場合だけ互換モデル変数へ同期されます。 |
| `CCL_SMALL_FAST_MODEL` | 小型高速モデル選択 | 大きい task と低コスト task を分けるデプロイに有用です。 |
| `CCL_LOG` | ログ詳細度 | 診断ではコマンド単位の一時 override を優先します。 |
| `CCL_ROUTING_PRIORITY` | smart routing 優先度 | gateway classifier が routing table を返す場合に `cost` または `quality` を指定します。 |
| `CCL_AUTO_FALLBACK_MODEL` | auto/smart fallback model | gateway classifier が利用できず、選択モデルがまだ `auto` または `smart` の場合に使われます。 |
| `CCL_QUIET_DUAL_CHANNEL` | 起動時メモ制御 | `1` にすると dual-channel 情報メモを非表示にします。 |
| `CCL_CUSTOM_HEADERS` | 追加 request header | 認証や routing metadata を含む場合は sensitive として扱います。 |
| `CCL_PERMISSIONS_TEMPLATE` | 権限既定値 | tool prompting に影響するため慎重に使います。 |

## 環境変数のトラブルシューティング

`/gateway doctor` がファイルと shell の不一致を示す場合、どちらを有効にするか決めてからもう一方を消します。provider SDK が予期しない base URL を使う場合、CCL 外部で互換変数が設定されていないか確認します。変数が無視されるように見える場合、その値がプロセス起動時だけ読まれるものか確認し、shell またはセッションを再起動します。

OAuth と Margay gateway を併用する場合、provider SDK の API-key や base-URL 変数に gateway 値を入れないでください。auth-conflict warning が出る、または SDK call が誤った URL に向く原因になります。gateway state は `CCL_GATEWAY_*` または `~/.ccl/gateway.json` に置きます。`CCL_QUIET_DUAL_CHANNEL=1` は想定された情報メモを隠すためのもので、実際の credential conflict を隠すためではありません。

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
