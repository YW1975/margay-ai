# 対話セッションと Print モード

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は既定で対話型ターミナルセッションを開始し、print モードではテキスト、JSON、ストリーム形式の一回限りの自動化を実行できます。

<!-- section: capabilities -->
## 機能範囲

- REPL で反復作業、ツール承認、slash command、計画モードを行います。
- `-p` または `--print` をスクリプト、CI タスク、再現可能なコマンドパイプラインに使います。
- session 系コマンドで再開、名前変更、巻き戻し、圧縮、クリア、エクスポートを行います。

<!-- section: operational-model -->
## 運用モデル

- 対話モードは会話状態を保持します。print モードは明示的な入力と検査可能な出力を持つコマンドライン API として扱います。

<!-- section: configuration -->
## 設定とコマンド

- 主なコマンドは `resume`、`session`、`rename`、`rewind`、`compact`、`clear`、`export`、`copy`、`cost`、`context` です。


<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `commands/resume`
- `commands/session`
- `commands/compact`
- `commands/export`
- `commands/rewind`
- `commands/cost`
- `commands/context`

<!-- section: related -->
## 関連ページ

- [CLI リファレンス](cli-reference.md)
- [対話型コマンド](commands.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [メモリ、文脈、セッション](memory-sessions.md)
- [ワークフロー](workflows.md)
