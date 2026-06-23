# RLL 入門

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

RLL は具体的な task step、Ralph ターン、ファイルベース提出、Lisa レビュー、consensus または fix ラウンドを経て slice を閉じます。

<!-- section: capabilities -->
## 機能範囲

- 作業前に `ralph-lisa whose-turn` を実行します。
- Lisa feedback が準備できたら `review.md` を読みます。
- 正しい tag とテスト証拠を付けて `.dual-agent/submit.md` から提出します。

<!-- section: operational-model -->
## 運用モデル

- RLL はターン所有とレビュー品質を守りますが、コード確認、コマンド実行、commit 範囲管理の代替ではありません。

<!-- section: configuration -->
## 設定とコマンド

- 現在の step policy と Lisa feedback に応じて `[PLAN]`、`[CODE]`、`[FIX]`、`[CHALLENGE]`、`[CONSENSUS]` を使います。

<!-- section: source-evidence -->
## ソース上の根拠

- `AGENTS.md`
- `.codex/skills/ralph-lisa-loop/SKILL.md`

<!-- section: related -->
## 関連ページ

- [Ralph-Lisa ループ](ralph-lisa-loop.md)
- [ゲートとアテステーション](gates-attestation.md)
- [確認と計画](clarify-and-planning.md)
