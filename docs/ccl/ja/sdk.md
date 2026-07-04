# SDK

> このページは CCL ドキュメント一覧から生成されています。scripts/generate-ccl-docs.mjs を編集してから再生成してください。

<!-- section: purpose -->
## 目的

CCL SDK は `@margay/ccl-core/sdk` の import path を公開し、host process から TTY なしの stream 型 CCL agent session を実行できるようにします。権限 interception、再開可能 session、pending approval、usage accounting を扱えます。

<!-- section: capabilities -->
## 機能範囲

- `query(prompt, options)` で managed CCL subprocess を開始します。
- `query(prompt, { resume: sessionId })` で通常 session を再開します。
- `resumeWithDecision(sessionId, decision, options)` で suspend した approval flow を再開します。
- `canUseTool` で tool use を intercept し、`allow`、`deny`、`pending` を返します。
- `SessionStore` interface で pending approval と accumulated usage を永続化します。
- `QueryOptions` で provider、model、cwd、tools、settings、plugins、skills、hooks、budget、turns、environment を設定します。

<!-- section: operational-model -->
## 運用モデル

- SDK は同じ CLI runtime の host-side wrapper です。print mode と stream JSON input/output で CCL を起動するため、tools、permissions、skills、hooks、gateway routing、session persistence は CLI と同じ動作になります。
- `pending` permission decision は tool 実行前に session を suspend します。host は approval UI を表示し、後で別 process から `resumeWithDecision` を呼び出せます。
- approve 後、SDK は pending 時に記録した input、または approver が明示した updated input を適用します。resume 後に model が再生成した別 input を黙って実行してはいけません。
- hooks は観測用です。tool 実行を block または modify する場合は `canUseTool` を使います。

<!-- section: configuration -->
## 設定とコマンド

- `@margay/ccl-core/sdk` から import します。
- host が特定の CLI build を指す必要がある場合は `CCL_SDK_CLI_PATH` を設定します。
- pending approval と usage を host 管理の永続化にしたい場合は、`CCL_SDK_STORE_DIR` を設定するか custom `SessionStore` を渡します。
- CCL gateway compatible route には `provider: { type: 'openai-compatible', baseUrl, apiKey }` を使えます。CLI に設定済みの gateway と account state を継承することもできます。

## 公開 exports

| Export | 目的 |
| --- | --- |
| `query` | 1 つの prompt を実行し、`result`、`suspended`、fatal `error` まで SDK events を stream します。 |
| `queryWithTransport` | caller supplied transport seam で実行します。tests や advanced hosts 向けです。 |
| `resumeWithDecision` | pending approval で suspend した session を再開します。 |
| `buildCliArgs` | SDK options を CLI arguments に変換します。 |
| `buildCliEnv` | SDK options を child-process environment に変換します。 |
| `spawnCliTransport` | default subprocess transport です。 |
| `prepareSkillsWrappers` | 明示された skills directories を temporary plugin inputs として wrap します。 |
| `decideFailClosed` | invalid permission result や callback failure を deny decision に正規化します。 |
| `getSessionUsage` | store から session の accumulated usage を読みます。 |
| `fileSessionStore` | file-backed `SessionStore` 実装です。 |
| `defaultStoreDir` | default SDK store directory です。 |

## Query options の概要

| オプション群 | 例 | 効果 |
| --- | --- | --- |
| セッション identity | `sessionId`, `resume`, `forkSession`, `persistSession` | transcript identity、resume behavior、run を保存するかどうかを制御します。 |
| Runtime scope | `cwd`, `addDirs`, `settings`, `env`, `cliPath`, `execPath` | subprocess がどこで動き、どの設定を継承するかを制御します。 |
| Model と provider | `model`, `provider`, `maxTurns`, `maxBudgetUsd` | routing を選択し、turn または budget boundary を設定します。 |
| Tools と permissions | `allowedTools`, `disallowedTools`, `permissionMode`, `canUseTool`, `canUseToolTimeoutMs` | tool availability を制限し、host が tool call を allow、deny、suspend できるようにします。 |
| Extensions | `pluginDirs`, `skillsDirs`, `agents`, `hooks` | plugin、skills、inline agents、host-side lifecycle callbacks を供給します。 |
| Transport/debug | `extraArgs`, `includeRaw`, `signal`、advanced API の custom store/transport | embedding と test harness 向けの escape hatch を追加します。 |

## Event types

stream は JSON serializable events を返します。重要な event types:

| Event | 意味 |
| --- | --- |
| `assistant_text` | model text output chunk。 |
| `tool_use` | model が tool call を要求しました。 |
| `permission_request` | tool call が host policy を待っています。 |
| `permission_resolved` | host policy が request を allow または deny しました。 |
| `tool_result` | tool execution が完了、または拒否されました。 |
| `suspended` | SDK が pending approval を保存し、subprocess を停止しました。 |
| `result` | run が完了しました。 |
| `error` | fatal または non-fatal の SDK/runtime error。 |

## Permission callback

```ts
import { query } from '@margay/ccl-core/sdk'

for await (const event of query('audit the workspace', {
  cwd: '/srv/workspace',
  model: 'deepseek-v4-pro',
  maxTurns: 30,
  canUseTool: async (toolName, input, context) => {
    if (toolName === 'Bash') return { behavior: 'pending' }
    return { behavior: 'allow' }
  },
})) {
  if (event.type === 'suspended') {
    // approval UI を表示し、event.sessionId を永続化します。
  }
}
```

有効な decisions:

| Decision | 効果 |
| --- | --- |
| `{ behavior: 'allow' }` | original input で実行します。 |
| `{ behavior: 'allow', updatedInput }` | approved modified input で実行します。 |
| `{ behavior: 'deny', message }` | tool を deny し、session を続行します。 |
| `{ behavior: 'pending' }` | approval request を保存し、subprocess を停止して `suspended` を yield します。 |

## Approve 後の resume

```ts
import { resumeWithDecision } from '@margay/ccl-core/sdk'

for await (const event of resumeWithDecision(sessionId, {
  behavior: 'allow',
})) {
  // resumed stream を描画し続けます。
}
```

その session に pending approval がない場合、最初の iteration で明確な error になります。pending record は one-shot で、適用後に消費されます。

## Host integration checklist

| 関心事 | host に必要な動作 |
| --- | --- |
| Approval UI | `suspended` event の `event.sessionId` を永続化し、記録された tool name と input を表示します。 |
| Updated input | ユーザーが明示的に変更を承認した場合だけ `updatedInput` を使います。 |
| Timeout | 無人 host では有限の `canUseToolTimeoutMs` を維持し、permission callback を fail closed にします。 |
| Storage | approvals または usage が container restart や worker 間をまたいで残る必要がある場合、custom `SessionStore` を使います。 |
| Provider routing | gateway-compatible routes には `provider: { type: 'openai-compatible', ... }` を使います。省略すると CLI configuration を継承します。 |
| Hooks | hooks は observation と telemetry に使い、blocking decision は `canUseTool` で行います。 |

## ソース上の根拠

- `sdk/index.ts`
- `sdk/README.md`
- `sdk/API.md`
- `sdk/query.ts`
- `sdk/store.ts`
- `sdk/transport.ts`
- `sdk/types.ts`

<!-- section: related -->
## 関連ページ

- [CLI リファレンス](cli-reference.md)
- [対話セッションと Print モード](interactive-sessions.md)
- [権限とセキュリティ](permissions-security.md)
- [ゲートウェイとモデルルーティング](model-routing.md)
- [設定](configuration.md)
