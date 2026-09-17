# VS Code で CCL と Duo を使う

<!-- section: availability -->
<a id="guide-availability"></a>
## 現在の使い方と検証範囲

更新日：2026-09-17。まず IDE の統合ターミナルで、同じ CCL の端末インターフェースを使います。`/ide` はエディター機能を接続しますが、端末のチャットをネイティブのグラフィカルなチャットパネルへ変換するものではありません。

| 経路 | 検証状況 |
| --- | --- |
| インストール済み開発ビルドの端末 Duo | 実際の画面付き端末で 3 シナリオ、計 46 ステップ成功 |
| CCL から VS Code への接続 | 一時的な環境変数を使い、ハンドシェイク、サービスの機能情報、実接続を確認 |
| 既定の IDE 接続 | `bufferUtil.mask is not a function` を再現済み、未修正 |
| VS Code 統合ターミナルでの Duo 全体の流れ | 手順は下記。実測の接続元は外部 WezTerm で、統合ターミナルでの全工程は未検証 |
| Trae、CCL/Duo のネイティブチャットパネル、セッション移行 | 未検証。VS Code の接続結果から互換性を推定しない |

Duo 開発ビルドの表示は `1.4.0-beta.0` ですが、npm の同じバージョンに新機能があるとは限りません。お使いのビルドが `/duo-agent` に対応することを確認してください。

<!-- section: setup -->
<a id="guide-setup"></a>
## VS Code の準備

VS Code、`code` シェルコマンド、公式の `anthropic.claude-code` 拡張機能が提供する互換 IDE サービスが必要です。今回確認した拡張機能のバージョンは 2.1.274 です。

CCL は既定で `~/.ccl/ide` からサービスを見つけます。IDE 起動時に、拡張機能にも同じ設定ディレクトリを渡します。以下はユーザーデータと拡張機能を別ディレクトリに保存する例です。まずプロジェクトのディレクトリに移動します。

```sh
CLAUDE_CONFIG_DIR="$HOME/.ccl" CCL_CONFIG_DIR="$HOME/.ccl" \
  code --user-data-dir "$HOME/.local/share/ccl/ide-profile/user-data" \
  --extensions-dir "$HOME/.local/share/ccl/ide-profile/extensions" \
  --install-extension anthropic.claude-code

CLAUDE_CONFIG_DIR="$HOME/.ccl" CCL_CONFIG_DIR="$HOME/.ccl" \
  code --new-window \
  --user-data-dir "$HOME/.local/share/ccl/ide-profile/user-data" \
  --extensions-dir "$HOME/.local/share/ccl/ide-profile/extensions" "$PWD"
```

このインストールでは現在提供中の拡張機能を取得するため、検証したバージョンと一致するとは限りません。`CCL_CONFIG_DIR` を変更している場合、両方の変数を実際のディレクトリに合わせます。ロックファイル、トークン、生のセッションをコピーして接続を組み立てないでください。

`code` が見つからない場合、VS Code のコマンドパレットでシェルコマンドをインストールします。起動済みの IDE は以前の環境を保持することがあります。ファイルを保存し、この独立したプロファイルのウィンドウを閉じてから、上記コマンドで起動してください。

<!-- section: terminal -->
<a id="guide-terminal"></a>
## 統合ターミナルから起動

1. VS Code と CCL で同じプロジェクトを開きます。別の CCL がこの VS Code に接続中なら、その `/ide` メニューで `None` を選ぶか終了します。現在の画面は同時に 1 つの CCL 接続を案内しています。
2. 「ターミナル → 新しいターミナル」を選びます。シェルが意図した CCL 開発ビルドを指すことを確認して実行します。

```sh
command -v ccl
WS_NO_BUFFER_UTIL=1 ccl --ide
```

3. 自動選択されない場合、CCL で `/ide` を実行し Visual Studio Code を選びます。
4. 同じ端末画面で双方のモデルを設定し、タスクを入力します。

```text
/model
/duo-agent
/duo --reviewer-model <固定モデルID>
```

プレースホルダーを利用可能なモデル ID に置き換えます。Duo は目標なしでも待機できます。停止とレビューの再確認の規則は [Duo ガイド](duo.md) を参照してください。

<!-- section: troubleshooting -->
<a id="guide-troubleshooting"></a>
## 接続の問題への対処

`WS_NO_BUFFER_UTIL=1` は、このプロセスで WebSocket の JavaScript 実装を使い、再現したオプションのネイティブモジュールのエラーを回避します。既定の動作を修正するものではなく、環境やインストール済みパッケージを恒久的に変更しません。Gateway の変更は不要です。

IDE が見つからない場合、プロジェクト、設定ディレクトリ、拡張機能の起動を確認します。ハンドシェイクの成功は接続だけを示します。今回の確認では各 IDE ツールの個別実行、実モデルへのタスク送信、統合ターミナルでの Duo 全工程の検証は行っていません。

<!-- section: native-panels -->
<a id="guide-native-panels"></a>
## チャットパネルへ切り替えられるか

Claude Code と Codex の公式拡張機能には、それぞれネイティブのチャット画面があります。Claude Code の拡張機能は公式 CLI と履歴を共有できます。Codex の拡張機能はサイドバー、ファイルのコンテキスト、変更のレビューに対応します。[Claude Code の公式説明](https://code.claude.com/docs/en/vs-code) と [Codex の公式説明](https://developers.openai.com/codex/ide/) を参照してください。

これらはそれぞれの公式製品の機能です。既存パネルから CCL を使うこと、複数モデルや Duo の意見・停止・異議・再開への対応、現在のチャットの移行には、別の検証が必要です。専用の Duo パネルやセッション移行機能は、現在提供していません。

<!-- section: related -->
<a id="guide-related"></a>
## 関連ページ

- [Duo：対等なエージェントの協働](duo.md)
- [対話セッション](interactive-sessions.md)
- [インストールと更新](installation.md)
- [トラブルシューティング](troubleshooting.md)
