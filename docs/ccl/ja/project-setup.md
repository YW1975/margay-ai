# プロジェクト設定

> このページは公開ドキュメントのソースとして保守されています。Project instructions は短く保ち、長い手順は skills、hooks、workflows、参照ファイルに移してください。

<!-- section: purpose -->
## Purpose

CCL-ready project は、repository だけから安全に推測できない情報を後続 session に伝えます。非自明な build commands、verification commands、project-specific constraints、trusted tool boundaries、local extension directories、team conventions です。Project setup は onboarding だけではありません。Agents、subagents、workflows、reviewers が同じ repository で推測せずに動くための契約です。

<!-- section: capabilities -->
## Capabilities

- `/init` で CCL.md-based project instructions を作成または改善できます。
- `/init` が project CCL.md、personal CCL.local.md、両方、skills/hooks proposal のどれを準備するか選べます。
- `/init` は manifests、README、CI files、既存 AI instructions、`.mcp.json`、`.ccl/skills`、`.ccl/rules`、formatter configuration、worktree state を調査できます。
- Team-shared guidance は project instructions に、private preferences は `CCL.local.md` に置きます。
- 長い guidance や path-specific guidance は、常時読み込まれる root file に詰めず、path frontmatter 付きの `.ccl/rules/` files に分けます。
- Repeatable workflows には project skills、formatting など deterministic checks には hooks を追加できます。
- Project settings、local settings、MCP config、agents、skills、hooks、workflows を別々の layer として使い、すべてを一つの instruction file に入れないようにします。

<!-- section: operational-model -->
## Operational model

`/init` は hidden generator ではなく prompt command です。何を設定するかを聞き、repository を探索し、code だけでは答えられない gap を埋め、artifact proposal を出し、ユーザーが受け入れた場合に concise files を書きます。この prompt は generic advice、invented sections を避け、削除すると間違いにつながる内容だけを残すよう明示しています。

中心原則は load budget discipline です。CCL.md は関連 session で読み込まれるため、高信号な project constraints だけを書くべきです。長い API references、deployment runbooks、release procedures、specialist knowledge は skills、workflows、referenced markdown files に置きます。Personal details は `CCL.local.md` またはそこから参照する home-directory file に置き、shared project file に入れません。

Monorepo や multi-module project では、root instructions が global constraints を定義し、subdirectory CCL.md files が module-specific guidance を提供できます。Worktree を多用する project では、personal instructions を shared home-directory file に置き、各 sibling worktree に短い local stub を置く必要がある場合があります。

<!-- section: configuration -->
## Configuration and commands

- interactive CCL session で `/init` を実行し setup artifacts を作成または更新します。
- `CCL.md` は team-shared instructions に使います。
- `CCL.local.md` は personal project instructions に使い、`.gitignore` に追加します。
- `.ccl/rules/*.md` は focused かつ optional path-scoped instruction files に使います。
- `.ccl/skills/<name>/SKILL.md` は reusable task procedures に使います。
- `.ccl/settings.json` は shared project settings、`.ccl/settings.local.json` は personal overrides に使います。
- `.mcp.json` または MCP commands で project MCP servers を設定します。
- 変更後は `/config`、`/permissions`、`/mcp`、`/agents`、`/skills`、`/hooks`、`/workflows`、`/doctor` で project setup を確認します。

<!-- section: source-evidence -->
## Source evidence

- `commands/init.ts` は current `/init` workflow を定義し、project/personal CCL.md choices、skill/hook proposal logic、repository exploration、concise instructions の strict guidance を含みます。
- `utils/claudemd.ts` と `utils/markdownConfigLoader.ts` は markdown instruction files と path-scoped configuration を読み込みます。
- `utils/settings/constants.ts` は `.ccl` project configuration directory を定義します。
- `skills/loadSkillsDir.ts` は project、user、managed、plugin、bundled、dynamically discovered skills を読み込みます。
- `commands/config/config.tsx`、`commands/permissions/permissions.tsx`、`commands/mcp/mcp.tsx`、`commands/agents/agents.tsx`、`commands/skills/skills.tsx`、`commands/hooks/hooks.tsx` は project setup surfaces を公開します。
- `main.tsx` は `--add-dir`、`--settings`、`--agents`、`--mcp-config`、`--plugin-dir`、`--bare` など explicit startup inputs を定義します。

<!-- section: related -->
## Related pages

- [クイックスタート](quickstart.md)
- [設定と構成](configuration.md)
- [Skills](skills.md)
- [Hooks](hooks.md)
- [MCP サーバーとツール](mcp.md)
- [一般的なワークフロー](common-workflows.md)
