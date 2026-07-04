# CLI リファレンス

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

`ccl` バイナリは対話入口、print モード、MCP 管理、認証、プラグイン管理、エージェント、workflow 自動化、更新、インストール診断を提供します。

<!-- section: capabilities -->
## 機能範囲

- 現在の公開トップレベルコマンドは `agents`、`auth`、`doctor`、`install`、`mcp`、`plugin` または `plugins`、`setup-token`、`update` または `upgrade`、`workflow` です。
- 対話型 slash command は [コマンド](commands.md) に分けて記載します。利用可能な場合は cost、context、usage、gateway、endpoint、remote-control 面も含みます。
- 内部用途コマンドを安定した公開自動化 API として記載しないでください。

<!-- section: operational-model -->
## 運用モデル

- CLI リファレンスは安定した利用者向け動作を説明します。ソース上のヘルプが内部用途やデプロイ固有と示すコマンドは、公開契約ではなく運用上の文脈として扱います。

<!-- section: configuration -->
## 設定とコマンド

- 導入済みビルドで `ccl --help` と `ccl <command> --help` を実行し、そのビルドで利用できるコマンド面を確認します。

## ターミナルコマンドのグループ

| コマンドグループ | 例 | 使う場面 |
| --- | --- | --- |
| セッション入口 | `ccl [prompt]`, `ccl -p "..."`, `ccl --output-format json` | 対話セッションを開始する、または scriptable な一回限りの prompt を実行します。 |
| MCP | `ccl mcp` | 外部 tool server を設定、管理します。 |
| 認証 | `ccl auth`, `ccl setup-token` | アカウント認証状態を確認または変更します。 |
| プラグイン | `ccl plugin`, `ccl plugins` | プラグイン supply-chain input とインストール済み拡張 bundle を管理します。 |
| エージェント | `ccl agents --setting-sources user,project,local` | active agent を一覧し、source visibility を調べます。 |
| ワークフロー | `ccl workflow` | workflow 自動化を実行、検証、管理します。 |
| 運用 | `ccl doctor`, `ccl update`, `ccl upgrade`, `ccl install` | 健康状態確認、更新/インストールを行います。 |

## Print モード

prompt と出力を明示的にしたい自動化では print モードを使います。読み取り専用 smoke test では空の allowed-tools list を優先し、呼び出し側が解析できる場合だけ JSON または stream JSON を要求してください。

例：`ccl -p "List the top-level directories and their purpose." --allowedTools ""`

重要な print-mode 制御:

| オプション | 範囲 | メモ |
| --- | --- | --- |
| `-p`, `--print` | 非対話実行 | 1 つの prompt を実行して終了します。workspace trust prompt はスキップされるため、信頼できるディレクトリでのみ使います。 |
| `--output-format text` | 人間向け出力 | 既定の print-mode 出力です。 |
| `--output-format json` | スクリプト向け出力 | 最終 JSON 結果を 1 つ出力します。呼び出し側は非ゼロ終了も別途処理してください。 |
| `--output-format stream-json` | ストリーミング統合 | 増分イベントを出力し、通常は `--input-format stream-json` と組み合わせます。 |
| `--include-partial-messages` | ストリーミング出力 | stream JSON に部分的な assistant chunk を含めます。 |
| `--include-hook-events` | ストリーミング診断 | stream JSON に hook lifecycle event を含めます。 |
| `--max-turns` | Agent ループ境界 | 非対話 turn 数を制限します。`0` は無制限です。 |
| `--max-budget-usd` | コストガード | 実行が予算を超える場合に停止します。 |
| `--no-session-persistence` | セッション保存 | resume 可能な transcript を保存しません。 |

## セッション範囲と安全性

