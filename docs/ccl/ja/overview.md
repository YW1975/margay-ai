# CCL 概要

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は MargayAI のコマンドライン型エージェント実行基盤で、対話型開発、非対話自動化、複数エージェント委任、MCP 連携、プラグイン、skill、ワークフロー、統制された開発ループを扱います。

<!-- section: capabilities -->
## 機能範囲

- 対話型ターミナルセッションと print モード自動化。
- ファイル、shell、検索、Web、LSP、タスク、ゴール、チーム、MCP、ワークフロー、レビュー成果物の組み込みツール。
- コマンド、hook、skill、プラグイン、MCP サーバー、カスタムエージェントによる拡張層。

<!-- section: operational-model -->
## 運用モデル

- このページは最上位の地図です。まずクイックスタートを読み、必要な作業に応じて設定、コマンド、ツール、拡張ガイドへ進んでください。

<!-- section: configuration -->
## 設定とコマンド

- CLI エントリポイントは `ccl [prompt]`、`ccl -p`、および [CLI リファレンス](cli-reference.md) のトップレベルサブコマンドです。

## 目的別に文書を使う

CCL ドキュメントは、利用者が達成したい作業を中心に整理されています。新規ユーザーはまずクイックスタートを読み、バイナリがまだ使えない場合はインストールへ進みます。運用・連携担当者は、設定、環境変数、認証、ゲートウェイとモデルルーティングから始めます。CCL を拡張する開発者は、エージェント、サブエージェント、MCP、プラグイン、Skill、Hook、ワークフロー自動化から始めます。Ralph-Lisa Loop を使うチームは統制ページから始めます。

| 必要なこと | 最初に読む | 次に読む |
| --- | --- | --- |
| プロジェクトで CCL を一度動かす | [クイックスタート](quickstart.md) | [対話セッション](interactive-sessions.md)、[コマンド](commands.md) |
| セットアップや資格情報を調べる | [認証](authentication.md) | [環境変数](env-vars.md)、[トラブルシューティング](troubleshooting.md) |
| モデル/provider 動作を理解する | [ゲートウェイとモデルルーティング](model-routing.md) | [設定](configuration.md)、[コマンドのコストと文脈診断](commands.md#diagnostics-and-cost) |
| 作業をエージェントに委任する | [エージェント](agents.md) | [サブエージェント](sub-agents.md)、[組み込みツール](tools.md) |
| 文書を公開または保守する | [公開ドキュメント公開](public-docs.md) | [ゲートとアテステーション](gates-attestation.md) |

## CCL とは何か、何ではないか

CCL はコマンドラインの agent runtime です。モデル、ローカルプロジェクト文脈、ツール、権限、設定、拡張、任意の統制ループを調整します。独立したドキュメントサイトでも、汎用チャットラッパーでも、ゲートウェイの代替でもありません。ゲートウェイや provider の動作は、CCL ソースまたは検証済み実行証拠が CCL から観測できることを示す場合だけ公開文書に書くべきです。

公開文書の主張は保守的にしてください。動作がゲートウェイ応答フィールド、feature flag、管理設定、デプロイ固有コマンドに依存する場合、その条件を明示し、普遍的な事実のように書かないでください。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `tools`
- `commands`
- `services`

<!-- section: related -->
## 関連ページ

- [クイックスタート](quickstart.md)
- [インストールと更新](installation.md)
- [CLI リファレンス](cli-reference.md)
- [組み込みツール](tools.md)
- [エージェント](agents.md)
