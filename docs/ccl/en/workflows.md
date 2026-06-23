# Workflows

> This page is generated from the CCL documentation inventory. Edit scripts/generate-ccl-docs.mjs, then regenerate.

<!-- section: purpose -->
## Purpose

Workflows define repeatable multi-step automation that can run tools, inspect specs, tail runs, and publish verification outcomes.

<!-- section: capabilities -->
## Capabilities

- Create, list, rename, copy, delete, show, run, tail, inspect, and export workflow run state.
- Use workflow tools for Bash, Write, Read, Edit, and compiled specs.
- Apply quality guard and runtime critic logic to workflow execution.

<!-- section: operational-model -->
## Operational model

- Use workflows for repeatable operations that need structure and verification. Use ordinary commands for one-off interactive control.

<!-- section: configuration -->
## Configuration and commands

- Relevant modules: `commands/workflows`, `tools/WorkflowTool`, and `tools/WorkflowRun`.

<!-- section: source-evidence -->
## Source evidence

- `commands/workflows`
- `tools/WorkflowTool`
- `tools/WorkflowRun`

<!-- section: related -->
## Related pages

- [Interactive Commands](commands.md)
- [Built-in Tools](tools.md)
- [GitHub and CI Workflows](github-ci.md)
- [Gates and Attestation](gates-attestation.md)
