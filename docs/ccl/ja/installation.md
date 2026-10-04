# インストールと更新

> このページは公開ドキュメントのソースとして保守されています。CCL binary installation、update checks、installation diagnostics を説明します。

<!-- section: purpose -->
## Purpose

npm パッケージ `@margay/ccl-core` は `margay` コマンドを提供します。既存の配布形態によっては独立した `ccl` ランチャーもあります。他のページでその名前を使う例は、npm 導入時には `margay` に置き換えてください。

<!-- section: capabilities -->
## Capabilities

- `margay install [target]` で stable、latest、または明示 version の build を install します。
- Local installation を意図的に置き換える場合だけ force reinstall を使います。
- Installed build が提供する update または upgrade command surfaces で更新を確認し適用します。
- `margay doctor` で runtime health、package-manager state、shell integration、updater status、sandbox signals、workspace trust を確認します。
- `margay --version` と `margay --help` で現在の executable を検証します。
- Release tarball が配布 artifact の場合、target host の package manager で install します。

<!-- section: operational-model -->
## Operational model

Installation commands は local runtime を変更しますが、project を変更しません。Extension point や authentication setup の代替として使うべきではありません。新しい binary を install しても、`~/.ccl/settings.json`、`~/.ccl/gateway.json`、OAuth state、project `CCL.md`、`.ccl/settings.json`、memory files、既存 session transcripts は書き換えられません。

Install command は target channel または明示 version を解決し、native installer を実行し、launcher と shell integration を確認し、必要に応じて古い package-manager installs を削除し、古い shell aliases を掃除します。`latest` または `stable` を明示選択した場合だけ `autoUpdatesChannel` を保存します。

Command が起動しない、誤った executable に解決される、shell ごとに挙動が違う場合は、まず `margay doctor` を使います。Healthy install report は package-manager cache から推測するより強い evidence です。

<!-- section: configuration -->
## Configuration and commands

| タスク | コマンド | 注意 |
| --- | --- | --- |
| 現在の binary を確認 | `margay --version` | Top-level CLI は実行中の CCL build version を出力します。 |
| Command surface を確認 | `margay --help` | Installed build の help を available flags の最終情報源にします。 |
| Target build を install | `margay install [latest|stable|version]` | Target は installer が対応する channel または明示 version です。 |
| 意図的に reinstall | `margay install --force [target]` | 既知の install を置き換える場合だけ使います。 |
| Local binary を update | `margay update` または `margay upgrade` | Availability と behavior は build/channel により異なります。 |
| Environment を diagnose | `margay doctor` | `PATH`、shell aliases、package-manager state を変える前に output を集めます。 |
| Tarball を install | `npm install -g ./margay-ccl-core-<version>.tgz` | Host と artifact に合う package manager を使います。 |

2026-10-04 時点で、ソース候補版 `1.4.5-rc.1` の検証と両コマンドのローカル導入が完了しています。今回 rc.1 を npm に公開してはいません。通常の npm インストールはレジストリの既定タグを使うため、この候補版を取得するとは限りません。PATH に存在する各コマンドを確認してください。独立したランチャーの実行版はパッケージ管理情報と異なる場合があります。

<!-- section: recovery-rc1 -->
## rc.1 の回復と出力上限

置き換え前に元のランチャーとプログラムを保存し、復元手順を記録してください。ロールバックには導入時に付属した手順を使います。ローカル検証の記録は、npm パッケージが共通のロールバックコマンドを提供することを意味しません。

```bash
margay --version
```

[エラー回復とユーザーの同意](error-recovery.md)

<!-- section: source-evidence -->
## Source evidence

- `package.json` は package name `@margay/ccl-core`、current package version、public package metadata を定義します。
- `main.tsx` は `-v, --version`、top-level help、print mode、ordinary print mode 以外で使われる subcommand registration path を登録します。
- `commands/install.tsx` は requested target を解決し、native installer を呼び、shell setup を確認し、古い package-manager installs と aliases を掃除し、warnings を記録し、必要に応じて selected update channel を保存します。
- `utils/nativeInstaller/installer.ts` と `utils/nativeInstaller/index.ts` は native installation と installation-health helpers を提供します。
- `commands/doctor/doctor.tsx` と `utils/doctorDiagnostic.ts` は installation と runtime health diagnostics を提供します。

<!-- section: related -->
## Related pages

- [クイックスタート](quickstart.md)
- [設定と構成](configuration.md)
- [環境変数](env-vars.md)
- [トラブルシューティング](troubleshooting.md)
- [CLI リファレンス](cli-reference.md)
