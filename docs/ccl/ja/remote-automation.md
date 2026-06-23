# リモートセッションと自動化

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は detached またはリモート制御セッション向けに、server、open、SSH、assistant bridge、remote setup、remote environment、bridge kick、remote trigger の各面を提供します。

<!-- section: capabilities -->
## 機能範囲

- host、port、token、socket、workspace、idle timeout、max session オプションで session server を起動します。
- `open` URL または SSH デプロイフローで接続します。
- bridge と remote trigger ツールで制御された自動化を行います。

<!-- section: operational-model -->
## 運用モデル

- リモート自動化は影響範囲を広げます。明示的な認証、workspace スコープ、idle timeout、最小権限と組み合わせてください。

<!-- section: configuration -->
## 設定とコマンド

- 関連コマンドとツールは `server`、`open`、`ssh`、`assistant`、`remote-setup`、`remote-env`、`bridge-kick`、`RemoteTriggerTool` です。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `commands/assistant/assistant.ts`
- `commands/remote-setup`
- `commands/remote-env`
- `commands/bridge-kick.ts`
- `tools/RemoteTriggerTool`

<!-- section: related -->
## 関連ページ

- [CLI リファレンス](cli-reference.md)
- [権限とセキュリティ](permissions-security.md)
- [認証](authentication.md)
- [トラブルシューティング](troubleshooting.md)
