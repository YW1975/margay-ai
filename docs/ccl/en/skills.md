# Skills

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Skills are reusable instruction bundles that CCL can discover and apply when a task matches their description or when invoked through the available skill tooling.

<!-- section: capabilities -->
## Capabilities

- Discover local and remote skills.
- Load only the skill instructions needed for the current task.
- Combine skills with agents, workflows, and plugins when the repo policy allows it.

<!-- section: operational-model -->
## Operational model

- A skill description is an activation contract. Keep trigger text precise and put long procedures in the body or supporting references.

<!-- section: configuration -->
## Configuration and commands

- Relevant modules: `tools/SkillTool`, `tools/DiscoverSkillsTool`, `services/skillSearch`, and `commands/skills`.

<!-- section: source-evidence -->
## Source evidence

- `tools/SkillTool`
- `tools/DiscoverSkillsTool`
- `services/skillSearch`
- `commands/skills`

<!-- section: related -->
## Related pages

- [Agents](agents.md)
- [Plugins](plugins.md)
- [Workflows](workflows.md)
- [Interactive Commands](commands.md)
