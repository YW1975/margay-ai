# クイックスタート

> このページは公開ドキュメントのソースとして保守されています。Shell から動作する CCL session までの最短で安全な経路を説明します。

<!-- section: purpose -->
## Purpose

Quickstart では順番に 5 つを確認します。`ccl` binary が解決できること、installation が実行可能な健康状態であること、credentials または gateway routing が設定済みであること、print mode が非変更リクエストを完了できること、interactive session が目的の project directory で起動できることです。

<!-- section: capabilities -->
## Capabilities

- `ccl --version` で installed build を確認し、`ccl --help` で利用可能な command surface を確認します。
- `PATH`、updater health、workspace trust、shell integration が不明な場合、設定変更の前に `ccl doctor` を実行します。
- Deployment で承認された方法により credentials を設定します。Account login、gateway environment variables、または interactive `/gateway login URL TOKEN` です。
- 広い tool access を有効にする前に、`ccl -p "..." --allowedTools ""` で非変更 smoke test を実行します。
- Route と response behavior を確認してから、print mode から `ccl` interactive mode へ移ります。
- 初回実行の evidence が必要な場合は `--debug-file <path>` を使い、authentication、model route、tool prompts を記録します。

<!-- section: operational-model -->
## Operational model

Quickstart は広い権限から始めるべきではありません。初回実行に必要なのは binary、信頼した作業ディレクトリ、credentials、設定済み model path への route、file edit や shell command を必要としない prompt だけです。Startup、auth、routing が正しい証拠を得てから tool access を広げます。

Print mode と interactive mode は多くの runtime を共有しますが、表面は完全には同じではありません。Print mode は deterministic な one-shot automation 用で、`text`、`json`、`stream-json` output をサポートします。Interactive mode は slash commands、tool approval、session navigation、context inspection のための通常の human-in-the-loop surface です。

最初の model request が失敗したら、設定を変える前に層を分類します。Binary resolution、doctor health、authentication、gateway configuration、endpoint/model compatibility、permission policy、project context のどれかです。Troubleshooting ページには layer-routed checklist があります。

<!-- section: configuration -->
## Configuration and commands

最小の初回実行:

1. CCL に確認させたい project directory を開きます。
2. `ccl --version` を実行し、期待する CCL version が表示されることを確認します。
3. `ccl --help` を実行し、現在の build に `-p, --print`、`--output-format`、`--model`、`--settings`、`--mcp-config`、permission flags があることを確認します。
4. Installation、updater、`PATH`、package manager、shell、sandbox、workspace trust が不明な場合は `ccl doctor` を実行します。
5. 承認済みの方法で credentials を設定します。Gateway users は `CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY`、または `/gateway login URL TOKEN` による local gateway file を使います。
6. 非変更 smoke test として `ccl -p "Summarize this repository in five bullets." --allowedTools ""` を実行します。
7. Route evidence が必要なら `--debug-file <path>` を付けて再実行し、route markers、model selection、gateway status を確認します。
8. Non-interactive smoke test が成功したら、`ccl` で interactive session を開始します。

よくある初回症状:

| 症状 | 可能な層 | 次の手順 |
| --- | --- | --- |
| `ccl` not found | Binary または shell `PATH` | [インストールと更新](installation.md)を読み、再インストールまたは shell reload 後に `ccl --version` を再実行します。 |
| `ccl --help` は動くが model call が失敗する | 認証または gateway route | [認証](authentication.md)と[ゲートウェイとモデルルーティング](model-routing.md)を読みます。 |
| Gateway says not configured | Gateway env/file がない | `CCL_GATEWAY_URL` と `CCL_GATEWAY_KEY` を両方設定するか、`/gateway login URL TOKEN` を使います。 |
| Model または endpoint が違う | Route precedence | `/model`、`/endpoint`、`/gateway status`、debug route markers、settings sources を確認します。 |
| Smoke test で tool prompt が出る | Prompt または tool policy | 非変更 smoke test では `--allowedTools ""` を維持し、その後意図的に permissions を広げます。 |
| Print mode で slash command が使えない | Surface mismatch | Interactive `ccl` を使うか、対応する top-level CLI command を使います。 |

<!-- section: source-evidence -->
## Source evidence

- `main.tsx` は `ccl [prompt]`、`-p/--print`、`--output-format`、debug flags、`--allowedTools`、`--tools`、`--disallowedTools`、`--permission-mode`、`--model`、`--settings`、`--mcp-config`、`--plugin-dir` を定義します。
- `main.tsx` は通常の print mode で subcommand registration を省くため、slash-command と subcommand behavior は one-shot prompt execution と分けて説明する必要があります。
- `commands/doctor/doctor.tsx` は `ccl doctor` を Doctor screen に接続し、installation と runtime diagnostics を提供します。
- `bootstrap/gatewayConfig.ts` と `services/gateway/gatewayDoctor.ts` は first-run troubleshooting が参照する gateway configuration と diagnosis behavior を提供します。
- `commands/model/model.tsx`、`commands/endpoint/endpoint.tsx`、`utils/model/model.ts` は model と endpoint の inspection/selection behavior を提供します。

<!-- section: related -->
## Related pages

- [インストールと更新](installation.md)
- [認証](authentication.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [インタラクティブセッションと Print Mode](interactive-sessions.md)
- [トラブルシューティング](troubleshooting.md)
