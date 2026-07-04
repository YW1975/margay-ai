# Hooks

> このページは CCL 公開ドキュメントのソースとして保守されています。生成ワークフローを復旧する場合は、欠落している生成スクリプトを修正してから再生成してください。

<!-- section: purpose -->
## 目的

Hooks は、CCL が決められた lifecycle point で deterministic policy、automation、observation を実行する仕組みです。tool use、session start/end、compaction、permissions、notifications、task events、file changes、その他 runtime events の周辺で、繰り返し可能な process rule を実行するのに適しています。

hook は曖昧な会話上の助言ではなく、強制可能な process rule に使ってください。hook は範囲の決まった decision を返す、context を添付する、input を更新する、または後で確認できる evidence を記録するべきです。

<!-- section: capabilities -->
## 機能

persistent hook configuration は四つの hook command type をサポートします。

- `command`: shell command を実行します。
- `prompt`: prompt を model に評価させます。
- `http`: hook input JSON を HTTP endpoint に POST します。
- `agent`: agentic verifier prompt を実行します。

Hooks は `if` field で filter できます。これは tool rule と同じ permission-rule syntax を使い、tool name や scoped command pattern を一致させます。Hooks には per-hook timeout、custom status message、one-shot behavior を設定できます。command hook は async 実行も可能です。`asyncRewake` hook は blocking error で終了した場合に model を起こせます。

runtime には session-only function hook もあります。これは settings files へ永続化できません。これにより、in-memory verifier callback と user-editable configuration が分離されます。

<!-- section: operational-model -->
## 動作モデル

Hooks は main tool loop と session loop の周囲で実行されます。`PreToolUse` hook は実行前に走り、permission behavior に影響したり input を更新したりできます。`PostToolUse` hook は成功後に走り、context の追加、continuation の停止、MCP tool output の更新ができます。`PostToolUseFailure` hook は tool failure 時に走ります。`PermissionRequest` と `PermissionDenied` hook は approval path の観測または decision に使えます。

lifecycle events には `SessionStart`、`SessionEnd`、`Stop`、`StopFailure`、`SubagentStart`、`SubagentStop`、`PreCompact`、`PostCompact`、`UserPromptSubmit`、`Setup`、`TaskCreated`、`TaskCompleted`、`ConfigChange`、`InstructionsLoaded`、`CwdChanged`、`FileChanged` も含まれます。

hook failure は見えるべきですが、境界が必要です。Session-end hooks は既定で短い shutdown timeout を使い、通常の tool hooks はより長い tool-hook timeout を使います。長時間動く async hooks は、cancel、retry、duplicate event が安全になるように書いてください。

<!-- section: configuration -->
## 設定とコマンド

interactive interface で hook を確認・管理するには `/hooks` を使います。共有 hook を project または managed settings に保存するのは、プロジェクト利用者全員が継承すべき場合だけにしてください。assets、scripts、release management が必要な再利用可能 hook behavior は、plugin または skill として package します。

運用ガイド:

- hook output は短く保ってください。大きな output は capped されます。
- `if` filter を使い、無関係な tool call で hook を spawn しないようにします。
- deterministic local check には command hook を、既存 policy service には HTTP hook を優先します。
- prompt または agent hook は、判断が必要で latency を許容できる場合にだけ使います。
- secret を hook definition に入れないでください。headers が environment variables を必要とする場合は、interpolation を許可する variable を明示的に列挙します。

<!-- section: source-evidence -->
## ソース根拠

- `schemas/hooks.ts`: persistent hook command types、matcher configuration、`if` conditions、timeouts、async fields、env interpolation controls を定義します。
- `entrypoints/sdk/coreTypes.ts`: canonical `HOOK_EVENTS` list を定義します。
- `utils/hooks.ts`: hook execution、output caps、session-end timeout、async behavior、hook event emission を管理します。
- `utils/hooks/sessionHooks.ts`: temporary session/function hooks を保存し、function hooks が永続化されない理由を示します。
- `services/tools/toolHooks.ts`: `PreToolUse`、`PostToolUse`、failure hooks を tool execution に接続します。

<!-- section: related -->
## 関連ページ

- [Built-in Tools](tools.md)
- [Permissions and Security](permissions-security.md)
- [Plugins](plugins.md)
- [Skills](skills.md)