| オプション群 | 変更するもの | 安全上のメモ |
| --- | --- | --- |
| `--cwd`, `--add-dir` | 作業ディレクトリと追加の読み書き root | 範囲はタスクに必要な最小限にします。 |
| `--allowedTools`, `--disallowedTools`, `--tools` | tool availability | 自動化では明示 allowlist を優先します。読み取り専用 smoke test では `--tools ""` を使えます。 |
| `--permission-mode` | 権限 prompt の挙動 | `bypassPermissions` と権限 skip flag は隔離 sandbox 用であり、通常の project 作業向けではありません。 |
| `--mcp-config`, `--strict-mcp-config` | MCP server input | health check と MCP command は信頼済み設定から stdio server を起動することがあります。 |
| `--plugin-dir`, `--agents`, `--agent` | 拡張と委任 input | plugin と inline agent は実行可能な policy input として扱います。 |
| `--settings`, `--setting-sources` | 設定 source selection | user/project/local 設定の衝突を調べる時に source filter を使います。 |
| `--bare` | 最小 runtime mode | hooks、plugin sync、auto-memory、keychain read、自動 discovery をスキップします。必要な context は明示的に渡します。 |

## トップレベルコマンドリファレンス

| コマンド | 何をするか | 使う場面 | よくある問題 |
| --- | --- | --- | --- |
| `ccl [prompt]` | 対話セッションを開始し、任意で prompt を渡します。 | 通常の human-in-the-loop 作業。 | prompt が slash command で始まる場合、コマンド処理はセッション内で行われます。 |
| `ccl -p "..."` | print mode を実行して終了します。 | スクリプト、CI、smoke test。 | 対話専用コマンドや prompt は REPL と同じ動作にならない場合があります。 |
| `ccl mcp` | MCP server を設定、管理します。 | 外部 tool を追加、確認、削除する時。 | MCP check は stdio server を起動することがあります。信頼できるディレクトリで使ってください。 |
| `ccl auth` | 認証状態を管理します。 | アカウント login、確認、logout。 | ゲートウェイ資格情報はアカウント認証とは別です。 |
| `ccl plugin` / `ccl plugins` | プラグイン bundle と marketplace を管理します。 | 拡張 bundle のインストールや監査。 | プラグインは supply-chain input です。manifest と source を検証してください。 |
| `ccl agents` | 設定済み active agent を一覧します。 | 組み込み/カスタム/プラグイン agent の可視性を調べる時。 | `--setting-sources` で読み込む設定元を制御します。 |
| `ccl workflow` | ワークフローを実行、管理します。 | 繰り返し可能な多段階自動化に CLI 入口が必要な時。 | 無人実行に頼る前に workflow spec と権限を検証してください。 |
| `ccl setup-token` | 対応するアカウント経路で長期認証 token を設定します。 | deployment が subscription-backed token setup を必要とする時。 | 対応するアカウント機能が必要です。 |
| `ccl doctor` | runtime/updater health を確認します。 | setup、update、workspace-health の問題。 | 診断コマンドです。報告された fix に従い、盲目的に再実行しないでください。 |
| `ccl update` / `ccl upgrade` | 更新を確認して導入します。 | ローカルバイナリを最新に保つ時。 | version policy は install channel により異なります。 |
| `ccl install [target]` | native build をインストールします。 | 初回 install または明示 target install。 | `--force` は意図して再インストールする場合だけ使います。 |

## Help 出力の契約境界

`ccl --help` は、導入済みビルドのターミナルコマンド面に対する最初の根拠です。ソースファイルには internal、feature-gated、互換、deployment-only のコマンドが含まれる場合がありますが、それらを公開自動化 API として約束してはいけません。`ccl --help` に出ないコマンドを記載する場合は、有効化条件も同時に書きます。

## CCL 互換性

<a id="ccl-compatibility"></a>

一部のコマンド名、環境変数名、ソース上の識別子は SDK または wire-format 互換性のために残っています。公開文書では、利用者が実際に見る CCL の動作を説明し、互換リテラルは現在のビルドの設定やデバッグに必要な場合だけ記載します。

## 安定性メモ

ソース上で internal、hidden、deployment-specific と示されるコマンドは、安定した公開自動化 API として扱わないでください。現在の例は、`ccl --help` から隠れている server、SSH、内部 URL opener、bridge helper、shell completion、auto-mode debug surface です。feature flag または内部 build 条件の下でだけ利用できるコマンドは、その条件を記録するか、ユーザー向け workflow から省きます。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `dist/cli.js --help`

<!-- section: related -->
## 関連ページ

- [対話型コマンド](commands.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [プラグイン](plugins.md)
- [エージェント](agents.md)
- [リモートセッションと自動化](remote-automation.md)
