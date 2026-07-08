# トラブルシューティング

> このページは公開ドキュメントのソースとして保守されています。Troubleshooting records は共有前に sanitize してください。

<!-- section: purpose -->
## Purpose

CCL の troubleshooting は failing layer の特定から始まります。Installation、startup、settings、authentication、gateway routing、endpoint compatibility、context pressure、permissions、MCP、tools、agents、plugins、sessions、remote automation、GitHub integration、documentation publishing、RLL governance です。複数 layer を一度に変更すると原因が隠れます。

<!-- section: capabilities -->
## Capabilities

- `ccl doctor` で installation、updater、PATH、shell、package manager、sandbox、managed setting、alias、ripgrep diagnostics を確認できます。
- `/gateway status` と `/gateway doctor` で gateway credential、placeholder、reachability、auth-conflict、shell-env shadowing を確認できます。
- `/endpoint`、`/model`、`/priority`、`/effort`、`/cost`、`/usage`、`/context` で model routing と context-window issues を確認できます。
- `/permissions`、`/allowed-tools`、command-specific permission prompts で tool-denial issues を確認できます。
- `ccl mcp list`、`/mcp`、server config、auth status、debug logs で MCP failures を切り分けます。
- `ccl agents --setting-sources user,project,local`、`/agents`、`/skills`、`/plugins`、`/hooks` で extension visibility issues を確認できます。
- Remote-session failures は remote precondition types を使って分類します。
- Official-documentation failures は docs validation、public audit、site build、rendered HTML checks、coverage matrix checks で確認します。

<!-- section: operational-model -->
## Operational model

Configuration を変更する前に evidence を集めます。良い report には exact command、exit code、CCL version、install method、cwd trust state、relevant setting source、sanitized environment variable names、model/endpoint selection、last diagnostic output が含まれます。Tokens、private paths、full transcripts、repository secrets は含めません。

Layer routing は実用的です。

- Startup failure: install method、binary path、shell PATH、aliases、package manager、updater state を確認します。
- Auth failure: gateway config、direct API-key config、OAuth state、MCP server auth を分けて確認します。
- Wrong model: model selection precedence、endpoint pin、gateway config、classifier output、debug route markers を確認します。
- Tool denied: permission mode、allow/deny/ask rules、managed policy、tool-specific validation を確認します。
- Extension missing: setting sources、plugin-only policy、project trust、bare mode、feature gates を確認します。
- Remote failure: launch を繰り返す前に typed preconditions を確認します。
- Docs failure: source Markdown、inventory、audits、build output、generated site、hosted URL を別々に検証します。

Gateway troubleshooting では runtime bugs と gateway service behavior を分けます。Cache-hit accounting、provider-side pricing、gateway usage fields は active transport または gateway が返した場合だけ authoritative evidence です。

<!-- section: configuration -->
## Configuration and commands

- Environment health: `ccl doctor`。
- Gateway diagnosis: `/gateway doctor`。
- Auth status: `ccl auth status`、`/status`、`/login`、`/logout`。
- Model route: `/model`、`/endpoint`、`/priority`、`/effort`、`/gateway status`、debug file markers。
- Context pressure: `/context`、`/compact`、`/memory`、`/usage`。
- MCP: `ccl mcp list`、`/mcp`、`--mcp-config`、MCP auth commands。
- Agent visibility: `ccl agents --setting-sources user,project,local`。
- Plugin/skill/hook visibility: `/plugins`、`/skills`、`/hooks`、`--plugin-dir`、`--bare`、setting-source filters。
- GitHub/CI: `gh auth status -a`、`/install-github-app`、`/review`、`/pr-comments`、`/security-review`、CI logs。
- Official docs: `node scripts/check-docs.mjs`、`bash scripts/audit-public-content.sh`、`node scripts/build-site.mjs`、`node scripts/check-official-docs-coverage.mjs`。

## Symptom Routing

