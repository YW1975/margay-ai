# Common Workflows

> このページは CCL 公開ドキュメントのソースとして保守されています。生成ワークフローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

Common CCL workflows は、session control、tools、agents、workflows、evidence を組み合わせる repeatable ways です。runtime から独立した別機能ではなく、users と guide agents が job に合う CCL surface を選ぶための operating patterns です。

最良の workflow は、結果を証明するのに十分な evidence を残しつつ最小であるものです。source accuracy のない passing command、inspection のない generated file、external verification のない workflow status は authoritative work には不十分です。

<!-- section: capabilities -->
## 機能

code changes には interactive loop を使います。repo を inspect し、focused diffs を作り、project verifier を実行し、changed files と actual test output をまとめます。broad research や independent verification には subagents を使えますが、final edits と claims は main session が責任を持ちます。

documentation work ではより厳しい pattern を使います。current public pages を inventory し、source files と CLI output から feature coverage を導き、source-backed content を書き、parity/link/translation checks を実行し、site を build し、rendered HTML を scan し、public-content safety audits を実行します。

repeatable long jobs には workflows を使います。workflow は inputs、tools、expected artifacts、diagnostics、post-run assertion を宣言するべきです。cron/CI には headless `ccl workflow run`、interactive background execution には `/workflows run` を使います。

automation と CI では、explicit output format、bounded turns、narrow tool rules、caller-owned timeout を持つ print mode を優先します。stdout は後で人間が読む transcript ではなく API contract として扱います。

<!-- section: operational-model -->
## 動作モデル

まず task を分類します。

- Exploratory or ambiguous: interactive session。
- Deterministic one-shot: print mode。
- Repeatable multi-step job: workflow。
- Broad source or web research: subagent、その後 main-session synthesis。
- High-risk publication or code delivery: evidence 付き reviewed loop。

次に proof を定義します。code の proof は tests と relevant runtime checks です。docs の proof は source citations、coverage、build、rendered output、safety scans です。workflows の proof は run state と artifact または external assertions です。remote または third-party actions の proof は、可能な限り target system から取得します。

<!-- section: configuration -->
## 設定とコマンド

便利な patterns:

- Explore: `rg`、key files の読み取り、CLI help/version の確認、その後 edit。
- Verify docs: `node scripts/check-docs.mjs`、`bash scripts/audit-public-content.sh`、`node scripts/build-site.mjs`、さらに rendered HTML spot checks。
- Verify CCL public coverage: `node scripts/check-official-docs-coverage.mjs --check=structure|inventory|agent-scope`。
- Run bounded automation task: `ccl -p "<task>" --output-format json --max-turns 20 --allowed-tools Read Grep Bash`。
- Run workflow: `ccl workflow run <name> --json --params '{"key":"value"}' --expect-artifact out/report.md`。

independent scrutiny が必要な変更には Ralph-Lisa review を使います。reviewer は direction、source evidence、tests、success claims が proof より強すぎないかを確認します。

<!-- section: source-evidence -->
## ソース根拠

- `main.tsx` と `cli/print.ts`: interactive vs print-mode surfaces と automation controls を定義します。
- `commands/workflows/index.ts`、`cli/workflow-run.ts`、`tools/WorkflowRun/WorkflowRun.ts`: workflow command surfaces と runtime behavior を定義します。
- `tools/AgentTool/AgentTool.tsx` と `tools/AgentTool/builtInAgents.ts`: subagent delegation surfaces を提供します。
- CCL repository の `scripts/check-official-docs-coverage.mjs` と、public docs repository の `scripts/check-docs.mjs` / `scripts/audit-public-content.sh`: この official-docs update で使っている documentation verification commands です。
- `AGENTS.md`: この repository で reviewed delivery に使う RLL review protocol を定義します。

<!-- section: related -->
## 関連ページ

- [Workflows](workflows.md)
- [Interactive Sessions and Print Mode](interactive-sessions.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Public Documentation Publishing](public-docs.md)
