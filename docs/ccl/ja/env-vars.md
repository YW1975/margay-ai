# 環境変数

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は CCL 接頭辞の環境変数を読み取り、モデル選択、ログ、権限、ゲートウェイ設定、カスタムヘッダー、互換動作に使います。ルーティング資格情報は CCL 固有名を使い、provider SDK 変数へ無条件にはコピーされません。

<!-- section: capabilities -->
## 機能範囲

- `CCL_MODEL` とモデル既定値変数で、互換デプロイのメインモデルまたは高速モデルを選びます。
- Margay ゲートウェイには `CCL_GATEWAY_URL`、`CCL_GATEWAY_KEY`、`CCL_GATEWAY_CREDENTIAL_TYPE`、`CCL_GATEWAY_ISSUER` の四つを設定し、`/gateway login` または `/gateway register` を優先してください。URL と KEY の設定だけで保存済み設定を上書きできるとは限らず、資格情報の受け入れ検査を通る必要があります。
- `CCL_LOG`、`CCL_BETAS`、`CCL_CUSTOM_HEADERS`、`CCL_PERMISSIONS_TEMPLATE` は診断、beta フラグ、ヘッダー、権限既定値に使います。
- OAuth とゲートウェイを意図的に併用するデプロイでは、`CCL_QUIET_DUAL_CHANNEL=1` で起動時の dual-channel 情報メモを非表示にできます。Claude は OAuth、third-party model は gateway を使います。

<!-- section: operational-model -->
## 運用モデル

- `bootstrap/envSync.ts` は、互換変数が未設定の場合に限り、一部の非ルーティング `CCL_*` 変数を互換変数へ対応付けます。誤った provider ルーティングを避けるため、`CCL_BASE_URL` と `CCL_API_KEY` は明示的に同期対象外です。
- ゲートウェイの環境設定には `CCL_GATEWAY_URL`、`CCL_GATEWAY_KEY`、`CCL_GATEWAY_CREDENTIAL_TYPE`、`CCL_GATEWAY_ISSUER` の四つをまとめて指定します。issuer は正規化した URL と一致する必要があります。`/gateway login` または `/gateway register` で型付き資格情報を作成し、`/gateway doctor` で隔離や不一致を調べてください。上流プロバイダーのキーをゲートウェイ資格情報として使わないでください。
- dual-channel mode では、OAuth または first-party API-key auth が利用できる場合、Claude model call は local Claude auth channel を使います。DeepSeek や Kimi などの非 Claude model は設定済み gateway を使います。この mode では gateway credential を provider SDK 変数に入れないでください。

<!-- section: configuration -->
## 設定とコマンド

- ゲートウェイのログイン・登録は専用資格情報を検証し、型付き状態を `~/.ccl/gateway.json` に保存して現在のプロセスを更新します。新しい shell rc ブロックは書きません。新規プロセスの起動前に四つの古い環境変数を削除または更新してください。旧 compact JWT の互換受け入れは移行経路であり、メタデータ省略の推奨ではありません。
- `ANTHROPIC_*` などの互換リテラルは、基盤 SDK 互換層に必要な環境変数名としてのみ記載し、ベンダーブランド文言としては扱いません。
- provider cache ヒット率はこのページではまだ扱いません。cache-read/cache-write 指標は、ゲートウェイが検証済み usage フィールドを公開してから追記します。

## 変数を設定する場所

| 環境 | 例 | 使う場面 |
| --- | --- | --- |
| POSIX shell | `export CCL_LOG=debug` | 現在の shell と子プロセスに値を渡したい時。 |
| 一回のコマンド | `CCL_LOG=debug ccl doctor` | 一時的な診断 override が必要な時。 |
| ローカル gateway ファイル | `~/.ccl/gateway.json` | `/gateway login` で永続ローカル gateway 資格情報を保存した時。 |
| 管理設定 | organization-managed settings | チームが policy-controlled default を必要とする時。 |

## 優先順位とルーティング安全性

