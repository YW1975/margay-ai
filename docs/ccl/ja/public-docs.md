# 公開ドキュメント公開

> このページは公開ドキュメントのソースとして保守されています。CCL public docs を公開前に準備、検査、build、review する方法を定義します。

<!-- section: purpose -->
## Purpose

CCL documentation site は公式の公開 fact source です。したがって publishing は 3 つを証明する必要があります。Source Markdown が正確で全言語そろっていること、public repository に private/sensitive material がないこと、generated site が期待される navigation と content を保持していることです。

<!-- section: capabilities -->
## Capabilities

- `docs/ccl/<lang>/` 配下で English、Chinese、Japanese Markdown pages を保守します。
- 言語間の一致、inventory coverage、section-marker の一致、内部リンクの有効性、古い version、禁用ブランド表現、翻訳 sanity を検査します。
- ローカル私有パス、secret に見える token、source maps、環境ファイル、秘密鍵材料などの公開漏えいを防ぎます。
- Markdown source から runtime server 不要の static site を `site/` に build します。
- CCL repository の authoritative coverage matrix により CCL feature coverage を検証します。
- Lisa または human reviewers のために source evidence、command output、rendered-site checks、review handoff notes を記録します。

<!-- section: operational-model -->
## Operational model

Public docs は private repository の mirror ではありません。各ページは意図的に公開安全で、source-backed で、public users 向けに書かれている必要があります。Private implementation detail が claim を支える場合でも、repository-relative source paths だけを引用し、behavior は public terms で説明します。

Validation は 2 層あります。Public docs repository は Markdown parity、public-safety rules、static-site generation を検証します。CCL repository は official docs が feature inventory と agent-instruction scope をまだ cover していることを検証します。Authoritative update には両方の layer が必要です。

Producer evidence は最終 verdict ではありません。Reviewer は代表的な page lines を独立して確認し、mechanical checks を再実行し、generated HTML を検証し、claims が submitter summary ではなく source files に合っていることを確認します。

<!-- section: configuration -->
## Configuration and commands

Public-docs changes で必要な local checks:

| Check | Command | 証明すること |
| --- | --- | --- |
| Markdown と locale parity | `node scripts/check-docs.mjs` | 全言語が同じ files を持ち、inventory pages が存在し、section markers が揃い、links が解決し、public text が既知の forbidden patterns を避けること。 |
| Public content audit | `bash scripts/audit-public-content.sh` | Repository output に `.DS_Store`、source maps、env files、key files、明らかな token patterns、private local project paths がないこと。 |
| Static site build | `node scripts/build-site.mjs` | Markdown が public `site/` tree に render できること。 |
| Coverage structure | `node scripts/check-official-docs-coverage.mjs --check=structure` | Coverage matrix schema と structure が valid であること。 |
| Coverage inventory | `node scripts/check-official-docs-coverage.mjs --check=inventory` | Public docs inventory と CCL coverage matrix が aligned であること。 |
| Agent scope | `node scripts/check-official-docs-coverage.mjs --check=agent-scope` | Agent instruction scope が official docs decisions により covered であること。 |

GitHub Pages に publish する場合、local build に加えて hosted URL も verify します。Hosted verification では public URL、language navigation、representative rendered pages、private paths や generated artifacts がないことを確認します。

<!-- section: source-evidence -->
## Source evidence

- `scripts/check-docs.mjs` は言語ディレクトリ、inventory の整合、section-marker の一致、内部リンク、禁用ブランド、私有パス、secret に見える token、古い version 参照、翻訳 placeholder、本地化 prose sanity を検査します。
- `scripts/audit-public-content.sh` は publish repository の macOS metadata、source maps、env files、key material、obvious token formats、private local project paths を scan します。
- `scripts/build-site.mjs` は Markdown pages を static `site/` output に render し、Markdown links を HTML links に書き換え、per-language navigation を build します。
- `docs/ccl/docs-inventory.json` は public page inventory、navigation targets、feature-module mapping を定義します。
- CCL repository の `docs/official-docs-coverage-matrix.json` と `scripts/check-official-docs-coverage.mjs` は authoritative feature coverage matrix を定義し検証します。

<!-- section: related -->
## Related pages

- [GitHub と CI ワークフロー](github-ci.md)
- [権限とセキュリティ](permissions-security.md)
- [ゲートと Attestation](gates-attestation.md)
- [トラブルシューティング](troubleshooting.md)
- [CCL 概要](overview.md)
