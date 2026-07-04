# Workflows

> このページは CCL 公開ドキュメントのソースとして保守されています。生成ワークフローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

Workflows は、structure、tool execution、progress tracking、verification が必要な multi-step jobs のための CCL の repeatable automation surface です。繰り返し実行される可能性がある、長時間かかる、background progress が必要、または確認すべき named artifacts がある場合に workflow を使います。

通常の one-off interactive work に workflow を使わないでください。user が workflow を求めておらず、normal tool calls で処理できる task なら regular tool loop を使います。

<!-- section: capabilities -->
## 機能

CCL は interactive と headless の両方で workflows を公開します。`/workflows` は saved scripts と recent runs を一覧します。`/workflows run <name> [--allow Bash,Write]` は TUI から workflow を開始し、tail 用の run ID を返します。`/workflows --tail <runId>`、`--json`、`--inspect` は run state と timelines を表示します。`/workflows specs`、`rename`、`copy`、`delete`、`show` は saved specs を管理します。`/workflows new <goal>` は interactive creation payload を作成し、関連する skill availability を probe します。

headless surface は `ccl workflow run <name-or-path>` です。`--json`、`--dry-run`、`--params <json>`、`--allowed-tools`、`--permission-mode`、`--expect-artifact`、`--allow-empty-result`、`--allow-failed-agents`、`--diagnose`、`--goal`、`--run-id` をサポートします。

canonical runtime tool は `WorkflowRun` です。Workflow source files は `export default async function workflow(ctx, params)` を export しなければなりません。supported sandbox tool calls は `Bash`、`Write`、`Read`、`Edit` です。より広い agent work は workflow agent adapter を通ります。

<!-- section: operational-model -->
## 動作モデル

Workflow execution は三つの layer で構成されます。command layer は workflow file または spec を resolve し、arguments を validate し、TUI または headless execution を選びます。runtime layer は workflow contract を validate し、engine を実行し、allowed tools を dispatch し、phases を track し、run state を persist します。quality layer は empty results、failed-empty agents、expected artifacts、diagnostics、final status を確認します。

`succeeded` は「user の external goal が真になった」と同じではありません。workflow は local artifacts、declared outputs、self-reported run state を検証できますが、published URL、deployed service、uploaded file、third-party state change などの external side effects には caller の objective assertion が必要です。

長い TUI runs では background execution を優先し、terminal を使える状態に保ちます。run ID で tail し、single final text message ではなく run state で failure を inspect してください。

<!-- section: configuration -->
## 設定とコマンド

documented configuration が workflows directory を上書きしない限り、workflow files は `.ccl/workflows/<name>.js` に直接置きます。exported function shape は正確である必要があります。

```js
export default async function workflow(ctx, params) {
  // use ctx.phase, ctx.agent, ctx.tool, etc.
  return { ok: true }
}
```

Operational guidance:

- workflow が必要とする minimal `allowedTools` を宣言します。
- expensive run の前に `--dry-run` で contract と arguments を確認します。
- 生成ファイルが存在し non-empty であるべき場合は `--expect-artifact <path>` を使います。
- scripts と CI には `--json` を使います。
- run outcome に post-run classification が必要なら `--diagnose --goal "<goal>"` を使います。
- `--dangerously-skip-permissions` を workflow の標準 path にしないでください。

<!-- section: source-evidence -->
## ソース根拠

- `commands/workflows/index.ts`: `/workflows` listing、run、tail、json、inspect、specs、CRUD、show、new behavior を定義します。
- `cli/workflow-run.ts`: `ccl workflow run`、argument parsing、headless execution、JSON output、diagnostics、artifact guards、error surfacing を定義します。
- `tools/WorkflowRun/WorkflowRun.ts`: canonical workflow contract、supported sandbox tools、background run behavior、quality-guard prompt を定義します。
- `tools/WorkflowTool/spec.ts`: workflow spec schema と spec CRUD persistence を定義します。
- `tools/WorkflowTool/engine.ts`、`qualityGuard.ts`、`runtimeCritic.ts`: workflow execution と validation behavior を実装します。

<!-- section: related -->
## 関連ページ

- [Interactive Commands](commands.md)
- [Built-in Tools](tools.md)
- [Common Workflows](common-workflows.md)
- [Gates and Attestation](gates-attestation.md)
