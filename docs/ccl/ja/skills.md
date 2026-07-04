# Skills

> このページは公開ドキュメントのソースとして保守されています。Skill descriptions は activation contracts なので正確に書いてください。

<!-- section: purpose -->
## Purpose

Skills は CCL が prompt commands として公開する reusable instruction bundles です。Skill は repeatable capability、specialist procedure、reference knowledge を表すべきです。常時読み込むには大きすぎる、または特定 task でだけ必要な知識を切り出すために使います。Skills により users と agents は、各 session を膨らませずに必要な手順を必要な時だけ呼び出せます。

<!-- section: capabilities -->
## Capabilities

- managed settings、user skill directories、project `.ccl/skills`、additional directories、bundled CLI skills、plugins、enabled MCP skill builders から skills を読み込めます。
- `SKILL.md` directory format と legacy command-style markdown files を扱えます。
- Frontmatter で名称、説明、引数ヒント、名前付き引数、許可ツール、使用条件、版、モデル、effort、shell、hooks、対象 agent、forked context、ユーザー表示、パス条件、モデル起動制御を指定できます。
- 長い reference は skill の隣に置き、skill invocation 時だけ読み込めます。
- Conditional `paths` frontmatter により、matching files が触られた後だけ skill を activate できます。
- Side-effectful skills を user だけが trigger すべき場合、`disable-model-invocation` を使います。
- `/skills` で current session の available skill commands を確認できます。

<!-- section: operational-model -->
## Operational model

CCL はすべての skill body を eager load せず、frontmatter だけで skill cost を概算します。Full skill content は skill が invoked または selected された時だけ読み込まれます。これにより initial context を小さくしつつ specialized procedures を利用できます。

Skill names は directory/file structure から derived され、canonical file identity で deduplicated されます。Managed、user、project、additional、legacy、plugin、bundled、MCP sources はすべて commands を提供できます。Active file path に近い project skills は浅い skills を override できます。`--bare` は automatic managed/user/project directory walks と legacy command discovery を skip しますが、explicit additional directories は引き続き skills を提供できます。

Frontmatter は decoration ではなく operational metadata です。`allowed-tools` は skill が使える tools を制限します。`model` と `effort` は execution を steer できます。`context: fork` は forked context で skill を実行します。`agent` は specific agent を target にできます。`hooks` は hook behavior を付けられます。`paths` は relevant files が編集されるまで skill を latent にできます。

Skills は agents や workflows と異なります。Agent は role または specialist worker を定義します。Workflow は repeatable multi-step execution を orchestrate します。Skill は reusable instruction capability であり、policy が許す範囲で user が呼び出すか model が選択します。

<!-- section: configuration -->
## Configuration and commands

- User skills は CCL config home の `skills` directory に置きます。
- Project skills は `.ccl/skills/<skill-name>/SKILL.md` に置きます。
- Managed skills は managed settings path に `.ccl/skills` を加えた場所にあります。
- Plugin skills は plugin manifests と plugin skill directories から読み込まれます。
- `/skills` で current session の skills menu を開きます。
- Project setup では `/init` を使えます。Repository analysis で見つかった repeatable workflows に対する skills を提案できます。
- Hidden/internal skills には `user-invocable: false` を使い、user だけが trigger すべき場合は `disable-model-invocation: true` を使います。
- Skill が特定 subsystem または file family のみに適用される場合は path filters を使います。

<!-- section: source-evidence -->
## Source evidence

- `skills/loadSkillsDir.ts` は skill の source 種別、path 解決、frontmatter 解析、SKILL.md 読み込み、legacy command 読み込み、重複排除、条件付き path activation、動的発見、bare-mode 動作を定義します。
- `skills/bundledSkills.ts` は bundled skills を register し、bundled reference files を safe temporary skill root に lazy extraction します。
- `skills/mcpSkills.ts` は MCP skill loading integration point を定義します。
- `commands/skills/skills.tsx` は session command list を使い skills menu を開きます。
- `services/skillSearch/*` は command/tool surfaces が消費する feature-gated remote/local skill search integration stubs を含みます。
- `utils/settings/pluginOnlyPolicy.ts` と `utils/settings/types.ts` は skills を approved plugin channels に制限できる policy を定義します。
- `utils/frontmatterParser.ts` と `utils/argumentSubstitution.ts` は skill metadata と argument substitution を支えます。

<!-- section: related -->
## Related pages

- [プロジェクト設定](project-setup.md)
- [Plugins](plugins.md)
- [Agents](agents.md)
- [Workflows](workflows.md)
- [Hooks](hooks.md)
- [Interactive Commands](commands.md)
