# Common Workflows

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Common CCL workflows combine interactive commands, tools, subagents, workflows, and governance evidence for coding, review, debugging, documentation, and publication.

<!-- section: capabilities -->
## Capabilities

- Explore before editing, then implement with focused diffs and run the project verifier.
- Delegate broad research to subagents and keep the main session responsible for final edits.
- For public docs, run parity, link, translation-residue, source-accuracy, build, and safety audits before push.

<!-- section: operational-model -->
## Operational model

- A workflow is successful only when the output and the evidence are both complete. A passing build without source accuracy is not enough for documentation work.

<!-- section: configuration -->
## Configuration and commands

- Use [Workflows](workflows.md) for repeatable automation, [Ralph-Lisa Loop](ralph-lisa-loop.md) for reviewed delivery, and [Public Documentation Publishing](public-docs.md) for release-safe docs.


<!-- section: source-evidence -->
## Source evidence

- `commands/workflows`
- `tools/AgentTool`
- `tools/WorkflowTool`
- `AGENTS.md`

<!-- section: related -->
## Related pages

- [Workflows](workflows.md)
- [Agents](agents.md)
- [Ralph-Lisa Loop](ralph-lisa-loop.md)
- [Public Documentation Publishing](public-docs.md)
