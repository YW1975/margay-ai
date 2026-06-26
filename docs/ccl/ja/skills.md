# Skill

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

skill は再利用可能な指示バンドルで、CCL は task が description に合う場合や skill ツールから呼び出された場合に適用できます。

<!-- section: capabilities -->
## 機能範囲

- ローカルおよびリモート skill を検出します。
- 現在の task に必要な skill 指示だけを読み込みます。
- リポジトリ方針が許す場合、skill をエージェント、ワークフロー、プラグインと組み合わせます。
- 有効な場合、SKILL.md ディレクトリ、組み込み skill、MCP 提供 skill を同じコマンド抽象で扱います。

<!-- section: operational-model -->
## 運用モデル

- skill の description は起動契約です。トリガー文は正確にし、長い手順は本文または参照ファイルに置きます。
- skill frontmatter では allowed tools、arguments、when-to-use 文、model、ユーザー可視性、hook、fork 実行コンテキスト、対象 agent、effort、shell、path filter を定義できます。

<!-- section: configuration -->
## 設定とコマンド

- 関連モジュールは `tools/SkillTool`、`tools/DiscoverSkillsTool`、`skills/loadSkillsDir.ts`、`skills/bundledSkills.ts`、`services/skillSearch`、`commands/skills` です。


<!-- section: source-evidence -->
## ソース上の根拠

- `tools/SkillTool`
- `tools/DiscoverSkillsTool`
- `skills/loadSkillsDir.ts`
- `skills/bundledSkills.ts`
- `skills/mcpSkills.ts`
- `services/skillSearch`
- `commands/skills`

<!-- section: related -->
## 関連ページ

- [エージェント](agents.md)
- [プラグイン](plugins.md)
- [ワークフロー](workflows.md)
- [対話型コマンド](commands.md)
