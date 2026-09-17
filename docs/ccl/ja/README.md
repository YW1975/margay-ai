# CCL ドキュメント

> この index は公開ドキュメントのソースとして保守されています。各 language で `index.html` として render されます。

<!-- section: purpose -->
## Purpose

この index は正しい CCL documentation path を選ぶために使います。CCL は command-line agent runtime で、interactive sessions、print-mode automation、tools、settings、gateway routing、MCP、plugins、skills、agents、workflows、remote automation、Ralph-Lisa governance を扱います。

<!-- section: duo-ide-guides -->
## 2 つのエージェントの協働とエディター接続

- [Duo：対等なエージェントの協働](duo.md)
- [VS Code で CCL を使う](ide.md)

<!-- section: capabilities -->
## Capabilities

- Workflow を選ぶときは [CCL 概要](overview.md) から始めます。
- 安全な first run には [クイックスタート](quickstart.md) を使います。
- `ccl` binary、shell path、updater が問題なら [インストールと更新](installation.md) を使います。
- Failure layer が不明なら [トラブルシューティング](troubleshooting.md) を使います。
- この official site を更新するときは [公開ドキュメント公開](public-docs.md) を使います。

<!-- section: operational-model -->
## Operational model

Generated static site はこの README を language home page として使います。Navigation は `docs/ccl/docs-inventory.json` から作られます。Builder は `README.md` を `index.html` として書き、visible inventory pages を順番にリンクします。このページは routing に集中し、詳細な feature prose は各ページに置きます。

この site は official public fact source です。そのため copied snippets、古い private notes、generated summaries、archived incident reports を単独で authoritative と扱ってはいけません。Page が authoritative と言えるのは、current source evidence に一致し、public docs checks を通過し、正しく render され、private paths、secrets、unsupported deployment claims を含まない場合だけです。

正確に作業するには、alphabetical に読むのではなく job path をたどります。

| Job | Start | Continue |
| --- | --- | --- |
| First run | [クイックスタート](quickstart.md) | [認証](authentication.md), [ゲートウェイとモデルルーティング](model-routing.md) |
| Runtime 設定 | [設定と構成](configuration.md) | [環境変数](env-vars.md), [権限とセキュリティ](permissions-security.md) |
| CCL の日常利用 | [インタラクティブセッション](interactive-sessions.md) | [コマンド](commands.md), [組み込みツール](tools.md) |
| CCL 拡張 | [Agents](agents.md) | [サブエージェント](sub-agents.md), [プラグイン](plugins.md), [Skills](skills.md), [Hooks](hooks.md), [MCP](mcp.md) |
| 反復作業の自動化 | [ワークフロー自動化](workflows.md) | [一般的なワークフロー](common-workflows.md), [GitHub と CI ワークフロー](github-ci.md) |
| Delivery governance | [Ralph-Lisa Loop](ralph-lisa-loop.md) | [ゲートと Attestation](gates-attestation.md), [Clarify と Planning](clarify-and-planning.md) |

<!-- section: configuration -->
## Configuration and commands

この documentation set を local verify するには、public docs repository で `node scripts/check-docs.mjs`、`bash scripts/audit-public-content.sh`、`node scripts/build-site.mjs` を実行します。CCL feature coverage を確認するには、CCL repository で coverage matrix checks を実行します。

Navigation または page inventory を変更した後は、Markdown だけでなく generated `site/<lang>/index.html` も verify します。Static builder は Markdown links を HTML links に rewrite するため、rendered navigation が users の見る final artifact です。English anchor: Public Documentation Publishing。

<!-- section: source-evidence -->
## Source evidence

- `docs/ccl/docs-inventory.json` は language list、glossary entries、public pages、navigation groups、related-page metadata を定義します。
- `scripts/build-site.mjs` は各 language README を `index.html` に render し、visible inventory pages から navigation を作ります。
- `scripts/check-docs.mjs` は language parity、inventory coverage、section marker parity、link integrity、public-safety checks、translation sanity を強制します。
- `scripts/audit-public-content.sh` は public repository の generated artifacts、env files、key material、token-like strings、private local paths を scan します。

<!-- section: related -->
## Related pages

- [CCL 概要](overview.md)
- [クイックスタート](quickstart.md)
- [CLI リファレンス](cli-reference.md)
- [トラブルシューティング](troubleshooting.md)
- [公開ドキュメント公開](public-docs.md)
