# リモートセッションと自動化

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は detached またはリモート制御セッション向けに、session server、open URL、SSH、assistant bridge、remote setup、remote environment、remote-control bridge、remote trigger の各面を提供します。

<!-- section: capabilities -->
## 機能範囲

- host、port、bearer token、unix socket、workspace、idle timeout、max-session オプションで session server を起動します。
- 導入済みビルドで有効な場合、内部 `open` URL、SSH デプロイフロー、assistant bridge session で接続します。
- feature flag、認証、policy が許す場合、remote-control bridge と remote trigger tool で制御された自動化を行います。

<!-- section: operational-model -->
## 運用モデル

- リモート自動化は影響範囲を広げます。明示的な認証、workspace スコープ、idle timeout、最小権限と組み合わせてください。
- remote environment と background remote session はデプロイゲート付き機能です。適格性チェックには remote-session policy、ログイン状態、設定済み remote environment、git repository 状態、GitHub app または bundle-seeding の前提が含まれます。

<!-- section: configuration -->
## 設定とコマンド

- 関連コマンドとツールは `server`、`open`、`ssh`、`assistant`、`remote-control`、`session`、`remote-setup`、`remote-env`、`RemoteTriggerTool` です。
- `bridge-kick` は bridge failure state を手動注入する内部診断コマンドであり、安定した公開自動化 API として扱わないでください。

<!-- section: source-evidence -->
## ソース上の根拠

- `main.tsx`
- `commands/assistant/assistant.ts`
- `commands/session`
- `commands/bridge`
- `commands/remote-setup`
- `commands/remote-env`
- `commands/bridge-kick.ts`
- `utils/background/remote/remoteSession.ts`
- `tools/RemoteTriggerTool`

<!-- section: related -->
## 関連ページ

- [CLI リファレンス](cli-reference.md)
- [権限とセキュリティ](permissions-security.md)
- [認証](authentication.md)
- [トラブルシューティング](troubleshooting.md)
