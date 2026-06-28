# 対話型コマンド

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

対話型コマンドは実行中の CCL セッションを制御し、モード切替、文脈管理、コストやファイルの確認、権限設定、ワークフロー実行、連携接続を行います。

<!-- section: capabilities -->
## 機能範囲

- 主要コマンドには help、config、model、permissions、memory、status、cost、context、compact、clear、resume、diff、commit、review、plan、buddy、agents、workflows があります。
- 連携コマンドは MCP、IDE、terminal setup、Chrome、GitHub app インストール、remote setup、remote control、plugin を扱います。
- 診断コマンドには doctor、endpoint、gateway、stats、insights、usage、および存在する場合の debug tool call 補助があります。

<!-- section: operational-model -->
## 運用モデル

- コマンドは、設定を書き込む、ファイルを作る、サービスへ接続する、外部プロセスを起動する場合を除き、セッション内に閉じます。書き込みを承認する前にコマンドの説明と権限要求を確認してください。

<!-- section: configuration -->
## 設定とコマンド

- 対話セッションで `/` を入力し、現在のビルドとプロジェクトで利用できるコマンドを確認します。

## 対話型コマンドの動作

対話型コマンドはメッセージ先頭で `/` から入力します。利用可能なコマンド集合は、現在のビルド、プロジェクト、feature flag、インストール済みプラグイン、MCP 状態、セッションモードに応じて組み立てられます。一部のコマンドは hidden、internal、または非対話モード無効です。実行中ビルドの実際のコマンド面は、セッション内のコマンドパレットを基準にしてください。

コマンドには、読み取り専用、セッション内のみ、設定書き込み、サービス呼び出し、外部プロセス起動といった副作用の種類があります。この副作用分類もコマンド契約の一部として扱います。たとえば `/status` は検査コマンド、`/gateway login` はゲートウェイ資格情報を書き込み、workflow や remote コマンドはバックグラウンド作業を起動することがあります。

## 通常ワークフローで使うコマンド

| 場面 | 便利なコマンド | 用途 |
| --- | --- | --- |
| 最初のセッション | `/help`, `/init`, `/config`, `/permissions`, `/mcp`, `/agents` | 利用可能なコマンド面、プロジェクト文脈、ツール方針、MCP server 接続、agent 可視性を確認します。 |
| 作業前 | `/plan`, `/model`, `/effort`, `/add-dir`, `/memory` | 計画深度、モデル動作、追加ディレクトリ、関連する永続文脈を選びます。 |
| 作業中 | `/files`, `/diff`, `/status`, `/cost`, `/context`, `/usage` | 関係ファイル、未反映変更、実行状態、token/コスト/文脈使用量、利用可能な provider usage を確認します。 |
| 委任作業中 | `/buddy`, `/agents`, `/workflows` | teammate 型 helper を開始し、agent 可視性を確認し、構造化 automation を実行します。 |
| 文脈が大きい時 | `/compact`, `/clear`, `/resume`, `/rewind`, `/rename` | 文脈を圧縮、新規開始、以前の作業を再開、checkpoint へ戻る、またはセッション名を付けます。 |
| 納品前 | `/review`, `/security-review`, `/commit`, `/commit-push-pr`, `/pr-comments` | 変更レビュー、セキュリティ確認、GitHub 引き渡し準備を行います。 |
| トラブルシュート | `/doctor`, `/gateway doctor`, `/endpoint`, `/debug-tool-call`, `/feedback` | インストール、ゲートウェイ、endpoint、tool-call、製品問題を診断します。 |

## Gateway コマンド

`/gateway status` はゲートウェイ設定の有無を表示し、ゲートウェイが残高フィールドを公開している場合は token 残高も表示します。`/gateway login URL API_KEY` はゲートウェイ URL/key ペアを検証して保存します。`/gateway register URL INVITE_CODE [USERNAME] [EMAIL] [PHONE]` は招待フローでアカウントを作成し接続します。`/gateway doctor` は shell 変数、gateway ファイル設定、OAuth/API-key 状態、ゲートウェイ到達性を比較します。`/gateway logout` は保存済み gateway ファイルを削除し、現在プロセスの変数を消します。

shell 変数と保存設定が食い違う場合は `/gateway doctor` を使います。現在の実装では、shell に `CCL_GATEWAY_URL` または `CCL_GATEWAY_KEY` のどちらかが存在すれば、shell 設定が原子的なペアとしてファイルより優先されます。

## 主要コマンドリファレンス