ゲートウェイの環境設定には `CCL_GATEWAY_URL`、`CCL_GATEWAY_KEY`、`CCL_GATEWAY_CREDENTIAL_TYPE`、`CCL_GATEWAY_ISSUER` の四つをまとめて指定します。issuer は正規化した URL と一致する必要があります。`/gateway login` または `/gateway register` で型付き資格情報を作成し、`/gateway doctor` で隔離や不一致を調べてください。上流プロバイダーのキーをゲートウェイ資格情報として使わないでください。

ゲートウェイのログイン・登録は専用資格情報を検証し、型付き状態を `~/.ccl/gateway.json` に保存して現在のプロセスを更新します。新しい shell rc ブロックは書きません。新規プロセスの起動前に四つの古い環境変数を削除または更新してください。旧 compact JWT の互換受け入れは移行経路であり、メタデータ省略の推奨ではありません。

```bash
unset CCL_GATEWAY_URL CCL_GATEWAY_KEY CCL_GATEWAY_CREDENTIAL_TYPE CCL_GATEWAY_ISSUER
```

`bootstrap/envSync.ts` は選択された非ルーティング `CCL_*` 変数だけを互換 SDK 変数へ同期します。`CCL_BASE_URL` や `CCL_API_KEY` を provider routing 変数へ同期しません。

## 主な変数

| 変数 | 用途 | メモ |
| --- | --- | --- |
| `CCL_GATEWAY_URL` | ゲートウェイ base URL | 四つの設定をそろえ、対話ログインを優先します。 |
| `CCL_GATEWAY_KEY` | ゲートウェイ専用資格情報 | 公開せず、上流プロバイダーのキーも使わないでください。 |
| `CCL_GATEWAY_CREDENTIAL_TYPE`, `CCL_GATEWAY_ISSUER` | 資格情報のメタデータ | 型と issuer はゲートウェイ設定との一致が必要です。 |
| `CCL_MODEL` | モデル選択 | 互換 target 変数が未設定の場合だけ互換モデル変数へ同期されます。 |
| `CCL_SMALL_FAST_MODEL` | 小型高速モデル選択 | 大きい task と低コスト task を分けるデプロイに有用です。 |
| `CCL_LOG` | ログ詳細度 | 診断ではコマンド単位の一時 override を優先します。 |
| `CCL_ROUTING_PRIORITY` | smart routing 優先度 | gateway classifier が routing table を返す場合に `cost` または `quality` を指定します。 |
| `CCL_AUTO_FALLBACK_MODEL` | auto/smart fallback model | gateway classifier が利用できず、選択モデルがまだ `auto` または `smart` の場合に使われます。 |
| `CCL_QUIET_DUAL_CHANNEL` | 起動時メモ制御 | `1` にすると dual-channel 情報メモを非表示にします。 |
| `CCL_CUSTOM_HEADERS` | 追加 request header | 認証や routing metadata を含む場合は sensitive として扱います。 |
| `CCL_PERMISSIONS_TEMPLATE` | 権限既定値 | tool prompting に影響するため慎重に使います。 |

## 同期されるものとされないもの

| CCL 変数ファミリー | 互換 target | ルーティングリスク |
| --- | --- | --- |
| `CCL_MODEL`, `CCL_SMALL_FAST_MODEL` | モデル選択互換変数 | target 変数が未設定なら安全に同期できます。 |
| `CCL_LOG`, `CCL_BETAS`, `CCL_CUSTOM_HEADERS` | 診断/header 互換変数 | 同期できますが、header は sensitive metadata を含む場合があります。 |
| `CCL_PERMISSIONS_TEMPLATE` | 権限テンプレート互換変数 | 同期できますが、tool prompting の既定値を変えます。 |
| `CCL_DEFAULT_*_MODEL*`, `CCL_CUSTOM_MODEL_OPTION*` | モデルメニュー custom 変数 | モデル表示と選択のため安全に同期できます。 |
| `CCL_BASE_URL`, `CCL_API_KEY` | 自動同期なし | provider routing 変数へコピーしてはいけません。Claude-channel call の乗っ取りや account auth conflict の原因になります。 |
| `CCL_GATEWAY_URL`, `CCL_GATEWAY_KEY` | provider SDK へ同期しない | gateway routing は CCL namespace または gateway file に残します。 |

## 二重読み取り変数（CCL 名が優先、レガシー名にフォールバック）

