# SDK

> 本页由 CCL 文档清单生成。请修改 scripts/generate-ccl-docs.mjs 后重新生成。

<!-- section: purpose -->
## 用途

CCL SDK 通过 `@margay/ccl-core/sdk` 导入路径，为宿主进程提供无 TTY、流式的 CCL agent 会话，并支持权限拦截、可恢复会话、挂起审批和用量累计。

<!-- section: capabilities -->
## 能力范围

- 用 `query(prompt, options)` 启动受管 CCL 子进程。
- 用 `query(prompt, { resume: sessionId })` 继续普通会话。
- 用 `resumeWithDecision(sessionId, decision, options)` 继续已挂起的审批流程。
- 通过 `canUseTool` 拦截工具调用，并返回 `allow`、`deny` 或 `pending`。
- 通过 `SessionStore` 接口持久化挂起审批和累计用量。
- 通过 `QueryOptions` 配置 provider、model、cwd、tools、settings、plugins、skills、hooks、预算、轮数和环境变量。

<!-- section: operational-model -->
## 运行模型

- SDK 是同一个 CLI runtime 的宿主侧包装。它用 print mode 和 stream JSON 输入输出启动 CCL，因此工具、权限、skills、hooks、网关路由和会话持久化都沿用 CLI 行为。
- `pending` 权限决定会在工具执行前挂起会话。宿主可以渲染审批 UI，之后从另一个进程调用 `resumeWithDecision`。
- 审批通过后，SDK 使用挂起时记录的 input，或审批者明确提供的 updated input。它不能静默执行模型恢复后重新生成的不同工具输入。
- hooks 只用于观测。需要阻断或改写工具执行时，应使用 `canUseTool`。

<!-- section: configuration -->
## 配置与命令

- 从 `@margay/ccl-core/sdk` 导入。
- 如果宿主必须指定某个 CLI 构建，设置 `CCL_SDK_CLI_PATH`。
- 如果挂起审批和用量需要宿主管理的持久化，设置 `CCL_SDK_STORE_DIR` 或传入自定义 `SessionStore`。
- 对 CCL 网关兼容路由使用 `provider: { type: 'openai-compatible', baseUrl, apiKey }`，也可以继承 CLI 已配置的网关和账号状态。

## 公开导出

| 导出 | 作用 |
| --- | --- |
| `query` | 执行一次 prompt，并流式输出 SDK events，直到 `result`、`suspended` 或 fatal `error`。 |
| `queryWithTransport` | 通过调用方提供的 transport seam 运行，适合测试或高级宿主。 |
| `resumeWithDecision` | 继续因 pending 审批挂起的会话。 |
| `buildCliArgs` | 把 SDK options 转成 CLI 参数。 |
| `buildCliEnv` | 把 SDK options 转成子进程环境变量。 |
| `spawnCliTransport` | 默认子进程 transport。 |
| `prepareSkillsWrappers` | 把显式 skills 目录包装成临时 plugin 输入。 |
| `decideFailClosed` | 把非法权限结果或 callback 失败归一化为 deny。 |
| `getSessionUsage` | 从 store 读取某个 session 的累计用量。 |
| `fileSessionStore` | 文件版 `SessionStore` 实现。 |
| `defaultStoreDir` | 默认 SDK store 目录。 |

## Query Options 速览

| 选项族 | 示例 | 影响 |
| --- | --- | --- |
| 会话身份 | `sessionId`, `resume`, `forkSession`, `persistSession` | 控制 transcript 身份、恢复行为，以及是否保存运行。 |
| 运行时范围 | `cwd`, `addDirs`, `settings`, `env`, `cliPath`, `execPath` | 控制子进程在哪里运行、继承什么配置。 |
| 模型与 provider | `model`, `provider`, `maxTurns`, `maxBudgetUsd` | 选择路由并设置轮数或预算边界。 |
| 工具与权限 | `allowedTools`, `disallowedTools`, `permissionMode`, `canUseTool`, `canUseToolTimeoutMs` | 限制工具可用性，并让宿主允许、拒绝或挂起工具调用。 |
| 扩展 | `pluginDirs`, `skillsDirs`, `agents`, `hooks` | 提供插件、skills、inline agents 和宿主侧生命周期 callback。 |
| Transport/debug | `extraArgs`, `includeRaw`, `signal`，高级 API 中的自定义 store/transport | 为嵌入和测试 harness 提供 escape hatch。 |

## 事件类型

流会产生 JSON 可序列化事件。重要事件包括：

| 事件 | 含义 |
| --- | --- |
| `assistant_text` | 模型文本输出片段。 |
| `tool_use` | 模型请求工具调用。 |
| `permission_request` | 工具调用正在等待宿主策略。 |
| `permission_resolved` | 宿主策略已允许或拒绝请求。 |
| `tool_result` | 工具执行完成或被拒绝。 |
| `suspended` | SDK 已保存 pending 审批并停止子进程。 |
| `result` | 本次运行完成。 |
| `error` | fatal 或非 fatal 的 SDK/runtime 错误。 |

## 权限回调

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
    // 渲染审批 UI，并持久化 event.sessionId。
  }
}
```

有效决定：

| 决定 | 效果 |
| --- | --- |
| `{ behavior: 'allow' }` | 使用原始 input 执行。 |
| `{ behavior: 'allow', updatedInput }` | 使用审批后的修改 input 执行。 |
| `{ behavior: 'deny', message }` | 拒绝工具并继续会话。 |
| `{ behavior: 'pending' }` | 保存审批请求，停止子进程，并产生 `suspended`。 |

## 审批后恢复

```ts
import { resumeWithDecision } from '@margay/ccl-core/sdk'

for await (const event of resumeWithDecision(sessionId, {
  behavior: 'allow',
})) {
  // 继续渲染恢复后的事件流。
}
```

如果该 session 没有 pending 审批，第一次迭代会给出清晰错误。pending 记录是一次性的，应用后会被消费。

## 宿主集成清单

| 关注点 | 宿主必需行为 |
| --- | --- |
| 审批 UI | 持久化 `suspended` 事件中的 `event.sessionId`，并展示记录的工具名和 input。 |
| 修改 input | 只有在用户明确批准修改时才使用 `updatedInput`。 |
| 超时 | 无人值守宿主应保持有限的 `canUseToolTimeoutMs`，让权限 callback fail closed。 |
| 存储 | 当审批或 usage 需要跨容器重启、跨 worker 存活时，使用自定义 `SessionStore`。 |
| Provider 路由 | 网关兼容路由使用 `provider: { type: 'openai-compatible', ... }`；省略 `provider` 则继承 CLI 配置。 |
| Hooks | 用 hooks 做观察和 telemetry；用 `canUseTool` 做阻断决策。 |

## 源码依据

- `sdk/index.ts`
- `sdk/README.md`
- `sdk/API.md`
- `sdk/query.ts`
- `sdk/store.ts`
- `sdk/transport.ts`
- `sdk/types.ts`

<!-- section: related -->
## 相关页面

- [CLI 参考](cli-reference.md)
- [交互会话与 Print 模式](interactive-sessions.md)
- [权限与安全](permissions-security.md)
- [网关与模型路由](model-routing.md)
- [配置与设置](configuration.md)