| コマンド | 何をするか | 使う場面 | よくある問題 |
| --- | --- | --- | --- |
| `/help` | 現在のセッションで利用できるコマンドを表示します。 | このビルドが何をサポートするか不明な時。 | hidden、disabled、plugin 提供、または現在モード非対応で表示されないことがあります。 |
| `/init` | プロジェクト指示とセットアップ案内を作成または更新します。 | 有用なプロジェクト文脈がないリポジトリで開始する時。 | リポジトリが実際に従っていない方針を生成指示に書かせないでください。 |
| `/config` | 設定画面や設定入口を開きます。 | 一つの prompt を超えて残る動作を確認または変更する時。 | user、project、local、managed の設定元が異なる場合があります。 |
| `/permissions` | ツール権限ルールを表示または編集します。 | ツールプロンプトが広すぎる、狭すぎる、または意外な時。 | 将来のツール呼び出しに影響します。deny/ask/allow を慎重に確認してください。 |
| `/model` | 対応している場合、モデル選択を確認または切り替えます。 | 速度、コスト、能力の異なる profile が必要な時。 | モデル alias とゲートウェイモデル名は常に同じではありません。 |
| `/effort` | 対応するモデル経路で reasoning effort を調整します。 | 深い推論または高速な浅い処理が必要な時。 | 高い effort は遅延やコストを増やす可能性があります。 |
| `/memory` | メモリ/文脈面を管理します。 | 再利用可能なプロジェクト知識を確認または更新する時。 | secret や一回限りの仮定を永続メモリに置かないでください。 |
| `/add-dir` | 追加ディレクトリをセッション文脈へ加えます。 | 作業が現在ディレクトリ外にも及ぶ時。 | 大きすぎる、または無関係なディレクトリは文脈を増やし作業を遅くします。 |
| `/files` | セッションが把握しているファイル文脈を表示します。 | 現在関係しているファイルを確認したい時。 | リポジトリ全ファイルが読まれたことは保証しません。 |
| `/diff` | 未反映変更を表示します。 | レビュー、commit、引き渡し前。 | 生成ファイルで diff が騒がしくなるため、ソース変更は別途確認します。 |
| `/status` | 現在のセッション状態を表示します。 | 何も変更せず状態だけ確認したい時。 | 診断コマンドであり修復コマンドではありません。 |
| `/cost` | usage データがある場合にコスト/token を表示します。 | 支出や文脈増加を理解したい時。 | cache カウンタは transport が検証済みフィールドを返す場合だけ意味があります。 |
| `/context` | 文脈使用量を確認します。 | セッションが長い、遅い、または文脈上限に近い時。 | 文脈サイズだけでは不要な内容は分かりません。 |
| `/usage` | 現在デプロイが公開する usage 面を表示します。 | provider/gateway usage 詳細が必要な時。 | 一部デプロイは全 usage フィールドを返しません。 |
| `/compact` | 会話文脈を圧縮します。 | 長いセッションを続けたい時。 | 重要度の低い詳細が落ちる可能性があります。先に重要制約をまとめてください。 |
| `/clear` | 新しい会話状態を開始します。 | 現在文脈が不要になった時。 | ファイル変更は取り消されません。 |
| `/resume` | 過去セッションを再開します。 | 以前の作業を続ける時。 | 似た名前のセッションを取り違えないよう確認します。 |
| `/rewind` | 対応している場合、以前の checkpoint に戻ります。 | 会話状態を戻したい時。 | git reset ではありません。ファイル状態は別途確認します。 |
| `/rename` | セッション名を変更します。 | 後で見つけやすくしたい時。 | 文脈が少ないと名前生成に失敗することがあります。 |
| `/plan` | 計画動作を切り替えまたは呼び出します。 | 大きな編集や曖昧な作業の前。 | 計画は実装ではありません。テストや文書チェックで検証してください。 |
| `/review` | レビュー向け分析を実行します。 | commit、PR、引き渡し前。 | レビュー出力は確認すべき証拠であり自動承認ではありません。 |
| `/security-review` | セキュリティ上注意すべき問題を探します。 | 認証、secret、shell、network、権限、公開に触れる変更時。 | secret scan や policy gate の代替ではありません。 |
| `/commit` | 対応している場合 commit フローを準備します。 | 変更がレビュー済みで記録可能な時。 | diff と test evidence を確認する前に使わないでください。 |
| `/commit-push-pr` | 対応している場合 commit、push、PR 作成を自動化します。 | リポジトリ方針が自動 GitHub 引き渡しを許す時。 | 正しい branch、認証、レビュー規律が必要です。 |
| `/mcp` | セッション内で MCP tool server を管理します。 | 外部ツールを接続、確認、切り替える時。 | workspace trust が重要です。信頼できない stdio server を気軽に起動しないでください。 |
| `/agents` | active agent の可視性を表示または管理します。 | 利用可能な組み込み/カスタム/プラグイン agent を知りたい時。 | MCP 要件や設定元により期待した agent が隠れることがあります。 |
| `/buddy` | Agent tool に `team_name` と `name` を渡し、teammate または pair-agent path を開始します。 | lead session と協調する visible helper agent が必要な時。 | interactive prompt command です。出力に依存する前に teammate 起動と権限を確認してください。 |
| `/hooks` | hook 設定を確認します。 | ツール動作が方針自動化で変わっている時。 | hook は tool input をブロックまたは書き換えます。イベント範囲を確認してください。 |
| `/workflows` | workflow 自動化を作成、一覧、実行、tail、inspect します。 | 反復可能な多段階操作に構造と検証が必要な時。 | background run は tail/inspect で明示的に追跡してください。 |
| `/endpoint` | 設定済みの場合 endpoint routing を pin、確認、切替します。 | モデル経路や endpoint 互換性が疑わしい時。 | endpoint 切替は設定済み registry データに依存します。 |
| `/gateway` | Margay ゲートウェイ状態、login、register、doctor、logout を管理します。 | ゲートウェイ資格情報や到達性を確認・変更する時。 | shell 変数が保存済み gateway 設定を上書きすることがあります。 |

## 診断とコスト

<a id="diagnostics-and-cost"></a>

診断には `/cost`、`/context`、`/usage`、`/stats`、`/insights`、`/endpoint`、`/gateway doctor` を使います。cache-read と cache-write カウンタは、active transport が検証済み usage フィールドを返す場合だけ解釈できます。それ以外では cache hit rate を文書で主張しないでください。

<!-- section: source-evidence -->
## ソース上の根拠

- `commands`
- `commands/cost/index.ts`
- `commands/context/index.ts`
- `commands/usage/index.ts`
- `commands/workflows/index.ts`
- `commands/permissions/permissions.tsx`
- `commands/hooks/hooks.tsx`
- `commands/buddy/index.ts`

<!-- section: related -->
## 関連ページ

- [CLI リファレンス](cli-reference.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [ワークフロー](workflows.md)
- [権限とセキュリティ](permissions-security.md)
- [Hook](hooks.md)
