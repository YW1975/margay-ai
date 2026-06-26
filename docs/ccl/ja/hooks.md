# Hook

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

hook により、CCL はツール実行やセッションイベントの周辺で方針や自動化を実行し、権限判断、入力更新、停止動作、追加文脈を扱えます。

<!-- section: capabilities -->
## 機能範囲

- コマンド面から hook を確認、管理します。
- hook 結果により、tool execution へ文脈追加、tool input 更新、継続ブロック、権限動作の返却を行えます。
- 適切な場合は hook 動作をプラグイン、skill、エージェントで配布します。

<!-- section: operational-model -->
## 運用モデル

- hook は会話上の提案ではなく決定的な方針面です。小さく、監査可能で、保護するイベントに限定してください。
- PreToolUse hook は allow、ask、deny、input 更新を返せますが、hook allow でも settings の deny/ask ルールとユーザー操作が必要なツール要件は尊重されます。

<!-- section: configuration -->
## 設定とコマンド

- 関連モジュールは `commands/hooks`、`schemas/hooks.ts`、`services/tools/toolHooks.ts`、`services/tools/toolExecution.ts`、`skills/loadSkillsDir.ts`、プラグイン hook 読み込みです。


<!-- section: source-evidence -->
## ソース上の根拠

- `commands/hooks`
- `schemas/hooks.ts`
- `types/hooks.ts`
- `services/tools/toolHooks.ts`
- `services/tools/toolExecution.ts`
- `commands/plugin/PluginErrors.tsx`
- `skills/loadSkillsDir.ts`

<!-- section: related -->
## 関連ページ

- [権限とセキュリティ](permissions-security.md)
- [プラグイン](plugins.md)
- [組み込みツール](tools.md)
- [対話型コマンド](commands.md)
