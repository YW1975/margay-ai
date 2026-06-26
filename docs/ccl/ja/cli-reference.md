# CLI リファレンス

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

`ccl` バイナリは対話入口、print モード、MCP 管理、server とリモート接続、認証、プラグイン管理、エージェント、自動化、更新、shell completion を提供します。

<!-- section: capabilities -->
## 機能範囲

- トップレベルコマンドには `mcp`、`server`、`ssh`、`open`、`auth`、`plugin`、`agents`、`auto-mode`、`doctor`、`update`、`install`、`completion` があります。
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
| MCP | `ccl mcp list`, `ccl mcp add`, `ccl mcp get`, `ccl mcp remove`, `ccl mcp serve` | 外部 tool server を管理する、または CCL MCP server を実行します。 |
| リモート/session server | `ccl server`, `ccl open`, `ccl ssh`, `ccl remote-control`, `ccl assistant` | detached session、内部 URL 接続、remote control bridge、bridge session attach を行います。 |
| 認証 | `ccl auth login`, `ccl auth status`, `ccl auth logout`, `ccl login`, `ccl logout`, `ccl setup-token` | アカウント認証状態を確認または変更します。 |
| プラグイン | `ccl plugin validate`, `list`, `install`, `enable`, `disable`, `marketplace` | プラグイン supply-chain input とインストール済み拡張 bundle を管理します。 |
| エージェント | `ccl agents --setting-sources user,project,local` | active agent を一覧し、source visibility を調べます。 |
| 運用 | `ccl doctor`, `ccl update`, `ccl install`, `ccl completion` | 健康状態確認、更新/インストール、shell completion 生成を行います。 |

## Print モード

prompt と出力を明示的にしたい自動化では print モードを使います。読み取り専用 smoke test では空の allowed-tools list を優先し、呼び出し側が解析できる場合だけ JSON または stream JSON を要求してください。

例：`ccl -p "List the top-level directories and their purpose." --allowedTools ""`

## トップレベルコマンドリファレンス

| コマンド | 何をするか | 使う場面 | よくある問題 |
| --- | --- | --- | --- |
| `ccl [prompt]` | 対話セッションを開始し、任意で prompt を渡します。 | 通常の human-in-the-loop 作業。 | prompt が slash command で始まる場合、コマンド処理はセッション内で行われます。 |
| `ccl -p "..."` | print mode を実行して終了します。 | スクリプト、CI、smoke test。 | 対話専用コマンドや prompt は REPL と同じ動作にならない場合があります。 |
| `ccl mcp serve` | CCL MCP server を開始します。 | 別 client が CCL 公開 MCP 能力を必要とする時。 | debug mode はログを増やします。secret を漏らさないでください。 |
| `ccl mcp list/get/add/remove` | MCP server 設定を確認・変更します。 | 外部 tool server を管理する時。 | list/get は健康確認のため stdio server を起動することがあります。信頼できるディレクトリで使ってください。 |
| `ccl server` | CCL session server を開始します。 | detached または remote-controlled session。 | host、token、idle timeout を意図して設定してください。 |
| `ccl open <cc-url>` | 内部 CCL server URL へ接続します。 | 既存 session endpoint に attach する時。 | 信頼できる `cc://` URL だけを使います。 |
| `ccl ssh <host> [dir]` | SSH 経由で remote host 上の CCL を実行し、認証を tunnel します。 | 手動 remote setup なしで遠隔 machine を扱う時。 | permission mode と remote trust boundary を明確にしてください。 |
| `ccl auth login/status/logout` | 認証状態を管理します。 | アカウント login、確認、logout。 | ゲートウェイ資格情報はアカウント認証とは別です。 |
| `ccl plugin ...` | プラグインや marketplace を validate、list、install、enable、disable、update します。 | 拡張 bundle のインストールや監査。 | プラグインは supply-chain input です。manifest と source を検証してください。 |
| `ccl agents` | 設定済み active agent を一覧します。 | 組み込み/カスタム/プラグイン agent の可視性を調べる時。 | `--setting-sources` で読み込む設定元を制御します。 |
| `ccl auto-mode ...` | 有効な場合、auto-mode classifier defaults/config/critique を確認します。 | 自動動作方針を調べる時。 | 利用可否は build flag に依存します。 |
| `ccl remote-control` / `ccl assistant` | local または bridge session を remote-control flow に接続します。 | デプロイ方針が remote interactive control を有効にしている時。 | 認証、feature support、環境境界が必要です。 |
| `ccl doctor` | runtime/updater health を確認します。 | setup、update、workspace-health の問題。 | 診断コマンドです。報告された fix に従い、盲目的に再実行しないでください。 |
| `ccl update` / `ccl upgrade` | 更新を確認して導入します。 | ローカルバイナリを最新に保つ時。 | version policy は install channel により異なります。 |
| `ccl install [target]` | native build をインストールします。 | 初回 install または明示 target install。 | `--force` は意図して再インストールする場合だけ使います。 |
| `ccl completion <shell>` | shell completion を生成します。 | CLI 操作性を上げたい時。 | 正しい shell startup path に書き込みます。 |

## CCL 互換性

<a id="ccl-compatibility"></a>

一部のコマンド名、環境変数名、ソース上の識別子は SDK または wire-format 互換性のために残っています。公開文書では、利用者が実際に見る CCL の動作を説明し、互換リテラルは現在のビルドの設定やデバッグに必要な場合だけ記載します。

## 安定性メモ

ソース上で internal、hidden、deployment-specific と示されるコマンドは、安定した公開自動化 API として扱わないでください。feature flag または内部 build 条件の下でだけ利用できるコマンドは、その条件を記録するか、ユーザー向け workflow から省きます。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`

<!-- section: related -->
## 関連ページ

- [対話型コマンド](commands.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [プラグイン](plugins.md)
- [エージェント](agents.md)
- [リモートセッションと自動化](remote-automation.md)
