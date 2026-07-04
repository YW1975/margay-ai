# Skills

> This page is maintained as public documentation source. Keep skill descriptions precise; they are activation contracts.

<!-- section: purpose -->
## Purpose

Skills are reusable instruction bundles that CCL exposes as prompt commands. A skill should capture a repeatable capability, a specialist procedure, or reference knowledge that would be too large or too conditional for always-loaded project instructions. Skills help users and agents invoke the right procedure at the right time without bloating every session.

<!-- section: capabilities -->
## Capabilities

- Load skills from managed settings, user skill directories, project `.ccl/skills`, additional directories, bundled CLI skills, plugins, and MCP skill builders where enabled.
- Use `SKILL.md` directory format or legacy command-style markdown files.
- Provide frontmatter for name, description, argument hints, named arguments, allowed tools, when-to-use guidance, version, model, effort, shell, hooks, target agent, forked execution context, user visibility, path filters, and model-invocation control.
- Keep long references next to the skill and load them only when the skill is invoked.
- Use conditional `paths` frontmatter so a skill activates only after matching files are touched.
- Use `disable-model-invocation` for side-effectful skills that only the user should trigger.
- Use `/skills` to inspect available skill commands in the current session.

<!-- section: operational-model -->
## Operational model

CCL estimates skill cost from frontmatter first, not by eagerly loading every skill body. Full skill content loads only when the skill is invoked or otherwise selected. This keeps the initial context smaller while still making specialized procedures available.

Skill names are derived from directory or file structure and deduplicated by canonical file identity. Managed, user, project, additional, legacy, plugin, bundled, and MCP sources can all contribute commands. Project skills discovered closer to the active file path can override shallower skills. `--bare` skips automatic managed/user/project directory walks and legacy command discovery, but explicit additional directories can still provide skills.

Frontmatter is operational, not decorative. `allowed-tools` constrains what the skill may use. `model` and `effort` can steer execution. `context: fork` runs the skill in a forked context. `agent` can target a specific agent. `hooks` can attach hook behavior. `paths` can keep a skill latent until relevant files are edited.

Skills are different from agents and workflows. An agent defines a role or specialist worker. A workflow orchestrates repeatable multi-step execution. A skill is a reusable instruction capability that can be invoked by a user or selected by the model, subject to policy.

<!-- section: configuration -->
## Configuration and commands

- User skills live under the CCL config home `skills` directory.
- Project skills live under `.ccl/skills/<skill-name>/SKILL.md`.
- Managed skills live under the managed settings path plus `.ccl/skills`.
- Plugin skills are loaded from plugin manifests and plugin skill directories.
- Use `/skills` to open the skills menu for the current session.
- Use `/init` when setting up a project; it can propose skills for repeatable workflows discovered during repository analysis.
- Use `user-invocable: false` for hidden/internal skills and `disable-model-invocation: true` when only the user should trigger a skill.
- Use path filters when a skill should be available only for a subsystem or file family.

<!-- section: source-evidence -->
## Source evidence

- `skills/loadSkillsDir.ts` defines skill source types, skill path resolution, frontmatter parsing, SKILL.md loading, legacy command loading, deduplication, conditional path activation, dynamic discovery, and bare-mode behavior.
- `skills/bundledSkills.ts` registers bundled skills and lazily extracts bundled reference files to a safe temporary skill root.
- `skills/mcpSkills.ts` defines the MCP skill loading integration point.
- `commands/skills/skills.tsx` opens the skills menu using the session command list.
- `services/skillSearch/*` contains the feature-gated remote/local skill search integration stubs consumed by command and tool surfaces.
- `utils/settings/pluginOnlyPolicy.ts` and `utils/settings/types.ts` define policy that can restrict skills to approved plugin channels.
- `utils/frontmatterParser.ts` and `utils/argumentSubstitution.ts` support skill metadata and argument substitution.

<!-- section: related -->
## Related pages

- [Project Setup](project-setup.md)
- [Plugins](plugins.md)
- [Agents](agents.md)
- [Workflows](workflows.md)
- [Hooks](hooks.md)
- [Interactive Commands](commands.md)
