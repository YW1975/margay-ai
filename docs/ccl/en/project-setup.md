# Project Setup

> This page is maintained as public documentation source. Keep project instructions concise and move long procedures into skills, hooks, workflows, or referenced files.

<!-- section: purpose -->
## Purpose

A CCL-ready project tells future sessions what cannot be inferred safely from the repository alone: non-obvious build commands, verification commands, project-specific constraints, trusted tool boundaries, local extension directories, and team conventions. Project setup is not only onboarding. It is the contract that lets agents, subagents, workflows, and reviewers operate in the same repository without guessing.

<!-- section: capabilities -->
## Capabilities

- Use `/init` to create or improve CCL.md-based project instructions.
- Choose whether `/init` prepares project CCL.md, personal CCL.local.md, both, and whether it also proposes skills and hooks.
- Let `/init` inspect manifests, README, CI files, existing AI instructions, `.mcp.json`, `.ccl/skills`, `.ccl/rules`, formatter configuration, and worktree state.
- Store shared team guidance in project instructions and private preferences in `CCL.local.md`.
- Split long or path-specific guidance into `.ccl/rules/` files with path frontmatter instead of bloating the always-loaded root file.
- Add project skills for repeatable workflows and hooks for deterministic checks such as formatting.
- Use project settings, local settings, MCP config, agents, skills, hooks, and workflows as separate layers instead of putting every procedure in one instruction file.

<!-- section: operational-model -->
## Operational model

`/init` is implemented as a prompt command, not a hidden generator. It asks what to set up, explores the repository, fills only the gaps that code cannot answer, proposes artifacts, and then writes concise files if the user accepts. The prompt explicitly tells CCL to avoid generic advice, avoid invented sections, and include only details whose removal would cause mistakes.

The core rule is load budget discipline. CCL.md is read by every relevant session, so it should contain high-signal project constraints. Long API references, deployment runbooks, release procedures, and specialist knowledge should live in skills, workflows, or referenced markdown files. Personal details belong in `CCL.local.md` or a home-directory file referenced from it, not in the shared project file.

For monorepos or multi-module projects, root instructions can define global constraints and subdirectory CCL.md files can provide module-specific guidance. For worktree-heavy projects, personal instructions may need a shared home-directory file plus a short local stub in each sibling worktree.

<!-- section: configuration -->
## Configuration and commands

- Run `/init` in an interactive CCL session to create or update setup artifacts.
- Use `CCL.md` for team-shared instructions.
- Use `CCL.local.md` for personal project instructions and add it to `.gitignore`.
- Use `.ccl/rules/*.md` for focused, optionally path-scoped instruction files.
- Use `.ccl/skills/<name>/SKILL.md` for reusable task procedures.
- Use `.ccl/settings.json` for shared project settings and `.ccl/settings.local.json` for personal overrides.
- Use `.mcp.json` or MCP commands for project MCP servers.
- Use `/config`, `/permissions`, `/mcp`, `/agents`, `/skills`, `/hooks`, `/workflows`, and `/doctor` to inspect the project setup after changes.

<!-- section: source-evidence -->
## Source evidence

- `commands/init.ts` defines the current `/init` workflow, including project/personal CCL.md choices, skill and hook proposal logic, repository exploration, and strict guidance for concise instructions.
- `utils/claudemd.ts` and `utils/markdownConfigLoader.ts` load markdown instruction files and path-scoped configuration.
- `utils/settings/constants.ts` defines the `.ccl` project configuration directory.
- `skills/loadSkillsDir.ts` loads project, user, managed, plugin, bundled, and dynamically discovered skills.
- `commands/config/config.tsx`, `commands/permissions/permissions.tsx`, `commands/mcp/mcp.tsx`, `commands/agents/agents.tsx`, `commands/skills/skills.tsx`, and `commands/hooks/hooks.tsx` expose the project setup surfaces.
- `main.tsx` defines explicit startup inputs such as `--add-dir`, `--settings`, `--agents`, `--mcp-config`, `--plugin-dir`, and `--bare`.

<!-- section: related -->
## Related pages

- [Quickstart](quickstart.md)
- [Configuration and Settings](configuration.md)
- [Skills](skills.md)
- [Hooks](hooks.md)
- [MCP Servers and Tools](mcp.md)
- [Common Workflows](common-workflows.md)