一連の動作トグルについて、CCL はまず `CCL_*` 名を読み、`CCL_*` が未設定の場合だけレガシー互換名にフォールバックします。新しいデプロイでは `CCL_*` 形式を設定してください。レガシー名を使う既存スクリプトは引き続き動作します。

| CCL 変数（設定されれば優先） | レガシーフォールバック | 用途 |
| --- | --- | --- |
| `CCL_SIMPLE` | `CLAUDE_CODE_SIMPLE` | Bare/最小 runtime mode（`--bare` と同じ効果）。 |
| `CCL_MAX_OUTPUT_TOKENS` | `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | 出力予算の指定です。CCL 変数が優先しますが既知のモデル・ゲートウェイ上限は適用され、回復時の予算拡大には同意が必要です。 |
| `CCL_REMOTE_MEMORY_DIR` | `CLAUDE_CODE_REMOTE_MEMORY_DIR` | リモート/コンテナ実行での memory file の base directory を上書きします。 |
| `CCL_SKIP_PROMPT_HISTORY` | `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | prompt をコマンド履歴に書かないようにします（生成された検証 session が実履歴を汚さないために使用）。 |
| `CCL_DISABLE_CLAUDE_MDS` | `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | プロジェクト/ユーザーの記憶指示ファイルの読み込みを無効化します。 |

`CCL_CONFIG_DIR` も同じ考え方ですが OR チェーンです。config home は `CCL_CONFIG_DIR`、次に `CLAUDE_CONFIG_DIR`、最後に home directory の既定値の順に解決され、最初の非空値が勝ちます。

## 運用変数

| 変数 | 用途 |
| --- | --- |
| `CCL_PRINT_MAX_TURNS` | `--max-turns` がない print mode の既定最大 turn 数。 |
| `CCL_ROUTING_PRIORITY` | gateway smart-routing preference。通常は `cost` または `quality`。 |
| `CCL_GATEWAY_MAIN_MODEL` | gateway mode で明示 model がない場合の既定 main model。 |
| `CCL_GATEWAY_SMALL_FAST_MODEL` | gateway mode の既定 small/fast model。 |
| `CCL_HOOK_MAX_OUTPUT_BYTES` | hook output の retained buffer を切り詰める前の byte 数を調整します。 |
| `CCL_JSONL_HEAP_HEADROOM_MB` | 大きな structured stream 用に JSONL heap headroom を上書きします。 |
| `CCL_AUTO_HEAPDUMP_OFF` | automatic heap dump monitoring を無効化します。 |
| `CCL_AUTO_HEAPDUMP_HIGH_MB`, `CCL_AUTO_HEAPDUMP_CRITICAL_MB` | high と critical の heap dump threshold を調整します。 |
| `CCL_CONFIG_DIR` | CCL 設定を default config home から分離します。レガシーの `CLAUDE_CONFIG_DIR` より優先され、後者は home directory の既定値より優先されます。 |

## 環境変数のトラブルシューティング

`/gateway doctor` がファイルと shell の不一致を示す場合、どちらを有効にするか決めてからもう一方を消します。provider SDK が予期しない base URL を使う場合、CCL 外部で互換変数が設定されていないか確認します。変数が無視されるように見える場合、その値がプロセス起動時だけ読まれるものか確認し、shell またはセッションを再起動します。

OAuth と Margay gateway を併用する場合、provider SDK の API-key や base-URL 変数に gateway 値を入れないでください。auth-conflict warning が出る、または SDK call が誤った URL に向く原因になります。gateway state は `CCL_GATEWAY_*` または `~/.ccl/gateway.json` に置きます。`CCL_QUIET_DUAL_CHANNEL=1` は想定された情報メモを隠すためのもので、実際の credential conflict を隠すためではありません。

<!-- section: source-evidence -->
## ソース上の根拠

- `bootstrap/envSync.ts`
- `bootstrap/gatewayConfig.ts`
- `utils/env.ts`（config-dir 解決チェーン）
- `utils/envUtils.ts`、`history.ts`、`memdir/paths.ts`、`tools/AgentTool/agentMemory.ts`、`context.ts`、`query.ts`（二重読み取りの呼び出し箇所）
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
