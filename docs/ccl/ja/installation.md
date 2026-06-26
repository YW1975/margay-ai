# インストールと更新

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL は `@margay/ccl-core` パッケージの `ccl` バイナリとして配布され、ネイティブインストール、更新確認、内部ビルド向けロールバック、環境診断コマンドを含みます。

<!-- section: capabilities -->
## 機能範囲

- `ccl install [target]` で stable、latest、または明示したビルドを導入します。
- `ccl update` または `ccl upgrade` で更新を確認して適用します。
- `ccl doctor` でアップデーターと実行時の状態を確認します。

<!-- section: operational-model -->
## 運用モデル

- インストール系コマンドは運用コマンドであり、拡張ポイントではありません。ヘルプで内部用途と示されるコマンドは公開自動化 API として扱わないでください。

<!-- section: configuration -->
## 設定とコマンド

- 関連コマンドは `install`、`update`、`upgrade`、`doctor`、有効な場合の内部 rollback 補助です。


<!-- section: source-evidence -->
## ソース上の根拠

- `package.json`
- `main.tsx`
- `commands/upgrade/upgrade.tsx`
- `commands/doctor/doctor.tsx`

<!-- section: related -->
## 関連ページ

- [クイックスタート](quickstart.md)
- [設定](configuration.md)
- [トラブルシューティング](troubleshooting.md)
