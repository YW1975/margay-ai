# クイックスタート

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL をインストールし、ゲートウェイまたは互換モデルプロバイダーを設定し、プロジェクトディレクトリで対話セッションまたは print モードを開始します。

<!-- section: capabilities -->
## 機能範囲

- `ccl` で対話セッションを開始します。
- `ccl -p "summarize this repo"` で非対話出力を得ます。
- 認証、アップデーター、環境状態が不明な場合は `ccl doctor` を実行します。

<!-- section: operational-model -->
## 運用モデル

- CCL は設定を読み込み、プロジェクト文脈を検出し、ツールを準備してから、設定済みの provider 経路へモデル要求を送ります。権限確認はファイル編集、shell コマンド、MCP ツール、リモート操作を保護します。

<!-- section: configuration -->
## 設定とコマンド

- 導入方式に応じて `ccl login` または provider 環境変数を使います。
- 基本セッションが動いたら `ccl mcp` で外部ツールサーバーを追加します。
- `ccl agents` で組み込みおよびカスタムエージェントが見えることを確認します。

## 最小の初回実行

バイナリ、資格情報、モデルルート、基本ツール方針が動くか確認したい場合は、この手順を使います。
1. プロジェクトディレクトリを開きます。
2. `ccl --help` を実行し、バイナリが解決できることを確認します。
3. セットアップ、アップデーター状態、workspace trust が不明な場合は `ccl doctor` を実行します。
4. デプロイで承認された方法で資格情報を設定します。`ccl login`、環境変数、または対話セッション内の `/gateway login URL API_KEY` を使います。
5. 書き込みなしの smoke test が必要な場合は `ccl -p "Summarize this repository in five bullets." --allowedTools ""` を実行します。
6. 非対話パスが動いたら、`ccl` で対話セッションを開始します。

## 成功を確認する方法

健全な初回実行には三つの信号があります。CLI が引数解析エラーなしに起動すること、モデル要求が設定済み provider またはゲートウェイへ届くこと、予期しない破壊的権限を求めずに応答が返ることです。モデル接続前に失敗する場合はインストールと環境変数を確認します。provider へ届いた後に認証で失敗する場合は認証とゲートウェイ/モデルルーティングを確認します。予期しないツールプロンプトが出る場合は権限とセキュリティを確認します。

route verification では debug file を有効にし、実行後に `[SmartRoute]` と `[Channel]` marker を確認します。classifier suggestion、最終 main-loop model、request が gateway と local Claude auth channel のどちらを使ったかが分かります。

## 初回実行のよくある問題

| 症状 | 考えられる原因 | 次の手順 |
| --- | --- | --- |
| `ccl` が見つからない | バイナリ未導入、または shell の PATH が古い | 利用しているパッケージ管理方法でインストールし、shell を再起動するか PATH を更新します。 |
| Gateway が未設定と表示される | `CCL_GATEWAY_URL` / `CCL_GATEWAY_KEY` がなく、利用可能な gateway ファイルもない | `/gateway login URL API_KEY` を使うか、二つの環境変数を両方設定します。 |
| Provider が間違った URL を受け取る | ルーティング重要変数を混同している | Margay ゲートウェイルーティングには `CCL_GATEWAY_*` を使い、互換 SDK 変数にゲートウェイ資格情報を入れないでください。 |
| dual-channel note が出る | OAuth と gateway が意図的に同時設定されている | Claude は OAuth、third-party model は gateway を使うべきことを確認してから `CCL_QUIET_DUAL_CHANNEL=1` を設定します。 |
| auth conflict が出る | provider SDK の API-key または base-URL 変数が OAuth と衝突している | CCL settings または shell から衝突する provider SDK 変数を消し、gateway credential は `CCL_GATEWAY_*` または `~/.ccl/gateway.json` に置きます。 |
| large memory-file warning が出る | project root の `CCL.md` などの memory file が startup threshold を超えている | ファイルを短くするか root から移動し、高信号な project instruction だけを残します。 |
| print モードで slash command が使えない | そのコマンドは対話専用 | トップレベル CLI コマンドを使うか、対話セッションを開始します。 |

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `commands/login/login.tsx`
- `commands/mcp/mcp.tsx`
- `tools/AgentTool/builtInAgents.ts`

<!-- section: related -->
## 関連ページ

- [インストールと更新](installation.md)
- [認証](authentication.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [エージェント](agents.md)
