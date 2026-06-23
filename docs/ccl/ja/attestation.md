# アテステーション

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

アテステーションは、何をテストしたか、どの受入 case を覆ったか、プロセス証拠がどこにあるか、どのコマンドが報告結果を出したかを記録します。

<!-- section: capabilities -->
## 機能範囲

- 正確なコマンド文字列と合否数を使います。
- 記憶ではなくログファイルを参照します。
- 文書チェックは無関係な単体テストではなく文書受入 case に結びつけます。

<!-- section: operational-model -->
## 運用モデル

- 良いアテステーションは狭く、反証可能です。レビュー担当がコマンドを再実行するか引用ファイルを確認できる必要があります。

<!-- section: configuration -->
## 設定とコマンド

- RLL 提出では、現在の policy が要求する場合に Test-Process、Test-Cases、Test-Results 行を含めます。

<!-- section: source-evidence -->
## ソース上の根拠

- `AGENTS.md`
- `.dual-agent`

<!-- section: related -->
## 関連ページ

- [ゲートとアテステーション](gates-attestation.md)
- [Ralph-Lisa ループ](ralph-lisa-loop.md)
- [ゲートシステム](gate-system.md)