| Symptom | Start here | Evidence to collect |
| --- | --- | --- |
| CCL が起動しない | [インストール](installation.md) | `ccl --version`、invoked binary、shell PATH、install method、`ccl doctor`。 |
| Login または gateway が失敗する | [認証](authentication.md) | `/gateway doctor`、sanitized env names、`gateway.json` presence、可能なら `GET /auth/me` result。 |
| Model または endpoint が違う | [ゲートウェイとモデルルーティング](model-routing.md) | requested model、endpoint pin、gateway config source、debug route markers、usage fields。 |
| Tool が拒否される | [権限とセキュリティ](permissions-security.md) | permission mode、allow/deny/ask rules、managed policy、exact tool input。 |
| MCP tool がない | [MCP サーバーとツール](mcp.md) | `ccl mcp list`、server scope、auth status、policy allow/deny result。 |
| Agent または skill が見えない | [Agents](agents.md)、[Skills](skills.md) | setting sources、project trust、plugin-only policy、bare mode、definition path。 |
| Remote session が block される | [リモートセッションと自動化](remote-automation.md) | typed precondition、login state、remote env state、git remote、repository access。 |
| GitHub setup が失敗する | [GitHub と CI ワークフロー](github-ci.md) | `gh --version`、`gh auth status -a`、repo permissions、workflow/secret existence。 |
| Docs page が壊れている | [公開ドキュメント公開](public-docs.md) | local docs check、audit output、build log、rendered HTML path、hosted URL。 |

## 既知の制限

以下は現在のビルドの正直な制限で、設定ミスではありません：

- Background session サブコマンドはまだ利用できません。`ccl ps`、`ccl logs`、`ccl attach`、`ccl kill` と `--bg`/`--background` フラグは、明確な「not available in this build yet」メッセージで終了します。background session registry 自体は動作しており、ps/logs/attach/kill の CLI surface だけがまだ stub です。
- メッセージ操作メニュー（メッセージ上で Shift+Up）はフルスクリーンモードが必要です。フルスクリーン外ではメニューのキーバインドが接続されておらず、メニューは開きません。これは想定どおりの動作で、terminal の故障ではありません。
- Debug agent の probe は terminal（フル対応）と web（最小対応、ローカルのブラウザ自動化依存が必要）をサポートします。desktop probe は未対応で、明確なエラーを返します。

## Escalation Checklist

Escalation の前に小さな reproduction を用意します。Exact command、CCL version、sanitized environment variable names、relevant settings source、expected behavior、actual behavior、exit code、last diagnostic output です。File paths は repository-relative かつ共有可能な場合だけ含めます。

<!-- section: source-evidence -->
## Source evidence

- `commands/doctor/doctor.tsx` と `utils/doctorDiagnostic.ts` は doctor diagnostics と installation health checks を実装します。
- `commands/gateway/gateway.tsx`、`commands/gateway/gateway-helpers.ts`、`services/gateway/gatewayDoctor.ts` は gateway status、doctor findings、placeholder detection、env shadowing、reachability probing を実装します。
- `utils/model/endpointCompat.ts`、`utils/model/model.ts`、`commands/model/model.tsx`、`commands/endpoint/endpoint.tsx` は route と endpoint diagnosis surfaces を実装します。
- `services/mcp/config.ts`、`commands/mcp/mcp.tsx`、`services/mcp/auth.ts` は MCP diagnosis surfaces を提供します。
- `utils/background/remote/remoteSession.ts` と `utils/background/remote/preconditions.ts` は remote-session failure categories を定義します。
- `commands/install-github-app/install-github-app.tsx`、`commands/review.ts`、`commands/pr_comments/index.ts` は GitHub diagnosis と review surfaces を提供します。
- `scripts/check-official-docs-coverage.mjs` と `margay-ai/scripts` の public docs scripts は official-documentation validation を提供します。

<!-- section: related -->
## Related pages

- [CCL の仕組み](how-ccl-works.md)
- [インストールと更新](installation.md)
- [認証](authentication.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [MCP サーバーとツール](mcp.md)
- [リモートセッションと自動化](remote-automation.md)
- [GitHub と CI ワークフロー](github-ci.md)
